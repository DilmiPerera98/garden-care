import logoimg from "../../Resources/logo.png";
import { Component } from "react";
import { MenuData } from "./MenuData";
import { Link, Outlet } from "react-router-dom";
import "./NavBarStyles.css";
import { FaShoppingBag } from "react-icons/fa";

class Navbar extends Component {
  render() {
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
            <li color="white">
              <FaShoppingBag onClick={""}/>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    );
  }
}

export default Navbar;
