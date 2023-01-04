import { IsNotEmpty, IsNumber, IsString, IsUUID, Length, Max, Min } from "class-validator";

export class CreateClassroomBody {
  @IsNotEmpty()
  @Length(2, 30)
  @IsString()
  subjects_name: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(13)
  @Min(1)
  grade_number: number;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  institution_id: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  teacher_id: string;
}