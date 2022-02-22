import { EmailValidatorAdapter } from './email-validator-adapter'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator adapter', () => {
  test('Should return false if validator return false', () => {
    const sut = makeSut()
    jest.spyOn(sut, 'isValid').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator return true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid@gmail.com')
    expect(isValid).toBe(true)
  })

  test('Should call validator with correct email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(sut, 'isValid')
    sut.isValid('any@gmail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('any@gmail.com')
  })
})
