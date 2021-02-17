import { EmailValidator } from '../presentation/protocols/email-validor'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return false
  }
}
