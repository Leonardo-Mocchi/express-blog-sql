const express = require('express');
const connection = require('./database/db');
const PostsRouter = require('./routes/postsRouter')

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Blog Backend!')
})

app.use('/api/v1/posts', PostsRouter)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});