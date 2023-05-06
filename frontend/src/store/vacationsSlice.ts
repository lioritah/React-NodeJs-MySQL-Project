import { createSlice } from "@reduxjs/toolkit";
import { Vacation } from "../interface/vacation";

type VacationsState = {
  vacations: Vacation[];
};

const initialState: VacationsState = {
  vacations: [],
};

export const vacationsSlice = createSlice({
  name: "vacations",
  initialState: initialState,
  reducers: {
    addVacations: (state, action) => {
      state.vacations = action.payload;
    },
    toggleFollowVacation: (state, action) => {
      const { vacationId, mode } = action.payload;
      const idx = state.vacations.findIndex(
        (vacation) => vacation.id === vacationId
      );

      if (idx >= 0) {
        let copy = [...state.vacations];
        if (mode === "delete") copy[idx].followers--;
        else if (mode === "add") copy[idx].followers++;
        copy[idx].isUserFollowing = !copy[idx].isUserFollowing;
        state.vacations = copy;
      }
    },
  },
});

const { addVacations, toggleFollowVacation } = vacationsSlice.actions;
export { addVacations, toggleFollowVacation };
