import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ProductCard from './ProductCard';
import { getProductsFromApi } from '../redux/slices/productSlice';
import { getCartItemsFromApi } from '../redux/slices/cartSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: '20px',
        paddingLeft: '30px',
        paddingRight: '30px'
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    grid: {
        width: "100%",
        margin: "0px"
    }
}));

const Products = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { productList } = useSelector((state) => state.product);
    useEffect(() => { dispatch(getProductsFromApi()); dispatch(getCartItemsFromApi()) }, []);


    if (productList.length) {
        return (
            < div className={classes.root} >
                <Grid container spacing={10} className={classes.grid} >
                    {
                        productList.map(({ _id, name, price, imageUrl }) => (
                            <Grid container item xs={3} >
                                <Paper className={classes.paper}>
                                    <ProductCard _id={_id} name={name} price={price} src={imageUrl} />
                                </Paper>
                            </Grid>
                        ))
                    }
                </Grid>
            </div >
        )
    } else {
        return <h1>Loading...............</h1>
    }
}

export default Products;