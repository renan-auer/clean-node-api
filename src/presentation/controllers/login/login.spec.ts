import { LoginController } from './login'
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors'
import { EmailValidator } from '../signup/signup-protocols'

interface SutTypes {
  sut: LoginController
  emailEmailValidatorStub: EmailValidator
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const emailEmailValidatorStub = makeEmailValidator()
  const sut = new LoginController(emailEmailValidatorStub)
  return {
    sut,
    emailEmailValidatorStub
  }
}
describe('Login Controller', () => {
  test('Shoud return 400 if no email is provided ', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_email'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Shoud return 400 if no password is provided ', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Shoud call EmailValidator with correct email ', async () => {
    const { sut, emailEmailValidatorStub } = makeSut()
    const emailSpy = jest.spyOn(emailEmailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(emailSpy).toHaveBeenCalledWith('any_email@email.com')
  })
})
