import React, { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";
import Loader from "../loader/loader";
import axios from "axios";
import "./ProductCard.css";

const ProductGallery = () => {
    const [cart, setCart] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate=useNavigate()

    useEffect(() => {
        // Make GET request to fetch data
        axios
            .get("http://localhost:5000/api/v1/getAll")
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);
    console.log(data.getproduct)
    if (loading) return <div><Loader/></div>;
    if (error) return <div>Error: {error}</div>;

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="product-gallery-container">
      <h2 className="gallery-title">Featured Products</h2>
      <div className="product-grid">
        {data.getproduct.map((product) => (
          <div key={product._id} className="product-card" onClick={() => navigate(`/productdetail/${product._id}`)}>
            <img src="https://media.istockphoto.com/id/2151129875/photo/casual-teens-group-portrait.webp?a=1&b=1&s=612x612&w=0&k=20&c=ynpyawIt9o6SDNEv3xmg1Fb6Cc4N1ypJAzxZKPxsB5k=" alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price}</p>
            <p className="product-colors">{product.description}</p>
            <button className="add-to-cart" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
