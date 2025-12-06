import express from "express";
import auth from "../../middleware/auth";
import { vehicleControllers } from "./vehicles.controller";

const router = express.Router();

router.post("/vehicles", vehicleControllers.createVehicle);

router.get("/vehicles", vehicleControllers.getVehicles);

router.get("/vehicles/:id", vehicleControllers.getSingleVehicle);

router.put("/vehicles/:id", vehicleControllers.updateVehicle);

router.delete("/vehicles/:id", vehicleControllers.deleteVehicle);

export const vehicleRoutes = router;
