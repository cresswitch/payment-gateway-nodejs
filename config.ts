require('dotenv').config();

export default {
    port: process.env.PORT || 3000,
    mongoURI: process.env.mongoURI,
    jwtSecret: process.env.jwtSecret,
    stripeSecretKey: process.env.stripeSecretKey as string
};