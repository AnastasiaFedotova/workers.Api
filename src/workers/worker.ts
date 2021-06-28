import { workerData, parentPort } from 'worker_threads';
import { getRandomSec } from './../utils/randomSecond';

const randomText = 'random text';

class Timer {
  mlsrc = 1000;
  logstime = getRandomSec(1, 5) * this.mlsrc;
  currentCountLogs = 0;
  IntervalLog;

  constructor(workerId: number, lifetime: number) {
    const destLog = lifetime / this.logstime;

    this.IntervalLog = setInterval(() => {
      const newLog = {
        workerId: workerId,
        logMessages: `${(new Date()).toISOString().split('T')[0]} ${randomText}`
      }

      parentPort.postMessage(newLog);

      this.checkDestCountLog(destLog);
      this.currentCountLogs++;
    }, this.logstime)
  }



  checkDestCountLog(destLog) {
    if (this.currentCountLogs > destLog) {
      clearInterval(this.IntervalLog);
      process.exit();
    }
  }
}

new Timer(workerData.workerId, workerData.lifetime);
