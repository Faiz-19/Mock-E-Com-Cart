import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CheckoutModal from "./components/CheckoutModal";
import * as api from "./services/api";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkoutReceipt, setCheckoutReceipt] = useState(null);

  // Fetch initial data (products and cart)
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [productsRes, cartRes] = await Promise.all([
        api.getProducts(),
        api.getCart(),
      ]);
      setProducts(productsRes.data);
      setCart(cartRes.data);
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to refresh cart
  const refreshCart = async () => {
    try {
      const cartRes = await api.getCart();
      setCart(cartRes.data);
    } catch (err) {
      setError("Failed to update cart.");
      console.error(err);
    }
  };

  const handleAddToCart = async (productId) => {
    // For simplicity, we add 1 quantity.
    // A real app might have a quantity selector in ProductList.jsx
    try {
      await api.addToCart(productId, 1);
      await refreshCart(); // Refetch cart to show updated state
    } catch (err) {
      setError("Failed to add item to cart.");
      console.error(err);
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      await api.removeFromCart(itemId);
      await refreshCart(); // Refetch cart
    } catch (err) {
      setError("Failed to remove item from cart.");
      console.error(err);
    }
  };

  const handleUpdateQuantity = async (itemId, action) => {
    try {
      await api.updateCartQuantity(itemId, action);
      await refreshCart(); // Refetch cart to show updated state
    } catch (err) {
      setError("Failed to update item quantity.");
      console.error(err);
    }
  };

  const handleCheckout = async (customerDetails) => {
    try {
      const res = await api.checkout(cart.items);
      setCheckoutReceipt(res.data); // Set receipt to show in modal
      setCart({ items: [], total: 0 }); // Clear cart on frontend
    } catch (err) {
      setError("Checkout failed.");
      console.error(err);
      // Don't close modal, show error
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCheckoutReceipt(null); // Reset receipt on close
  };

  if (isLoading) {
    return <div className="app-container">Loading Vibe...</div>;
  }

  if (error) {
    return (
      <div className="app-container" style={{ color: "var(--color-error)" }}>
        {error}
      </div>
    );
  }

  return (
    <>
      <header>
        <h1>Vibe Commerce</h1>
      </header>
      <div className="app-container">
        <main>
          <ProductList products={products} onAddToCart={handleAddToCart} />
          <Cart
            cartItems={cart.items}
            total={cart.total}
            onRemoveItem={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            onCheckout={() => setIsModalOpen(true)}
          />
        </main>
      </div>

      {isModalOpen && (
        <CheckoutModal
          onClose={handleCloseModal}
          onSubmitCheckout={handleCheckout}
          receipt={checkoutReceipt}
        />
      )}
    </>
  );
}

export default App;
