import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import {makeStyles} from '@material-ui/core/styles';

const skeletonStyles = makeStyles(theme => ({
    root: {
      paddingTop: theme.spacing(4)
    },
    skeleton: {
      margin: theme.spacing(2),
      height: 40
    }
  }));
  
  const SkeletonLoad = (props) => {
    const classes = skeletonStyles();
  
    return (
      <div className={classes.root}>
        <Skeleton className={classes.skeleton}/>
        <Skeleton className={classes.skeleton}animation={false} />
        <Skeleton className={classes.skeleton}animation="wave" />
        <Skeleton className={classes.skeleton}/>
      </div>
    )
}

export default SkeletonLoad;