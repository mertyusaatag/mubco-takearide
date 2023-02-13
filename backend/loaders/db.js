const mongoose = require("mongoose");

const db = mongoose.connection;

db.once("open", () => {
    console.log("db connected");
});

const connectDB = async () => {
    try {
        // hatayı yakalamk için await.
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    catch(err) {
        throw err;
    }
  
};

module.exports = {
    connectDB,
};