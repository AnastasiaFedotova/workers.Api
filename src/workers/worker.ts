import { workerData, parentPort } from 'worker_threads';
import { getRandomSec } from './../utils/randomSecond';

const randomText = 'random text';

const Timer = (function() {
  const mlsrc = 1000;
  const logstime = getRandomSec(1, 5) * mlsrc;
  let currentCountLogs = 0;
  let IntervalLog;

  function Timer(workerId: number, lifetime: number) {
    const destLog = lifetime / logstime;
    console.log("workerId: " + workerId + " destLog: " + destLog, "logtime: " + logstime, "lifetime: " + lifetime)
    IntervalLog = setInterval(() => {
      const newLog = {
        workerId: workerId,
        logMessages: `${(new Date()).toISOString().split('T')[0]} ${randomText}`
      }

      parentPort.postMessage(newLog);

      checkDestCountLog(destLog);
      currentCountLogs++;
    }, logstime)
  }

  function checkDestCountLog(destLog) {
    console.log("currentCountLogs: " + currentCountLogs, "destLog: " + destLog)
    if (currentCountLogs > destLog) {
      clearInterval(IntervalLog);
      process.exit();
    }
  }

  return Timer;
}());

new Timer(workerData.workerId, workerData.lifetime);
