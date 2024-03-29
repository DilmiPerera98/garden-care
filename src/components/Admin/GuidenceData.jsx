import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";
import Message from "./../Message.jsx";
import { Store } from "../../store";
import { grey } from "@mui/material/colors";
import { FaPaperPlane } from "react-icons/fa";

let allUsers = [];
let allMessages = [];
let allSelectedUser = {};
const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:5000"
    : window.location.host;

function GuidenceData() {
  const [selectedUser, setSelectedUser] = useState("");
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  // const userSignin = useSelector((state) => state.userSignin);
  // const { userInfo } = userSignin;

  const { state } = useContext(Store);
  const { userInfo } = state;
  console.log(userInfo);

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: "smooth",
      });
    }

    if (!socket) {
      const sk = socketIOClient(ENDPOINT);
      setSocket(sk);

      sk.emit("onLogin", {
        _id: userInfo._id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });
      sk.on("message", (data) => {
        if (allSelectedUser._id === data._id) {
          allMessages = [...allMessages, data];
        } else {
          const existUser = allUsers.find((user) => user._id === data._id);
          if (existUser) {
            allUsers = allUsers.map((user) =>
              user._id === existUser._id ? { ...user, unread: true } : user
            );
            setUsers(allUsers);
          }
        }
        setMessages(allMessages);
      });
      sk.on("updateUser", (updatedUser) => {
        const existUser = allUsers.find((user) => user._id === updatedUser._id);
        if (existUser) {
          allUsers = allUsers.map((user) =>
            user._id === existUser._id ? updatedUser : user
          );
          setUsers(allUsers);
        } else {
          allUsers = [...allUsers, updatedUser];
          setUsers(allUsers);
        }
      });

      sk.on("listUsers", (updatedUsers) => {
        allUsers = updatedUsers;
        setUsers(allUsers);
      });
      sk.on("selectUser", (user) => {
        allMessages = user.messages;
        setMessages(allMessages);
      });
    }
  }, [messages, socket, users]);

  const selectUser = (user) => {
    allSelectedUser = user;
    setSelectedUser(allSelectedUser);
    const existUser = allUsers.find((x) => x._id === user._id);
    if (existUser) {
      allUsers = allUsers.map((x) =>
        x._id === existUser._id ? { ...x, unread: false } : x
      );
      setUsers(allUsers);
    }

    socket.emit("onUserSelected", user);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert("Error. Please type message.");
    } else {
      allMessages = [
        ...allMessages,
        { body: messageBody, name: userInfo.name },
      ];
      setMessages(allMessages);
      setMessageBody("");
      setTimeout(() => {
        socket.emit("onMessage", {
          body: messageBody,
          name: userInfo.name,
          isAdmin: userInfo.isAdmin,
          _id: selectedUser._id,
        });
      }, 1000);
    }
  };

  console.log(messages);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box>
            {users.filter((x) => x._id !== userInfo._id).length === 0 && (
              <Message>No Online User Found</Message>
            )}
          </Box>
          <Box sx={{ height: "560px", width: "200px", background: "#EEEEEE" }}>
            <ul>
              {users
                .filter((x) => x._id !== userInfo._id)
                .map((user) => (
                  <Typography
                    key={user._id}
                    className={
                      user._id === selectedUser._id ? " selected" : " "
                    }
                  >
                    <Button onClick={() => selectUser(user)}>
                      {user.name}
                    </Button>
                    <span
                      className={
                        user.unread
                          ? "unread"
                          : user.online
                          ? "online"
                          : "offline"
                      }
                    ></span>
                  </Typography>
                ))}
            </ul>
          </Box>
        </Grid>
        <Grid item xs={8}>
          {!selectedUser._id ? (
            <Message>Select a user to start chat</Message>
          ) : (
            <Box>
              <Box sx={{ m: "20px" }}>
                <Typography fontSize={25}>
                  <strong>Chat with {selectedUser.name}</strong>
                </Typography>
              </Box>
              <Paper
                variant="outlined"
                sx={{ mb: 1, width: "50vw", p: "10px", height: "440px" }}
              >
                <Box>
                  <ul ref={uiMessagesRef}>
                    {messages.length === 0 && <li>No Message</li>}
                    {messages.map((msg, index) => (
                      <Typography key={index}>
                        <strong>{`${msg.name}: `}</strong>
                        {msg.body}
                      </Typography>
                    ))}
                  </ul>
                </Box>
              </Paper>
              <Box
                display="flex"
                alignContent="center"
                sx={{ width: "50vw", m: "0" }}
              >
                <form onSubmit={submitHandler}>
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={1}
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                    placeholder="type Message"
                    sx={{ width: "700px" }}
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
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default GuidenceData;
