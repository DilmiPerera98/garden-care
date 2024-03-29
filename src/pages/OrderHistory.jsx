import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { FaFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { Store } from "../store";
import { getError } from "../utils";

//reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, orders: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderHistory() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  //fetch the relavent user's order history
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`/api/orders/orderhistory/mine`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchData();
  }, [userInfo]);

  //handling page
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container>
      <Typography sx={{ fontSize: 25, mt: 1, mb: 1 }}>
        <u>Order History</u>
      </Typography>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <Box>
          <TableContainer sx={{ maxHeight: "65vh", width: "78vw" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">DATE</TableCell>
                  <TableCell align="center">TOTAL</TableCell>
                  <TableCell align="center">PAID</TableCell>
                  <TableCell align="center">DELIVERED</TableCell>
                  <TableCell align="center">ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell align="center">{order._id}</TableCell>
                    <TableCell align="center">{order.createdAt}</TableCell>
                    <TableCell align="center">
                      Rs.{order.totalPrice}.00
                    </TableCell>
                    <TableCell align="center">
                      {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                    </TableCell>
                    <TableCell align="center">
                      {order.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : "No"}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        type="button"
                        onClick={() => {
                          navigate(`/order/${order._id}`);
                        }}
                      >
                        <FaFileAlt />
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
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}
    </Container>
  );
}
