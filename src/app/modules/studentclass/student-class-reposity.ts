import { StudentClassEntity } from "./student-class-entity";

export interface CreateStudentClassProps {
  student_class: StudentClassEntity;
}

export abstract class StudentClassRepository {
  abstract create(props: CreateStudentClassProps): Promise<void>;
}
