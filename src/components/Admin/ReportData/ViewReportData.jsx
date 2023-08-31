import React, { useContext, useEffect, useReducer, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { FaEdit, FaEye, FaSearch } from "react-icons/fa";
import { Box, Button, FormControl, IconButton, TextField } from "@mui/material";
import {
  DatePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { InputAdornment } from "@mui/material";
import { Store } from "../../../store";
import axios from "axios";
import { getError } from "../../../utils";
import Loading from "../../Loading";
import Message from "../../Message";
import html2pdf from "html2pdf.js";

//reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        sales: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

//table column headders
const headCells = [
  {
    id: "productId",
    label: "Product ID",
    align: "center",
  },
  {
    id: "productName",
    label: "Product Name",
    align: "center",
  },
  {
    id: "soldQuantity",
    label: "Sold Quantity",
    align: "center",
  },
  {
    id: "rating",
    label: "Rating",
    align: "center",
  },
  {
    id: "totalSales",
    label: "Total Sales",
    align: "center",
  },
];

function ViewProductData() {
  const [element, setElement] = useState("");

  //handle download pdf
  //there is an error please check
  function handleOnDownload() {
    setElement(document.getElementById("reportTable"));

    html2pdf(element, {
      margin: [0, 1, 1, 0],
      filename: "report.pdf",
      image: {
        type: "jpg",
        quality: 0.99,
      },
      html2canvas: {
        // dpi: 192,
        letterRendering: true,
        useCORS: true,
      },
      jsPDF: {
        unit: "pt",
        format: "a4",
        orientation: "landscape",
      },
    });
  }

  const [{ loading, sales, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  //fetching data from the back end
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/orders/admin/report`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
        console.log(data);
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  //handle pagerows
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //datepicker
  //not functioning
  const [tovalue, toSetValue] = React.useState(dayjs(""));
  const [fromvalue, fromSetValue] = React.useState(dayjs(""));

  const tohandleChange = (toValue) => {
    toSetValue(toValue);
  };
  const fromhandleChange = (fromValue) => {
    fromSetValue(fromValue);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          mt: 3,
          mb: 2,
        }}
      >
        <FormControl
          sx={{ my: 1, minWidth: 120, mr: 1 }}
          lg={{ my: 1, minWidth: 120, mr: 1 }}
          size="small"
        >
          <Box
            component="form"
            display="flex"
            alignItem="center"
            sx={{
              "& .MuiTextField-root": { ml: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                inputFormat="MM/DD/YYYY"
                value={tovalue}
                onChange={tohandleChange}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
              <DesktopDatePicker
                inputFormat="MM/DD/YYYY"
                value={fromvalue}
                onChange={fromhandleChange}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </LocalizationProvider>

            <TextField
              placeholder="Enter Product Id"
              size="small"
              InputProps={{
                endAdornment: (
                  <Button>
                    <FaSearch />
                  </Button>
                ),
              }}
            />
          </Box>
        </FormControl>
      </Box>

      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }} id="reportTable">
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
                {sales.productOrders.map((sale) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={sale._id._id}
                  >
                    <TableCell align={"center"}>{sale._id}</TableCell>
                    <TableCell align={"center"}>{sale.productName}</TableCell>
                    <TableCell align={"center"}>{sale.quantity}</TableCell>
                    <TableCell align={"center"}>{sale.rating}</TableCell>
                    <TableCell align={"center"}>Rs. {sale.sales}.00</TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell align={"center"}>
                    <strong>Subtotal</strong>
                  </TableCell>
                  <TableCell colSpan={3} align={"center"}></TableCell>
                  <TableCell align="center">
                    <strong>
                      Rs.
                      {sales.productOrders
                        .map((sale) => sale.sales)
                        .reduce((sum, i) => sum + i, 0)}
                      .00
                    </strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[8, 25, 100]}
            component="div"
            count={sales.productOrders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button
          type="button"
          onClick={handleOnDownload}
          sx={{
            ":hover": {
              bgcolor: "#A0D5C2",
            },
            m: 1,
            backgroundColor: "#24936B",
            color: "white",
            fontSize: "12px",
          }}
        >
          Download pdf
        </Button>
      </Box>
    </>
  );
}

export default ViewProductData;
