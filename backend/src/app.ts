import 'reflect-metadata'
import express from 'express';
const app = express();
import createConnection from './database'
import { router } from './routes';


createConnection();
app.use(express.json())
app.use(router)

export { app }