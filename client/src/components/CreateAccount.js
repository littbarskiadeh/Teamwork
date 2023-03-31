import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    TextField, InputLabel, Select, MenuItem, FormControl,
    Box, Button} from '@material-ui/core';

import Joi from '@hapi/joi';
const baseURL = 'http://localhost:8080'

const createAccountSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    usertype: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.string().required(),
    jobRole: Joi.string().required(),
    department: Joi.string().required(),
    address: Joi.string().required()
});

function CreateAccount() {
    // const classes = useStyles();
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        usertype: '',
        firstName: '',
        lastName: '',
        gender: '',
        jobRole: '',
        department: '',
        address: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {

        console.log("form submitted")

        event.preventDefault();
        setErrors({});
        setIsSubmitting(true);

        const { error } = createAccountSchema.validate(formData, { abortEarly: false });

        if (error) {
            const errors = {};
            error.details.forEach(detail => {
                errors[detail.path[0]] = detail.message;
            });
            console.log(error);
            setErrors(errors);
            setIsSubmitting(false);
            return;
        }
        try {
            const response = await fetch(`${baseURL}/auth/create-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token':  localStorage.getItem('token')
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                setErrors({ form: data.message });
                toast.error(`${data.message}\n Error occured while creating account`, { autoClose: 5000 });
                
                setIsSubmitting(false);

                return;
            }

            // Handle successful account creation, e.g. redirect to dashboard, save token
            console.log(data)
            toast.success(`Account Creation was successful for user with id ${data.data.userId}`, { autoClose: 5000 });
            // ...
        } catch (err) {
            console.error(err);
            setErrors({ form: 'An error occurred. Please try again later.' });
            toast.error(`Error occured`, { autoClose: 5000 });

            setIsSubmitting(false);
        }
    };

    return (

        <Box style={{ width: '90%', margin: 'auto auto' }}>
             
            <h1>Create Account</h1>

            <ToastContainer position="top-center" />

            <form onSubmit={handleSubmit} >
                <Box alignItems={'center'} justifyContent={'center'}>
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email}
                        style={{ width: '50%', margin: '5px auto' }}
                    />
                </Box>

                <Box>
                    <TextField
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        error={!!errors.username}
                        helperText={errors.username}
                        style={{ width: '50%', margin: '5px auto' }}
                    />
                </Box>
                <Box>
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        style={{ width: '50%', margin: '5px auto' }}
                    />
                </Box>

                <Box >
                    <FormControl variant="outlined" style={{ minWidth: '50%', margin: '5px auto'  }} >
                        <InputLabel id="usertype-select-label">User Type</InputLabel>
                        <Select
                            labelId="usertype-select-label"
                            label="User Type"
                            id="usertype-select"
                            name="usertype"
                            value={formData.usertype}
                            onChange={handleChange}                            
                        >
                            <MenuItem value="1">Administrator</MenuItem>
                            <MenuItem value="2">Employee</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <TextField
                        label="First name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        style={{ width: '50%', margin: '5px auto' }}
                    />
                </Box>
                <Box>
                    <TextField
                        label="Last name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        style={{ width: '50%', margin: '5px auto' }}
                    />
                </Box>
                <Box>
                    <FormControl variant="outlined" style={{ minWidth: '50%', margin: '5px auto'  }}>
                        <InputLabel id="gender-select-label">   Gender</InputLabel>
                        <Select
                            labelId="gender-select-label"
                            id="gender-select"
                            label="Gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}   
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <TextField
                        label="Job Role"
                        name="jobRole"
                        value={formData.jobRole}
                        onChange={handleChange}
                        margin="normal"
                        style={{ width: '50%', margin: '5px auto' }}
                    />
                </Box>
                <Box>
                    <TextField
                        label="Department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        margin="normal"
                        style={{ width: '50%', margin: '5px auto' }}
                    />
                </Box>
                <Box>
                    <TextField
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        margin="normal"
                        style={{ width: '50%', margin: '5px auto' }}
                    />
                </Box>

                <Box>
                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}
                    style={{ margin: '5px 5px' }}
                    >
                        Create Account
                    </Button>
                    <Button variant="contained" color="secondary" style={{ margin: '5px 5px' }} >
                        Cancel
                    </Button>
                </Box>
            </form>
        </Box>
    )
}

export default CreateAccount;