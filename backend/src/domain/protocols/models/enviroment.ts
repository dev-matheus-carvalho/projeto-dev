export interface IEnviroment {
  PORT: string;
  NODE_ENV: 'DEV' | 'PROD' | 'HOMO';
  DB_HOST: string;
  DB_NAME: string;
  DB_USER: string;
  DB_PASS: string;
  DB_PORT: string;
  DB_DIALECT: string;
  JWT_SECRET: string;
  JWT_ALGORITHM: string;
  TZ: string;
  FRONTEND_PRIVATE_KEY: string;
  AES_IV: string;
  AES_KEY: string;
}
