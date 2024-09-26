import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';
import configuration from './configs/index.js';
import swaggerUi from 'swagger-ui-express';
import documentation from './doc/swaggerDocumentation.js'
import cors from 'cors'
import fileUpload from 'express-fileupload';

const app = express();
app.use(express.json())
app.use(fileUpload()); 
const db = configuration.CONNECTION;
const port = configuration.PORT;

const corsOptions={
    origin:[
"http://localhost:5173/",

    ],
methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
allowedHeaders: "Content-Type, Authorization",
credentials: true,
}
// Middleware setup
app.use(cors(corsOptions))
app.use("/api-documentation", swaggerUi.serve);
app.use("/api-documentation",swaggerUi.setup(documentation))

app.use('/',router)
app.use('/api/v1', router);
// Connect to MongoDB
mongoose.connect(db)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server listening on port ${port}...`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB:', err.message);
    });
