import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HTTP from '../lib/http';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Patients = (props) => {
  const classes = useStyles();
  const [patients, setPatients] = useState(null);
  const [eventCode, setEventCode] = useState('');
  const [codeCategory, setCodeCategory] = useState('');

  useEffect(() => {
    HTTP.get('/patients', { crossdomain: true }).then((response) =>
      setPatients(response.data),
    );
  }, []);

  const columns = [
    'ID',
    'Patient Name',
    'Age',
    'Event Code',
    'Event Date',
    'Code Category',
  ];

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <TextField
          id="standard-basic"
          label="Event code"
          onChange={(e) => setEventCode(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Code category"
          onChange={(e) => setCodeCategory(e.target.value)}
        />
      </Grid>
      <Grid item>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col}>{col}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(patients || [])
                .filter((p) => p.event_code.includes(eventCode))
                .filter((p) => p.code_category.includes(codeCategory))
                .map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell component="th" scope="row">
                      {patient.id}
                    </TableCell>
                    <TableCell align="right">{patient.patient_name}</TableCell>
                    <TableCell align="right">{patient.patient_age}</TableCell>
                    <TableCell align="right">{patient.event_code}</TableCell>
                    <TableCell align="right">
                      {moment(patient.event_date).format('YYYY-MM-DD')}
                    </TableCell>
                    <TableCell align="right">{patient.code_category}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Patients;
