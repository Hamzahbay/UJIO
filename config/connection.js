import { Sequelize } from "sequelize"

const connection = new Sequelize('client_ujio', 'root', '', { host: 'localhost', dialect: 'mariadb' })

connection.authenticate().then(res => console.log(`Database Connected!`)).catch(err => console.log(err))

export default connection