import { Model } from 'sequelize';

export default class Worker extends Model {
  id?: number;
  dateСreation: Date;
  dateDeletion: Date;
  status: string;
}
