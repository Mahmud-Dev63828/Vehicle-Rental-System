import express from "express";
import { bookingControllers } from "./bookings.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/bookings",
  auth("admin", "customer"),
  bookingControllers.createBooking
);

router.get(
  "/bookings",
  auth("admin", "customer"),
  bookingControllers.getBookings
);

router.get(
  "/bookings/:id",
  auth("admin", "customer"),
  bookingControllers.getSingleBooking
);

router.put(
  "/bookings/:id",
  auth("admin", "customer"),
  bookingControllers.updateBooking
);

router.delete("/bookings/:id", auth("admin"), bookingControllers.deleteBooking);

export const bookingRoutes = router;
