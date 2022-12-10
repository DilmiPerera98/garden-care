import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { FaHistory, FaPowerOff } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Store } from "../../store";

export default function Profile(props) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { data } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //signoutHandler
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("checkoutData");

    window.location.href = "/signin";
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 35, height: 35 }}>{data.name.charAt(0)}</Avatar>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Link to="/profile" className="nav-link">
            <Box display="flex" alignItems="center">
              <Avatar />
              Profile
            </Box>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/orderhistory" className="nav-link">
            <ListItemIcon>
              <FaHistory />
            </ListItemIcon>
            Order History
          </Link>
        </MenuItem>
        <Divider />

        <MenuItem>
          <Link to="#signout" onClick={signoutHandler} className="nav-link">
            <ListItemIcon>
              <FaPowerOff />
            </ListItemIcon>
            Sign Out
          </Link>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
