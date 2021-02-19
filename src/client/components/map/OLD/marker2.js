// import React, {useState, useEffect} from "react"; // useMap, useMapEvents
// import axios from "axios";
// import {Marker, Popup} from "react-leaflet"; // MapContainer, TileLayer
// import L from "leaflet";
// import TreeImage0 from "../../assets/img/watercolor-tree1.png";
// import TreeImage1 from "../../assets/img/watercolor-tree2.png";

// const randtreeIcon = () => {
//     function getRandomInt(max) {
//         return Math.floor(Math.random() * Math.floor(max));
//     }
//     const rand2 = getRandomInt(2);
//     if (rand2 === 1) {
//         const treeIcon = L.icon({
//             iconUrl: TreeImage0,
//             iconSize: [30, 40], // size of the icon
//             iconAnchor: [17, 0], // point of the icon which will correspond to marker's location
//             popupAnchor: [17, 0], // point from which the popup should open relative to the iconAnchor
//         });
//         return treeIcon;
//     }
//     const treeIcon = L.icon({
//         iconUrl: TreeImage1,
//         iconSize: [30, 40], // size of the icon
//         iconAnchor: [17, 0], // point of the icon which will correspond to marker's location
//         popupAnchor: [17, 0], // point from which the popup should open relative to the iconAnchor
//     });
//     return treeIcon;
// };

// function fixLatinName(treeLatinName) {
//     let latinName = treeLatinName.split(` X `)[0];
//     latinName = latinName.split(` x `)[0];
//     latinName = latinName.split(` '`)[0];
//     return latinName;
// }

// const center = [50.6283, 5.5768];
// const latMin = center[0] - 0.003;
// const latMax = center[0] + 0.003;
// const lonMin = center[1] - 0.007;
// const lonMax = center[1] + 0.007;

// function GetMarker() {
//     const [error, setError] = useState(null);
//     // const [isLoaded, setIsLoaded] = useState(false);
//     const [treesmarker, setTreesmarker] = useState([]);

//     // console.log(currentZoom);

//     useEffect(() => {
//         axios
//             .get("/api/trees/all")
//             .then(response => {
//                 // setIsLoaded(true);
//                 setTreesmarker(response.data);
//             })
//             // })
//             .catch(() => {
//                 // console.log("Error retrieving data!!!");
//                 // setIsLoaded(true);
//                 setError(error);
//                 console.log(error);
//             });
//     });

//     // if (!isLoaded) {
//     //     return <span className={"title"}>{"loading"}</span>;
//     // }
//     return treesmarker.map(tree => {
//         console.log(tree.location.coordinates[0]);
//         console.log(`ATT :${lonMin}`);
//         console.log(tree.location.coordinates[1]);
//         if (
//             tree.location.coordinates[1] > lonMin &&
//             tree.location.coordinates[1] < lonMax &&
//             tree.location.coordinates[0] > latMin &&
//             tree.location.coordinates[0] < latMax
//         ) {
//             return (
//                 <>
//                     {/* <MapEvents /> */}
//                     <Marker
//                         key={tree._id}
//                         icon={randtreeIcon()}
//                         position={tree.location.coordinates}>
//                         <Popup>
//                             {"I'm a Tree"}
//                             <br />
//                             <p>
//                                 {"Value : "}
//                                 {/* {parseInt((tree.circonf / 3.1421) * tree.height)} */}
//                                 {" leafs"}{" "}
//                             </p>
//                             <p>
//                                 {fixLatinName(tree.latinName)}{" "}
//                                 <a
//                                     href={`https://en.wikipedia.org/wiki/${fixLatinName(
//                                         tree.latinName,
//                                     )}`}
//                                     target={"_blank"}
//                                     rel={"noreferrer"}>
//                                     {"Wiki info"}
//                                 </a>
//                             </p>
//                             <div className={"control"}>
//                                 <label className={"label"}>{"latinName"}</label>
//                                 <input
//                                     className={"input"}
//                                     type={"text"}
//                                     placeholder={"Text input"}
//                                     value={tree.latinName}
//                                 />
//                                 <label className={"label"}>
//                                     {"coordinates"}
//                                 </label>
//                                 <input
//                                     className={"input"}
//                                     type={"text"}
//                                     placeholder={"Text input"}
//                                     value={tree.location.coordinates}
//                                 />
//                                 <label className={"label"}>{"circonf"}</label>
//                                 <input
//                                     className={"input"}
//                                     type={"text"}
//                                     placeholder={"Text input"}
//                                     value={tree.circonf}
//                                 />
//                                 <label className={"label"}>{"height"}</label>
//                                 <input
//                                     className={"input"}
//                                     type={"text"}
//                                     placeholder={"Text input"}
//                                     value={tree.height}
//                                 />
//                                 <label className={"label"}>{"Name"}</label>
//                                 <input
//                                     className={"input"}
//                                     type={"text"}
//                                     placeholder={"Text input"}
//                                     value={"123"}
//                                 />
//                             </div>
//                             <button
//                                 type={"button"}
//                                 className={"button is-success"}>
//                                 {"Buy"}
//                             </button>
//                         </Popup>
//                     </Marker>
//                 </>
//             );
//         }
//     });
// }

// export default GetMarker;
