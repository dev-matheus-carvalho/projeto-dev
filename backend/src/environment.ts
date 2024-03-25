import * as dotenv from 'dotenv';
import { IEnviroment } from './domain/protocols/models/enviroment';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: `${process.cwd()}/environments/prod` });
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: `${process.cwd()}/src/environments/test` });
} else if (process.env.NODE_ENV === 'homologation') {
  dotenv.config({ path: `${process.cwd()}/environments/homo` });
} else {
  dotenv.config({ path: `${process.cwd()}/src/environments/dev` });
}

export const environments: IEnviroment = {
  PORT: process.env.PORT ?? '',
  NODE_ENV: (process.env.NODE_ENV as 'DEV' | 'HOMO' | 'PROD') ?? 'DEV',
  DB_HOST: process.env.DB_HOST ?? '',
  DB_NAME: process.env.DB_NAME ?? '',
  DB_USER: process.env.DB_USER ?? '',
  DB_PASS: process.env.DB_PASS ?? '',
  DB_PORT: process.env.DB_PORT ?? '',
  DB_DIALECT: process.env.DB_DIALECT ?? '',
  JWT_SECRET: process.env.JWT_SECRET ?? '',
  JWT_ALGORITHM: process.env.JWT_ALGORITHM ?? '',
  TZ: process.env.TZ ?? '',
  FRONTEND_PRIVATE_KEY: process.env.FRONTEND_PRIVATE_KEY ?? '',
  AES_IV: process.env.AES_IV ?? '',
  AES_KEY: process.env.AES_KEY ?? '',
};
