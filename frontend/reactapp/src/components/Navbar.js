import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Tabs, Tab, IconButton, Badge, Button } from '@material-ui/core';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { getCookie, setCookie }from '../Helper/helperFunction';
import { getCartItemsFromApi, clearState as clearCart } from '../redux/slices/cartSlice'; 
import { clearState as clearUser, getUser } from '../redux/slices/userSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const { itemCount } = useSelector((state) => state.cart);
    const { auth, token } = useSelector((state) => state.user);
    const [isUserLogin, setIsUserLogin] = useState(false);
    
    useEffect(() => {
        const tokenFromCookie = getCookie('token');
        if (tokenFromCookie){
            setIsUserLogin(true);
        } 
    }, [])

    useEffect(() => {
        if(auth && token) {
            setIsUserLogin(true);
        }
    }, [token])

    useEffect(() => {
        if(isUserLogin){
            const tokenFromCookie = getCookie('token');
            dispatch(getCartItemsFromApi({token: tokenFromCookie}));
            dispatch(getUser({token: tokenFromCookie}));
        }
    },[isUserLogin])

    const logout = () => {
        setCookie("token", "");
        setIsUserLogin(false);
        dispatch(clearCart());
        dispatch(clearUser());
    }

    return (
        <div className="navbar-div">
            <AppBar position="static" color="default">
                <Tabs value={0}>
                    <NavLink to="/products">
                        <Tab label="Products" />
                    </NavLink>
                    {!isUserLogin && <NavLink to="/signin">
                        <Tab label="SignIn" />
                    </NavLink>}
                    {!isUserLogin && <NavLink to="/signup">
                        <Tab label="SignUp" />
                    </NavLink>}
                    {isUserLogin && <Button onClick={logout}>
                        <Tab label="Logout" />
                    </Button>}
                    <NavLink to="/cart" style={{ display: "contents" }}>
                        <IconButton aria-label="show Cart Items" color="inherit"
                            style={{
                                marginLeft: "auto",
                                paddingRight: "30px"
                            }}>
                            <Badge badgeContent={itemCount} color="secondary">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </IconButton>
                    </NavLink>

                </Tabs>
            </AppBar>
        </div >
    )
}

export default Navbar;