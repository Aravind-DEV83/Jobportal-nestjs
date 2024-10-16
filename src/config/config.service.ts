import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

export class ConfigService {
    private static env: { [k: string]: string | undefined };

    static getValue(key: string, throwOnMissing = true): string {
        const value = process.env[key];
        if (!value && throwOnMissing) {
        throw new Error(`Config error - missing env.${key}`);
        }
        return value;
    }

    static getPort() {
        return parseInt(this.getValue('PORT'));
    }

    static isProduction() {
        const mode = this.getValue('NODE_ENV');
        return mode != 'DEV';
    }

    static getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
        type: 'postgres',
        host: this.getValue('POSTGRES_HOST'),
        port: parseInt(this.getValue('POSTGRES_PORT')),
        username: this.getValue('POSTGRES_USER'),
        password: this.getValue('POSTGRES_PASSWORD'),
        database: this.getValue('POSTGRES_DB'),
        schema: this.getValue('POSTGRES_SCHEMA'),
        entities: ['dist/**/*.entity.js'],
        migrations: ['dist/db/migrations/*.js'],
        migrationsTableName: "migrations_typeorm",
        migrationsRun: true,
        synchronize: false
        };
    }
}
