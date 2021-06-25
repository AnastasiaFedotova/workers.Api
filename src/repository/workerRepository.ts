import WorkerInterface from '../interface/worker';
import { workersdb } from '../db/workers.memorydb';

const readAllWorkers = (): Array<WorkerInterface> => workersdb.filter(worker => worker.status === 'pending');

const readWorkerbyId = (id: string): WorkerInterface => workersdb.find((worker) => worker.id === id);

const addWorker = (worker: WorkerInterface): number => workersdb.push(worker);

const removeWorker = (id: string): void => {
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
