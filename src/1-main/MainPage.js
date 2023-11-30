import React, { useState, useContext } from 'react';
import MainNavbar from './MainNavbar';
import TopSection from './TopSection';
import MiddleSection from './MiddleSection';
import BottomSection from './BottomSection';
import AddFormModal from '../form-components/AddFormModal';
import DocumentTester from '../document-templates/DocumentTester';

import useUpdateUser from '../hooks/useUpdateUser';

import { UserContext } from '../contexts/UserContext';

export default function MainPage() {

  const updateUser = useUpdateUser();

  const { user, isFetchingUser, logout, nickname, updated_at, navbarTab, setNavbarTab } = useContext(UserContext);

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
    <div style={{height: 'auto'}}>
    <MainNavbar />
    {/* {navbarTab === 'schedule' || navbarTab === 'billing' &&
    <SecondaryTabs />
    } */}
    <TopSection />
    {/* <DocumentTester /> */}
    <MiddleSection />
    <BottomSection />
    <AddFormModal />
    
    </div>
  );
}