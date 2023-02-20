import * as dotenv from 'dotenv';

dotenv.config();

const { env } = process;

export const getConfig = () => config;

export const config = {
  env: env.NODE_ENV,
  port: env.PORT || 404,
  databases: {
    mysql: {
      host: env.MYSQL_HOST,
      port: +env.MYSQL_PORT,
      username: env.MYSQL_USER,
      password: env.MYSQL_PASS,
      database: env.MYSQL_NAME,
    },
  },
  aws: {
    region: env.AWS_REGION,
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    publicBucketName: env.AWS_PUBLIC_BUCKET_NAME,
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
  },
};
