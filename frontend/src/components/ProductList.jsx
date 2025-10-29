import React from 'react';

const Product = ({ product, onAddToCart }) => (
  <div className="product-card">
    <img src={product.image} alt={product.name} />
    <div className="product-card-info">
      <h3>{product.name}</h3>
      <p>${parseFloat(product.price).toFixed(2)}</p>
      <button 
        className="btn btn-primary" 
        onClick={() => onAddToCart(product._id)}
      >
        Add to Cart
      </button>
    </div>
  </div>
);

const ProductList = ({ products, onAddToCart }) => {
  return (
    <section className="product-list">
      <h2>Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <Product 
            key={product._id} 
            product={product} 
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductList;