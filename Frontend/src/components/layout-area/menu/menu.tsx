import { NavLink } from "react-router-dom";
import "./menu.css";

export function Menu() {

    return (
        <div className="Menu">
            <NavLink to="/home">Home</NavLink>

            <NavLink to="/siteList" end>Site List</NavLink>

            <NavLink to="/addSite" end>Add Site</NavLink>
        </div>
    );
}
