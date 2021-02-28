import Tree from "../models/tree";
const ObjectID = require("mongodb").ObjectID;

// const getAllTree = async (req, res) => {
//     try {
//         const allTrees = await Tree.find();
//         res.status(200).json({allTrees});
//     } catch (error) {
//         res.status(400).json({error});
//     }
// };

const getAllTree = (req, res) => {
    // console.log(req.query);
    Tree.find()
        .then(allTrees => res.status(200).json(allTrees))
        .catch(error => res.status(404).json({error}));
};

const getAllTreeCV = (req, res) => {
    const centercoor = req.params.center.split(",");
    // console.log(centercoor[0]);
    // console.log(centercoor[1]);
    Tree.find({
        location: {
            $geoWithin: {
                $centerSphere: [[centercoor[0], centercoor[1]], 0.0045],
            },
        },
    })
        .then(allTreesCV => res.status(200).json(allTreesCV))
        .catch(error => res.status(404).json({error}));
};

const get3TreeRand = async (req, res) => {
    try {
        const Rand3Trees = await Tree.aggregate([
            {$match: {owner: ""}},
            {$sample: {size: 3}},
        ]);
        Rand3Trees.map(async randTree => {
            console.log(`Tree: ${randTree._id}`);
            const user = "hello";
            const currentid = randTree._id;
            await Tree.updateOne(
                {_id: ObjectID(currentid).valueOf()},
                {$set: {owner: user}},
            );
        });
        res.status(200).json({Rand3Trees});
    } catch (error) {
        res.status(400).json({error});
    }
};

// const getAllTreeWithGeo = async (req, res) => {
//     try {
//         const geo200Trees = await Tree.find({
//             location: {
//                 $geoWithin: {$centerSphere: [[50.624454, 5.604456], 0.0000313]},
//             },
//         });
//         res.status(200).json(geo200Trees);
//     } catch (error) {
//         res.status(400).json({error});
//     }
// };

const getOneTree = async (req, res) => {
    try {
        const oneTree = await Tree.findOne({_id: req.params.id});
        res.status(200).json({oneTree});
    } catch (error) {
        res.status(404).json({error});
    }
};

const getGeo100Tree = async (req, res) => {
    const centercoor = req.params.center.split(",");
    // console.log(centercoor[0]);
    // console.log(centercoor[1]);
    await Tree.find({
        location: {
            $geoWithin: {
                $centerSphere: [[centercoor[0], centercoor[1]], 0.0045],
            },
        },
    })
        .then(allTrees => res.status(200).json(allTrees))
        .catch(error => res.status(404).json({error}));
};

export default {
    getAllTree,
    getOneTree,
    getGeo100Tree,
    get3TreeRand,
    getAllTreeCV,
};
