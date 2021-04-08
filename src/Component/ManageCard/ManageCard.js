import React from 'react';
import'./ManageCard.css'
const ManageCard = ({product}) => {
    const { name, quantity, weight ,price } = product;
    console.log(name,quantity, weight);
    return (
        <div className="manage-cart">
              <h4 className="gapBetweenH4" >{name}</h4>
              <h4 className="gapBetweenH4">{quantity}</h4>
              <h4 className="gapBetweenH4">{weight}</h4>
              <h4 className="price">{price}</h4>
        </div>
    );
};

export default ManageCard;