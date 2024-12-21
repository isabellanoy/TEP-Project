import { Router } from 'express';
import { getJoke, createJoke } from '../controllers/jokeController';

const router = Router();

router.get(':/type', (req, res, next) => {
    getJoke(req, res, next)
})  // GET para obtener chistes
router.post('/', (req, res, next) => {
    createJoke(req, res, next)
})   // POST para crear un chiste



export default router;

