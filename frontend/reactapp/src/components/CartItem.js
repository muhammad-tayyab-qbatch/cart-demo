import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';

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
    const { cartId, productId, productName, productPrice, productQuantity, src } = props;

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

                    <div className={classes.controls}>
                        <IconButton aria-label="previous">
                            <RemoveIcon />
                        </IconButton>
                        <input style={{ textAlign: "center" }} value={productQuantity} />
                        <IconButton aria-label="next">
                            <AddIcon />
                        </IconButton>
                    </div>

                    <Typography gutterBottom variant="h5" component="h2" className={classes.typographyStyle}
                        style={{
                            position: "fixed",
                            right: "250px"
                        }}>
                        Rs. {productQuantity*productPrice}
                    </Typography>
                </CardContent>
                {/* </CardActionArea> */}
                <CardActions style={{ width: "90px" }}>
                    <IconButton color="secondary" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                    {/* <Button size="small" color="primary" >
                        Remove Item
                    </Button> */}
                </CardActions>
            </Card>
        </div>
    );
}

export default CartItem;