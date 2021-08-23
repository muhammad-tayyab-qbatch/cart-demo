import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import CartItem from './CartItem';
import { getCartItemsFromApi } from '../redux/slices/cartSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 250,
        paddingTop: '30px',
        paddingLeft: '60px',
        paddingRight: '60px'

    },
    media: {
        height: 50,
    },
    typographyStyle: {
        width: '200px'
    },
    paper: {
        color: theme.palette.text.secondary,
    }
}));


const Cart = () => {
    const classes = useStyles();
    const { cartList } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    useEffect(() => { dispatch(getCartItemsFromApi()) }, []);

    return (
        <div>
            <Card className={classes.root} style={{ display: "flex" }}>
                {/* <CardActionArea > */}
                <CardContent style={{ display: "flex", width: "-webkit-fill-available" }}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.typographyStyle}>
                        Name
                    </Typography>

                    <Typography gutterBottom variant="h5" component="h3" className={classes.typographyStyle}>
                        Item Price
                    </Typography>

                    <Typography gutterBottom variant="h5" component="h4"
                        style={{    
                            width: '350px'
                        }}
                    >
                        Quantity
                    </Typography>

                    <Typography gutterBottom variant="h5" component="h5" className={classes.typographyStyle}
                        // style={{
                        //     width: '500px'
                        // }}
                    >
                        Total Price
                    </Typography>

                    {/* <Typography gutterBottom variant="h5" component="h2" className={classes.typographyStyle}
                        
                        >
                        Remove Item
                    </Typography> */}

                </CardContent>
                {/* </CardActionArea> */}
                <Typography gutterBottom variant="h5" component="h6" className={classes.typographyStyle}
                    style={{
                        marginTop: '10px'
                    }}>
                    Remove Item
                </Typography>
            </Card>
            <div>
                {
                    cartList.map((item) => (
                        // <Paper className={classes.paper}>
                        <CartItem cartId={item._id} productId={item.productId} productName={item.productName} productPrice={item.productPrice} quantity={item.quantity} src={item.productImageUrl} />
                        // </Paper>
                    ))
                }
            </div>

        </div>
    );
}

export default Cart;