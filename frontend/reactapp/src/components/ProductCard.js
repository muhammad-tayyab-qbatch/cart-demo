import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
  const { name, price, src } = props;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={name}
          height="190"
          image={src}
          title={name}
        />
        <CardContent style={{ padding: "2px" }}>
          <Typography gutterBottom variant="h5" component="h2" style={{ paddingTop: "5px" }}>
            {name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2" style={{color:"red"}}>
            Rs. {price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ display: "block" }} >
        <Button size="small" color="primary" >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;