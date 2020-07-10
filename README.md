# Converge Lite: Converge.io backend-exercise-0.2.3

- This was written on an Ubuntu 20.04 LTS based machine
- Install/run scripts will work in bash shells running on Debian-like/MacOS machines
- They will likely not run on Windows (my apologies)

## Stack

- JS as supported by node 12.16.3
- Testing with Jest + Supertest
- ORM with Sequelize
- Postgres (running in Docker)

## Install

```
$ ./bin/install.sh && npm i
```

Extra things this script does:

- installs Docker

## Run + Test (with Jest)

```
$ npm run seed && npm run test
```

```
docker run -d --rm --name timescaledb -p 5432:5432 -e POSTGRES_PASSWORD=password timescale/timescaledb:latest-pg12
```

## Tools

- Sequelize

- Undo migrations with:

```
sequelize db:migrate:undo:all && \
NODE_ENV=test sequelize db:migrate:undo:all
```

- Created t_sensor_events with:

```
sequelize model:create --name t_sensor_events \
--attributes sensorId:string,time:integer,value:float,alert_high:float,alert_low:float
```

- Created t_sensor_alerts with:

```
sequelize model:create --name t_sensor_alerts \
--attributes sensorId:string,method:string,destination:string
```

- Run migrations with:

```
sequelize db:migrate && \
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
