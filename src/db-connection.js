const Sequelize = require('sequelize')

// const sequelize = new Sequelize(
//   'postgres://user:password@db/db',
//   'username',
//   'password', {
//     host: 'localhost',
//     dialect: 'postgres',
//     pool: {
//       max: 5,
//       min: 0,
//       idle: 10000
//     }
//   }
// )

const sequelize = new Sequelize('postgres://user:pass@example.com:5432/ms-crm-agency-service')

sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err))

module.exports = sequelize
