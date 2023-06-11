import connection from "../config/connection.js"
import { DataTypes } from "sequelize"

const Kelas = connection.define('kelas', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    tingkat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    jurusan: {
        type: DataTypes.JSON,
        allowNull: false
    },
    kelas: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { tableName: 'kelas', freezeTableName: true, timestamps: false })

export { Kelas }