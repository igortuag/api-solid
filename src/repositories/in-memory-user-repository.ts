import { Prisma } from '@prisma/client';

export class InMemoryUserRepository {
  private users: Prisma.UserCreateInput[] = [];

  async create(data: Prisma.UserCreateInput) {
    this.users.push(data);
  }

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}