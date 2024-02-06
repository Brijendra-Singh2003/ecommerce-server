// import { PrismaClient } from '@prisma/client/edge'
import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient()

export async function searchTop10ProductsByName(searchName: string) {
    try {
        await prisma.$connect();
        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: searchName
                }
            }
        })
        console.log(products);
        // return products;
    } catch (error) {
        console.error('Error searching for products:', error);
        // return [];
    } finally {
        // await prisma.$disconnect();
    }
}