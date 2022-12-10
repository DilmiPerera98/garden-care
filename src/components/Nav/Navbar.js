import logoimg from "../../Resources/logo.png";
import React, { useContext } from "react";
import { MenuData } from "./MenuData";
import { Link, Outlet } from "react-router-dom";
import "./NavBarStyles.css";
import { FaShoppingBag } from "react-icons/fa";
import { Badge, IconButton } from "@mui/material";
import Bag from "../Modal/Bag";
import { Store } from "../../store";
import Profile from "../Menu/Profile";

function Navbar() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const { state } = useContext(Store);
  const { bag, userInfo } = state;

  return (
    <div>
      <nav className="NavbarItems">
        <h1>
          <img alt="Logo" className="imglogo" src={logoimg} />
          Garden Care{" "}
        </h1>
        <ul className="NavMenu">
          {MenuData.map((item, index) => {
            return (
              <li key={index}>
                <Link to={item.url} className={item.cName}>
                  {item.title}
                </Link>
              </li>
            );
          })}

          <li>
            {userInfo ? (
              userInfo.isAdmin === "true" ? (
                <Link to="/dashboard" className={"nav-links"}>
                  Dashboard
                </Link>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </li>

          <li color="white">
            <IconButton color="inherit">
              <Badge
                badgeContent={bag.bagItems.reduce((a, c) => a + c.quantity, 0)}
                color="primary"
              >
                <FaShoppingBag onClick={handleOpen} />
              </Badge>
            </IconButton>
          </li>

          <li>
            {userInfo ? (
              <Profile data={userInfo} />
            ) : (
              <Link to={"/signIn"} className={"nav-links"}>
                {"Sign in"}
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <Bag open={open} setOpen={setOpen} />
      <Outlet />
    </div>
  );
}

export default Navbar;
