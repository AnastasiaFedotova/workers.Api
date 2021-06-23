
import { getRandomSec } from '../utils/randomSecond';
import { workerService } from './../service/workerService';

const timer = async (workerId: number): Promise<void> => {
  const worker = await workerService.readById(workerId);
  const lifetime = worker.dateDeletion.getTime() - worker.dateСreation.getTime();

  const minsec = 1;
  const maxsec = 5;
  const mlsec = 1000;
  const timeLogs =  getRandomSec(minsec, maxsec) * mlsec;
  let countLogs = 0;

  const IntervalLog = setInterval(() => {
    countLogs += timeLogs;

    checkAndRemoveIntervalLife();
  }, timeLogs)

  function checkAndRemoveIntervalLife() {
    if (countLogs >= lifetime) {
      workerService.remove(workerId);
      clearInterval(IntervalLog);
    }
  }
}

export default timer;
