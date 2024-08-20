import express from 'express';
import mongoose from 'mongoose';
import routerUser from './routes/index.js';
import configuration from './configs/index.js';
import swaggerUi from 'swagger-ui-express';
import documentation from './doc/swaggerDocumentation.js'

const app = express();
app.use(express.json())
const db = configuration.CONNECTION;
const port = configuration.PORT;

// Middleware setup
app.use("/api-documentation", swaggerUi.serve);
app.use("/api-documentation",swaggerUi.setup(documentation))

app.use('/api/v1', routerUser);
// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server listening on port ${port}...`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB:', err.message);
    });
