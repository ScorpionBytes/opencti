/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO Remove this when V6
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useMemo } from 'react';
import { graphql, useSubscription } from 'react-relay';
import { Link, Route, Routes, useParams, useLocation, Navigate } from 'react-router-dom';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import StixCoreObjectSimulationResult from '../../common/stix_core_objects/StixCoreObjectSimulationResult';
import { QueryRenderer } from '../../../../relay/environment';
import Report from './Report';
import { RootReportSubscription } from './__generated__/RootReportSubscription.graphql';
import { RootReportQuery$data } from './__generated__/RootReportQuery.graphql';
import ReportPopover from './ReportPopover';
import ReportKnowledge from './ReportKnowledge';
import ContainerHeader from '../../common/containers/ContainerHeader';
import Loader from '../../../../components/Loader';
import ContainerStixDomainObjects from '../../common/containers/ContainerStixDomainObjects';
import ContainerStixCyberObservables from '../../common/containers/ContainerStixCyberObservables';
import ErrorNotFound from '../../../../components/ErrorNotFound';
import StixCoreObjectFilesAndHistory from '../../common/stix_core_objects/StixCoreObjectFilesAndHistory';
import StixCoreObjectContent from '../../common/stix_core_objects/StixCoreObjectContent';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import { useFormatter } from '../../../../components/i18n';
import { useIsEnforceReference } from '../../../../utils/hooks/useEntitySettings';
import useGranted, { BYPASSREFERENCE } from '../../../../utils/hooks/useGranted';

const subscription = graphql`
  subscription RootReportSubscription($id: ID!) {
    stixDomainObject(id: $id) {
      ... on Report {
        ...Report_report
        ...ReportKnowledgeGraph_report
        ...ReportEditionContainer_report
        ...StixCoreObjectContent_stixCoreObject
      }
      ...FileImportViewer_entity
      ...FileExportViewer_entity
      ...FileExternalReferencesViewer_entity
      ...WorkbenchFileViewer_entity
    }
  }
`;

const reportQuery = graphql`
  query RootReportQuery($id: String!) {
    report(id: $id) {
      id
      standard_id
      entity_type
      name
      ...Report_report
      ...ReportDetails_report
      ...ReportKnowledge_report
      ...ContainerHeader_container
      ...ContainerStixDomainObjects_container
      ...ContainerStixCyberObservables_container
      ...StixCoreObjectContent_stixCoreObject
      ...FileImportViewer_entity
      ...FileExportViewer_entity
      ...FileExternalReferencesViewer_entity
      ...WorkbenchFileViewer_entity
    }
    connectorsForExport {
      ...StixCoreObjectFilesAndHistory_connectorsExport
    }
    connectorsForImport {
      ...StixCoreObjectFilesAndHistory_connectorsImport
    }
  }
`;

const RootReport = () => {
  const { reportId } = useParams() as { reportId: string };
  const subConfig = useMemo<GraphQLSubscriptionConfig<RootReportSubscription>>(
    () => ({
      subscription,
      variables: { id: reportId },
    }),
    [reportId],
  );
  const location = useLocation();
  const enableReferences = useIsEnforceReference('Report') && !useGranted([BYPASSREFERENCE]);
  const { t_i18n } = useFormatter();
  useSubscription(subConfig);
  return (
    <>
      <QueryRenderer
        query={reportQuery}
        variables={{ id: reportId }}
        render={({ props }: { props: RootReportQuery$data }) => {
          if (props) {
            if (props.report) {
              const { report } = props;
              let paddingRight = 0;
              const isOverview = location.pathname === `/dashboard/analyses/reports/${report.id}`;
              if (
                location.pathname.includes(
                  `/dashboard/analyses/reports/${report.id}/entities`,
                )
                || location.pathname.includes(
                  `/dashboard/analyses/reports/${report.id}/observables`,
                )
              ) {
                paddingRight = 250;
              }
              if (
                location.pathname.includes(
                  `/dashboard/analyses/reports/${report.id}/content`,
                )
              ) {
                paddingRight = 350;
              }
              return (
                <div style={{ paddingRight }} data-testid="report-details-page">
                  <Breadcrumbs variant="object" elements={[
                    { label: t_i18n('Analyses') },
                    { label: t_i18n('Reports'), link: '/dashboard/analyses/reports' },
                    { label: report.name, current: true },
                  ]}
                  />
                  <ContainerHeader
                    container={report}
                    PopoverComponent={
                      <ReportPopover id={reportId} />
                    }
                    enableQuickSubscription={true}
                    enableQuickExport={true}
                    enableAskAi={true}
                    overview={isOverview}
                  />
                  <Box
                    sx={{
                      borderBottom: 1,
                      borderColor: 'divider',
                      marginBottom: 4,
                    }}
                  >
                    <Tabs
                      value={
                        location.pathname.includes(
                          `/dashboard/analyses/reports/${report.id}/knowledge`,
                        )
                          ? `/dashboard/analyses/reports/${report.id}/knowledge`
                          : location.pathname
                      }
                    >
                      <Tab
                        component={Link}
                        to={`/dashboard/analyses/reports/${report.id}`}
                        value={`/dashboard/analyses/reports/${report.id}`}
                        label={t_i18n('Overview')}
                      />
                      <Tab
                        component={Link}
                        to={`/dashboard/analyses/reports/${report.id}/knowledge/graph`}
                        value={`/dashboard/analyses/reports/${report.id}/knowledge`}
                        label={t_i18n('Knowledge')}
                      />
                      <Tab
                        component={Link}
                        to={`/dashboard/analyses/reports/${report.id}/content`}
                        value={`/dashboard/analyses/reports/${report.id}/content`}
                        label={t_i18n('Content')}
                      />
                      <Tab
                        component={Link}
                        to={`/dashboard/analyses/reports/${report.id}/entities`}
                        value={`/dashboard/analyses/reports/${report.id}/entities`}
                        label={t_i18n('Entities')}
                      />
                      <Tab
                        component={Link}
                        to={`/dashboard/analyses/reports/${report.id}/observables`}
                        value={`/dashboard/analyses/reports/${report.id}/observables`}
                        label={t_i18n('Observables')}
                      />
                      <Tab
                        component={Link}
                        to={`/dashboard/analyses/reports/${report.id}/files`}
                        value={`/dashboard/analyses/reports/${report.id}/files`}
                        label={t_i18n('Data')}
                      />
                    </Tabs>
                    {isOverview && (
                      <StixCoreObjectSimulationResult id={report.id} type="container" />
                    )}
                  </Box>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <Report report={report} />
                      }
                    />
                    <Route
                      path="/entities"
                      element={
                        <ContainerStixDomainObjects
                          container={report}
                          enableReferences={enableReferences}
                        />
                      }
                    />
                    <Route
                      path="/observables"
                      element={
                        <ContainerStixCyberObservables
                          container={report}
                          enableReferences={enableReferences}
                        />
                      }
                    />
                    <Route
                      path="/knowledge"
                      element={(
                        <Navigate
                          replace={true}
                          to={`/dashboard/analyses/reports/${reportId}/knowledge/graph`}
                        />
                      )}
                    />
                    <Route
                      path="/content"
                      element={
                        <StixCoreObjectContent
                          stixCoreObject={report}
                        />
                      }
                    />
                    <Route
                      path="/knowledge/*"
                      element={
                        <ReportKnowledge
                          report={report}
                          enableReferences={enableReferences}
                        />
                      }
                    />
                    <Route
                      path="/files"
                      element={
                        <StixCoreObjectFilesAndHistory
                          id={reportId}
                          connectorsExport={props.connectorsForExport}
                          connectorsImport={props.connectorsForImport}
                          entity={report}
                          withoutRelations={true}
                          bypassEntityId={true}
                        />
                      }
                    />
                  </Routes>
                </div>
              );
            }
            return <ErrorNotFound />;
          }
          return <Loader />;
        }}
      />
    </>
  );
};

export default RootReport;
