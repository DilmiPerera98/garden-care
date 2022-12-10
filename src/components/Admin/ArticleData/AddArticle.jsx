import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

function AddArticle({ open, setOpen }) {
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
              Add new Article
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
                Article Id
              </Typography>
              <TextField
                sx={{ paddingLeft: "10px", mt: "0.5rem", width: "70%" }}
                placeholder="Article Id"
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
                Article Type
              </Typography>
              <FormControl
                sx={{ paddingLeft: "10px", mt: "0.5rem", width: "70%" }}
              >
                {/*  <InputLabel id="role">Role</InputLabel> */}
                <Select size="small">
                  <MenuItem value={"Student"}>Pots</MenuItem>
                  <MenuItem value={"Lecturer"}>Plants</MenuItem>
                  <MenuItem value={"Lecturer"}>Tools</MenuItem>
                  <MenuItem value={"Lecturer"}>Fertilizer</MenuItem>
                </Select>
              </FormControl>
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
                Article Name
              </Typography>
              <FormControl
                sx={{ paddingLeft: "10px", mt: "0.5rem", width: "70%" }}
              >
                {/*  <InputLabel id="role">Role</InputLabel> */}
                <Select size="small">
                  <MenuItem value={"Indoor Plants"}>Indoor Plants</MenuItem>
                  <MenuItem value={"Outdoor Plants"}>Outdoor Plants</MenuItem>
                  <MenuItem value={"Outdoor Plants"}>Plastic Pots</MenuItem>
                  <MenuItem value={"Outdoor Plants"}>Clay Pots</MenuItem>
                </Select>
              </FormControl>
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

export default AddArticle;
