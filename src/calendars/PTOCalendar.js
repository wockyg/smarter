import { useState, useContext, useRef } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { deepOrange, deepPurple } from '@mui/material/colors';

import AddBoxIcon from '@mui/icons-material/AddBox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Badge from '@mui/material/Badge';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import useGetReferralsCalendar from '../hooks/useGetReferralsCalendar';
import useGetUsers from '../hooks/useGetUsers';

import useAddPTO from '../hooks/useAddPTO';
import useGetPTOUser from '../hooks/useGetPTOUser';
import useGetPTOAllUsers from '../hooks/useGetPTOAllUsers';
import useUpdatePTO from '../hooks/useUpdatePTO';

import { careCoordinators } from '../lookup-tables/lookup_careCoordinators';

import { UserContext } from '../contexts/UserContext';

import { useNavigate } from "react-router-dom";

import '../App.css';

import { ref } from 'yup';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

export default function PTOCalendar(props) {

    const { user } = useContext(UserContext);

    const { status: statusPto, data: pto, error: errorPto, isFetching: isFetchingPto } = useGetPTOUser(+user?.userId);
    const { status: statusPtoAll, data: ptoAll, error: errorPtoAll, isFetching: isFetchingPtoAll } = useGetPTOAllUsers();
    const { status: statusUsers, data: users, error: errorUsers, isFetching: isFetchingUsers } = useGetUsers();
    
    const ptoPending = ptoAll?.filter(p => p.status === 'pending');
    const ptoApproved = pto?.filter(p => p.status === 'approved');

    const ptoFilteredTitle = ptoAll?.map(p => {return ({...p, title: `${careCoordinators.filter(c => c.userId === p.userId)[0].TeamMember}`})});

    // console.log(ptoFilteredTitle);

    const ptoAdd = useAddPTO();
    const ptoUpdate = useUpdatePTO();

    const [selectedFilter, setSelectedFilter] = useState("mypto");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [ptoForm, setPtoForm] = useState({});

    const calendarRef = useRef();

    // const ptoFiltered = pto?.filter(p => selectedFilter === 'Approved' ? p.dateApproved : (selectedFilter === 'Denied' ? p.dateDenied : (selectedFilter === 'Pending' ? (!p.dateApproved && !p.dateDenied) : true)))
    // const ptoFiltered = pto?.filter(p => selectedFilter === p.status || selectedFilter === 'all');

    let numDaysRemaining = user?.maxDaysPTO;
    ptoApproved?.forEach(p => {numDaysRemaining -= p.numDays});
    // console.log(numDaysRemaining)

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    const handleSelectedFilter = (event, newFilter) => {
        if (newFilter !== null){
            setSelectedFilter(newFilter);
        }
    };

    const handleClickListItem = (date) => {
        console.log("Go to date ", date, "...");
        const calendarApi = calendarRef.current.getApi();
        calendarApi.gotoDate(date);
    };

    const handleClickApprove = (id) => {
        console.log("approved...", id);
        ptoUpdate.mutate({ptoId: id, dateApproved: new Date()});
        
    };

    const handleClickDeny = (id) => {
        console.log("denied...", id);
        ptoUpdate.mutate({ptoId: id, dateDenied: new Date()});
        
    };

    const handleOpenDialog = (event) => {
        console.log("Open Dialog");
        setDialogOpen(true);
    };

    const handleCloseDialog = (event) => {
        console.log("Close Dialog");
        setPtoForm({});
        setDialogOpen(false);
    };

    const handleUpdateForm = (e, k) => {
        setPtoForm({...ptoForm, [k]: e.target.value})
    };

    const handleSubmit = () => {
        console.log("Submitting PTO Request");
        console.log(ptoForm);
        const values = {userId: user?.userId, ...ptoForm};
        if(user?.initials === 'JT'){
            values.dateApproved = new Date();
        }
        console.log(values);
        values.start && values.start !== '' && values.userId && ptoAdd.mutate(values);
        
        handleCloseDialog();
  };

    return(

        pto && ptoAll &&
        
        <Container style={{background: '#FFFFFF', height: 500, width: '100%'}}>
            <Grid container spacing={2}>
                {/* calendar */}
                <Grid item xs={8}>
                    <FullCalendar
                    // height={500}
                    ref={calendarRef}
                    aspectRatio={1.5}
                    contentHeight={500}
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    weekends={false}
                    events={(selectedFilter === 'all' || selectedFilter === 'pending') ? ptoFilteredTitle : (selectedFilter === 'mypto' ? pto : [])}
                    // eventClick={(e) => handleEventClick(e)}
                    />
                </Grid>
                {/* list */}
                <Grid item xs={4}>
                    <Box 
                    sx={{ 
                        // background: '#99A3A4', 
                        width: '100%', 
                        height: 50, 
                        // border: '1px solid black'
                        // paddingTop: 8 
                    }}>
                        <Grid container>
                            <Grid item xs={9}>
                                <ToggleButtonGroup
                                size="small"
                                value={selectedFilter}
                                exclusive
                                onChange={handleSelectedFilter}
                                aria-label="text alignment"
                                >
                                    <ToggleButton value="mypto" aria-label="mypto">
                                        My PTO
                                    </ToggleButton>
                                    {user.ptoPermissions &&
                                    <ToggleButton value="all" aria-label="all">
                                        All PTO
                                    </ToggleButton>
                                    }
                                    {user.ptoPermissions &&
                                    <ToggleButton value="pending" aria-label="pending">
                                        Requests
                                    </ToggleButton>
                                    }
                                </ToggleButtonGroup>
                            </Grid>
                            <Grid item xs={1.5}>
                                <IconButton sx={{paddingTop: 2}}>
                                    <Badge color='primary' badgeContent={numDaysRemaining} />
                                </IconButton>
                            </Grid>
                            <Grid item xs={1.5}>
                                <IconButton onClick={handleOpenDialog}>
                                    <AddBoxIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box 
                    sx={{ 
                        // background: '#99A3A4', 
                        width: '100%', 
                        height: 515, 
                        overflow: 'scroll', 
                        border: '1px solid black'
                        // paddingTop: 8 
                    }}>

                        {selectedFilter === 'mypto' &&
                        <List>
                            {/* <ListItem disablePadding><Typography textAlign='center'>{numDaysRemaining} Days remaining</Typography></ListItem> */}
                        {pto?.map((p, i) => (
                            <ListItem disablePadding key={`pto${p.ptoId}`}>
                                <ListItemButton onClick={() => handleClickListItem(p.start)}>
                                    <ListItemAvatar>
                                        <Badge  sx={{paddingLeft: 2}} badgeContent={p.numDays} color={!p.dateApproved && !p.dateDenied ? 'warning' : (p.dateApproved ? 'success' : (p.dateDenied ? 'error' : 'primary')) } />
                                    </ListItemAvatar>
                                    <ListItemText primary={`${p.start}${p.end ? ` - ${p.end}` : ''}`} secondary={`${p.title}`} />
                                </ListItemButton>
                                
                            </ListItem>
                        ))}
                        </List>
                        }

                        {(selectedFilter === 'all') &&
                        users && users.map((row, i) => {

                            let totalUsed = 0;
                            ptoAll?.filter(p => p.userId === row.userId && p.status === 'approved').forEach(p => {
                                totalUsed += p.numDays;
                            })

                            return (
                                <Accordion expanded={expanded === `panel_${row.initials}`} onChange={handleChange(`panel_${row.initials}`)}>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${row.initials}-content`}
                                    id={`panel${row.initials}-header`}
                                    >
                                    <Typography>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                {row.firstName} {row.lastName}
                                            </Grid>
                                            <Grid item>
                                                {/* <Chip label={totalUsed} color="primary" /> */}
                                            </Grid>
                                        </Grid>
                                    </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                    <Typography>
                                        {ptoAll?.filter(p => p.userId === row.userId).map((p, i) => (
                                            <ListItem disablePadding key={`pto${p.ptoId}`}>
                                                <ListItemButton onClick={() => handleClickListItem(p.start)}>
                                                    <ListItemAvatar>
                                                        <Badge  sx={{paddingLeft: 2}} badgeContent={p.numDays} color={!p.dateApproved && !p.dateDenied ? 'warning' : (p.dateApproved ? 'success' : (p.dateDenied ? 'error' : 'primary')) } />
                                                    </ListItemAvatar>
                                                    <ListItemText primary={`${p.start}${p.end ? ` - ${p.end}` : ''}`} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })
                        }

                        {selectedFilter === 'pending' &&
                        <List>
                        {ptoPending?.map((p, i) => (
                            <ListItem disablePadding key={`pto${p.ptoId}`}>
                                <ListItemButton onClick={() => handleClickListItem(p.start)}>
                                    <ListItemAvatar>
                                        <Badge  sx={{paddingLeft: 2}} badgeContent={p.numDays} color='warning' />
                                    </ListItemAvatar>
                                    <ListItemText primary={`${careCoordinators.filter(c => c.userId === p.userId)[0].TeamMember}`} secondary={`${p.start}${p.end ? ` - ${p.end}` : ''}`} />
                                    <Tooltip title="Approve">
                                    <IconButton onClick={() => handleClickApprove(p.ptoId)}>
                                        <CheckBoxIcon/>
                                    </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Deny">
                                    <IconButton onClick={() => handleClickDeny(p.ptoId)}>
                                        <DisabledByDefaultIcon/>
                                    </IconButton>
                                    </Tooltip>
                                </ListItemButton>
                            </ListItem>
                        ))}
                        </List>
                        }
                        
                    </Box>
                </Grid>
            </Grid>

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Submit PTO Request</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Title: (only you can see this)
                    </DialogContentText>
                    <TextField
                    fullWidth
                    autoFocus
                    margin="dense"
                    id="title"
                    name="title"
                    label="Title/Description"
                    value={ptoForm.title || ''}
                    onChange={(e) => handleUpdateForm(e, 'title')}
                    // variant="standard"
                    />
                    <br /><br />
                    <DialogContentText>
                    Start Date:
                    </DialogContentText>
                    <TextField
                    type='date'
                    fullWidth
                    margin="dense"
                    id="start"
                    name="start"
                    // label="Start Date"
                    value={ptoForm.start || ''}
                    onChange={(e) => handleUpdateForm(e, 'start')}
                    // variant="standard"
                    />
                    <DialogContentText>
                    End Date: (Optional)
                    </DialogContentText>
                    <TextField
                    type='date'
                    fullWidth
                    margin="dense"
                    id="end"
                    name="end"
                    // label="End Date"
                    value={ptoForm.end || ''}
                    onChange={(e) => handleUpdateForm(e, 'end')}
                    // variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>

        </Container>
    );
}