docker run -d --rm --name timescaledb -p 5432:5432 -e POSTGRES_PASSWORD=password timescale/timescaledb:latest-pg12 || true && \
npm run wait-port 5432 && sleep 2 && \
cat ./bin/seed.sql | docker exec -i timescaledb psql -U postgres -d postgres