import { ClassroomEntity } from "src/app/modules/classroom/classroom-entity";

export class PrismaClassroomMapper {
  static toPrisma(classroom: ClassroomEntity) {
    return {
      id: classroom.id,
      subjects_name: classroom.subjects_name,
      grade_number: classroom.grade_number,
      institution_id: classroom.institution_id,
      teacher_id: classroom.teacher_id
    }
  }
}
