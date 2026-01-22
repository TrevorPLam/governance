import request from 'supertest';
import app from '../src/server';

describe('Health Endpoint', () => {
  it('should return 200 and health status', async () => {
    const response = await request(app).get('/health');
    
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('uptime');
  });
});

describe('API Root', () => {
  it('should return API information', async () => {
    const response = await request(app).get('/api');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('version');
    expect(response.body).toHaveProperty('endpoints');
  });
});

describe('Users API', () => {
  it('should get all users', async () => {
    const response = await request(app).get('/api/users');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get user by ID', async () => {
    const response = await request(app).get('/api/users/1');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
  });

  it('should return 404 for non-existent user', async () => {
    const response = await request(app).get('/api/users/999');
    
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'User not found');
  });

  it('should create new user', async () => {
    const newUser = {
      name: 'Charlie',
      email: 'charlie@example.com'
    };
    
    const response = await request(app)
      .post('/api/users')
      .send(newUser);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
  });

  it('should validate required fields when creating user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Test' });
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should validate email format', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Test', email: 'invalid-email' });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toContain('email');
  });
});

describe('404 Handler', () => {
  it('should return 404 for undefined routes', async () => {
    const response = await request(app).get('/non-existent-route');
    
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Not found');
  });
});
