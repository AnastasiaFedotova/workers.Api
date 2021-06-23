import { parentPort, workerData } from 'worker_threads';
import timer from './timer';

parentPort.postMessage(
  timer(workerData.workerId)
);
