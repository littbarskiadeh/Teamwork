import React, { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';

const baseURL = 'http://localhost:8080'

function Logout() {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async (request, response) => {
        try {
            const response = await fetch(`${baseURL}/auth/logout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    uuid: userContext.user.uuid 
                })
            });

            if(!response.status === 200) {
                alert('Logout operation failed');
                navigate('/dashboard');
            }
            
            localStorage.removeItem('token');
            localStorage.removeItem('userType');
//Update user context
            userContext.setUser(null);
            navigate('/');

        } catch (err) {

            console.error(err);
            // setErrors({ form: 'An error occurred. Please try again later.' });
            // setIsSubmitting(false);
        }
    };

    return (
        <Button variant="contained" color="secondary" onClick={handleLogout} style={{ margin: '5px 5px' }} >
            Logout
        </Button>
    );
}

export default Logout;
