import { useAuth0 } from "@auth0/auth0-react";

import useGetUser from '../hooks/useGetUser';
import useUpdateUser from '../hooks/useUpdateUser';

export default function LogoutButton(props) {

    const updateUser = useUpdateUser();

    const { user: userAuth0, logout } = useAuth0();

    const { email, nickname, updated_at } = userAuth0;

    const { status: statusUser, data: user, error: errorUser, isFetching: isFetchingUser } = useGetUser(email);

    const handleClick = (event) => {
        updateUser.mutate({initials: user?.initials, lastLogout: new Date()})
        logout({ logoutParams: { returnTo: window.location.origin } })
    };

    return (
        <button onClick={(e) => handleClick(e)}>
            Logout
        </button>
    );

}