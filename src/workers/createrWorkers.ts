import { Worker } from 'worker_threads';

export default (workerId: number, lifetime: number): Worker => {
  return new Worker('./src/workers/transfer.js', {
    workerData: {
      path: './worker.ts',
      workerId: workerId,
      lifetime: lifetime
    }
  });
}
