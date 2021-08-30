import React from 'react';
import { useDispatch } from 'react-redux';
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

import { addAndUpdateToCart } from '../redux/slices/cartSlice';

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

  const handleOnClick = () => {
    dispatch(addAndUpdateToCart({ productId: _id, quantity: 1 }))
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