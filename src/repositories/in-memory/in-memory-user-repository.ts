import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../user-repository'
import { randomUUID } from 'crypto'

export class InMemoryRepository implements UsersRepository {
  public items: User[] = []

  async findById(userId: string) {
    const user = this.items.find((user) => user.id === userId)
    return user || null
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email)
    return user || null
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}
