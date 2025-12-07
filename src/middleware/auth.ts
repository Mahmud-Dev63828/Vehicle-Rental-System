import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Unauthorize Token missing.",
        });
      }

      const token = authHeader.split(" ")[1];

      const secret = config.jwtSecret;
      if (!secret) {
        throw new Error("JWT Secret is missing");
      }

      const decoded = jwt.verify(token as any, secret) as JwtPayload;

      req.user = decoded;

      if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: " You are not allowe.",
        });
      }

      next();
    } catch (err: any) {
      return res.status(403).json({
        success: false,
        message: err.message,
      });
    }
  };
};

export default auth;
