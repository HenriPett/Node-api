import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!httpRequest.body.eamil) {
      return badRequest(new MissingParamError('email'))
    }
  }
}