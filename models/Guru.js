import connection from "../config/connection.js"
import { DataTypes } from "sequelize"

const Guru = connection.define('guru', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nip: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    tlp: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { tableName: 'guru', freezeTableName: true, timestamps: false })

export { Guru }