import express from 'express';
// import connectDB = require('./config/db.js');
import connectDB from './config/db.js';


connectDB();
// const app = express();
export const app = express();
// app.use(express.json());
// connectDB();
// app.get('/', (req, res) => res.send('Hello world!'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

import cors from 'cors';
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '100mb' }));

// routes
import formRoute from './routes/formRoute.js';
app.use("/", formRoute);

// const blogRoutes = require('./routes/blogRoute')
import blogRoutes from './routes/blogRoute.js';
import bodyParser from 'body-parser';
app.use("/blog", blogRoutes);


app.listen(8080, (err) => {
    console.log(err);
})