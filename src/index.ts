import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import environment from './utils/environment';
import cors from 'cors';

const swaggerjsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const PORT = environment.PORT;

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'FinanceBro! API',
        version: '1.0.0',
        description: 'API for FinanceBro! Application',
      },
      servers: [
        {
          url: 'https://financebro-backend-958019176719.us-central1.run.app', 
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ['./src/routes/*.ts'], 
  };

const swaggerDocs = swaggerjsdoc(swaggerOptions);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/', router);

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running on http://localhost:${PORT}`);
});