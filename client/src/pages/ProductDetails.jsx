import "../pages-styles/ProductDetails.css"

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; //Para obtener datos de la url
import axios from "axios";
import OrderForm from "../components/OrderForm";

export function ProductDetails() {
  const { category_slug, product_slug } = useParams(); // Get slugs from the URL
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetchProduct();
  }, [category_slug, product_slug]); // Refetch if the slugs change

  // Fetch the product data from your Django API using the slugs
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/v1/store/products/${category_slug}/${product_slug}/`);
      setProduct(res.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
        <div className="left">
            <img src={product.image} alt={product.name} />
        </div>

        <div className="right">
            { /*<span className="category">
                {product.category.name}
            </span> */}
            <h2>
                {product.name}
            </h2>
            <span className="price">
                {product.price} Gs.
            </span>
            <OrderForm product={product} /> 
            <button className="add-cart-btn">
                Agregar al carrito
            </button>
            <span>
                Detalles del producto
            </span>
            <p>
                {product.description}
            </p>
        </div>
    </div>
  );
}

