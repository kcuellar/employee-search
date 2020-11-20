import React from "react";
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow" role="navigation">
            <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to='/'>Employee Manager</Link>
            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap">
                </li>
            </ul>
        </nav>
    )
}

export default NavBar