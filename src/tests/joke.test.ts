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
