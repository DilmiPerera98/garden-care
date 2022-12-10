import Navbar from "./components/Nav/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Shop from "./pages/Shop";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/admin/Dashboard";
import Product from "./pages/admin/Product";
import Order from "./pages/admin/Order";
import AdminArticle from "./pages/admin/AdminArticle";
import Report from "./pages/admin/Report";
import Customer from "./pages/admin/Customer";
import ReadArticle from "./pages/ReadArticle";
import Checkout from "./pages/Checkout";
import OrderProducts from "./pages/Order";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderHistory from "./pages/OrderHistory";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import AdminRoute from "./components/Routes/AdminRoute";

function App() {
  return (
    <div className="App">
      <ToastContainer position="bottom-center" limit={1} />
      <Routes>
        <Route path="" element={<Navbar />}>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/article" element={<Article />} />
          <Route path="/readArticle" element={<ReadArticle />} />
          {/* <Route path="guidence/" element={<Guidence />} /> */}
          <Route path="/shop" element={<Shop />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orderhistory"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ------------------------------admin------------------------------- */}
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/article"
          element={
            <AdminRoute>
              <AdminArticle />
            </AdminRoute>
          }
        />
        <Route
          path="/product"
          element={
            <AdminRoute>
              <Product />
            </AdminRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <AdminRoute>
              <Customer />
            </AdminRoute>
          }
        />
        <Route
          path="/report"
          element={
            <AdminRoute>
              <Report />
            </AdminRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <AdminRoute>
              <Order />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
