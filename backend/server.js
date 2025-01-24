const express = require("express");
const bodyParser = require("body-parser");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
const PORT = 5000;

const cors = require("cors");
const { getData, getAllData, addData, updateData, deleteData, getFileInfo, run } = require('./dataController'); // Import controller functions


app.use(cors());

// Middleware
app.use(bodyParser.json());

// API routes
app.get('/api/data', getAllData);
app.get('/api/data/:id', getData);

app.post('/api/data', addData);
app.post('/api/fileInfo',upload.single('file'), getFileInfo);
app.post('/api/run', run);
app.put('/api/data/:id', updateData);
app.delete('/api/data/:id', deleteData);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
