import { Sequelize } from 'sequelize';

const db_admin = new Sequelize('dataAdmin', 'postgres', 'passdataadmin', {
  host: '34.121.136.162',
  dialect: 'postgres',
  port: 5432,
  logging: false,
});

export default db_admin;