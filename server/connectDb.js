const mongoose = require('mongoose');


const connectDb = async () => {
  try {
    const dbUrl = process.env.DB_URL;

    if (!dbUrl) {
      console.log(
        "please add DB_URL environmental variable in your .env.local file"
      );
    }

    // check for existing connection in development
    if (process.env.NODE_ENV === "development") {
      if (mongoose.connections[0].readyState) {
        console.log("using existing db connection");
        return;
      }
    }

    // new connection
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch (error) {
    console.log("db connection failed");
    console.log(error);
  }
};  


module.exports = connectDb