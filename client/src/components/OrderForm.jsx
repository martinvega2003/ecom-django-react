import React, { useState } from "react";
import "../components-styles/OrderForm.css"

function OrderForm({ product }) {
  // Set initial states for quantity and size
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Quantity: ${quantity}`);
    console.log(`Size: ${size}`);
    // You can process form data here (send it to the backend, etc.)
  };

  return (
    <form onSubmit={e => handleSubmit(e)} className="order-form">
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
                {["S", "M", "L", "XL", "XXL"].map((option) => (
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
    </form>
  );
}

export default OrderForm;
