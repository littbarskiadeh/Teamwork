const conn = require('./db-connection');
const pool = conn.pool;

const articleType = '1';//Type field in db for article

const getPosts = (request, response) => {
    pool.query('SELECT * FROM posts WHERE type=$1 ORDER BY createddate DESC', ['1'], (error, results) => {
        if (error) {
            throw error
        }
        // console.log(results.rows)
        response.status(200).json(results.rows)
    })
}

const getPostById = async (request, response) => {
    const id = parseInt(request.params.id);
    
    const commentQuery = 'SELECT * FROM comments WHERE postid=$1';
    const articlesQuery = 'SELECT * FROM posts WHERE type=$1 AND id= $2';

    try {
        // console.log(`Running query: ${articlesQuery}`)

        let { rows } = await pool.query(articlesQuery, [articleType,id]);

        if (!rows[0]) {
            return res.status(400).send({ 'message': 'No article found with the id specified' });
        }

        let articles = rows;
        // console.log(`Articles Count ===>> ${articles.length}`)

        //get comments
        // console.log(`Running query: ${commentQuery}`)
        let comments = await pool.query(commentQuery, [id]);
        
        // console.log(`Comments: ${comments}`)

        comments = comments.rows;
        // console.log(`Comments Count ===>> ${comments.length}`)

        //Get required fields for each comment
        function getCommentsData(comm) {
            return { commentId: comm.id, comment:comm.comment, authorId: comm.commenterid };
        }
        const postComments = comments.map(getCommentsData)

        //for each article, attach comments
        function getArticleData(article) {
            return { id: article.id, createdon: article.createddate, title: article.title, "article": article.description, authorId: article.ownerid, comments:postComments };
        }
        let data = articles.map(getArticleData)
        data = data[0]

        console.log(`Returning article with id ${id}`)
        response.status(201).send({ status: "success", data })        
    }
    catch (error) {
        console.log(`Error: ${error}`)
        return response.status(400).send(error)
    }
}

const createPost = (request, response) => {
    const { title, article } = request.body

    //ADD ownerID to post/article object
    const ownerId = request.user.uuid;
    console.log(`Creating new post for user with id ${ownerId}`)

    pool.query('INSERT INTO posts (title, description, type, ownerid,createddate,updateddate) VALUES ($1, $2, $3, $4,now(),now()) RETURNING *',
        [title, article, articleType, ownerId], (error, results) => {
            if (error) {
                throw error
            }
            let result = results.rows[0] ? results.rows[0] : {};
            let data = {
                message: `Article successfully posted`,
                articleId: result.id,
                createdOn: result.createddate.toLocaleString(),
                title: result.title,
                ownerID: result.ownerid
            }
            console.log(`Post added`)
            response.status(201).send({ status: "success", data })
        })
}

const addComment = (request, response) => {
    const { comment } = request.body
    const articleId = parseInt(request.params.id)
    const commenterId = request.user.uuid;

    console.log(`Adding new comment from employee with id  ${commenterId}`)
    console.log(`Adding new comment  ${comment}`)

    pool.query('INSERT INTO comments (comment, postid, commenterid, createddate)  VALUES ($1, $2, $3,now()) RETURNING *',
        [comment, articleId, commenterId], (error, results) => {
            if (error) {
                throw error
            }
            let result = results.rows[0] ? results.rows[0] : {};

            let data = {
                message: `Comment successfully added`,
                createdOn: result.createddate.toLocaleString(),
                articleTitle: result.title,
                article: result.description,
                comment,
                commentBy: commenterId
            }

            console.log(`Comment added, ${comment}`)
            response.status(201).send({ status: "success", data })
        })
}

const updatePost = (request, response) => {
    const id = parseInt(request.params.id)
    const {
        title,
        article,
    } = request.body
    pool.query(
        'UPDATE posts SET title = $1, description = $2, updateddate = now() WHERE id = $3 RETURNING *',
        [title, article, id],
        (error, results) => {
            if (error) {
                throw error
            }
            let result = results.rows[0]
            console.log(`Post with id: ${result.id}, has been modified`)

            let data = {
                message: `Article successfully updated`,
                title: result.title,
                article: result.description
            }

            console.log(`Article updated successfully. Article title - ${result.title}`)

            response.status(201).send({ status: "success", data })
        }
    )
}

const deletePost = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM posts WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        let data = {
            message: `Article with ID ${id} was successfully deleted`
        }
        console.log(`Article with ID: ${id} deleted successfully`)
        response.status(200).send({ status: "success", data })
    })
}

const getFeed = (request, response) => {
    pool.query('SELECT * FROM posts ORDER BY createddate DESC', (error, results) => {

        if (error) {
            throw error
        }
        // let result = results.rows[0] ? results.rows[0] : {};

        function getData(post) {
            return { id: post.id, createdon: post.createddate, title: post.title, "article/url": post.description, authorId: post.ownerid };
        }

        let data = results.rows.map(getData)

        console.log(`returning feed`)
        response.status(201).send({ status: "success", data })
    })
}

module.exports = {
    getPosts,
    getPostById,
    createPost,
    addComment,
    updatePost,
    deletePost,
    getFeed
}