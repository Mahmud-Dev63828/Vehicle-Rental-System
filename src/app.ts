import express, { Request, Response } from "express";
import config from "./config";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/user/user.routes";
import { vehicleRoutes } from "./modules/vehicles/vehicles.routes";
import { bookingRoutes } from "./modules/booking/bookings.routes";

const app = express();
// parser
app.use(express.json());

// initializing DB
initDB();

//users CRUD
app.use("/api/v1", userRoutes);

//auth routes
app.use("/api/v1", authRoutes);

app.use("/api/v1", vehicleRoutes);

app.use("/api/v1", bookingRoutes);
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

export default app;
