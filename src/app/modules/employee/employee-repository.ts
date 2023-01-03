import { EmployeeEntity } from "./employee-entity";
import { Employee } from "@prisma/client";

export interface CreateEmployeeProps {
  employee: EmployeeEntity;
}

export interface ListEmployeesByInstitutionIdProps {
  institution_id: string; 
}

export interface FindEmployeeById {
  id: string;
}

export interface FindEmployeeByName {
  name: string;
}

export abstract class EmployeeRepository {
  abstract create(props: CreateEmployeeProps): Promise<void>;
  abstract listByInstitutionId(props: ListEmployeesByInstitutionIdProps): Promise<Employee[]>;
  abstract findById(props: FindEmployeeById): Promise<Employee | null>;
  abstract findByName(props: FindEmployeeByName): Promise<Employee | null>;
}
