import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

import sequelize from './db/database';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

sequelize
  .sync()
  .then(() => {
    console.log('Database is connected');

    app.prepare().then(() => {
      createServer((req, res) => {
        const parsedUrl = parse(req.url!, true);
        handle(req, res, parsedUrl);
      }).listen(port);

      console.log(
        `> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`,
      );
    });
  })
  .catch((err) => {
    console.log(`Database failed to connect with error: ${err}`);
  });
