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
import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { Store } from "../../../store";
import { getError } from "../../../utils";

//reducer function for fetching, Creating , Updating
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
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return {
        ...state,
        loadingCreate: false,
      };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };
    default:
      return state;
  }
};

function AddArticle({ open, setOpen, editId, isUpdate, editArticle }) {
  //colsing the add, edit modal
  function handleClose() {
    setOpen(false);
    setName("");
    setImg("");
    setDescription("");
  }

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  //initializing the variables
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");

  //Viewable data in the create or update modal
  useEffect(() => {
    setName(isUpdate ? editArticle.name : name);
    setImg(isUpdate ? editArticle.img : img);
    setDescription(isUpdate ? editArticle.description : description);
  }, [editArticle, setOpen, editId, isUpdate]);

  //Creating the article first time
  const createHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(
        "/api/articles",
        {
          name,
          img,
          description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({ type: "CREATE_SUCCESS" });
      toast.success("Article created successfully");
      handleClose();
    } catch (err) {
      toast.error(getError(error));
      dispatch({
        type: "CREATE_FAIL",
      });
    }
  };

  //updating or editing the article
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `/api/articles/${editId}`,
        {
          _id: editId,
          name,
          img,
          description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      toast.success("Article updated successfully");
      handleClose();
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };

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
              {isUpdate ? "Update Article" : "Add Article"}
            </Typography>

            <form onSubmit={isUpdate ? submitHandler : createHandler}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  m: 1,
                }}
              >
                <Typography pl={1} pt={1} sx={{ width: "20%" }}>
                  Article Id
                </Typography>
                <TextField
                  sx={{ paddingLeft: "10px", mt: "0.5rem", width: "75%" }}
                  placeholder="Article Id"
                  size="small"
                  value={isUpdate ? editId : ""}
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
                <Typography pl={1} pt={1} sx={{ width: "20%" }}>
                  Article Name
                </Typography>
                <TextField
                  sx={{ paddingLeft: "10px", mt: "0.5rem", width: "75%" }}
                  placeholder="Article Name"
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
                <Typography pl={1} pt={1} sx={{ width: "20%" }}>
                  Article Image
                </Typography>
                <TextField
                  sx={{ paddingLeft: "10px", mt: "0.5rem", width: "75%" }}
                  placeholder="Article Image"
                  size="small"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
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
                <Typography pl={1} pt={1} sx={{ width: "20%" }}>
                  Description
                </Typography>
                <TextField
                  sx={{ paddingLeft: "10px", mt: "0.5rem", width: "75%" }}
                  placeholder="Description"
                  size="small"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  type="submit"
                >
                  Save
                </Button>
              </Box>
            </form>
            {/* )} */}
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
}

export default AddArticle;
