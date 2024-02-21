import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface FetchNearbyhGymUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyhGymUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyhGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude
  }: FetchNearbyhGymUseCaseRequest): Promise<FetchNearbyhGymUseCaseResponse> {
    const gyms = await this.gymsRepository.fetchNearbyGyms({
      userLatitude,
      userLongitude
    });

    return {
      gyms
    };
  }
}
