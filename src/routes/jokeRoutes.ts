import { Router } from 'express';
import { getJoke, createJoke, getOwnJokeById, deleteJoke, updateJoke } from '../controllers/jokeController';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Joke:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del chiste (generado automáticamente por MongoDB)
 *         text:
 *           type: string
 *           description: Contenido del chiste
 *         author:
 *           type: string
 *           description: Nombre de la persona que escribió el chiste
 *         rating:
 *           type: number
 *           description: Calificación del chiste
 *         category:
 *           type: string
 *           description: Categoría del chiste
 *       required:
 *         - text
 *         - author
 *         - rating
 *         - category
 *       example:
 *         text: ¿Por qué los pájaros no usan Facebook?
 *         author: Anónimo #1
 *         rating: 1
 *         category: Malo
 */

/** 
 * @swagger
 * /api/jokes/{type}:
 *   get:
 *     summary: Obtiene un chiste aleatorio de un tipo específico
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Chuck, Dad, Propio]
 *         description: El tipo de chiste a obtener. Use "Chuck" para chistes de Chuck Norris, "Dad" para chistes de papás, o "Propio" para chistes guardados en la base de datos.
 *     responses:
 *       200:
 *         description: Chiste obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 joke:
 *                   type: string
 *                   description: Contenido del chiste
 *                   example: "¿Por qué los pájaros no usan Facebook? ¡Porque ya tienen Twitter!"
 *       404:
 *         description: No hay chistes disponibles (aplica solo para el tipo "Propio")
 *       400:
 *         description: Parámetro no válido (type no coincide con "Chuck", "Dad" o "Propio")
 */
router.get('/:type', (req, res, next) => {
    getJoke(req, res, next)
})  // GET para obtener chistes


/**
 * @swagger
 * /api/jokes:
 *   post:
 *     summary: Crea un nuevo chiste y lo guarda en la base de datos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Joke'
 *           example:
 *             text: ¿Por qué los pájaros no usan Facebook?
 *             author: Anónimo
 *             rating: 3
 *             category: Malo
 *     responses:
 *       201:
 *         description: Chiste creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                   example: Chiste creado exitosamente
 *                 joke:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID único del chiste
 *                       example: 64b1234567f89a001c4abcd9
 *                     text:
 *                       type: string
 *                       description: Contenido del chiste
 *                     author:
 *                       type: string
 *                       description: Nombre del autor del chiste
 *                     rating:
 *                       type: number
 *                       description: Calificación del chiste
 *                     category:
 *                       type: string
 *                       description: Categoría del chiste
 *       400:
 *         description: Error en los datos enviados en el cuerpo de la solicitud
 */
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
 * /api/jokes/rating/{rating}:
 *   get:
 *     summary: Obtiene todos los chistes por puntaje
 *     parameters:
 *       - in: path
 *         name: rating
 *         required: true
 *         schema:
 *           type: number
 *         description: El puntaje de los chistes
 *     responses:
 *       200:
 *         description: Lista de chistes con el puntaje especificado
 *       404:
 *         description: No se encontraron chistes con este puntaje
 */
router.get('/rating/:rating', (req, res, next) => {
    getJokesByRating(req, res, next);
});  // GET para obtener todos los chistes por puntaje

export default router;

