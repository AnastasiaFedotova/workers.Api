const path = require('path');
const { workerData } = require('worker_threads');

require('ts-node').register();
// eslint-disable-next-line no-undef
require(path.resolve(__dirname, workerData.path));

