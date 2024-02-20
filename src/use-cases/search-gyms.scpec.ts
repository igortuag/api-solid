import { describe, it, beforeEach, vi, expect } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { SearchGymUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymRepository;
let sut: SearchGymUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository();
    sut = new SearchGymUseCase(gymsRepository);
  });

  it("should be able to search gyms", async () => {
    vi.setSystemTime(new Date("2024-01-01 10:00:00"));

    await gymsRepository.create({
      title: "Javascript Gym",
      description: "The best gym for javascript developers",
      phone: null,
      latitude: 0,
      longitude: 0
    });

    await gymsRepository.create({
      title: "Python Gym",
      description: "The best gym for python developers",
      phone: null,
      latitude: 0,
      longitude: 0
    });

    const { gyms } = await sut.execute({
      query: "javascript",
      page: 1
    });

    expect(gyms).toHaveLength(1);

    expect(gyms).toEqual([
      expect.objectContaining({
        title: "Javascript Gym"
      })
    ]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javascript Gym ${i}`,
        description: `The best gym ${i}`,
        phone: null,
        latitude: 0,
        longitude: 0
      });
    }

    const { gyms } = await sut.execute({
      query: "javascript",
      page: 1
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: "Javascript Gym 21"
      }),
      expect.objectContaining({
        title: "Javascript Gym 22"
      })
    ]);
  });
});
