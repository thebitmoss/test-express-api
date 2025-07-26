const request = require('supertest');
const app = require('../app'); // Expressインスタンス
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// テーブル初期化
beforeEach(async () => {
  await prisma.user.deleteMany()
})

// ユーザー登録API
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

// ユーザー一覧取得API
describe('User API', () => {
  it('should return all users', async () => {
    await prisma.user.create({
      data: {
        name: 'UserForGetTest',
        email: `getuser${Date.now()}@example.com`,
      },
    });
    const res = await request(app).get('/api/users');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('email');
    expect(res.body[0]).toHaveProperty('name');
  });
});
