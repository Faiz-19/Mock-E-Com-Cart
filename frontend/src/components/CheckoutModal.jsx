import React, { useState } from 'react';

const CheckoutModal = ({ onClose, onSubmitCheckout, receipt }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      onSubmitCheckout({ name, email });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        
        {receipt ? (
          // --- Receipt View ---
          <div className="receipt-view">
            <h3>Thank You For Your Order!</h3>
            <div className="receipt-details">
              <p><strong>Receipt ID:</strong> {receipt.receiptId}</p>
              <p><strong>Total Paid:</strong> ${receipt.totalAmount}</p>
              <p><strong>Items:</strong> {receipt.itemsPurchased}</p>
              <p><strong>Date:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
            </div>
            <button 
              className="btn btn-primary" 
              style={{marginTop: '2rem'}} 
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          // --- Checkout Form View ---
          <div className="form-view">
            <h3>Checkout</h3>
            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-secondary"
                disabled={!name || !email}
              >
                Confirm Purchase
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;