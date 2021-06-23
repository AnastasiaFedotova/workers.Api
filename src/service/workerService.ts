import Worker from '../db/workerShema';
import WorkerInterface from '../interface/worker';
import WorkerModel from './../models/worker';
import { getRandomSec } from './../utils/randomSecond';
import createWorker from '../workers/createrWorkers';

async function read(): Promise<Array<WorkerModel>> {
  try {
    return Worker.findAll({raw: true});
  } catch (err) {
    console.log(err)
  }
}

async function readById(id: number): Promise<WorkerModel> {
  try {
    return Worker.findOne({where: {id: id}})
  } catch (err) {
    console.log(err)
  }
}

async function add(): Promise<WorkerInterface> {
  try {
    const mlsec = 1000;
    const minsec = 5;
    const maxsec = 20;
    const lifetime = getRandomSec(minsec, maxsec) * mlsec;
    const dateСreation = new Date();
    const dateDeletion = new Date(dateСreation.getTime() + lifetime);

    const newWorker = {
      dateСreation: dateСreation,
      dateDeletion: dateDeletion,
      status: 'pending'
    }

    const addedWorker = await Worker.create(newWorker, { raw: true });
    createWorker(addedWorker.id);

    return addedWorker;
  } catch (err) {
    console.log(err)
  }
}

async function remove(id: number): Promise<null> {
  try {
    Worker.update({ status: 'completed' }, { where: { id: id } });
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
