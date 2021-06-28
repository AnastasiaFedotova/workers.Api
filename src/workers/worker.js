"use strict";
exports.__esModule = true;
var worker_threads_1 = require("worker_threads");
var randomSecond_1 = require("./../utils/randomSecond");
var randomText = 'random text';
var Timer = (function () {
    var mlsrc = 1000;
    var logstime = randomSecond_1.getRandomSec(1, 5) * mlsrc;
    var currentCountLogs = 0;
    var IntervalLog;
    function Timer(workerId, lifetime) {
        var destLog = lifetime / logstime;
        console.log("workerId: " + workerId + " destLog: " + destLog, "logtime: " + logstime, "lifetime: " + lifetime);
        IntervalLog = setInterval(function () {
            var newLog = {
                workerId: workerId,
                logMessages: (new Date()).toISOString().split('T')[0] + " " + randomText
            };
            worker_threads_1.parentPort.postMessage(newLog);
            checkDestCountLog(destLog);
            currentCountLogs++;
        }, logstime);
    }
    function checkDestCountLog(destLog) {
        console.log("currentCountLogs: " + currentCountLogs, "destLog: " + destLog);
        if (currentCountLogs > destLog) {
            clearInterval(IntervalLog);
            process.exit();
        }
    }
    return Timer;
}());
new Timer(worker_threads_1.workerData.workerId, worker_threads_1.workerData.lifetime);
