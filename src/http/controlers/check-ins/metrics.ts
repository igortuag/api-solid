import { makeGetUserMetricUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metric(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricUseCase = makeGetUserMetricUseCase()

  const { checkInsCount } = await getUserMetricUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(201).send({
    checkInsCount,
  })
}
