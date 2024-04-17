import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  // const { userId } = profileBodySchema.parse(request.body)

  // try {
  //   const profileUseCase = makeGetUserProfileUseCase()

  //   await profileUseCase.execute({
  //     userId
  //   })
  // } catch (error) {
  //   if (error instanceof InvalidCredentialsError) {
  //     return reply.status(409).send({
  //       message: error.message,
  //     })
  //   }

  //   throw error
  // }

  // return reply.status(200).send()
}
