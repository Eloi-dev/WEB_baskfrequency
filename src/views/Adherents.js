import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AdherentsTab from '../components/Adherents/AdherentsTab';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const Adherents = (props) => {
  const classes = useStyles();
  const { adherents } = props;

  return (
    <React.Fragment>
    <Paper className={classes.paper}>
        <AdherentsTab
          adherents={adherents}/>
      </Paper>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(Adherents);
