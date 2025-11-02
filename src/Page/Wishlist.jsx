import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { ProductContext } from "../Context/ProductContext";
import Empty from "../Image/EmptyImage.jpg";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } =
    useContext(ProductContext);
  const totalPrice = wishlist.reduce((acc, item) => acc + (item.price || 0), 0);
  return (
    <>
      {wishlist.length === 0 ? (
        <div className="empty">
          <img src={Empty} alt="Empty Cart" />
          <p>Your Wishlist is empty</p>
        </div>
      ) : (
        <div className="cartWrap">
          <div className="topWrap">
            <h4>Total items in wishlist({wishlist.length})</h4>
          </div>
          <div className="card-grid">
            {wishlist.map((item, i) => (
              <Card key={i}>
                <Card.Img variant="top" src={item.thumbnail} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text style={{ fontSize: "14px", color: "#666" }}>
                    {item.description.substring(0, 80)}...
                  </Card.Text>
                  <Card.Text>₹ {item.price}</Card.Text>
                  <div className="buttonWraper">
                    <Button variant="primary" onClick={() => addToCart(item)}>
                      Add to Cart
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Wishlist;
