import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './config/theme';

import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import store from './redux/store';
import { connect } from 'react-redux';
import * as adherents from './redux/actions/adherents';
import * as login from './redux/actions/login';

import TopBar from './components/navigation/TopBar';
import Dashboard from './views/Dashboard';
import AddAdherent from './components/AddAdherent';
import Adherents from './views/Adherents';


const mapDispatchToProps = dispatch => {
  return  {
    initData: () => dispatch(login.post(() => {
        dispatch(adherents.get(store.getState().login.account.token));
    }))
  }
}

const styles = theme => ({
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
  },
  fixedHeight: {
    height: 240,
  },
});

class App extends React.Component {

  componentDidMount = () => {
    this.props.initData()
  }

  render = () => {
    const RoutedTopBar = withRouter(props => <TopBar {...props}/>)
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RoutedTopBar/>
          <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Container maxWidth="lg" className={classes.container}>
                <Switch>
                  <Route exact path="/" component={Dashboard}/>
                  <Route path="/adherents" component={Adherents}/>
                  <Route path="/add-adherent" component={AddAdherent} />
                </Switch>
                {/* <Box pt={4}>
                  <Footer/>
                </Box> */}
              </Container>
          </main>
        </ThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(App));
