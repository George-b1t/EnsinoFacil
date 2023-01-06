import { Employee } from "@prisma/client";
import { EmployeeEntity, PermissionsType } from "src/app/modules/employee/employee-entity";

export class PrismaEmployeeMapper {
  static toPrisma(employee: EmployeeEntity): Employee {
    return {
      id: employee.id,
      name: employee.name,
      password: employee.password,
      salary: employee.salary,
      institution_id: employee.institution_id,
      permissions: employee.permissions
    }
  }

  static fromPrisma(employee: Employee): EmployeeEntity {
    const raw = new EmployeeEntity({
      name: employee.name,
      password: employee.password,
      salary: employee.salary,
      permissions: employee.permissions as PermissionsType[],
      institution_id: employee.institution_id,
    }, employee.id, employee.password)

    return raw;
  }
}
