import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../../store";
import BagProduct from "../cards/BagProduct";
import Message from "../Message";

function Bag({ open, setOpen }) {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    bag: { bagItems },
  } = state;

  const theme = useTheme();
  const handleClose = () => {
    setOpen(false);
  };

  //--------------checkout handler----------
  const checkoutHandler = () => {
    handleClose();
    /* if ("/signin") {
      navigate("/checkout");
    } else if (!"/signin") {
      navigate("/signin");
    } */
    /* navigate("/signin?redirect=/checkout:redirect=/"); */ /*
    navigate("/signin" ? "/checkout" : "/signIn"); */
    if ("/signin") {
      navigate("/checkout");
    } else {
      navigate("/signin");
    }
  };

  return (
    <>
      <Modal open={open}>
        <Box
          sx={{
            position: "fixed",
            right: 0,
            top: 0,
            zIndex: 9999,
          }}
        >
          <Card
            sx={{
              padding: 4,
              width: 400,
              height: "100vh",
              right: 0,
              display: "flex",
              flexDirection: "column",
              position: "relative",

              [theme.breakpoints.down("sm")]: {
                pl: 8,
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <IconButton onClick={handleClose}>
                <FaRegWindowClose />
              </IconButton>
            </Box>

            <Typography sx={{ fontSize: 25, mt: 2, mb: 2 }} textAlign="center">
              Your Bag
            </Typography>

            <Divider variant="middle" />
            {bagItems.length === 0 ? (
              <Message variant="error">"Your bag is empty"</Message>
            ) : (
              <>
                {bagItems.map((item) => (
                  <BagProduct key={item._id} item={item} />
                ))}

                <Divider variant="middle" sx={{ mt: 2 }} />

                <Box sx={{ mt: 3, display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{ fontSize: 20, display: "flex", flexGrow: 1 }}
                  >
                    <b>Sub Total</b>(
                    {bagItems.reduce((a, c) => a + c.quantity, 0)} items )
                  </Typography>
                  <Typography
                    sx={{ fontSize: 18, display: "flex", justifyItems: "end" }}
                  >
                    Rs. {bagItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                    .00
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    variant="contained"
                    sx={{
                      ":hover": {
                        bgcolor: "#A0D5C2",
                      },
                      mt: 3,
                      backgroundColor: "#24936B",
                    }}
                    onClick={checkoutHandler}
                  >
                    Check Out
                  </Button>
                </Box>
              </>
            )}
          </Card>
        </Box>
      </Modal>
    </>
  );
}

export default Bag;
