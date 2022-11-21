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
import AddCustomer from "./AddCustomer";

function createData(
  customerId,
  firstName,
  lastName,
  address,
  email,
  userName,
  password,
  action
) {
  return {
    customerId,
    firstName,
    lastName,
    address,
    email,
    userName,
    password,
    action,
  };
}

const headCells = [
  {
    id: "customerId",
    label: "Customer ID",
    align: "center",
  },
  {
    id: "firstName",
    label: "FirstName",
    align: "center",
  },
  {
    id: "lastName",
    label: "LastName",
    align: "center",
  },
  {
    id: "address",
    label: "Address",
    align: "center",
  },
  {
    id: "email",
    label: " Email",
    align: "center",
  },
  {
    id: "userName",
    label: " User Name",
    align: "center",
  },
  {
    id: "password",
    label: "Password",
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
    "pots",
    "plastic pots",
    "pots",
    "plastic pots",
    "pots",
    "plastic pots",
    <Button>
      <FaEdit />
    </Button>
  ),
  createData(
    "1",
    "plants",
    "plants",
    "pots",
    "plastic pots",
    "pots",
    "plastic pots",
    <Button>
      <FaEdit />
    </Button>
  ),
  createData(
    "2",
    "pots",
    "pots",
    "pots",
    "plastic pots",
    "pots",
    "plastic pots",
    <Button>
      <FaEdit />
    </Button>
  ),
  createData(
    "1",
    "pots",
    "pots",
    "pots",
    "plastic pots",
    "pots",
    "plastic pots",
    <Button>
      <FaEdit />
    </Button>
  ),
  createData(
    "1",
    "pots",
    "pots",
    "pots",
    "plastic pots",
    "pots",
    "plastic pots",
    <Button>
      <FaEdit />
    </Button>
  ),
  createData(
    "1",
    "pots",
    "pots",
    "pots",
    "plastic pots",
    "pots",
    "plastic pots",
    <Button>
      <FaEdit />
    </Button>
  ),
  createData(
    "1",
    "pots",
    "pots",
    "pots",
    "plastic pots",
    "pots",
    "plastic pots",
    <Button>
      <FaEdit />
    </Button>
  ),
];

function ViewCustomerData() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //AddCustomerModal
  const [open, setOpen] = useState(false);
  const modalOpen = () => setOpen(true);

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
          onClick={modalOpen}
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
          <FaPlus /> Add Customer
        </Button>
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

        <AddCustomer setOpen={setOpen} open={open} />
      </Paper>
    </>
  );
}

export default ViewCustomerData;
