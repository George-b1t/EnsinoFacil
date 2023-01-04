import { Injectable } from "@nestjs/common";
import { Classroom } from "@prisma/client";
import { ClassroomRepository, CreateClassroomProps, FindClassroomByIdProps } from "src/app/modules/classroom/classroom-repository";
import { PrismaClassroomMapper } from "../mappers/prisma-classroom-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaClassroomRepository implements ClassroomRepository {
  constructor(private prismaService: PrismaService) {}
  
  async create(props: CreateClassroomProps): Promise<void> {
    const {
      classroom
    } = props;

    const raw = PrismaClassroomMapper.toPrisma(classroom);

    await this.prismaService.classroom.create({
      data: raw
    })
  }

  async findById(props: FindClassroomByIdProps): Promise<Classroom | null> {
    const { id } = props;

    const classroom = await this.prismaService.classroom.findUnique({
      where: {
        id
      }
    })

    if (!classroom) return null;

    return classroom;
  }
}
