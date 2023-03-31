import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createStyles, makeStyles, } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { TextField, Button, Box } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import useFetchArticle from '../hooks/useFetchArticle';


const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            minWidth: 275,
            width: '100%',
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
    })
);
const baseURL = 'http://localhost:8080';

export default function ArticlePage() {
    const classes = useStyles();
    let { id } = useParams();

    const navigate = useNavigate();

    // Get the article details by id from the api
    // const [post, setPost] = React.useState(null);
    const post = useFetchArticle(id);

    const [comment, setComment] = useState({});

    if (!post) {
        return <div>Loading...</div>;
    }

    const { title, article, createdon, authorId, comments } = post;

    const handleChange = (event) => {
        event.persist();
        setComment(comment => ({
            ...comment,
            [event.target.name]: event.target.value
        }));
    }

    const addComment = async event => {

        event.preventDefault();

        fetch(`${baseURL}/articles/${id}/comment`, {
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

            <Link to={`/editArticle/${id}`} >Edit Article</Link><br />

            <Link to={`/deleteArticle/${id}`} >Delete Article</Link><br />

            <Card className={classes.root}>
                <CardContent>

                    <Typography className={classes.pos} component="div">

                        <Box sx={{ fontWeight: 'bold', m: 1 }}>ID: {id}</Box>
                        <Box sx={{ fontWeight: 'regular', m: 1 }}>{article} </Box>

                        <Box sx={{ fontWeight: 'regular', m: 1 }}>Date created: {createdon}</Box>
                        <Box sx={{ fontWeight: 'regular', m: 1 }}>Author ID: {authorId} </Box>

                    </Typography>
                </CardContent>
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

            {comments.length > 0 ?
                <Card>
                    <ul className={classes.list}>
                        {
                            comments.map((cmnt, index) => (
                                <li key={index} className={classes.listItem}>
                                    <Box sx={{ fontWeight: 'regular', m: 1 }}>{cmnt.comment}</Box>
                                    <Box sx={{ fontWeight: 'regular', m: 1 }}>Comment by - {cmnt.authorId}</Box>
                                </li>)
                            )}
                    </ul>
                </Card>
                : <Card>
                    <Box sx={{ fontWeight: 'regular', m: 1 }}>There are no comments on this article</Box>
                </Card>}
        </Box >
    );
}
