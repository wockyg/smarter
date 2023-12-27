import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AddFormContext } from '../contexts/AddFormContext';
import { SearchContext } from '../contexts/SearchContext';
import { SelectedClaimContext } from '../contexts/SelectedClaimContext';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import AdbIcon from '@mui/icons-material/Adb';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';

import GridViewIcon from '@mui/icons-material/GridView';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import FaxIcon from '@mui/icons-material/Fax';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import SearchIcon from '@mui/icons-material/Search';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import IconButton from '@mui/material/IconButton';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BugReportIcon from '@mui/icons-material/BugReport';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import HistoryIcon from '@mui/icons-material/History';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import logo from '../img/logo_square.png';

import { useNavigate } from "react-router-dom";

import LogoutButton from '../6-userAuth/LogoutButton';
import ReferralQuickSearch from './ReferralQuickSearch';

import { useAuth0 } from "@auth0/auth0-react";

import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

import useGetUser from '../hooks/useGetUser';
import useGetUsers from '../hooks/useGetUsers';
import useUpdateUser from '../hooks/useUpdateUser';
import useAddBugReport from '../hooks/useAddBugReport';
import useAddFeatureRequest from '../hooks/useAddFeatureRequest';

import ReferralHistory from '../2-top/dashboard-widgets/ReferralHistory';

import { UserContext } from '../contexts/UserContext';

import { deepOrange, deepPurple } from '@mui/material/colors';

import { styled } from "@mui/material/styles";

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const StyledTab = styled(Tab)({
  "&.Mui-selected": {
    background: "#2572CD",
    color: '#000000',
    borderRadius: 3
  }
});

function a11yProps(index) {
  return {
    id: `referrals-tab-${index}`,
    'aria-controls': `referrals-tabpanel-${index}`,
  };
}

export default function MainNavbar() {

  // APP BAR SAMPLE CODE //

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // ------------------- //

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };


  const [anchorEl0, setAnchorEl0] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const [bugDialogOpen, setBugDialogOpen] = useState(false);
  const [bugForm, setBugForm] = useState({});
  const [featureDialogOpen, setFeatureDialogOpen] = useState(false);
  const [featureForm, setFeatureForm] = useState({});

  const open0 = Boolean(anchorEl0);
  const historyOpen = Boolean(anchorEl1);
  const openHelp = Boolean(anchorEl2);
  const openAdd = Boolean(anchorEl3);

  const { setAddModalOpen, setModalParty } = useContext(AddFormContext);
  const { setQuickSearchVal, setQuickSearchInputVal } = useContext(SearchContext);
  const { setPage: setNotesPage, setTab: setClaimTab , cptRows, setCptRows, setSelectedD1500 } = useContext(SelectedClaimContext);

  const { user, logout, nickname, updated_at, navbarTab: tab, setNavbarTab: setTab } = useContext(UserContext);

  const { status: statusUsers, data: users, error: errorUsers, isFetching: isFetchingUsers, isIdle: isIdleUsers} = useGetUsers();

  const updateUser = useUpdateUser();
  const addBugReport = useAddBugReport();
  const addFeatureRequest = useAddFeatureRequest();

  const navigate = useNavigate();

  const handleReset = () => {
      navigate('/');
      setQuickSearchVal(null);
      setQuickSearchInputVal('');
      setCptRows([]);
      setSelectedD1500(null);
  };

  const handleOpen = (party) => {
    handleCloseAdd();
    setModalParty(party);
    setAddModalOpen(true);
  }

  const handleOpenMenu0 = (event, n, f) => {
    setAnchorEl0(event.currentTarget);
    setAnchorEl1(null);
    setAnchorEl2(null);
    setAnchorEl3(null);
  };

  const handleOpenHistory = (event, n, f) => {
    setAnchorEl0(null);
    setAnchorEl1(event.currentTarget);
    setAnchorEl2(null);
    setAnchorEl3(null);
  };

  const handleOpenHelp = (event, n, f) => {
    setAnchorEl0(null);
    setAnchorEl1(null);
    setAnchorEl2(event.currentTarget);
    setAnchorEl3(null);
  };

  const handleOpenAdd = (event, n, f) => {
    setAnchorEl0(null);
    setAnchorEl1(null);
    setAnchorEl3(null);
    setAnchorEl3(event.currentTarget);
  };

  const handleCloseMenu0 = () => {
      setAnchorEl0(null);
  };

  const handleCloseHistory = () => {
      setAnchorEl1(null);
  };
  
  const handleCloseHelp = () => {
      setAnchorEl2(null);
  };

  const handleCloseAdd = () => {
      setAnchorEl3(null);
  };

  const handleClick = (event) => {
      updateUser.mutate({initials: user?.initials, lastLogout: new Date()});
      logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const handleOpenBugDialog = () => {
    setBugDialogOpen(true);
    handleCloseHelp();
  };

  const handleOpenFeatureDialog = () => {
    setFeatureDialogOpen(true);
    handleCloseHelp();
  };

  const handleCloseBugDialog = () => {
    setBugDialogOpen(false);
    setBugForm({});
  };

    const handleCloseFeatureDialog = () => {
    setFeatureDialogOpen(false);
    setFeatureForm({});
  };

  const handleUpdateBugForm = (e, k) => {
    if (k === 'screenshot') {
      setBugForm({...bugForm, screenshot: e.target.files[0]})
    }
    else {
      setBugForm({...bugForm, [k]: e.target.value})
    }
    // console.log(e.target.files);
  };

    const handleUpdateFeatureForm = (e, k) => {
    if (k === 'screenshot') {
      setFeatureForm({...featureForm, screenshot: e.target.files[0]})
    }
    else {
      setFeatureForm({...featureForm, [k]: e.target.value})
    }
    // console.log(e.target.files);
  };

  const handleSubmitBugReport = () => {

    // console.log({...bugForm, submittedBy: user?.initials});
    // bugForm.title && bugForm.description && addBugReport.mutate({...bugForm, submittedBy: user?.initials});

    const formData = new FormData();
    formData.append("title", bugForm.title);
    formData.append("description", bugForm.description);
    formData.append("screenshot", bugForm.screenshot);
    formData.append("submittedBy", user?.initials);
    // const test = [...formData.entries()];
    // console.log(test);
    bugForm.title && bugForm.description && addBugReport.mutate(formData);
    
    handleCloseBugDialog();
  };


  const handleSubmitFeatureRequest = () => {

    // console.log({...bugForm, submittedBy: user?.initials});
    // bugForm.title && bugForm.description && addBugReport.mutate({...bugForm, submittedBy: user?.initials});

    const formData = new FormData();
    formData.append("title", featureForm.title);
    formData.append("description", featureForm.description);
    formData.append("screenshot", featureForm?.screenshot);
    formData.append("submittedBy", user?.initials);
    // const test = [...formData.entries()];
    // console.log(test);
    featureForm.title && featureForm.description && addFeatureRequest.mutate(formData);
    
    handleCloseFeatureDialog();
  };

  return (
    <>

    <AppBar position="sticky">
      <Container fluid>
        <Toolbar disableGutters>
          <img
            alt=""
            src={logo}
            // width="30"
            height="50"
            style={{marginTop: 5, cursor: 'pointer'}}
            onClick={() => handleReset()}
          />

          {/* TODO: responsive minimized version of logo/menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          {/* ----------------------------------------------- */}

          <Box sx={{ paddingLeft: 2 }}>

          </Box>
          <ReferralQuickSearch sx={{marginRight: 5, marginLeft: 5}} />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>


            <Box sx={{ paddingLeft: 2 }}>
            <Tabs
            variant="scrollable"
            scrollButtons={false}
            value={tab} 
            onChange={handleChange} 
            // textColor="secondary"
            indicatorColor="secondary"
            aria-label="referral tabs">
                <StyledTab label={<div><GridViewIcon />{` Dashboard`}</div>} {...a11yProps(0)} />
                <StyledTab label={<div><PendingActionsIcon />{` Schedule`}</div>} {...a11yProps(1)} />
                <StyledTab label={<div><LocationOnIcon />{` Network Map`}</div>} {...a11yProps(7)} />
                <StyledTab label={<div><FaxIcon />{` Records Req.`}</div>} {...a11yProps(2)} />
                <StyledTab label={<div><RequestQuoteIcon />{` Billing`}</div>} {...a11yProps(3)} />
                <StyledTab label={<div><CalendarMonthIcon />{` Calendars`}</div>} {...a11yProps(5)} />
                <StyledTab label={<div><AssessmentIcon />{` Reports`}</div>} {...a11yProps(6)} />
                <StyledTab label={<div><SearchIcon />{` Search`}</div>} {...a11yProps(4)} />
                {/* <Tab label="Bug Reports" {...a11yProps(8)} /> */}
            </Tabs>
            </Box>



            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}


          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{border: 1, width: 30, height: 30, marginRight: 1}} onClick={handleOpenAdd}>
            <AddCircleIcon />
          </IconButton>
          <IconButton sx={{border: 1, width: 30, height: 30, marginRight: 1}} onClick={handleOpenHistory}>
            <HistoryIcon />
          </IconButton>
          <IconButton sx={{border: 1, width: 30, height: 30}} onClick={handleOpenHelp}>
            <QuestionMarkIcon fontSize='small' />
          </IconButton>
            <IconButton onClick={handleOpenMenu0}>
            <Avatar key={user?.initials} sx={{cursor: 'pointer', bgcolor: deepOrange[500], width: 30, height: 30, fontSize: 13}}>{user?.initials}</Avatar>
          </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    
    

    {/* <Navbar bg="light" expand="lg" sticky="top">
      <Container fluid style={{background: '#2572CD', height: 55}}>
        <Navbar.Brand style={{cursor: 'pointer'}} onClick={() => handleReset()}>
          <img
              alt=""
              src={logo}
              // width="30"
              height="50"
              style={{marginTop: 5}}
            />
          
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="smarter-navbar-nav" />
        <Navbar.Collapse id="smarter-navbar-nav">
          <Nav className="me-auto">
          
          </Nav>
          
          <ReferralQuickSearch />

          <IconButton sx={{border: 1, width: 30, height: 30, marginRight: 1}} onClick={handleOpenAdd}>
            <AddCircleIcon />
          </IconButton>
          <IconButton sx={{border: 1, width: 30, height: 30, marginRight: 1}} onClick={handleOpenHistory}>
            <HistoryIcon />
          </IconButton>
          <IconButton sx={{border: 1, width: 30, height: 30}} onClick={handleOpenHelp}>
            <QuestionMarkIcon fontSize='small' />
          </IconButton>

          <Nav className="justify-content-end">
            {users?.filter(r => r.lastLogout < r.lastLogin && r.initials !== user?.initials).map((row) => {
              return (
                <Avatar key={row.initials} sx={{cursor: 'pointer'}}>{row?.initials}</Avatar>
              );
            })}
          </Nav>

          <IconButton onClick={handleOpenMenu0}>
            <Avatar key={user?.initials} sx={{cursor: 'pointer', bgcolor: deepOrange[500], width: 30, height: 30, fontSize: 13}}>{user?.initials}</Avatar>
          </IconButton>
          
        </Navbar.Collapse>
      </Container>
    </Navbar> */}

    <Menu
        id="extras-add-menu"
        anchorEl={anchorEl0}
        open={open0}
        onClose={handleCloseMenu0}
      >

         <MenuItem>
            Profile
        </MenuItem>

        <MenuItem>
            Settings
        </MenuItem>

        <MenuItem  onClick={(e) => handleClick(e)}>
            Logout
        </MenuItem>
            
    </Menu>

    <Menu
      id="history-menu"
      anchorEl={anchorEl1}
      open={historyOpen}
      onClose={handleCloseHistory}
    >
      <ReferralHistory user={user} handleCloseHistory={handleCloseHistory} />     
    </Menu>

    <Menu
      id="extras-add-menu"
      anchorEl={anchorEl2}
      open={openHelp}
      onClose={handleCloseHelp}
    >

        <MenuItem onClick={handleOpenBugDialog}>
          <Grid container spacing={1}>
            <Grid item>
              <BugReportIcon />
            </Grid>
            <Grid item>
              {`Submit Bug Report`}
            </Grid>
          </Grid>
      </MenuItem>

      <MenuItem onClick={handleOpenFeatureDialog}>
          <Grid container spacing={1}>
            <Grid item>
              <LightbulbIcon />
            </Grid>
            <Grid item>
              {`Submit Feature Request`}
            </Grid>
          </Grid>
      </MenuItem>
          
    </Menu>

    <Menu
      id="add-menu"
      anchorEl={anchorEl3}
      open={openAdd}
      onClose={handleCloseAdd}
      // MenuListProps={{ onMouseLeave: handleCloseAdd }}
    >

      <MenuItem onClick={() => handleOpen('adjuster')}>Add adjuster</MenuItem>
      <MenuItem onClick={() => handleOpen('casemanager')}>Add case manager</MenuItem>
      <MenuItem onClick={() => handleOpen('client')}>Add client</MenuItem>
      <MenuItem onClick={() => handleOpen('claimant')}>Add claimant</MenuItem>
      <MenuItem onClick={() => handleOpen('employer')}>Add employer</MenuItem>
      <MenuItem onClick={() => handleOpen('physician')}>Add physician</MenuItem>
      <MenuItem onClick={() => handleOpen('therapist')}>Add therapist</MenuItem>
      <MenuItem onClick={() => handleOpen('attorney')}>Add attorney</MenuItem>
      <hr />
      <MenuItem onClick={() => handleOpen('referral')}>Add referral</MenuItem>
      <MenuItem onClick={() => handleOpen('agreement')}>New Agreement</MenuItem>
          
    </Menu>

    <Dialog open={bugDialogOpen} onClose={handleCloseBugDialog}>
      <DialogTitle>Submit Bug Report</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          margin="dense"
          id="title"
          name="title"
          label="Title"
          value={bugForm.title || ''}
          onChange={(e) => handleUpdateBugForm(e, 'title')}
          // variant="standard"
        />
        <br /><br />
        <DialogContentText>
          Please describe the issue in as much detail as possible:
        </DialogContentText>
        <TextField
          fullWidth
          multiline
          rows={4}
          margin="dense"
          id="description"
          name="description"
          label="Description"
          value={bugForm.description || ''}
          onChange={(e) => handleUpdateBugForm(e, 'description')}
          // variant="standard"
        />
        <br /><br />
        <label htmlFor="screenshot" style={{display: 'block', fontSize: 13}}>Upload screenshot:</label>
        <input
        type="file"
        id="screenshot"
        name="screenshot"
        // value={bugForm.screenshot || ''}
        onChange={(e) => handleUpdateBugForm(e, 'screenshot')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseBugDialog}>Cancel</Button>
        <Button onClick={handleSubmitBugReport}>Submit</Button>
      </DialogActions>
    </Dialog>

    <Dialog open={featureDialogOpen} onClose={handleCloseFeatureDialog}>
      <DialogTitle>Submit Feature Request</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          margin="dense"
          id="title"
          name="title"
          label="Title"
          value={featureForm.title || ''}
          onChange={(e) => handleUpdateFeatureForm(e, 'title')}
          // variant="standard"
        />
        <br /><br />
        <DialogContentText>
          Please describe the desired feature in as much detail as possible:
        </DialogContentText>
        <TextField
          fullWidth
          multiline
          rows={4}
          margin="dense"
          id="description"
          name="description"
          label="Description"
          value={featureForm.description || ''}
          onChange={(e) => handleUpdateFeatureForm(e, 'description')}
          // variant="standard"
        />
        <br /><br />
        <label htmlFor="screenshot" style={{display: 'block', fontSize: 13}}>Upload screenshot:</label>
        <input
        type="file"
        id="screenshot"
        name="screenshot"
        // value={bugForm.screenshot || ''}
        onChange={(e) => handleUpdateFeatureForm(e, 'screenshot')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseFeatureDialog}>Cancel</Button>
        <Button onClick={handleSubmitFeatureRequest}>Submit</Button>
      </DialogActions>
    </Dialog>
    </>
  );
}