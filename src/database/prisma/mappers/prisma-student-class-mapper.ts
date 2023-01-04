import { StudentClassEntity } from "src/app/modules/studentclass/student-class-entity";

export class PrismaStudentClassMapper {
  static toPrisma(student_class: StudentClassEntity) {
    return {
      id: student_class.id,
      classroom_id: student_class.classroom_id,
      student_id: student_class.student_id
    }
  }
}
