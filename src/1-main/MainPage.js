import React, { useEffect, useState, useContext } from 'react';
import MainNavbar from './MainNavbar';
import TopSection from './TopSection';
import MiddleSection from './MiddleSection';
import BottomSection from './BottomSection';
import AddFormModal from '../form-components/AddFormModal';

import useUpdateUser from '../hooks/useUpdateUser';

import { UserContext } from '../contexts/UserContext';

export default function MainPage() {

  const updateUser = useUpdateUser();

  const { user, isFetchingUser, logout, nickname, updated_at, navbarTab, setNavbarTab, lastExpireTime, setLastExpireTime } = useContext(UserContext);

  // console.log(user);

  const checkForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime")
    const expireTime2 = new Date(expireTime)
    const lastExpireTime2 = new Date(lastExpireTime)
    // console.log("expireTime:", expireTime2.toTimeString())
    // console.log("lastExpireTime:", lastExpireTime2.toTimeString())
    if (expireTime2 > lastExpireTime2){
      setLastExpireTime(expireTime2)
      // console.log("Posting new expireTime to DB...")
      updateUser.mutate({initials: user.initials, expireTime: expireTime2.toUTCString()});
    }
  }

  const updateExpireTime = () => {
    const newTime = Date.now() + (1000 * 60 * 30)
    localStorage.setItem("expireTime", new Date(newTime))
  }

  useEffect(() => {

    const interval = setInterval(() => {
      checkForInactivity()
    }, (1000 * 60))

    return () => clearInterval(interval)

  })

  useEffect(() => {

    updateExpireTime()

    window.addEventListener("click", updateExpireTime)
    // window.addEventListener("keypress", updateExpireTime)
    // window.addEventListener("scroll", updateExpireTime)
    // window.addEventListener("mousemove", updateExpireTime)

    return () => {
      window.removeEventListener("click", updateExpireTime)
      // window.removeEventListener("keypress", updateExpireTime)
      // window.removeEventListener("scroll", updateExpireTime)
      // window.removeEventListener("mousemove", updateExpireTime)
    }

  }, [])

  return (
    <div style={{height: 'auto'}}>
    <MainNavbar />

    {/* {navbarTab === 'schedule' || navbarTab === 'billing' && <SecondaryTabs />} */}

    <TopSection />

    {/* middle toolbar goes here */}

    <MiddleSection />

    {/* Hide apptVerif/Billing if on RR tab */}
    {navbarTab !== 3 && <BottomSection />}

    <AddFormModal />
    
    </div>
  );
}