import { Box, Divider, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Axios from "axios";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CheckoutSummary from "../components/cards/CheckoutSummary";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { Store } from "../store";
import { getError } from "../utils.js";
import axios from "axios";
import { toast } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        order: action.payload,
        error: "",
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, sucessPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false };
    default:
      return state;
  }
};

export default function Order() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  //reducer for orderDeatails
  const [{ loading, error, order, successPay, loadingPay }, dispatch] =
    useReducer(reducer, {
      loading: true,
      order: {},
      error: "",
      successPay: false,
      loadingPay: false,
    });
  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          { headers: { authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: "PAY_SUCCESS", payload: data });
        toast.success("Order is Paid");
      } catch (err) {
        dispatch({ type: "PAY_FAIL", payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }

  function onError(err) {
    toast.error(getError(err));
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await Axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    if (!userInfo) {
      return navigate("/signin");
    }
    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/keys/paypal", {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPaypalScript();
    }
  }, [order, userInfo, orderId, navigate, paypalDispatch, successPay]);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <Grid
          container
          display={"flex"}
          gap={1}
          mt={2}
          sx={{ mb: { xs: 5, lg: 1 } }}
        >
          <Grid item xs={12} md={7}>
            <Box>
              <Grid item xs={12} md={7}>
                <Box sx={{ minHeight: "200" }}>
                  <Box>
                    <Box sx={{ mb: 1, width: "40vw" }}>
                      <Typography sx={{ fontSize: 25, mt: 1, mb: 1 }}>
                        <u>Shipping Details</u>
                      </Typography>
                      <Typography sx={{ fontSize: 20 }}>
                        <strong>Order Id: {orderId}</strong>
                      </Typography>
                      <Typography>
                        <strong>Name: </strong> {order.checkoutData.fullName}
                      </Typography>
                      <Typography>
                        <strong>Address: </strong> {order.checkoutData.address}
                      </Typography>
                      <Typography>
                        <strong>Contact Number: </strong>{" "}
                        {order.checkoutData.contactNumber}
                      </Typography>
                      <Typography>
                        <strong>Payment Method: </strong> {order.paymentMethod}
                      </Typography>
                      <Box sx={{ mt: 3 }}>
                        {order.isDelivered ? (
                          <Message variant="success">
                            Paid at {order.deliveredAt}
                          </Message>
                        ) : (
                          <Message variant="error">Not Delivered</Message>
                        )}
                      </Box>
                      <Box sx={{ mt: 3 }}>
                        {order.isPaid ? (
                          <Message variant="auccess">
                            Paid at {order.paidAt}
                          </Message>
                        ) : (
                          <Message variant="error">Not Paid</Message>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Box>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ p: "1px" }} />
          <CheckoutSummary items={order.orderItems} />
          {!order.isPaid && (
            <Box>
              {isPending ? (
                <Loading></Loading>
              ) : (
                <Box>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  ></PayPalButtons>
                </Box>
              )}
              {loadingPay && <Loading />}
            </Box>
          )}
        </Grid>
      )}
    </Container>
  );
}
