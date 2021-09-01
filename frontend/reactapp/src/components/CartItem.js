import React from 'react';
import { useDispatch } from 'react-redux';
import {
    makeStyles,
    Card,
    CardActions,
    CardContent,
    Typography,
    IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeCartItem, addAndUpdateToCart } from '../redux/slices/cartSlice';

const useStyles = makeStyles({
    root: {
        minWidth: 250,
        paddingTop: '30px',
        paddingLeft: '60px',
        paddingRight: '60px',
        display: 'flex'
    },
    media: {
        height: 50,
    },
    typographyStyle: {
        width: '200px'
    },
    cardContent: {
        display: "flex",
        width: "-webkit-fill-available"
    }
});

const CartItem = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { cartId, productId, productName, productPrice, quantity, src } = props;

    const handleChange = (e) => {
        if (!e.target.value || e.target.value === "0") {
            alert("Quantity can't be zero");
        }
        else {
            let total = e.target.value - quantity;
            dispatch(addAndUpdateToCart({ productId: productId, quantity: total }));
        }
    }
    
    return (
        <div>
            <Card className={classes.root}>
                <CardContent className={classes.cardContent} >
                    <Typography gutterBottom variant="h5" component="h2" className={classes.typographyStyle} >
                        {productName}
                    </Typography>

                    <Typography gutterBottom variant="h5" component="h2" className={classes.typographyStyle} >
                        Rs. {productPrice}
                    </Typography>

                    <div style={{ width: '350px' }}>
                        <input style={{ textAlign: "center" }} type="number" min="0" value={quantity} onChange={handleChange} />
                    </div>

                    <Typography gutterBottom variant="h5" component="h2" >
                        Rs. {(quantity) * productPrice}
                    </Typography>
                </CardContent>
                <CardActions style={{ width: "130px" }} >
                    <IconButton color="secondary" aria-label="delete" onClick={() => dispatch(removeCartItem({ cartId: cartId }))}>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
}

export default CartItem;