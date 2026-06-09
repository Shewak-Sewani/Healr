import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "./CartContext";
import "./CartPage.css";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
  });

  const handleRemove = (index) => {
    removeFromCart(index);
  };

  const total = cart.reduce((sum, d) => sum + d.price, 0);

  const handleOrder = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    clearCart();
    navigate("/");
  };

  return (
    <div className="cart-page-container">
      <div className="cart-content">
        <div className="cart-header">
          <h1>🛒 Your Cart</h1>
        </div>

        <div className="cart-main">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <p>Your cart is empty</p>
              <button
                className="continue-shopping-btn"
                onClick={() => navigate(-1)}
              >
                ← Start Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items-section">
                <div className="cart-items-list">
                  {cart.map((item, i) => (
                    <div key={i} className="cart-item">
                      <div className="item-info">
                        <div className="item-name">
                          {item.openfda?.brand_name?.[0]}
                        </div>
                        <div className="item-details">
                          <span className="quantity-badge">
                            Qty: {item.quantity}
                          </span>
                          <span className="price-badge">Rs. {item.price}</span>
                        </div>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemove(i)}
                        title="Remove item"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-total">
                  <h4>Total: Rs. {total}</h4>
                </div>
              </div>

              <form className="shipping-form" onSubmit={handleOrder}>
                <h5 className="shipping-header">📦 Shipping Address</h5>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Full Name"
                    value={formData.name}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Street Address"
                    value={formData.address}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="City"
                    value={formData.city}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Zip Code"
                    value={formData.zip}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, zip: e.target.value })
                    }
                  />
                </div>

                <button type="submit" className="place-order-btn">
                  Place Order
                </button>
              </form>

              <button
                className="continue-shopping-btn"
                onClick={() => navigate(-1)}
              >
                ← Continue Shopping
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
