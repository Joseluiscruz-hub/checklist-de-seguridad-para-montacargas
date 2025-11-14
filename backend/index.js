const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase limit to handle base64 images for now

const PORT = process.env.PORT || 3000;

// Mock Data (converted from TypeScript)
const FORKLIFTS = [
  { id: 'CUA-25097', name: 'ECO CUA-25097', model: 'General' },
  { id: 'CUA-29439', name: 'ECO CUA-29439', model: 'General' },
  { id: 'CUA-29440', name: 'ECO CUA-29440', model: 'General' },
  { id: 'CUA-35482', name: 'ECO CUA-35482', model: 'General' },
  { id: 'CUA-35483', name: 'ECO CUA-35483', model: 'General' },
  { id: 'CUA-35494', name: 'ECO CUA-35494', model: 'General' },
  { id: 'CUA-35526', name: 'ECO CUA-35526', model: 'General' },
  { id: 'CUA-37191', name: 'ECO CUA-37191', model: 'General' },
  { id: 'CUA-37193', name: 'ECO CUA-37193', model: 'General' },
  { id: 'CUA-37194', name: 'ECO CUA-37194', model: 'General' },
  { id: 'CUA-37195', name: 'ECO CUA-37195', model: 'General' },
  { id: 'CUA-40019', name: 'ECO CUA-40019', model: 'General' },
  { id: 'CUA-40020', name: 'ECO CUA-40020', model: 'General' },
  { id: 'CUA-40021', name: 'ECO CUA-40021', model: 'General' },
  { id: 'CUA-40057', name: 'ECO CUA-40057', model: 'General' },
  { id: 'CUA-40060', name: 'ECO CUA-40060', model: 'General' },
  { id: 'CUA-40327', name: 'ECO CUA-40327', model: 'General' },
  { id: 'CUA-40328', name: 'ECO CUA-40328', model: 'General' },
  { id: 'CUA-40338', name: 'ECO CUA-40338', model: 'General' },
  { id: 'CUA-26786', name: 'ECO CUA-26786', model: 'General' }
];

const CREWS = [
  { name: 'CRACK\'S', color: '#f472b6' },
  { name: 'X-MEN', color: '#4ade80' },
  { name: 'GLADIADORES', color: '#22d3ee' },
  { name: 'ARMAGEDÓN', color: '#facc15' },
];

const AREAS = [
  'LINEAS',
  'CORTADORA',
  'BUFFER',
  'FLETEO',
  'MP',
  'JARABES'
];

// --- API Endpoints ---

// GET Master Data
app.get('/forklifts', (req, res) => {
  console.log('GET /forklifts hit');
  res.json(FORKLIFTS);
});

app.get('/crews', (req, res) => {
  console.log('GET /crews hit');
  res.json(CREWS);
});

app.get('/areas', (req, res) => {
  console.log('GET /areas hit');
  res.json(AREAS);
});

// POST Inspections and Incidents
app.post('/inspections', (req, res) => {
  const inspection = req.body;
  console.log('POST /inspections hit with data:', inspection.id);
  // Simulate successful save
  res.status(201).json({ message: 'Inspection saved successfully', id: inspection.id });
});

app.post('/incidents', (req, res) => {
    const incident = req.body;
    console.log('POST /incidents hit with data:', incident.id);
    // Simulate successful save
    res.status(201).json({ message: 'Incident saved successfully', id: incident.id });
});

// POST Image Upload
app.post('/upload-image', (req, res) => {
  const { image } = req.body;
  console.log('POST /upload-image hit');
  if (!image) {
    return res.status(400).json({ error: 'No image data provided.' });
  }
  // Simulate uploading to a cloud storage and returning a URL
  const imageUrl = `https://mock-storage.com/images/${Date.now()}.jpg`;
  console.log('Simulated image upload. Returning URL:', imageUrl);
  res.status(201).json({ imageUrl });
});


app.listen(PORT, () => {
  console.log(`Mock backend server running on http://localhost:${PORT}`);
});
