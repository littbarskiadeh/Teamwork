import React, { useState } from 'react';
import { TextField, Button, Box } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { object, string } from '@hapi/joi';
import Joi from '@hapi/joi';

const baseURL = 'http://localhost:8080'

const signInSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    password: Joi.string().required()
});

function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setErrors({});
        setIsSubmitting(true);

        const { error } = signInSchema.validate(formData, { abortEarly: false });

        if (error) {
            const errors = {};
            error.details.forEach(detail => {
                errors[detail.path[0]] = detail.message;
            });
            setErrors(errors);
            setIsSubmitting(false);
            return;
        }

        // Send a request to the server to authenticate the user
        try {
            const response = await fetch(`${baseURL}/auth/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                setErrors({ form: data.message });
                toast.error('Error occured.', { autoClose: 5000 });

                setIsSubmitting(false); 

                return;
            }

            // Handle successful sign in, e.g. redirect to dashboard, save token in local storage
            localStorage.setItem('token', data.data.token);
            toast.success('Signin successful!', { autoClose: 4000 });

            console.log(data)
            console.log('Token: ' + localStorage.getItem('token'));
            // ...
        } catch (err) {
            console.error(err);
            setErrors({ form: 'An error occurred. Please try again later.' });
            setIsSubmitting(false);
        }
        // Redirect to the dashboard page on success
    };

    return (
        
        <Box p={3}  alignItems="center" justifyContent="center" margin={5}>
            <div>
                <h1>Login</h1>
            </div>
            <ToastContainer position="top-center" />

            <form onSubmit={handleSubmit}>
                <Box mb={2} >
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}

                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}

                    />
                </Box>
                <div>
                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                        Sign In
                    </Button>
                    <Button variant="contained" color="secondary" style={{ margin: '5px 5px' }} >
                        Cancel
                    </Button>
                </div>
            </form>
        </Box>

    );
}

export default SignIn;
