import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { FaEdit, FaSearch } from "react-icons/fa";
import { Box, Button, FormControl, TextField } from "@mui/material";
import {
  DatePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { InputAdornment } from "@mui/material";

function createData(productId, categoryId, soldQuantity, totalSales, action) {
  return {
    productId,
    categoryId,
    soldQuantity,
    totalSales,
    action,
  };
}

const headCells = [
  {
    id: "productId",
    label: "Product ID",
    align: "center",
  },
  {
    id: "categoryId",
    label: "Category ID",
    align: "center",
  },
  {
    id: "soldQuantity",
    label: "Sold Quantity",
    align: "center",
  },
  {
    id: "totalSales",
    label: "Total Sales",
    align: "center",
  },
  {
    id: "action",
    label: "Actions",
    align: "center",
  },
];

const rows = [
  createData(
    "1",
    "1",
    "10",
    "25000",
    <Button>
      <FaEdit />
    </Button>
  ),
  createData(
    "1",
    "1",
    "10",
    "25000",
    <Button>
      <FaEdit />
    </Button>
  ),
  createData(
    "1",
    "1",
    "10",
    "25000",
    <Button>
      <FaEdit />
    </Button>
  ),
  createData(
    "1",
    "1",
    "10",
    "25000",
    <Button>
      <FaEdit />
    </Button>
  ),
  createData(
    "1",
    "1",
    "10",
    "25000",
    <Button>
      <FaEdit />
    </Button>
  ),
  createData(
    "1",
    "1",
    "10",
    "25000",
    <Button>
      <FaEdit />
    </Button>
  ),
  createData(
    "1",
    "1",
    "10",
    "25000",
    <Button>
      <FaEdit />
    </Button>
  ),
];

function ViewProductData() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //timepicker
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
            {/* <InputAdornment>
              <FaSearch />
            </InputAdornment> */}
          </Box>
        </FormControl>
      </Box>

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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {headCells.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default ViewProductData;
