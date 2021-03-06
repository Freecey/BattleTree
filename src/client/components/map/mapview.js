import React, {useState, useEffect} from "react"; // useMap, useMapEvents
import {
    MapContainer,
    TileLayer,
    useMapEvents,
    Marker,
    Popup,
} from "react-leaflet"; // Marker, Popup, useMap
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../assets/css/map.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import axios from "axios";
// import {} from "react-leaflet"; // MapContainer, TileLayer
import TreeImage1 from "../../assets/img/watercolor-tree2.png";
import {Formik, Form} from "formik"; // Field

let curLocation = [50.6283, 5.5768];

const infoCenter = bcenter => {
    curLocation = Object.values(bcenter);
    return Object.values(bcenter);
};

const MapEvents = () => {
    const map = useMapEvents({
        moveend: () => infoCenter(map.getCenter()),
        zoomend: () => infoCenter(map.getCenter()),
    });
    return null;
};

function GameMap() {
    const position = [50.6283, 5.5768];
    return (
        <MapContainer
            id={"leafletContainer"}
            center={position}
            zoom={17}
            minZoom={13}
            maxZoom={18}
            // style={{ height: "100vh", width: "100vw" }}
            scrollWheelZoom={true}>
            <MapEvents />
            <TileLayer
                url={
                    // 'https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    // "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
                    "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                    // "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg" // maxZoom: 16,
                    // 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png' // 18 - 17
                    //'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png' // 19
                    // 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png' // 19
                }
            />
            <MarkerClusterGroup
                spiderfyOnMaxZoom={false}
                showCoverageOnHover={false}
                zoomToBoundsOnClick={false}
                disableClusteringAtZoom={17}>
                {/* <MyComponent /> */}
                <GetMarker />
            </MarkerClusterGroup>
        </MapContainer>
    );
}

// MARKER

const svgIcone = userColor => `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="590.074px" height="590.073px" viewBox="0 0 590.074 590.073" style="enable-background:new 0 0 590.074 590.073;"
	 xml:space="preserve">
<g>
	<path style="fill:${userColor};" d="M537.804,174.688c0-44.772-33.976-81.597-77.552-86.12c-12.23-32.981-43.882-56.534-81.128-56.534
		c-16.304,0-31.499,4.59-44.514,12.422C319.808,17.949,291.513,0,258.991,0c-43.117,0-78.776,31.556-85.393,72.809
		c-3.519-0.43-7.076-0.727-10.71-0.727c-47.822,0-86.598,38.767-86.598,86.598c0,2.343,0.172,4.638,0.354,6.933
		c-24.25,15.348-40.392,42.333-40.392,73.153c0,27.244,12.604,51.513,32.273,67.387c-0.086,1.559-0.239,3.107-0.239,4.686
		c0,47.822,38.767,86.598,86.598,86.598c14.334,0,27.817-3.538,39.723-9.696c16.495,11.848,40.115,26.67,51.551,23.715
		c0,0,4.255,65.905,3.337,82.64c-1.75,31.843-11.303,67.291-18.025,95.979h104.117c0,0-15.348-63.954-16.018-85.307
		c-0.669-21.354,6.675-60.675,6.675-60.675l36.118-37.36c13.903,9.505,30.695,14.908,48.807,14.908
		c44.771,0,81.597-34.062,86.12-77.639c32.98-12.23,56.533-43.968,56.533-81.214c0-21.994-8.262-41.999-21.765-57.279
		C535.71,195.926,537.804,185.561,537.804,174.688z M214.611,373.444c6.942-6.627,12.766-14.372,17.212-22.969l17.002,35.62
		C248.816,386.096,239.569,390.179,214.611,373.444z M278.183,395.438c-8.798,1.597-23.782-25.494-34.416-47.517
		c11.791,6.015,25.102,9.477,39.254,9.477c3.634,0,7.201-0.296,10.72-0.736C291.006,374.286,286.187,393.975,278.183,395.438z
		 M315.563,412.775c-20.35,5.651-8.167-36.501-2.334-60.904c4.218-1.568,8.301-3.413,12.183-5.604
		c2.343,17.786,10.069,33.832,21.516,46.521C337.011,401.597,325.593,409.992,315.563,412.775z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>`;

const treeIcon = L.icon({
    iconUrl: TreeImage1,
    iconSize: [30, 40], // size of the icon
    iconAnchor: [17, 0], // point of the icon which will correspond to marker's location
    // popupAnchor: [17, 0], // point from which the popup should open relative to the iconAnchor
});

const treeIconOwner = usrColor =>
    L.icon({
        iconUrl: `data:image/svg+xml;base64,${btoa(svgIcone(usrColor))}`,
        iconSize: [30, 40], // size of the icon
        iconAnchor: [17, 0], // point of the icon which will correspond to marker's location
        // popupAnchor: [17, 0], // point from which the popup should open relative to the iconAnchor
    });

function fixLatinName(treeLatinName) {
    let latinName = treeLatinName.split(` X `)[0];
    latinName = latinName.split(` x `)[0];
    latinName = latinName.split(` '`)[0];
    return latinName;
}
function getCurrentUserColor() {
    return sessionStorage.getItem("color");
}

function coolName(testCoolName) {
    if (testCoolName) {
        return testCoolName;
    }
    return "a free tree";
}
let Justebuy;
const latMin = center => center[0] - 0.003;
const latMax = center => center[0] + 0.003;
const lonMin = center => center[1] - 0.0045;
const lonMax = center => center[1] + 0.0045;

const myPopup = L.popup();

const GetMarker = () => {
    // CurrentCenter, para2
    const [error, setError] = useState(null);
    const [treesmarker, setTreesmarker] = useState([]);
    const [rebuyval, setRebuyval] = useState([]);
    // const [curLocation, setCurLocation] = useState([]);
    // console.log(allTreesGetData);
    useEffect(() => {
        axios
            .get(`/api/trees/all/cv/${curLocation}`)
            .then(response => {
                setTreesmarker(response.data);
            })
            // })
            .catch(() => {
                // console.log("Error retrieving data!!!");
                setError(error);
                console.log(error);
            });
    });

    async function TreeBuyingBackValue(aTreeID, aCurrentUser) {
        await axios
            .get(`/api/trees/geo100/${aTreeID}&${aCurrentUser}`)
            .then(response => {
                console.log(response.data);
                setRebuyval(response.data.TreeRebuy);
            })
            // })
            .catch(() => {
                // console.log("Error retrieving data!!!");
                console.log(error);
            });
    }

    const TEST = treesmarker
        .filter(
            tree =>
                tree.location.coordinates[1] > lonMin(curLocation) &&
                tree.location.coordinates[1] < lonMax(curLocation) &&
                tree.location.coordinates[0] > latMin(curLocation) &&
                tree.location.coordinates[0] < latMax(curLocation),
        )
        .map(tree => (
            // console.log(tree.friendlyname),
            <Marker
                key={tree._id}
                icon={!tree.owner ? treeIcon : treeIconOwner(tree.color)} // {randtreeIcon()}
                position={tree.location.coordinates}>
                <Popup>
                    <h3 className={"is-size-5"}>
                        {"I'm "}
                        {coolName(tree.friendlyname)}
                    </h3>
                    <div className={"my-3 is-size-6"}>
                        <span>{"Value : "}</span>
                        <span className={"ml-4"}>
                            {tree.treevalue}
                            {" 🍃"}
                        </span>
                    </div>

                    <p />
                    <p>
                        {"Owner : "}
                        {tree.owner}
                        <br />
                        {fixLatinName(tree.latinName)}{" "}
                        <a
                            href={`https://en.wikipedia.org/wiki/${fixLatinName(
                                tree.latinName,
                            )}`}
                            target={"_blank"}
                            rel={"noreferrer"}>
                            {"Wiki info"}
                        </a>
                    </p>
                    {/* <p>
                        {"tree ID : "}
                        {tree._id}
                    </p> */}
                    <div>
                        {!tree.owner || !Justebuy === tree._id ? (
                            <Formik
                                initialValues={{
                                    username: sessionStorage.getItem(
                                        "username",
                                    ),
                                    treeid: tree._id,
                                    treevalue: tree.treevalue,
                                    color: getCurrentUserColor(),
                                }}
                                onSubmit={async values => {
                                    console.log(values);
                                    await axios
                                        .post("/api/trees/buy", values)
                                        .then(res => {
                                            console.log(res.data);
                                            Justebuy = tree._id;
                                        })
                                        .catch(error2 => {
                                            console.log(error2.response);
                                        });
                                }}>
                                {({isSubmitting}) => (
                                    <Form>
                                        <button
                                            className={
                                                "button is-primary is-rounded"
                                            }
                                            type={"submit"}
                                            disabled={isSubmitting}>
                                            {"Buy"}
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        ) : tree.owner ===
                          sessionStorage.getItem("username") ? (
                            <div>{"It's our tree"}</div>
                        ) : (
                            <div>
                                {myPopup.isOpen()
                                    ? TreeBuyingBackValue(
                                          tree._id,
                                          sessionStorage.getItem("username"),
                                      )(`buying back Soon Value :`)(rebuyval)
                                    : ""}
                            </div>
                        )}
                    </div>
                </Popup>
            </Marker>
        ));
    return TEST;
};

export default GameMap;
