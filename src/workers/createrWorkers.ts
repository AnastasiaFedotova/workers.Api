import { Worker } from 'worker_threads';

export default (workerId: number, lifetime: number): Worker => {
  return new Worker('./src/workers/worker.js', {
    workerData: {
      workerId: workerId,
      lifetime: lifetime
    }
  });
}
