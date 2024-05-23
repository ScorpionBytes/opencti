import { FunctionComponent } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/styles';
import ItemIcon from '../../../../components/ItemIcon';
import type { Theme } from '../../../../components/Theme';
import { useFormatter } from '../../../../components/i18n';
import { truncate } from '../../../../utils/String';

interface EntityRelationshipCardProps {
  entityName: string;
  entityType: string;
}

const EntityRelationshipCard : FunctionComponent<EntityRelationshipCardProps> = ({ entityName, entityType }) => {
  const theme = useTheme<Theme>();
  const { t_i18n } = useFormatter();
  return (
    <>
      <Box sx={{
        position: 'absolute',
        width: 180,
        height: 80,
        borderRadius: 10,
        backgroundColor: theme.palette.background.accent,
        top: 10,
        right: 10,
      }}
      >
        <Box
          sx={{
            padding: '10px 0 10px 0',
            borderBottom: '1px solid #ffffff',
          }}
        >
          <Box sx={{
            position: 'absolute',
            top: 8,
            left: 5,
            fontSize: 8,
          }}
          >
            <ItemIcon
              type={entityType}
              color="#263238"
              size="small"
            />
          </Box>
          <Box
            sx={{
              width: '100%',
              textAlign: 'center',
              color: theme.palette.text?.primary,
              fontSize: 11,
            }}
          >
            {t_i18n(`entity_${entityType}`)}
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: 40,
            maxHeight: 40,
            lineHeight: '40px',
            color: theme.palette.text?.primary,
            textAlign: 'center',
          }}
        >
          <Box sx={{
            display: 'inline-block',
            lineHeight: 1,
            fontSize: 12,
            verticalAlign: 'middle',
          }}
          >
            <span>
              {truncate(entityName, 20)}
            </span>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EntityRelationshipCard;
