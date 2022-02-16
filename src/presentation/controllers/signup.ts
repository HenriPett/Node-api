import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'

export class SignupController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['email', 'name', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
