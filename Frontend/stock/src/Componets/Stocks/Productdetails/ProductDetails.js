import React, { useState } from "react";
import "./ProductDetails.css";

const product = {
  name: "Sample Product",
  price: "$99.99",
  description: "This is a great product with amazing features.",
  images: ["/image1.jpg", "/image2.jpg", "/image3.jpg"],
  reviews: [
    { id: 1, user: "Alice", rating: 5, comment: "Excellent product!" },
    { id: 2, user: "Bob", rating: 4, comment: "Very good, but could be cheaper." },
    { id: 3, user: "Charlie", rating: 3, comment: "Average, expected more." },
  ],
};

export default function ProductDetailPage() {
  const [filter, setFilter] = useState("all");
  const filteredReviews =
    filter === "all"
      ? product.reviews
      : product.reviews.filter((r) => r.rating.toString() === filter);

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
              <p className="review-user">{review.user}</p>
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