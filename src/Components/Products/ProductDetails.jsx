import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import { Button } from "react-bootstrap";
import { ProductContext } from '../../Context/ProductContext'

const ProductDetails = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const {addToCart} = useContext(ProductContext);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setProduct(data);
        })
        .catch((error) => console.log(error))
    },[id])
    if (!product) return null;
  return (
    <>
    <div className="container my-5">
      <Link to="/" className="btn btn-outline-secondary mb-3">← Back to Products</Link>
      <div className="row align-items-center">
        <div className="col-md-5 text-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="img-fluid"
          />
        </div>
        <div className="col-md-7">
          <h2>{product.title}</h2>
          <p className="text-muted">{product.category}</p>
          <p>{product.description}</p>
          <h4 className="text-success">₹ {product.price}</h4>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Rating:</strong> ⭐ {product.rating}</p>
          <div className="mt-3">
            <Button variant="primary" onClick={() => addToCart(product)}>Add to Bag</Button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProductDetails