import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adpater'

describe('Bcrypt Adapbter', () => {
  test('Should call Brypt with correct value ', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
