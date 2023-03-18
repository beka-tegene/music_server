

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`Successfully Connected with mongoDB ${con.connection.host}`);
    } catch (error) {
        console.log(error);
    }
    
    
}

module.exports = connectDB;