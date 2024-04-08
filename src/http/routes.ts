import { FastifyInstance } from 'fastify'
import { register } from './controlers/register'
import { authenticate } from './controlers/authenticate'
import { profile } from './controlers/profile'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticated */
  app.get('/me', profile)
}
