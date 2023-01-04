import { Injectable } from "@nestjs/common";
import { AppError } from "src/app/errors/AppError";
import { InstitutionRepository } from "../../institution/institution-repository";
import { StudentEntity } from "../student-entity";
import { StudentRepository } from "../student-repository";

interface CreateStudentUseCaseRequest {
  name: string;
  institution_id: string;
}

@Injectable()
export class CreateStudentUseCase {
  constructor(private studentRepository: StudentRepository,
              private institutionRepository: InstitutionRepository) {}

  async execute(request: CreateStudentUseCaseRequest): Promise<void> {
    const { name, institution_id } = request;

    // verify if institution exists

    const institution = await this.institutionRepository.findById({
      id: institution_id
    });

    if (!institution) throw new AppError("institution not found");

    // verify if name already exists

    const studentByName = await this.studentRepository.findByName({
      name
    })

    if (!!studentByName) throw new AppError("name already exists");

    const student = new StudentEntity({
      name,
      institution_id
    })

    await this.studentRepository.create({
      student
    })
  }
}
