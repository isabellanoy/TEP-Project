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