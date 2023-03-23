import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import Axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { Store } from "../store";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getError } from "../utils";
import validator from "validator";

export default function SignIn() {
  const navigate = useNavigate();

  const { serach } = useLocation();
  const redirectInUrl = new URLSearchParams(serach).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  //submit handler
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value);
    setUserInfoError({
      ...userInfoError,
      emailErrorMsg: { isVisible: false },
    });
  };

  const handleOnChangePassword = (event) => {
    setPassowrd(event.target.value);
    setUserInfoError({
      ...userInfoError,
      passwordErrorMsg: { isVisible: false },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isInValid = validateUserInput();

    if (!isInValid) {
      try {
        const { data } = await Axios.post("/api/users/signin", {
          email,
          password,
        });
        ctxDispatch({ type: "USER_SIGNIN", payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
        toast.success("Successfully sign In");
        navigate(redirect || "/");
      } catch (error) {
        toast.error(getError(error));
      }
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  //----------error----
  const [userInfoError, setUserInfoError] = useState({
    emailErrorMsg: {
      message: "",
      isVisible: false,
    },
    passwordErrorMsg: {
      message: "",
      isVisible: false,
    },
  });

  const validateUserInput = () => {
    let userInfoErrors = userInfoError;
    if (email.length === 0) {
      userInfoErrors = {
        ...userInfoErrors,
        emailErrorMsg: {
          message: "Please enter your email",
          isVisible: true,
        },
      };
    } else if (!validator.isEmail(email)) {
      userInfoErrors = {
        ...userInfoErrors,
        emailErrorMsg: {
          message: "Please enter valid email",
          isVisible: true,
        },
      };
    } else {
      userInfoErrors = {
        ...userInfoErrors,
        emailErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (password.length === 0) {
      userInfoErrors = {
        ...userInfoErrors,
        passwordErrorMsg: {
          message: "Please enter your password",
          isVisible: true,
        },
      };
    } else {
      userInfoErrors = {
        ...userInfoErrors,
        passwordErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    // setting all error messages found
    setUserInfoError(userInfoErrors);
    return (
      userInfoErrors.emailErrorMsg.isVisible ||
      userInfoErrors.passwordErrorMsg.isVisible
    );
  };

  return (
    <div align="center">
      <Paper elevation={20} a sx={{ width: "35%", overflow: "hidden" }}>
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
              Sign in
            </Typography>
            <form onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                label="Email"
                fullWidth
                onChange={handleOnChangeEmail}
                value={email}
                {...(userInfoError.emailErrorMsg.isVisible && {
                  error: true,
                })}
              />
              <Typography
                color="error"
                fontSize="0.8rem"
                sx={{
                  visibility: `${
                    userInfoError.emailErrorMsg.isVisible ? "unset" : "hidden"
                  }`,
                }}
              >
                {userInfoError.emailErrorMsg.message}.
              </Typography>

              <TextField
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                onChange={handleOnChangePassword}
                {...(userInfoError.passwordErrorMsg.isVisible && {
                  error: true,
                })}
              />
              <Typography
                color="error"
                fontSize="0.8rem"
                sx={{
                  visibility: `${
                    userInfoError.passwordErrorMsg.isVisible
                      ? "unset"
                      : "hidden"
                  }`,
                }}
              >
                {userInfoError.passwordErrorMsg.message}.
              </Typography>
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                fullWidth
                type="submit"
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
                Sign In
              </Button>
              <Grid container sx={{ p: 3 }}>
                {/*   <Grid item>
                  <Link to={"/signUp"} variant="body2">
                    <Typography>Forgot password?</Typography>
                  </Link>
                </Grid> */}
                <Grid item md>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Typography>Don't have an account?{"  "} </Typography>
                    <Link to={`/signUp?redirect=${redirect}`} variant="body2">
                      <Typography>Sign Up</Typography>
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </Paper>
    </div>
  );
}
