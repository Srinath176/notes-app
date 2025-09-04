import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


interface JwtPayload {
  id: string;
}

export const authMiddleware = (
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction
): void | Response => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    console.warn("❌ No token provided in request headers");
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token,"notessecret") as JwtPayload;
    req.userId = decoded.id;

    // ✅ Debug log
    console.log("🔑 Authenticated request:", {
      userId: req.userId,
      path: req.path,
      method: req.method,
    });

    return next();
  } catch (err) {
    console.error("❌ JWT verification failed:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
