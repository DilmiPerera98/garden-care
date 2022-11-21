import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import {FaCartArrowDown, FaChartLine, FaClipboardList, FaPowerOff, FaRegBuilding, FaShapes, FaThLarge, FaUsers} from "react-icons/fa";
import { Link } from "react-router-dom";
export const SideMenu=(
    <React.Fragment>
{[
    {title: "Home",
    url:"/dashboard",
    icon:<FaThLarge/>
    },
    {title: "Products",
    url:"/product",
    icon:<FaCartArrowDown/>
    },
    {title: "Category",
    url:"/category",
    icon:<FaShapes/>
    },
    {title: "Orders",
    url:"/orders",
    icon:<FaClipboardList/>
    },
    {title: "Customers",
    url:"/customers",
    icon:<FaUsers/>
   },
    {title: "Reports",
    url:"/report",
    icon:<FaChartLine/>
   },
    {title: "Inventory",
    url:"/inventory",
    icon:<FaRegBuilding/>
   },
    {title: "Log Out",
    url:"/inventory",
    icon:<FaPowerOff/>
   },
].map((item) => (
    <Link
      to={item.url}
      style={{ textDecoration: "none", color: "white" }}>
        <ListItemButton>
          <ListItemIcon style={{ textDecoration: "none", color: "white" }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
    </Link>
  ))}
  </React.Fragment>
);