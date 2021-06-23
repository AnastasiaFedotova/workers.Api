import { Worker } from 'worker_threads';

export default (workerId: number): Worker => {
  return new Worker('./src/workers/transfer.js', {
    workerData: {
      path: './timer.ts',
      workerId: workerId
    }
  });
}
