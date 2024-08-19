import dotenv from 'dotenv';
dotenv.config()

const configuration={
    CONNECTION:process.env.MONGO_URI,
    PORT:process.env.PORT
}

export default configuration;
