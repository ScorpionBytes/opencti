import React, { FunctionComponent } from 'react';
import StixCoreObjectContentHeader from '@components/common/stix_core_objects/StixCoreObjectContentHeader';
import { Route, Routes } from 'react-router-dom';
import StixDomainObjectContent from '@components/common/stix_domain_objects/StixDomainObjectContent';
import ContainerContent from '@components/common/containers/ContainerContent';

interface StixCoreObjectContentRootProps {
  stixCoreObject: any;
  link: string;
}

const StixCoreObjectContentRoot: FunctionComponent<StixCoreObjectContentRootProps> = ({
  stixCoreObject,
  link,
}) => {
  return (
    <div>
      <StixCoreObjectContentHeader
        currentMode={'content'}
        modes={['content', 'mapping']}
        link={link}
      />
      <Routes>
        <Route
          path="/"
          element={
            <StixDomainObjectContent
              stixDomainObject={stixCoreObject}
            />}
        />
        <Route
          path="/mapping"
          element={
            <ContainerContent
              containerData={stixCoreObject}
            />
          }
        />
      </Routes>

    </div>
  );
};

export default StixCoreObjectContentRoot;
