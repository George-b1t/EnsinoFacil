import { Module } from '@nestjs/common';
import { EmployeeModule } from './app/modules/employee/employee.module';
import { InstitutionModule } from './app/modules/institution/institution.module';
import { TeacherModule } from './app/modules/teacher/teacher.module';

@Module({
  imports: [InstitutionModule, EmployeeModule, TeacherModule],
})

export class AppModule {}
