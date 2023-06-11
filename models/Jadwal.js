import connection from "../config/connection.js"
import { DataTypes } from "sequelize"

const Jadwal = connection.define('jadwal', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nilai: {
        type: DataTypes.STRING,
        allowNull: false
    },
    kodeMapel: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paket: {
        type: DataTypes.JSON,
        allowNull: false
    },
    tanggal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    kelas: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    jam: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { tableName: 'jadwal', freezeTableName: true, timestamps: false })

export { Jadwal }