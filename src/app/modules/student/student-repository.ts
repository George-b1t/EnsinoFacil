import { Student } from "@prisma/client";
import { StudentEntity } from "./student-entity";

export interface CreateStudentProps {
  student: StudentEntity;
}

export interface FindStudentByIdProps {
  id: string;
}

export interface FindStudentByNameProps {
  name: string;
}

export abstract class StudentRepository {
  abstract create(props: CreateStudentProps): Promise<void>;
  abstract findById(props: FindStudentByIdProps): Promise<Student | null>;
  abstract findByName(props: FindStudentByNameProps): Promise<Student | null>;
}
