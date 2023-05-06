import {
  GetVacationsOptions,
  PartialVacationData,
  Vacation,
  VacationData,
} from "./vacations.types";
import * as vacationsDal from "./vacations.dal";

export async function createVacation(
  data: VacationData,
  imageName: string,
  username: string
): Promise<Vacation> {
  return vacationsDal.createVacation(data, imageName, username);
}

export async function getVacations(
  options: GetVacationsOptions
): Promise<Vacation[]> {
  const textToSearch = options.textToSearch?.toLowerCase() || "";
  const minPrice = +(options.minPrice || 0);
  const maxPrice = +(options.maxPrice || 9999999);
  return vacationsDal.getVacations({ textToSearch, minPrice, maxPrice });
}

export async function getVacationById(
  id: number
): Promise<Vacation | undefined> {
  return vacationsDal.getVacationById(id);
}
export async function deleteVacation(id: number): Promise<void> {
  await vacationsDal.deleteVacation(id);
}
export async function fullUpdateVacation(
  data: VacationData,
  id: number,
  imageName: string
): Promise<Vacation> {
  return vacationsDal.updateVacation(data, id, imageName);
}

export async function partialUpdateVacation(
  data: PartialVacationData,
  id: number,
  imageName?: string
): Promise<Vacation> {
  const vacation = await vacationsDal.getVacationById(id);

  const toUpdate = {
    ...vacation,
    ...data,
  };
  return vacationsDal.updateVacation(
    toUpdate,
    id,
    imageName || vacation.imageName
  );
}
