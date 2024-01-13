import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { hash } from 'bcryptjs'
import { ResourceNotFound } from './errors/resource-not-found-error'

let userRepository: InMemoryRepository
let sut: GetUserProfileUseCase

describe('GetUserProfile Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryRepository()
    sut = new GetUserProfileUseCase(userRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await userRepository.create({
      name: 'John Doe',
      email: '123456',
      password_hash: hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    expect(() =>
      sut.execute({
        userId: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
