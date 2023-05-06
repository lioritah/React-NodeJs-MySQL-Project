import { Grid } from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FollowingResponse, Vacation } from "../../interface/vacation";
import { RootState } from "../../store";
import { VacationCard } from "./vacation-card/vacation-card";

export default function FavoriteVacations() {
  const vacations = useSelector<RootState, Vacation[]>(
    (state) => state.vacationsState.vacations
  );

  const FavoriteVacationsList = useCallback(() => {
    return (
      <React.Fragment>
        {vacations
          .filter((vacation) => vacation.isUserFollowing)

          .map((v) => (
            <Grid.Col md={6} lg={3} key={v.id} span="auto">
              <VacationCard vacation={v} />
            </Grid.Col>
          ))}
      </React.Fragment>
    );
  }, [vacations]);

  useEffect(() => {
    console.log(vacations);
  }, [vacations]);

  const isFollow = (isFollowing: FollowingResponse) => {
    return isFollowing.isUserFollowing === true;
  };

  const value = vacations.find(isFollow);

  if (!value) {
    return <h1>No Favorite ...</h1>;
  }

  return (
    <>
      <React.Fragment>
        <h1>Favorite Vacations</h1>
        <Grid>
          <FavoriteVacationsList />
        </Grid>
      </React.Fragment>
    </>
  );
}
