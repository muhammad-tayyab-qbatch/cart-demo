import React from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Tabs, Tab, IconButton, Badge } from '@material-ui/core';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

// import Toolbar from '@material-ui/core/Toolbar';

// import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';

const Navbar = () => {
    const { count } = useSelector((state) => state.cart);
    return (
        <div className="navbar-div">
            <AppBar position="static" color="default">
                <Tabs >
                    <Tab label="Products" />

                    <IconButton aria-label="show Cart Items" color="inherit" style={{
                        marginLeft: "auto",
                        paddingRight: "30px"}}>
                        <Badge badgeContent={count} color="secondary">
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                    </IconButton>

                </Tabs>

            </AppBar>
        </div >
    )
}

export default Navbar;