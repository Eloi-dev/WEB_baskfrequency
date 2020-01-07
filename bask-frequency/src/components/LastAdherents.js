import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AdherentsList from '../components/AdherentList';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
import Title from './Title';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(4),
    color: theme.palette.primary,
    textDecoration: 'none'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  tab: {
    marginTop: theme.spacing(6)
  }
}));

export default function LastAdherents() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Box 
        display="flex"
        flexDirection="row"
        >
          <Box flexGrow={1}>
            <Title>Derniers adhérents</Title>
          </Box>
          <Box>
            <Link to="/add-adherent" style={{ textDecoration: 'none' , color: 'white'}} className={classes.addAdherent}>
            <Button color="primary" variant="outlined">
              Ajouter
            </Button>
            </Link>
          </Box>
      </Box>
      <Table size="small" className={classes.tab}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Nom - Prénom</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Tél</TableCell>
            <TableCell align="right">Donation</TableCell>
          </TableRow>
        </TableHead>
        <AdherentsList/>
      </Table>
      <div className={classes.seeMore}>
        <Link to="/adherents" className={classes.link}>
          Tous les adhérents
        </Link>
      </div>
    </React.Fragment>
  );
}
