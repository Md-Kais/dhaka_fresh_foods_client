
import React, { useContext, useEffect, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import MoreIcon from '@material-ui/icons/MoreVert';
import './NavAppBar.css'
import { UserContext } from '../../App';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'block',//make it block to show the name
        fontWeight: '700',
        fontSize: '24px',
        fontStyle: 'italic',
        padding: '10px',
        borderRadius: '20px',
        backgroundColor: 'bisque',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },


    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',


        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));
const useStylesAvatar = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));
export default function PrimarySearchAppBar() {
    const [cartNumber,setCartNumber]=useState();   
    let stored=Object.values(localStorage);
    useEffect(()=>{
        let ans=localStorage.length;
        setCartNumber(ans);
    }, [stored]);
    const classes = useStyles();
    const classesAvatar = useStylesAvatar();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const { email, photoURL, displayName } = loggedInUser;
    console.log(photoURL);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}

            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}

            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <MenuItem >





                <p style={{ width: '200px' }}>
                    <Badge color="secondary">
                        <Link to='/' className="link-text">Home</Link>
                    </Badge>
                </p>


            </MenuItem>
            <MenuItem >

                <p style={{ width: '200px' }}><Badge badgeContent={cartNumber || '0'} color="secondary">
                    <Link to='/orders' className="link-text">Orders</Link>
                </Badge></p>




            </MenuItem>
            <MenuItem>


                <Link to='/admin' className="link-text"><p style={{ width: '200px' }}> <Badge color="secondary">
                    Admin
                </Badge></p></Link>
            </MenuItem>
            <MenuItem>
                <Link to='/deals' className="link-text"><p style={{ width: '200px' }}><Badge color="secondary">
                    Deals
                </Badge></p></Link>
            </MenuItem>
            <MenuItem>

                <Link to='/login' className="link-text">
                    {
                        loggedInUser.isSignedIn
                            ?
                            <p style={{ width: '200px' }} className={classesAvatar.root}>
                                <Avatar alt={displayName} src={photoURL} />
                            </p>
                            :
                            <p style={{ width: '200px' }}>
                                <Badge color="secondary">
                                    Login
                                </Badge>
                            </p>
                    }


                </Link>
            </MenuItem>

        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static" style={{ backgroundColor: 'azure', color: 'black' }}>
                <Toolbar>

                    <Typography className={classes.title} variant="h6" noWrap >
                        Dhaka Fresh Foods
                    </Typography>

                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>

                        <div className="desktopAppBar linkDiv">

                            <Badge color="secondary">
                                <Link to='/' className="link-text">Home</Link>
                            </Badge>
                        </div>
                        <div className='desktopAppBar linkDiv'>
                            <Badge badgeContent={cartNumber || '0'} color="secondary">
                                <Link to='/orders' className="link-text">Orders</Link>
                            </Badge>
                        </div>
                        <div className="desktopAppBar linkDiv">

                            <Badge color="secondary">
                                <Link to='/admin' className="link-text">Admin</Link>
                            </Badge>
                        </div>
                        <div className="desktopAppBar linkDiv">

                            <Badge color="secondary">
                                <Link to='/deals' className="link-text">Deals</Link>
                            </Badge>
                        </div>
                       

                                <Link to='/login' className="link-text">
                                    {
                                        loggedInUser.isSignedIn
                                            ?
                                            <div className="desktopAppBar linkDiv">
                                                <Avatar alt={displayName} src={photoURL}/>
                                            </div>
                                            :
                                            <div className="desktopAppBar linkDiv" >
                                                <Badge color="secondary">
                                                    Login
                                                </Badge>
                                            </div>
                                    }


                                </Link>
                         
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}
