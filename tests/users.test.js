const request = require('supertest');
const app = require('../app'); // Expressインスタンス

describe('User API', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        email: 'testuser@example.com',
        name: 'Test User',
      });

    expect(res.statusCode).toEqual(201); // または200、APIの実装に合わせて調整
    expect(res.body).toHaveProperty('email', 'testuser@example.com');
  });

  it('should return all users', async () => {
    const res = await request(app).get('/api/users');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('email');
    expect(res.body[0]).toHaveProperty('name');
  });
});

describe('POST /api/users', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'Test User',
        email: `test${Date.now()}@example.com` // 毎回変わるように
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', 'Test User');
  });
});
