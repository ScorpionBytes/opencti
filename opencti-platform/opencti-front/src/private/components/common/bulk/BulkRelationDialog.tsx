import React, { FunctionComponent } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl, Stack } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import EntityRelationshipCard from '@components/common/bulk/EntityRelationshipCard';
import { useFormatter } from '../../../../components/i18n';

interface BulkRelationDialogProps {
  stixDomainObjectId: string;
  stixDomainObjectType: string;
  isOpen: boolean;
  close: () => void;
}

const BulkRelationDialog : FunctionComponent<BulkRelationDialogProps> = ({ stixDomainObjectId, stixDomainObjectType, isOpen, close }) => {
  const { t_i18n } = useFormatter();
  return (
    <Dialog
      open={isOpen}
      PaperProps={{ elevation: 1 }}
      onClose={close}
      fullWidth={true}
      maxWidth="lg"
    >
      <DialogTitle>Create relations in bulk for {stixDomainObjectType}</DialogTitle>
      <DialogContent>
        <Typography>Id: {stixDomainObjectId}</Typography>
        <Typography>Name: Not implemented.</Typography>
        <FormControl fullWidth>
          <Grid container={true} spacing={3}>
            <Grid item xs={2}>
              <TextField
                id="standard-textarea-2"
                label="Multiline Placeholder\n line 2\n ..etc"
                placeholder="Placeholder"
                multiline
                variant="standard"
              />
            </Grid>
            <Grid item xs={10}>
              <Grid container={true} spacing={3}>
                <Grid item={true} xs={3}>
                  <Typography> From </Typography>
                  <EntityRelationshipCard
                    entityName="To be done"
                    entityType={stixDomainObjectType}
                  />
                </Grid>
                <Grid item={true} xs={3}>
                  <InputLabel id="bulk-relation-type">Relation type</InputLabel>
                  <Select
                    defaultValue="Authored by"
                    labelId="bulk-relation-type"
                  >
                    <MenuItem value="Relates to">Relates to</MenuItem>
                    <MenuItem value="Uses">Uses</MenuItem>
                    <MenuItem value="Authored by">Authored by</MenuItem>
                  </Select>
                </Grid>
                <Grid item={true} xs={3}>
                  <TextField
                    id="standard-textarea"
                    label="Multiline Placeholder\n line 2\n ..etc"
                    placeholder="Placeholder"
                    multiline
                    variant="standard"
                  />
                </Grid>
                <Grid item={true} xs={3}>
                  <Select>
                    <MenuItem value="Malware">Malware</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>
          {t_i18n('Cancel')}
        </Button>
      </DialogActions>
    </Dialog>

  );
};

export default BulkRelationDialog;
