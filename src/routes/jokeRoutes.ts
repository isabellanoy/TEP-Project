import { Router } from 'express';
import { getJoke, createJoke, getOwnJokeById, deleteJoke, updateJoke, getJokeCountByCategory } from '../controllers/jokeController';

const router = Router();

router.get('/:type', (req, res, next) => {
    getJoke(req, res, next)
})  // GET para obtener chistes
router.post('/', (req, res, next) => {
    createJoke(req, res, next)
})   // POST para crear un chiste

/**
 * @swagger
 * /api/jokes/Propio/{id}:
 *   delete:
 *     summary: Retorna el chiste que se elimino
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *             type: string
 *         description: ID del chiste
 *     responses:
 *       200:
 *         description: Chiste eliminado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'        
 *       404:
 *         description: Chiste no encontrado   
 */
router.delete('/Propio/:id', (req, res, next) => {
    deleteJoke(req, res, next)
})  // DELETE para borrar un chiste

/**
 * @swagger
 * /api/jokes/Propio/{id}:
 *   get:
 *     summary: Obtiene un chiste por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del chiste
 *     responses:
 *       200:
 *         description: Chiste obtenido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       404:
 *         description: Chiste no encontrado
 */
router.get('/Propio/:id', (req, res, next) => {
    getOwnJokeById(req, res, next)
})  // GET para obtener un chiste por su ID

/**
 * @swagger
 * /api/jokes/Propio/{id}:
 *   put:
 *     summary: Actualiza un chiste por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del chiste
 *     responses:
 *       200:
 *         description: Chiste actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       404:
 *         description: Chiste no encontrado
 */
router.put('/Propio/:id', (req, res, next) => {
    updateJoke(req, res, next)
})  // PUT para actualizar un chiste

/**
 * @swagger
 * /api/jokes/count/{category}:
 *   get:
 *     summary: Obtiene la cantidad de chistes por categoría
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Categoría del chiste
 *     responses:
 *       200:
 *         description: Cantidad de chistes por categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                   description: Cantidad de chistes
 *       404:
 *         description: Categoría no encontrada
 */
router.get('/count/:category', (req, res, next) => {
    getJokeCountByCategory(req, res, next);
});  // GET para obtener la cantidad de chistes por categoría


export default router;

