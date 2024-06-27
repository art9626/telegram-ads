import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <ul>
        <li>
          <NavLink to={"/"}>Main</NavLink>
        </li>
        <li>
          <NavLink to={"/friends"}>Friends</NavLink>
        </li>
        <li>
          <NavLink to={"/upgrades"}>Upgrades</NavLink>
        </li>
        <li>
          <NavLink to={"/game-info"}>Info</NavLink>
        </li>
        <li>
          <NavLink to={"/tasks"}>Tasks</NavLink>
        </li>
      </ul>
    </footer>
  );
}
