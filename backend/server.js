const express = require("express");
const bodyParser = require("body-parser");
const multer = require('multer');
const path = require('path');

// Set up multer disk storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'backend/uploads/'); // Store uploaded files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));  // Add timestamp to filename to avoid conflicts
    }
  });
  
// Create the multer upload middleware with file filter to accept .bat files
const upload = multer({
storage: storage,
fileFilter: (req, file, cb) => {
    const allowedTypes = ['.bat', '.jpg', '.jpeg', '.png']; // Accept only .bat files
    if (allowedTypes.includes(path.extname(file.originalname).toLowerCase())) {
    cb(null, true);
    } else {
    cb(new Error(`Only ['.bat', '.jpg', '.jpeg', '.png'] files are allowed`), false);
    }
}
});

const app = express();
const PORT = 5000;

const cors = require("cors");
const { getData, getAllData, addData, updateData, deleteData, getFileInfo, run } = require('./dataController'); // Import controller functions


app.use(cors());

// Middleware
app.use(bodyParser.json());


// Serve images from the 'public/images' folder
app.use('/images', express.static(path.join(__dirname, 'uploads/')));

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
