require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const cors = require("cors");
const PORT = 5000;
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://mern-lesson-manager-client.vercel.app",
    ],
  })
);
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-stack.ay9y6.mongodb.net/MERN-Stack?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    console.log("Mongoose connected");
  } catch (error) {
    console.log(error.message);
    process.exit(-1);
  }
};
connectDB();
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.listen(process.env.PORT || PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
