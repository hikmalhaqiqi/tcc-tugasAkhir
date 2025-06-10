import {Sequelize} from 'sequelize';

const db_surat = new Sequelize('RECOVER_YOUR_DATA', 'root', '', {
    host: '34.133.239.42',
    dialect: 'mysql',
});

export default db_surat;
