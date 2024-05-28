import React, { FunctionComponent } from 'react';
import StixCoreObjectContentHeader from '@components/common/stix_core_objects/StixCoreObjectContentHeader';
import { Route, Routes } from 'react-router-dom';

import ContainerContent from '@components/common/containers/ContainerContent';
import StixCoreObjectContent from '@components/common/stix_core_objects/StixCoreObjectContent';

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
        <Route
          path="/"
          element={
            <StixCoreObjectContent
              stixCoreObject={stixCoreObject}
            />}
        />
      </Routes>
    </>
  );
};

export default StixCoreObjectContentRoot;
