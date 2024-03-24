import { prisma, Gym, Prisma } from '@prisma/client'
import {
  GymsRepository,
  FetchNearbyhGymUseCaseRequest,
} from '../gyms-repository'

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  async findManyNearby(params: FetchNearbyhGymUseCaseRequest) {
    throw new Error('Method not implemented.')
  }

  async searchMany(query: string, page: number) {
    throw new Error('Method not implemented.')
  }

  async create(data: Prisma.GymUncheckedCreateInput) {
    throw new Error('Method not implemented.')
  }
}
