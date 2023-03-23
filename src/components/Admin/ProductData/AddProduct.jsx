import {
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../../../store";
import { getError } from "../../../utils";
import Loading from "../../Loading";
import Message from "../../Message";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return {
        ...state,
        loadingCreate: false,
      };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };
    default:
      return state;
  }
};

function AddProduct({ open, setOpen, editId, isUpdate, editProduct }) {
  function handleClose() {
    setOpen(false);
    setName("");
    setSlug("");
    setPrice("");
    setImg("");
    setCategory("");
    setCountInStock("");
  }

  const navigate = useNavigate();
  /*  const params = useParams(); // /product/:id
  const { id: productId } = params; */

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  //const [description, setDescription] = useState("");

  const createHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(
        "/api/products",
        {
          name,
          slug,
          price,
          img,
          category,
          countInStock,
          //description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({ type: "CREATE_SUCCESS" });
      toast.success("product created successfully");
      handleClose();
    } catch (err) {
      toast.error(getError(error));
      dispatch({
        type: "CREATE_FAIL",
      });
    }
  };

  /* useEffect(() => {
    if (isUpdate) {
      const fetchData = async () => {
        try {
          dispatch({ type: "FETCH_REQUEST" });
          const { data } = await axios.get(`/api/products/${editId}`);
          setName(data.productName);
          setSlug(data.slug);
          setPrice(data.price);
          setImg(data.img);
          setCategory(data.category);
          setCountInStock(data.countInStock);
          //setDescription(data.description);
          dispatch({ type: "FETCH_SUCCESS" });
        } catch (err) {
          dispatch({
            type: "FETCH_FAIL",
            payload: getError(err),
          });
        }
      };
      fetchData();
    }
  }, [editId, setOpen, isUpdate]); */

  useEffect(() => {
    setName(isUpdate ? editProduct.productName : name);
    setSlug(isUpdate ? editProduct.slug : slug);
    setPrice(isUpdate ? editProduct.price : price);
    setImg(isUpdate ? editProduct.img : img);
    setCategory(isUpdate ? editProduct.category : category);
    setCountInStock(isUpdate ? editProduct.countInStock : countInStock);
  }, [editProduct, setOpen, editId, isUpdate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `/api/products/${editId}`,
        {
          _id: editId,
          name,
          slug,
          price,
          img,
          category,
          countInStock,
          //description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      toast.success("Product updated successfully");
      handleClose();
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };

  return (
    <Modal open={open}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <Card sx={{ width: "40vw" }}>
          <CardContent>
            <Typography
              pl={1}
              pt={1}
              pb={2}
              variant="h6"
              sx={{ fontWeight: 500 }}
              display="flex"
              justifyContent="center"
            >
              {isUpdate ? "Update Product" : "Add Product"}
            </Typography>

            {/* {loading ? (
              <Loading></Loading>
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : ( */}
            <form onSubmit={isUpdate ? submitHandler : createHandler}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  m: 1,
                }}
              >
                <Typography pl={1} pt={1} sx={{ width: "20%" }}>
                  Product Id
                </Typography>
                <TextField
                  sx={{ paddingLeft: "10px", mt: "0.5rem", width: "75%" }}
                  placeholder="Product Id"
                  size="small"
                  value={isUpdate ? editId : ""}
                  disabled
                ></TextField>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  m: 1,
                }}
              >
                <Typography pl={1} pt={1} sx={{ width: "20%" }}>
                  Product Name
                </Typography>
                <TextField
                  sx={{ paddingLeft: "10px", mt: "0.5rem", width: "75%" }}
                  placeholder="Product Name"
                  size="small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></TextField>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  m: 1,
                }}
              >
                <Typography pl={1} pt={1} sx={{ width: "20%" }}>
                  Product Image
                </Typography>
                <TextField
                  sx={{ paddingLeft: "10px", mt: "0.5rem", width: "75%" }}
                  placeholder="Product Image"
                  size="small"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                ></TextField>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  m: 1,
                }}
              >
                <Typography pl={1} pt={1} sx={{ width: "20%" }}>
                  Product Slug
                </Typography>
                <TextField
                  sx={{ paddingLeft: "10px", mt: "0.5rem", width: "75%" }}
                  placeholder="Product Slug"
                  size="small"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                ></TextField>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  m: 1,
                }}
              >
                <Typography pl={1} pt={1} sx={{ width: "20%" }}>
                  Category
                </Typography>
                <TextField
                  sx={{ paddingLeft: "10px", mt: "0.5rem", width: "75%" }}
                  placeholder="Category"
                  size="small"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></TextField>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  m: 1,
                }}
              >
                <Typography pl={1} pt={1} sx={{ width: "20%" }}>
                  Price
                </Typography>
                <TextField
                  sx={{ paddingLeft: "10px", mt: "0.5rem", width: "75%" }}
                  placeholder="Price"
                  size="small"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></TextField>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  m: 1,
                }}
              >
                <Typography pl={1} pt={1} sx={{ width: "20%" }}>
                  Quantity
                </Typography>
                <TextField
                  sx={{ paddingLeft: "10px", mt: "0.5rem", width: "75%" }}
                  placeholder="Quantity"
                  size="small"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></TextField>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  m: 1,
                }}
              >
                <Typography pl={1} pt={1} sx={{ width: "20%" }}>
                  Description
                </Typography>
                <TextField
                  sx={{ paddingLeft: "10px", mt: "0.5rem", width: "75%" }}
                  placeholder="Description"
                  size="small"
                ></TextField>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  paddingRight: "27px",
                  paddingTop: "1rem",
                  marginTop: "0.2rem",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    ":hover": {
                      bgcolor: "#A0D5C2",
                      borderColor: "#A0D5C2",
                    },
                    color: "#24936B",
                    marginRight: "0.5rem",
                    mt: 3,
                    mb: 2,
                    borderColor: "#24936B",
                  }}
                  onClick={handleClose}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    ":hover": {
                      bgcolor: "#A0D5C2",
                    },
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#24936B",
                  }}
                  type="submit"
                >
                  Save
                </Button>
              </Box>
            </form>
            {/* )} */}
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
}

export default AddProduct;
