import express from "express";
import auth from "../../middleware/auth";
import { vehicleControllers } from "./vehicles.controller";

const router = express.Router();

router.post("/vehicles", auth("admin"), vehicleControllers.createVehicle);

router.get("/vehicles", vehicleControllers.getVehicles);

router.get("/vehicles/:id", vehicleControllers.getSingleVehicle);

router.put("/vehicles/:id", auth("admin"), vehicleControllers.updateVehicle);

router.delete("/vehicles/:id", auth("admin"), vehicleControllers.deleteVehicle);

export const vehicleRoutes = router;
