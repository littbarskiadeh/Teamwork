import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';


import '../css/navbar.css';
import Avatar from '@material-ui/core/Avatar';
import Logout from './Logout';


function Navbar() {
    const userContext = useContext(UserContext);

    return (
        <div className="nav-container" style={{display:'flex', flexDirection:'column'}}>
            <nav className="navbar">

                <Avatar alt={userContext.user.firstname} src="/broken-image.jpg" />

                <ul className="navbar-list">
                    <li className="navbar-item">
                        <NavLink
                            exact='true'
                            to="/"
                            className={({ isActive, isPending }) =>
                                isActive ? 'active-link navlink' : 'navlink'
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink
                            to="/signin"
                            className={({ isActive, isPending }) =>
                                isActive ? 'active-link navlink' : 'navlink'
                            }
                        >
                            Sign In
                        </NavLink>
                    </li>
                    {userContext.user.userType === '1' && (
                        <li className="navbar-item">
                            <NavLink
                                to="/create"
                                className={({ isActive, isPending }) =>
                                    isActive ? 'active-link navlink' : 'navlink'
                                }
                            >
                                Add Account
                            </NavLink>
                        </li>
                    )}

                    <li className="navbar-item">
                        <NavLink
                            to="/createGIF"
                            className={({ isActive, isPending }) =>
                                isActive ? 'active-link navlink' : 'navlink'
                            }
                        >
                            Create GIF
                        </NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink
                            to="/feed"
                            className={({ isActive, isPending }) =>
                                isActive ? 'active-link navlink' : 'navlink'
                            }
                        >
                            Feed
                        </NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink
                            to="/articles"
                            className={({ isActive, isPending }) =>
                                isActive ? 'active-link navlink' : 'navlink'
                            }
                        >
                            Articles
                        </NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink
                            to="/gifs"
                            className={({ isActive, isPending }) =>
                                isActive ? 'active-link navlink' : 'navlink'
                            }
                        >
                            GIFs
                        </NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink
                            exact='true'
                            to="/dashboard"
                            className={({ isActive, isPending }) =>
                                isActive ? 'active-link navlink' : 'navlink'
                            }
                        >
                            Dashboard
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <Logout/>
        </div>
    );
}

export default Navbar;
