import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymRepository
let sut: CheckInUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'any_gym_id',
      title: 'any_name',
      phone: 'any_phone',
      description: 'any_description',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

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
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date('2024-01-01 10:00:00'))

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

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date('2024-01-01 10:00:00'))

    await sut.execute({
      gymId: 'any_gym_id',
      userId: 'any_user_id',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date('2024-01-02 10:00:00'))

    const { checkIn } = await sut.execute({
      gymId: 'any_gym_id',
      userId: 'any_user_id',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    vi.setSystemTime(new Date('2024-01-01 10:00:00'))

    gymsRepository.items.push({
      id: 'any_gym_id_2',
      title: 'any_name',
      phone: 'any_phone',
      description: 'any_description',
      latitude: new Decimal(-27.0108),
      longitude: new Decimal(-49.544602),
    })

    await expect(
      await sut.execute({
        gymId: 'any_gym_id_2',
        userId: 'any_user_id',
        userLatitude: -27.2108,
        userLongitude: -49.644602,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
