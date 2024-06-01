import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from 'process'
import fastifyJwt from '@fastify/jwt'
import { usersRoutes } from './http/controlers/users/routes'
import { gymsRoutes } from './http/controlers/gyms/routes'
import { checkInRoutes } from './http/controlers/check-ins/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET as string,
})

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      message: 'Validation error',
      errors: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: send error to sentry or other error tracker
  }

  return reply.status(500).send({
    message: 'Internal server error',
  })
})
