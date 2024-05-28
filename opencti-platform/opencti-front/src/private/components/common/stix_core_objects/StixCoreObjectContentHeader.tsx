import React, { FunctionComponent } from 'react';
import Tooltip from '@mui/material/Tooltip';
import ToggleButton from '@mui/material/ToggleButton';
import { Link } from 'react-router-dom';
import { DifferenceOutlined } from '@mui/icons-material';
import { VectorPolygon } from 'mdi-material-ui';
import { useFormatter } from '../../../../components/i18n';

interface StixCoreObjectContentHeaderProps {
  currentMode?: string;
  modes: string[];
}

const StixCoreObjectContentHeader: FunctionComponent<StixCoreObjectContentHeaderProps> = ({
  currentMode,
  modes,
}) => {
  const { t_i18n } = useFormatter();

  return (
    <div>
      {modes.includes('content') && (
        <Tooltip title={t_i18n('Content view')}>
          <ToggleButton
            component={Link}
            to=''
            selected={currentMode === 'content'}
            value={'content'}
          >
            <VectorPolygon
              fontSize="small"
              color={currentMode === 'content' ? 'primary' : 'inherit'}
            />
          </ToggleButton>
        </Tooltip>
      )}
      {modes.includes('mapping') && (
        <Tooltip title={t_i18n('Content mapping view')}>
          <ToggleButton
            component={Link}
            to='mapping'
            selected={currentMode === 'mapping'}
            value={'mapping'}
          >
            <DifferenceOutlined
              fontSize="small"
              color={currentMode === 'content' ? 'primary' : 'inherit'}
            />
          </ToggleButton>
        </Tooltip>
      )}
    </div>
  );
};

export default StixCoreObjectContentHeader;
