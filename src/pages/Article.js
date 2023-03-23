import { Card, Grid } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../components/cards/ArticleCard";
import Loading from "../components/Loading";
import Message from "../components/Message";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_Request":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        articles: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function Home() {
  const [{ loading, error, articles }, dispatch] = useReducer(reducer, {
    articles: [],
    loading: true,
    error: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/articles");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <Grid
      container
      spacing={1}
      sx={{
        display: "flex",
        p: 2,
        justifyContent: "center",
      }}
    >
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <>
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </>
      )}
    </Grid>
  );
}
