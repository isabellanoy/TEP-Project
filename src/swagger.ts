import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi, { serve } from 'swagger-ui-express';
import { Express } from 'express';
import path from 'path';

export const setupSwagger = (app: Express) => {
  const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API de Chistes',
        version: '1.0.0',
        description: 'Una API para obtener y crear chistes',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: [path.join(__dirname, './routes/*.ts')],  
  };

  const swaggerSpec = swaggerJSDoc(options);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
