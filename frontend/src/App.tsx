import React, { useEffect, useState } from "react";
import { AppShell } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { UnauthorizedError } from "./errors/unauthorized";
import {
  admin,
  getFollowersById,
  getVacations,
  logout,
  me,
} from "./services/api.service";
import { Header } from "./components/header/header";
import { Routing } from "./components/routing/routing";
import { UseExpiredCookie } from "./components/hooks/useExpiredCookie";
import { useDispatch } from "react-redux";
import { addVacations } from "./store/vacationsSlice";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Vacation } from "./interface/vacation";
const path = window.location.pathname;

export const App: React.FC = () => {
  const [user, setUser] = useState<string>();
  const [isAdmin, setIsAdmin] = useState<boolean>();
  const vacations = useSelector<RootState, Vacation[]>(
    (state) => state.vacationsState.vacations
  );
  UseExpiredCookie();

  const navigate = useNavigate();

  const checkLogin = async () => {
    try {
      await getVacationsList();
      const usernameObj = await me();
      const username = usernameObj.username;
      setUser(username);
      const getAdmin = await admin();
      setIsAdmin(getAdmin);
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        setUser("");
        navigate(`/login`, { state: { from: path } });
      }
    }
  };

  const onLogout = async () => {
    await logout();
    setUser("");
    localStorage.removeItem("loginAt");
  };

  useEffect(() => {
    checkLogin();
  }, [user]);

  const dispatch = useDispatch();

  const getVacationsList = async () => {
    const vacationsFromApi = await getVacations();
    const vacations = await Promise.all(
      vacationsFromApi.map(async (vacation) => ({
        ...vacation,
        isUserFollowing: (await getFollowersById(vacation.id)).isUserFollowing,
      }))
    );
    dispatch(addVacations(vacations));
  };

  useEffect(() => {
    if (user && vacations.length < 1) getVacationsList();
  }, [user]);

  return (
    <AppShell
      header={<Header user={user} isAdmin={isAdmin} onLogout={onLogout} />}
    >
      <Routing
        user={user}
        isAdmin={isAdmin}
        onLogin={checkLogin}
        onRegister={checkLogin}
      />
    </AppShell>
  );
};
