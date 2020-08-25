/* eslint-disable no-undef */

import { RemoteAuthentication } from './remote-authentication'
import { HttpClientSpy } from '@/data/test/moke-http-client'
import { mockAuhtentication } from '@/domain/test/mock-authentication'
import faker from 'faker'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { HttpStatusCode } from '@/data/protocols/http/httpResponse'

type SutTypes = {
  sut: RemoteAuthentication,
  httpPostClientSpy: HttpClientSpy
}

const makeSut = (url:string = faker.internet.url()):SutTypes => {
  const httpPostClientSpy = new HttpClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication ', () => {
  test('Should call HttpClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth(mockAuhtentication())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAuhtentication()
    await sut.auth(authenticationParams)
    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })

  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized
    }
    const promise = sut.auth(mockAuhtentication())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})
