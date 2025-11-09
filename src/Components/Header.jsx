import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaMoon, FaSun, FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import Logo from "../Image/multistore.png";
import { SearchContexts } from "../Context/SearchContext";
import { ProductContext } from "../Context/ProductContext";
import { Link } from "react-router";

function Header() {
  const { setSearchTerm } = useContext(SearchContexts);
  const { cart, wishlist } = useContext(ProductContext);
  const [theme, setTheme] = useState(localStorage.getItem("Theme") || "Light");

  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // fetch Products
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=48")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.log(err));
  }, []);

  // Theme
  useEffect(() => {
    if (theme === "Dark") document.body.classList.add("dark");
    else document.body.classList.remove("dark");
    localStorage.setItem("Theme", theme);
  }, [theme]);

  const handleTheme = () => setTheme((prev) => (prev === "Light" ? "Dark" : "Light"));

  // Search logic
  const handleSearchHandle = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSearchTerm(value);

    if (value.trim() === "") {
      setShowSuggestions(false);
      setSuggestion([]);
      return;
    }

    const filteredProd = products.filter(
      (itm) =>
        itm.title.toLowerCase().includes(value.toLowerCase()) ||
        itm.category.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestion(filteredProd.slice(0, 5));
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (productTitle) => {
    setQuery(productTitle);
    setSearchTerm(productTitle);
    setShowSuggestions(false);
  };

  // Login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsLoggedIn(true);
        localStorage.setItem("token", data.token); // if your API returns a token
        alert("Login successful!");
      } else {
        setLoginError(data.message || "Login failed");
      }
    } catch (err) {
      setLoginError("Server error. Try again later.");
      console.error(err);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Link to="/">
          <img src={Logo} alt="Logo" style={{ height: "50px" }} />
        </Link>        

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>

          <div className="meta me-3">
            <div className="d-flex align-items-center me-3 themeIcons" onClick={handleTheme}>
          {theme === "Dark" ? (
            <FaMoon style={{ cursor: "pointer", fontSize: "1.3rem", marginRight: "10px" }} />
          ) : (
            <FaSun style={{ cursor: "pointer", fontSize: "1.3rem" }} />
          )}
        </div>
            <Link to="/cart" className="cart position-relative me-2">
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

            <Link to="/wishlist" className="wishlists position-relative me-3">
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

          {/* Search + Login */}
          <div className="d-flex align-items-center position-relative" style={{ width: "250px" }}>
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
                    <Link to={`/product/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
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
                      <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* Login Dropdown */}
            {!isLoggedIn ? (
              <Dropdown className="ms-2">
                <Dropdown.Toggle
                  variant="outline-primary"
                  id="dropdown-login"
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <FaUser />
                  Login
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ padding: "15px", minWidth: "250px" }}>
                  <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-2" controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>

                    {loginError && <p className="text-danger">{loginError}</p>}

                    <Button variant="primary" type="submit" className="w-100">
                      Login
                    </Button>
                  </Form>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button variant="success" className="ms-2" style={{whiteSpace: "nowrap"}}>
                Logged In
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
