import { Request, Response, NextFunction } from 'express';
import Joke from '../models/Joke';
import axios from 'axios';

export const getJoke = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { type } = req.params;

    if (type === 'Chuck') {
      const response = await axios.get('https://api.chucknorris.io/jokes/random');
      return res.json({ joke: response.data.value });
    }

    if (type === 'Dad') {
      const response = await axios.get('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } });
      return res.json({ joke: response.data.joke });
    }

    if (type === 'Propio') {
      const jokes = await Joke.find();
      if (jokes.length === 0) {
        return res.status(404).json({ message: 'Aún no hay chistes, crea uno' });
      }
      return res.json({ joke: jokes[Math.floor(Math.random() * jokes.length)] });
    }

    return res.status(400).json({ error: 'Parámetro no válido. Use "Chuck", "Dad" o "Propio".' });
  } catch (error) {
    next(error);
  }
};

export const createJoke = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { text, author, rating, category } = req.body;
    const newJoke = new Joke({ text, author, rating, category });
    await newJoke.save();

    return res.status(201).json({
      message: 'Chiste creado exitosamente',
      joke: {
        id: newJoke._id,
        text: newJoke.text,
        author: newJoke.author,
        rating: newJoke.rating,
        category: newJoke.category,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getJokeById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { id } = req.params;
        const joke = await Joke.findById(id);
        if (!joke) {
            return res.status(404).json({ message: 'Chiste no encontrado' });
        }
        return res.status(201).json({ 
            message: 'Chiste encontrado', 
            joke: { 
                id: joke._id, 
                text: joke.text, 
                author: joke.author, 
                rating: joke.rating, 
                category: joke.category, 
            }, 
        });
    } catch (error) {
        next(error);
    }
};