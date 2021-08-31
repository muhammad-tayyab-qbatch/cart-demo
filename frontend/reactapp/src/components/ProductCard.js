import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  makeStyles,
  Card,
  CardActionArea,
  CardMedia,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';
import cryptoRandomString from 'crypto-random-string';
import { addAndUpdateToCart } from '../redux/slices/cartSlice';
import { setCookie, getCookie } from '../Helper/helperFunction';

const useStyles = makeStyles({
  root: {
    minWidth: 250,

  },
  media: {
    height: "250px",
    width: "190px",
    display: "inline",
    objectFit: "contain"
  },
});


const ProductCard = ({ _id, name, price, src }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { auth, email } = useSelector((state) => state.user);
  const handleOnClick = () => {
    const userId = getCookie("userId");
    if(auth){
      dispatch(addAndUpdateToCart({ productId: _id, quantity: 1, userId: email }));
    }
    else if(userId){
      dispatch(addAndUpdateToCart({ productId: _id, quantity: 1, userId: userId }));
    }
    else{
     // console.log(`no cookie`);
      const randomTocken = cryptoRandomString({length: 10});
      setCookie('userId', randomTocken);
      dispatch(addAndUpdateToCart({ productId: _id, quantity: 1, userId: randomTocken }));
    }    
  }
  
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={name}
          image={src}
          title={name}
          className={classes.media}
        />
        <CardContent style={{ padding: "2px" }}>
          <Typography gutterBottom variant="h5" component="h2" style={{ paddingTop: "5px" }}>
            {name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2" style={{ color: "red" }}>
            Rs. {price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ display: "block" }} >
        <Button size="small" color="primary" onClick={handleOnClick} >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;