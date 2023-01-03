import { IsNotEmpty, Length, IsOptional, IsString } from "class-validator";

export class CreateInstitutionBody {
  @IsNotEmpty()
  @Length(2, 100)
  @IsString()
  name: string;
}
