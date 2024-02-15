// index.test.js for backend API
const request = require('supertest');
const app = require('./App');

test('CCL_GET', async () => {
  const response = await request(app).get('/ccl_get');
  expect(response.statusCode).toBe(200);
}, 10000);
