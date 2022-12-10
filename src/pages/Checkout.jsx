import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Step,
  StepButton,
  Stepper,
  TextField,
  Typography,
  useTheme,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Paper,
} from "@mui/material";
import Axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useReducer } from "react";
import { useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutSummary from "../components/cards/CheckoutSummary";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { Store } from "../store";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

function Checkout() {
  const navigate = useNavigate();

  //reducer for place order
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  //handle functions and their variables

  const handleOnFullName = (event) => {
    setFullName(event.target.value);
    setcheckoutError({
      ...checkoutError,
      fullNameErrorMsg: { isVisible: false },
    });
  };
  const handleOnAddress = (event) => {
    setAddress(event.target.value);
    setcheckoutError({
      ...checkoutError,
      addressErrorMsg: { isVisible: false },
    });
  };
  const handleOnContactNumber = (event) => {
    setContactNumber(event.target.value);
    setcheckoutError({
      ...checkoutError,
      contactNumberErrorMsg: { isVisible: false },
    });
  };
  const handleOnEmail = (event) => {
    setEmail(event.target.value);
    setcheckoutError({
      ...checkoutError,
      emailErrorMsg: { isVisible: false },
    });
  };

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    bag: { checkoutData },
  } = state;

  const bag = state.bag;

  async function saveData() {
    ctxDispatch({
      type: "SAVE_CHECKOUT",
      payload: {
        fullName,
        address,
        contactNumber,
        email,
        paymentMethod,
      },
    });
    localStorage.setItem(
      "checkoutData",
      JSON.stringify({
        fullName,
        address,
        contactNumber,
        email,
        paymentMethod,
      })
    );
  }

  //place order
  const itemsPrice = bag.bagItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const shippingPrice = 350;

  const totalPrice = itemsPrice + shippingPrice;

  const placeOrder = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await Axios.post(
        "/api/orders",
        {
          orderItems: bag.bagItems,
          checkoutData: bag.checkoutData,
          paymentMethod: bag.checkoutData.paymentMethod,
          itemsPrice: itemsPrice,
          shippingPrice: shippingPrice,
          totalPrice: totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: "CART_CLEAR" });
      dispatch({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("bagItems");
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };

  //initialize variables
  const [fullName, setFullName] = useState(checkoutData.fullName || "");
  const [address, setAddress] = useState(checkoutData.address || "");
  const [contactNumber, setContactNumber] = useState(
    checkoutData.contactNumber || ""
  );
  const [email, setEmail] = useState(checkoutData.email || "");
  const [paymentMethod, setPaymentMethod] = useState(
    checkoutData.paymentMethod || ""
  );

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=checkout");
    }
  }, [userInfo, navigate]);

  //stepper handle
  const location = useLocation();
  const STEPPER_HEIGHT = "50vh";

  const steps = ["Contact Details", "Payment Method", "Place Order "];

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    if (activeStep === 0) {
      const isValid = validatesignUpInput();
      if (!isValid) {
        handleNext();
      }
    }

    if (activeStep === 1) {
      const isValid = validatePaymentMethod();
      if (!isValid) {
        saveData();
        handleNext();
      }
    }

    if (activeStep === 2) {
      placeOrder();
      handleNext();
      return;
    }

    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
  };
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const theme = useTheme();

  //---------validation-----------

  const [checkoutError, setcheckoutError] = useState({
    fullNameErrorMsg: {
      message: "",
      isVisible: false,
    },
    addressErrorMsg: {
      message: "",
      isVisible: false,
    },
    contactNumberErrorMsg: {
      message: "",
      isVisible: false,
    },
    emailErrorMsg: {
      message: "",
      isVisible: false,
    },
    paymentMethodErrorMsg: {
      message: "",
      isVisible: false,
    },
  });

  const validatePaymentMethod = () => {
    let checkoutErrors = checkoutError;

    if (!paymentMethod) {
      checkoutErrors = {
        ...checkoutErrors,
        paymentMethodErrorMsg: {
          message: "Please select payment Method",
          isVisible: true,
        },
      };
    } else {
      checkoutErrors = {
        ...checkoutErrors,
        paymentMethodErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }
  };

  const validatesignUpInput = () => {
    let checkoutErrors = checkoutError;

    if (fullName.length === 0) {
      checkoutErrors = {
        ...checkoutErrors,
        fullNameErrorMsg: {
          message: "Please enter your Full Name",
          isVisible: true,
        },
      };
    } else {
      checkoutErrors = {
        ...checkoutErrors,
        fullNameErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }
    if (address.length === 0) {
      checkoutErrors = {
        ...checkoutErrors,
        addressErrorMsg: {
          message: "Please enter your Address",
          isVisible: true,
        },
      };
    } else {
      checkoutErrors = {
        ...checkoutErrors,
        addressErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }
    if (contactNumber.length === 0) {
      checkoutErrors = {
        ...checkoutErrors,
        contactNumberErrorMsg: {
          message: "Please enter your Contact Number",
          isVisible: true,
        },
      };
    } else {
      checkoutErrors = {
        ...checkoutErrors,
        contactNumberErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (email.length === 0) {
      checkoutErrors = {
        ...checkoutErrors,
        emailErrorMsg: {
          message: "Please enter your Email",
          isVisible: true,
        },
      };
    } else {
      checkoutErrors = {
        ...checkoutErrors,
        emailErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    // setting all error messages found
    setcheckoutError(checkoutErrors);
    return (
      checkoutErrors.fullNameErrorMsg.isVisible ||
      checkoutErrors.addressErrorMsg.isVisible ||
      checkoutErrors.contactNumberErrorMsg.isVisible ||
      checkoutErrors.emailErrorMsg.isVisible
    );
  };

  function renderFragments() {
    switch (activeStep) {
      case 0:
        return (
          <React.Fragment>
            <Grid
              container
              display={"flex"}
              gap={1}
              mt={2}
              sx={{ mb: { xs: 5, lg: 1 } }}
            >
              <Grid item xs={12} md={7}>
                <Box sx={{ minHeight: STEPPER_HEIGHT }}>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} lg={8}>
                      <Typography pl={1}>Full Name</Typography>
                      <TextField
                        sx={{
                          paddingLeft: "10px",
                          mt: "0.5rem",
                          width: "95%",
                        }}
                        placeholder="Full Name"
                        size="small"
                        type="tel"
                        value={fullName}
                        onChange={handleOnFullName}
                        {...(checkoutError.fullNameErrorMsg.isVisible && {
                          error: true,
                        })}
                      ></TextField>
                      <Typography
                        color="error"
                        fontSize="0.8rem"
                        sx={{
                          visibility: `${
                            checkoutError.fullNameErrorMsg.isVisible
                              ? "unset"
                              : "hidden"
                          }`,
                        }}
                      >
                        {checkoutError.fullNameErrorMsg.message}.
                      </Typography>
                    </Grid>

                    <Grid item xs={12} lg={8}>
                      <Typography pl={1}>Address</Typography>
                      <TextField
                        fullWidth
                        sx={{
                          paddingLeft: "10px",
                          mt: "0.5rem",
                          width: "95%",
                        }}
                        placeholder="Address"
                        size="small"
                        value={address}
                        onChange={handleOnAddress}
                        {...(checkoutError.addressErrorMsg.isVisible && {
                          error: true,
                        })}
                      ></TextField>
                      <Typography
                        color="error"
                        fontSize="0.8rem"
                        sx={{
                          visibility: `${
                            checkoutError.addressErrorMsg.isVisible
                              ? "unset"
                              : "hidden"
                          }`,
                        }}
                      >
                        {checkoutError.addressErrorMsg.message}.
                      </Typography>
                    </Grid>

                    <Grid item xs={12} lg={8}>
                      <Typography pl={1}>Contact Number</Typography>
                      <TextField
                        sx={{
                          paddingLeft: "10px",
                          mt: "0.5rem",
                          width: "95%",
                        }}
                        placeholder="Contact Number"
                        size="small"
                        type="tel"
                        value={contactNumber}
                        onChange={handleOnContactNumber}
                        {...(checkoutError.contactNumberErrorMsg.isVisible && {
                          error: true,
                        })}
                      ></TextField>
                      <Typography
                        color="error"
                        fontSize="0.8rem"
                        sx={{
                          visibility: `${
                            checkoutError.contactNumberErrorMsg.isVisible
                              ? "unset"
                              : "hidden"
                          }`,
                        }}
                      >
                        {checkoutError.contactNumberErrorMsg.message}.
                      </Typography>
                    </Grid>

                    <Grid item xs={12} lg={8}>
                      <Typography pl={1}>Email</Typography>
                      <TextField
                        fullWidth
                        sx={{
                          paddingLeft: "10px",
                          mt: "0.5rem",
                          width: "95%",
                        }}
                        placeholder="Email"
                        size="small"
                        value={email}
                        onChange={handleOnEmail}
                        {...(checkoutError.emailErrorMsg.isVisible && {
                          error: true,
                        })}
                      ></TextField>
                      <Typography
                        color="error"
                        fontSize="0.8rem"
                        sx={{
                          visibility: `${
                            checkoutError.emailErrorMsg.isVisible
                              ? "unset"
                              : "hidden"
                          }`,
                        }}
                      >
                        {checkoutError.emailErrorMsg.message}.
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Divider orientation="vertical" flexItem />

              <CheckoutSummary items={bag.bagItems} />
            </Grid>
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <Grid
              container
              display={"flex"}
              gap={1}
              mt={2}
              sx={{ mb: { xs: 5, lg: 1 } }}
            >
              <Grid item xs={12} md={7}>
                <Box sx={{ minHeight: STEPPER_HEIGHT }}>
                  <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">
                      Select Payment Method
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={paymentMethod}
                      onChange={handleChange}
                      {...(checkoutError.paymentMethodErrorMsg.isVisible && {
                        error: true,
                      })}
                    >
                      <FormControlLabel
                        value="Other"
                        checked={paymentMethod === "Other"}
                        control={<Radio />}
                        label="Other"
                      />
                      <FormControlLabel
                        value="Paypal"
                        checked={paymentMethod === "Paypal"}
                        control={<Radio />}
                        label="Paypal"
                      />
                    </RadioGroup>
                    <Typography
                      color="error"
                      fontSize="0.8rem"
                      sx={{
                        visibility: `${
                          checkoutError.paymentMethodErrorMsg.isVisible
                            ? "unset"
                            : "hidden"
                        }`,
                      }}
                    >
                      {checkoutError.paymentMethodErrorMsg.message}.
                    </Typography>
                  </FormControl>
                </Box>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <CheckoutSummary items={bag.bagItems} />
            </Grid>
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <Grid
              container
              display={"flex"}
              gap={1}
              mt={2}
              sx={{ mb: { xs: 5, lg: 1 } }}
            >
              <Grid item xs={12} md={7}>
                <Box
                  sx={{
                    minHeight: STEPPER_HEIGHT,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Grid container spacing={2}>
                    <Paper
                      elevation={1}
                      sx={{ width: "30vw", minHeight: "25vh", p: 2 }}
                    >
                      <Typography sx={{ fontSize: 20, mt: 1, mb: 1 }}>
                        Shipping Details
                      </Typography>
                      <Typography>
                        <strong>Name: </strong> {bag.checkoutData.fullName}
                      </Typography>
                      <Typography>
                        <strong>Address: </strong> {bag.checkoutData.address}
                      </Typography>
                      <Typography>
                        <strong>Contact Number: </strong>{" "}
                        {bag.checkoutData.contactNumber}
                      </Typography>
                      <Typography>
                        <strong>Payment Method: </strong>{" "}
                        {bag.checkoutData.paymentMethod}
                      </Typography>
                    </Paper>
                  </Grid>
                </Box>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <CheckoutSummary items={bag.bagItems} />
            </Grid>
          </React.Fragment>
        );

      default:
        break;
    }
  }

  return (
    <Container>
      <React.Fragment>
        <div>
          <Stepper sx={{ mb: 5 }} nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>

          {renderFragments()}
        </div>
        <Box
          display="flex"
          justifyContent="end"
          sx={{
            marginTop: "2rem",
            position: "sticky",
            right: "30px",
          }}
        >
          <Button
            size="small"
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="contained"
            sx={{
              ":hover": {
                bgcolor: "#A0D5C2",
              },
              backgroundColor: "#24936B",
            }}
          >
            Previous
          </Button>

          <Button
            size="small"
            sx={{
              ":hover": {
                bgcolor: "#A0D5C2",
              },
              backgroundColor: "#24936B",
              marginLeft: "1rem",
            }}
            onClick={handleComplete}
            variant="contained"
          >
            {activeStep === 2 ? "Continue Payment" : "Next"}
            {loading && <Loading />}
          </Button>
        </Box>
      </React.Fragment>
    </Container>
  );
}

export default Checkout;
