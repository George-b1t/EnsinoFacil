import { IsNotEmpty, Length, IsString } from "class-validator";

export class CreateEmployeeBody {
  @IsNotEmpty()
  @Length(2, 100)
  @IsString()
  name: string;

  @IsNotEmpty()
  @Length(8, 30)
  @IsString()
  password: string;
}
