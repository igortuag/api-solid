import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface ValidateCheckInUseCaseRequest {
  CheckInId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) {}

  async execute({
    CheckInId
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    
}
