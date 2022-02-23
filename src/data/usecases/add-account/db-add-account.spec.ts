import { DbAddAccount } from './db-add-account'

describe('DbAccount Usecase', () => {
  test('Should call Encrypter with correct password', () => {
    class EncrypterStub {
      async encrypt (value: string): Promise<string> {
        return new Promise((resolve) => resolve('hashed_password'))
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'name',
      email: 'email@mail.com',
      password: 'password'
    }
    sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('password')
  })
})
