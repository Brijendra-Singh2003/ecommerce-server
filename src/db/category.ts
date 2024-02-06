import { prisma } from "./demo.js"

export async function addCategory(category: string) {
    try {
        const c = await prisma.category.create({ data: { name: category } });
        return c;
    } catch (error) {
        console.log("error while getting category: ", category, error);
        return {};
    }
}

export async function getAllCategories() {
    try {
        const c = await prisma.category.findMany();
        return c;
    } catch (error) {
        console.log("error while getting all categories", error);
        return [];
    }
}