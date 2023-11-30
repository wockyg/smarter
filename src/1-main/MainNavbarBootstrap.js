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

export default function MainNavbar() {

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

  const { user, logout, nickname, updated_at } = useContext(UserContext);

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
    <Navbar bg="light" expand="lg" sticky="top">
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
            

            {/* <NavDropdown title={<IconButton sx={{background: '#FFFFFF', marginTop: 0.5}}><AddCircleIcon fontSize='small' /></IconButton>} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => handleOpen('adjuster')}>Add adjuster</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleOpen('casemanager')}>Add case manager</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleOpen('client')}>Add client</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleOpen('claimant')}>Add claimant</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleOpen('employer')}>Add employer</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleOpen('physician')}>Add physician</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleOpen('therapist')}>Add therapist</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleOpen('attorney')}>Add attorney</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => handleOpen('referral')}>Add referral</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleOpen('agreement')}>New Agreement</NavDropdown.Item>
            </NavDropdown> */}

            {/* <Nav.Link onClick={() => handleReset()}><IconButton sx={{background: '#FFFFFF', marginTop: 0.5}}><RestartAltIcon fontSize='small' /></IconButton></Nav.Link> */}
          
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
    </Navbar>
  );
}