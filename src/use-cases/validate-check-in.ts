import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { ResourceNotFound } from "./errors/resource-not-found-error";

interface ValidateCheckInUseCaseRequest {
  CheckInId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    CheckInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(CheckInId)

    if (!checkIn) {
      throw new ResourceNotFound()
    }

    checkIn.validation_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return { checkIn }
  }
}
