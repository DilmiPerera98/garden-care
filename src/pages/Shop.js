import Product from "../components/cards/Product";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Grid,
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

export default function Shop() {
  const [searchQuery, setSearchQueary] = useState("");
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
      //setProducts(result.data);
    };
    fetchData();
  }, [category, error, order, page, price, query]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterPrice = filter.price || price;
    const filterOrder = filter.order || order;
    return `/shop?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&order=${filterOrder}&page=${filterPage}`;
  };

  //dropdown handle
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log("anchoEl" + anchorEl);

  const [anchorE2, setAnchorE2] = useState(null);
  const openPrice = Boolean(anchorE2);
  const handleClickPrice = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleClosePrice = () => {
    setAnchorE2(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/shop/?query=${query}` : "/shop");
  };

  return (
    <>
      <Box sx={{ display: "flex", p: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            flexGrow: 0,
          }}
        >
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            color="inherit"
          >
            <Typography>
              <b>
                Categories
                <FaCaretDown />
              </b>
            </Typography>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Link className="nav-link" to={getFilterUrl({ category: "all" })}>
              <MenuItem onClick={handleClose} sx={{ width: "100px" }}>
                Any
              </MenuItem>
            </Link>
            {categories.map((c) => (
              <Link
                key={c}
                to={getFilterUrl({ category: c })}
                className="nav-link"
              >
                <MenuItem onClick={handleClose} sx={{ width: "100px" }}>
                  {c}
                </MenuItem>
              </Link>
            ))}
          </Menu>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            flexGrow: 1,
          }}
        >
          <Button
            id="basic-button"
            aria-controls={openPrice ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openPrice ? "true" : undefined}
            onClick={handleClickPrice}
            color="inherit"
          >
            <Typography>
              <b>
                Sort Products <FaCaretDown />
              </b>
            </Typography>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorE2}
            open={openPrice}
            onClose={handleClosePrice}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            value={order}
          >
            <Link className="nav-link" to={getFilterUrl({ order: "newest" })}>
              <MenuItem onClick={handleClosePrice}>New Itesms</MenuItem>
            </Link>
            <Link className="nav-link" to={getFilterUrl({ order: "lowest" })}>
              <MenuItem onClick={handleClosePrice}>Price: Low to High</MenuItem>
            </Link>
            <Link className="nav-link" to={getFilterUrl({ order: "highest" })}>
              <MenuItem onClick={handleClosePrice}>Price: High to Low</MenuItem>
            </Link>
          </Menu>
        </Box>

        <form onSubmit={submitHandler}>
          <TextField
            type="text"
            name="q"
            id="q"
            placeholder="Search Product"
            size="small"
            value={searchQuery}
            sx={{ display: "flex", justifyContent: "end" }}
            onChange={(e) => setSearchQueary(e.target.value)}
            InputProps={{
              endAdornment: (
                <Link
                  className="nav-link"
                  to={getFilterUrl({ query: searchQuery })}
                >
                  <Button type="submit">
                    <FaSearch color="black" />
                  </Button>
                </Link>
              ),
            }}
          />
        </form>
        <Link className="nav-link" to={"/shop"}>
          <Button size="large" onClick={() => setSearchQueary("")}>
            <FaSyncAlt color="black" />
          </Button>
        </Link>
      </Box>

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
      <Grid
        container
        spacing={1}
        sx={{ display: "flex", p: 2, mt: 3, justifyContent: "center" }}
      >
        {[...Array(pages).keys()].map((x) => (
          <Link key={x + 1} className="mx-1" to={getFilterUrl({ page: x + 1 })}>
            <Button
              className={Number(page) === x + 1 ? "text-bold" : ""}
              variant="light"
            >
              {x + 1}
            </Button>
          </Link>
        ))}
      </Grid>
    </>
  );
}
