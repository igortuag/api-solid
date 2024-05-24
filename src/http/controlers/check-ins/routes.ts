import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
}