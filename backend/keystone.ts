import 'dotenv/config';
import { config } from '@keystone-6/core';
import User from './schemas/User';

const databaseURL = process.env.DATABASE_URL || 'file:./keystone.db';

const sessionConfig = {
    maxAtge: 60 * 60 * 24 * 360, // How long should they stay signed in?
    secret: process.env.COOKIE_SECRET || 'This secret should only be used in testing'
};

export default config({
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL!],
            credentials: true,
        },

    },
    db: {
        provider: 'sqlite',
        url: databaseURL
        // TODO: Add data seeding here
    },
    lists: {
        // Schema items go in here
        User
    },
    ui: {
        // TODO: change this for roles
        isAccessAllowed: () => true,
    },
    // TODO: Add session values here
},

)