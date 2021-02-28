import express from "express";
import treeCtrl from "../controllers/tree";
import treeCtrlBuy from "../controllers/treebuy";

const router = express.Router();

router.get("/all/", treeCtrl.getAllTree);
router.get("/all/cv/:center", treeCtrl.getAllTreeCV);
router.get("/geo100/:id&:user", treeCtrl.getGeo100Tree);
router.get("/one/:id", treeCtrl.getOneTree);
// router.put("/update/:id", treeCtrl.updateTree);
// router.delete("/del/:id", treeCtrl.removeTree);
router.get("/rand3/", treeCtrl.get3TreeRand);

router.post("/buy/", treeCtrlBuy.buyATree);

export default router;
