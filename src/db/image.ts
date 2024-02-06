import { Image } from "@prisma/client";
import { prisma } from "./demo.js";

export async function getImage(id: string) {
    try {
        const image = await prisma.image.findUnique({ where: { id } });
        return image;
    } catch (error) {
        console.log("error getting image: ", id, error);
        return {};
    }
}

export async function addImage(image: Image) {
    try {
        const img = await prisma.image.upsert({
            where: { id: image.id },
            create: image,
            update: image,
        })
        return image;
    } catch (error) {
        console.log("error saving image: ", error);
        return {};
    }
}

export async function removeImage(id: string) {
    try {
        const image = await prisma.image.delete({ where: { id } });
        if (image) {
            const res = await fetch(image.delete_url + "?key=" + process.env.BUCKET_KEY as string, {
                method: "DELETE"
            });
            const data = await res.json();
            console.log(data);
        }
    } catch (error) {

    }
}