import { Worker } from 'worker_threads';

export default (workerId: number, logstime: number, lifetime: number): Worker => {
  return new Worker('./src/workers/transfer.js', {
    workerData: {
      path: './worker.ts',
      workerId: workerId,
      logstime: logstime,
      lifetime: lifetime
    }
  });
}
