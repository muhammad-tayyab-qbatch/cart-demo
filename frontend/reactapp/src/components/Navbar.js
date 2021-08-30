import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, Tabs, Tab, IconButton, Badge } from '@material-ui/core';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

const Navbar = () => {
    const { itemCount } = useSelector((state) => state.cart);
    return (
        <div className="navbar-div">
            <AppBar position="static" color="default">
                <Tabs >
                    <NavLink to="/products">
                        <Tab label="Products" />
                    </NavLink>
                    <NavLink to="/signin">
                        <Tab label="SignIn" />
                    </NavLink>
                    <NavLink to="/signup">
                        <Tab label="SignUp" />
                    </NavLink>
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