import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useContext } from "react";
import { FaPowerOff } from "react-icons/fa";
import { Store } from "../store";

export default function Signout() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("checkoutData");

    window.location.href = "/signin";
  };
  return (
    <ListItemButton to="#signout" onClick={signoutHandler}>
      <ListItemIcon style={{ textDecoration: "none", color: "white" }}>
        <FaPowerOff />
      </ListItemIcon>
      <ListItemText style={{ textDecoration: "none", color: "white" }}>
        Log Out
      </ListItemText>
    </ListItemButton>
  );
}
