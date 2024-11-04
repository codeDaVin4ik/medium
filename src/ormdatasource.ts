import { DataSource, DataSourceOptions } from 'typeorm';
import ormconfig from '../ormconfig';

export default new DataSource(ormconfig as DataSourceOptions);
