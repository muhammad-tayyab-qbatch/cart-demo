import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    makeStyles,
    Card,
    CardContent,
    Typography
} from '@material-ui/core';
import CartItem from './CartItem';
import { getCartItemsFromApi } from '../redux/slices/cartSlice';
import { setCookie, getCookie } from '../Helper/helperFunction';
const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 250,
        paddingTop: '30px',
        paddingLeft: '60px',
        paddingRight: '60px',
        display: 'flex'
    },
    typographyStyle: {
        width: '200px'
    },
    cardContent: {
        display: "flex",
        width: "-webkit-fill-available"
    }
}));


const Cart = () => {
    const classes = useStyles();
    const { cartList } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => { dispatch(getCartItemsFromApi({userId: getCookie('userId')})) }, []);

    return (
        <div>
            <Card className={classes.root} >

                <CardContent className={classes.cardContent} >
                    <Typography gutterBottom variant="h5" component="h2" className={classes.typographyStyle}>
                        Name
                    </Typography>

                    <Typography gutterBottom variant="h5" component="h3" className={classes.typographyStyle}>
                        Item Price
                    </Typography>

                    <Typography gutterBottom variant="h5" component="h4" style={{ width: '350px' }} >
                        Quantity
                    </Typography>

                    <Typography gutterBottom variant="h5" component="h5" className={classes.typographyStyle}>
                        Total Price
                    </Typography>
                </CardContent>

                <Typography gutterBottom variant="h5" component="h6" className={classes.typographyStyle}
                    style={{
                        marginTop: '10px'
                    }}>
                    Remove Item
                </Typography>

            </Card>
            <div>
                {
                    cartList.map(({ _id, productId, productName, productPrice, quantity, productImageUrl }) =>
                        <CartItem key={_id.toString()} cartId={_id} productId={productId} productName={productName} productPrice={productPrice} quantity={quantity} src={productImageUrl} />
                    )
                }
            </div>

        </div>
    );
}

export default Cart;