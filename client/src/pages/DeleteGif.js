import { ToastContainer, toast } from 'react-toastify';

import { useNavigate, useParams } from 'react-router-dom';
import { Button, CardMedia } from '@material-ui/core';
import { DeleteForeverRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import useFetchGif from '../hooks/useFetchGif';

import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
        width: "100%"
    },
    button: {
        margin: theme.spacing(1),
    },
    pos: {
        marginBottom: 12,
    },
    image: {
        height: '200px',
        width: '100%',
        objectFit: "contain",

    },
}));

function DeleteGif() {
    const { id } = useParams();
    const navigate = useNavigate();
    const classes = useStyles();

    const gif = useFetchGif(id);

    const handleDelete = () => {

        fetch(`${baseURL}/gifs/${id}`, {
            method: 'DELETE',
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((response) => {
                console.log("Deleted", response)
                navigate('/gifs')
            });

        // toast.success('GIF deleted successfully!', { autoClose: 5000 })

    };

    const handleCancel = (e) => {
        e.preventDefault();
        navigate(-1);
    }

    return (
        <div className={classes.root}>
            <div className={classes.form}>

                <ToastContainer position="top-center" />

                <h1>Delete Gif</h1>
                <Card className={classes.root} >
                    <CardContent>
                        <Typography className={classes.pos} component="div">
                            <Box sx={{ fontWeight: 'regular', m: 1 }}>{gif?.title} </Box>
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        image={gif?.url}
                        title={gif?.title}
                        className={classes.image}
                    />
                </Card>
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

export default DeleteGif;
