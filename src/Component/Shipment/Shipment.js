import { Button, Link } from '@material-ui/core';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../App';

const Shipment = () => {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    const history=useHistory();
    const handleClick=()=>{
        history.push('/');
    }
    return (
        <div>
            {
                alert('Your Order Placed Successfully')
            }
            <h3>THANKS A LOT. WE ARE AT YOUR SERVICE. </h3>
            <h4>PLEASE SUPPORT US, SIR</h4>
            <h5>Your email address is : {loggedInUser.email}</h5>
            <h2>PLEASE go to the <Button onClick={() => handleClick()}>Home</Button> page to buy more</h2>
        </div>
    );
};

export default Shipment;