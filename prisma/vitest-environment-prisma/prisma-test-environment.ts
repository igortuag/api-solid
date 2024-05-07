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

    console.log(`Setting up environment with schema ${schema}`)
    console.log('url ::>', generateDatabaseUrl(schema))

    return {
      teardown() {
        console.log(`Tearing down environment with schema ${schema}`)
      },
    }
  },
  transformMode: 'ssr',
}
