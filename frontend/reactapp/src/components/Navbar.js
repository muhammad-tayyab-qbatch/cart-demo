import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Tabs, Tab, IconButton, Badge, Button } from '@material-ui/core';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { getCookie, setCookie } from '../Helper/helperFunction';
import { getCartItemsFromApi, clearState as clearCart } from '../redux/slices/cartSlice';
import { clearState as clearUser, getUser } from '../redux/slices/userSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const { itemCount } = useSelector((state) => state.cart);
    const { auth, token } = useSelector((state) => state.user);
    const [isUserLogin, setIsUserLogin] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        const tokenFromCookie = getCookie('token');
        if (tokenFromCookie) {
            setIsUserLogin(true);
        }
    }, [])

    useEffect(() => {
        if (auth && token) {
            setIsUserLogin(true);
        }
    }, [token])

    useEffect(() => {
        if (isUserLogin) {
            const tokenFromCookie = getCookie('token');
            dispatch(getCartItemsFromApi({ token: tokenFromCookie }));
            dispatch(getUser({ token: tokenFromCookie }));
        }
    }, [isUserLogin])

    const logout = () => {
        setCookie("token", "");
        setIsUserLogin(false);
        dispatch(clearCart());
        dispatch(clearUser());
    }

    return (
        <div className="navbar-div">
            <AppBar position="static" color="default">
                <Tabs value={selectedTab}>
                    {/* <NavLink to="/products"> */}
                    <Tab label="Products" component={Link} to="/products" onClick={() => setSelectedTab(0)} />
                    {/* </NavLink> */}
                    {!isUserLogin &&
                        // <NavLink to="/signin">
                        <Tab label="SignIn" component={Link} to="/signin" onClick={() => setSelectedTab(1)} />
                        // </NavLink>
                    }
                    {!isUserLogin &&
                        // <NavLink to="/signup">
                        <Tab label="SignUp" component={Link} to="/signup" onClick={() => setSelectedTab(2)} />
                        // </NavLink>
                    }
                    {isUserLogin &&
                        // <Button onClick={logout}>
                        <Tab label="Logout" onClick={logout} />
                        // </Button>
                    }

                    <Tab component={Link} to="/cart" onClick={() => setSelectedTab(3)}
                        label={
                            <IconButton aria-label="show Cart Items" color="inherit"
                                style={{
                                    marginLeft: "auto",
                                    paddingRight: "30px"
                                }}>
                                <Badge badgeContent={itemCount} color="secondary">
                                    <ShoppingCartOutlinedIcon />
                                </Badge>
                            </IconButton>
                        }>
                    </Tab>


                </Tabs>
            </AppBar>
        </div >
    )
}

export default Navbar;