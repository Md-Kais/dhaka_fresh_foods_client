import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import './AllProductCard.css'
import ProductCardDesign from '../ProductCardDesign/ProductCardDesign';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const AllProductCard = ({ data }) => {
    console.log(data);
    const classes = useStyles();
    let count = 0;

    return (
        <div className={classes.root} style={{ textAlign: 'center',margin:'100px' }}>
            <Grid container className='grid-Changer' spacing={3}>

                {
                    data.length > 0 && data.map((datam) => {

                        return (



                            <Grid item xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center', borderRadius: '50px' }}>

                                <Paper className={classes.paper} style={{ textAlign: 'center' }}>
                                    <ProductCardDesign key={count} datam={datam}></ProductCardDesign>

                                </Paper>
                            </Grid>

                        )
                    })
                }




            </Grid>
        </div>
    );
}

export default AllProductCard;