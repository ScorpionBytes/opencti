import React from 'react';
import type { DataTableProps } from './dataTableTypes';
import { DataTableVariant } from './dataTableTypes';
import { useComputeLink, useDataCellHelpers, useDataTableLocalStorage } from './dataTableHooks';
import DataTableComponent from './DataTableComponent';
import { useFormatter } from '../i18n';

type OCTIDataTableProps = Pick<DataTableProps, 'dataColumns'
| 'storageKey'
| 'rootRef'
| 'variant'> & {
  data: never,
  globalCount: number
};

const DataTable = (props: OCTIDataTableProps) => {
  const formatter = useFormatter();

  const {
    data,
    variant = DataTableVariant.default,
    globalCount,
  } = props;

  return (
    <DataTableComponent
      numberOfElements={{ number: globalCount, symbol: '' }}
      useDataTable={() => ({ data })}
      useLineData={(line) => line}
      dataQueryArgs={(line: never) => line}
      formatter={formatter}
      resolvePath={(a) => a}
      useDataTableLocalStorage={useDataTableLocalStorage}
      useDataTableToggle={() => ({})}
      useComputeLink={useComputeLink}
      useDataCellHelpers={useDataCellHelpers({}, variant)}
      {...props}
    />
  );
};

export default DataTable;
