import { randomUUID } from "crypto";
import { compare, hashSync } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface EmployeeProps {
  name: string;
  password: string;
  role: string;
  salary: number;
  institution_id: string;
  permissions: string[];
}

export class EmployeeEntity {
  private _id: string;
  private props: EmployeeProps;

  constructor(props: EmployeeProps, employeeId?: string, password?: string) {
    this._id = employeeId ?? randomUUID();
    this.props = {
      ...props,
      password: password ?? hashSync(props.password, 8)
    };
  }

  public async checkPassword(password: string): Promise<boolean> {
    return await compare(password, this.props.password);
  }

  public generateToken(): string {
    return sign({ id: this._id }, process.env.SECRET_EMPLOYEE_TOKEN, { expiresIn: "1h"});
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

  public get password(): string {
    return this.props.password;
  }

  public get role(): string {
    return this.props.role;
  }

  public set role(role: string) {
    this.props.role = role;
  }

  public get salary(): number {
    return this.props.salary;
  }

  public set salary(salary: number) {
    this.props.salary = salary;
  }

  public get permissions(): string[] {
    return this.props.permissions;
  }

  public set permissions(permissions: string[]) {
    this.props.permissions = permissions;
  }
}
