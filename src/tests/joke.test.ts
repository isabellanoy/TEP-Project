import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Jokes API', () => {
  it('should return a Chuck Norris joke', async () => {
    const res = await request(app).get('/api/jokes/Chuck');
    expect(res.statusCode).toBe(200);
    expect(res.body.joke).toBeDefined();
  });

  it('should return a Dad joke', async () => {
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
        const res = await request(app).delete(`/api/jokes/Propio/${jokeId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.joke.id).toBe(jokeId);
    });
  
    it('should update a joke by ID', async () => {
        const res = await request(app).put(`/api/jokes/Propio/${jokeId}`).send();
        expect(res.statusCode).toBe(201);
        expect(res.body.joke.id).toBe(jokeId);
    });
});