import { v4 } from 'uuid';
import io from './../app';
import WorkerInterface from '../interface/worker';
import { getRandomSec } from './../utils/randomSecond';
import createWorker from '../workers/createrWorkers';
import { workerRepository } from './../repository/workerRepository';

function read(): Array<WorkerInterface> {
  try {
    return workerRepository.readAllWorkers();
  } catch (err) {
    console.log(err)
  }
}

function readById(id: string): WorkerInterface {
  try {
    return workerRepository.readWorkerbyId(id)
  } catch (err) {
    console.log(err)
  }
}

function add(): WorkerInterface {
  try {
    const mlsec = 1000;
    const minsec = 5;
    const maxsec = 20;
    const lifetime = getRandomSec(minsec, maxsec) * mlsec;
    const dateСreation = new Date();
    const dateDeletion = new Date(dateСreation.getTime() + lifetime);

    const newWorker = {
      id: v4(),
      dateСreation: dateСreation,
      dateDeletion: dateDeletion,
      status: 'pending'
    }

    workerRepository.addWorker(newWorker);

    const worker = createWorker(newWorker.id, lifetime);

    worker.on('message', (res) => {
      io.send(res)
    });

    worker.on('exit', () => {
      workerRepository.removeWorker(newWorker.id);

      io.emit("workerDeath", newWorker.id);
    });

    return newWorker;
  } catch (err) {
    console.log(err)
  }
}

function remove(id: string): null {
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
