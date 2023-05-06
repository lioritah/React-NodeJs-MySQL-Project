import { z } from "zod";
import {
  getVacationsOptions,
  partialVacationData,
  vacation,
  vacationData,
  vacationsParams,
} from "./vacations.schema";

export type Vacation = z.infer<typeof vacation>;

export type VacationData = z.infer<typeof vacationData>;

export type GetVacationsOptions = z.infer<typeof getVacationsOptions>;

export type PartialVacationData = z.infer<typeof partialVacationData>;

export type GetVacationsQuery = GetVacationsOptions;

export type VacationsParams = z.infer<typeof vacationsParams>;
