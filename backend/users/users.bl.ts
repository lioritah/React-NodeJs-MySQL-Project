import { User, UserLogin } from "./users.types";
import { hash, compare } from "bcrypt";
import { createUser, getByUsername } from "./users.dal";
import {
  UserAlreadyExistsError,
  WrongUsernameOrPasswordError,
} from "../errors";
const saltRounds = 12;

export async function register(userData: User) {
  const hashedPassword = await hash(userData.password, saltRounds);
  const existing = await getByUsername(userData.username);
  if (existing) {
    throw new UserAlreadyExistsError(
      "A user with this username already exists"
    );
  }
  const userToAdd: User = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    username: userData.username,
    password: hashedPassword,
  };
  await createUser(userToAdd);
}

export async function verifyUser(userData: UserLogin): Promise<User> {
  const user = await getByUsername(userData.username);
  if (user) {
    const isValidPass = await compare(userData.password, user.password);
    if (isValidPass) {
      return user;
    }
  }
  throw new WrongUsernameOrPasswordError("Wrong username or password");
}
