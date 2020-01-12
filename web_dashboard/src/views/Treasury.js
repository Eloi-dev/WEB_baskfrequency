import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';

import TransfersTab from '../components/Treasury/TransfersTab';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const Treasury = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <TransfersTab transfers={props.transfers}/>
      </Paper>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(Treasury);
