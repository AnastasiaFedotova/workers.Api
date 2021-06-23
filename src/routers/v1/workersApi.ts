import { Router } from 'express';
import { workerService } from "./../../service/workerService";

const workersApi = Router();

workersApi.get('/', async (_req, res) => {
  const workersList = await workerService.read();
  res.json(workersList);
})

workersApi.post('/', async (req, res) => {
  const io = req.app.get('socketio');
  const addedMorker = await workerService.add(io);
  res.json(addedMorker);
})

workersApi.put('/:id', async (req, res) => {
  const id = req.params.id;
  workerService.remove(+id);
  res.json('ok');
})

export default workersApi;
