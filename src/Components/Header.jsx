import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaMoon, FaSun, FaShoppingCart, FaHeart } from "react-icons/fa";
import Logo from "../Image/multistore.png";
import { SearchContexts } from "../Context/SearchContext";
import { ProductContext } from "../Context/ProductContext";
import { Link } from "react-router";

function Header() {
  const { setSearchTerm } = useContext(SearchContexts);
  const {cart, wishlist} = useContext(ProductContext)
  const [theme, setTheme] = useState(localStorage.getItem("Theme") || "Light");

  //State For Suggestion Logic;

  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  //fetch Products

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=48")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data.products)
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])


  //Theme
  useEffect(() => {
    if (theme === "Dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("Theme", theme);
  }, [theme]);

  const handleTheme = () => {
    setTheme((prev) => (prev === "Light" ? "Dark" : "Light"));
  };

  const handleSearchHandle = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSearchTerm(value);

    if(value.trim() === ""){
      setShowSuggestions(false);
      setSuggestion([]);
      return;
    }

    const filteredProd = products.filter((itm) => 
      itm.title.toLowerCase().includes(value.toLowerCase()) ||
      itm.category.toLowerCase().includes(value.toLowerCase())
    )

    setSuggestion(filteredProd.slice(0, 5));
    setShowSuggestions(true);
  }

  const handleSuggestionClick = (productTitle) => {
    setQuery(productTitle);
    setSearchTerm(productTitle);
    setShowSuggestions(false);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        <div className="meta" style={{display: "none"}}>
            <Link to="/cart" className="cart">
              <FaShoppingCart size={21} />
              {cart.length > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {cart.length}
                  </span>
                  )}
            </Link>
            <Link to="/wishlist" className="wishlists">
              <FaHeart size={21} />
              {wishlist.length > 0 && (
                <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {wishlist.length}
                  </span>
              )}
            </Link>
          </div>
        <div
            className="d-flex align-items-center me-3 themeIcons mobile_theme"
            onClick={handleTheme}
          >
            {theme === "Dark" ? (
              <FaMoon
                id="darkIcon"
                style={{
                  cursor: "pointer",
                  fontSize: "1.3rem",
                  marginRight: "10px",
                }}
              />
            ) : (
              <FaSun
                id="lightIcon"
                style={{ cursor: "pointer", fontSize: "1.3rem" }}
              />
            )}
          </div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <div className="meta">
            <Link to="/cart" className="cart">
              <FaShoppingCart size={21} />
              {cart.length > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {cart.length}
                  </span>
                  )}
            </Link>
            <Link to="/wishlist" className="wishlists">
              <FaHeart size={21} />
              {wishlist.length > 0 && (
                <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {wishlist.length}
                  </span>
              )}
            </Link>
          </div>
          <div
            className="d-flex align-items-center me-3 themeIcons"
            onClick={handleTheme}
          >
            {theme === "Dark" ? (
              <FaMoon
                id="darkIcon"
                style={{
                  cursor: "pointer",
                  fontSize: "1.3rem",
                  marginRight: "10px",
                }}
              />
            ) : (
              <FaSun
                id="lightIcon"
                style={{ cursor: "pointer", fontSize: "1.3rem" }}
              />
            )}
          </div>
          <div className="position-relative" style={{ width: "250px" }}>
            <Form.Control
              type="search"
              placeholder="Search product..."
              value={query}
              onChange={handleSearchHandle}
              onFocus={() => query && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />

            {showSuggestions && suggestion.length > 0 && (
              <ul
                className="list-group position-absolute w-100 shadow-sm bg-white"
                style={{
                  top: "40px",
                  zIndex: 1000,
                  maxHeight: "200px",
                  overflowY: "auto",
                  borderRadius: "6px",
                }}
              >
                {suggestion.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item list-group-item-action d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSuggestionClick(item.title)}
                  >
                    <Link to={`/product/${item.id}`} style={{textDecoration: "none"}}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "4px",
                        marginRight: "10px",
                      }}
                    />
                   
                      <span style={{ fontSize: "0.9rem", fontWeight: "500", color: "#000" }}>
                        {item.title}
                      </span>                      
                    
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
