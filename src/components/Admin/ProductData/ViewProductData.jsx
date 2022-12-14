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
import { Box, Button, CardMedia } from "@mui/material";
import AddProduct from "./AddProduct";
import { toast } from "react-toastify";
import { Store } from "../../../store";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getError } from "../../../utils";
import Loading from "../../Loading";
import Message from "../../Message";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
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

const headCells = [
  {
    id: "Name",
    label: "Name",
    align: "center",
  },
  {
    id: "category",
    label: "Category",
    align: "center",
  },
  {
    id: "price",
    label: " Price",
    align: "center",
  },
  {
    id: "countInStock",
    label: " Stock",
    align: "center",
  },
  {
    id: "image",
    label: " Image",
    align: "center",
  },

  {
    id: "action",
    label: "Actions",
    align: "center",
  },
];

function ViewProductData() {
  //-------------------------------------
  const [isUpdate, setIsUpdate] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //addProductModal
  const [open, setOpen] = useState(false);
  const modalOpen = () => setOpen(true);

  const [editId, setEditId] = useState("");
  const [editProduct, setEditProduct] = useState({});

  //--------------------------------------------
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const [page, setPage] = React.useState(1);
  const [
    {
      loading,
      error,
      products,
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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/admin`, {
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

  const createHandler = async () => {
    modalOpen();
    setIsUpdate(false);
  };

  const deleteHandler = async (product) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await axios.delete(`/api/products/${product._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success("product deleted successfully");
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
          <FaPlus /> Add Product
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
                    <TableCell
                      key={column.id}
                      align={column.align}
                      /*  style={{ minWidth: column.minWidth }} */
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={product.id}
                  >
                    <TableCell align={"center"}>
                      {product.productName}
                    </TableCell>
                    <TableCell align={"center"}>{product.category}</TableCell>
                    <TableCell align={"center"}>{product.price}</TableCell>
                    <TableCell
                      align={"center"}
                      sx={{ color: product.countInStock === 0 ? "red" : "" }}
                    >
                      {product.countInStock === 0
                        ? "Out of Stock"
                        : product.countInStock}
                    </TableCell>
                    <TableCell
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <CardMedia
                        component="img"
                        image={product.img}
                        alt="green iguana"
                        sx={{ width: "2rem", height: "2rem" }}
                      />
                    </TableCell>
                    <TableCell align={"center"}>
                      <Button>
                        <FaEdit
                          onClick={() => {
                            modalOpen();
                            setEditId(product._id);
                            setIsUpdate(true);
                            setEditProduct(product);
                          }}
                        />
                      </Button>
                      <Button
                        onClick={() => {
                          deleteHandler(product);
                        }}
                      >
                        <FaTrashAlt />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <AddProduct
            setOpen={setOpen}
            open={open}
            editId={editId}
            isUpdate={isUpdate}
            editProduct={editProduct}
          />
        </Paper>
      )}
    </>
  );
}

export default ViewProductData;
