import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Pagination from "react-bootstrap/Pagination"; // 🟢 import Bootstrap pagination
import { SearchContexts } from "../../Context/SearchContext";
import { ProductContext } from "../../Context/ProductContext";
import { Link } from "react-router";

const Products = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // 🟢 Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Number of products per page

  const { searchTerm } = useContext(SearchContexts);
  const { addToCart, addToWishlist } = useContext(ProductContext);

  // Fetch products from API
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=48")
      .then((response) => response.json())
      .then((data) => {
        setData(data.products);
        setFilteredData(data.products);

        // Extract unique categories
        const uniqueCategory = [
          ...new Set(data.products.map((item) => item.category)),
        ];
        setCategories(uniqueCategory);
      })
      .catch((error) => {
        console.log("Error in fetching product", error);
      });
  }, []);

  // Category filter
  const handleCatChange = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected);

    if (selected === "all") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => item.category === selected);
      setFilteredData(filtered);
    }

    // 🟢 Reset to page 1 when category changes
    setCurrentPage(1);
  };

  // Search + Category filter
  useEffect(() => {
    let filtered = data;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // if (searchTerm) {
    //   filtered = filtered.filter((item) =>
    //     item.title.toLowerCase().includes(searchTerm.toLowerCase())
    //   );
    // }

    setFilteredData(filtered);
    setCurrentPage(1); // 🟢 reset pagination on search
  }, [searchTerm, selectedCategory, data]);

  // 🧮 Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredData.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <div className="select">
        <select onChange={handleCatChange} value={selectedCategory}>
          <option value="all">All Categories</option>
          {categories.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="card-grid">
        {currentProducts.map((item, i) => (
          
            <Card key={i}>
              <Link to={`/product/${item.id}`}><Card.Img variant="top" src={item.thumbnail} /></Link>
              <Card.Body>
               <Link to={`/product/${item.id}`}> <Card.Title>{item.title}</Card.Title></Link>
                <Card.Text style={{ fontSize: "14px", color: "#666" }}>
                  {item.description.substring(0, 80)}...
                </Card.Text>
                <Card.Text>₹ {item.price}</Card.Text>
                <div className="buttonWraper">
                  <Button variant="primary" onClick={() => addToCart(item)}>
                    Add to Cart
                  </Button>
                  <Button
                    variant="primary"
                    className="wish"
                    onClick={() => addToWishlist(item)}
                  >
                    Add to Wishlist
                  </Button>
                </div>
              </Card.Body>
            </Card>          
        ))}
      </div>

      <div className="d-flex justify-content-center my-4">
        <Pagination>
          <Pagination.Prev
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() =>
              currentPage < totalPages && paginate(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </>
  );
};

export default Products;
