import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Title from '../custom/Title';

// function preventDefault(event) {
//   event.preventDefault();
// }

const useStyles = makeStyles(theme => ({
  depositContext: {
    flex: 1,
  },
  seeMore: {
    color: theme.palette.primary,
    textDecoration: 'none'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Caisse</Title>
      <Typography component="p" variant="h4">
        3,024.00 €
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+ new Date().getDate()}
      </Typography>
      <div className={classes.seeMore}>
        <Link to="/treasury" className={classes.link}>
          <Button color="primary">
            Trésorerie
          </Button>
        </Link>
      </div>
    </React.Fragment>
  );
}
