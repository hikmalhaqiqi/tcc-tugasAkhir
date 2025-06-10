import { Sequelize } from "sequelize";
import db_surat from "../config/database_surat.js";

const { DataTypes } = Sequelize;

const DataSurat = db_surat.define('datasurat', {

    nama_kegiatan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rincian_kegiatan: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    program_studi: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tanggal_jam_mulai: {
        type: DataTypes.DATE,
        allowNull: false
    },
    tanggal_jam_selesai: {
        type: DataTypes.DATE,
        allowNull: false
    },
    file_pendukung_url: {
        type: DataTypes.STRING,
        allowNull: null // bisa null dulu jika belum di-upload
    },

    status: {
    type: DataTypes.ENUM('pending', 'diterima', 'ditolak'),
    defaultValue: 'pending',
    allowNull: false
    },
    keterangan: {
        type: DataTypes.TEXT,
        allowNull: true
    }

},{
    freezeTableName: true
});

export default DataSurat;