import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="sidebar-sticky">
            <ul className="nav flex-column nav-fill">
                <li className="nav-item">
                    <Link className="nav-link active text-left text-dark" to='/'>
                        <FontAwesomeIcon icon="users" size="sm"/> Employees
                    </Link>
                </li>
                {/*<li className="nav-item">*/}
                {/*    <Link className="nav-link text-left text-dark" to='/employee-list'>*/}
                {/*        <FontAwesomeIcon icon="smile" size="sm"/> Employees*/}
                {/*    </Link>*/}
                {/*</li>*/}
            </ul>
        </div>
    )
}

export default Sidebar