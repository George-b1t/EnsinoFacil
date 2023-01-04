import { Injectable } from "@nestjs/common";
import { CreateStudentClassProps, StudentClassRepository } from "src/app/modules/studentclass/student-class-reposity";
import { PrismaStudentClassMapper } from "../mappers/prisma-student-class-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaStudentClassRepository implements StudentClassRepository {
  constructor(private prismaService: PrismaService) {}

  async create(props: CreateStudentClassProps): Promise<void> {
    const { student_class } = props;

    const raw = PrismaStudentClassMapper.toPrisma(student_class);

    await this.prismaService.studentClass.create({
      data: raw
    })
  }
}
