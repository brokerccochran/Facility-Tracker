const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const DB_FILE = path.join(__dirname, 'incidents.json');

app.use(express.json({ limit: '10mb' }));

async function readIncidents() {
  try {
    const content = await fs.readFile(DB_FILE, 'utf8');
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeIncidents(incidents) {
  await fs.writeFile(DB_FILE, JSON.stringify(incidents, null, 2));
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'facility-tracker-api' });
});

app.get('/api/incidents', async (_req, res) => {
  const incidents = await readIncidents();
  res.json(incidents);
});

app.put('/api/incidents', async (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Payload must be an array of incidents.' });
  }
  await writeIncidents(req.body);
  return res.json({ ok: true, total: req.body.length });
});

app.listen(PORT, () => {
  console.log(`Facility Tracker API running on http://localhost:${PORT}`);
});
