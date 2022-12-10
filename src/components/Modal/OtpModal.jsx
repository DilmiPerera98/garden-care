import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useRef } from "react";
import { FaRegWindowClose } from "react-icons/fa";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};

function OtpModal({ open, setOpen }) {
  //Otp handle
  const handleClose = () => setOpen(false);

  //OTP Values
  const [otp, setOtp] = useState(new Array(4).fill(""));

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);

  const handleChange = (element, index, ref) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (ref) {
      ref.current.focus();
    }

    //focus the next input
    /* 
      if (element.nextSibling) {
        element.nextSibling.focus();
      } */
  };

  //Timer
  const [counter, setCounter] = useState(60);
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  //focus
  /* const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
  
    return [ htmlElRef, setFocus ] 
  } */

  return (
    <Modal
      open={open}
      /* onClose={handleClose} */
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <IconButton onClick={handleClose}>
            <FaRegWindowClose />
          </IconButton>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Verify with OTP
          </Typography>

          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, alignContent: "center" }}
          >
            Enter the OTP sent to customer e-mail
          </Typography>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              m: 3,
            }}
          >
            {/* {otp.map((data, index) => {
                return (
                  <Input
                    onChange={(e) => handleChange(e.target, index)}
                    value={data}
                    inputProps={{ maxLength: 1 }}
                    key={index}
                    type="text"
                    style={{ paddingLeft: "10px", margin: "5px", width: "20%" ,height:"20%"}}
                    inputRef={inputRefs[index]
                    name="otp"
                  />
                );
              })} */}
            <TextField
              onChange={(e) => handleChange(e.target, 0, inputRef1)}
              value={otp[0].data}
              autoFocus={true}
              inputProps={{ maxLength: 1 }}
              sx={{ paddingLeft: "10px", mt: "0.5rem", width: "20%" }}
              size="small"
              name="otp"
            />
            <TextField
              onChange={(e) => handleChange(e.target, 1, inputRef2)}
              value={otp[1].data}
              inputRef={inputRef1}
              inputProps={{ maxLength: 1 }}
              sx={{ paddingLeft: "10px", mt: "0.5rem", width: "20%" }}
              size="small"
              name="otp"
            />
            <TextField
              onChange={(e) => handleChange(e.target, 2, inputRef3)}
              value={otp[2].data}
              inputRef={inputRef2}
              autoFocus={true}
              inputProps={{ maxLength: 1 }}
              sx={{ paddingLeft: "10px", mt: "0.5rem", width: "20%" }}
              size="small"
              name="otp"
            />
            <TextField
              onChange={(e) => handleChange(e.target, 3, null)}
              value={otp[3].data}
              inputRef={inputRef3}
              inputProps={{ maxLength: 1 }}
              sx={{ paddingLeft: "10px", mt: "0.5rem", width: "20%" }}
              size="small"
              name="otp"
            />
          </Container>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Did not receive OTP?{" "}
            {counter !== 0 ? (
              <span>Resend in {counter}</span>
            ) : (
              <span>
                <Button>Resend</Button>
              </span>
            )}
          </Typography>
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
            onClick={handleClose}
          >
            Verify
          </Button>
        </Box>
      </Card>
    </Modal>
  );
}

export default OtpModal;
