import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Modal,
  Select,
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

//reducer function
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
  //handle Add product modal
  function handleClose() {
    setOpen(false);
    setName("");
    setSlug("");
    setPrice("");
    setImg("");
    setCategory("");
    setCountInStock("");
    setDiscount("");
  }

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  //initialize the variables
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [discount, setDiscount] = useState("");
  //const [description, setDescription] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  //show the exixsting data of the field
  useEffect(() => {
    setName(isUpdate ? editProduct.productName : name);
    setSlug(isUpdate ? editProduct.slug : slug);
    setPrice(isUpdate ? editProduct.price : price);
    setImg(isUpdate ? editProduct.img : img);
    setCategory(isUpdate ? editProduct.category : category);
    setDiscount(isUpdate ? editProduct.discount : discount);
    setCountInStock(isUpdate ? editProduct.countInStock : countInStock);
  }, [editProduct, setOpen, editId, isUpdate]);

  //handle create product function
  const createHandler = async (e) => {
    e.preventDefault();
    let isInValid = validateUserInput();

    if (!isInValid) {
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
            discount,
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
    }
  };

  //handle uddating the data
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
          discount,
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

  //----------error handling----
  const [productInforError, setProductInforError] = useState({
    nameErrorMsg: {
      message: "",
      isVisible: false,
    },
    imgErrorMsg: {
      message: "",
      isVisible: false,
    },
    slugErrorMsg: {
      message: "",
      isVisible: false,
    },
    priceErrorMsg: {
      message: "",
      isVisible: false,
    },
    countInStockErrorMsg: {
      message: "",
      isVisible: false,
    },
    discountErrorMsg: {
      message: "",
      isVisible: false,
    },
  });

  const validateUserInput = () => {
    let productInforErrors = productInforError;

    if (name.length === 0) {
      productInforErrors = {
        ...productInforErrors,
        nameErrorMsg: {
          message: "*",
          isVisible: true,
        },
      };
    } else {
      productInforErrors = {
        ...productInforErrors,
        nameErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (slug.length === 0) {
      productInforErrors = {
        ...productInforErrors,
        slugErrorMsg: {
          message: "*",
          isVisible: true,
        },
      };
    } else {
      productInforErrors = {
        ...productInforErrors,
        slugErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (price.length === 0) {
      productInforErrors = {
        ...productInforErrors,
        priceErrorMsg: {
          message: "*",
          isVisible: true,
        },
      };
    } else {
      productInforErrors = {
        ...productInforErrors,
        priceErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (img.length === 0) {
      productInforErrors = {
        ...productInforErrors,
        imgErrorMsg: {
          message: "*",
          isVisible: true,
        },
      };
    } else {
      productInforErrors = {
        ...productInforErrors,
        imgErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (countInStock.length === 0) {
      productInforErrors = {
        ...productInforErrors,
        countInStockErrorMsg: {
          message: "*",
          isVisible: true,
        },
      };
    } else {
      productInforErrors = {
        ...productInforErrors,
        countInStockErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (discount.length === 0) {
      productInforErrors = {
        ...productInforErrors,
        discountErrorMsg: {
          message: "*",
          isVisible: true,
        },
      };
    } else {
      productInforErrors = {
        ...productInforErrors,
        discountErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    // setting all error messages found
    setProductInforError(productInforErrors);
    return (
      productInforErrors.nameErrorMsg.isVisible ||
      productInforErrors.slugErrorMsg.isVisible ||
      productInforErrors.priceErrorMsg.isVisible ||
      productInforErrors.imgErrorMsg.isVisible ||
      productInforErrors.categoryErrorMsg.isVisible ||
      productInforErrors.countInStockErrorMsg.isVisible ||
      productInforErrors.discountErrorMsg.isVisible
    );
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
                  {...(productInforError.nameErrorMsg.isVisible && {
                    error: true,
                  })}
                  onChange={(e) => {
                    setName(e.target.value);
                    setProductInforError({
                      ...productInforError,
                      nameErrorMsg: { isVisible: false },
                    });
                  }}
                ></TextField>
                <Typography
                  color="error"
                  fontSize="1.2rem"
                  sx={{
                    visibility: `${
                      productInforError.nameErrorMsg.isVisible
                        ? "unset"
                        : "hidden"
                    }`,
                  }}
                >
                  {productInforError.nameErrorMsg.message}
                </Typography>
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
                  {...(productInforError.imgErrorMsg.isVisible && {
                    error: true,
                  })}
                  onChange={(e) => {
                    setImg(e.target.value);
                    setProductInforError({
                      ...productInforError,
                      imgErrorMsg: { isVisible: false },
                    });
                  }}
                ></TextField>
                <Typography
                  color="error"
                  fontSize="1.2rem"
                  sx={{
                    visibility: `${
                      productInforError.imgErrorMsg.isVisible
                        ? "unset"
                        : "hidden"
                    }`,
                  }}
                >
                  {productInforError.imgErrorMsg.message}
                </Typography>
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
                  {...(productInforError.slugErrorMsg.isVisible && {
                    error: true,
                  })}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setProductInforError({
                      ...productInforError,
                      slugErrorMsg: { isVisible: false },
                    });
                  }}
                ></TextField>
                <Typography
                  color="error"
                  fontSize="1.2rem"
                  sx={{
                    visibility: `${
                      productInforError.slugErrorMsg.isVisible
                        ? "unset"
                        : "hidden"
                    }`,
                  }}
                >
                  {productInforError.slugErrorMsg.message}
                </Typography>
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
                <Box sx={{ paddingLeft: "10px", width: "75%" }}>
                  <Select
                    defaultValue={"Plant"}
                    sx={{ mt: "0.5rem", width: "100%" }}
                    placeholder="Category"
                    size="small"
                    value={category}
                    onChange={handleChange}
                  >
                    <MenuItem value={"Plant"}>Plant</MenuItem>
                    <MenuItem value={"Pot"}>Pot</MenuItem>
                    <MenuItem value={"Fertilizer"}>Fertilizer</MenuItem>
                  </Select>
                </Box>
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
                  {...(productInforError.priceErrorMsg.isVisible && {
                    error: true,
                  })}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    setProductInforError({
                      ...productInforError,
                      priceErrorMsg: { isVisible: false },
                    });
                  }}
                ></TextField>
                <Typography
                  color="error"
                  fontSize="1.2rem"
                  sx={{
                    visibility: `${
                      productInforError.priceErrorMsg.isVisible
                        ? "unset"
                        : "hidden"
                    }`,
                  }}
                >
                  {productInforError.priceErrorMsg.message}
                </Typography>
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
                  {...(productInforError.countInStockErrorMsg.isVisible && {
                    error: true,
                  })}
                  onChange={(e) => {
                    setCountInStock(e.target.value);
                    setProductInforError({
                      ...productInforError,
                      countInStockErrorMsg: { isVisible: false },
                    });
                  }}
                ></TextField>
                <Typography
                  color="error"
                  fontSize="1.2rem"
                  sx={{
                    visibility: `${
                      productInforError.countInStockErrorMsg.isVisible
                        ? "unset"
                        : "hidden"
                    }`,
                  }}
                >
                  {productInforError.countInStockErrorMsg.message}
                </Typography>
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
                  Discount
                </Typography>
                <TextField
                  sx={{ paddingLeft: "10px", mt: "0.5rem", width: "75%" }}
                  placeholder="Discount"
                  size="small"
                  value={discount}
                  {...(productInforError.discountErrorMsg.isVisible && {
                    error: true,
                  })}
                  onChange={(e) => {
                    setDiscount(e.target.value);
                    setProductInforError({
                      ...productInforError,
                      discountErrorMsg: { isVisible: false },
                    });
                  }}
                ></TextField>
                <Typography
                  color="error"
                  fontSize="1.2rem"
                  sx={{
                    visibility: `${
                      productInforError.discountErrorMsg.isVisible
                        ? "unset"
                        : "hidden"
                    }`,
                  }}
                >
                  {productInforError.discountErrorMsg.message}
                </Typography>
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

              <Typography
                color="error"
                fontSize="0.8rem"
                sx={{
                  visibility: `${
                    productInforError.discountErrorMsg.isVisible ||
                    productInforError.nameErrorMsg.isVisible
                      ? "unset"
                      : "hidden"
                  }`,
                }}
              >
                * Mandotory fields can not be empty
              </Typography>

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
