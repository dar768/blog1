let express = require("express");
let app = express();
//let PORT = process.env.PORT || 3000;
let path = require("path");
let mongoose = require("mongoose");

let methodOverride = require("method-override");
let postRoutes = require("./routes/blogRoutes");

require("dotenv").config();

let db = process.env.MONGO_URL;
let PORT = process.env.PORT;

//let db = "mongodb+srv://daria:dgHb.RZc2isKf2b@cluster0.znxpfdb.mongodb.net/Node-blog";

app.set('view engine', 'ejs');
let createPath = (page) => path.join(__dirname, "views", `${page}.ejs`);

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use(postRoutes);

app.get("/", (req, res) => {
    res.render("index", { title: 'Main page' });
});

async function start() {
    try {
        await mongoose.connect(db);
        console.log(`Connection to MongoDb is success!`);
        app.listen(PORT, () => {
            console.log(`Server is listening PORT ${PORT}...`);
        });
    } catch (error) {
        console.log(" \n Connection error!!! \n\n", error);
    }
}

start();
