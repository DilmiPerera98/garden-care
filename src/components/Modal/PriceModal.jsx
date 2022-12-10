import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Modal,
  Rating,
  Typography,
} from "@mui/material";
import { FaRegWindowClose, FaShoppingBag } from "react-icons/fa";
import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../../store";
import Loading from "../Loading";
import Message from "../Message";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_Request":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function PriceModal({ open, setOpen, slug }) {
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_Request" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }

      //setProducts(result.data);
    };
    fetchData();
  }, [slug]);

  //closeProduct modal
  const handleClose = () => {
    setOpen(false);
  };

  //handle add to bag

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { bag } = state;

  /* console.log(bag); */
  const addtoBagHandler = async () => {
    handleClose();
    //check whether product exist
    const existItem = bag.bagItems.find((x) => x._id === product._id);

    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      toast.success("Successfully sign In");
      return;
    }

    ctxDispatch({
      type: "BAG_ADD_ITEM",
      payload: { ...product, quantity },
    });
  };

  return loading ? (
    <Loading />
  ) : error ? (
    <Message variant="error">{error}</Message>
  ) : (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <IconButton onClick={handleClose}>
            <FaRegWindowClose />
          </IconButton>
        </Box>

        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <CardMedia
            component="img"
            image={product.img}
            alt="green iguana"
            sx={{ width: "16rem", height: "16rem" }}
          />
          <Box>
            <Typography gutterBottom variant="h5" component="div">
              Rs. {product.price}. 00
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {product.productName}
            </Typography>

            <Box sx={{ mb: 1, mt: 1 }}>
              {product.countInStock > 0 ? (
                <Chip label="Available" color="success" size="small" />
              ) : (
                <Chip label="Unavailable" color="error" size="small" />
              )}
            </Box>

            <Rating
              name="half-rating"
              defaultValue={product.rating}
              precision={0.5}
            />
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
              disabled={product.countInStock === 0}
              onClick={addtoBagHandler}
            >
              {product.countInStock === 0 ? "Out of Stock" : "Add To Bag"}
            </Button>
          </Box>
        </Box>
      </Card>
    </Modal>
  );
}

export default PriceModal;
