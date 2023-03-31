import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
    root: {
        width:'auto',
        margin: '5px 5px',
        position: "relative",
        height: "100%"
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
});

export default function ArticleCard(props) {
    const classes = useStyles();
    const { post } = props;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h6" component="h2">
                    <Link href={`/articles/${post.id}`}> {post.title}  </Link>
                </Typography>

                <Typography className={classes.pos} color="textSecondary">
                    ID: {post.id}
                </Typography>

                <Typography variant="body2" component="p">
                    {post.description}
                </Typography>

                <Typography className={classes.pos} color="textSecondary">
                    Created On: {post.createdon || post.createddate}
                </Typography>
                
            </CardContent>

        </Card>
    );
}
