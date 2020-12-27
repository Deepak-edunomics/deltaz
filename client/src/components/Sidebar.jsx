import React, {useState} from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import {useSelector, useDispatch } from 'react-redux'
// import logo from './img/logo.svg';
import Home from "./Home";
import "../App.css";
// Icons
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import AcUnitOutlinedIcon from "@material-ui/icons/AcUnitOutlined";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import EvStationIcon from "@material-ui/icons/EvStation";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import RestoreIcon from "@material-ui/icons/Restore";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { Avatar } from "@material-ui/core";
import LogoutModal from './LogoutModal'

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: "#1a163d",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  largeAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  nested:{
    color:'white !important',
  }
}));
const drawerOpenStyles = makeStyles((theme) => ({
  drawerItem:{
    borderTopLeftRadius:'10px',
    borderTopRightRadius:'10px',
    backgroundColor:'#676481',
    marginBottom:'10px',
    marginTop:'10px',
    '&:hover': {
      backgroundColor: "#676481",
   },
  },
  innerListItem:{
    borderBottomLeftRadius:'10px',
    borderBottomRightRadius:'10px',    
    backgroundColor:'#676481',
  }
}));

const drawerCloseStyles = makeStyles((theme) => ({
  drawerItem:{
    borderTopLeftRadius:'0px',
    borderTopRightRadius:'0px',
    marginBottom:'10px',
    marginTop:'10px',
  },
  innerListItem:{
    borderBottomLeftRadius:'0px',
    borderBottomRightRadius:'0px',    
  }
}));

function Sidebar(props) {
  const reduxData = useSelector(store => store.userRoot)
  const {user} = reduxData
  const { container } = props;
  const classes = useStyles();
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const openDrawerStyle = drawerOpenStyles()
  const closeDrawerStyle = drawerCloseStyles()
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [openE3Apps, setOpenE3Apps] = React.useState(false);
  const [openVesion, setOpenVesion] = React.useState(false);
  const [openInsights, setOpenInsights] = React.useState(false);
  const [openDemandResponse, setOpenDemandResponse] = React.useState(false);
  const [openBlogs, setOpenBlogs] = React.useState(false);
  const [openHelps, setOpenHelps] = React.useState(false);

  const handleBlogsClick = () => {
    setOpenBlogs(!openBlogs);
  };
  const handleDemandResponseClick = () => {
    setOpenDemandResponse(!openDemandResponse);
  };

  const handleInsightsClick = () => {
    setOpenInsights(!openInsights);
  };

  const handleVesionClick = () => {
    setOpenVesion(!openVesion);
  };

  const handleE3AppsClick = () => {
    setOpenE3Apps(!openE3Apps);
  };

  const handleHelpsClick = () => {
    setOpenHelps(!openHelps);
  };

  const drawer = (
    <div className="p-3">
      <div className="h4 ml-3 pl-4 pl-md-2 py-2 font-weight-bolder text-white text-left">
        Grid Manager 2.0
      </div>
      <Divider className="bg-white px-4 mx-3" />
      <div className="my-3 row">
        <div className="col-auto">
          <Avatar className={classes.largeAvatar} />
        </div>

        <div className="col-auto text-white mt-2">
          <div className="h6">{user.name}</div>
        </div>
      </div>
      <List className="text-white">
        <ListItem button component={Link} to="/" className="text-white">
          <ListItemIcon className="text-white">
            <DashboardOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={handleE3AppsClick} className={openE3Apps?openDrawerStyle.drawerItem:closeDrawerStyle.drawerItem}>
          <ListItemIcon className="text-white">
            <VpnKeyOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="E3 Apps" />
          {openE3Apps ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </ListItem>
        <Collapse in={openE3Apps} timeout="auto" unmountOnExit>
          <List component="div" disablePadding className={openE3Apps?openDrawerStyle.innerListItem:closeDrawerStyle.innerListItem}>
            <ListItem button className={classes.nested} component={Link} to="/">
              <ListItemIcon className="text-white">
                <VpnKeyOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Peak Shaving & Alert" />
            </ListItem>
            <ListItem button className={classes.nested} component={Link} to="/">
              <ListItemIcon className="text-white">
                <AcUnitOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Ventilation" />
            </ListItem>
            <ListItem button className={classes.nested} component={Link} to="/">
              <ListItemIcon className="text-white">
                <VpnKeyOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Cooling" />
            </ListItem>

            <ListItem button className={classes.nested} component={Link} to="/">
              <ListItemIcon className="text-white">
                <VpnKeyOutlinedIcon />
              </ListItemIcon>

              <ListItemText primary="Heat Pump" />
            </ListItem>

            <ListItem button className={classes.nested} component={Link} to="/">
              <ListItemIcon className="text-white">
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText primary="Out of Hours" />
            </ListItem>
            <ListItem button className={classes.nested} component={Link} to="/">
              <ListItemIcon className="text-white">
                <EvStationIcon />
              </ListItemIcon>

              <ListItemText primary="Ev Charging" />
            </ListItem>
            <ListItem button className={classes.nested} component={Link} to="/">
              <ListItemIcon className="text-white">
                <AccessTimeIcon />
              </ListItemIcon>

              <ListItemText primary="Load Shifting" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={handleDemandResponseClick} className={openDemandResponse?openDrawerStyle.drawerItem:closeDrawerStyle.drawerItem}>
          <ListItemIcon className="text-white">
            <AccessTimeIcon />
          </ListItemIcon>

          <ListItemText primary="Demand Response" />
          {openDemandResponse ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </ListItem>
        <Collapse in={openDemandResponse} timeout="auto" unmountOnExit>
          <List component="div" disablePadding className={openDemandResponse?openDrawerStyle.innerListItem:closeDrawerStyle.innerListItem} >
            <ListItem button component={Link} to="/"  className="text-white">
              <ListItemIcon className="text-white">
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText primary="View Help" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={handleInsightsClick} className={openInsights?openDrawerStyle.drawerItem:closeDrawerStyle.drawerItem}>
          <ListItemIcon className="text-white">
            <AccessTimeIcon />
          </ListItemIcon>
          <ListItemText primary="Insights" />
          {openInsights ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </ListItem>
        <Collapse in={openInsights} timeout="auto" unmountOnExit>
          <List component="div" disablePadding className={openInsights?openDrawerStyle.innerListItem:closeDrawerStyle.innerListItem}>
            <ListItem button component={Link} to="/" className="text-white">
              <ListItemIcon className="text-white">
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText primary="View Help" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={handleVesionClick} className={openVesion?openDrawerStyle.drawerItem:closeDrawerStyle.drawerItem}>
          <ListItemIcon className="text-white">
            <RestoreIcon />
          </ListItemIcon>

          <ListItemText primary=" Version History" />
          {openVesion ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </ListItem>
        <Collapse in={openVesion} timeout="auto" unmountOnExit>
          <List component="div" disablePadding className={openVesion?openDrawerStyle.innerListItem:closeDrawerStyle.innerListItem}>
            <ListItem button component={Link} to="/" className="text-white">
              <ListItemIcon  className="text-white">
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText  primary="View Help" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={()=>setShowLogoutModal(true)} >
          <ListItemIcon className="text-white">
            <PowerSettingsNewIcon />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <LogoutModal showLogoutModal={showLogoutModal} setShowLogoutModal={setShowLogoutModal} />
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{ backgroundColor: "white" }}
        position="fixed"
        className={`${classes.appBar} d-md-none`}
      >
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          {/* <img src={logo} style={{maxHeight:"60px"}} className="img-fluid my-2 ml-auto" /> */}
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>

        <main className={classes.content}>
            <Home/>
        </main>
      </BrowserRouter>
      </div>
      </>
  );
}

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  ),
};

export default Sidebar;
