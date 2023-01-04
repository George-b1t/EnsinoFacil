import { StudentEntity } from "src/app/modules/student/student-entity";

export class PrismaStudentMapper {
  static toPrisma(student: StudentEntity) {
    return {
      id: student.id,
      name: student.name,
      institution_id: student.institution_id
    }
  }
}
