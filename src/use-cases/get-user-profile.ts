import { UsersRepository } from '@/repositories/user-repository'
import { User } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found-error'

interface GetUserProfileCaseRequest {
  userId: string
}

interface GetUserProfileCaseResponse {
  user: User
}

export class GetUserProfileCase {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileCaseRequest): Promise<GetUserProfileCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) throw new ResourceNotFound()

    return {
      user,
    }
  }
}
