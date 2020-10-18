// routes/index.js and users.js
import express from 'express';
import { getPatients } from './service';

var router = express.Router();

router.get('/', (req, res, next) => {
  res.send('service is alive.');
});

router.get('/patients', async (req, res) => {
  const patients = await getPatients();

  res.send(patients);
});

export default router;
