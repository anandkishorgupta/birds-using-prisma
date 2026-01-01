import bcrypt from "bcrypt";

import prisma from "./lib/prisma";

export default prisma;

async function main() {
  const existingAdmin = await prisma.user.findFirst({
    where: { role: "admin" },
  });

  if (existingAdmin) {
    console.log("Admin already exists");
    return;
  }

  // 🔐 Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash("admin", saltRounds);

  const admin = await prisma.user.create({
    data: {
      name: "admin",
      email: "admin@gmail.com",
      password: hashedPassword, // ✅ hashed
      role: "admin",
      phone: "1234567890",
    },
  });

  console.log("Admin created:", admin);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
