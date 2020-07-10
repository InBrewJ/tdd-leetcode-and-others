npm run sequelize db:migrate && \
NODE_ENV=test npm run sequelize db:migrate
cat ./bin/constraints.sql | docker exec -i timescaledb psql -U postgres -d postgres