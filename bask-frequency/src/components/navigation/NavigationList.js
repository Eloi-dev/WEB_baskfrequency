import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import EmailIcon from '@material-ui/icons/AlternateEmail';
import {
  Link
} from "react-router-dom";

export function NavigationList(props) {
  return (
    <List>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button selected={(props.location.pathname === "/") ? true : false}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
              <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link to="/adherents" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem button selected={(props.location.pathname === "/adherents") ? true : false}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Adhérents" />
          </ListItem>
        </Link>
        <Link to="/email" style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem button selected={(props.location.pathname === "/email") ? true : false}>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Email" />
          </ListItem>
        </Link>
    </List>
  )
}
