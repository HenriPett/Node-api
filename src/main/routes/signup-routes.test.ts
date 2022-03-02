import request from 'supertest'
import app from '../config/app'

describe('Signup Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'name',
        email: 'email@example.com',
        password: 'password',
        passwordConfirmation: 'password'
      })
      .expect(200)
  })
})
