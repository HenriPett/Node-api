/* eslint-disable no-undef */
import { SignupController } from './signup'

describe('Signup Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SignupController() // sut is System under test
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@mail.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const httpRespnse = sut.handle(httpRequest)
    expect(httpRespnse.statusCode).toBe(400)
  })
})
