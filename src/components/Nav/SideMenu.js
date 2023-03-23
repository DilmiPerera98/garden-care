import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import {
  FaCartArrowDown,
  FaChartLine,
  FaClipboardList,
  FaPowerOff,
  FaThLarge,
  FaUsers,
  FaNewspaper,
  FaGlobe,
  FaComments,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Signout from "../Signout";
export const SideMenu = (
  <React.Fragment>
    {[
      { title: "Home", url: "/dashboard", icon: <FaThLarge /> },
      { title: "Products", url: "/product", icon: <FaCartArrowDown /> },
      { title: "Orders", url: "/orders", icon: <FaClipboardList /> },
      { title: "Customers", url: "/customers", icon: <FaUsers /> },
      { title: "Article", url: "/admin/article", icon: <FaNewspaper /> },
      { title: "Reports", url: "/report", icon: <FaChartLine /> },
      { title: "Guidence", url: "/guidence", icon: <FaComments /> },
      { title: "Garden Care", url: "/", icon: <FaGlobe /> },
    ].map((item) => (
      <Link
        to={item.url}
        key={item.url}
        style={{ textDecoration: "none", color: "white" }}
      >
        <ListItemButton>
          <ListItemIcon style={{ textDecoration: "none", color: "white" }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </Link>
    ))}
    <Divider sx={{ my: 1 }} />
    <Signout />
  </React.Fragment>
);
