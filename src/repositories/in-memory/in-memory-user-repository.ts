import { User } from '@prisma/client'
import { UsersRepository } from '../user-repository'

export class InMemoryRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email)
    return user || null
  }

  async create(data: any) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}
