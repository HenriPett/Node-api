/* eslint-disable no-undef */
import { SignupController } from './signup'

describe('Signup Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SignupController() // sut is System under test
    const httpRequest = {
      body: {
        email: 'email@mail.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const httpRespnse = sut.handle(httpRequest)
    expect(httpRespnse.statusCode).toBe(400)
    expect(httpRespnse.body).toEqual(new Error('Missing parameter name')) // toEqual verifica somente o valor, toBe verifica ponteiro tb
  })

  test('Should return 400 if no email is provided', () => {
    const sut = new SignupController() // sut is System under test
    const httpRequest = {
      body: {
        name: 'name',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const httpRespnse = sut.handle(httpRequest)
    expect(httpRespnse.statusCode).toBe(400)
    expect(httpRespnse.body).toEqual(new Error('Missing parameter email'))
  })
})
