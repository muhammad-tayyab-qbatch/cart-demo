import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
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

const Cart = () => {
    const classes = useStyles();
    
    return (
        
        <Card className={classes.root} style={{display:"flex"}}>
            <CardActionArea >
                <CardContent style={{display:"flex"}}>
                    <Typography gutterBottom variant="h5" component="h2" >
                        aaaa
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2" >
                        Rs. 444
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions >
                <Button size="small" color="primary" >
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
}

export default Cart;