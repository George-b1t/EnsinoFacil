import { randomUUID } from "crypto";

export type PermissionsType = "list_classroom" | "create_classroom";

interface EmployeeProps {
  name: string;
  salary: number;
  institution_id: string;
  permissions: PermissionsType[];
}

export class EmployeeEntity {
  private _id: string;
  private props: EmployeeProps;

  constructor(props: EmployeeProps) {
    this._id = randomUUID();
    this.props = props;
  }

  public get id(): string {
    return this._id;
  }

  public get institution_id(): string {
    return this.props.institution_id;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get salary(): number {
    return this.props.salary;
  }

  public set salary(salary: number) {
    this.props.salary = salary;
  }

  public get permissions(): PermissionsType[] {
    return this.props.permissions;
  }

  public set permissions(permissions: PermissionsType[]) {
    this.props.permissions = permissions;
  }
}
