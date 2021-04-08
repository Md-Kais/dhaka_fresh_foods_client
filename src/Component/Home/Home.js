import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AllProductCard from '../AllProductCard/AllProductCard';

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

const Home = () => {
    const classes = useStyles();
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('https://fathomless-caverns-29492.herokuapp.com/')
            .then(res => res.json())
            .then(datam => setData(datam));
    }, []);
    console.log(Object.values(localStorage));
    return (
        <div className={classes.root} >
            <Grid container spacing={3}>


                <AllProductCard data={data}></AllProductCard>

            </Grid>

        </div>
    );
};

export default Home;