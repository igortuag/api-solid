import { Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findById(id: string) {
    throw new Error("Method not implemented.");
  }
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    throw new Error("Method not implemented.");
  }
  async save(checkIn: {
    id: string;
    created_at: Date;
    validation_at: Date | null;
    user_id: string;
    gym_id: string;
  }) {
    throw new Error("Method not implemented.");
  }
  async findManyByUserId(userId: string, page: number) {
    throw new Error("Method not implemented.");
  }
  countByUserId(userId: string): Promise<number> {
    throw new Error("Method not implemented.");
  }
  findByUserIdOnDate(userId: string, date: Date) {
    throw new Error("Method not implemented.");
  }
}
