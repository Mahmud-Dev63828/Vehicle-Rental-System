import express from "express";
import { bookingControllers } from "./bookings.controller";

const router = express.Router();

router.post("/bookings", bookingControllers.createBooking);

router.get("/bookings", bookingControllers.getBookings);

router.get("/bookings/:id", bookingControllers.getSingleBooking);

router.put("/bookings/:id", bookingControllers.updateBooking);

router.delete("/bookings/:id", bookingControllers.deleteBooking);

export const bookingRoutes = router;
