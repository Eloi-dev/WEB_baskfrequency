import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import TopBar from './components/TopBar';
import Dashboard from './views/Dashboard';
import AddAdherent from './views/AddAdherent';
import Adherents from './views/Adherents';
import Footer from './components/Footer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";

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
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function App(props) {

  const RoutedTopBar = withRouter(props => <TopBar {...props}/>)
  const classes = useStyles();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#4caf50'
          },
        },
      }),
    [prefersDarkMode],
  );
  
  return (
    <div style={{display: 'flex'}}>
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
              <Box pt={4}>
                <Footer/>
              </Box>
            </Container>
        </main>
      </ThemeProvider>
    </div>
);
}