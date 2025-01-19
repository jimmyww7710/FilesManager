const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

const cors = require("cors");
const { getData, addData, updateData, deleteData } = require('./dataController'); // Import controller functions


app.use(cors());

// Middleware
app.use(bodyParser.json());

// API routes
app.get('/api/data', getData);
app.post('/api/data', addData);
app.put('/api/data/:id', updateData);
app.delete('/api/data/:id', deleteData);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
