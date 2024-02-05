import { createContext, useState } from 'react';

import useGetRecordsRequest from '../hooks/useGetRecordsRequest';

export const RecordsRequestContext = createContext();

const RecordsRequestContextProvider = (props) => {

    const [preference, setPreference] = useState("fax");
    const [filter, setFilter] = useState("tbw");
    const [rria, setRria] = useState("rr");

    const todayDate = new Date();
    const todayWeekday = todayDate.getDay();
    // console.log(todayDate);

    const monday = new Date();
    monday.setDate(monday.getDate() - (todayWeekday - 1));
    const mondayISO = monday.toISOString().split('T')[0];
    // console.log(monday);

    const tuesday = new Date();
    tuesday.setDate(tuesday.getDate() - (todayWeekday - 2));
    const tuesdayISO = tuesday.toISOString().split('T')[0];
    // console.log(tuesday);

    const wednesday = new Date();
    wednesday.setDate(wednesday.getDate() - (todayWeekday - 3));
    const wednesdayISO = wednesday.toISOString().split('T')[0];
    // console.log(wednesday);

    const thursday = new Date();
    thursday.setDate(thursday.getDate() - (todayWeekday - 4));
    const thursdayISO = thursday.toISOString().split('T')[0];
    // console.log(thursday);

    const friday = new Date();
    friday.setDate(friday.getDate() - (todayWeekday - 5));
    const fridayISO = friday.toISOString().split('T')[0];
    // console.log(friday);

    
    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetRecordsRequest();

    const numTBW = rows?.filter(r => r.worked === null).length;
    const worked = rows?.filter(r => r.worked !== null && r.worked !== 'FU/H' && r.worked !== "Caught Up");
    const numWorked = worked?.length;
    const numFUH = rows?.filter(r => r.worked === 'FU/H').length;
    const numCaughtUp = rows?.filter(r => r.worked === 'Caught Up').length;
    const faxReceived = rows?.filter(r => r.rrFaxReceived !== null);
    const numFaxReceived = faxReceived?.length;
    const numAttending = rows?.length;
    const numActive = numAttending - numCaughtUp - numFUH;
    const numPending = numWorked - numFaxReceived;

    // Monday
    const numWorkedMonday = worked?.filter(w => w.worked === mondayISO).length;
    const numFaxReceivedMonday = faxReceived?.filter(f => f.rrFaxReceived === mondayISO).length;

    // Tueday
    const numWorkedTuesday = worked?.filter(w => w.worked === tuesdayISO).length;
    const numFaxReceivedTuesday = faxReceived?.filter(f => f.rrFaxReceived === tuesdayISO).length;

    // Wednesday
    const numWorkedWednesday = worked?.filter(w => w.worked === wednesdayISO).length;
    const numFaxReceivedWednesday = faxReceived?.filter(f => f.rrFaxReceived === wednesdayISO).length;

    // Thursday
    const numWorkedThursday = worked?.filter(w => w.worked === thursdayISO).length;
    const numFaxReceivedThursday = faxReceived?.filter(f => f.rrFaxReceived === thursdayISO).length;

    // Friday
    const numWorkedFriday = worked?.filter(w => w.worked === fridayISO).length;
    const numFaxReceivedFriday = faxReceived?.filter(f => f.rrFaxReceived === fridayISO).length;

    const [therapistSearchVal, setTherapistSearchVal] = useState('');

    // console.log('M', numFaxReceivedMonday);
    // console.log('T', numFaxReceivedTuesday);
    // console.log('W', numFaxReceivedWednesday);
    // console.log('R', numFaxReceivedThursday);
    // console.log('F', numFaxReceivedFriday);

    // console.log(faxReceived);

    
    return (
        <RecordsRequestContext.Provider 
        value={{ 
            todayWeekday, 
            preference, setPreference, 
            filter, setFilter, 
            rria, setRria,
            monday, tuesday, wednesday, thursday, friday,
            mondayISO, tuesdayISO, wednesdayISO, thursdayISO, fridayISO,
            numWorked, numTBW, numPending, numFaxReceived, numActive, numFUH, numCaughtUp,
            numWorkedMonday, numFaxReceivedMonday, 
            numWorkedTuesday, numFaxReceivedTuesday, 
            numWorkedWednesday, numFaxReceivedWednesday, 
            numWorkedThursday, numFaxReceivedThursday, 
            numWorkedFriday, numFaxReceivedFriday,
            therapistSearchVal, setTherapistSearchVal
        }}>
            {props.children}
        </RecordsRequestContext.Provider>
    );
}

export default RecordsRequestContextProvider;