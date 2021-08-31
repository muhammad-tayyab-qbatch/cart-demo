import React, { useEffect } from 'react';
import {
    Route,
    Link,
    useRouteMatch,
    Switch,
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {
    makeStyles,
    Paper,
    Grid
} from '@material-ui/core';
import ProductCard from './ProductCard';
import ProductDescription from './ProductDescription';
import Error from './Error';
import { getProductsFromApi, getSelectedProduct } from '../redux/slices/productSlice';
import { getCartItemsFromApi } from '../redux/slices/cartSlice';
import { setCookie, getCookie } from '../Helper/helperFunction';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        paddingTop: '15px',
        paddingLeft: '20px',
        paddingRight: '20px'
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    grid: {
        width: "95%",
        margin: "0px",
    },
    productDiv: {
        width: '75%',
    }
}));


const Products = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { productList } = useSelector((state) => state.product);
    const { auth, email } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getProductsFromApi());
        const userId = auth ? email : getCookie('userId') ? getCookie('userId') : null;
        if (userId) {
            dispatch(getCartItemsFromApi({ userId: userId }));
        }
    }, []);

    const { path, url } = useRouteMatch();
    if (productList.length) {
        return (
            <div className={classes.root}>
                <div className={classes.productDiv}>
                    <Grid container spacing={10} className={classes.grid} >
                        {
                            productList.map(({ _id, name, price, imageUrl }) => (
                                <Grid key={_id} container item xs={3} >
                                    <Paper className={classes.paper}>
                                        <Link to={`${url}/des/${_id}`} onClick={() => { dispatch(getSelectedProduct({ _id: _id })) }}>
                                            <ProductCard _id={_id} name={name} price={price} src={imageUrl} />
                                        </Link>
                                    </Paper>
                                </Grid>
                            ))
                        }
                    </Grid>
                </div >
                <div style={{ width: '25%', backgroundColor: '#EBECF0' }}>
                    <h2 style={{ textAlign: 'center' }}>Product Details</h2>
                    <Switch>
                        <Route exact path={`${path}/des/:id`} >
                            <ProductDescription />
                        </Route>
                        <Route component={Error} />
                    </Switch>
                </div>

            </div>
        )
    } else {
        return <h1 style={{ textAlign: 'center' }}>Loading...............</h1>
    }
}

export default Products;