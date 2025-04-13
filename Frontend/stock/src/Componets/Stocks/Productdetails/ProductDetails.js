import React, { useEffect , useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../loader/loader";
import "./ProductDetails.css";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [filter, setFilter] = useState("all");
  const [reviews, setReviews] = useState();
  const [product, setProduct] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
      const fetchProduct = async () => {
            try {
              const res = await fetch(`http://localhost:5000/api/v1/getbyId/${id}`);
              const data = await res.json();

              const result=data.getproduct;
  
              setProduct(result);
              setReviews(result.reviews)
            } catch (error) {
              console.error("Error fetching product:", error);
            }
            finally {
              setLoading(false);
            }
          };
          fetchProduct();
           
        }, [id]);
 
        // const reviews= product.reviews===null ? []:product.reviews
        // console.log("reviews"+reviews)
        const filteredReviews = 
        filter === "all"
         ?reviews
         :reviews.filter((r) => r.rating.toString() === filter)    
  

      if (loading) return <div><Loader/></div>;
  return (
    <div className="product-container">
      <div className="product-card">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-price">{product.price}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-images">
          {product.images.map((src, index) => (
            <img key={index} src={src} alt="Product" className="product-image" />
          ))}
        </div>
        <div className="product-buttons">
          <button className="buy-button">Buy Now</button>
          <button className="cart-button">Add to Cart</button>
        </div>
      </div>
      <div className="reviews-section">
        <h2 className="reviews-title">User Reviews</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
          <option value="all">All</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
        </select>
        <div className="reviews-list">
          {filteredReviews.map((review) => (
            <div key={review.id} className="review-card">
              <p className="review-user">{review.name}</p>
              <div className="review-stars">
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}