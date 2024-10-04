import React, { useEffect, useState } from "react";
import "../components-styles/OrderForm.css"
import PaymentPopup from "./PaymentPopup";

function OrderForm({ product, selectedOption, shippingCost }) {
  // Set initial states for quantity and size
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0)

  useEffect(() => {
    if (product.isDiscounted) {
      setFinalPrice((product.discountPrice * quantity) + shippingCost)
    } else {
      setFinalPrice((product.price * quantity) + shippingCost)
    }
  }, [quantity, product.price, product.discountPrice, shippingCost])

  const handleBuyClick = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  return (
    <form onSubmit={handleBuyClick} className="order-form">
      {/* Quantity Field */}
      <div>
        <label htmlFor="quantity">Cantidad: </label>
        <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max={product.inventory}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
        />

        {/* Size Field (Toggle List) */}
        <fieldset>
            <legend>Tamaño:</legend>
            <div className="size-toggle-list">
                {product.size.map((option) => (
                    <button
                        type="button"
                        key={option}
                        className={size === option ? "size-toggle active" : "size-toggle"}
                        onClick={() => setSize(option)}
                    >
                        {option}
                    </button>    
                
                ))}
            </div>        
        </fieldset> 
    </div>

      {/* Submit Button */}
      <button type="submit" className="buy-btn">Comprar Ahora</button>

      {showPopup && (
        <PaymentPopup
          finalPrice={finalPrice}
          setFinalPrice={setFinalPrice}
          product={product}
          selectedOption={selectedOption}
          quantity={quantity}
          onClose={() => setShowPopup(false)}
        />
      )}
    </form>
  );
}

export default OrderForm;
