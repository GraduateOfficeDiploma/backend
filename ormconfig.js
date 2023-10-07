// eslint-disable-next-line @typescript-eslint/no-var-requires
const { SnakeNamingStrategy } = require('typeorm-naming-strategies');

module.exports = {
    type: 'postgres',
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    entities: ['dist/**/*.entity{.ts,.js}'],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
    ssl: { rejectUnauthorized: false },
};
