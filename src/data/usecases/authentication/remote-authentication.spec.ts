/* eslint-disable no-undef */

import { RemoteAuthentication } from './remote-authentication'
import { HttpClientSpy } from '../../test/moke-http-client'

describe('RemoteAuthentication ', () => {
  test('Should call HttpClient wuth correct url', async () => {
    const url = 'any_url'
    const httpPostClientSpy = new HttpClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
