import { useEffect, useState } from 'react';

const baseURL = 'http://localhost:8080'

function useFetchGif(id) {
  const [gif, setGif] = useState(null);

  useEffect(() => {
    fetch(`${baseURL}/gifs/${id}`, {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    })
      .then((res) => res.json())
      .then(data => setGif(data.data));
  }, [id]);

  return gif;
}

export default useFetchGif;
