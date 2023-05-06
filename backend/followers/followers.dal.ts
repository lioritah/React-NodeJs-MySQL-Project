import { asyncQuery } from "../db";
import { toData } from "./followers.controller";
import { Follow } from "./followers.types";

export async function getFollowersFromDB(vacationId: number) {
  const sql = `SELECT COUNT(vacationId) FROM followers WHERE vacationId = '${vacationId}'`;
  return asyncQuery<number[]>(sql, []);
}

export async function isFollowing(
  username: string,
  vacationId: number | string
) {
  let sql = `SELECT id from users where username = ?`;
  const queryResult = await asyncQuery<any[]>(sql, [username]);
  if (!queryResult || queryResult.length < 1) return false;
  const { id } = toData<{ id: number }>(queryResult[0]);

  sql = `SELECT * from followers WHERE vacationId = ? AND userId = ?`;
  const result = await asyncQuery<any[]>(sql, [vacationId, id]);
  return result && result.length > 0;
}

export async function createFollow(
  userId: number,
  vacationId: number
): Promise<{ follow: Follow; mode: "delete" | "add" }> {
  const check_existing_follow = `SELECT * from followers WHERE userId = ? AND vacationId = ?`;
  const existing = await asyncQuery<any[]>(check_existing_follow, [
    userId,
    vacationId,
  ]);

  if (!existing || existing.length === 0) {
    const sql = "INSERT INTO followers (userId,vacationId) VALUES (?, ?)";
    return {
      mode: "add",
      follow: await asyncQuery<Follow>(sql, [userId, vacationId]),
    };
  } else {
    const sql = "DELETE FROM followers WHERE userId = ? AND vacationId = ?";
    return {
      mode: "delete",
      follow: await asyncQuery<Follow>(sql, [userId, vacationId]),
    };
  }
}

export async function addCount(vacationId: number) {
  const sql = `UPDATE vacations SET followers = followers + 1 WHERE id = ${vacationId}`;
  return await asyncQuery<number[]>(sql, [vacationId]);
}
export async function removeCount(vacationId: number) {
  const sql = `UPDATE vacations SET followers = followers - 1 WHERE id = ${vacationId}`;
  return await asyncQuery<number[]>(sql, [vacationId]);
}

export async function getIDByUsername(username: number) {
  const sql = `SELECT id FROM vacations.users WHERE username = "${username}"`;
  const result = await asyncQuery<{ id: number }[]>(sql, [username]);
  return result;
}
