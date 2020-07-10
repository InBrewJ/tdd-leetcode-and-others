'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class t_sensor_events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  t_sensor_events.init(
    {
      sensorId: DataTypes.STRING,
      time: DataTypes.BIGINT,
      value: DataTypes.FLOAT
    },
    {
      sequelize,
      modelName: 't_sensor_events'
    }
  )
  return t_sensor_events
}
