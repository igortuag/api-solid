import request from 'supertest'
import { app } from '@/app'
import { describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  it('should be able to register', async () => {
    const response = await request(app.server).post('/register').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.status).toBe(201)
  })
})
