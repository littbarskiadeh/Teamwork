import { useEffect, useState } from 'react';

const baseURL = 'http://localhost:8080'

function useDeleteArticle(id) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`${baseURL}/articles/${id}`, {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    })
      .then((res) => res.json())
      .then(data => setArticle(data.data));
  }, [id]);

  return article;
}

export default useDeleteArticle;