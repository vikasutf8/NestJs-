import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'newpassword',
  database: process.env.DB_NAME || 'blog_nestjs',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};

const AppDataSource = new DataSource(config);

export { AppDataSource };

export default config;
