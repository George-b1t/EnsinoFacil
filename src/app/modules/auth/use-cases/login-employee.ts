import { Injectable } from "@nestjs/common";
import { AppError } from "src/app/errors/AppError";
import { PrismaEmployeeMapper } from "src/database/prisma/mappers/prisma-employee-mapper";
import { EmployeeRepository } from "../../employee/employee-repository";

interface LoginRequest {
  name: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

@Injectable()
export class LoginEmployee {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(request: LoginRequest): Promise<LoginResponse> {
    const { name, password } = request;
  
    const employee = await this.employeeRepository.findByName({ name });

    if (!employee) throw new AppError("employee not found");

    const employeeEntity = PrismaEmployeeMapper.fromPrisma(employee);

    if (!employeeEntity.checkPassword(password))
    
    throw new AppError("invalid password");

    return {
      token: employeeEntity.generateToken()
    }
  }
}
