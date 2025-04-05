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
import Orders from "./components/Orders.jsx";
import ChangePassword from "./components/changePassword.jsx";
import Admin from "./admin/AdminLanding.jsx";
import ManageProducts from "./admin/ManageProduct.jsx";
import EditProduct from "./admin/EditProduct.jsx";
import Manageorders from "./admin/ManageOrders.jsx";
import AddProduct from "./admin/AddProduct.jsx";
import { ToastContainer } from "react-toastify";
import ManageUsers from "./admin/ManageUsers.jsx";
import EditUser from "./admin/EditUser.jsx";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <ProductsProvider>
        <Router>
          <Routes>
            {/* user */}
            <Route path="/" element={<Login />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/products" element={<Landing />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/availability" element={<Availability />} />
            <Route path="/discount" element={<Discountd />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/new-collection" element={<Landing />} />
            {/* account */}
            <Route path="/account" element={<Profile />} />
            <Route path="/account/edit" element={<EditProfile />} />
            <Route path="/account/orders" element={<Orders />} />
            <Route
              path="/account/changepassword"
              element={<ChangePassword />}
            />
            {/* admin */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/products" element={<ManageProducts />} />
            <Route path="/admin/products/edit/:id" element={<EditProduct />} />
            <Route path="/admin/products/add" element={<AddProduct />} />
            <Route path="/create-product" element={<Landing />} />
            <Route path="admin/orders" element={<Manageorders />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/users/edit/:id" element={<EditUser />} />
          </Routes>
        </Router>
      </ProductsProvider>
    </>
  );
}

export default App;
