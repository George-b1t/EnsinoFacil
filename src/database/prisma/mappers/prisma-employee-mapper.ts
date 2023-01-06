import { EmployeeEntity } from "src/app/modules/employee/employee-entity";

export class PrismaEmployeeMapper {
  static toPrisma(employee: EmployeeEntity) {
    return {
      id: employee.id,
      name: employee.name,
      salary: employee.salary,
      institution_id: employee.institution_id,
      permissions: employee.permissions
    }
  }
}
