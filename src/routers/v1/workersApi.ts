import { Router } from 'express';
import { workerService } from "./../../service/workerService";

const workersApi = Router();

workersApi.get('/', async (_req, res) => {
  const workersList = await workerService.read();
  res.json(workersList);
})

workersApi.post('/', async (_req, res) => {
  const addedMorker = await workerService.add();
  res.json(addedMorker);
})

workersApi.put('/:id', async (req, res) => {
  const id = req.params.id;
  workerService.remove(id);
  res.json(true);
})

export default workersApi;
