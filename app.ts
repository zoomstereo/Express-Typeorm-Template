import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}

import { connection } from './connection';
import ServerSetup from './server';

connection.create().then(() => {
    new ServerSetup().listen();
})
