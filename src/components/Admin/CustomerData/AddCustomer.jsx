import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  Grid,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../../../store";
import { getError } from "../../../utils";
import Loading from "../../Loading";

//reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

function AddCustomer({ open, setOpen, editId }) {
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  // const params = useParams();
  // const { id: userId } = params;
  const navigate = useNavigate();

  //initialize the variable
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("false");

  //fetching the data from the back end
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/users/${editId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setName(data.name);
        setEmail(data.email);
        if (data.isAdmin === "true") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [editId, userInfo]);

  //updating the edited data
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `/api/users/${editId}`,
        { _id: editId, name, email, isAdmin },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      toast.success("User updated successfully");
      navigate("/customers");
      setOpen(false);
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };

  function handleClose() {
    setOpen(false);
  }

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

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
              Update Customer
            </Typography>

            <form onSubmit={submitHandler}>
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
                  value={editId}
                  disabled
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
                  Name
                </Typography>
                <TextField
                  sx={{ paddingLeft: "10px", mt: "0.5rem", width: "70%" }}
                  placeholder="Name"
                  size="small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  Is Admin
                </Typography>

                <Checkbox
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: 28 },
                    paddingLeft: "10px",
                    mt: "0.5rem",
                  }}
                  size="small"
                  {...label}
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></Checkbox>
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
                  type="submit"
                  disabled={loadingUpdate}
                >
                  Save
                </Button>
              </Box>
              {loadingUpdate && <Loading></Loading>}
            </form>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
}

export default AddCustomer;
