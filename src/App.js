import Navbar from "./components/Nav/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Contact from "./pages/ReadArticle";
import Guidence from "./pages/Guidence";
import Shop from "./pages/Shop";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/admin/Dashboard";
import Product from "./pages/admin/Product";
import Category from "./pages/admin/Category";
import Order from "./pages/admin/Order";
import Inventory from "./pages/admin/Inventory";
import Report from "./pages/admin/Report";
import Customer from "./pages/admin/Customer";
import ReadArticle from "./pages/ReadArticle";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/article" element={<Article />} />
          <Route path="/readArticle" element={<ReadArticle />} />
          <Route path="guidence/" element={<Guidence />} />
          <Route path="/shop" element={<Shop />} />
        </Route>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product" element={<Product />} />
        <Route path="/category" element={<Category />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/report" element={<Report />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
