import { Alert, AlertTitle } from "@mui/material";

function Message(props) {
  return (
    <Alert severity={props.variant} sx={{ width: "350px" }}>
      {props.children}
    </Alert>
  );
}

export default Message;
