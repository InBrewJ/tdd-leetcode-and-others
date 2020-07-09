# Converge Lite: Converge.io backend-exercise-0.2.3

## Stack

- JS as supported by node 12.16.3
- Testing with Jest + Supertest
- Timescale (based on Postgres - runs in Docker)

```
docker run -d --rm --name timescaledb -p 5432:5432 -e POSTGRES_PASSWORD=password timescale/timescaledb:latest-pg12
```

## Tools

- Sequelize
- Created the table with:

```
sequelize model:create --name t_sensor_events --attributes sensorId:string,time:integer,value:float
```

- Run migrations with:

```
sequelize db:migrate
NODE_ENV=test sequelize db:migrate
```

## Database connection

### Creating the dev database

```
CREATE DATABASE converge_lite_test;
CREATE DATABASE converge_lite_development;
```

## One approach for the 409

ALTER TABLE "public".t_sensor_events ADD CONSTRAINT unq_t_sensor_events UNIQUE ( "sensorId", "time" );
