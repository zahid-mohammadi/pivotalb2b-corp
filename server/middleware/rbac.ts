import { Request, Response, NextFunction } from "express";
import type { User } from "@shared/schema";

export type UserRole = "admin" | "marketing" | "sales" | "user";

export interface AuthRequest extends Request {
  user?: User;
}

export function requireRole(...allowedRoles: UserRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const userRole = req.user.role as UserRole;
    
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ 
        error: "Access denied", 
        message: `This action requires one of the following roles: ${allowedRoles.join(", ")}` 
      });
    }

    next();
  };
}

export function checkPermission(resource: string, action: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const userRole = req.user.role as UserRole;
    
    const permissions: Record<UserRole, Record<string, string[]>> = {
      admin: {
        pipeline: ["read", "write", "delete"],
        campaigns: ["read", "write", "delete"],
        analytics: ["read"],
        automation: ["read", "write", "delete"],
        users: ["read", "write", "delete"],
        settings: ["read", "write"],
      },
      marketing: {
        pipeline: ["read", "write"],
        campaigns: ["read", "write", "delete"],
        analytics: ["read"],
        automation: ["read", "write"],
        users: ["read"],
        settings: ["read"],
      },
      sales: {
        pipeline: ["read", "write"],
        campaigns: ["read"],
        analytics: ["read"],
        automation: ["read"],
        users: ["read"],
        settings: ["read"],
      },
      user: {
        pipeline: ["read"],
        campaigns: [],
        analytics: [],
        automation: [],
        users: [],
        settings: [],
      },
    };

    const rolePermissions = permissions[userRole];
    if (!rolePermissions || !rolePermissions[resource]?.includes(action)) {
      return res.status(403).json({ 
        error: "Access denied", 
        message: `You don't have permission to ${action} ${resource}` 
      });
    }

    next();
  };
}

export function isAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
}

export function isSalesOrMarketing(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user || !["sales", "marketing", "admin"].includes(req.user.role)) {
    return res.status(403).json({ error: "Sales or Marketing access required" });
  }
  next();
}
