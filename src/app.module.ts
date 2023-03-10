import { Module } from '@nestjs/common';
import { AuthModule } from './app/modules/auth/auth.module';
import { ClassroomModule } from './app/modules/classroom/classroom.module';
import { EmployeeModule } from './app/modules/employee/employee.module';
import { InstitutionModule } from './app/modules/institution/institution.module';
import { MasterUserModule } from './app/modules/masteruser/master-user.module';
import { StudentModule } from './app/modules/student/student.module';
import { StudentClassModule } from './app/modules/studentclass/student-class.module';
import { TeacherModule } from './app/modules/teacher/teacher.module';

@Module({
  imports: [
    MasterUserModule,
    InstitutionModule,
    EmployeeModule,
    TeacherModule,
    StudentModule,
    ClassroomModule,
    StudentClassModule,
    AuthModule
  ],
})

export class AppModule {}
