import express from 'express';
const port = process.env.PORT || 3000;

const app = express();

app.listen(port);
app.use(express.json());
console.log('Server on port: ', port);
