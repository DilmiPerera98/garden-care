import logoimg from "../../Resources/logo.png";
import React, { useContext, useState } from "react";
import { MenuData } from "./MenuData";
import { Link, Outlet } from "react-router-dom";
import "./NavBarStyles.css";
import { FaShoppingBag } from "react-icons/fa";
import { Badge, IconButton, Typography } from "@mui/material";
import Bag from "../Modal/Bag";
import { Store } from "../../store";
import Profile from "../Menu/Profile";
import GuidenceModal from "../Modal/GuidenceModal";

//this is the upper navbar
function Navbar() {
  const [open, setOpen] = useState(false);
  const [gOpen, setGOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const handleOpen = () => {
    setOpen(true);
  };

  const { state } = useContext(Store);
  const { bag, userInfo } = state;

  const handleGOpen = () => {
    setGOpen(true);
    setUserDetails(userInfo);
  };

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
              userInfo.isAdmin === "false" ? (
                <Link onClick={handleGOpen} className={"nav-links"}>
                  Guidence
                </Link>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </li>

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

          {bag.bagItems.length > 0 && (
            <li color="white">
              <IconButton color="inherit">
                <FaShoppingBag onClick={handleOpen} />
                <Badge
                  badgeContent={bag.bagItems.reduce(
                    (a, c) => a + c.quantity,
                    0
                  )}
                  color="primary"
                />
              </IconButton>
            </li>
          )}

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
      <GuidenceModal gOpen={gOpen} setGOpen={setGOpen} userInfo={userDetails} />
      <Outlet />
    </div>
  );
}

export default Navbar;
