const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/index.js');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

const port = process.env.PORT || 3000;
const app = express();

//cors config
const whitelist = ['http://localhost:8080'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  },
};
app.use(express.json());

app.use(cors(options));

routerApi(app);
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Running on port: http://localhost:${port}`);
});
