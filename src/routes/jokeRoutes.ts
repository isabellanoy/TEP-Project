import { Router } from 'express';
import { getJoke, createJoke, getOwnJokeById, deleteJoke, updateJoke } from '../controllers/jokeController';

const router = Router();

router.get('/:type', (req, res, next) => {
    getJoke(req, res, next)
})  // GET para obtener chistes
router.post('/', (req, res, next) => {
    createJoke(req, res, next)
})   // POST para crear un chiste

/**
 * @swagger
 * components:
 *      schemas:
 *          Joke:
 *              type: object
 *              
 *              properties:
 *                   text:
 *                       type: string
 *                       description: Contenido del chiste
 *                   author:
 *                       type: string
 *                       description: Nombre de la persona que escribió el chiste
 *                  rating:
 *                       type: number
 *                       description: Calificación del chiste
 *                 category:
 *                       type: string
 *                       description: Categoría del chiste
 *               required:
 *                  - text
 *                  - author
 *                  - rating
 *                  - category
 *               example:
 *                   text: ¿Por qué los pájaros no usan Facebook?
 *                   author: Anónimo #1
 *                   rating: 1
 *                   category: Malo
 */

/**
 * @swagger
 * /api/jokes/Propio/{id}:
 *   delete:
 *     summary: Retorna el chiste que se elimino
 *     parameters:
 *         - in: path
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
 *      404:
 *        description: Chiste no encontrado   
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

export default router;

