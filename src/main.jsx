import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchContext from "./Context/SearchContext";
import ProductProvider from "./Context/ProductContext";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <SearchContext>
    <ProductProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProductProvider>
  </SearchContext>
);
