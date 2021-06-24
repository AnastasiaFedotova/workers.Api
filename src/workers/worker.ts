import { workerData, parentPort } from 'worker_threads';
import { getRandomSec } from './../utils/randomSecond';

const randomText = 'random text';

const Timer = (function() {
  const mlsrc = 1000;
  const logstime = getRandomSec(1, 5) * mlsrc;
  let countLogs = 0;
  let IntervalLog;

  function Timer(workerId: number, lifetime: number) {
    IntervalLog = setInterval(() => {
      countLogs += logstime;

      const newLog = {
        workerId: workerId,
        logMessages: randomText
      }

      parentPort.postMessage(newLog);

      checkTimeLife(lifetime);
    }, logstime)
  }

  function checkTimeLife(time) {
    if (countLogs > time) {
      clearInterval(IntervalLog);
      process.exit();
    }
  }

  return Timer;
}());

new Timer(workerData.workerId, workerData.lifetime);
