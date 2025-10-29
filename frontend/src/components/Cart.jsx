import React from "react";

const CartItem = ({ item, onRemove, onUpdate }) => (
  <div className="cart-item">
    <div className="cart-item-info">
      <img src={item.productId.image} alt={item.productId.name} />
      <div>
        <h4>{item.productId.name}</h4>
        <div className="cart-item-controls">
          <div className="cart-item-qty-controls">
            <button
              className="btn-qty"
              onClick={() => onUpdate(item._id, "decrement")}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              className="btn-qty"
              onClick={() => onUpdate(item._id, "increment")}
            >
              +
            </button>
          </div>
          <p>
            <strong>
              ${(item.quantity * item.productId.price).toFixed(2)}
            </strong>
          </p>
        </div>
      </div>
    </div>
    <div className="cart-item-actions">
      <button className="btn btn-danger" onClick={() => onRemove(item._id)}>
        &times;
      </button>
    </div>
  </div>
);

const Cart = ({
  cartItems,
  total,
  onRemoveItem,
  onCheckout,
  onUpdateQuantity,
}) => {
  const hasItems = cartItems.length > 0;

  return (
    <aside className="cart">
      <h2>Your Cart</h2>
      {hasItems ? (
        <>
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onRemove={onRemoveItem}
                onUpdate={onUpdateQuantity}
              />
            ))}
          </div>
          <div className="cart-total">
            <span>Total</span>
            <span>${parseFloat(total).toFixed(2)}</span>
          </div>
          <button
            className="btn btn-secondary"
            style={{ marginTop: "1.5rem" }}
            onClick={onCheckout}
          >
            Checkout
          </button>
        </>
      ) : (
        <p className="cart-empty-message">Your cart is empty.</p>
      )}
    </aside>
  );
};

export default Cart;
