import React from "react";
import ThemeContext from "../contexts/theme";
import { NavLink } from "react-router-dom";

const activeStyle = {
  color: "rgb(187, 46,31)"
};

export default function Nav() {
  console.log(":: Rendering Nav ::");
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  return (
    <nav className="row space-between">
      <ul className="row nav">
        <li>
          <NavLink to="/" exact activeStyle={activeStyle} className="nav-link">
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink to="/battle" activeStyle={activeStyle} className="nav-link">
            Battle
          </NavLink>
        </li>
      </ul>
      <button
        style={{
          fontSize: "30px"
        }}
        className="btn-clear"
        onClick={toggleTheme}
      >
        {theme === "light" ? "🔦" : "💡"}
      </button>
    </nav>
  );
}