import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Grid } from '@material-ui/core';

import DelAdherentsButton from "./DelAdherentsButton";
import SkeletonLoad from '../custom/SkeletonLoad';

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
  { id: 'id', numeric: true, disablePadding: false, label: 'ID' },
  { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
  { id: 'phone', numeric: true, disablePadding: false, label: 'Phone' },
  { id: 'date', numeric: true, disablePadding: false, label: 'Date' },
  { id: 'donation', numeric: true, disablePadding: false, label: 'Donation' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, isSelected, isModifySwitched, adherentsLength } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
            {isModifySwitched ?
                <Checkbox
                    disabled={adherentsLength === 0 ? true : false}
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={isSelected}
                    onChange={onSelectAllClick}
                    inputProps={{ 'aria-label': 'select all desserts' }}
                />
                : null
            }
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
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
    [theme.breakpoints.up('xs')]: {
      textAlign: 'center',
      marginLeft: theme.spacing(0),
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'start',
      marginLeft: theme.spacing(1),
     },
  },
  titleGrid : {
    order: 0,
    [theme.breakpoints.up('xs')]: {
      marginTop: theme.spacing(1),
      order: 1,
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(0),
      order: 0,
    },
  },
  controlGrid: {
    order: 1,
    [theme.breakpoints.up('xs')]: {
      marginTop: theme.spacing(1),
      order: 0,
    },
    [theme.breakpoints.up('sm')]: {
      order: 1,
      marginTop: theme.spacing(0),
    },
  },
  select: {
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { selected, onSwitchModify, isModifySwitched, adherentsLength } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: isModifySwitched,
      })}
    >
      <Grid container>
        <Grid xs={12} sm={8}  className={classes.titleGrid}>
          {isModifySwitched ? (
            <Typography className={classes.title} color="indehit" variant="h6" id="tableTitle">
              {selected.length} adhérents sélectionnés.
            </Typography>
          ) : (
            <Typography className={classes.title} variant="h5" id="tableTitle" color="primary">
                Tous les adhérents
            </Typography>
          )}
        </Grid>
        <Grid xs={12} sm={4} container justify="center" className={classes.controlGrid}>
          <Grid container xs={6} justify="flex-start">
            <FormControlLabel
              disabled={adherentsLength === 0 && !isModifySwitched ? true : false}
              className={classes.select}
              control={
                <Switch checked={isModifySwitched} onChange={onSwitchModify} value="Sélection" />
              }
              label="Sélection"
              labelPlacement="start"
              />
          </Grid>
          <Grid container xs={6} justify="flex-end">
            {isModifySwitched ? (
              <DelAdherentsButton disabled={(selected.length === 0) ? true : false} trash={selected}/>
              ) : (
                <Link to="/add-adherent" style={{ textDecoration: 'none' , color: 'white'}} className={classes.add}>
                  <Button color="primary" variant="outlined">
                      Ajouter
                  </Button>
              </Link>
            )}
        </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
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
}));

const AllAdherentsTab = (props) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('fullname');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const { adherents } = props;
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [modify, setModify] = React.useState(false);
//   const [dense, setDense] = React.useState(false);
    const dense = false

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const switchModify = event => {
    setModify(event.target.checked);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      setSelected([...adherents.all]);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, adherent) => {    
    if (!modify) {
        return;
    }
    for (var i=0; i < selected.length; i++) {
        if (selected[i].id === adherent.id) {
            selected.splice(i, 1);
            setSelected([...selected]);
            return;
        }
    }
    setSelected([...selected, adherent]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = id => {
    for (var i=0; i < selected.length; i++) {
        if (selected[i].id === id) {
            return true
        }
    }
    return false;
} 
        
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, adherents.all.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
        <EnhancedTableToolbar 
          selected={selected} 
          onSwitchModify={switchModify} 
          isModifySwitched={modify} 
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
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={adherents.all.length}
              isModifySwitched={modify}
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
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected && modify}
                    >
                      <TableCell padding="checkbox">
                        {modify ?
                          <Checkbox
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                              />
                              : null
                          }
                      </TableCell>
                      <TableCell padding="none">{row.lastname + ' ' + row.firstname}</TableCell>
                      <TableCell align="right">{row.id}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                      <TableCell align="right">{row.date}</TableCell>
                      <TableCell align="right">{row.donation}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={adherents.all.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </div>
  );
}

export default class AdherentsTab extends React.Component {
  render() {
    return (this.props.adherents.loading) ? (
      <div>
        <SkeletonLoad/>
        <SkeletonLoad/>
        <SkeletonLoad/>
        <SkeletonLoad/>
      </div>
    ) : (
      <AllAdherentsTab
        adherents={this.props.adherents}
      />
      )
  }
}
