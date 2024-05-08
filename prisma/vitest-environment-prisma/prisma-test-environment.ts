import 'dotenv/config'

import { randomUUID } from 'crypto'
import { Environment } from 'vitest'

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  async setup() {
    const schema = randomUUID()
    const databaseURL = generateDatabaseUrl(schema)

    process.env.DATABASE_URL = databaseURL

    return {
      teardown() {
        console.log(`Tearing down environment with schema ${schema}`)
      },
    }
  },
  transformMode: 'ssr',
}
