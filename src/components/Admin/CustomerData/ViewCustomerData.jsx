import React, { useContext, useReducer, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { FaEdit, FaPlus, FaTrashAlt, FaTruckLoading } from "react-icons/fa";
import { Box, Button, IconButton } from "@mui/material";
import AddCustomer from "./AddCustomer";
import Loading from "../../Loading";
import Message from "../../Message";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../../../store";
import axios from "axios";
import { getError } from "../../../utils.js";
import { toast } from "react-toastify";

const headCells = [
  {
    id: "Id",
    label: "ID",
    align: "center",
  },
  {
    id: "name",
    label: "Name",
    align: "center",
  },
  {
    id: "email",
    label: " Email",
    align: "center",
  },
  {
    id: "isAdmin",
    label: "Is Admin",
    align: "center",
  },
  {
    id: "action",
    label: "Actions",
    align: "center",
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        users: action.payload,
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
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

function ViewCustomerData() {
  const navigate = useNavigate();
  //AddCustomerModal
  const [open, setOpen] = useState(false);
  const modalOpen = () => setOpen(true);
  const [{ loading, error, users, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/users`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };

    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [userInfo, successDelete, state, open]);

  const deleteHandler = async (user) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        dispatch({ type: "DELETE_REQUEST" });
        await axios.delete(`/api/users/${user._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success("user deleted successfully");
        dispatch({ type: "DELETE_SUCCESS" });
      } catch (error) {
        toast.error(getError(error));
        dispatch({
          type: "DELETE_FAIL",
        });
      }
    }
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [editId, setEditId] = useState("");
  console.log(editId);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "flex-end",
        mt: 5,
      }}
    >
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="error">{error}</Message>
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
                {users.map((user) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                    <TableCell align="center">{user._id}</TableCell>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.isAdmin}</TableCell>
                    <TableCell align="center">
                      <IconButton sx={{ fontSize: "15px" }}>
                        <FaEdit
                          onClick={() => {
                            modalOpen();
                            setEditId(user._id);
                          }}
                        />
                      </IconButton>
                      <IconButton
                        sx={{ fontSize: "15px" }}
                        onClick={() => {
                          deleteHandler(user);
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
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <AddCustomer setOpen={setOpen} open={open} editId={editId} />
        </Paper>
      )}
    </Box>
  );
}

export default ViewCustomerData;
