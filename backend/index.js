import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory storage for demo
const reports = [];

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// POST /api/report - submit a report
app.post('/api/report', upload.single('photo'), (req, res) => {
  const { issue, location } = req.body;
  const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;
  const report = {
    id: reports.length + 1,
    issue,
    location,
    photoUrl,
    createdAt: new Date(),
  };
  reports.push(report);
  res.status(201).json({ message: 'Report submitted', report });
});

// GET /api/reports - get all reports
app.get('/api/reports', (req, res) => {
  res.json(reports);
});

// GET /api/report/:id - get a single report
app.get('/api/report/:id', (req, res) => {
  const report = reports.find(r => r.id === parseInt(req.params.id));
  if (!report) return res.status(404).json({ message: 'Not found' });
  res.json(report);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});