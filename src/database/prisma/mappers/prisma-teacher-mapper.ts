import { TeacherEntity } from "src/app/modules/teacher/teacher-entity";

export class PrismaTeacherMapper {
  static toPrisma(teacher: TeacherEntity) {
    return {
      id: teacher.id,
      employee_id: teacher.employee_id
    }
  }
}
