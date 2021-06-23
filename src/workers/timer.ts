export {};
import { parentPort, workerData } from 'worker_threads';
import { workerService } from './../service/workerService';
import { getRandomSec } from './../utils/randomSecond';

const timer = async  (workerId: number) => {
  const worker = await workerService.readById(workerId);
  const lifetime = worker.dateDeletion.getTime() - worker.dateСreation.getTime();

  const minsec = 1;
  const maxsec = 5;
  const mlsec = 1000;
  const timeLogs =  getRandomSec(minsec, maxsec) * mlsec;
  let countLogs = 0;

  const IntervalLog = setInterval(() => {
    countLogs += timeLogs;

    console.log("timelife " + lifetime + " timeLogs  " + timeLogs)

    checkAndRemoveIntervalLife();
  }, timeLogs)

  function checkAndRemoveIntervalLife() {
    if (countLogs >= lifetime) {
      workerService.remove(workerId);
      clearInterval(IntervalLog);

      console.log("count logs: " + countLogs)
      console.log("count logs: " + countLogs)
    }
  }


  return workerId + timeLogs
}

parentPort.postMessage(
  timer(workerData.workerId)
);
