import { useState } from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useUpdateReferral from '../hooks/useUpdateReferral';
import CheckIcon from '@mui/icons-material/Check';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';

import '../forms.css'

export default function InfoFromAdjusterUpdateForm(props) {

    const { selectedClaim } = props;

    const mutationUpdate = useUpdateReferral();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event) => {
        selectedClaim.referralId && setAnchorEl(event.currentTarget);
        // console.log(event.currentTarget.innerHTML);
    };

    const handleClickMenuUpdate = (data) => {
        const field = anchorEl?.id;
        const values = {referralId: selectedClaim.referralId, [field]: data};
        mutationUpdate.mutate(values);
        handleCloseMenu();
        // const value = anchorEl.firstChild.innerHTML;
        // console.log(values);
        // setAnchorEl(null);        
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };


    return (
        <div>
            {selectedClaim?.referralId &&

            <>
            <Grid container spacing={0.5}>
                <List disablePadding sx={{width: '100%'}}>
                {((selectedClaim.demosFromAdjuster === "Yes") || (selectedClaim.demosFromAdjuster === "-")) ? 
                    <ListItem disablePadding sx={{backgroundColor: '#EAECEE'}}>
                        <ListItemButton id="demosFromAdjuster" disableRipple sx={{cursor: "default"}}>
                        <ListItemIcon>
                            {selectedClaim.demosFromAdjuster === "Yes" && <CheckIcon sx={{ color: 'green' }} />}
                            {selectedClaim.demosFromAdjuster === "-" && <HorizontalRuleIcon sx={{ color: 'green' }} />}
                        </ListItemIcon>
                        <ListItemText primary="Demos" />
                        </ListItemButton>
                    </ListItem>
                : 
                    <ListItem disablePadding sx={{backgroundColor: "#F5B7B1"}}>
                        <ListItemButton id="demosFromAdjuster" onClick={handleOpenMenu}>
                        <ListItemIcon>
                            <WarningAmberIcon />
                        </ListItemIcon>
                        <ListItemText primary="Demos" />
                        </ListItemButton>
                    </ListItem>
                }

                {((selectedClaim.rxFromAdjuster === "Yes") || (selectedClaim.rxFromAdjuster === "-")) ? 
                    <ListItem disablePadding sx={{backgroundColor: '#EAECEE'}}>
                        <ListItemButton id="rxFromAdjuster" disableRipple sx={{cursor: "default"}}>
                        <ListItemIcon>
                            {selectedClaim.rxFromAdjuster === "Yes" && <CheckIcon sx={{ color: 'green' }} />}
                            {selectedClaim.rxFromAdjuster === "-" && <HorizontalRuleIcon />}
                        </ListItemIcon>
                        <ListItemText primary="Rx" />
                        </ListItemButton>
                    </ListItem>
                : 
                    <ListItem disablePadding sx={{backgroundColor: "#F5B7B1"}}>
                        <ListItemButton id="rxFromAdjuster" onClick={handleOpenMenu}>
                        <ListItemIcon>
                            <WarningAmberIcon />
                        </ListItemIcon>
                        <ListItemText primary="Rx" />
                        </ListItemButton>
                    </ListItem>
                }
                {((selectedClaim.ovnFromAdjuster === "Yes") || (selectedClaim.ovnFromAdjuster === "-")) ? 
                    <ListItem disablePadding sx={{backgroundColor: '#EAECEE'}}>
                        <ListItemButton id="ovnFromAdjuster" disableRipple sx={{cursor: "default"}}>
                        <ListItemIcon>
                            {selectedClaim.ovnFromAdjuster === "Yes" && <CheckIcon sx={{ color: 'green' }} />}
                            {selectedClaim.ovnFromAdjuster === "-" && <HorizontalRuleIcon />}
                        </ListItemIcon>
                        <ListItemText primary="OVN" />
                        </ListItemButton>
                    </ListItem>
                : 
                    <ListItem disablePadding sx={{backgroundColor: "#F5B7B1"}}>
                        <ListItemButton id="ovnFromAdjuster" onClick={handleOpenMenu}>
                        <ListItemIcon>
                            <WarningAmberIcon />
                        </ListItemIcon>
                        <ListItemText primary="OVN" />
                        </ListItemButton>
                    </ListItem>
                }
                {(selectedClaim.service.includes("FCE") || selectedClaim.service.includes("PPD")) &&
                    <>
                    {((selectedClaim.ptNotesFromAdjuster === "Yes") || (selectedClaim.ptNotesFromAdjuster === "-")) ? 
                        <ListItem disablePadding sx={{backgroundColor: '#EAECEE'}}>
                            <ListItemButton id="ptNotesFromAdjuster" disableRipple sx={{cursor: "default"}}>
                            <ListItemIcon>
                                {selectedClaim.ptNotesFromAdjuster === "Yes" && <CheckIcon sx={{ color: 'green' }} />}
                                {selectedClaim.ptNotesFromAdjuster === "-" && <HorizontalRuleIcon />}
                            </ListItemIcon>
                            <ListItemText primary="PT Notes" />
                            </ListItemButton>
                        </ListItem>
                    : 
                        <ListItem disablePadding sx={{backgroundColor: "#F5B7B1"}}>
                            <ListItemButton id="ptNotesFromAdjuster" onClick={handleOpenMenu}>
                            <ListItemIcon>
                                <WarningAmberIcon />
                            </ListItemIcon>
                            <ListItemText primary="PT Notes" />
                            </ListItemButton>
                        </ListItem>
                    }
                    {((selectedClaim.mriFromAdjuster === "Yes") || (selectedClaim.mriFromAdjuster === "-")) ? 
                        <ListItem disablePadding sx={{backgroundColor: '#EAECEE'}}>
                            <ListItemButton id="mriFromAdjuster" disableRipple sx={{cursor: "default"}}>
                            <ListItemIcon>
                                {selectedClaim.mriFromAdjuster === "Yes" && <CheckIcon sx={{ color: 'green' }} />}
                                {selectedClaim.mriFromAdjuster === "-" && <HorizontalRuleIcon />}
                            </ListItemIcon>
                            <ListItemText primary="MRI" />
                            </ListItemButton>
                        </ListItem>
                    : 
                        <ListItem disablePadding sx={{backgroundColor: "#F5B7B1"}}>
                            <ListItemButton id="mriFromAdjuster" onClick={handleOpenMenu}>
                            <ListItemIcon>
                                <WarningAmberIcon />
                            </ListItemIcon>
                            <ListItemText primary="MRI" />
                            </ListItemButton>
                        </ListItem>
                    }
                    {selectedClaim.service.includes("FCE") &&
                    <>
                    {((selectedClaim.jdFromAdjuster === "Yes") || (selectedClaim.jdFromAdjuster === "-")) ? 
                        <ListItem disablePadding sx={{backgroundColor: '#EAECEE'}}>
                            <ListItemButton id="jdFromAdjuster" disableRipple sx={{cursor: "default"}}>
                            <ListItemIcon>
                                {selectedClaim.jdFromAdjuster === "Yes" && <CheckIcon sx={{ color: 'green' }} />}
                                {selectedClaim.jdFromAdjuster === "-" && <HorizontalRuleIcon />}
                            </ListItemIcon>
                            <ListItemText primary="JD" />
                            </ListItemButton>
                        </ListItem>
                    : 
                        <ListItem disablePadding sx={{backgroundColor: "#F5B7B1"}}>
                            <ListItemButton id="jdFromAdjuster" onClick={handleOpenMenu}>
                            <ListItemIcon>
                                <WarningAmberIcon />
                            </ListItemIcon>
                            <ListItemText primary="JD" />
                            </ListItemButton>
                        </ListItem>
                    }
                    </>
                    }
                    {selectedClaim.service.includes("PPD") &&
                    <>
                    {((selectedClaim.postOpFromAdjuster === "Yes") || (selectedClaim.postOpFromAdjuster === "-")) ? 
                        <ListItem disablePadding sx={{backgroundColor: '#EAECEE'}}>
                            <ListItemButton id="postOpFromAdjuster" disableRipple sx={{cursor: "default"}}>
                            <ListItemIcon>
                                {selectedClaim.postOpFromAdjuster === "Yes" && <CheckIcon sx={{ color: 'green' }} />}
                                {selectedClaim.postOpFromAdjuster === "-" && <HorizontalRuleIcon />}
                            </ListItemIcon>
                            <ListItemText primary="Post-Op" />
                            </ListItemButton>
                        </ListItem>
                    : 
                        <ListItem disablePadding sx={{backgroundColor: "#F5B7B1"}}>
                            <ListItemButton id="postOpFromAdjuster" onClick={handleOpenMenu}>
                            <ListItemIcon>
                                <WarningAmberIcon />
                            </ListItemIcon>
                            <ListItemText primary="Post-Op" />
                            </ListItemButton>
                        </ListItem>
                    }
                    </>
                    }
                    </>
                }
                
                </List>
                <Menu
                    id="docs-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseMenu}
                >
                    <MenuItem onClick={() => handleClickMenuUpdate("Yes")}>Mark as Received</MenuItem>
                    <MenuItem onClick={() => handleClickMenuUpdate("-")}>Not needed</MenuItem>
                </Menu>
            </Grid>
            </>
            }
        </div>
    )};