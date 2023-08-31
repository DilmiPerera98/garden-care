import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Modal,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { FaPaperPlane, FaRegWindowClose } from "react-icons/fa";
import React, { useContext, useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { Store } from "../../store";

const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:5000"
    : window.location.host;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};

function GuidenceModal({ gOpen, setGOpen, userInfo }) {
  //handle guidence modal for the users
  const handleGClose = () => {
    setGOpen(false);
  };

  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([
    { name: "Admin", body: "Hello there, Please ask your question." },
  ]);

  useEffect(() => {
    const sk = socketIOClient(ENDPOINT);
    setSocket(sk);
  }, [gOpen]);

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: "smooth",
      });
    }
    if (socket) {
      socket.emit("onLogin", {
        _id: userInfo._id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });
      socket.on("message", (data) => {
        setMessages([...messages, { body: data.body, name: data.name }]);
      });
    }
  }, [messages, gOpen, socket]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert("Error. Please type message.");
    } else {
      setMessages([...messages, { body: messageBody, name: userInfo.name }]);
      setMessageBody("");
      setTimeout(() => {
        socket.emit("onMessage", {
          body: messageBody,
          name: userInfo.name,
          isAdmin: userInfo.isAdmin,
          _id: userInfo._id,
        });
      }, 1000);
    }
  };

  return (
    <Modal
      open={gOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <IconButton onClick={handleGClose}>
            <FaRegWindowClose />
          </IconButton>
        </Box>

        <Box
          sx={{
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: "15rem",
              //maxWidth: 160,
              bgcolor: "background.paper",
              whiteSpace: "nowrap",
              overflowX: "scroll",
            }}
          >
            <ul ref={uiMessagesRef}>
              {messages.map((msg, index) => (
                <Typography key={index}>
                  <strong>{`${msg.name}: `}</strong>
                  {msg.body}
                </Typography>
              ))}
            </ul>
          </Box>
          <Box>
            <form onSubmit={submitHandler}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={1}
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                placeholder="type Message"
                sx={{ width: "335px" }}
              />
              <Button
                display="flex"
                type="submit"
                sx={{ width: "30px", height: "60px" }}
              >
                <FaPaperPlane fontSize="20px" />
              </Button>
            </form>
          </Box>
        </Box>
      </Card>
    </Modal>
  );
}

export default GuidenceModal;
