import "dotenv/config";
import { hash } from "bcryptjs";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const adminPassword = process.env.SEED_ADMIN_PASSWORD;
    const operatorPassword = process.env.SEED_OPERATOR_PASSWORD;

    if (!adminPassword || !operatorPassword) {
        throw new Error(
        "Faltan SEED_ADMIN_PASSWORD o SEED_OPERATOR_PASSWORD en el entorno (.env).",
        );
    }

    const adminPasswordHash = await hash(adminPassword, 10);
    const operatorPasswordHash = await hash(operatorPassword, 10);

    await prisma.user.upsert({
        where: { email: "admin@demo" },
        update: {
            name: "Admin Demo",
            passwordHash: adminPasswordHash,
            role: Role.ADMIN,
        },
        create: {
            email: "admin@demo",
            name: "Admin Demo",
            passwordHash: adminPasswordHash,
            role: Role.ADMIN,
        },
    });

    await prisma.user.upsert({
        where: { email: "operator@demo" },
        update: {
            name: "Operator Demo",
            passwordHash: operatorPasswordHash,
            role: Role.OPERATOR,
        },
        create: {
            email: "operator@demo",
            name: "Operator Demo",
            passwordHash: operatorPasswordHash,
            role: Role.OPERATOR,
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });