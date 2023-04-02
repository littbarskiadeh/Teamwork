import React, { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';

function Logout() {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        userContext.setUser(null);
        navigate('/signin');
    };

    return (        
        <Button variant="contained" color="secondary" onClick={handleLogout} style={{ margin: '5px 5px' }} >
            Logout
        </Button>
    );
}

export default Logout;
