require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const cors = require('cors');
app.use(cors({
    origin: "https://mern-client-d9084.web.app"
}));
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
connectDB().then();
const PORT = 5000;
app.use(express.json());
app.all('/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.listen(5000, () => {
    console.log(`App listening on port ${PORT}`);
});
