import { randomUUID } from 'crypto'
import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  async setup() {
    const schema = randomUUID()

    return {
      teardown() {
        console.log(`Tearing down environment with schema ${schema}`)
      },
    }
  },
  transformMode: 'ssr',
}
