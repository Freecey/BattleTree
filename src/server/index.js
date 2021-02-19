import path from "path";
<<<<<<< HEAD
// import treeRoutes from "./routes/tree";
// const userRoutes = require("./routes/user");
// const {APP_PORT} = process.env;
// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const app = express();
=======
import mongoose from "mongoose";
import treeRoutes from "./routes/tree";
import scoreRoutes from "./routes/score";

// const userRoutes = require("./routes/user");

const {APP_PORT} = process.env;
>>>>>>> origin/dev

//Body Parser
// const urlencodedParser = bodyParser.urlencoded({
//     extended: true,
// });
// Database Connection URL
<<<<<<< HEAD
// mongoose.Promise = global.Promise;
// mongoose.connect(
//     `mongodb+srv://battletree:zD4V1183RRGf5DBF@botanistes.tjvkg.mongodb.net/botanistes?retryWrites=true&w=majority`,
//     {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useUnifiedTopology: true,
//     },
//     () => console.log("You are connected to the DB Atlas"),
// );
// mongoose.connection.on("error", () => {
//     throw new Error(`Unable to connect to database`);
// });
=======
mongoose.Promise = global.Promise;
mongoose.connect(
    `mongodb+srv://battletree:zD4V1183RRGf5DBF@botanistes.tjvkg.mongodb.net/botanistes?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
    },
    () => console.log("💫 You are connected to the DB Atlas 👌"),
);
mongoose.connection.on("error", () => {
    throw new Error(`💣 ... 💥 Unable to connect to database`);
});

const app = express();
>>>>>>> origin/dev

// app.use(express.static(path.resolve(__dirname, "../../bin/client")));

<<<<<<< HEAD
// app.use("/api/trees", treeRoutes);
=======
app.use("/api/trees", treeRoutes);
app.use("/api/scores", scoreRoutes);
>>>>>>> origin/dev

// app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.resolve("./bin/client/index.html"));
});

//On définit notre objet express nommé app

// app.use(urlencodedParser);

// app.use(bodyParser.json());

//Définition des CORS
// app.use((req, res, next) => {
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "X-Requested-With,content-type",
//     );
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, OPTIONS, PUT, PATCH, DELETE",
//     );
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     next();
// });

//Définition du routeur
// const router = express.Router();
// app.use("/user", router);
// require(`${__dirname}/controllers/user-controller`)(router);

//Définition et mise en place du port d'écoute
// app.listen(APP_PORT, () =>
//     console.log(`🚀 Server is listening on port ${APP_PORT}.`),
// );

const express = require("express");
const bodyParser = require("body-parser");
const user = require("../server/routes/user");
// const signup = require("../client/components/hello");
const InitiateMongoServer = require("./config/db");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = 12345;

// Middleware
app.use(bodyParser.json());
// app.use(express.urlencoded({extended: true}));
// app.use(express.json());

//
app.use(express.static(path.resolve(__dirname, "../../bin/client")));
app.get("/", (req, res) => {
    res.sendFile(path.resolve("./bin/client/index.html"));
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);
//app.get("*", (req, res) => {
//     res.sendFile(path.resolve("ERROR 404"));
// });
app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`);
});
