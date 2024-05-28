interface Connector {
  name: string;
  active: boolean;
  auto: boolean;
  only_contextual: boolean;
  connector_trigger_filters: string;
  connector_type: string;
  connector_scope: string[];
  connector_state: string;
}

interface ConnectorStatus {
  status: boolean | null;
  label: string;
}

export const connectorsWithTrigger = ['INTERNAL_ENRICHMENT', 'INTERNAL_IMPORT_FILE'];

export const CONNECTOR_STATUS_NOT_APPLICABLE = 'Not applicable';
export const CONNECTOR_TRIGGER_AUTO = 'Automatic';
export const CONNECTOR_TRIGGER_MANUAL = 'Manual';
export const CONNECTOR_TRIGGER_FILTERED = 'Filtered';

export const getConnectorTriggerStatus = (connector: Connector): ConnectorStatus => {
  if (!connectorsWithTrigger.includes(connector.connector_type)) {
    return { status: null, label: CONNECTOR_STATUS_NOT_APPLICABLE };
  }
  if (connector.connector_trigger_filters) {
    return { status: true, label: CONNECTOR_TRIGGER_FILTERED };
  }
  if (connector.auto) {
    return { status: true, label: CONNECTOR_TRIGGER_AUTO };
  }
  return { status: false, label: CONNECTOR_TRIGGER_MANUAL };
};

export const getConnectorOnlyContextualStatus = (connector: Connector): ConnectorStatus => {
  if (!connectorsWithTrigger.includes(connector.connector_type)) {
    return { status: null, label: CONNECTOR_STATUS_NOT_APPLICABLE };
  }
  // TODO do we really need connector.auto for status ?
  if (connector.only_contextual) {
    return { status: connector.auto, label: 'Yes' };
  }
  return { status: connector.auto, label: 'No' };
};
