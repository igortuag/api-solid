import { describe, it, beforeEach, vi, expect } from 'vitest'

import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { FetchNearbyGymUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymRepository
let sut: FetchNearbyGymUseCase

describe('Fetch Nearby Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository()
    sut = new FetchNearbyGymUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Javascript Gym',
      description: 'The best gym for javascript developers',
      phone: null,
      latitude: 0,
      longitude: 0,
    })

    await gymsRepository.create({
      title: 'Python Gym',
      description: 'The best gym for python developers',
      phone: null,
      latitude: 0,
      longitude: 0,
    })

    await gymsRepository.create({
      title: 'Java Gym',
      description: 'The best gym for java developers',
      phone: null,
      latitude: 1203,
      longitude: 1203,
    })

    const { gyms } = await sut.execute({
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(gyms).toHaveLength(2)

    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Javascript Gym',
      }),
      expect.objectContaining({
        title: 'Python Gym',
      }),
    ])
  })
})
