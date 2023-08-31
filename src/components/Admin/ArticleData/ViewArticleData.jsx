import React, { useContext, useEffect, useReducer, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Box, Button, CardMedia, IconButton } from "@mui/material";
import AddAricle from "./AddArticle";
import { useLocation } from "react-router-dom";
import { Store } from "../../../store";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../../utils";
import Loading from "../../Loading";
import Message from "../../Message";

//reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        articles: action.payload.articles,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false, successDelete: false };

    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

//Table column headers
const headCells = [
  {
    id: "articleId",
    label: "article ID",
    align: "center",
  },

  {
    id: "articleTitle",
    label: "article Title",
    align: "center",
  },
  {
    id: "articleImage",
    label: "article Image",
    align: "center",
  },
  {
    id: "action",
    label: "Actions",
    align: "center",
  },
];

function ViewArticleData() {
  const [isUpdate, setIsUpdate] = useState(false);
  const [editId, setEditId] = useState("");
  const [editArticle, setEditArticle] = useState({});

  //old ones
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //handle AddAricleModal
  const [open, setOpen] = useState(false);
  const modalOpen = () => setOpen(true);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);

  //Handling page number
  const [page, setPage] = React.useState(1);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [
    {
      loading,
      error,
      articles,
      pages,
      loadingCreate,
      loadingDelete,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  //fetching the data from back end
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/articles/admin`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {}
    };

    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [page, userInfo, successDelete, open]);

  //Handle the add or edit modal
  const createHandler = async () => {
    modalOpen();
    setIsUpdate(false);
  };

  //handle the delete button
  const deleteHandler = async (article) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await axios.delete(`/api/articles/${article._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success("Article deleted successfully");
        dispatch({ type: "DELETE_SUCCESS" });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: "DELETE_FAIL",
        });
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={() => {
            createHandler();
          }}
          variant="contained"
          sx={{
            ":hover": {
              bgcolor: "#A0D5C2",
            },
            mt: 3,
            mb: 2,
            backgroundColor: "#24936B",
          }}
        >
          <FaPlus /> Add Article
        </Button>
      </Box>
      {loadingCreate && <Loading></Loading>}
      {loadingDelete && <Loading></Loading>}

      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: "65vh", width: "78vw" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {headCells.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {articles.map((article) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={article.id}
                  >
                    <TableCell align={"center"}>{article._id}</TableCell>
                    <TableCell align={"center"}>{article.name}</TableCell>

                    <TableCell
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <CardMedia
                        component="img"
                        image={article.img}
                        sx={{ width: "2rem", height: "2rem" }}
                      />
                    </TableCell>
                    <TableCell align={"center"}>
                      <IconButton sx={{ fontSize: "15px" }}>
                        <FaEdit
                          onClick={() => {
                            modalOpen();
                            setEditId(article._id);
                            setIsUpdate(true);
                            setEditArticle(article);
                          }}
                        />
                      </IconButton>
                      <IconButton
                        sx={{ fontSize: "15px" }}
                        onClick={() => {
                          deleteHandler(article);
                        }}
                      >
                        <FaTrashAlt />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={articles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <AddAricle
            setOpen={setOpen}
            open={open}
            editId={editId}
            isUpdate={isUpdate}
            editArticle={editArticle}
          />
        </Paper>
      )}
    </>
  );
}

export default ViewArticleData;
