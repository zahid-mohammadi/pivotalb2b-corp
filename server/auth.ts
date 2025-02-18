import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User } from "@shared/schema";

declare global {
  namespace Express {
    interface User {
      id: number;
      username: string;
      role: string;
    }
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  try {
    const [hash, salt] = stored.split(".");
    if (!hash || !salt) {
      console.error("Invalid stored password format");
      return false;
    }

    const hashBuffer = Buffer.from(hash, "hex");
    const suppliedBuffer = (await scryptAsync(supplied, salt, 64)) as Buffer;

    return timingSafeEqual(hashBuffer, suppliedBuffer);
  } catch (error) {
    console.error("Password comparison error:", error);
    return false;
  }
}

export function setupAuth(app: Express) {
  if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET environment variable must be set");
  }

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      },
      store: storage.sessionStore
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        console.log("Attempting authentication for username:", username);
        const user = await storage.getUserByUsername(username);

        if (!user) {
          console.log("User not found:", username);
          return done(null, false, { message: "Invalid username or password" });
        }

        console.log("Found user:", { id: user.id, username: user.username, role: user.role });

        const isValid = await comparePasswords(password, user.password);
        console.log("Password validation result:", isValid);

        if (!isValid) {
          return done(null, false, { message: "Invalid username or password" });
        }

        console.log("Authentication successful for user:", username);
        return done(null, user);
      } catch (error) {
        console.error("Authentication error:", error);
        return done(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    console.log("Serializing user:", user.id);
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      console.log("Deserializing user:", id);
      const user = await storage.getUserById(id);
      if (!user) {
        console.log("User not found during deserialization:", id);
        return done(null, false);
      }
      console.log("Deserialized user:", { id: user.id, username: user.username, role: user.role });
      done(null, user);
    } catch (error) {
      console.error("Deserialization error:", error);
      done(error);
    }
  });

  app.post("/api/login", (req, res, next) => {
    console.log("Login attempt received:", { username: req.body.username });

    passport.authenticate("local", (err: Error, user: User, info: any) => {
      if (err) {
        console.error("Login error:", err);
        return next(err);
      }

      if (!user) {
        console.log("Login failed:", info?.message || "Authentication failed");
        return res.status(401).json({ error: info?.message || "Invalid username or password" });
      }

      req.logIn(user, (err) => {
        if (err) {
          console.error("Login session error:", err);
          return next(err);
        }
        console.log("Login successful for user:", user.username);
        res.json(user);
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res) => {
    const username = req.user?.username;
    req.logout(() => {
      console.log("Logout successful for user:", username);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.user) {
      console.log("Unauthorized access attempt to /api/user");
      return res.status(401).json({ error: "Not authenticated" });
    }
    console.log("Current user data requested:", { id: req.user.id, username: req.user.username, role: req.user.role });
    res.json(req.user);
  });
}

export async function createAdminUser(username: string, password: string): Promise<User> {
  try {
    const hashedPassword = await hashPassword(password);
    console.log("Creating admin user with hashed password");
    return await storage.createUser({
      username,
      email: `${username}@pivotal-b2b.com`,
      password: hashedPassword,
      role: "admin"
    });
  } catch (error) {
    console.error("Error creating admin user:", error);
    throw error;
  }
}