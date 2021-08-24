import React from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Tabs, Tab, IconButton, Badge } from '@material-ui/core';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

import { NavLink } from 'react-router-dom';


const Navbar = () => {
    const { itemCount } = useSelector((state) => state.cart);
    return (
        <div className="navbar-div">
            <AppBar position="static" color="default">
                <Tabs >
                    <NavLink exact to="/">
                        <Tab label="Products" />
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