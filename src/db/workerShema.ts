import * as Sequelize from "sequelize";
import sequelize from "./db";
import Worker from "../models/worker";

Worker.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    dateСreation: {
      type: Sequelize.DATE,
      allowNull: false
    },
    dateDeletion: {
      type: Sequelize.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'workers',
  }
);

export default Worker;
