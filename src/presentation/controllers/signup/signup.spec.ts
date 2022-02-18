/* eslint-disable no-undef */
import { SignupController } from './signup'
import { MissingParamError, InvalidParamError, ServerError } from '../..'
import { EmailValidator, AddAccount, AddAccountModel } from './signup-protocols'
import { AccountModel } from '../../domain/models/account'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string) :boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add (account: AddAccountModel): AccountModel {
      const fakeAccount = {
        id: 'valid_id',
        name: 'name',
        email: 'email@mail.com',
        password: 'password'
      }
      return fakeAccount
    }
  }
  return new AddAccountStub()
}

interface SutTypes {
  sut: SignupController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccount()
  const sut = new SignupController(emailValidatorStub, addAccountStub)
  return {
    sut,
    emailValidatorStub,
    addAccountStub
  }
}

describe('Signup Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const { sut } = makeSut() // sut is System under test
    const httpRequest = {
      body: {
        email: 'email@mail.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name')) // toEqual verifica somente o valor, toBe verifica ponteiro tb
  })

  test('Should return 400 if no email is provided', () => {
    const { sut } = makeSut() // sut is System under test
    const httpRequest = {
      body: {
        name: 'name',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', () => {
    const { sut } = makeSut() // sut is System under test
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@mail.com',
        passwordConfirmation: 'password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if no passwordConfirmation is provided', () => {
    const { sut } = makeSut() // sut is System under test
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@mail.com',
        password: 'password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Should return 400 if provided email is invalid', () => {
    const { sut, emailValidatorStub } = makeSut() // sut is System under test
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'name',
        email: 'invalid@mail.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should return 400 if provided password confirmation fails', () => {
    const { sut } = makeSut() // sut is System under test
    const httpRequest = {
      body: {
        name: 'name',
        email: 'invalid@mail.com',
        password: 'password',
        passwordConfirmation: 'invalid'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'))
  })

  test('Should call emailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut() // sut is System under test
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'name',
        email: 'any@mail.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })

  test('Should return 500 if EmailValidator throws an error', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'name',
        email: 'any@mail.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})

test('Should return 500 if AddAccount throws an error', () => {
  const { sut, addAccountStub } = makeSut()
  jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
    throw new Error()
  })
  const httpRequest = {
    body: {
      name: 'name',
      email: 'any@mail.com',
      password: 'password',
      passwordConfirmation: 'password'
    }
  }
  const httpResponse = sut.handle(httpRequest)
  expect(httpResponse.statusCode).toBe(500)
  expect(httpResponse.body).toEqual(new ServerError())
})

test('Should call AddAccount with correct params', () => {
  const { sut, addAccountStub } = makeSut() // sut is System under test
  const addSpy = jest.spyOn(addAccountStub, 'add')
  const httpRequest = {
    body: {
      name: 'name',
      email: 'any@mail.com',
      password: 'password',
      passwordConfirmation: 'password'
    }
  }
  sut.handle(httpRequest)
  expect(addSpy).toHaveBeenCalledWith({
    name: 'name',
    email: 'any@mail.com',
    password: 'password'
  })
})

test('Should return 200 if valid params provided', () => {
  const { sut } = makeSut() // sut is System under test
  const httpRequest = {
    body: {
      name: 'name',
      email: 'valid@mail.com',
      password: 'password',
      passwordConfirmation: 'password'
    }
  }
  const httpResponse = sut.handle(httpRequest)
  expect(httpResponse.statusCode).toBe(200)
  expect(httpResponse.body).toEqual({
    id: 'valid_id',
    name: 'name',
    email: 'email@mail.com',
    password: 'password'
  })
})
