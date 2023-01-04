import { Classroom } from "@prisma/client";
import { ClassroomEntity } from "./classroom-entity";

export interface CreateClassroomProps {
  classroom: ClassroomEntity;
}

export interface FindClassroomByIdProps {
  id: string;
}

export abstract class ClassroomRepository {
  abstract create(props: CreateClassroomProps): Promise<void>;
  abstract findById(props: FindClassroomByIdProps): Promise<Classroom | null>;
}
