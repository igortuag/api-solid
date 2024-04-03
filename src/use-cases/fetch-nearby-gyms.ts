import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface FetchNearbyGymUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymUseCaseRequest): Promise<FetchNearbyGymUseCaseResponse> {
    const gyms = await this.gymsRepository.fetchNearbyGyms({
      userLatitude,
      userLongitude,
    })

    return {
      gyms,
    }
  }
}
