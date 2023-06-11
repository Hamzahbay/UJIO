import connection from "../config/connection.js"
import { DataTypes } from "sequelize"

const Mapel = connection.define('matapelajaran', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
    kode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    jurusan: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, { tableName: 'matapelajaran', freezeTableName: true, timestamps: false })

export { Mapel }