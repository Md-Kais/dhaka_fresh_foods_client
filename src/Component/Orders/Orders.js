import React, { useEffect, useState } from 'react';

const Orders = () => {
  
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    useEffect(() => {
        //cart
        const savedCart = localStorage || {};
        const productKeys = Object.values(savedCart);
        console.log(productKeys);
        fetch('https://fathomless-caverns-29492.herokuapp.com/placedBykeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))
    }
    ,[]);

    return (
        <div>
            <h3>Your Orders</h3>
        </div>
    );
};

export default Orders;