import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/auth/signup", userControllers.createUser);


router.get(
  "/users",
  auth("admin"),                  
  userControllers.getUser
);

router.get(
  "/users/:id",
  auth("admin", "customer"),      
  userControllers.getSingleUser
);


router.put(
  "/users/:id",
  auth("admin", "customer"),      
  userControllers.updateUser
);

router.delete(
  "/users/:id",
  auth("admin"),               
  userControllers.deleteUser
);

export const userRoutes = router;
