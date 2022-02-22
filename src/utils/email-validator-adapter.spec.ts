import { EmailValidatorAdapter } from './email-validator'

describe('EmailValidator adapter', () => {
  test('Should return false if validator return false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid_email@')
    expect(isValid).toBe(false)
  })
})
