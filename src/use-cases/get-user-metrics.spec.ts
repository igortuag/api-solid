import { describe, it, beforeEach, vi, expect } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Fetch User Check Ins History Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    vi.setSystemTime(new Date('2024-01-01 10:00:00'))

    await checkInRepository.create({
      gym_id: 'gym_01',
      user_id: 'user_01',
    })

    await checkInRepository.create({
      gym_id: 'gym_02',
      user_id: 'user_01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user_01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
