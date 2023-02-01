import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Users {
  @Field(() => Int)
  private user_id: number;

  @Field()
  private name: string;

  private password: string;

  @Field()
  private email: string;

  @Field()
  private role: string;

  constructor(
    user_id: number,
    name: string,
    password: string,
    email: string,
    role: string
  ) {
    this.user_id = user_id;
    this.name = name;
    this.password = password;
    this.email = email;
    this.role = role;
  }

  public getUser_id(): number {
    return this.user_id;
  }

  public setUser_id(user_id: number): void {
    this.user_id = user_id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getRole(): string {
    return this.role;
  }

  public setRole(role: string): void {
    this.role = role;
  }
}
