import React, { useState, useEffect } from "react";
// import { Box, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
// import PostsTableRow from './PostsTableRow';
import { Box }  from '@material-ui/core';
import ArticleCard from "./ArticleCard";
import GifCard from "./GifCard";

const baseURL = 'http://localhost:8080'

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseURL}/feed`, {
                    method: 'GET',
                    headers: {
                        'x-access-token':  localStorage.getItem('token')
                    },
                });
                const { data } = await response.json();
                // console.log(data)
                setPosts(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    const DataTable = () => {
        return posts.map((post, i) => {
            // console.log('mapping post: ' + JSON.stringify(post))
            // return <PostsTableRow obj={post} key={i} />;
            return post.type === '1' ? <ArticleCard post={post} key={post.id} /> : <GifCard gif={post} key={post.id} />;
        });
    }

    return (
        <Box style={{ width: '90%', margin: 'auto auto' }}>
            <h1>Feed</h1>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {DataTable()}
            </div>
        </Box>
    );

}

export default PostList;