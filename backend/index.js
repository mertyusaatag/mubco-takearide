const express = require('express')
const config =  require('./config/index');
const loaders = require('./loaders');
const cors = require('cors');
const helmet = require('helmet');
const { passengerRoutes, driverRoutes, bookingRoutes } = require('./routes');
const dotenv = require('dotenv');

config();
loaders();
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.listen(process.env.APP_PORT, function (){
    app.use("/passenger",passengerRoutes);
    app.use("/driver",driverRoutes);
    app.use("/booking",bookingRoutes);
});

