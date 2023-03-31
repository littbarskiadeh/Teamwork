import React, { useState, useEffect } from "react";
import { Box } from '@material-ui/core';
// import ArticleCard from "./ArticleCard";
import GifCard from "./GifCard";

const baseURL = 'http://localhost:8080'

const GifsList = () => {
    const [gifs, setGifs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = localStorage.getItem('token');

            try {
                const response = await fetch(`${baseURL}/gifs`, {
                    method: 'GET',
                    headers: {
                        'x-access-token': accessToken
                    }
                });
                const {data} = await response.json();
                
                console.log(data)

                setGifs(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    const DataTable = () => {
        return gifs.map((gif, i) => {
            return <GifCard gif={gif} key={gif.id} />;
        });
    }

    return (
        <Box style={{ width: '90%', margin: 'auto auto' }}>
            <h1>Gifs</h1>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {DataTable()}
            </div>
        </Box>
    );

}

export default GifsList;