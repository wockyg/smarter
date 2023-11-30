import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import { styled } from '@mui/material';

import { RecordsRequestContext } from '../../contexts/RecordsRequestContext';

import '../../App.css';

export default function RRSynopsis(props) {

    const {
        todayWeekday,
        preference, setPreference, 
        filter, setFilter, 
        monday, tuesday, wednesday, thursday, friday,
        mondayISO, tuesdayISO, wednesdayISO, thursdayISO, fridayISO,
        numWorked, numTBW, numPending, numFaxReceived, numActive, numFUH, numCaughtUp,
        numWorkedMonday, numFaxReceivedMonday, 
        numWorkedTuesday, numFaxReceivedTuesday, 
        numWorkedWednesday, numFaxReceivedWednesday, 
        numWorkedThursday, numFaxReceivedThursday, 
        numWorkedFriday, numFaxReceivedFriday
    } = useContext(RecordsRequestContext);

    return(
        <div>
            {numWorked} Worked <br />
            {numTBW} TBW <br />
            {numFaxReceived} faxes Rec'd
        </div>
    );
}