import { IsNotEmpty, IsUUID, IsString } from "class-validator";

export class CreateStudentClassBody {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  classroom_id: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  student_id: string;
}
