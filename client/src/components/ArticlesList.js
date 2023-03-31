import React, { useState, useEffect } from "react";
import { Box } from '@material-ui/core';
import ArticleCard from "./ArticleCard";

const baseURL = 'http://localhost:8080'

const ArticlesList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = localStorage.getItem('token');

            try {
                const response = await fetch(`${baseURL}/articles`, {
                    method: 'GET',
                    headers: {
                        'x-access-token': accessToken
                    }
                });
                const {data} = await response.json();
                
                console.log(data)

                setPosts(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    const DataTable = () => {
        return posts.map((post, id) => {
            return <ArticleCard post={post} key={post.id} />;
        });
    }

    return (
        <Box style={{ width: '90%', margin: 'auto auto' }}>
            <h1>All Articles</h1>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {DataTable()}
            </div>
        </Box>
    );

}

export default ArticlesList;