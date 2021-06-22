import Worker from '../db/workerShema';
import WorkerInterface from '../interface/worker';
import WorkerModel from './../models/worker';
import randomSec from './../utils/randomSecond';

async function read(): Promise<Array<WorkerModel>> {
  try {
    return Worker.findAll({raw: true});
  } catch (err) {
    console.log(err)
  }
}

async function add(): Promise<WorkerInterface> {
  try {
    const mlsec = 1000;
    const lifetime = randomSec() * mlsec;
    const dateСreation = new Date();
    const dateDeletion = new Date(dateСreation.getTime() + lifetime);

    const newWorker = {
      dateСreation: dateСreation,
      dateDeletion: dateDeletion,
      status: 'pending'
    }

    return Worker.create(newWorker, { raw: true });
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
  remove
};
