import { Gym, Prisma } from '@prisma/client'

export interface FetchNearbyhGymUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

export interface GymsRepository {
  findById: (id: string) => Promise<Gym | null>
  fetchNearbyGyms: (params: FetchNearbyhGymUseCaseRequest) => Promise<Gym[]>
  searchMany: (query: string, page: number) => Promise<Gym[]>
  create: (data: Prisma.GymCreateInput) => Promise<Gym>
}
