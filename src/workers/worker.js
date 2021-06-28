"use strict";
exports.__esModule = true;
var worker_threads_1 = require("worker_threads");
var randomSecond_1 = require("./../utils/randomSecond");
var randomText = 'random text';
var Timer = /** @class */ (function () {
    function Timer(workerId, lifetime) {
        var _this = this;
        this.workerId = workerId;
        this.lifetime = lifetime;
        this.mlsec = 1000;
        this.logstime = randomSecond_1.getRandomSec(1, 5) * this.mlsec;
        this.currentCountLogs = 0;
        var destLog = lifetime / this.logstime - 1;
        this.IntervalLog = setInterval(function () {
            _this.getLog(destLog);
        }, this.logstime);
        this.getLog(destLog);
    }
    Timer.prototype.getLog = function (destLog) {
        var newLog = {
            workerId: this.workerId,
            logMessages: (new Date()).toISOString().split('T')[0] + " " + randomText
        };
        worker_threads_1.parentPort.postMessage(newLog);
        this.checkDestCountLog(destLog);
        this.currentCountLogs++;
    };
    Timer.prototype.checkDestCountLog = function (destLog) {
        if (this.currentCountLogs > destLog) {
            clearInterval(this.IntervalLog);
            process.exit();
        }
    };
    return Timer;
}());
new Timer(worker_threads_1.workerData.workerId, worker_threads_1.workerData.lifetime);
