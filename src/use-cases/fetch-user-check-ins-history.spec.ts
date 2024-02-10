import { describe, it, beforeEach, vi, expect } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check Ins History Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInRepository)
  })

  it('should be able to fetch check ins history', async () => {
    vi.setSystemTime(new Date('2024-01-01 10:00:00'))

    await checkInRepository.create({
      gym_id: 'gym_01',
      user_id: 'user_01',
    })

    await checkInRepository.create({
      gym_id: 'gym_02',
      user_id: 'user_01',
    })

    const { checkIns } = await sut.execute({
      userId: 'user_01',
    })

    expect(checkIns).toHaveLength(2)
  })
})
