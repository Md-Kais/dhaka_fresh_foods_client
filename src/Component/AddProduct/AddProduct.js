import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { UserContext } from '../../App';
import './AddProduct.css'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '50ch',
    },
}));

export default function AddProduct() {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const classes = useStyles();
    const [values, setValues] = React.useState({
        quantity: '',
        weight: '',
        email: `${loggedInUser.email}`,
        photoUrl: '',
        name: '',
        price: ''
    });
    const handleFileChange = (prop) => (event) => {
        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', '6b471042df35b267514f08a09dc5b873');
        imageData.append('image', event.target.files[0]);
        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                console.log(response.data.data.display_url);
                const photoUrl = response.data.data.display_url;
                setValues({ ...values, [prop]: photoUrl });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });

    }
    const handleClick = () => {
        console.log(values);
        fetch('https://fathomless-caverns-29492.herokuapp.com/addProducts', {
            method: 'POST', // or 'PUT'
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    return (
        <div>
            <h2 className="margin">Add Product</h2>


            <div className="margin ">
                <div className={classes.root} >

                    <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                        <Input
                            id="standard-adornment-name"
                            value={values.name}
                            onChange={handleChange('name')}
                            endAdornment={<InputAdornment position="end"></InputAdornment>}
                            aria-describedby="standard-name-helper-text"
                            inputProps={{
                                'aria-label': 'name',
                            }}
                        />
                        <FormHelperText id="standard-name-helper-text">Producty Name</FormHelperText>
                    </FormControl>


                    <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                        <Input
                            id="standard-adornment-weight"
                            value={values.weight}
                            type="number"
                            onChange={handleChange('weight')}
                            endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                            aria-describedby="standard-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                        />
                        <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText>
                    </FormControl>

                    <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                        <Input
                            id="standard-adornment-quantity"
                            value={values.quantity}
                            type="number"
                            onChange={handleChange('quantity')}
                            endAdornment={<InputAdornment position="end">Piece</InputAdornment>}
                            aria-describedby="standard-quantity-helper-text"
                            inputProps={{
                                'aria-label': 'quantity',
                            }}
                        />
                        <FormHelperText id="standard-quantity-helper-text">Quantity</FormHelperText>
                    </FormControl>

                    <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                        <Input
                            id="standard-adornment-price"
                            value={values.price}
                            type="number"
                            onChange={handleChange('price')}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            aria-describedby="standard-price-helper-text"
                            inputProps={{
                                'aria-label': 'price',
                            }}
                        />
                        <FormHelperText id="standard-price-helper-text">Price</FormHelperText>
                    </FormControl>

                    <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                        <Input
                            id="standard-adornment-name"
                            // value={values.photoUrl}
                            onChange={handleFileChange('photoUrl')}
                            type='file'

                            aria-describedby="standard-photoUrl-helper-text"
                            inputProps={{
                                'aria-label': 'photoUrl',
                            }}
                        />
                        <FormHelperText id="standard-photoUrl-helper-text">Photo</FormHelperText>
                    </FormControl>



                </div>
                <br />
                <div style={{ 'textAlign': 'center' }}>
                    <Button variant="contained" color="secondary" onClick={() => handleClick()}>
                        Submit
                </Button>

                </div>
            </div>
        </div>
    );
}











