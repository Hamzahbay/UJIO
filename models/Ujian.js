import connection from "../config/connection.js"
import { DataTypes } from "sequelize"

const Ujian = connection.define('ujian', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    kodeJadwal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    kodeSoal: {
        type: DataTypes.JSON,
        allowNull: false
    },
    ujian: {
        type: DataTypes.JSON,
        allowNull: false
    },
    no: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, { tableName: 'ujian', freezeTableName: true, timestamps: false })

export { Ujian }