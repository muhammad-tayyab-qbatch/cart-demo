import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { addToCart } from '../redux/slices/cartSlice';

const useStyles = makeStyles({
  root: {
    minWidth: 250,

  },
  media: {
    height: 50,
  },
});

const ProductCard = (props) => {
  const classes = useStyles();
  const { _id, name, price, src } = props;
  const [quantity, setQuantity] = useState(0);
  //console.log(`quantity is ${quantity}`);
  const dispatch = useDispatch();

  const handleOnClick = () => {
    setQuantity(quantity + 1); 
    dispatch(addToCart({productId: _id, quantity: quantity }))
  }
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={name}
          image={src}
          title={name}
          style={{
            height: "200px",
            width: "140px",
            display: "inline"
          }}
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