import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { errorHandler } from "./middlewares/error-handler";
import { logger } from "./middlewares/logger";
import { notFound } from "./middlewares/not-found";
import { usersRouter } from "./users/users.controller";
import { vacationsRouter } from "./vacations/vacations.controller";
import { followersRouter } from "./followers/followers.controller";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.static(`${__dirname}/public`));

app.use(logger);

app.use(express.json());

app.use(cookieParser("mysecretforcookies"));

app.use("/api/v1/vacations", vacationsRouter);
app.use("/api/v1/auth", usersRouter);
app.use("/api/v1/following", followersRouter);
app.use(notFound);

app.use(errorHandler);

app.listen(3001, () => {
  console.log("Service is listening....");
});
