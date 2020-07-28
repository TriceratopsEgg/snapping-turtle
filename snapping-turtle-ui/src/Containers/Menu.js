import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { List, Divider, ListItem, ListItemText, ListItemIcon, Drawer, CssBaseline, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { Dashboard as DashboardIcon, Assessment, Settings as SettingsIcon, Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@material-ui/icons';
import { Route } from 'react-router-dom'

import { colours, sizes } from '../Common/UISettings';

import UserProfile from '../Components/UserProfile';
import Dashboard from './Dashboard';
import Reports from '../Components/Reports';
import Settings from './Settings';

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

const drawerWidth = sizes.drawerWidth;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    //backGroundImage: `background-image: linear-gradient(to right, ${Colours.secondary}, ${Colours.contrasting})`
    color: colours.primaryAlt
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const SideMenu = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Snapping Turtle
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List aria-label="main functionality">
            <ListItemLink to={props.match.url + "/dashboard"} primary="Dashboard" icon={<DashboardIcon />} />
            <ListItemLink to={props.match.url + "/reports"} primary="Reports" icon={<Assessment />} />
            <ListItemLink to={props.match.url + "/settings"} primary="Settings" icon={<SettingsIcon />} />
          </List>
          <Divider />
          <List aria-label="account managements">
            <ListItemLink to={props.match.url + "/profile"} primary="Profile" />
            <ListItemLink to={props.match.url + "/logout"} primary="Logout" />
          </List>
        </Drawer>
        <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
            <div className={classes.drawerHeader} />
            <Route path={props.match.url + '/dashboard'} component={Dashboard} />
            <Route path={props.match.url + '/reports'} component={Reports} />
            <Route path={props.match.url + '/settings'} component={Settings} />
            <Route path={props.match.url + '/profile'} component={UserProfile} />
        </main>
      </div>
  );
}

export default SideMenu;
