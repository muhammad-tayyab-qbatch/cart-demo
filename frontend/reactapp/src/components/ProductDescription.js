import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    makeStyles
} from '@material-ui/core';


import { getSelectedProduct } from '../redux/slices/productSlice'

const useStyles = makeStyles({
    root: {
        minWidth: 250,
        backgroundColor: "#EBECF0"
    },
    media: {
        height: "250px",
        width: "190px",
        display: "inline",
        objectFit: "fill",
        marginLeft: "25%"
    },
});

const ProductDescription = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getSelectedProduct({ _id: id }));
    }, [])

    const { selectedProduct, error } = useSelector((state) => state.product);
    
    if (selectedProduct) {
        return (
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="des"
                        image={selectedProduct.imageUrl}
                        title="des"
                        className={classes.media}
                    />
                    <CardContent style={{ padding: "2px" }}>
                        <Typography gutterBottom variant="h3" component="h2" style={{ paddingTop: "5px", marginLeft: "15px" }}>
                            {selectedProduct.name}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2" style={{ color: "red", marginLeft: "15px" }}>
                            Rs. {selectedProduct.price}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2" style={{ paddingTop: "5px", marginLeft: "15px" }}>
                            {selectedProduct.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
    else {
        return (
            <h1 style={{ textAlign: 'center' }}>Product not Found...</h1>
        )
    }
}

export default ProductDescription;