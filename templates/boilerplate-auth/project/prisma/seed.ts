import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function main() {
  // Verifica si ya existen datos en la base de datos
 /*  const [
    adminsAlreadyCreated,
    employeesAlreadyCreated,
    familysAlreadyCreated,
    productAlreadyCreated,
    saleAlreadyCreated,
    paymentAlreadyCreated,
  ] = await prisma.$transaction([
    prisma.admin.findMany(),
    prisma.employee.findMany(),
    prisma.family.findMany(),
    prisma.product.findMany(),
    prisma.buy.findMany(),
    prisma.payment.findMany(),
  ]);

  if (
    adminsAlreadyCreated.length > 0 &&
    employeesAlreadyCreated.length > 0 &&
    familysAlreadyCreated.length > 0 &&
    productAlreadyCreated.length > 0 &&
    saleAlreadyCreated.length > 0 &&
    paymentAlreadyCreated.length > 0
  ) {
    return;
  } */

  // Limpia la base de datos
  await prisma.$transaction([
    
  ]);

  // Crea nuevos datos
  await prisma.$transaction(async () => {
    
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
