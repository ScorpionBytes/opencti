import React, { FunctionComponent } from 'react';
import StixCoreObjectContentHeader from '@components/common/stix_core_objects/StixCoreObjectContentHeader';
import { Route, Routes } from 'react-router-dom';
import StixDomainObjectContent from '@components/common/stix_domain_objects/StixDomainObjectContent';
import ContainerContent from '@components/common/containers/ContainerContent';

interface StixCoreObjectContentRootProps {
  stixCoreObject: any;
}

const StixCoreObjectContentRoot: FunctionComponent<StixCoreObjectContentRootProps> = ({
  stixCoreObject,
}) => {
  return (
    <>
      <StixCoreObjectContentHeader
        currentMode={'content'}
        modes={['content', 'mapping']}
      />
      <Routes>
        <Route
          path="/mapping"
          element={
            <ContainerContent
              containerData={stixCoreObject}
            />
          }
        />
      </Routes>
      <Route
        path="/"
        element={
          <StixDomainObjectContent
            stixDomainObject={stixCoreObject}
          />}
      />
    </>
  );
};

export default StixCoreObjectContentRoot;
