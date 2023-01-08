import { Injectable } from "@nestjs/common";
import { AppError } from "src/app/errors/app-error";
import { InstitutionRepository } from "../../institution/institution-repository";
import { EmployeeEntity } from "../employee-entity";
import { EmployeeRepository } from "../employee-repository";

interface CreateAdministratorEmployeeUseCaseRequest {
  name: string;
  password: string;
  salary: number;
  institution_id: string;
}

@Injectable()
export class CreateAdministratorEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository,
              private institutionRepository: InstitutionRepository) {}


  async execute(request: CreateAdministratorEmployeeUseCaseRequest): Promise<void> {
    const {
      name,
      password,
      salary,
      institution_id
    } = request;

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

    const employee = new EmployeeEntity({
      name,
      password,
      role: "administrator",
      salary,
      institution_id,
      permissions: []
    });

    await this.employeeRepository.create({
      employee
    })
  }
}
