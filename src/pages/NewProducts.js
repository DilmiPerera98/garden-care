import Product from "../components/cards/Product";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useReducer } from "react";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { Box } from "@mui/system";
import { FaSearch, FaCaretDown, FaSyncAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../utils";

//fetch products for the home page

//reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_Request":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function NewProducts() {
  //handle filter
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const order = sp.get("order" || "newest");
  const page = sp.get("page") || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const navigate = useNavigate();

  //search the product
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&order=${order}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchData();
  }, [category, error, order, page, price, query]);

  //Filter the product based on catergory
  // const [categories, setCategories] = useState([]);
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const { data } = await axios.get(`/api/products/categories`);
  //       setCategories(data);
  //     } catch (err) {
  //       toast.error(getError(err));
  //     }
  //   };
  //   fetchCategories();
  // }, [dispatch]);

  //filter the product
  // const getFilterUrl = (filter) => {
  //   const filterPage = filter.page || page;
  //   const filterCategory = filter.category || category;
  //   const filterQuery = filter.query || query;
  //   const filterPrice = filter.price || price;
  //   const filterOrder = filter.order || order;
  //   return `/shop?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&order=${filterOrder}&page=${filterPage}`;
  // };

  //dropdown handle
  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // console.log("anchoEl" + anchorEl);

  // const [anchorE2, setAnchorE2] = useState(null);
  // const openPrice = Boolean(anchorE2);
  // const handleClickPrice = (event) => {
  //   setAnchorE2(event.currentTarget);
  // };
  // const handleClosePrice = () => {
  //   setAnchorE2(null);
  // };

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   navigate(query ? `/shop/?query=${query}` : "/shop");
  // };

  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{ display: "flex", p: 2, justifyContent: "center" }}
      >
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="error">{error}</Message>
        ) : (
          <>
            {products.length === 0 && (
              <Message variant="error">No Product Found</Message>
            )}
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </>
        )}
      </Grid>
    </>
  );
}
