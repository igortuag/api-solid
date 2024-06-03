import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user search', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript Gym',
        description: 'Javascript Gym',
        phone: '123456789',
        latitude: -23.5505199,
        longitude: -46.6333094,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Typescript Gym',
        description: 'Typescript Gym',
        phone: '123456789',
        latitude: -23.5505199,
        longitude: -46.6333094,
      })

    const response = await request(app.server)
      .get('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .query({ q: 'Javascript' })

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Javascript Gym',
        }),
      ]),
    )
  })
})
