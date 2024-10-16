import { ConfigService } from 'src/config/config.service';
import { DataSource , DataSourceOptions} from 'typeorm';


export const datasourceOptions: DataSourceOptions = {
        type: 'postgres',
        host: ConfigService.getValue('POSTGRES_HOST'),
        port: parseInt(ConfigService.getValue('POSTGRES_PORT')),
        username: ConfigService.getValue('POSTGRES_USER'),
        password: ConfigService.getValue('POSTGRES_PASSWORD'),
        database: ConfigService.getValue('POSTGRES_DB'),
        schema: ConfigService.getValue('POSTGRES_SCHEMA'),
        entities: ['dist/**/*.entity.js'], 
        migrations: ['dist/datasources/migrations/*.js'],
        migrationsTableName: "migrations_typeorm",
        synchronize: false,
};
const JobPortalDataSource = new DataSource(datasourceOptions)
export default JobPortalDataSource;