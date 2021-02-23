import 'reflect-metadata'
import express from 'express';
const app = express();
import './database'
import { router } from './routes';

app.use(express.json())
app.use(router)
app.listen(3333, () => console.log("servidor is running now!"))
