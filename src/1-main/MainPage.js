import React, { useState } from 'react';
import MainNavbar from './MainNavbar';
import TopSection from './TopSection';
import MiddleSection from './MiddleSection';
import BottomSection from './BottomSection';
import AddFormModal from '../form-components/AddFormModal';
import DocumentTester from '../document-templates/DocumentTester';

import useGetUser from '../hooks/useGetUser';
import useUpdateUser from '../hooks/useUpdateUser';
import { useAuth0 } from "@auth0/auth0-react";

export default function MainPage() {

  const updateUser = useUpdateUser();

  const { user: userAuth0 } = useAuth0();

  const { email, nickname, updated_at } = userAuth0;

  const { status: statusUser, data: user, error: errorUser, isFetching: isFetchingUser, isIdle: isIdleUser} = useGetUser(email);

  const [newLogin, setNewLogin] = useState(true);

  const updated_at_NoMilli = new Date(updated_at);

  updated_at_NoMilli.setMilliseconds(0);

  // console.log(user);

  const updated_at_ISO = updated_at_NoMilli.toISOString();

  if (!isFetchingUser && user && newLogin && (user.lastLogin < updated_at_ISO)) {
    console.log("UPDATE LOGIN TIMESTAMP");
    updateUser.mutate({initials: user.initials, lastLogin: updated_at});
    setNewLogin(false);
    // user && console.log("updated_at", updated_at_ISO);
    // user && console.log("lastLogin", user?.lastLogin);
    // user && console.log("lastLogout", user?.lastLogout);
  }

  return (
    <>
    <MainNavbar />
    <TopSection />
    <MiddleSection />
    <BottomSection />
    <AddFormModal />
    {/* <DocumentTester /> */}
    </>
  );
}