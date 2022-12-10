import { Alert, AlertTitle } from "@mui/material";

function Message(props) {
  return <Alert severity={props.variant}>{props.children}</Alert>;
}

export default Message;
