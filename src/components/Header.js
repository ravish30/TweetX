import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { AppBar, Toolbar, Typography, Box, Container, Button, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutUser } from '../app/slices/authSlice';

const useStyles = makeStyles((theme) => ({
    appbar: {
        background: 'none',
        position: 'absolute',
        boxShadow: '0px 2px 20px -1px rgb(0 0 0 / 5%), 0px 4px 5px 0px rgb(0 0 0 / 5%), 0px 1px 10px 0px rgb(0 0 0 / 5%) !important'
    },
    toolbar: {
        backgroundColor: '#6332a8',
        boxSizing: 'border-box',
    },
    nav: {
        paddingTop: "15px",
        paddingBottom: "15px",
        display: "flex !important",
        alignItems: "center !important",
        justifyContent: 'space-between !important',
    },
    activeLink: {
        marginLeft: '25px !important',
        cursor: 'pointer',
        color: 'rgba(239, 68, 68, 0.75)',
        textDecoration: 'none',
    },
    notActiveLink: {
        marginLeft: '25px !important',
        cursor: 'pointer',
        color: '#ffffff',
        textDecoration: 'none',
    },
    activeMobileLink: {
        cursor: 'pointer',
        color: 'rgba(239, 68, 68, 0.75)',
        textDecoration: 'none',
    },
    notActiveMobileLink: {
        cursor: 'pointer',
        color: 'rgba(0,0,0, 0.2)',
        textDecoration: 'none',
    },
    btn: {
        borderRadius: '10px',
        marginLeft: '60px'
    },
    iconButton: {
        [theme.breakpoints.up(1000)]: {
            display: 'none !important',
        }
    },
    mainNav: {
        [theme.breakpoints.down(1000)]: {
            display: 'none !important',
        },
        marginRight: "250px"
    },
    drawer: {
        minWidth: 250,
        textAlign: 'center',
        backgroundColor: '#fff',
        height: '100vh',
    }
}))

function Header() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const isAuth = useSelector(state => state.auth.isAuth)

    const logoutHandler = (e) => {
        e.preventDefault();
        setOpen(false)
        localStorage.clear();
        dispatch(LogoutUser());
        navigate('/')
    }

    return (
        <Container>
            <Drawer open={open} onClose={() => setOpen(false)}>
                <List disablePadding className={classes.drawer}>
                    <ListItem button style={{ padding: 25 }}>
                        <ListItemText primary={<Typography color="secondary" variant="h6" sx={{ fontWeight: 'bolder' }}>TweetX</Typography>} />
                    </ListItem>
                    <ListItem button style={{ padding: 10, paddingLeft: 30 }}>
                        <ListItemText primary={<NavLink to="/feed" className={(navigationData) => navigationData.isActive ? classes.activeMobileLink : classes.notActiveMobileLink} onClick={() => setOpen(false)}>
                            <Typography sx={{ fontWeight: 'bolder' }}>Feed</Typography>
                        </NavLink>} />
                    </ListItem>
                    <ListItem button style={{ padding: 10, paddingLeft: 30 }}>
                        <ListItemText primary={<NavLink to="/users" className={(navigationData) => navigationData.isActive ? classes.activeMobileLink : classes.notActiveMobileLink} onClick={() => setOpen(false)}>
                            <Typography sx={{ fontWeight: 'bolder' }}>Users</Typography>
                        </NavLink>} />
                    </ListItem>
                    <ListItem button style={{ padding: 10, paddingLeft: 30 }}>
                        <ListItemText primary={<NavLink to="/profile" className={(navigationData) => navigationData.isActive ? classes.activeMobileLink : classes.notActiveMobileLink} onClick={() => setOpen(false)}>
                            <Typography sx={{ fontWeight: 'bolder' }}>Profile</Typography>
                        </NavLink>} />
                    </ListItem>
                    <ListItem button style={{ padding: 10, paddingLeft: 30 }}>
                        <ListItemText primary={<Button color="secondary" variant="outlined" sx={{ marginLeft: "25px" }} onClick={logoutHandler}>Logout</Button>
                        } />
                    </ListItem>
                </List>
            </Drawer>
            {isAuth && (
                <AppBar className={classes.appbar}>
                    <Toolbar className={classes.toolbar}>
                        <Container className={classes.nav}>
                            <Box display="flex" alignItems="center" style={{ cursor: 'pointer' }}>
                                <Typography variant="h5" color="primary" style={{ marginLeft: 20, fontWeight: 'bolder' }}>
                                    TweetX
                                </Typography>
                            </Box>
                            <Box className={classes.mainNav}>
                                <Box display="flex" alignItems="center">
                                    <NavLink to="/feed" className={(navigationData) => navigationData.isActive ? classes.activeLink : classes.notActiveLink}>
                                        <Typography sx={{ fontWeight: 'bolder' }}>Feed</Typography>
                                    </NavLink>
                                    <NavLink to="/users" className={(navigationData) => navigationData.isActive ? classes.activeLink : classes.notActiveLink}>
                                        <Typography sx={{ fontWeight: 'bolder' }}>Users</Typography>
                                    </NavLink>
                                    <NavLink to="/profile" className={(navigationData) => navigationData.isActive ? classes.activeLink : classes.notActiveLink}>
                                        <Typography sx={{ fontWeight: 'bolder' }}>Profile</Typography>
                                    </NavLink>
                                    <Button color="secondary" variant="outlined" sx={{ marginLeft: "25px" }} onClick={logoutHandler}>Logout</Button>
                                </Box>
                            </Box>
                            <IconButton className={classes.iconButton} onClick={() => setOpen(!open)}>
                                <MenuIcon color="primary" />
                            </IconButton>
                        </Container>
                    </Toolbar>
                </AppBar>
            )}
        </Container>
    )
}

export default Header