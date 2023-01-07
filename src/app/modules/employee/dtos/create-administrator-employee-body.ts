import { IsNotEmpty, Length, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateAdministratorEmployeeBody {
  @IsNotEmpty()
  @Length(2, 100)
  @IsString()
  name: string;

  @IsNotEmpty()
  @Length(8, 30)
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  salary: number;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  institution_id: string;
}
