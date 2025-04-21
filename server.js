const express = require('express');

// Create an instance of an Express application
const app = express();

// Define a port for the server to listen on
const PORT = 3000;

// Add a basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});