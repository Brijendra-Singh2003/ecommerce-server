type new_item = {
    userId: string;
    productId: number;
}

type bucketImage = {
    data: {
        id: string,
        title: string,
        url_viewer: string,
        url: string,
        display_url: string,
        width: number,
        height: number,
        size: number,
        time: number,
        expiration: number,
        image: {
            filename: string,
            name: string,
            mime: string,
            extension: string,
            url: string
        },
        thumb: {
            filename: string,
            name: string,
            mime: string,
            extension: string,
            url: string
        },
        delete_url: string
    },
    success: boolean,
    status: number
}

type newProduct = {
    name: string;
    description: string;
    price: number;
    discount: number;
    imageUrl: string;
    stock: number;
    brandId?: number;
    categoryId?: number;
    imageId: string;
    userId: string;
}

type cookieUser = {
    name: string;
    email: string;
    image: string;
    id: string;
} | undefined;