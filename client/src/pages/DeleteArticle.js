import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button, TextField } from '@material-ui/core';
import { DeleteForeverRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import useFetchArticle from '../hooks/useFetchArticle';

const baseURL = 'http://localhost:8080'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '80%'
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  wrapper: {
    width: "100%",
  },
  formInput: {
    width: "100%",
    margin: '5px auto'
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function DeleteArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();

  const article = useFetchArticle(id);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  if (!article) {
    return <div>Loading...</div>
  }

  const handleDelete = async (event) => {
    event.preventDefault();

    const response = await fetch(`${baseURL}/articles/${id}`, {
      method: 'DELETE',
      headers: {
        'x-access-token': localStorage.getItem('token'),
        'Content-type': 'application/json; charset=UTF-8',
      }
    })

    const data = await response.json();
    console.log(data);

    toast.success(`Successfully deleted article`, { autoClose: 5000 });
    navigate('/articles');
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <div className={classes.root}>
      <div className={classes.form}>
        <h1>Delete Article</h1>
        <ToastContainer position="top-center" />

        <TextField
          id="title"
          name="title"
          value={article.title}
          type="text"
          className={classes.formInput}
          onChange={(e) => setTitle(e.target.value)}
          readOnly
        />
        <TextField
          id="article"
          name="article"
          value={article.article}
          type="text"
          multiline
          className={classes.formInput}
          onChange={(e) => setContent(e.target.value)}
          readOnly
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<DeleteForeverRounded />}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default DeleteArticle;
