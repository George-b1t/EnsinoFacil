import { IsNotEmpty, IsUUID, IsString } from "class-validator";

export class CreateTeacherBody {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  employee_id: string;
}
