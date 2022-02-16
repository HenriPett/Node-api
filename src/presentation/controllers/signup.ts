import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing parameter name')
      }
    }
    if (!httpRequest.body.eamil) {
      return {
        statusCode: 400,
        body: new Error('Missing parameter email')
      }
    }
  }
}
