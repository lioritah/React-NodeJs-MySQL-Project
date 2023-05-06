import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Text } from "@mantine/core";
import { Login } from "../login/login";
import { Register } from "../register/register";
import { Vacations } from "../user-vacations/vacations";
import { AdminVacations } from "../admin-vacations/vacations";
import FavoriteVacations from "../user-vacations/favoriteVacations";
import { VacationsChart } from "../admin-vacations/vacations-chart";

interface RoutingProps {
  user?: string;
  isAdmin: boolean | undefined;
  onLogin: () => void;
  onRegister: () => void;
}

export const Routing: React.FC<RoutingProps> = ({
  user,
  isAdmin,
  onLogin,
  onRegister,
}) => {
  return (
    <Routes>
      {!!isAdmin && (
        <>
          <Route path="/" element={<AdminVacations />} />
          <Route path="vacations" element={<AdminVacations />} />
          <Route path="vacations-chart" element={<VacationsChart />} />
        </>
      )}

      {user === "" && (
        <>
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route
            path="/register"
            element={<Register onRegister={onRegister} />}
          />
        </>
      )}

      {!!user && (
        <>
          <Route path="/" element={<Vacations />} />

          <Route path="vacations" element={<Vacations />} />
        </>
      )}
      <Route
        path="favorites"
        element={
          isAdmin || !user ? (
            <Navigate to={"/vacations"} />
          ) : (
            <FavoriteVacations />
          )
        }
      />
      <Route path="/*" element={null} />
    </Routes>
  );
};
