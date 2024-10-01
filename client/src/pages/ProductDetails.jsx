import "../pages-styles/ProductDetails.css"

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; //Para obtener datos de la url
import axios from "axios";
import OrderForm from "../components/OrderForm";
import { RelatedProducts } from "../components/RelatedProducts";

export function ProductDetails() {
  const { category_slug, product_slug } = useParams(); // Get slugs from the URL
  const [product, setProduct] = useState({});
  const [selectedView, setSelectedView] = useState(0)
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    fetchProduct();
    fetchRelatedProducts();
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

  const fetchRelatedProducts = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/v1/store/categories/${category_slug}/`);    
      setRelatedProducts(res.data.products.filter(item => item.id !== product.id));
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  const addToCart = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/store/cart/add/', {
            product_id: product.id,
        });
        alert(response.data.message);
    } catch (error) {
        console.error("Error adding to cart:", error);
        alert("Could not add to cart.");
    }
  };

  return (
    <>
      <div className="section product-details">
          <div className="left">
              <img src={product.image} alt={product.name} />
          </div>

          <div className="right">
              <span className="category">
                {category_slug}
              </span>
              <h2>
                  {product.name}
              </h2>
              <span className="price">
                  {product.price} Gs.
              </span>
              <OrderForm product={product} /> 
              <button className="add-cart-btn" onClick={addToCart}>
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

      <div className='product-info-cont'>
        <div className="btns-cont">
          <button className={selectedView === 0 ? "active" : ""} onClick={() => setSelectedView(0)}>
            Mas detalles
          </button>
          <button className={selectedView === 1 ? "active" : ""} onClick={() => setSelectedView(1)}>
            Envios
          </button>
          <button className={selectedView === 2 ? "active" : ""} onClick={() => setSelectedView(2)}>
            Relacionados
          </button>
        </div>
        <div className="form-cont">
          {
            selectedView === 0 ? (
              <div className="details-long">
                Details long
              </div>
            ) : selectedView === 1 ? (
              <div className="shipping">
                Shipping
              </div>
            ) : <div className="related">
                  <RelatedProducts relatedProducts={relatedProducts} />
                </div>
          } 
        </div>
      </div>
      
    </>
  );
}

