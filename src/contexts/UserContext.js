import { createContext, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import useGetUser from '../hooks/useGetUser';

export const UserContext = createContext();

const UserContextProvider = (props) => {

    const { user: userAuth0, logout } = useAuth0();

    const { email, nickname, updated_at } = userAuth0;

    const { status: statusUser, data: user, error: errorUser, isFetching: isFetchingUser } = useGetUser(email);

    const [dashboardFilter, setDashboardFilter] = useState('open');

    const [navbarTab, setNavbarTab] = useState(0);
    const [secondaryTabSchedule, setSecondaryTabSchedule] = useState(0);
    const [secondaryTabBilling, setSecondaryTabBilling] = useState(0);
    const [secondaryTabSearch, setSecondaryTabSearch] = useState(0);
    const [secondaryTabCalendars, setSecondaryTabCalendars] = useState(0);
    const [secondaryTabReports, setSecondaryTabReports] = useState(0);

    const [secondaryTabs, setSecondaryTabs] = useState({
                                                        schedule: 0,
                                                        billing: 0,
                                                        search: 0,
                                                        calendars: 0,
                                                        reports: 0       
                                                     });


    
    return ( user &&
        <UserContext.Provider 
        value={{ dashboardFilter, setDashboardFilter, navbarTab, setNavbarTab, user, nickname, updated_at, logout, isFetchingUser }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;