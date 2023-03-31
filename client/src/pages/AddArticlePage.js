import React, { useState } from 'react';
import { TextField, Box, Button} from '@material-ui/core';

import Joi from '@hapi/joi';
const baseURL = 'http://localhost:8080'

const addArticleSchema = Joi.object({
    title: Joi.string().required(),
    article: Joi.string().required()
});

function AddArticlePage() {
    const [formData, setFormData] = useState({
        title: '',
        article: '',
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

        const { error } = addArticleSchema.validate(formData, { abortEarly: false });

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
            const response = await fetch(`${baseURL}/articles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token')
                    // 'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZDljY2FlNzAtODNmZC00ZWViLTgxZGItNzQ2MWM3YWY4MDQ4IiwiaWF0IjoxNjc0NDE2ODI2LCJleHAiOjE2NzUwMjE2MjZ9.ybR7sQkucj8PIls9MHki9aia8tIATFcGtBmXwuwXbJM"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                setErrors({ form: data.message });
                setIsSubmitting(false);
                return;
            }

            // Handle successful account creation, e.g. redirect to dashboard, save token
            console.log(data)
            // ...
        } catch (err) {
            console.error(err);
            setErrors({ form: 'An error occurred. Please try again later.' });
            setIsSubmitting(false);
        }
    };

    return (

        <Box style={{ width: '90%', margin: 'auto auto' }}>
        
            <h1>Add New Article</h1>

            <form onSubmit={handleSubmit} >
                <Box>
                    <TextField
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        error={!!errors.title}
                        helperText={errors.title}
                        style={{ width: '50%', margin: '5px auto' }}
                    />
                </Box>
                <Box>
                    <TextField
                        label="Article Description"
                        name="article"
                        type="article"
                        multiline
                        value={formData.article}
                        onChange={handleChange}
                        error={!!errors.article}
                        helperText={errors.article}
                        style={{ width: '50%', margin: '5px auto' }}
                    />
                </Box>

                <Box>
                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}
                    style={{ margin: '5px 5px' }}
                    >
                        Create Article
                    </Button>
                    <Button variant="contained" color="secondary" style={{ margin: '5px 5px' }} >
                        Cancel
                    </Button>
                </Box>
            </form>
        </Box>
    )
}

export default AddArticlePage;