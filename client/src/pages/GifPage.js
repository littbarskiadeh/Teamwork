import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardMedia, TextField, Button, } from '@material-ui/core';


const useStyles = makeStyles({
    root: {
        width: 'auto',
        margin: '5px 5px',
        position: "relative",
        display: 'flex'
    },
    image: {
        height: '200px',
        width: '100%',
        objectFit: "contain",

    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    formInput: {
        width: "100%",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    list: {
        listStyle: 'none',

    },
    listItem: {
        marginBottom: '1.5em'
    }
});
const baseURL = 'http://localhost:8080'

export default function GifPage() {
    const classes = useStyles();
    let { id } = useParams();
    const navigate = useNavigate();

    // Get the article details by id from the api
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState({});

    React.useEffect(() => {
        fetch(`${baseURL}/gifs/${id}`, {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
            .then((res) => res.json())
            // .then(data => console.log('GIF data '+ JSON.stringify(data.data)))
            .then(data => setPost(data.data));
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    const { title, url, createdon, authorId, comments } = post;

    const handleChange = (event) => {
        event.persist();
        setComment(comment => ({
            ...comment,
            [event.target.name]: event.target.value
        }));
    }

    const addComment = async event => {

        event.preventDefault();

        fetch(`${baseURL}/gifs/${id}/comment`, {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        navigate(0);
    }


    return (
        <Box style={{ width: '90%', margin: 'auto auto' }}>

            <h2>{title}</h2><br />
            
            {/* <Link to={`/editGif/${id}`} >Edit</Link><br /> */}

            <Link to={`/deleteGif/${id}`} >Delete</Link><br />

            <Card className={classes.root} >
                <CardContent>
                    <Typography className={classes.pos} component="div">

                        <Box sx={{ fontWeight: 'regular', m: 1 }}>ID: {id}</Box>
                        <Box sx={{ fontWeight: 'regular', m: 1 }}>{url} </Box>
                        <Box sx={{ fontWeight: 'regular', m: 1 }}>Created: {createdon} </Box>
                        <Box sx={{ fontWeight: 'regular', m: 1 }}>Author ID - {authorId} </Box>
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    image={url}
                    title={title}
                    className={classes.image}
                />
            </Card>

            <br />
            <form onSubmit={addComment} className={classes.form} >
                <Box mb={2} >
                    <TextField
                        label="Comment"
                        name="comment"
                        variant="outlined"
                        className={classes.formInput}
                        onChange={handleChange}
                    />
                </Box>
                <Button type="submit" variant="contained" color="primary" >
                    Add comment
                </Button>
            </form>
            <br />

            {/* add comments here */}
            {comments.length > 0 ?
                <Card>
                    <ul className={classes.list}>
                        {
                            comments.map((cmnt, index) => (
                                <li key={index}>
                                    <Box sx={{ fontWeight: 'regular', m: 1 }}>{cmnt.comment}</Box>
                                    <Box sx={{ fontWeight: 'regular', m: 1 }}>Comment by - {cmnt.authorId}</Box>
                                </li>)
                            )}
                    </ul>
                </Card>
                : <Card>
                    <Box sx={{ fontWeight: 'regular', m: 1 }}>There are no comments on this gif</Box>
                </Card>
            }
        </Box>
    );
}
