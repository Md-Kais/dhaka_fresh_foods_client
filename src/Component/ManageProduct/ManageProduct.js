import { CircularProgress } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import '../AddProduct/AddProduct.css'
import ManageCard from '../ManageCard/ManageCard';
import './ManageProduct.css'
const ManageProduct = () => {
    const [productsAdmin, setProductsAdmin] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(() => {
        //http://localhost:5055/manageProducts?email
        //fathomless-caverns-29492.herokuapp.com/manageProducts?email=+${loggedInUser.email}
        const url = `http://fathomless-caverns-29492.herokuapp.com/manageProducts?email=${loggedInUser.email}`
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',

                authorization: `Bearer  ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setProductsAdmin(data))
    }, [])

    return (
        <div>
            <h2 className="margin">Manage Card</h2>
            <div className="margin" id="productList">

                <div className="manage-cart">

                    <h4 className="gapBetweenH4" >Name  &nbsp;&nbsp;&nbsp;</h4>
                    <h4 className="gapBetweenH4">  &nbsp;&nbsp;&nbsp; Quantity &nbsp;&nbsp;&nbsp;&nbsp;</h4>
                    <h4 className="gapBetweenH4">Weight</h4>
                    <h4 className="gapBetweenH4">Price</h4>
                    <h4 className="gapBetweenH4">Delete?</h4>
                </div>
                {
                    productsAdmin.length <= 0 ? <div className="loadingHome"><CircularProgress /> </div> : productsAdmin.map((product, index) => {
                        index++;
                        return (

                            <div className="row" key={index}><ManageCard product={product} ></ManageCard></div>
                        )
                    })
                }

            </div>
        </div >

    );
};

export default ManageProduct;