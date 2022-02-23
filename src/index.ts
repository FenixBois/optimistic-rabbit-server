import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.recepie.create({
        data: {
            title: 'Bartíkuv párek s kečupem',
            content: '3 lžičky kečupu a párek',
        },
    });

    const getAllRecepies = await prisma.recepie.findMany();
    console.log(getAllRecepies);
}

main()
    .catch(e => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
