// Filename : user.js

const express = require("express");
const {check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");
const auth = require("../middleware/auth");

import Tree from "../models/tree";
const ObjectID = require("mongodb").ObjectID;
import {nameByRace} from "fantasy-name-generator";
import Score from "../models/score";
import userUPDCtrlBuy from "../controllers/userupd";
import Gamelog from "../models/gamelog";

router.post("/update/", userUPDCtrlBuy.userUpdate);

async function updateGameLog(glUser, glAction) {
    try {
        const newGamelogObject = new Gamelog({
            username: glUser,
            action: glAction,
        });

        await newGamelogObject.save();

        console.log("Action Add in GAMELOG ...");
    } catch (error) {
        console.log(error);
    }
}

async function get3TreeRand(newUser, selectedColor) {
    console.log("START 3 RAND");
    try {
        const Rand3Trees = await Tree.aggregate([
            {$match: {owner: ""}},
            {$sample: {size: 3}},
        ]);
        Rand3Trees.map(async randTree => {
            console.log(`Tree: ${randTree._id}`);

            const currentid = randTree._id;
            const treeFranName = nameByRace("goblin");
            await Tree.updateOne(
                {_id: ObjectID(currentid).valueOf()},
                {
                    $set: {
                        owner: newUser,
                        friendlyname: treeFranName,
                        color: selectedColor,
                    },
                },
            );
        });
        console.log(`3 Tree add to USER:${newUser}`);
    } catch (error) {
        console.log(error);
    }
}

// Set Leaf + add to score
async function setNewUserScores(newUser) {
    try {
        const ttLeafs = await Score.aggregate([
            {
                $group: {
                    _id: null,
                    TotalLeafs: {
                        $sum: "$numOfLeafs",
                    },
                },
            },
        ]);
        const ttLeafs1 = ttLeafs[0].TotalLeafs;
        console.log(`TOTAL Leafs of all users: ${ttLeafs1}`);
        const ttAccount = await Score.countDocuments();
        console.log(`TOTAL ACCOUNT : ${ttAccount}`);
        const newUserLeafs = await Math.ceil(
            parseInt(ttLeafs1) / parseInt(ttAccount),
        );
        console.log(`Leafs of newuser : ${newUserLeafs}`);

        const treeNumber = 3;

        const userScore = new Score({
            username: newUser,
            numOfLeafs: newUserLeafs,
            numOfTrees: treeNumber,
        });

        await userScore.save();

        console.log("New user add in score with leafs");
    } catch (error) {
        console.log(error);
    }
}

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
    "/signup",
    [
        check("username", "Please Enter a Valid Username").not().isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6,
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array(),
            });
            return;
        }

        const {username, email, password} = req.body;
        try {
            let user = await User.findOne({
                email,
            });
            if (user) {
                res.status(400).json({
                    msg: "Email Already Exists",
                });
                return;
            }
            const testPseudo = await User.findOne({
                username,
            });
            if (testPseudo) {
                res.status(400).json({
                    msg: "Username Already Exists",
                });
                return;
            }
            // Random color for users
            const color = `#${((Math.random() * 0xffffff) << 0).toString(16)}`;

            user = new User({
                username,
                email,
                password,
                color,
            });

            const salt = await bcrypt.genSalt(12);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            get3TreeRand(username, color);
            setNewUserScores(username);
            const signingamelogMSG = `Tank You 🎆 ${username} ✌️ . He juste register.`;
            console.log(signingamelogMSG);
            updateGameLog(username, signingamelogMSG);

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                "randomString",
                {
                    expiresIn: 10000,
                },
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    const logingamelogMSG = `Hello 👋 ${username}. He juste log in the game.`;
                    console.log(logingamelogMSG);
                    updateGameLog(username, logingamelogMSG);
                    res.status(200).json({
                        token,
                    });
                },
            );
        } catch (err) {
            res.status(500).send("Error in Saving");
        }
    },
);
router.post(
    "/login",
    [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 1,
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({
                message: "error connection",
            });
            return;
        }

        const {email, password} = req.body;
        try {
            const user = await User.findOne({
                email,
            });
            if (!user) {
                res.status(400).json({
                    message: "User Not Exist",
                });
                return;
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(300).json({
                    message: "Incorrect Password or Email !",
                });
                return;
            }
            const logUsername = user.username;
            const logingamelogMSG = `Hello 👋 ${logUsername}. He juste log in the game.`;
            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                "randomString",
                {
                    expiresIn: 3600,
                },
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    console.log(logingamelogMSG);
                    updateGameLog(logUsername, logingamelogMSG);
                    res.status(200).json({
                        token,
                    });
                },
            );
        } catch (e) {
            res.status(500).json({
                message: "Server Error",
            });
        }
    },
);
/**
 * @method - GET
 * @description - Get LoggedIn User
 * @param - /user/me
 */

router.get("/me", auth, async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (e) {
        res.send({message: "Error in Fetching user"});
    }
});
module.exports = router;
