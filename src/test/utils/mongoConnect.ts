import { config as configDotenv } from 'dotenv';
configDotenv();

import * as mongoose from 'mongoose';

const MONGO_PORT = process.env.MONGO_PORT || 27017;
const connect = () =>
  new Promise((resolve, reject) =>
    mongoose.connect(
      `mongodb://localhost:${MONGO_PORT}/typegoosetest`,
      {
        server: {
          socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000,
          },
        },
        replset: {
          socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000,
          },
        },
        reconnectTries: 10,
        reconnectInterval: 1000,
      },
      (err) => (err ? reject(err) : resolve())),
  );

export const initDatabase = () =>
  connect().then(() => mongoose.connection.db.dropDatabase());

export const closeDatabase = () =>
  mongoose.connection.close();
