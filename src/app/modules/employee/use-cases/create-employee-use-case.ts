import { Injectable } from "@nestjs/common";
import { AppError } from "src/app/errors/AppError";
import { InstitutionRepository } from "../../institution/institution-repository";
import { EmployeeEntity } from "../employee-entity";
import { EmployeeRepository } from "../employee-repository";

interface CreateEmployeeUseCaseRequest {
  name: string;
  salary: number;
  institution_id: string;
}

@Injectable()
export class CreateEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository,
              private institutionRepository: InstitutionRepository) {}

  async execute(request: CreateEmployeeUseCaseRequest): Promise<void> {
    const { name, salary, institution_id } = request;

    // verify if institution exists

    const institution = await this.institutionRepository.findById({
      id: institution_id
    });

    if (!institution) throw new AppError("institution not found");

    // verify if name already exists

    const employeeByName = await this.employeeRepository.findByName({
      name
    })

    if (!!employeeByName) throw new AppError("name already exists");

    const employee = new EmployeeEntity({ name, salary, institution_id });

    await this.employeeRepository.create({
      employee
    });
  }
}
