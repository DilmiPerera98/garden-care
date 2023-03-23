import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { FaRegWindowClose, FaShoppingBag } from "react-icons/fa";
import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../../store";
import Loading from "../Loading";
import Message from "../Message";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getError } from "../../utils";
import PriceModal from "./PriceModal";
import { FixedSizeList } from "react-window";

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
    case "REFRESH_PRODUCT":
      return { ...state, product: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreateReview: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreateReview: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreateReview: false };
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

function ReviewModal({ reviewOpen, setreviewOpen, slug }) {
  console.log("Return" + reviewOpen);
  const [{ loading, error, product, loadingCreatedReview }, dispatch] =
    useReducer(reducer, {
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    console.log("called");
  };

  //closereview modal
  const handlereviewClose = () => {
    setreviewOpen(false);
    //handleOpen();
  };

  //handle add to bag

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  /* console.log(bag); */
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");

  //rating label
  let labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  const ratingChange = (event) => {
    setRate(event.target.value);
    console.log("rate is " + rate);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!comment || !rate) {
      toast.error("Please enter comment and rating");
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/products/${product._id}/reviews`,
        { rating: rate, comment, name: userInfo.name },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: "CREATE_SUCCESS" });
      toast.success("Review submitted successfully");
      product.reviewsList.unshift(data.review);
      product.reviews = data.reviews;
      product.rating = data.rating;
      dispatch({ type: "REFRESH_PRODUCT", payload: product });
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: "CREATE_FAIL" });
    }
  };

  return loading ? (
    <Loading />
  ) : error ? (
    <Message variant="error">{error}</Message>
  ) : (
    <Modal
      open={reviewOpen}
      onClose={handlereviewClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            p: "5px",
          }}
        >
          <CardMedia
            component="img"
            image={product.img}
            alt="green iguana"
            sx={{ width: "1.5rem", height: "1.5rem" }}
          />
          <Box
            sx={{
              minWidth: "200px",
            }}
          >
            <Typography color="text.secondary">
              {product.productName}
            </Typography>
          </Box>
        </Box>
        <Box
          color="text.secondary"
          sx={{ border: "1px solid", p: "5px", borderRadius: 2 }}
        >
          {userInfo ? (
            <form onSubmit={submitHandler}>
              <Typography variant="h6" textAlign={"center"}>
                Write a customer review
              </Typography>
              <Box
                sx={{
                  width: "200px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Rating
                  value={rate}
                  name="half-rating"
                  // sx={{ fontSize: "40px" }}
                  size="large"
                  precision={0.5}
                  onChange={ratingChange}
                  textAlign={"center"}
                />
                <Box sx={{ ml: 2 }}>
                  <Typography>{labels[rate]}</Typography>
                </Box>
              </Box>
              <Box>
                <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  rows={2}
                  sx={{ width: "24rem" }}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  textAlign={"center"}
                />
              </Box>
              <Box textAlign="center">
                <Button disabled={loadingCreatedReview} type="submit">
                  Submit
                </Button>
              </Box>
              {loadingCreatedReview && <Loading></Loading>}
            </form>
          ) : (
            <Message>
              Please <Link to="/signIn">Sign In to write a review</Link>
            </Message>
          )}
        </Box>

        <Box>
          {product.reviewsList.length === 0 && (
            <Message variant="error">There is no review</Message>
          )}
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "10rem",
            //maxWidth: 160,
            bgcolor: "background.paper",
            whiteSpace: "nowrap",
            overflowX: "scroll",
          }}
        >
          <List>
            {product.reviewsList.map((review) => (
              <ListItem sx={{ color: "black" }} key={review._id}>
                <ListItemText>
                  <Typography>
                    <strong>{review.name}</strong>
                  </Typography>

                  <Rating
                    size="small"
                    name="half-rating"
                    defaultValue={review.rating}
                    precision={0.5}
                    readOnly
                  />
                  <Typography color="text.secondary">
                    {review.createdAt.substring(0, 10)}
                  </Typography>
                  <Typography color="text.secondary" sx={{ width: "300px" }}>
                    {review.comment}
                  </Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
        <PriceModal open={open} setOpen={setOpen} slug={product.slug} />
      </Card>
    </Modal>
  );
}

export default ReviewModal;
