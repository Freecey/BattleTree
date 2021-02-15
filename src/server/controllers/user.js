const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.signup = (req, res) => {
    bcrypt
        .hash(req.body.password, 12) // (salt round) the highter the number, the safer it will be, but the longer it will take time....
        .then(hash => {
            const user = new User({
                email: requestAnimationFrame.body.email,
                password: hash,
            });
            user.save()
                .then(() => res.sattus(201).json({message: "users created !"}))
                .catch(error => res.sattus(400).json({error}));
        })
        .catch(error => res.sattus(500).json({error}));
};
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            res.status(401).json({error: "user not found !"});
            return;
        }
        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) {
            res.status(401).json({error: "Wrong password !"});
            return;
        }
        res.status(200).json({
            userId: user._id,
            token: "TOKEN",
        });
    } catch (error) {
        res.status(500).json({error});
    }
};
// exports.login = (req, res) => {
//     User.findOne({email: req.body.email})
//         .then(user => {
//             if (!user) {
//                 res.status(401).json({error: "user not found !"});
//                 return;
//             }

//             bcrypt
//                 .compare(req.body.password, user.password)
//                 .then(valid => {
//                     if (!valid) {
//                         res.status(401).json({error: "Wrong password !"});
//                         return;
//                     }
//                     res.status(200).json({
//                         userId: user._id,
//                         token: "TOKEN",
//                     });
//                 })
//                 .catch(error => res.status(500).json({error}));
//         })
//         .catch(error => res.status(500).json({error}));
// };
