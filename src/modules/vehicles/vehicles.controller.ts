import { Request, Response } from "express";
import { vehicleServices } from "./vehicles.service";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.createVehicle(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle added successfully",
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

const getVehicles = async (_req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getVehicles();
    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getSingleVehicle(req.params.id!);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle fetched successfully",
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

const updateVehicle = async (req: Request, res: Response) => {
  try {
    const {
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    } = req.body;

    const result = await vehicleServices.updateVehicle(req.params.id!, {
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    });

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
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

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.deleteVehicle(req.params.id!);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found or has active bookings",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const vehicleControllers = {
  createVehicle,
  getVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
