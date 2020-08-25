/* eslint-disable no-undef */

import { RemoteAuthentication } from './remote-authentication'
import { HttpClientSpy } from '../../test/moke-http-client'

type SutTypes = {
  sut: RemoteAuthentication,
  httpPostClientSpy: HttpClientSpy
}

const makeSut = (url:string = 'any_url'):SutTypes => {
  const httpPostClientSpy = new HttpClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication ', () => {
  test('Should call HttpClient wuth correct url', async () => {
    const url = 'other_url'
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
