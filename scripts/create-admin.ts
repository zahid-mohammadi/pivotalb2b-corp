import { createAdminUser } from "../server/auth";

async function main() {
  try {
    const user = await createAdminUser("zahid.m@pivotal-b2b.com", "654KkabuLL");
    console.log("Admin user created successfully:", user);
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

main();
