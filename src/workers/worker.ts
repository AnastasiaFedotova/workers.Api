import { workerData, parentPort } from 'worker_threads';

const randomText = 'random text';

const timer = (workerId: number, logstime: number, lifetime: number): void => {
  let countLogs = 0;

  const IntervalLog = setInterval(() => {
    console.log('countlog: ' + countLogs)
    countLogs += logstime;

    const newLog = {
      workerId: workerId,
      logMessages: randomText
    }

    parentPort.postMessage({
      event: 'log',
      value: newLog
    });

    checkTimeLife();
  }, logstime)

  function checkTimeLife() {
    if (countLogs > lifetime) {
      clearInterval(IntervalLog);

      parentPort.postMessage({
        event: 'life',
        value: false
      });
    }
  }
}

timer(workerData.workerId, workerData.logstime, workerData.lifetime);
