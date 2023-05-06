import { asyncQuery } from "../db";
import { GetVacationsOptions, Vacation, VacationData } from "./vacations.types";

export async function createVacation(
  vacationData: VacationData,
  imageName: string,
  username: string
): Promise<Vacation> {
  const { description, destination, date, price } = vacationData;
  const sql =
    "INSERT INTO vacations (description, destination, date, price, imageName) VALUES (?, ?, ?, ?, ?)";
  const result = await asyncQuery<{ insertId: number }>(sql, [
    description,
    destination,
    date,
    price,
    imageName,
    username,
  ]);
  return getVacationById(result.insertId);
}
export async function getVacations(options: GetVacationsOptions) {
  const sql = "SELECT * FROM vacations WHERE (price BETWEEN ? AND ?)";
  return asyncQuery<Vacation[]>(sql, [options.minPrice, options.maxPrice]);
}
export async function getVacationById(id: number) {
  const sql = "SELECT * FROM vacations WHERE id = ?";
  const vacations = await asyncQuery<Vacation[]>(sql, [id]); // [{ id: 1, name: 'blbla', imageName: 'kjdsf'}]
  return vacations[0];
}

export async function deleteVacation(id: number) {
  const sql = "DELETE FROM vacations WHERE id = ?";
  await asyncQuery<Vacation[]>(sql, [id]);
  return getVacationById(id);
}
export async function updateVacation(
  data: VacationData,
  id: number,
  imageName: string
) {
  const { description, destination, date, price } = data;
  const sql =
    "UPDATE vacations SET description = ?, destination = ?, date = ?, price = ?, imageName = ? WHERE id = ?";
  await asyncQuery<Vacation[]>(sql, [
    description,
    destination,
    date,
    price,
    imageName,
    id,
  ]);
  return getVacationById(id);
}
