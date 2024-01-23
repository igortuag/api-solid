import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date('2024-01-01 10:00:00'))

    const { checkIn } = await sut.execute({
      gymId: 'any_gym_id',
      userId: 'any_user_id',
    })

    await expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    await sut.execute({
      gymId: 'any_gym_id',
      userId: 'any_user_id',
    })

    await expect(() =>
      sut.execute({
        gymId: 'any_gym_id',
        userId: 'any_user_id',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
