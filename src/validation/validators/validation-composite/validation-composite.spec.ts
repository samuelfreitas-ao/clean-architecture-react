import { FieldValidationSpy } from '@/validation/validators/test'
import { ValidationComposite } from '@/validation/validators'
import faker from 'faker'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ]
  const sut = ValidationComposite.build(fieldValidationSpy)
  return { sut, fieldValidationSpy }
}

describe('ValidationComposite', () => {
  test('Should return error if any validations fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationSpy } = makeSut(fieldName)
    const errorMessage = faker.random.words()
    fieldValidationSpy[0].error = new Error(errorMessage)
    fieldValidationSpy[1].error = new Error(faker.random.words())
    const error = sut.validate(fieldName, faker.random.words())
    expect(error).toBe(errorMessage)
  })

  test('Should return error if any validations fails', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)
    const error = sut.validate(fieldName, faker.random.words())
    expect(error).toBeFalsy()
  })
})
