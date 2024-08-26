import dotenv from 'dotenv';
dotenv.config()

const configuration={
    CONNECTION:process.env.MONGO_URI,
    PORT:process.env.PORT,
    sendGridKey:process.env.SENDGRID_KEY,
    tokenSecretKey:process.env.TOKEN_SECRET_KEY,
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
}

export default configuration;
