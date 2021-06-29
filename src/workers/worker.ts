import { workerData, parentPort } from 'worker_threads';
import { getRandomSec } from './../utils/randomSecond';
const randomText = 'random text';

class Timer {
  mlsec = 1000;
  logstime = getRandomSec(1, 5) * this.mlsec;
  currentCountLogs = 0;
  IntervalLog: NodeJS.Timeout;

  constructor(public workerId: string, public lifetime: number) {
    const destLog = lifetime / this.logstime;

    this.IntervalLog = setInterval(() => {
      this.getLog(destLog)
    }, this.logstime);

    this.getLog(destLog);
    this.currentCountLogs++;
  }

  getLog(destLog: number) {
    const newLog = {
      workerId: this.workerId,
      logMessages: `${(new Date()).toISOString().split('T')[0]} ${randomText}`
    }

    parentPort.postMessage(newLog);

    this.checkDestCountLog(destLog);
    this.currentCountLogs++;
  }

  stopWorker() {
    clearInterval(this.IntervalLog);
    process.exit();
  }

  checkDestCountLog(destLog: number) {
    if (this.currentCountLogs > destLog) {
      this.stopWorker();
    }
  }
}

new Timer(workerData.workerId, workerData.lifetime);
