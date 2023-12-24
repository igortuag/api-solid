import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { prisma } from './lib/prisma'
import { register } from './http/controlers/register'

export const app = fastify()

app.post('/users', register)
