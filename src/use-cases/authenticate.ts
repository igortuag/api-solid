import { UsersRepository } from '@/repositories/user-repository'

export class AuthenticateUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute() {
    // auth process
  }
}
