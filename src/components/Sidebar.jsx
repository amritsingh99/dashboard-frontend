import {
    Box, 
    Divider, 
    Drawer, 
    IconButton, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText,
    Typography,
    useTheme
} from '@mui/material'

import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
    TableRowsOutlined,
    AccountCircleOutlined
} from "@mui/icons-material"

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import profileImage from "assets/profile.jpeg"
import logo from 'assets/logo.png'

const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined/>
    },
    {
        text: "Production",
        icon: null
    },
    {
        text: "Logs",
        icon: <TableRowsOutlined/>
    },
    {
        text: "Customers",
        icon: <Groups2Outlined/>
    },
    {
        text: "Transactions",
        icon: <ReceiptLongOutlined/>
    },
    {
        text: "Geography",
        icon: <PublicOutlined/>
    },
    {
        text: "Insights",
        icon: null
    },
    {
        text: "Overview",
        icon: <PointOfSaleOutlined/>
    },
    {
        text: "Daily",
        icon: <TodayOutlined/>
    },
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined/>
    },
    {
        text: "Breakdown",
        icon: <PieChartOutlined/>
    },
    // {
    //     text: "Error",
    //     icon: <PieChartOutlined/>
    // },
    {
        text: "Management",
        icon: null
    },
    {
        text: "Admin",
        icon: <AdminPanelSettingsOutlined/>
    },
    {
        text: "Performance",
        icon: <TrendingUpOutlined/>
    },
]


export const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
    sidebarSpeed,
    user
}) => {
  const { pathname } = useLocation()
  const [active, setActive] = useState("")
  const navigate = useNavigate()
  const theme = useTheme()

  useEffect(() => {
    setActive(pathname.substring(1))
  }, [pathname])
  return (
    <Box component="nav">
        {/* {isSidebarOpen &&  */}
            <Drawer 
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            variant="persistent"
            anchor="left"
            transitionDuration={sidebarSpeed}
            
            sx={{
                width: isSidebarOpen ? drawerWidth : 0,
                transition: `width ${sidebarSpeed/500}s ease-in-out`,
                "& .MuiDrawer-paper" : {
                    color: theme.palette.secondary[200],
                    backgroundColor: theme.palette.background.alt,
                    boxSizing: "border-box",
                    borderWidth : isNonMobile ? 0 : "2px",
                    width: drawerWidth,
                },

            }}
            >
                <FlexBetween flexDirection={"column"} justifyContent="space-between" flexGrow={1}>
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween sx={{justifyContent: 'center'}} color={theme.palette.secondary.main}>
                                {/* <Box display="flex" alignItems="center" gap="0.5rem"> */}
                                    <img src={logo} alt="Logo"/>
                                    {/* <Typography variant='h4' fontWeight={"bold"}>
                                        Continental Systems
                                    </Typography> */}
                                {/* </Box> */}
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft/>
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List sx={{width:"100%"}}>
                            {
                            navItems.map(({text, icon}) => {
                                if (!icon) {
                                    return (
                                        <Typography key={text} sx={{m: "2.25rem 0 1rem 4.5em"}}>
                                            {text}
                                        </Typography>
                                    )
                                }
                                const lcText = text.toLowerCase()
                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(`/${lcText}`)
                                                setActive(lcText)
                                            }}
                                            // on
                                            sx={{
                                                backgroundColor: active === lcText ? theme.palette.secondary[300] : "transparent",
                                                color: active === lcText 
                                                ? theme.palette.primary[600]
                                                : theme.palette.secondary[100],
                                                gap: ".25rem",                                          
                                            }}>
                                                
                                            <ListItemIcon
                                                sx={{
                                                    ml: "0rem",
                                                    color: active === lcText 
                                                    ? theme.palette.primary[600]
                                                    : theme.palette.secondary[200],
                                                    justifyContent: 'center',
                                                    marginLeft: "2rem"
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText sx={{textAlign: 'left'}} primary={text}/>
                                            {
                                                active === lcText && (
                                                    <ChevronRightOutlined sx={{ml: "auto"}}/>
                                                )
                                            }
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })
                        }
                        </List>
                    </Box>
                    <Box marginBottom={"2rem"}>
                        <Divider/>
                        <FlexBetween textTransform={"none"} gap="1rem" m="1.5rem 2rem 0 3rem">
                            {/* <Box 
                                component={"img"}
                                alt="profile"
                                src={profileImage}
                                height="40px"
                                width="40px"
                                borderRadius={"50%"}
                                sx={{objectFit: "cover"}}>
                            </Box> */}
                            <AccountCircleOutlined sx={{ height: "40px", width: "40px", color: theme.palette.secondary[300] }} />
                            <Box textAlign={"left"}>
                                <Typography fontSize="0.9rem" sx={{color: theme.palette.secondary[100]}}>{user.name}</Typography>
                                <Typography fontSize="0.8rem" sx={{color: theme.palette.secondary[200]}}>{user.occupation}</Typography>
                            </Box>
                            <SettingsOutlined sx={{color: theme.palette.secondary[300]}} />
                        </FlexBetween>
                    </Box>
                </FlexBetween>
            </Drawer>
        {/* } */}
    </Box>
  )
}

export default Sidebar