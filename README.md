# Facility Tracker

## What was improved

- Removed duplicated React component pattern and extracted constants/defaults in `frontend/FacilityTracker.jsx`.
- Added backend API in `backend/server.js` so incidents are persisted to a JSON file instead of only browser localStorage.
- Added backend package manifest in `backend/package.json`.

## Backend run

```bash
cd backend
npm install
npm start
```

API endpoints:
- `GET /api/health`
- `GET /api/incidents`
- `PUT /api/incidents`

## Frontend wiring

`frontend/FacilityTracker.jsx` reads from `/api/incidents` and writes updates with `PUT /api/incidents`, with `localStorage` fallback.
