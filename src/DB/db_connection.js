

const mongoose = require("mongoose");


// Connect to MongoDB
console.log("check url", process.env.MONGODB_URL);
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Export the mongoose connection
module.exports = mongoose.connection;
