import { list } from "@keystone-6/core";
import { allOperations, allowAll } from '@keystone-6/core/access';
import { text, password } from "@keystone-6/core/fields";

export const User = list({
    access: {
        operation: {
            ...allOperations(allowAll),
        }
    },
    fields: {
        name: text({ validation: { isRequired: true } }),
        email: text({ isIndexed: 'unique', validation: { isRequired: true } }),
        password: password(),

        // TODO add roles cart and orders
    },
});
