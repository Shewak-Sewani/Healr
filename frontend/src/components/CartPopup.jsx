import React from "react";
import "./Cartpopup.css";

const CartPopup = ({ cart, onClose, onCheckout, onRemove }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-popup-overlay" onClick={onClose}>
      <div className="cart-popup" onClick={(e) => e.stopPropagation()}>
        <button className="btn-close" onClick={onClose}>
          ×
        </button>

        <h3>🛒 Your Cart</h3>

        {cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  <div className="item-details">
                    <strong>{item.openfda?.brand_name?.[0]}</strong>
                    <div>Qty: {item.quantity}</div>
                  </div>
                  <div className="item-actions">
                    <div className="item-price">Rs. {item.price}</div>
                    <button
                      className="remove-btn"
                      onClick={() => onRemove(index)}
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-total">
              <h4>Total: Rs. {total}</h4>
              <button className="checkout-btn" onClick={onCheckout}>
                ✅ Go to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPopup;
