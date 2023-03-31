import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

const baseURL = 'http://localhost:8080';

const useStyles = makeStyles((theme) =>
  createStyles({
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
      width: "100%"
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);

function EditArticle() {
  const [values, setValues] = useState({ title: "", article: "" }); // initialize state with default values for title and article

  let { id } = useParams();
  id = parseInt(id);

  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch(`${baseURL}/articles/${id}`, {
      method: 'GET',
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    })
      .then((res) => res.json())
      .then(article => setValues(article.data));
  }

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  }

  const handleCancel = () => {
    navigate(-1);
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent the default form submission behavior

    fetch(`${baseURL}/articles/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(values),
      headers: {
        'x-access-token': localStorage.getItem('token'),
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then(() => navigate(-1)); // navigate back to the previous page after the request is complete
  }

  return (
    <div className={classes.root}>
      <div className={classes.form}>
        <h1>Edit an Article</h1>

        <TextField
          id="outlined-input"
          name="title"
          value={values.title}
          type="text"
          className={classes.formInput}
          onChange={handleChange}
        />
        <TextField
          id="outlined-input"
          name="article"
          value={values.article}
          type="text"
          multiline
          className={classes.formInput}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={handleSubmit}
        >
          Update
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
  )
}

export default EditArticle;
