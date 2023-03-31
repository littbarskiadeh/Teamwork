import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

import { CardMedia } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: 'auto',
        margin: '5px 5px',
        position: "relative",
        height: "50%",
        display: 'flex'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    image: {
        height: '200px',
        width: '100%',
        objectFit: "contain"
    }
});

export default function GifCard(props) {
    const classes = useStyles();
    const { gif } = props;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography component="div">
                    {/* {gif.title} */}
                    <Link href={`/gifs/${gif.id}`}> {gif.title}  </Link>

                    <Box sx={{ fontWeight: 'bold', m: 1 }}>{gif.id}</Box>
                    <Box sx={{ fontWeight: 'regular', m: 1 }}>{gif.description} </Box>

                    <Box sx={{ fontWeight: 'regular', m: 1 }}>Created: {gif.createdon || gif.createddate}</Box>
                    
                </Typography>
            </CardContent>
            <CardMedia
                component="img"
                image={gif.description}
                title={gif.title}
                className={classes.image}
            />

        </Card>
    );
}
