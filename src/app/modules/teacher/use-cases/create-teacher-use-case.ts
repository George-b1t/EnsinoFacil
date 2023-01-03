import { Injectable } from "@nestjs/common";
import { AppError } from "src/app/errors/AppError";
import { EmployeeRepository } from "../../employee/employee-repository";
import { TeacherEntity } from "../teacher-entity";
import { TeacherRepository } from "../teacher-repository";

interface CreateTeacherUseCaseRequest {
  employee_id: string;
}

@Injectable()
export class CreateTeacherUseCase {
  constructor(private teacherRepository: TeacherRepository,
              private employeeRepository: EmployeeRepository) {}

  async execute(request: CreateTeacherUseCaseRequest): Promise<void> {
    const { employee_id } = request;

    // verify if employee exists

    const employee = await this.employeeRepository.findById({
      id: employee_id
    });

    if (!employee) throw new AppError("employee not found");

    // verify if employee id is already linked

    const teacherByEmployeeId = await this.teacherRepository.findByEmployeeId({
      employee_id
    });

    if (!!teacherByEmployeeId) throw new AppError("employee id already linked");

    const teacher = new TeacherEntity({
      employee_id
    })

    await this.teacherRepository.create({
      teacher
    })
  }
}
