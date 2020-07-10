'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('t_sensor_alerts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sensorId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      method: {
        allowNull: false,
        type: Sequelize.STRING
      },
      destination: {
        allowNull: false,
        type: Sequelize.STRING
      },
      alertHigh: {
        type: Sequelize.FLOAT
      },
      alertLow: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('t_sensor_alerts')
  }
}
