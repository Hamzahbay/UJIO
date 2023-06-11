import connection from "../config/connection.js"
import { DataTypes } from "sequelize"

const Admin = connection.define('admin', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userKey: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { tableName: 'admin', freezeTableName: true, timestamps: false })

export { Admin }