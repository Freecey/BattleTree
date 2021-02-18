import React, {useState, useEffect} from "react";
import classnames from "classnames";
import {useSpring, animated} from "react-spring";

function GetScores() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const scoreAppear = useSpring({
        from: {transform: "translateY(150%)"},
        to: {transform: "translateY(0)"},
        config: {mass: 1, tension: 400, friction: 12},
    });

    useEffect(() => {
        fetch("/api/scores")
            .then(res => res.json())
            .then(
                scores => {
                    // debugger
                    setIsLoaded(true);
                    // debugger
                    setItems(
                        scores
                            .slice(0, 6)
                            .sort((a, b) => b.numOfTrees - a.numOfTrees),
                    );
                },
                /*errors must be handled here rather than in
                a catch() block so that we don't swallow exceptions
                due to real bugs in the components.*/
                err => {
                    setIsLoaded(true);
                    setError(err);
                },
            );
    }, []);

    if (error) {
        return (
            <animated.tbody style={scoreAppear}>
                <tr>
                    <td>{`Erreur : ${error.message}`}</td>
                </tr>
            </animated.tbody>
        );
    } else if (!isLoaded) {
        return (
            <animated.tbody style={scoreAppear}>
                <tr>
                    <td>{"Chargement..."}</td>
                </tr>
            </animated.tbody>
        );
    }
    return (
        <>
            <animated.tbody classnames={"k-tbodyScore"} style={scoreAppear}>
                {items.map((item, i) => {
                    let pos = i;
                    return (
                        <tr className={classnames("k-tableRow")} key={item._id}>
                            <th>{++pos}</th>
                            <td>{item.username}</td>
                            <td className={classnames("k-tdScore")}>
                                {item.numOfTrees}
                            </td>
                            <td>
                                <div className={classnames("k-treeIcon")}>
                                    {" "}
                                </div>
                            </td>
                            <td className={classnames("k-tdScore")}>
                                {item.numOfLeafs}
                            </td>
                            <td>
                                <div className={classnames("k-leafIcon")} />
                            </td>
                        </tr>
                    );
                })}
            </animated.tbody>
        </>
    );
}

export default GetScores;
