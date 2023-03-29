import React, { useState, useEffect } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from "components/Navbar"
import Sidebar from "components/Sidebar"
// import { useGetUserQuery } from 'state/api'
import { useAuthUser } from 'react-auth-kit'
import { setToken } from 'state'
import { useIsAuthenticated, useSignOut } from 'react-auth-kit'
const Layout = () => {

  const isAuthenticated = useIsAuthenticated()

  const auth = useAuthUser()
  const signOut = useSignOut()

  // const dispatch = useDispatch()
  // useEffect(() => {
  //     dispatch(setToken(auth().token))
  // }, [])

  const data = {name: auth().first_name}
  console.log(auth())
  const isNonMobile = useMediaQuery("(min-width: 600px)")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  console.log(data)
  useEffect(() => {
    if (!isAuthenticated()) {
      signOut()
    }
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    if (screenWidth !== 1920 || screenHeight !== 1080) {
      alert('This app works best at a screen resolution of 1920x1080. Please adjust your screen resolution settings accordingly.');
    }
  }, []);

  // console.log(data);
  console.log("🚀 ~ file: index.jsx:24 ~ Layout ~ data:", data)
  // console.log(data)
  // console.log(isNonMobile);
  return (
          <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
            <Sidebar
              user={ data || {} }
              isNonMobile={isNonMobile}
              drawerWidth="285px"
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              sidebarSpeed={150}
            />
          <Box flexGrow={1}>
            <Navbar
              user={ data || {} }
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <Outlet/>
          </Box>
        </Box>
  )
}

export default Layout;