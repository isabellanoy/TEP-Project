import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import Joke from '../models/Joke';
import axios from 'axios';

jest.mock('../models/Joke'); // Mockea el modelo
jest.mock('axios'); // Mockea axios

beforeAll(() => {
  (Joke.findById as jest.Mock).mockResolvedValue({
    _id: '6776b6d08f3bd6e8288a2fd9',
    text: 'Why did the chicken cross the road? To get to the other side!',
    author: 'Anonymous',
    rating: 4.5,
    category: 'Dad Jokes',
  });
})

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Jokes API', () => {
  it('should return a Chuck Norris joke', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        value: 'Chuck Norris can divide by zero.',
      },
    });
    const res = await request(app).get('/api/jokes/Chuck');
    expect(res.statusCode).toBe(200);
    expect(res.body.joke).toBeDefined();
  });

  it('should return a Dad joke', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        joke: 'What do you call a fake noodle? An Impasta.',
      },
    });
    const res = await request(app).get('/api/jokes/Dad');
    expect(res.statusCode).toBe(200);
    expect(res.body.joke).toBeDefined();
  });
});

describe('CRUD Jokes', () => {
    const jokeId = '6776b6d08f3bd6e8288a2fd9';
  
    it('should return a joke by ID', async () => {
        const res = await request(app).get(`/api/jokes/Propio/${jokeId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.joke.id).toBe(jokeId);
    });
  
    it('should delete a joke by ID', async () => {
      (Joke.findByIdAndDelete as jest.Mock).mockResolvedValue({
        _id: jokeId,
        text: 'This is a joke to be deleted',
        author: 'Test Author',
        rating: 4,
        category: 'Funny',
      });
        const res = await request(app).delete(`/api/jokes/Propio/${jokeId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.joke.id).toBe(jokeId);
    });
  
    it('should update a joke by ID', async () => {
      (Joke.findByIdAndUpdate as jest.Mock).mockResolvedValue({
          _id: jokeId,
          text: 'Updated joke text',
          author: 'Updated Author',
          rating: 5,
          category: 'Updated Category',
        });
        const res = await request(app).put(`/api/jokes/Propio/${jokeId}`).send();
        expect(res.statusCode).toBe(201);
        expect(res.body.joke.id).toBe(jokeId);
    });
});

describe('Jokes API - Get Joke Count by Category', () => {
  const category = 'Malo';

  it('should return the count of jokes for a given category', async () => {
    // Mock de la respuesta de countDocuments
    (Joke.countDocuments as jest.Mock).mockResolvedValue(5);

    const res = await request(app).get(`/api/jokes/count/${category}`);

    // Validar la respuesta
    expect(res.statusCode).toBe(200);
    expect(res.body.category).toBe(category);
    expect(res.body.count).toBe(5);
  });

  it('should return 404 if no jokes are found for the given category', async () => {
    // Mock para el caso en el que no se encuentran chistes
    (Joke.countDocuments as jest.Mock).mockResolvedValue(0);

    const res = await request(app).get(`/api/jokes/count/${category}`);

    // Validar la respuesta
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('No se encontraron chistes para esta categoría');
  });

  it('should handle errors gracefully', async () => {
    // Mock para simular un error
    (Joke.countDocuments as jest.Mock).mockRejectedValue(new Error('Database error'));

    const res = await request(app).get(`/api/jokes/count/${category}`);

    // Validar la respuesta
    expect(res.statusCode).toBe(500);
  });
});

describe('Jokes API - Get Jokes by Rating', () => {
  const rating = 5;

  it('should return jokes with the specified rating', async () => {
    // Mock de la respuesta de find
    const mockJokes = [
      { _id: '1', text: 'Joke 1', author: 'Author 1', rating: 5, category: 'Funny' },
      { _id: '2', text: 'Joke 2', author: 'Author 2', rating: 5, category: 'Funny' },
    ];
    (Joke.find as jest.Mock).mockResolvedValue(mockJokes);

    // Llamar a la ruta
    const res = await request(app).get(`/api/jokes/rating/${rating}`);

    // Validar la respuesta
    expect(res.statusCode).toBe(200);
    expect(res.body.jokes).toHaveLength(mockJokes.length);
    expect(res.body.jokes[0].rating).toBe(rating);
    expect(res.body.jokes[1].rating).toBe(rating);
  });

  it('should return 404 if no jokes are found with the specified rating', async () => {
    // Mock para el caso sin resultados
    (Joke.find as jest.Mock).mockResolvedValue([]);

    // Llamar a la ruta
    const res = await request(app).get(`/api/jokes/rating/${rating}`);

    // Validar la respuesta
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('No se encontraron chistes con este puntaje');
  });

  it('should handle errors gracefully', async () => {
    // Mock para simular un error
    (Joke.find as jest.Mock).mockRejectedValue(new Error('Database error'));

    // Llamar a la ruta
    const res = await request(app).get(`/api/jokes/rating/${rating}`);

    // Validar la respuesta
    expect(res.statusCode).toBe(500); 
  });
});