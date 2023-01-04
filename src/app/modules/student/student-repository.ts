import { Student } from "@prisma/client";
import { StudentEntity } from "./student-entity";

export interface CreateStudentProps {
  student: StudentEntity;
}

export interface FindStudentByNameProps {
  name: string;
}

export abstract class StudentRepository {
  abstract create(props: CreateStudentProps): Promise<void>;
  abstract findByName(props: FindStudentByNameProps): Promise<Student | null>;
}
