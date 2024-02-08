// index.test.js for backend API
const request = require('supertest');
const app = require('./index'); // make sure to export your express app

test('CCL_GET', async () => {
  const response = await request(app).get('/ccl_get');
  expect(response.statusCode).toBe(200);
  // other assertions...
});
