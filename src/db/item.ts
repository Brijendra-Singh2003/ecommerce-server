import { prisma } from "./demo.js";

export async function getCarts() {
    try {
        const items = await prisma.item.findMany();
        return items;
    } catch (error: any) {
        console.log(error.message);
        return {};
    }
}

export async function getCartSize(userId: string) {
    try {
        const count = await prisma.item.count({
            where: {
                userId
            }
        });
        return count;
    } catch (error: any) {
        console.log(error.message);
        return 0;
    }
}

export async function addItem(newItem: new_item) {
    try {
        return await prisma.item.create({
            data: newItem
        })
    } catch (error: any) {
        console.log(error.message);
        return {};
    }
}

export async function updateItem(id: number, quantity: number) {
    try {
        return await prisma.item.update({
            where: { id },
            data: { quantity }
        })
    } catch (error: any) {
        console.log(error.message);
        return {};
    }
}

export async function getItem(newItem: new_item) {
    try {
        return await prisma.item.findFirst({
            where: {
                userId: newItem.userId,
                productId: newItem.productId,
            }
        });
    } catch (error: any) {
        console.log(error.message);
        return {};
    }
}

export async function getItemById(id: number) {
    try {
        return await prisma.item.findUnique({ where: { id } });
    } catch (error: any) {
        console.log(error.message);
        return {};
    }
}

export async function removeItemById(id: number) {
    try {
        return await prisma.item.delete({ where: { id } });
    } catch (error: any) {
        console.log(error.message);
        return {};
    }
}