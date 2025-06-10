import { Sequelize, DataTypes } from "sequelize";
import db_admin from "../config/database_admin.js";


const UserAdmin = db_admin.define('useradmin', {
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    refresh_token:{
        type: DataTypes.TEXT,
    }
},{
    freezeTableName : true
});

export default UserAdmin;