import 'dotenv/config';
import { config } from '@keystone-6/core';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { createAuth } from '@keystone-6/auth';
import { statelessSessions } from "@keystone-6/core/session";
import { insertSeedData } from './seed-data';
const databaseURL = process.env.DATABASE_URL || 'file:./keystone.db';

const sessionConfig = {
    maxAtge: 60 * 60 * 24 * 360, // How long should they stay signed in?
    secret: process.env.COOKIE_SECRET || 'This secret should only be used in testing'
};

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
        // TODO: add in inital roles here 
    }
})

export default withAuth(config({
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL!],
            credentials: true,
        },

    },
    db: {
        provider: 'sqlite',
        url: databaseURL,
        // TODO: Add data seeding here
        async onConnect(context) {
            console.log('Connected to the database!');
            if (process.argv.includes('--seed-data')) {
                await insertSeedData(context);
            }
        }

    },
    lists: {
        // Schema items go in here
        User,
        Product,
        ProductImage
    },
    ui: {
        // Show the UI only for people who pass this test
        isAccessAllowed: ({ session }) => {
            // console.log(session);
            return !!session?.data;
        }
    },
    // TODO: Add session values here
    session: statelessSessions(sessionConfig),
},

));