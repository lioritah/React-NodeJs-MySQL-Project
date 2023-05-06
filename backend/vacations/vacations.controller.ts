import { v4 as uuid } from "uuid";
import * as schema from "./vacations.schema";
import multer, { diskStorage } from "multer";
import path from "path";
import express from "express";
import {
  GetVacationsQuery,
  PartialVacationData,
  Vacation,
  VacationData,
  VacationsParams,
} from "./vacations.types";
import { adminAuthenticator } from "../middlewares/authentication";
import { ZodError } from "zod";
import { NotFoundError } from "../errors";
import {
  createVacation,
  deleteVacation,
  fullUpdateVacation,
  partialUpdateVacation,
} from "./vacations.bl";
import { getVacationById, getVacations } from "./vacations.dal";

export const vacationsRouter = express.Router();

const storage = diskStorage({
  destination: "./public/images",
  filename: (req, file, cb) => {
    const fileName = `${uuid()}${path.extname(file.originalname)}`; // path.extname('foo.bar') ===> '.bar'
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
});

vacationsRouter.get<{}, Vacation[], {}, GetVacationsQuery>(
  "/",
  async (req, res, next) => {
    try {
      const options = schema.getVacationsOptions.parse(req.query);
      const vacations = await getVacations(options);
      return res.status(200).json(vacations);
    } catch (err) {
      next(err);
    }
  }
);

vacationsRouter.get<VacationsParams, Vacation>(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = schema.vacationsParams.parse(req.params);
      const vacation = await getVacationById(+id);
      if (!vacation) {
        throw new NotFoundError(
          "The vacation you are looking for does not exist"
        );
      }
      return res.status(200).json(vacation);
    } catch (err) {
      next(err);
    }
  }
);

vacationsRouter.post<{}, Vacation, VacationData>(
  "/",
  adminAuthenticator,
  upload.single("image"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        throw new ZodError([
          { message: "Missing image file", code: "custom", path: ["image"] },
        ]);
      }
      const vacationData = schema.vacationData.parse(req.body);
      const vacation = await createVacation(
        vacationData,
        req.file.filename,
        (req as any).username
      );
      return res.status(201).json(vacation);
    } catch (err) {
      next(err);
    }
  }
);
vacationsRouter.delete<VacationsParams>(
  "/:id",
  adminAuthenticator,
  async (req, res, next) => {
    try {
      const { id } = schema.vacationsParams.parse(req.params);
      await deleteVacation(+id);
      return res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);

vacationsRouter.put<VacationsParams, Vacation, VacationData>(
  "/:id",
  adminAuthenticator,
  upload.single("image"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        throw new ZodError([
          { message: "Missing image file", code: "custom", path: ["image"] },
        ]);
      }
      const { id } = schema.vacationsParams.parse(req.params);
      const vacationData = schema.vacationData.parse(req.body);
      const vacation = await fullUpdateVacation(
        vacationData,
        +id,
        req.file.filename
      );
      return res.status(200).json(vacation);
    } catch (err) {
      next(err);
    }
  }
);

vacationsRouter.patch<VacationsParams, Vacation, PartialVacationData>(
  "/:id",
  adminAuthenticator,
  async (req, res, next) => {
    try {
      const { id } = schema.vacationsParams.parse(req.params);
      const partialVacationData = schema.partialVacationData.parse(req.body);
      const player = await partialUpdateVacation(partialVacationData, +id);
      return res.json(player);
    } catch (err) {
      next(err);
    }
  }
);
