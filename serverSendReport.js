const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 5500;

// Enable CORS
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use(express.static('uploads'));

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ filename: req.file.filename });
});

app.get('/download/:filename', (req, res) => {
  const file = path.join(__dirname, 'uploads', req.params.filename);
  res.download(file);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
