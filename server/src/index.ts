import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import bodyParser from 'body-parser';
import { resolve } from 'path';
import { RouteGenerator } from './routeGenerator';
import { auth } from 'express-oauth2-jwt-bearer';

dotenv.config();

const app = express();
const routeGenerator = new RouteGenerator();
const port = process.env.PORT ?? 3000;

const routesPath = resolve(__dirname, './routes');

const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  tokenSigningAlg: 'RS256',
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jwtCheck);

routeGenerator
  .loadRoutes(app, routesPath)
  .then(() => {
    console.log('[INFO]', 'All routes loaded successfully');
  })
  .catch((err) => {
    console.error('Error loading routes:', err);
  });

sequelize
  .sync()
  .then(() => {
    console.log('[INFO]', 'Database connected');
    app.listen(port, () => {
      console.log('[INFO]', `Server is listening at http://localhost:${port}`);
    });
  })
  .catch((err) => console.error('Unable to connect to database:', err));
