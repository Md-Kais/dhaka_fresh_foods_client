import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './ProductCardDesign.css'

import { Link } from 'react-router-dom';
const useStyles = makeStyles({
    root: {
        maxWidth: 'auto',
        backgroundColor: '#fe9355',
    },
    media: {
        width: '95%',
        height: 'auto',
        backgroundColor: '#fe9355',
        backgroundSize: 'cover',
    },
    border: {
        border: 'none',
    }
});

const ProductCardDesign = ({datam})=>{
    const classes = useStyles();
    // let { idLeague, strCountry, strLeagueAlternate, strLeague, strLogo } = props.data;
    // console.log(props.data);
    const { photoUrl, quantity, weight, name, price , _id } =datam;
//   console.log(photoUrl,quantity, name);
    function handleBuyCart(id){
        console.log(id);
        let count = localStorage.length+1;
        localStorage.setItem(count,id);
        localStorage.getItem(count);
        console.log(localStorage.length);
    }

    return (
        <>

            <CardActionArea className='card-Bg-Change' style={{
                borderRadius: '20px'
            }}>
                <CardMedia style={{ textAlign: 'center',  borderRadius: '20px' ,margin:'0 auto' , marginTop:'5px' }}
                    className={classes.media}
  
                    component="img"
                    alt={name}

                    image={photoUrl}
                />
                <CardContent>

                    <Typography gutterBottom variant="h5" component="h2" style={{ color: '#15101A', fontFamily: 'bold', fontSize: '24px', fontWeight: '600' }}>
                        {`${name}-${weight}kg`}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p">
                        {`${quantity} left in the stock`}<br />

                    </Typography>
                    <Typography variant="h5" style={{ color: '#15101A', fontFamily: 'normal', fontSize: '16px', fontWeight: '300' }}>
                      {`Price : $ ${price}`}<br />

                    </Typography>


                </CardContent>

                {/* <Link to={`/leagueDetailed/${idLeague}`} className="linkDesign"></Link> */}
                    <Button size="small" variant="contained" color="secondary" onClick={()=>{handleBuyCart(_id)}} style={{ margin: '5px' }}>Buy Now</Button>
                


            </CardActionArea>








        </>
    );
}
export default ProductCardDesign;