import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useReducer } from "react";
import { FaArrowAltCircleLeft, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Message from "../components/Message";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_Request":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        article: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ReadArticle() {
  const params = useParams();
  const { _id } = params;

  const [{ loading, error, article }, dispatch] = useReducer(reducer, {
    article: [],
    loading: true,
    error: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/articles/client/${_id}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [_id]);

  console.log(article);
  return loading ? (
    <Loading />
  ) : error ? (
    <Message variant="error">{error}</Message>
  ) : (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ width: "70vw" }}>
        <Link to="/article">
          <IconButton sx={{ m: "10px" }}>
            <FaArrowLeft />
          </IconButton>
        </Link>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            p: "2px",
            textAlign: "center",
          }}
        >
          {article.name}
        </Typography>

        <CardMedia
          component="img"
          sx={{ height: "50vh", mt: "1rem" }}
          image={article.img}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            sx={{ mt: "1rem" }}
            variant="body2"
            color="text.secondary"
          >
            {article.description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
