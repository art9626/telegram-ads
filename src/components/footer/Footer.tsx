import {Link} from "react-router-dom";

export default function Footer () {
  return(
    <ul>
      <li><Link to={"/"}>Main</Link></li>
      <li><Link to={"friends"}>Friends</Link></li>
      <li><Link to={"upgrades"}>Upgrades</Link></li>
      <li><Link to={"game-info"}>Info</Link></li>
      <li><Link to={"tasks"}>Tasks</Link></li>
    </ul>
  )
}
