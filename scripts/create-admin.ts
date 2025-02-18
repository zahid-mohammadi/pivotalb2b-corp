import { createAdminUser } from "../server/auth";

async function main() {
  try {
    const user = await createAdminUser("admin", "admin123");
    console.log("Admin user created successfully:", user);
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
}

main();