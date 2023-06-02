import express from 'express';
import path from 'path'
// eslint-disable-next-line import/no-extraneous-dependencies, node/no-extraneous-import
import bodyParser from 'body-parser'

import tourRouter from './resources/tour/tour.router.js';
import scheduleRouter from './resources/schedule/schedule.router.js';
import priceRouter from './resources/price/price.router.js'

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const __dirname = path.resolve()

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'src/ejs'));

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.render(path.resolve(__dirname, 'src/ejs', 'main.ejs'));
    return;
  }
  next();
});

app.use('/tours', tourRouter)
app.use('/schedules', scheduleRouter)
app.use('/prices', priceRouter)

export default app;
