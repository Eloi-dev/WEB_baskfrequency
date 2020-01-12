import React from 'react';
import { Link } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import EmailIcon from '@material-ui/icons/AlternateEmail';
import EuroIcon from '@material-ui/icons/Euro';

import Dashboard from '../../views/Dashboard';
import Adherents from '../../views/Adherents';
import AddAdherent from '../AddAdherent';
import Email from '../../views/Email';
import Treasury from '../../views/Treasury';

const navItems = [
  {path: '/', name: 'Dashboard', icon: <DashboardIcon/>, component: Dashboard},
  {path: '/adherents', name: 'Adhérents', icon: <PeopleIcon/>, component: Adherents},
  {path: '/email', name: 'Email', icon: <EmailIcon/>, component: Email},
  {path: '/treasury', name: 'Trésorerie', icon: <EuroIcon/>, component: Treasury}
]

export const  NavigationList = (props) => {
  return (
    <List>
    {navItems.map(item => (
        <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }} key={item.path}>
          <ListItem button selected={(props.location.pathname === item.path) ? true : false}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
              <ListItemText primary={item.name} />
          </ListItem>
        </Link>
    ))}
    </List>
  )
}

export const NavigationSwitch = (props) => {
  return (
    <Switch>
      {navItems.map(item => (
        <Route exact path={item.path} component={item.component} key={item.path}></Route>
      ))}
      <Route exact path="/add-adherent" component={AddAdherent} key="/add-adherent"></Route>
    </Switch>
  )
}