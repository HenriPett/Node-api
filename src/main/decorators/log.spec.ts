import { LogControllerDecorator } from './log'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '../../presentation/protocols'

describe('Log Controller Decorator', () => {
  test('Should call controller handle', async () => {
    class ControllerStub implements Controller {
      async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse: HttpResponse = {
          statusCode: 200,
          body: {
            name: 'foo'
          }
        }
        return new Promise((resolve) => resolve(httpResponse))
      }
    }
    const controllerStub = new ControllerStub()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const sut = new LogControllerDecorator(controllerStub)
    const httpRequest = {
      body: {
        email: 'foo@example',
        name: 'foo',
        password: 'foo',
        passwordConfirmation: 'foo'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
