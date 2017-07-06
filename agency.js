const Sequelize = require('sequelize')
const sequelize = require('./db-connection')

UUIDV4

const Agency = sequelize.define('agency', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  commercialStatus: {
    type:  Sequelize.ENUM,
    values: ['inactive', 'customer', 'prospect', 'old customer'],
    allowNull: false,
    defaultValue: 'inactive'
  },
  activities: {

  },
  lat_lng: {
    type: Sequelize.GEOGRAPHY,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING
  },
  author_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  responsible_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

/*
// force: true will drop the table if it already exists
User.sync({ force: true }).then(() => {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  })
})
*/

module.exports = Agency
