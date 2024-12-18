import express from 'express';
import dotenv from 'dotenv';
import sequelize from '@/db/config/database';
import bodyParser from 'body-parser';
import { resolve } from 'path';
import { RouteGenerator } from '@/routeGenerator';

dotenv.config();

const app = express();
const routeGenerator = new RouteGenerator();
const port = process.env.PORT ?? 3000;

const routesPath = resolve(__dirname, './routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routeGenerator
  .loadRoutes(app, routesPath)
  .then(() => {
    console.log('[INFO]', 'All routes loaded successfully');
  })
  .catch((err) => {
    console.error('Error loading routes:', err);
  });

app.listen(port, () => {
  console.log('[INFO]', `Server is listening at http://localhost:${port}`);
});

sequelize
  .sync()
  .then(() => {
    console.log('[INFO]', 'Database connected');
  })
  .catch((err) => {
    console.error('Unable to connect to database:', err);
  });
