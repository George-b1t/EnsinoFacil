import { IsNotEmpty, Length, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateEmployeeBody {
  @IsNotEmpty()
  @Length(2, 100)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  salary: number;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  institution_id: string;
}
