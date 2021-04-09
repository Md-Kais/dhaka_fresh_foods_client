import React from 'react';

const OrderCard = ({product}) => {
    
    const { name, quantity, weight, price, _id } = product;
    
    return (
        <div>
            <div className="manage-cart">
                <h4 className="gapBetweenH4" >{name}</h4>
               
                <h4 className="gapBetweenH4">{weight} Kg</h4>
                <h4 className="price">${price}</h4>
                
            </div>
            
         

        </div>
    );
};

export default OrderCard;