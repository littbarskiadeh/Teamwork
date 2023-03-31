import React, { useState } from 'react';

const baseURL = 'http://localhost:8080'

const FileUploader = () => {
    
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
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
        })
        .catch((error) => {
            console.error(error);
            // handle error here
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
            <br />
            <input type="file" onChange={handleFileChange} />
            <br />
            <button type="submit">Upload</button>
        </form>
    );
}

export default FileUploader;
