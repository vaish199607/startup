import express from 'express';
// import { ServiceBusClient } from '@azure/service-bus';
import { expressApp } from './express-app.js'
import { PORT } from './config/index.js';
// import { SERVICE_BUS_CONNECTION_STRING, SERVICE_BUS_QUEUE_NAME } from './config/index.js';
import { sequelize } from './database/index.js'
// import { sequelize, esClient } from './database/index.js'
import { ErrorLogger } from './utils/logger.js';

async function StartServer() {

  try{
    const app = express();

    // const producer = await createSender();

    await sequelize.sync({
      force: false,
      alter: false
    });

    expressApp({ app });

    // expressApp({ app, producer, esClient });

    app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    })
  }
  catch(err) {
    const logger = new ErrorLogger();
    logger.error(err);
  }

}

// async function createSender(){
//   const serviceBusClient = new ServiceBusClient(SERVICE_BUS_CONNECTION_STRING);
//   return serviceBusClient.createSender(SERVICE_BUS_QUEUE_NAME);
// }

await StartServer();