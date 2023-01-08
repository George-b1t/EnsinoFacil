import { Injectable } from "@nestjs/common";
import { Employee } from "@prisma/client";
import { CreateEmployeeProps, EmployeeRepository, FindEmployeeById, FindEmployeeByName, ListEmployeesByInstitutionIdProps } from "src/app/modules/employee/employee-repository";
import { PrismaEmployeeMapper } from "../mappers/prisma-employee-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaEmployeeRepository implements EmployeeRepository {
  constructor(private prismaService: PrismaService) {}

  async create(props: CreateEmployeeProps): Promise<void> {
    const { employee } = props;

    const raw = PrismaEmployeeMapper.toPrisma(employee);

    await this.prismaService.employee.create({
      data: raw
    });
  }

  async listByInstitutionId(props: ListEmployeesByInstitutionIdProps): Promise<Employee[]> {
    const { institution_id } = props;

    const raw = await this.prismaService.employee.findMany({
      where: {
        institution_id
      }
    })

    return raw;
  }

  async findById(props: FindEmployeeById): Promise<Employee | null> {
    const { id } = props;

    const employee = await this.prismaService.employee.findUnique({
      where: {
        id
      }
    })

    if(!employee) return null;

    return employee;
  }

  async findByName(props: FindEmployeeByName): Promise<Employee> {
    const { name } = props;

    const employee = await this.prismaService.employee.findUnique({
      where: {
        name
      }
    })

    if(!employee) return null;

    return employee;
  }
}
