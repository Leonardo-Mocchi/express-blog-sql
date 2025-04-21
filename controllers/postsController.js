const connection = require('../database/db')

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

module.exports = {
    index,
    show,
    destroy
}