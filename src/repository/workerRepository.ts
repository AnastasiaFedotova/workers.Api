import WorkerInterface from '../interface/worker';
import { workersdb } from '../db/workers.memorydb';

const readAllWorkers = (): Array<WorkerInterface> => workersdb;

const readWorkerbyId = (id: number): WorkerInterface => workersdb.find((worker) => worker.id === id);

const addWorker = (worker: WorkerInterface): number => workersdb.push(worker);

const removeWorker = (id: number): void => {
  const worker = readWorkerbyId(id);
  worker.status = 'completed';

  return null;
}

export const workerRepository = {
  readAllWorkers,
  readWorkerbyId,
  addWorker,
  removeWorker
};
