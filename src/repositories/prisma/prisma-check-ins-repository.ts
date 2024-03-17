import { Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { prisma } from '@/lib/prisma'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: { id },
    })

    return checkIn
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({ data })

    return checkIn
  }

  async save(checkIn: {
    id: string
    created_at: Date
    validation_at: Date | null
    user_id: string
    gym_id: string
  }) {
    const updatedCheckIn = await prisma.checkIn.update({
      where: { id: checkIn.id },
      data: {
        validation_at: checkIn.validation_at,
      },
    })

    return updatedCheckIn
  }

  async findManyByUserId(userId: string, page: number) {
    throw new Error('Method not implemented.')
  }

  countByUserId(userId: string): Promise<number> {
    throw new Error('Method not implemented.')
  }

  findByUserIdOnDate(userId: string, date: Date) {
    throw new Error('Method not implemented.')
  }
}
