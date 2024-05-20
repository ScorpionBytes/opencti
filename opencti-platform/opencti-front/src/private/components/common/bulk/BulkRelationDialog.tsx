import React, { FunctionComponent } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl, Stack } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import ItemIcon from '../../../../components/ItemIcon';

interface BulkRelationDialogProps {
  stixDomainObjectId: string;
  stixDomainObjectType: string;
}

const BulkRelationDialog : FunctionComponent<BulkRelationDialogProps> = ({ stixDomainObjectId, stixDomainObjectType }) => {
  return (
    <>
      <DialogTitle>Create relations in bulk for {stixDomainObjectType}</DialogTitle>
      <DialogContent>
        <Typography>Id: {stixDomainObjectId}</Typography>
        <Typography>Name: Not implemented.</Typography>
        <FormControl>
          <Grid container={true} spacing={3}>
            <Grid item={true} xs={3}>
              <Typography> From </Typography>
              <Card variant="outlined"
                style={{
                  borderBottom: '1px solid #ffffff',
                }}
              >
                <ItemIcon type={stixDomainObjectType} />
                <Typography>{stixDomainObjectType}</Typography>
              </Card>
            </Grid>
            <Grid item={true} xs={3}>
              <Stack>
                <InputLabel id="relation-type">Relation type</InputLabel>
                <Select
                  defaultValue="Authored by"
                >
                  <MenuItem value="Relates to">Relates to</MenuItem>
                  <MenuItem value="Uses">Uses</MenuItem>
                </Select>
              </Stack>
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
              <Stack>
                <Select
                  defaultValue="Malware"
                >
                  <MenuItem value="Malware">Malware</MenuItem>
                </Select>
                <Select>
                  <MenuItem value="Malware">Malware</MenuItem>
                </Select>
                <Select>
                  <MenuItem value="Malware">Malware</MenuItem>
                </Select>
              </Stack>
            </Grid>
          </Grid>

        </FormControl>
      </DialogContent>
    </>

  );
};

export default BulkRelationDialog;
