import express from "express";
import path from "path";
import mongoose from "mongoose";
import treeRoutes from "./routes/tree";
import simpleuserRoutes from "./routes/simpleuser";
// const userRoutes = require("./routes/user");

const {APP_PORT} = process.env;

// Database Connection URL
mongoose.Promise = global.Promise;
mongoose.connect(
    `mongodb+srv://battletree:zD4V1183RRGf5DBF@botanistes.tjvkg.mongodb.net/botanistes?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    },
    () => console.log("💫 You are connected to the DB Atlas 👌"),
);
mongoose.connection.on("error", () => {
    throw new Error(`💣 ... 💥 Unable to connect to database`);
});

const app = express();

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.use("/api/simpleusers", simpleuserRoutes);
app.use("/api/trees", treeRoutes);


// app.use("/api/auth", userRoutes);

// app.get("*", (req, res) => {
//     res.sendFile(path.resolve("./bin/client/index.html"));
// });

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
 