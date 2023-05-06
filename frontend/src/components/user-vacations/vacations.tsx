import React, { useEffect } from "react";
import { Grid, SimpleGrid } from "@mantine/core";
import { Vacation } from "../../interface/vacation";
import { VacationCard } from "./vacation-card/vacation-card";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const Vacations: React.FC = () => {
  const vacations = useSelector<RootState, Vacation[]>(
    (state) => state.vacationsState.vacations
  );
  return (
    <Grid>
      {vacations.map((v) => (
        <Grid.Col md={6} lg={3} key={v.id} span="auto">
          <VacationCard vacation={v} />
        </Grid.Col>
      ))}
    </Grid>
  );
};
