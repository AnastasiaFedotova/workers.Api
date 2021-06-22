import * as Sequelize from 'sequelize';
import dbconfig from './../../configs/dbconfig'

const sequelize = new Sequelize.Sequelize(dbconfig.db_name, dbconfig.user, dbconfig.password, {
  dialect: 'postgres',
  define: {
    timestamps: false
  }
});

sequelize.sync().then(result => {
  console.log(result);
}).catch(err => {
  console.log(err);
})

export default sequelize;
