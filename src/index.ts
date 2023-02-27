import { json, urlencoded } from 'body-parser';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import routes from '~/indexes/index-routes';

dotenv.config();
const port = process.env.APP_PORT;

export const app: Application = express();

app.use(
    json(),
    urlencoded({ extended: false }),
);

app.use(routes);

app.listen(port, () => {
    console.log(`Servidor iniciado em: http://localhost:${port}`);
});
