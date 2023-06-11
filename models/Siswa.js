import connection from "../config/connection.js"
import { DataTypes } from "sequelize"

const Siswa = connection.define('siswa', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nis: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    kelas: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    jurusan: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    kodeKelas: {
        type: DataTypes.CHAR,
        allowNull: false
    }
}, { tableName: 'siswa', freezeTableName: true, timestamps: false })

export { Siswa }