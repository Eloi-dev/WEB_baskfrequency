import React from 'react';
import SkeletonLoad from '../custom/SkeletonLoad';
import { makeStyles } from '@material-ui/core/';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';

import LastAdherentsTab from './LastAdherentsTab';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const LastAdherents = (props) => {
  const classes = useStyles();
  const { adherents } = props;
  
  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        {props.adherents.loading ? <SkeletonLoad/> : (
          <LastAdherentsTab
          adherents={adherents}/>
        )}
      </Paper>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(LastAdherents);