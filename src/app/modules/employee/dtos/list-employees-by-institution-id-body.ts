import { IsNotEmpty, Length, IsNumber, IsString, IsUUID } from "class-validator";

export class ListEmployeesByInstitutionIdBody {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  institution_id: string;
}
