import { Injectable } from "@nestjs/common";
import { AppError } from "src/app/errors/AppError";
import { InstitutionEntity } from "../institution-entity";
import { InstitutionRepository } from "../institution-repository";

interface CreateInstitutionUseCaseRequest {
  name: string;
}

@Injectable()
export class CreateInstitutionUseCase {
  constructor(private institutionRepository: InstitutionRepository) {}

  async execute(request: CreateInstitutionUseCaseRequest): Promise<void> {
    const { name } = request;

    // verify if name already exists

    const institutionByName = await this.institutionRepository.findByName({
      name
    })

    if (!!institutionByName) throw new AppError("name already exists");

    const institution = new InstitutionEntity({ name })

    await this.institutionRepository.create({ institution })
  }
}
