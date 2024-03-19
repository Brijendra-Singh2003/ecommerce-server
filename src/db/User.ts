import { Prisma, Profile } from "@prisma/client"
import { prisma } from "./demo.js"
import { DefaultArgs } from "@prisma/client/runtime/library.js"

export async function getAllUsers() {
    try {
        return await prisma.user.findMany();
    } catch (error: any) {
        console.log(error.message);
        return [];
    }
}

export async function getUserById(id: string) {
    try {
        return await prisma.user.findUnique({ where: { id } });
    } catch (error: any) {
        console.log(error.message);
        return {};
    }
}

type newUser = {
    name: string,
    email: string,
    id: string;
    image: string;
}

export async function AddUser(user: newUser) {
    try {
        const new_user = await prisma.user.upsert({
            where: {
                email: user.email,
            },
            update: user,
            create: user
        });
        console.log("created user: ", new_user);
        return new_user;
    } catch (error: any) {
        console.log("error occured while saving user: ", error.message);
    }
}

export async function getUser(email: string, options: Prisma.UserSelect<DefaultArgs> | undefined) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: options
        });
        console.log("got user: ", user);
        return user;
    } catch (error: any) {
        console.log("error while getting the user from database: ", error.message);
    }
}

export async function setProfile(profile: Profile) {
    try {
        const new_profile = await prisma.profile.upsert({
            where: {
                userId: profile.userId
            },
            update: profile,
            create: profile
        });
        // console.log("profile saved: ", new_profile);
        return new_profile;
    } catch (error: any) {
        console.log("error occured while saving profile: ", error.message);
    }
}

export async function getProfile(userId: string) {
    try {
        const profile = await prisma.profile.findUnique({
            where: {
                userId: userId
            },
        });
        return profile;
    } catch (error: any) {
        console.log("error getting profile: ", error.message);
    }
}

export async function addItemToCart(productId: number, id: string) {
    try {
        const new_item = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                cart: {
                    create: {
                        productId: productId,
                    }
                }
            }
        })
        console.log("item added to cart cart: ", new_item);
        return new_item;
    } catch (error) {
        console.error("Error adding item to cart: ", error);
    }
}

export async function getCartItems(userId: string) {
    try {
        const new_items = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                cart: {
                    include: {
                        product: true
                    }
                }
            }
        });
        console.log("items: ", new_items);
        return new_items;
    } catch (error) {
        console.error("Error getting items from cart: ", error);
    }
}

export async function getUserProducts(id: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                Product: true
            }
        })
        return user?.Product || [];
    } catch (error) {
        console.log("error getting user products: ", error);
        return [];
    }
}