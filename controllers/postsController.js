const connection = require('../database/db')

// index
function index(req, res) {
    //this creates as many rows for a single post as there are tags
    const sql = `
        SELECT 
            posts.id AS post_id,
            posts.title,
            posts.content,
            posts.image,
            tags.label AS tag_label
        FROM posts
        INNER JOIN post_tag ON posts.id = post_tag.post_id
        INNER JOIN tags ON post_tag.tag_id = tags.id;
    `;

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(404).json({ error: "No posts found" });
        }

        const posts = [];

        // to reduce the multiple rows for a single post to one
        results.forEach(({ post_id, title, content, image, tag_label }) => {

            let post = posts.find(p => p.id === post_id);

            if (!post) {
                post = {
                    id: post_id,
                    title,
                    content,
                    image,
                    tags: []
                };
                posts.push(post);
            }

            //to add all the tags from the multiple rows into one
            post.tags.push(tag_label);
        });

        res.json(posts);
    });
};

// show
function show(req, res) {
    //this creates as many rows for a single post as there are tags

    const { id } = req.params

    const sql = `
        SELECT 
            posts.id AS post_id,
            posts.title,
            posts.content,
            posts.image,
            tags.label AS tag_label
        FROM posts
        INNER JOIN post_tag ON posts.id = post_tag.post_id
        INNER JOIN tags ON post_tag.tag_id = tags.id
        WHERE post_id = "${id}";
    `;

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(404).json({ error: `Post with ID ${id} not found` });
        }

        // Process the results to create a single post object
        const { post_id, title, content, image } = results[0]; // Get the first row for the post details
        const post = {
            id: post_id,
            title,
            content,
            image,
            tags: []
        };

        for (let i = 0; i < results.length; i++) {
            post.tags.push(results[i].tag_label);
        }

        res.json(post);
    });
}

//destroy
function destroy(req, res) {
    const { id } = req.params;

    const checkSql = `SELECT * FROM posts WHERE id = ?`;

    connection.query(checkSql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(404).json({ error: `Post with ID ${id} not found` });
        }

        const deleteSql = `DELETE FROM posts WHERE id = ?`;

        connection.query(deleteSql, [id], err => {
            if (err) return res.status(500).json({ error: err.message });

            //to display a blank page
            res.status(204).send();
            // alternatively, to display a success message: 
            /* res.status(200).send(`The post n°${id} was successfully deleted!`); */
        });
    });
}

module.exports = {
    index,
    show,
    destroy
}