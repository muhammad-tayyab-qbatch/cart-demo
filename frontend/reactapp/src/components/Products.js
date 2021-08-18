import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ProductCard from './ProductCard';
import { getDataFromApi } from '../redux/slices/productSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: '30px',
        paddingLeft: '30px',
        paddingRight: '30px'
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
const Products = () => {
    const dispatch = useDispatch();
    const { list } = useSelector((state) => state.product);

    const classes = useStyles();

    useEffect(() => { dispatch(getDataFromApi()) }, []);
    if (list.length) {
        return (
            < div className={classes.root} >
                <Grid container spacing={10}>
                    {
                        list.map((item) => (
                            <Grid container item xs={3} >
                                <Paper className={classes.paper}>
                                    <ProductCard name={item.name} price={item.price} src={item.imageUrl} />
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