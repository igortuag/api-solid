import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'

let gymsRepository: InMemoryGymRepository
let sut: CreateGymUseCase

describe('CreateGym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Academia 1',
      description: 'Academia muito legal',
      phone: '123456789',
      latitude: 123.456,
      longitude: 456.789,
    })

    await expect(gym.id).toEqual(expect.any(String))
  })
})
