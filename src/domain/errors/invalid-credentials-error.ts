export class InvalidCredentialsError extends Error {
  constructor () {
    super('Credencials inválidas')
    this.name = 'InvalidCredentialsError'
  }
}
