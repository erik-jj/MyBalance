import express from 'express';
import cors from 'cors';
import routerApi from './routes/index.js';


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

app.use(cors(options));

routerApi(app);

app.use(express.json());

app.listen(port, () => {
  console.log(`Running on port: http://localhost:${port}`);
});
