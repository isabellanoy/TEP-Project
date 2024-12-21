import express from 'express';
import jokeRoutes from './routes/jokeRoutes';
import { setupSwagger } from './swagger';

const app = express();

app.use(express.json());

app.use('/api/jokes', jokeRoutes);

// Configurar Swagger para documentación de la API
setupSwagger(app);

export default app;

