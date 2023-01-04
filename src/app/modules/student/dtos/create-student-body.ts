import { IsNotEmpty, Length, IsString, IsUUID } from "class-validator";

export class CreateStudentBody {
  @IsNotEmpty()
  @Length(2, 100)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  institution_id: string;
}
