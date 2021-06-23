import { Worker } from 'worker_threads';

export default (workerId: number): void => {
  const worker = new Worker('./src/workers/transfer.js', {
    workerData: {
      path: './worker.ts',
      workerId: workerId
    }
  });

  worker.on('message', (result) => {
    console.log(result);
  });
}
