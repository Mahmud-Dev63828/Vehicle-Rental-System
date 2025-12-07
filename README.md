# 🚗 Vehicle Rental System

**Live URL:** [Add your live URL here]

---

## 🎯 Project Overview

The **Vehicle Rental System** is a backend API designed to manage a vehicle rental business efficiently. The system supports:

- **Vehicles** – Manage vehicle inventory with availability tracking
- **Customers** – Manage customer accounts and profiles
- **Bookings** – Handle vehicle rentals, returns, and cost calculations
- **Authentication** – Secure role-based access control (Admin and Customer roles)

---

## 🛠️ Technology Stack

- **Node.js + TypeScript** – Backend runtime and language
- **Express.js** – Web framework for building API routes
- **PostgreSQL** – Relational database for storing users, vehicles, and bookings
- **bcrypt** – Password hashing for secure storage
- **jsonwebtoken (JWT)** – Token-based authentication

---

## 📁 Code Structure

The project follows a **modular architecture** with clear separation of concerns. Each feature has its own module:

- `auth` – User authentication and authorization
- `users` – User management (CRUD operations)
- `vehicles` – Vehicle management
- `bookings` – Booking management

Each module contains routes, controllers, and services for maintainability and scalability.

---

## 📊 Database Tables

### Users

| Field    | Notes                       |
| -------- | --------------------------- |
| id       | Auto-generated              |
| name     | Required                    |
| email    | Required, unique, lowercase |
| password | Required, min 6 characters  |
| phone    | Required                    |
| role     | 'admin' or 'customer'       |

### Vehicles

| Field               | Notes                         |
| ------------------- | ----------------------------- |
| id                  | Auto-generated                |
| vehicle_name        | Required                      |
| type                | 'car', 'bike', 'van' or 'SUV' |
| registration_number | Required, unique              |
| daily_rent_price    | Required, positive            |
| availability_status | 'available' or 'booked'       |

### Bookings

| Field           | Notes                               |
| --------------- | ----------------------------------- |
| id              | Auto-generated                      |
| customer_id     | Links to Users table                |
| vehicle_id      | Links to Vehicles table             |
| rent_start_date | Required                            |
| rent_end_date   | Required, must be after start date  |
| total_price     | Required, positive                  |
| status          | 'active', 'cancelled' or 'returned' |

---

## 🔐 Authentication & Authorization

### User Roles

- **Admin** – Full access to manage vehicles, users, and all bookings
- **Customer** – Can register, view vehicles, and create/manage own bookings

### Authentication Flow

- Passwords are hashed using **bcrypt** before database storage
- Users login via `/api/v1/auth/signin` to receive a **JWT**
- Protected endpoints require `Authorization: Bearer <token>` header
- Token validation ensures proper access; unauthorized requests return `401` or `403`

---

## 🌐 API Endpoints

### Authentication

| Method | Endpoint            | Access | Description           |
| ------ | ------------------- | ------ | --------------------- |
| POST   | /api/v1/auth/signup | Public | Register new user     |
| POST   | /api/v1/auth/signin | Public | Login and receive JWT |

### Vehicles

| Method | Endpoint                    | Access     | Description                            |
| ------ | --------------------------- | ---------- | -------------------------------------- |
| POST   | /api/v1/vehicles            | Admin only | Add new vehicle                        |
| GET    | /api/v1/vehicles            | Public     | View all vehicles                      |
| GET    | /api/v1/vehicles/:vehicleId | Public     | View specific vehicle details          |
| PUT    | /api/v1/vehicles/:vehicleId | Admin only | Update vehicle details or availability |
| DELETE | /api/v1/vehicles/:vehicleId | Admin only | Delete vehicle (if no active bookings) |

### Users

| Method | Endpoint              | Access       | Description                            |
| ------ | --------------------- | ------------ | -------------------------------------- |
| GET    | /api/v1/users         | Admin only   | View all users                         |
| PUT    | /api/v1/users/:userId | Admin or Own | Update any user (Admin) or own profile |
| DELETE | /api/v1/users/:userId | Admin only   | Delete user (if no active bookings)    |

### Bookings

| Method | Endpoint                    | Access         | Description                                                                          |
| ------ | --------------------------- | -------------- | ------------------------------------------------------------------------------------ |
| POST   | /api/v1/bookings            | Customer/Admin | Create booking, validate availability, calculate total price, mark vehicle as booked |
| GET    | /api/v1/bookings            | Role-based     | Admin: View all bookings; Customer: View own bookings                                |
| PUT    | /api/v1/bookings/:bookingId | Role-based     | Customer: Cancel booking (before start date); Admin: Mark as returned                |

> **Note:** All endpoints must strictly follow the API Reference specification, including URL patterns, request/response formats, and authentication.

---

## ⚡ Setup & Usage Instructions

### Prerequisites

- Node.js >= 18.x
- PostgreSQL installed and running

### Installation

```bash
# Clone repository
git clone <repository-url>
cd vehicle-rental-system

# Install dependencies
npm install

# Set environment variables
# Create a .env file based on .env.example
```
