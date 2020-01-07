import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Title from '../components/Title';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import AdherentsList from '../components/AdherentList';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '75vh'
  },
  tab: {
    marginTop: theme.spacing(4),
  }
}));

export default function Adherents() {
  const classes = useStyles();

  return (
    <div>
    <React.Fragment>
    <Paper className={classes.paper}>
      <Box 
          display="flex"
          flexDirection="row"
          >
            <Box flexGrow={1}>
              <Title>Tous les adhérents</Title>
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
        </Paper>
      </React.Fragment>
    </div>
  );
}
