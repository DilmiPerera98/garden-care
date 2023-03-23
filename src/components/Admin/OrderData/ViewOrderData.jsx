import React, { useContext, useEffect, useReducer, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Box, Button, IconButton } from "@mui/material";
import Addorder from "./AddOrder";
import { Store } from "../../../store";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../../utils";
import Loading from "../../Loading";
import Message from "../../Message";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        orders: action.payload.orders,
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
    id: "orderId",
    label: "ID",
    align: "center",
  },
  {
    id: "orderDate",
    label: "Order Date",
    align: "center",
  },
  {
    id: "isPaid",
    label: " Is Paid",
    align: "center",
  },
  {
    id: "status",
    label: " Status",
    align: "center",
  },
  {
    id: "deliveryDate",
    label: "Delivery Date",
    align: "center",
  },
  {
    id: "action",
    label: "Actions",
    align: "center",
  },
];

function ViewOrderData() {
  const [isUpdate, setIsUpdate] = useState(false);
  const [editId, setEditId] = useState("");
  const [editorder, setEditorder] = useState({});

  const navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //addorderModal
  const [open, setOpen] = useState(false);
  const modalOpen = () => setOpen(true);

  const [
    {
      loading,
      error,
      orders,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/orders/admin`, {
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

  const deleteHandler = async (order) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await axios.delete(`/api/orders/${order._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success("order deleted successfully");
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
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "flex-end",
        mt: 5,
      }}
    >
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
                {orders.map((order) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={order.id}>
                    <TableCell align={"center"}>{order._id}</TableCell>
                    <TableCell align={"center"}>
                      {order.createdAt.slice(0, 10)}
                    </TableCell>
                    <TableCell
                      align={"center"}
                      sx={{
                        color: order.isPaid === false ? "red" : "green",
                      }}
                    >
                      {order.isPaid ? "True" : "False"}
                    </TableCell>
                    <TableCell
                      align={"center"}
                      sx={{
                        color: order.isDelivered
                          ? "blue"
                          : order.isSent
                          ? "green"
                          : "red",
                      }}
                    >
                      {order.isDelivered
                        ? "Delivered"
                        : order.isSent
                        ? "Sent"
                        : "Pending"}
                    </TableCell>
                    <TableCell align={"center"}>
                      {order.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : "-"}
                    </TableCell>

                    <TableCell align={"center"}>
                      <IconButton sx={{ fontSize: "15px" }}>
                        <FaEye
                          onClick={() => {
                            navigate(`/admin/order/${order._id}`);
                          }}
                        />
                      </IconButton>
                      {/* <IconButton sx={{ fontSize: "15px" }}>
                        <FaEdit
                          onClick={() => {
                            modalOpen();
                            setEditId(order._id);
                            setIsUpdate(true);
                            setEditorder(order);
                          }}
                        />
                      </IconButton> */}
                      <IconButton sx={{ fontSize: "15px" }}>
                        <FaTrashAlt
                          onClick={() => {
                            deleteHandler(order);
                          }}
                        />
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
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Box>
  );
}

export default ViewOrderData;
