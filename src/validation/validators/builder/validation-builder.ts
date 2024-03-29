import { FieldValidation } from '@/validation/protocols/field-validation'
import {
  EmailValidation,
  MinLengthVAlidation,
  RequiredFieldValidation,
} from '@/validation/validators'

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  email(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

  min(minLength: number): ValidationBuilder {
    this.validations.push(new MinLengthVAlidation(this.fieldName, minLength))
    return this
  }

  build(): FieldValidation[] {
    return this.validations
  }
}
