import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Deals from '../Deals/Deals';
import OrderCard from '../OrderCard/OrderCard';

const Orders = () => {

    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const savedCart = localStorage || {};
    //let productKeys = Object.values(savedCart);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let [productKeys, setProductKeys] = useState(Object.values(savedCart));
    useEffect(() => {
        const url = `http://fathomless-caverns-29492.herokuapp.com/getProductsCard?email=${loggedInUser.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => {

                if (data.length > 0) {
                    let { prevproductKeys } = data[0];
                    let previousKeys = prevproductKeys;
                    console.log(data[0]);
                    const newKeys = [...productKeys, previousKeys];
                    setProductKeys(newKeys);
                  
                    fetch('https://fathomless-caverns-29492.herokuapp.com/productsBykeys', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(productKeys)
                    })
                        .then(res => res.json())
                        .then(data => setCart(data))
                }
      
                }




            )
    }, []);
    console.log(productKeys);
    useEffect(() => {
        //cart



        console.log(productKeys);
        fetch('https://fathomless-caverns-29492.herokuapp.com/productsBykeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))
    }
        , []);
    console.log(cart);
    let totalPrice = 0;
    return (

        <div>
            <h2 style={{ textAlign: 'center' }}>Your Cart: </h2>
            <h4>You want to buy {localStorage.length} Products. </h4>
            <hr />
            {
                cart && cart.map((product, index) => {
                    index++;
                    const { price } = product;

                    totalPrice += Number(price)
                    sessionStorage.setItem('price', totalPrice);
                    return (

                        <div className="row" key={index}><OrderCard product={product}></OrderCard></div>
                    )
                })
            }
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h4 style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '50px' }}>Total Price :</h4>
                <h4 style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '50px' }}>${sessionStorage.getItem('price')}</h4>
            </div>
            <button><Deals productKeys={productKeys}>Proceed to Buy
            
            </Deals></button>

        </div>
    );
};

export default Orders;