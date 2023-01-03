import { Teacher } from "@prisma/client";
import { TeacherEntity } from "./teacher-entity";

export interface CreateTeacherProps {
  teacher: TeacherEntity;
}

export interface FindTeacherByIdProps {
  id: string;
}

export interface FindTeacherByEmployeeIdProps {
  employee_id: string;
}

export abstract class TeacherRepository {
  abstract create(props: CreateTeacherProps): Promise<void>;
  abstract findById(props: FindTeacherByIdProps): Promise<Teacher | null>;
  abstract findByEmployeeId(props: FindTeacherByEmployeeIdProps): Promise<Teacher | null>;
}