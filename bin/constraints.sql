\c converge_lite_test;
ALTER TABLE "public".t_sensor_events ADD CONSTRAINT unq_t_sensor_events UNIQUE ( "sensorId", "time" );
ALTER TABLE "public".t_sensor_alerts ADD CONSTRAINT unq_t_sensor_alerts_sensorid UNIQUE ( "sensorId" ); 
\c converge_lite_development;
ALTER TABLE "public".t_sensor_events ADD CONSTRAINT unq_t_sensor_events UNIQUE ( "sensorId", "time" );
ALTER TABLE "public".t_sensor_alerts ADD CONSTRAINT unq_t_sensor_alerts_sensorid UNIQUE ( "sensorId" ) ;