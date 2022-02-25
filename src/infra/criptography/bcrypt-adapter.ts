import * as bcrypt from 'bcrypt'
import { Encrypter } from '../../data/protocols/encrypter'

export class BcryptAdapter implements Encrypter {
  async encrypt (value: string): Promise<string> {
    await bcrypt.hash(value, 12)
    return null
  }
}
