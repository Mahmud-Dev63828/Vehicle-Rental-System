import { Request, Response } from "express";
import { bookingServices } from "./bookings.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.createBooking(req.body);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getBookings = async (_req: Request, res: Response) => {
  try {
    const result = await bookingServices.getBookings();

    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getSingleBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.getSingleBooking(req.params.id!);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking fetched successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.updateBooking(
      req.params.id!,
      req.body
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.deleteBooking(req.params.id!);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const bookingControllers = {
  createBooking,
  getBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
