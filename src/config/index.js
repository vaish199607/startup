import dotenv from 'dotenv';

if(process.env.NODE_ENV !== 'prod'){
  const configFile = `.env.${process.env.NODE_ENV}`;
  dotenv.config({ path: configFile });
}
else {
  dotenv.config();
}

export const PORT = process.env.PORT;
export const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING
// export const SERVICE_BUS_CONNECTION_STRING = process.env.SERVICE_BUS_CONNECTION_STRING;
// export const SERVICE_BUS_QUEUE_NAME = process.env.SERVICE_BUS_QUEUE_NAME;
// export const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL