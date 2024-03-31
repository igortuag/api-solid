import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { SearchGymUseCase } from '../search-gyms'

export function makeSearchGymUseCase() {
  const gymsRepository = new InMemoryGymRepository()
  const useCase = new SearchGymUseCase(gymsRepository)

  return useCase
}
