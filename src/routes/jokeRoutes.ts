import { Router } from 'express';
import { getJoke, createJoke, getOwnJokeById, deleteJoke } from '../controllers/jokeController';

const router = Router();

router.get('/:type', (req, res, next) => {
    getJoke(req, res, next)
})  // GET para obtener chistes
router.post('/', (req, res, next) => {
    createJoke(req, res, next)
})   // POST para crear un chiste
router.delete('/Propio/:id', (req, res, next) => {
    deleteJoke(req, res, next)
})  // DELETE para borrar un chiste
router.get('/Propio/:id', (req, res, next) => {
    getOwnJokeById(req, res, next)
})  // GET para obtener un chiste por su ID


export default router;

