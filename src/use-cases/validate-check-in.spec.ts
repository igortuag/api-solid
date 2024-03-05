import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import { MaxDistanceError } from "./errors/max-distance-error";
import { ValidateCheckInUseCase } from "./validate-check-in";

let checkInRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate Check-in Use Case", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInRepository);

    // vi.useFakeTimers()
  });

  afterEach(() => {
    // vi.useRealTimers()
  });

  it("should be able to validate the check-in", async () => {
    const createdCheckIn = await checkInRepository.create({
      gym_id: "any_gym_id",
      user_id: "any_user_id"
    });

    const { checkIn } = await sut.execute({
      CheckInId: createdCheckIn.id
    });

    expect(checkIn.validation_at).toEqual(expect.any(Date));
    expect(checkInRepository.items[0].validation_at).toEqual(expect.any(Date));
  });
});
