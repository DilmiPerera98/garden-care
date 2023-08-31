import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Store } from "../store";
import Axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import validator from "validator";

export default function SignUp() {
  const navigate = useNavigate();

  const { serach } = useLocation();
  const redirectInUrl = new URLSearchParams(serach).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  //-------initialize variable and handle those--------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [cPassword, setCPassowrd] = useState("");

  const handleOnName = (event) => {
    setName(event.target.value);
    setsignUpInfoError({
      ...signUpInfoError,
      nameErrorMsg: { isVisible: false },
    });
  };
  const handleOnEmail = (event) => {
    setEmail(event.target.value);
    setsignUpInfoError({
      ...signUpInfoError,
      emailErrorMsg: { isVisible: false },
    });
  };
  const handleOnPassword = (event) => {
    setPassowrd(event.target.value);
    setsignUpInfoError({
      ...signUpInfoError,
      passwordErrorMsg: { isVisible: false },
    });
  };

  const handleOnCPassword = (event) => {
    setCPassowrd(event.target.value);
    setsignUpInfoError({
      ...signUpInfoError,
      cPasswordErrorMsg: { isVisible: false },
    });
  };

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  //-------------------------------------------------------

  //submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isvalidate = validatesignUpInput();
    if (!isvalidate) {
      if (password === cPassword) {
        try {
          const { data } = await Axios.post("/api/users/signup", {
            name,
            email,
            password,
          });

          ctxDispatch({ type: "USER_SIGNIN", payload: data });
          localStorage.setItem("userInfo", JSON.stringify(data));
          toast.success("Successfully sign Up");
          navigate(redirect || "/signin");
        } catch (error) {
          toast.error(getError(error));
        }
      } else {
        toast.error("Password and Confirm Password does not match");
      }
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  //-----------------------------------validation-----------------------------
  const [signUpInfoError, setsignUpInfoError] = useState({
    nameErrorMsg: {
      message: "",
      isVisible: false,
    },
    emailErrorMsg: {
      message: "",
      isVisible: false,
    },
    passwordErrorMsg: {
      message: "",
      isVisible: false,
    },
    cPasswordErrorMsg: {
      message: "",
      isVisible: false,
    },
  });

  const validatesignUpInput = () => {
    let signUpInfoErrors = signUpInfoError;

    if (name.length === 0) {
      signUpInfoErrors = {
        ...signUpInfoErrors,
        nameErrorMsg: {
          message: "Please enter your User Name",
          isVisible: true,
        },
      };
    } else {
      signUpInfoErrors = {
        ...signUpInfoErrors,
        nameErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }
    if (email.length === 0) {
      signUpInfoErrors = {
        ...signUpInfoErrors,
        emailErrorMsg: {
          message: "Please enter your email address",
          isVisible: true,
        },
      };
    } else if (!validator.isEmail(email)) {
      signUpInfoErrors = {
        ...signUpInfoErrors,
        emailErrorMsg: {
          message: "Please enter valid email address",
          isVisible: true,
        },
      };
    } else {
      signUpInfoErrors = {
        ...signUpInfoErrors,
        emailErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (password.length === 0) {
      signUpInfoErrors = {
        ...signUpInfoErrors,
        passwordErrorMsg: {
          message: "Please enter your password",
          isVisible: true,
        },
      };
    } else if (password.length < 5) {
      signUpInfoErrors = {
        ...signUpInfoErrors,
        passwordErrorMsg: {
          message: "Password should contain atleast 5 characters",
          isVisible: true,
        },
      };
    } else {
      signUpInfoErrors = {
        ...signUpInfoErrors,
        passwordErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (cPassword.length === 0) {
      signUpInfoErrors = {
        ...signUpInfoErrors,
        cPasswordErrorMsg: {
          message: "Please enter your confirm password",
          isVisible: true,
        },
      };
    } else if (cPassword.length < 5) {
      signUpInfoErrors = {
        ...signUpInfoErrors,
        cPasswordErrorMsg: {
          message: "Password should contain atleast 5 characters",
          isVisible: true,
        },
      };
    } else {
      signUpInfoErrors = {
        ...signUpInfoErrors,
        cPasswordErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    // setting all error messages found
    setsignUpInfoError(signUpInfoErrors);
    return (
      signUpInfoErrors.nameErrorMsg.isVisible ||
      signUpInfoErrors.emailErrorMsg.isVisible ||
      signUpInfoErrors.passwordErrorMsg.isVisible ||
      signUpInfoErrors.cPasswordErrorMsg.isVisible
    );
  };
  //---------------------------------------------------------------------------

  return (
    <div align="center" alignItems="center">
      <Paper
        elevation={20}
        displey="flex"
        justifyContent="center"
        sx={{ width: "50%", overflow: "hidden" }}
      >
        <Container>
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
              Sign up
            </Typography>
            <form onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="userName"
                    fullWidth
                    id="UserName"
                    label="User Name"
                    autoFocus
                    onChange={handleOnName}
                    {...(signUpInfoError.nameErrorMsg.isVisible && {
                      error: true,
                    })}
                  />
                  <Typography
                    color="error"
                    fontSize="0.8rem"
                    sx={{
                      visibility: `${
                        signUpInfoError.nameErrorMsg.isVisible
                          ? "unset"
                          : "hidden"
                      }`,
                    }}
                  >
                    {signUpInfoError.nameErrorMsg.message}.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleOnEmail}
                    {...(signUpInfoError.emailErrorMsg.isVisible && {
                      error: true,
                    })}
                  />
                  <Typography
                    color="error"
                    fontSize="0.8rem"
                    sx={{
                      visibility: `${
                        signUpInfoError.emailErrorMsg.isVisible
                          ? "unset"
                          : "hidden"
                      }`,
                    }}
                  >
                    {signUpInfoError.emailErrorMsg.message}.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={handleOnPassword}
                    {...(signUpInfoError.passwordErrorMsg.isVisible && {
                      error: true,
                    })}
                  />
                  <Typography
                    color="error"
                    fontSize="0.8rem"
                    sx={{
                      visibility: `${
                        signUpInfoError.passwordErrorMsg.isVisible
                          ? "unset"
                          : "hidden"
                      }`,
                    }}
                  >
                    {signUpInfoError.passwordErrorMsg.message}.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="CPassword"
                    label="Confirm Password"
                    type="password"
                    id="cpassword"
                    autoComplete="new-password"
                    onChange={handleOnCPassword}
                    {...(signUpInfoError.cPasswordErrorMsg.isVisible && {
                      error: true,
                    })}
                  />
                  <Typography
                    color="error"
                    fontSize="0.8rem"
                    sx={{
                      visibility: `${
                        signUpInfoError.cPasswordErrorMsg.isVisible
                          ? "unset"
                          : "hidden"
                      }`,
                    }}
                  >
                    {signUpInfoError.cPasswordErrorMsg.message}.
                  </Typography>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
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
                Sign Up
              </Button>
            </form>
            <Grid container sx={{ p: 3, justifyContent: "center" }}>
              <Grid item>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Typography>Already have an account?{"  "} </Typography>
                  <Link to={`/signin?redirect=${redirect}`} variant="body2">
                    <Typography>Sign in</Typography>
                  </Link>
                </Box>
              </Grid>
            </Grid>
            {/*  <OtpModal open={open} setOpen={setOpen} /> */}
          </Box>
        </Container>
      </Paper>
    </div>
  );
}
