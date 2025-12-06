import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, any>) => {
  const {
    customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    total_price,
    status,
  } = payload;

  if (new Date(rent_end_date) <= new Date(rent_start_date)) {
    throw new Error("Rent end date must be after start date");
  }

  if (total_price <= 0) {
    throw new Error("Total price must be a positive value");
  }

  const result = await pool.query(
    `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status || "active",
    ]
  );

  return result;
};

const getBookings = async () => {
  const result = await pool.query(`SELECT * FROM bookings`);
  return result;
};

const getSingleBooking = async (bookingId: string) => {
  const result = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [
    bookingId,
  ]);
  return result;
};

const updateBooking = async (
  bookingId: string,
  payload: Record<string, any>
) => {
  const { rent_start_date, rent_end_date, total_price, status } = payload;

  const result = await pool.query(
    `UPDATE bookings
     SET rent_start_date=$1,
         rent_end_date=$2,
         total_price=$3,
         status=$4
     WHERE id=$5
     RETURNING *`,
    [rent_start_date, rent_end_date, total_price, status, bookingId]
  );

  return result;
};

const deleteBooking = async (bookingId: string) => {
  const result = await pool.query(`DELETE FROM bookings WHERE id = $1`, [
    bookingId,
  ]);

  return result;
};

export const bookingServices = {
  createBooking,
  getBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
