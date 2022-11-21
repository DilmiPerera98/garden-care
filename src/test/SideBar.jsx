import { FaBars } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { SideMenu } from "./SideMenu";
import "./SidebarStyles.css";
import { useState } from "react";
import { width } from "@mui/system";
import logoimg from "../../Resources/logo.png"

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
    <nav className="Navbar">
          <h1>
          <img alt="Logo" className="imglogo" src={logoimg}/>
            Garden Care{" "}
          </h1>
          </nav>

      <div className="container">
        <div style={{ width: isOpen ? "150px" : "54px" }} className="sidebar">
          <div style={{ marginLeft: isOpen ? "0px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
          {SideMenu.map((item, index) => (
            <Link
              to={item.url}
              key={index}
              className="link"
              activeclassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.title}
              </div>
            </Link>
          ))}
        </div>
        <main>{children}</main>
        <Outlet />
      </div>
      
      </>
  );
};

export default Sidebar;
