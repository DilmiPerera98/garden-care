import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function AddCustomer({ open, setOpen }) {
  function handleClose() {
    setOpen(false);
  }

  return (
    <Modal open={open}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <Card sx={{ width: "40vw" }}>
          <CardContent>
            <Typography
              pl={1}
              pt={1}
              pb={2}
              variant="h6"
              sx={{ fontWeight: 500 }}
              display="flex"
              justifyContent="center"
            >
              Add new Customer
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                m: 1,
              }}
            >
              <Typography pl={1} pt={1} sx={{ width: "25%" }}>
                Customer Id
              </Typography>
              <TextField
                sx={{ paddingLeft: "10px", mt: "0.5rem", width: "70%" }}
                placeholder="Customer Id"
                size="small"
              ></TextField>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                m: 1,
              }}
            >
              <Typography pl={1} pt={1} sx={{ width: "25%" }}>
                First Name
              </Typography>
              <TextField
                sx={{ paddingLeft: "10px", mt: "0.5rem", width: "70%" }}
                placeholder="First Name"
                size="small"
              ></TextField>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                m: 1,
              }}
            >
              <Typography pl={1} pt={1} sx={{ width: "25%" }}>
                Last Name
              </Typography>
              <TextField
                sx={{ paddingLeft: "10px", mt: "0.5rem", width: "70%" }}
                placeholder="Last Name"
                size="small"
              ></TextField>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                m: 1,
              }}
            >
              <Typography pl={1} pt={1} sx={{ width: "25%" }}>
                Address
              </Typography>
              <TextField
                sx={{ paddingLeft: "10px", mt: "0.5rem", width: "70%" }}
                placeholder="Address"
                size="small"
              ></TextField>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                m: 1,
              }}
            >
              <Typography pl={1} pt={1} sx={{ width: "25%" }}>
                Email Address
              </Typography>
              <TextField
                sx={{ paddingLeft: "10px", mt: "0.5rem", width: "70%" }}
                placeholder="Email Address"
                size="small"
              ></TextField>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                m: 1,
              }}
            >
              <Typography pl={1} pt={1} sx={{ width: "25%" }}>
                User Name
              </Typography>
              <TextField
                sx={{ paddingLeft: "10px", mt: "0.5rem", width: "70%" }}
                placeholder="User Name"
                size="small"
              ></TextField>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                m: 1,
              }}
            >
              <Typography pl={1} pt={1} sx={{ width: "25%" }}>
                Password
              </Typography>
              <TextField
                sx={{ paddingLeft: "10px", mt: "0.5rem", width: "70%" }}
                placeholder="Password"
                size="small"
              ></TextField>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                paddingRight: "27px",
                paddingTop: "1rem",
                marginTop: "0.2rem",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  ":hover": {
                    bgcolor: "#A0D5C2",
                    borderColor: "#A0D5C2",
                  },
                  color: "#24936B",
                  marginRight: "0.5rem",
                  mt: 3,
                  mb: 2,
                  borderColor: "#24936B",
                }}
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
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
                Save
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
}

export default AddCustomer;
