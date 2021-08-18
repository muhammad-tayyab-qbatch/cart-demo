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

import CartItem from './CartItem';

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


const Cart = () => {
    const classes = useStyles();

    return (
        <div>

            <Card className={classes.root} style={{ display: "flex" }}>
                {/* <CardActionArea > */}
                <CardContent style={{ display: "flex", width: "-webkit-fill-available" }}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.typographyStyle}>
                        Name
                    </Typography>
                    {/* <div className={classes.controls}>
                        <IconButton aria-label="previous">
                            <RemoveIcon />
                        </IconButton>
                        <input />
                        <IconButton aria-label="next">
                            <AddIcon />
                        </IconButton>
                    </div> */}
                    <Typography gutterBottom variant="h5" component="h2" className={classes.typographyStyle}>
                        Item Price
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.typographyStyle}
                        style={{
                            paddingLeft: "50px"
                        }}>

                        Quantity
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.typographyStyle}
                        style={{
                            position: "fixed",
                            right: "250px"
                        }}>
                        Total Price
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.typographyStyle}
                        style={{
                            position: "fixed",
                            right: "0px"
                        }}>

                        Remove Item

                    </Typography>
                </CardContent>
                {/* </CardActionArea> */}
                {/* <Typography gutterBottom variant="h5" component="h2" className={classes.typographyStyle}>
                    
                        Remove Item
                    
                </Typography> */}
            </Card>
            <CartItem />
        </div>
    );
}

export default Cart;