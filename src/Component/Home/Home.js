import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import AllProductCard from '../AllProductCard/AllProductCard';
import {  CircularProgress } from '@material-ui/core';
import './Home.css'
import { Link } from 'react-router-dom';
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
                {
                    data.length <= 0 ? <div className="loadingHome"><CircularProgress /> </div>: <AllProductCard data={data}></AllProductCard>
                }
                
                {/* <AllProductCard data={data}></AllProductCard> */}

            </Grid>
            <div style={{display:'flex', justifyContent:'center'}}>
                <button ><Link to="/orders" className="link-text">Go to the order</Link></button>
            </div>
           

        </div>
    );
};

export default Home;