import React from "react";
import { NavLink } from "react-router-dom";
import "./Menu.scss";

interface IMenu {
  position: string;
}

const Menu: React.FC<IMenu> = (props) => {
  const { position } = props;

  return (
    <>
      <nav className={`menu menu__${position}`}>
        {/* <NavLink
          to="/blog"
          className={({ isActive, isPending }) =>
            isActive ? "active" : "pending"
          }
        >
          blog
        </NavLink> */}
        <NavLink
          to="/library"
          className={({ isActive, isPending }) =>
            isActive ? "active" : "pending"
          }
        >
          library
        </NavLink>
        <NavLink
          to="/map"
          className={({ isActive, isPending }) =>
            isActive ? "active" : "pending"
          }
        >
          map
        </NavLink>
      </nav>
    </>
  );
};

export default Menu;
