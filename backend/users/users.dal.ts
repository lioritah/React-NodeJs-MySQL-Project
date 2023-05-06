import { asyncQuery } from "../db";
import { User } from "./users.types";

export async function getByUsername(username: string) {
  const sql = "SELECT * FROM users WHERE username = ?";
  const users = await asyncQuery<User[]>(sql, [username]);
  return users[0];
}
export async function createUser(user: User) {
  const sql =
    "INSERT INTO users (firstName,lastName, username, password) VALUES (?,?,?,?)";
  await asyncQuery<User>(sql, [
    user.firstName,
    user.lastName,
    user.username,
    user.password,
  ]);
  return user;
}

export async function getByUserAdmin(username: string) {
  const sql = `SELECT * FROM users WHERE role = "admin" AND username = "${username}"`;

  const users = await asyncQuery<User[]>(sql, [username]);
  return users.length > 0;
}
