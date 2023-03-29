import { React, useState } from 'react';
import { 
    LightModeOutlined, 
    DarkModeOutlined, 
    Menu as MenuIcon, 
    Search, 
    SettingsOutlined,
    ArrowDropDownOutlined,
    AccountCircleOutlined
} from '@mui/icons-material'
import FlexBetween from 'components/FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from "state";
// import profileImage from "assets/profile.jpeg";
import { AppBar, IconButton, Toolbar, useTheme, InputBase, Box, Button, Typography, Menu, MenuItem } from '@mui/material';
import { useSignOut,  } from 'react-auth-kit';
// import { clearToken } from 'state'


const Navbar = ({
    isSidebarOpen,
    setIsSidebarOpen,
    user
}) => {

    const signOut = useSignOut()

    const dispatch = useDispatch();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null)
    const isOpen = Boolean(anchorEl)
    const handleClick = (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)
    // console.log(isSidebarOpen);
    return <AppBar sx={{
        position: 'static',
        background: "none",
        boxShadow: "none"
    }}>
    
    <Toolbar sx={{justifyContent: "space-between"}}>
    {/* LEFT SIDE */}
        <FlexBetween gap={"1rem"}>
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <MenuIcon/>
            </IconButton>
            <FlexBetween
                bgcolor={theme.palette.background.alt}
                borderRadius="9px"
                gap="3rem"
                p="0.1rem 1.5rem">
                    <InputBase placeholder="Search...">
                        <Search/>
                    </InputBase>
            </FlexBetween>
        </FlexBetween>
        {/* RIGHT SIDE */}
        <FlexBetween gap={"1rem"}>
            <IconButton onClick={() => dispatch(setMode())}>
            {
                theme.palette.mode === 'dark' ? (<DarkModeOutlined sx={{fontSize: "25px"}}/>) : <LightModeOutlined sx={{fontSize: "25px"}}/>
            }
            </IconButton>
            {/* Implement Settings function later */}
            {/* <IconButton>
                <SettingsOutlined sx={{ fontSize: "25px" }}/>
            </IconButton> */}
            <FlexBetween>
                <Button 
                    onClick={handleClick}
                    title='Profile Settings'
                    sx={{ 
                        display: "flex", 
                        justifyContent: "space-between",
                        alignItems: "center",
                        textTransform: "none",
                        gap: "1rem"}}>
                        {/* <Box 
                            component={"img"}
                            alt="profile"
                            src={profileImage}
                            height="32px"
                            width="32px"
                            borderRadius={"50%"}
                            sx={{objectFit: "cover"}}
                        /> */}
                        <AccountCircleOutlined sx={{ fontSize: "25px", color: theme.palette.secondary[100] }} />                        
                        <Box textAlign={"left"}>
                            <Typography fontSize="0.85rem" sx={{color: theme.palette.secondary[100]}}>{user.name}</Typography>
                            <Typography fontSize="0.75rem" sx={{color: theme.palette.secondary[200]}}>{user.occupation}</Typography>
                        </Box>
                        <ArrowDropDownOutlined 
                                sx={{ color: theme.palette.secondary[300], fontSize: "25px"}}
                        />
                </Button>
                <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{vertical: "bottom", horizontal:"center"}}>
                    <MenuItem onClick={() => {
                        localStorage.removeItem('token')
                        signOut()
                    }}>Log Out</MenuItem>       
                </Menu>
            </FlexBetween>
        </FlexBetween>
    </Toolbar>
    </AppBar>
}

export default Navbar