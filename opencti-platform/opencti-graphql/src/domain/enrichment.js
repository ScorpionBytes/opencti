import { Promise } from 'bluebird';
import { map } from 'ramda';
import { createWork } from './work';
import { pushToConnector } from '../database/rabbitmq';
import { ENTITY_TYPE_CONNECTOR } from '../schema/internalObject';
import { getEntitiesListFromCache } from '../database/cache';
import { CONNECTOR_INTERNAL_ENRICHMENT } from '../schema/general';
import { isStixMatchFilterGroup } from '../utils/filtering/filtering-stix/stix-filtering';
import { isFilterGroupNotEmpty } from '../utils/filtering/filtering-utils';
import { SYSTEM_USER } from '../utils/access';

export const createEntityAutoEnrichment = async (context, user, element, scope) => {
  const elementStandardId = element.standard_id;
  // Get the list of compatible connectors
  const targetConnectors = await findConnectorsForElementEnrichment(context, user, element, scope);
  // Create a work for each connector
  const workList = await Promise.all(
    map((connector) => {
      return createWork(context, user, connector, `Enrichment (${elementStandardId})`, elementStandardId).then((work) => {
        return { connector, work };
      });
    }, targetConnectors)
  );
  // Send message to all correct connectors queues
  await Promise.all(
    map((data) => {
      const { connector, work } = data;
      const message = {
        internal: {
          work_id: work.id, // Related action for history
          applicant_id: null, // No specific user asking for the import
        },
        event: {
          event_type: CONNECTOR_INTERNAL_ENRICHMENT,
          entity_id: elementStandardId,
          entity_type: element.entity_type,
        },
      };
      return pushToConnector(connector.internal_id, message);
    }, workList)
  );
  return workList;
};

const findConnectorsForElementEnrichment = async (context, user, element, scope) => {
  const connectors = await getEntitiesListFromCache(context, user, ENTITY_TYPE_CONNECTOR);
  const targetConnectors = [];
  for (let i = 0; i < connectors.length; i += 1) {
    const conn = connectors[i];
    const scopeMatch = scope ? (conn.connector_scope ?? []).some((s) => s.toLowerCase() === scope.toLowerCase()) : true;
    const autoTrigger = conn.auto === true || (conn.connector_trigger_filters && await isStixMatchConnectorFilter(context, element, conn.connector_trigger_filters));
    if (conn.active === true && scopeMatch && autoTrigger) {
      targetConnectors.push(conn);
    }
  }
  return targetConnectors;
};

const isStixMatchConnectorFilter = async (context, element, stringFilters) => {
  if (!stringFilters) {
    return false; // no filters, doesn't match
  }
  const jsonFilters = JSON.parse(stringFilters);
  if (!isFilterGroupNotEmpty(jsonFilters)) {
    return false; // filters empty -> we don't try to match
  }
  return isStixMatchFilterGroup(context, SYSTEM_USER, element, jsonFilters);
};
