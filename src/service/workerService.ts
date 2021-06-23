import { v4 } from 'uuid';
import { Socket } from "socket.io";
import WorkerInterface from '../interface/worker';
import { getRandomSec } from './../utils/randomSecond';
import createWorker from '../workers/createrWorkers';
import { workerRepository } from './../repository/workerRepository';
//import { logsdb } from './../db/logs.memorydb';

function read(): Array<WorkerInterface> {
  try {
    return workerRepository.readAllWorkers();
  } catch (err) {
    console.log(err)
  }
}

function readById(id: number): WorkerInterface {
  try {
    return workerRepository.readWorkerbyId(id)
  } catch (err) {
    console.log(err)
  }
}

function add(io: Socket): WorkerInterface {
  try {
    const mlsec = 1000;
    const minsec = 5;
    const maxsec = 20;
    const lifetime = getRandomSec(minsec, maxsec) * mlsec;
    const logstime = getRandomSec(0, minsec) * mlsec;
    const dateСreation = new Date();
    const dateDeletion = new Date(dateСreation.getTime() + lifetime);

    const newWorker = {
      id: v4(),
      dateСreation: dateСreation,
      dateDeletion: dateDeletion,
      status: 'pending'
    }

    workerRepository.addWorker(newWorker);

    const worker = createWorker(newWorker.id, logstime, lifetime);

    worker.on('message', (res) => {
      if (res.event === 'log') {
        console.log(res);
      } else {
        workerRepository.removeWorker(newWorker.id);
      }

      io.send(res)
    });

    return newWorker;
  } catch (err) {
    console.log(err)
  }
}

function remove(id: number): null {
  try {
    workerRepository.removeWorker(id);
    return null;
  } catch (err) {
    console.log(err)
  }
}

export const workerService = {
  add,
  read,
  readById,
  remove
};
