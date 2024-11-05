import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

const config = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'ivank',
    password: '123',
    database: 'lastMedium',
    entities: [__dirname+'/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/src/migrations/**/*.ts']
}

export default config;