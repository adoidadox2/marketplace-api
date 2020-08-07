import { Repository, EntityRepository } from "typeorm";
import User from "../models/User";

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public createUser(name: string, email: string, password: string): User {
    const user = new User(name, email, password);

    return user;
  }
}
