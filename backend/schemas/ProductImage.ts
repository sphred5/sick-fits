import 'dotenv/config';
import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";
import { allOperations, allowAll } from '@keystone-6/core/access';
import { cloudinaryImage } from "@keystone-6/cloudinary";


export const cloudinary = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_KEY,
    apiSecret: process.env.CLOUDINARY_SECRET,
    folder: 'sickfits'
}

export const ProductImage = list({
    access: {
        operation: {
            ...allOperations(allowAll),
        }
    },
    fields: {
        image: cloudinaryImage({
            cloudinary,
            label: 'Source'
        }),
        altText: text(),
        product: relationship({ ref: 'Product.photo' })
    }
});