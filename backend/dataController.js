const fs = require('fs');
const DATA_FILE = 'data.json';
const path = require('path');

// Read data
const getAllData = (req, res) => {
    // Check if the file exists
    if (!fs.existsSync(DATA_FILE)) {
        // File doesn't exist, create it with an empty array as default content
        fs.writeFile(DATA_FILE, JSON.stringify([]), "utf8", (err) => {
            if (err) {
                return res.status(500).json({ error: "Error creating file" });
            }
            // Send an empty array as the response
            return res.json([]);
        });
    } else {
        // File exists, read it
        fs.readFile(DATA_FILE, "utf8", (err, data) => {
            if (err) {
                return res.status(500).json({ error: "Error reading data" });
            }
            res.json(JSON.parse(data || "[]"));
        });
    }
};

const getData = (req, res) => {
    const id = req.params.id;
    // Check if the file exists
    if (!fs.existsSync(DATA_FILE)) {
        // File doesn't exist, create it with an empty array as default content
        fs.writeFile(DATA_FILE, JSON.stringify([]), "utf8", (err) => {
            if (err) {
                return res.status(500).json({ error: "Error creating file" });
            }
            // Send an empty array as the response
            return res.json([]);
        });
    } else {
        // File exists, read it
        fs.readFile(DATA_FILE, "utf8", (err, data) => {
            if (err) {
                return res.status(500).json({ error: "Error reading data" });
            }
            console.log('data:', data);
            const matchedItem = JSON.parse(data).find((item) => item.id == id);
            res.json(matchedItem || "");
        });
    }
};

// Add data
const addData = (req, res) => {
    const newData = req.body;
    fs.readFile(DATA_FILE, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error reading data" });
        }
        const currentData = JSON.parse(data || "[]");
        currentData.push(newData);
        fs.writeFile(DATA_FILE, JSON.stringify(currentData, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ error: "Error writing data" });
            }
            res.status(201).json(newData);
        });
    });
};

// Update data
const updateData = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    fs.readFile(DATA_FILE, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error reading data" });
        }
        let currentData = JSON.parse(data || "[]");
        currentData = currentData.map((item) =>
            item.id === id ? { ...item, ...updatedData } : item
        );
        fs.writeFile(DATA_FILE, JSON.stringify(currentData, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ error: "Error writing data" });
            }
            res.json(updatedData);
        });
    });
};

// Delete data
const deleteData = (req, res) => {
    const id = req.params.id;

    fs.readFile(DATA_FILE, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error reading data" });
        }
        const currentData = JSON.parse(data || "[]").filter((item) => item.id !== id);
        fs.writeFile(DATA_FILE, JSON.stringify(currentData, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ error: "Error writing data" });
            }
            res.status(204).send();
        });
    });
};


const getFileInfo = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    console.log('req.file:', req.file);

    // Execute file or do whatever processing you need
    const filePath = path.join(__dirname, req.file.path);
    return res.json({filePath, fileName: req.file.originalname});
};

const run =  (req, res) => {
  const { filePath } = req.body;

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'File not found' });
  }

  // Execute the file (for example, if it's a Python script or a shell script)
  exec(`node ${filePath}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ message: `Error executing file: ${error.message}` });
    }
    if (stderr) {
      return res.status(500).json({ message: `stderr: ${stderr}` });
    }
    res.json({ message: 'File executed successfully', output: stdout });
  });
}


module.exports = { getData, getAllData, addData, updateData, deleteData, getFileInfo, run };