import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { AuthenticationParams, Authentication } from '@/domain/usecases/authentication'
import { HttpStatusCode } from '@/data/protocols/http/httpResponse'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { AccountModel } from '@/domain/models/account-model'

export class RemoteAuthentication implements Authentication {
  constructor (
  private readonly url:string,
  private readonly httpClient:HttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
      // case HttpStatusCode.badRequest: throw new UnexpectedError()
      default: throw new UnexpectedError()
    }
  }
}
