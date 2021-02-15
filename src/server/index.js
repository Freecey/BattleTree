import express from "express";
import path from "path";
import mongoose from "mongoose";
import treeRoutes from "./routes/tree";

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

app.use("/api/trees", treeRoutes);

// app.get("*", (req, res) => {
//     res.sendFile(path.resolve("./bin/client/index.html"));
// });

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
