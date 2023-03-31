import { NavLink } from 'react-router-dom';
import '../css/navbar.css';

import Avatar from '@material-ui/core/Avatar';


function Navbar() {
    return (
        <nav className="navbar" >

            <Avatar alt="LoggedIn Username" src="/broken-image.jpg" />

            <ul className="navbar-list" >
                <li className="navbar-item">
                    <NavLink exact='true' to="/" className={({ isActive, isPending }) => isActive ? "active-link navlink" : "navlink"}>
                        Home
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/signin" className={({ isActive, isPending }) => isActive ? "active-link navlink" : "navlink"}>
                        Sign In
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/create" className={({ isActive, isPending }) => isActive ? "active-link navlink" : "navlink"}>
                        Add Account
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/createGIF" className={({ isActive, isPending }) => isActive ? "active-link navlink" : "navlink"}>
                        Create GIF
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/feed" className={({ isActive, isPending }) => isActive ? "active-link navlink" : "navlink"}>
                        Feed
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/articles" className={({ isActive, isPending }) => isActive ? "active-link navlink" : "navlink"}>
                        Articles
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/gifs" className={({ isActive, isPending }) => isActive ? "active-link navlink" : "navlink"}>
                        GIFs
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
