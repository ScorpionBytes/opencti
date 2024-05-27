import React, { FunctionComponent } from 'react';
import Tooltip from '@mui/material/Tooltip';
import ToggleButton from '@mui/material/ToggleButton';
import { Link } from 'react-router-dom';
import { DifferenceOutlined } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { VectorPolygon } from 'mdi-material-ui';
import { useFormatter } from '../../../../components/i18n';

interface StixCoreObjectContentHeaderProps {
  currentMode?: string;
  modes: string[];
  link: string;
}

const StixCoreObjectContentHeader: FunctionComponent<StixCoreObjectContentHeaderProps> = ({
  currentMode,
  modes,
  link,
}) => {
  const { t_i18n } = useFormatter();

  return (
    <Box >
      {modes.includes('content') && (
        <Tooltip title={t_i18n('Content view')}>
          <ToggleButton
            component={Link}
            to={link}
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
            to={`${link}/mapping`}
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
    </Box>
  );
};

export default StixCoreObjectContentHeader;
