import { Sequelize } from 'sequelize';

const db_admin = new Sequelize('DataAdmin', 'postgres', 'tccasikdanmenyenangkan', {
  host: '34.133.117.96',
  dialect: 'postgres',
  port: 5432,
  logging: false,
});

export default db_admin;