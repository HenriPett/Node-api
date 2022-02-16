import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['email', 'name']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
