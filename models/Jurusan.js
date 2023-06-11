import connection from "../config/connection.js"
import { DataTypes } from "sequelize"

const Jurusan = connection.define('jurusan', {
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
    }
}, { tableName: 'jurusan', freezeTableName: true, timestamps: false })

export { Jurusan }