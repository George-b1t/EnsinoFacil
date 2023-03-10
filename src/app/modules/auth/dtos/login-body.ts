import { IsNotEmpty, Length, IsString } from "class-validator";

export class LoginBody {
  @IsNotEmpty()
  @Length(2, 30)
  @IsString()
  name: string;

  @IsNotEmpty()
  @Length(8, 30)
  @IsString()
  password: string;
}
