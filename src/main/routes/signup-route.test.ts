import request from 'supertest'
import app from '../config/app'

describe('Signup Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'renan',
        email: 'renan@email.com',
        password: '12345678',
        password_confirmation: '12345678'
      })
      .expect(200)
  })
})
