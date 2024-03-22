import { Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

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
    const users = await prisma.checkIn.findMany({
      where: { user_id: userId },
      take: 10,
      skip: (page - 1) * 10,
    })

    return users
  }

  countByUserId(userId: string): Promise<number> {
    const checkInsCount = prisma.checkIn.count({
      where: { user_id: userId },
    })

    return checkInsCount
  }

  findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })

    return checkIn
  }
}
