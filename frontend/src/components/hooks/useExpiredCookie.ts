import { useEffect, useState } from "react";

export const UseExpiredCookie = () => {
  const [timerId, setTimerId] = useState<NodeJS.Timer>();

  useEffect(() => {
    const timer = setInterval(() => {
      const loginAt = localStorage.getItem("loginAt");
      if (loginAt) {
        const dateTime = Date.parse(loginAt);
        const now = Date.parse(new Date().toISOString());
        const diff = now - dateTime;
        const isExpired = diff > 814600000;
        if (isExpired) {
          localStorage.removeItem("loginAt");
          window.location.reload();
        }
      }
    }, 1000);
    setTimerId(timer);
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, []);
};
