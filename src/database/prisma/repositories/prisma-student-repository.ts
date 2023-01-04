import { Injectable } from "@nestjs/common";
import { Student } from "@prisma/client";
import { CreateStudentProps, FindStudentByIdProps, FindStudentByNameProps, StudentRepository } from "src/app/modules/student/student-repository";
import { PrismaStudentMapper } from "../mappers/prisma-student-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaStudentRepository implements StudentRepository {
  constructor(private prismaService: PrismaService) {}
  
  async create(props: CreateStudentProps): Promise<void> {
    const { student } = props;

    const raw = PrismaStudentMapper.toPrisma(student)

    await this.prismaService.student.create({
      data: raw
    })
  }

  async findById(props: FindStudentByIdProps): Promise<Student> {
    const { id } = props;

    const student = await this.prismaService.student.findUnique({
      where: {
        id
      }
    })

    if(!student) return null;

    return student;
  }

  async findByName(props: FindStudentByNameProps): Promise<Student | null> {
    const { name } = props;

    const student = await this.prismaService.student.findUnique({
      where: {
        name
      }
    })

    if(!student) return null;

    return student;
  }
}
