import "../components-styles/ShippingSelection.css"; 

import React, { useState } from 'react';

const ShippingOptions = ({ product, setSelectedOption, shippingCost, setShippingCost }) => {

  const handleShippingChange = (option) => {
    setSelectedOption(option);
    
    if (option === '10-days' && product.free_shipping) {
      setShippingCost(0);
    } else if (option === '10-days') {
      setShippingCost(10000);
    } else if (option === '1-week') {
      setShippingCost(20000);
    } else if (option === '2-3-days') {
      setShippingCost(25000);
    }

  };

  return (
    <div className="shipping-options">
      <h3>Select Shipping Option</h3>
      <form>
        <div className="option">
          <input
            type="radio"
            id="10-days"
            name="shipping"
            value="10-days"
            onChange={() => handleShippingChange('10-days')}
          />
          <label htmlFor="10-days">
            10 days delivery - {product.free_shipping ? 'Free' : '10.000 Gs'}
          </label>
        </div>

        <div className="option">
          <input
            type="radio"
            id="1-week"
            name="shipping"
            value="1-week"
            onChange={() => handleShippingChange('1-week')}
          />
          <label htmlFor="1-week">1 week delivery - 20.000 Gs</label>
        </div>

        <div className="option">
          <input
            type="radio"
            id="2-3-days"
            name="shipping"
            value="2-3-days"
            onChange={() => handleShippingChange('2-3-days')}
          />
          <label htmlFor="2-3-days">2-3 days delivery - 25.000 Gs</label>
        </div>
      </form>

      <p>Shipping Cost: {shippingCost === 0 ? 'Free' : `${shippingCost} Gs`}</p>
    </div>
  );
};

export default ShippingOptions;
