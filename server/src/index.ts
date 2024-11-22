import express, { Express } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import sequelize from './config/database';
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

sequelize
  .sync()
  .then(() => {
    console.log('[INFO]', 'Database connected');
    app.listen(port, () => {
      console.log('[INFO]', `Server is listening at http://localhost:${port}`);
    });
  })
  .catch((err) => console.error('Unable to connect to database:', err));
