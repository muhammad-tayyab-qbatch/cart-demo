import React, { useState } from 'react';
import { useDispatch  } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';

import { removeCartItem, addAndUpdateToCart } from '../redux/slices/cartSlice';

const useStyles = makeStyles({
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
    }
});


const CartItem = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { cartId, productId, productName, productPrice, quantity, src } = props;
    const [count , setCount ] = useState(quantity);

    const handleChange = (e) => {
        let total = e.target.value - count;
        // if(e.target.value === 1){
        //     total=1;
        // }
        // else{
        //     total = e.target.value - count;
        // }
        setCount(e.target.value);
        dispatch(addAndUpdateToCart({productId: productId, quantity: total}));
    }
    return (
        <div>

            <Card className={classes.root} style={{ display: "flex" }}>
                {/* <CardActionArea > */}
                <CardContent style={{ display: "flex", width: "-webkit-fill-available" }}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.typographyStyle} >
                        {productName}
                    </Typography>

                    <Typography gutterBottom variant="h5" component="h2" className={classes.typographyStyle}>
                        Rs. {productPrice}
                    </Typography>

                    <div style={{ width: '350px' }}>
                        <input style={{ textAlign: "center" }} type="number" min="1" value={quantity || 0 } onChange={handleChange}/>
                    </div>

                    <Typography gutterBottom variant="h5" component="h2" >
                        Rs. {( quantity || 0 )* productPrice}
                    </Typography>
                </CardContent>
                {/* </CardActionArea> */}
                <CardActions style={{ width: "130px" }} >
                    <IconButton color="secondary" aria-label="delete" onClick={() => dispatch(removeCartItem({cartId: cartId}))}>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
}

export default CartItem;