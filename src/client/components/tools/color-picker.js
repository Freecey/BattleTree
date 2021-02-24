// import React, {useState, useCallback} from "react";
// import {useSpring, animated, config} from "react-spring";

// const ColorPicker = () => {
//     const [colorSelected, setColorSelected] = useState("#00D2FC");

//     const [showPicker, setShowPicker] = useState(false);

//     const handleChangeColor = useCallback(
//         () => {
//             setShowPicker((val) => !val)
//         },
//         [],
//     )

//     const colors = [
//         "#FF6900",
//         "#FCB900",
//         "#7BDCB5",
//         "#00D084",
//         "#8ED1FC",
//         "#0693E3",
//         "#ABB8C3",
//         "#EB144C",
//         "#F78DA7",
//         "#9900EF",
//     ];

//     const fadeStyles = useSpring({
//         config: {...config.default},
//         from: {transformOrigin: "left", transform: "scaleX(0)"},
//         to: {
//             transform: showPicker ? "scaleX(1)" : "scaleX(0)",
//         },
//     });

//     console.log(colorSelected);

//     return (
//         <div className={"k-colorPicker "}>
//             <div className={"k-colorPicker__selectedContainer"}>
//                 <div
//                     value={colorSelected}
//                     onClick={handleChangeColor}
//                     className={"k-colorPicker__select"}
//                     id={"colorSelected"}
//                     style={{backgroundColor: colorSelected}}
//                 />
//             </div>
//             <animated.div
//                 className={"k-colorPicker__selectedContainer"}
//                 style={fadeStyles}>
//                 {colors.map((color, i) => {
//                     const key = i;
//                     return (
//                         <div
//                             key={key}
//                             onClick={() => {
//                                 setColorSelected(color);
//                             }}
//                             className={"k-colorPicker__select"}
//                             style={{backgroundColor: color}}
//                         />
//                     );
//                 })}
//             </animated.div>
//         </div>
//     );
// };

// export default ColorPicker;
