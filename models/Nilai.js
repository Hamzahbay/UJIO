import connection from "../config/connection.js"
import { DataTypes } from "sequelize"

const Nilai = connection.define('nilai', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nis: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    kodeJadwal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    kodeUjian: {
        type: DataTypes.STRING,
        allowNull: false
    },
    kodeSoal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    jumlahSoal: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    jumlahBenar: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, { tableName: 'Nilai', freezeTableName: true, timestamps: false })

export { Nilai }