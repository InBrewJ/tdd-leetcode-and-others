\c converge_lite_test;
ALTER TABLE "public".t_sensor_events ADD CONSTRAINT unq_t_sensor_events UNIQUE ( "sensorId", "time" );
\c converge_lite_development;
ALTER TABLE "public".t_sensor_events ADD CONSTRAINT unq_t_sensor_events UNIQUE ( "sensorId", "time" );