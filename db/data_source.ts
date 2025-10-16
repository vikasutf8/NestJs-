import { DataSource,DataSourceOptions } from "typeorm"
import * as dotenv from 'dotenv'
dotenv.config();


export const AppDataSource = new DataSource({
type: "postgres",
host: process.env.DATABASE_HOST!,
port: parseInt(process.env.DATABASE_PORT!) || 5432,
username: process.env.DATABASE_USER!,
password: process.env.DATABASE_PASSWORD!,
database: process.env.DATABASE_NAME!,
entities:['dist/**/*.entity{.ts,.js}'],
migrations:['dist/db/migrations/*{.ts,.js}'],
logging: false,
synchronize: true, // use only in development not in production
})

