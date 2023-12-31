export class UserAlreadyExistError extends Error {
  constructor() {
    super('User already exist')
    this.name = 'UserAlreadyExistError'
  }
}
