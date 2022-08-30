import { Sequelize } from 'sequelize';
// import { Client } from '@elastic/elasticsearch';
import { DB_CONNECTION_STRING } from '../config/index.js';
// import { ELASTICSEARCH_URL } from '../config/index.js';
export const sequelize = new Sequelize(DB_CONNECTION_STRING, {
    dialect: 'mysql'
});

// export const esClient = new Client({
//     node: ELASTICSEARCH_URL
// })