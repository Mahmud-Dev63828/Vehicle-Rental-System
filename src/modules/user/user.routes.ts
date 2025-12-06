import express, { Request, Response } from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

// app.use("/users", userRooutes)

// routes -> controller -> service

router.post("/auth/signup", userControllers.createUser);

router.get("/users", userControllers.getUser);

router.get("/users/:id", userControllers.getSingleUser);

router.put("/users/:id", userControllers.updateUser);

router.delete("/users/:id", userControllers.deleteUser);

export const userRoutes = router;
