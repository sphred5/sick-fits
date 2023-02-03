import { list } from "@keystone-6/core";
import { text, password, relationship} from "@keystone-6/core/fields";

export const User = list({
    // access: 
    // ui 
    fields: {
        name: text({ validation: { isRequired: true } }),
        email: text({ isIndexed: 'unique', validation: { isRequired: true } }),
        password: password()
    }
});