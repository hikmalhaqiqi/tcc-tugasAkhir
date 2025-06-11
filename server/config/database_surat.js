import {Sequelize} from 'sequelize';

const db_surat = new Sequelize('dataSurat', 'root', 'passdatasura', {
    host: '34.44.171.11',
    dialect: 'mysql',
});

export default db_surat;
