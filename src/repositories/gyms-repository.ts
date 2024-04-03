import { Gym, Prisma } from '@prisma/client'

export interface FetchNearbyGymUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

export interface GymsRepository {
  findById: (id: string) => Promise<Gym | null>
  fetchNearbyGyms: (params: FetchNearbyGymUseCaseRequest) => Promise<Gym[]>
  searchMany: (query: string, page: number) => Promise<Gym[]>
  create: (data: Prisma.GymCreateInput) => Promise<Gym>
}
