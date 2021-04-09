import React from 'react';
import'./ManageCard.css'
const ManageCard = ({product}) => {
    const deleteProduct=(id)=>{
        fetch(`http://fathomless-caverns-29492.herokuapp.com/deleteProduct/${id}`,{
            method:'DELETE',
        })
        .then(res=>res.json())
        .then(res=>console.log(res))
    }
    const { name, quantity, weight ,price , _id} = product;
    console.log(name,quantity, weight);
    return (
        <div className="manage-cart">
              <h4 className="gapBetweenH4" >{name}</h4>
              <h4 className="gapBetweenH4">{quantity}</h4>
              <h4 className="gapBetweenH4">{weight}</h4>
              <h4 className="price">{price}</h4>
              <button onClick={()=>{deleteProduct(_id)}}> Delete</button>
        </div>
    );
};

export default ManageCard;   