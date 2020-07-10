'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class t_sensor_alerts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  t_sensor_alerts.init(
    {
      sensorId: DataTypes.STRING,
      method: DataTypes.STRING,
      destination: DataTypes.STRING,
      alertHigh: DataTypes.FLOAT,
      alertLow: DataTypes.FLOAT
    },
    {
      sequelize,
      modelName: 't_sensor_alerts'
    }
  )
  return t_sensor_alerts
}
