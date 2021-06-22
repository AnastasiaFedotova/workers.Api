import { Router } from 'express';
import workersApi from './workersApi';

const api = Router();

api.use('/v1/workers', workersApi);

export default api;
