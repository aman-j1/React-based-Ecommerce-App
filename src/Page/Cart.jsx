import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { ProductContext } from "../Context/ProductContext";
import Empty from "../Image/EmptyImage.jpg";

const Cart = () => {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, } = useContext(ProductContext);
  const totalPrice = cart.reduce(
  (acc, item) => acc + ((item.price || 0) * (item.quantity || 1)),
  0
);
  return (
    <>
      {cart.length === 0 ? (
        <div className="empty">
        <img src={Empty} alt="Empty Cart"/>
        <p>Your cart is empty</p>
        </div>
      ) : (
        <div className="cartWrap">
          <div className="topWrap">
            <h4>Total items in Cart({cart.length})</h4>
            <p>
              Total Price:  <span>₹{totalPrice.toFixed(2)}</span>
            </p>
          </div>
          <div className="card-grid">
            {cart.map((item, i) => (
              <Card key={i}>
                <Card.Img variant="top" src={item.thumbnail} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text style={{ fontSize: "14px", color: "#666" }}>
                    {item.description.substring(0, 80)}...
                  </Card.Text>
                  <Card.Text>                  
                    <strong>₹ {item.price * item.quantity}</strong>
                  </Card.Text>
                  <div className="d-flex align-items-center mb-3">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </Button>
                    <Button variant="outline-secondary"
                    style={{ width: "60px"}}
                      size="sm" className="mx-3">{item.quantity}</Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </Button>
                  </div>
                  <div className="buttonWraper">
                    <Button variant="primary">Checkout</Button>
                    <Button
                      variant="danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
          <div className="removeAll">
            <Button variant="danger" onClick={() => clearCart()}>Clear Cart</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
