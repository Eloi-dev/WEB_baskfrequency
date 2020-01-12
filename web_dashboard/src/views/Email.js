import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import EmailList from '../components/Email/EmailList';
import EmailContent from '../components/Email/EmailContent';

const useStyles = makeStyles(theme => ({
  paper: {
    // display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    flex: 1,
    height: 500
  },
  left: {
    padding: theme.spacing(2),
  },
  right: {
    padding: theme.spacing(0),
  }
}));

const mapStateToProps = (state) => {
    return state;
}

const Email = (props) => {
  const classes = useStyles();
  const leftPaper = clsx(classes.paper, classes.left);
  const rightPaper = clsx(classes.paper, classes.right);
  const { adherents } = props;
  // const [selected, setSelected] = React.useState([]);
  const selected = []

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Paper className={leftPaper}>
              <EmailContent adherents={adherents} selected={selected}/>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={rightPaper}>
            <EmailList adherents={adherents} selected={selected}/>
          </Paper>
        </Grid>       
      </Grid>
    </div>
  );
}

export default connect(mapStateToProps)(Email);
