import { list } from "@keystone-6/core";
import { integer, relationship, select, text } from "@keystone-6/core/fields";
import { allOperations, allowAll } from '@keystone-6/core/access';


export const Product = list(
    {
        // TODO

        // access
        access: {
            operation: {
                ...allOperations(allowAll),
            }
        },

        fields: {
            name: text({ validation: { isRequired: true } }),
            description: text({
                ui: {
                    displayMode: 'textarea',
                }
            }),
            photo: relationship({
                ref: 'ProductImage.product',
                ui: {
                    displayMode: 'cards',
                    cardFields: ['image', 'altText'],
                    inlineCreate: { fields: ['image', 'altText'] },
                    inlineEdit: { fields: ['image', 'altText'] }
                }
            }),
            status: select({
                options: [
                    { label: 'Draft', value: 'DRAFT' },
                    { label: 'Available', value: 'AVAILABLE' },
                    { label: 'Unavailable', value: 'UNAVAILABLE' }
                ],
                defaultValue: 'DRAFT',
                ui: {
                    displayMode: 'segmented-control',
                    createView: {
                        fieldMode: 'hidden'
                    }
                }
            }),
            price: integer(),
            // TODO: photo
        }
    }
);
