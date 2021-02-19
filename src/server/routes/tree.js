import express from "express";
import treeCtrl from "../controllers/tree";
// import Tree from "../models/tree";

const router = express.Router();

router.get("/all", treeCtrl.getAllTree);
router.get("/geo200", treeCtrl.getAllTree);
router.get("/one/:id", treeCtrl.getOneTree);
router.put("/:id", treeCtrl.updateTree);
router.delete("/del:id", treeCtrl.removeTree);
// router.post("/add", treeCtrl.createTree);

// router.put("/updateall", (req, res) => {
//     Tree.updateMany(
//         {height: {$gte: 2}},
//         {$set: {treevalue2: {$divide: ["$circonf", 3.1421]}}},
//         (err, result) => {
//             if (err) {
//                 res.send(err);
//                 console.log(err);
//             } else {
//                 console.log("Updated Docs : ", result);
//             }
//         },
//     );
// });

export default router;

// { $set: { treevalue:   {$multiply:[{$divide: ["$circonf", 3.1421]},  "$height"]} },
