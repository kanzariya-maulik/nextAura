import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductsProvider } from "./context/ProductContext";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Availability from "./components/Availability";
import Discountd from "./components/Discounted";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <ProductsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/products" element={<Landing />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/account/edit" element={<EditProfile />} />
          <Route path="/new-collection" element={<Landing />} />
          <Route path="/create-product" element={<Landing />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/discount" element={<Discountd />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="checkout" element={<Landing />} />
        </Routes>
      </Router>
    </ProductsProvider>
  );
}

export default App;
