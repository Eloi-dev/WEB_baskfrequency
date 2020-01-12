import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SkeletonLoad from '../custom/SkeletonLoad';
import { Grid } from '@material-ui/core';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  { id: 'fullname', numeric: false, disablePadding: true, label: 'Nom / Prénoms' },
  { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
  { id: 'phone', numeric: true, disablePadding: false, label: 'Phone' },
  { id: 'date', numeric: true, disablePadding: false, label: 'Date' },
  { id: 'donation', numeric: true, disablePadding: false, label: 'Donation' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"/>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: '#424242',
        },
  title: {
    flex: '1 1 100%',
    textAlign: 'start',
    marginLeft: theme.spacing(1),
  },
  select: {
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { isModifySwitched } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: isModifySwitched,
      })}
    >
      <Grid container>
        <Grid xs={6}>
            <Typography className={classes.title} variant="h5" id="tableTitle" color="primary">
              Derniers adhérents
            </Typography>
        </Grid>
        <Grid xs={6} container justify="flex-end" alignItems="center">
            <Link to="/add-adherent" style={{ textDecoration: 'none' , color: 'white'}} className={classes.add}>
                <Button color="primary" variant="outlined">
                    Ajouter
                </Button>
            </Link>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
    seeMore: {
      margin: theme.spacing(1),
      color: theme.palette.primary,
      textDecoration: 'none'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const AllAdherentsTab = (props) => {
    const classes = useStyles();
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('fullname');
    const { adherents } = props;
    const dense = false
    const page = 0;
    const rowsPerPage = 3;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
        
  return (
    <div className={classes.root}>
        <EnhancedTableToolbar 
          adherentsLength={adherents.all.length}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="all adherents"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={adherents.all.length}
              adherentsLength={adherents.all.length}
            />
            <TableBody>
                {adherents.all.length === 0 && !adherents.loading ?
                    <TableRow>
                        <TableCell align="right" colSpan={4}>Il n'y a pas d'adhérents</TableCell>
                    </TableRow>
                    : null
                }
              {stableSort(adherents.all, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell padding="checkbox"/>
                      <TableCell padding="none">{row.lastname + ' ' + row.firstname}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                      <TableCell align="right">{row.date}</TableCell>
                      <TableCell align="right">{row.donation}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.seeMore}>
          <Link to="/adherents" className={classes.link}>
            <Button color="primary">
              Tous les adhérents
            </Button>
          </Link>
        </div>
    </div>
  );
}

export default class AdherentsTab extends React.Component {
  render() {
    return (this.props.adherents.loading) ? (
      <div>
        <SkeletonLoad/>
      </div>
    ) : (
      <AllAdherentsTab
        adherents={this.props.adherents}
      />
      )
  }
}
