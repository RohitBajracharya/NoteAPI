const dotenv = require("dotenv")
const express = require("express")
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const mongoose = require("mongoose");


const app = express();
dotenv.config()


app.use(express.json());
app.use((req, res, next) => {
    console.log("HTTP Method - " + req.method + " , URL - " + req.url);
    next();
})

app.use("/users", userRouter)
app.use("/note", noteRouter)

const PORT = process.env.PORT
const MONGOURL = process.env.MONGO_URL

mongoose.connect(MONGOURL)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server started on port no: 5000")
        })

    })
    .catch((error) => {
        console.log(error);
    });


app.get("/", (req, resp) => {
    resp.status(200).send("hello");
})
