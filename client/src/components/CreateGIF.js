import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const baseURL = 'http://localhost:8080'

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textField: {
        margin: theme.spacing(1),
        width: '50%',
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        margin: theme.spacing(1),
        padding: '.5em',
    }
}));

const CreateGIF = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');

    const formData = new FormData();

    const classes = useStyles();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        alert('Delete');

        // const formData = new FormData();
        setFile('');
        setTitle('');

        console.log('form cleared');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        formData.append('file', file);
        formData.append('title', title);

        fetch(`${baseURL}/gifs`, {
            method: 'POST',
            headers: {
                'x-access-token':  localStorage.getItem('token')
            },
            body: formData
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // handle success response here
                toast.success('GIF Upload was successful!', { autoClose: 5000 });

            })
            .catch((error) => {
                console.error(error);
                // handle error here
                toast.error('Error occured.', { autoClose: 5000 });

            });
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <h1>Create GIF Post</h1>
            <ToastContainer position="top-center" />

            <TextField
                className={classes.textField}
                label="Title"
                value={title}
                onChange={handleTitleChange}
            />
            <input className={classes.input} type="file" onChange={handleFileChange} />

            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                type="submit"
            >
                Upload
            </Button>

            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={handleCancel}
            >
                Cancel
            </Button>
            
        </form>
    );
}

export default CreateGIF;
