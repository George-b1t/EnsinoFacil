import { IsNotEmpty, Length, IsNumber, IsString, IsUUID, IsArray } from "class-validator";
import { PermissionsType } from "../employee-entity";

export class CreateEmployeeBody {
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

  @IsString({ each: true })
  @IsNotEmpty()
  permissions: PermissionsType[];
}
