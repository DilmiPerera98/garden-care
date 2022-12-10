import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { FaEdit, FaPlus } from "react-icons/fa";
import { Box, Button } from "@mui/material";
import Addorder from "./AddOrder";

function createData(orderId, customerId, orderDate, price, status, action) {
  return {
    orderId,
    customerId,
    orderDate,
    price,
    status,
    action,
  };
}

const headCells = [
  {
    id: "orderId",
    label: "Order ID",
    align: "center",
  },
  {
    id: "customerId",
    label: "CustomerId",
    align: "center",
  },
  {
    id: "orderDate",
    label: "Order Date",
    align: "center",
  },
  {
    id: "price",
    label: " Price",
    align: "center",
  },
  {
    id: "status",
    label: " Status",
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
    "07/10/2022",
    "250",
    "Pending",
    <Button>
      <FaEdit />
    </Button>
  ),
  createData(
    "1",
    "1",
    "07/10/2022",
    "250",
    "Completed",

    <Button>
      <FaEdit />
    </Button>
  ),
  createData(
    "1",
    "1",
    "07/10/2022",
    "250",
    "Pending",

    <Button>
      <FaEdit />
    </Button>
  ),
  createData(
    "1",
    "1",
    "07/10/2022",
    "20",
    "pending",
    <Button>
      <FaEdit />
    </Button>
  ),
  createData(
    "1",
    "1",
    "07/10/2022",
    "300",
    "Pending",
    <Button>
      <FaEdit />
    </Button>
  ),
  createData(
    "1",
    "1",
    "07/10/2022",
    "400",
    "Completed",
    <Button>
      <FaEdit />
    </Button>
  ),
  createData(
    "1",
    "1",
    "07/10/2022",
    "100",
    "Completed",
    <Button>
      <FaEdit />
    </Button>
  ),
];

function ViewOrderData() {
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

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "flex-end",
        mt: 5,
      }}
    >
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

        <Addorder setOpen={setOpen} open={open} />
      </Paper>
    </Box>
  );
}

export default ViewOrderData;
