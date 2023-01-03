import { Injectable } from "@nestjs/common";
import { Teacher } from "@prisma/client";
import { CreateTeacherProps, FindTeacherByEmployeeIdProps, FindTeacherByIdProps, TeacherRepository } from "src/app/modules/teacher/teacher-repository";
import { PrismaTeacherMapper } from "../mappers/prisma-teacher-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaTeacherRepository implements TeacherRepository {
  constructor(private prismaService: PrismaService) {}

  async create(props: CreateTeacherProps): Promise<void> {
    const { teacher } = props;

    const raw = PrismaTeacherMapper.toPrisma(teacher);

    await this.prismaService.teacher.create({
      data: raw
    })
  }

  async findById(props: FindTeacherByIdProps): Promise<Teacher | null> {
    const { id } = props;

    const teacher = await this.prismaService.teacher.findUnique({
      where: {
        id
      }
    })

    if(!teacher) return null;

    return teacher;
  }

   async findByEmployeeId(props: FindTeacherByEmployeeIdProps): Promise<Teacher | null> {
    const { employee_id } = props;

    const teacher = await this.prismaService.teacher.findUnique({
      where: {
        employee_id
      }
    })

    if(!teacher) return null;

    return teacher;
  }
}
