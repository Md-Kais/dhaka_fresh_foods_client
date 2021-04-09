import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Button } from '@material-ui/core';
import './Deals.css'
import { UserContext } from '../../App';
import { useHistory } from 'react-router';


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

export default function Deals({productKeys}) {
    const history = useHistory()
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const classes = useStyles;
    const [values, setValues] = React.useState({
       
        email: `${loggedInUser.email}`,
        // address: '',
        prevproductKeys:productKeys,
        // phoneNumber: ''
    });
    console.log(productKeys);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });

    }
    const handleClick = () => {
        console.log(values);
        fetch('https://fathomless-caverns-29492.herokuapp.com/addOrder', {
            method: 'POST', 
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(values),

        })
            .then(response => response.json())
            .then(data => {
                localStorage.clear();
                sessionStorage.removeItem('price');
               
                console.log('Success:', data);
                history.push('/shipment');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    return (
        <div className="dealsBox">

            <div className={classes.root} >
                <h3>Information of shipment</h3>
                <br/>
                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Input
                        id="standard-adornment-email"
                        value={values.email}
                        onChange={handleChange('email')}
                        endAdornment={<InputAdornment position="end"></InputAdornment>}
                        defaultValue={loggedInUser.email}
                        aria-describedby="standard-name-helper-text"
                        inputProps={{
                            'aria-label': 'email',
                        }}
                    />
                    <FormHelperText id="standard-email-helper-text">Email</FormHelperText>
                </FormControl>
                {/* <br />
                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Input
                        id="standard-adornment-address"

                        onChange={handleChange('address')}
                        endAdornment={<InputAdornment position="end"></InputAdornment>}

                        aria-describedby="standard-address-helper-text"
                        inputProps={{
                            'aria-label': 'address',
                        }}
                    />
                    <FormHelperText id="standard-name-helper-text">Address</FormHelperText>
                </FormControl>
                <br />




                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Input
                        id="standard-adornment-phoneNumber"
                        value={values.phoneNumber}
                        type="text"
                        onChange={handleChange('phoneNumber')}
                        startAdornment={<InputAdornment position="start">+</InputAdornment>}
                        aria-describedby="standard-phoneNumber-helper-text"
                        inputProps={{
                            'aria-label': 'phoneNumber',
                        }}
                    />
                    <FormHelperText id="standard-phoneNumber-helper-text">Phone Number</FormHelperText>
                </FormControl>
 */}




            </div>
            <br />
            <div style={{ 'textAlign': 'center' }}>
                <Button variant="contained" color="secondary" onClick={() => handleClick()}>
                    Place Order
                </Button>

            </div>
        </div>

    );
}











