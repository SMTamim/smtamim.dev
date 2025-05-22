import bcrypt from "bcrypt";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "tamimmahmud0@gmail.com";
  const plainPassword = "TamimAdmin124!";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: "S M Tamim Mahmud",
        password: hashedPassword
      }
    });
    console.log("Admin user seeded");
  } else {
    console.log("Admin user already exists");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
