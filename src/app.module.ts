import { Module } from '@nestjs/common';
import { ClassroomModule } from './app/modules/classroom/classroom.module';
import { EmployeeModule } from './app/modules/employee/employee.module';
import { InstitutionModule } from './app/modules/institution/institution.module';
import { StudentModule } from './app/modules/student/student.module';
import { TeacherModule } from './app/modules/teacher/teacher.module';

@Module({
  imports: [
    InstitutionModule,
    EmployeeModule,
    TeacherModule,
    StudentModule,
    ClassroomModule
  ],
})

export class AppModule {}
