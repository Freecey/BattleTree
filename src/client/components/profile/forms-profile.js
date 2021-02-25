import React, {useState, useCallback} from "react";
import {useSpring, animated, config} from "react-spring";
// import axios from "axios";
// import {Formik, Form} from "formik";

// import PropTypes from "prop-types";
// import classnames from "classnames";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faEnvelope} from "@fortawesome/free-solid-svg-icons";

import Field from "../tools/field";
import Avatar from "../tools/avatar";
import Button from "../tools/button";

const FormProfile = ({onCloseModal}) => {
    const userIdSession = sessionStorage.getItem("_id");
    const usernameSession = sessionStorage.getItem("username");
    const emailSession = sessionStorage.getItem("email");
    const colorSession = sessionStorage.getItem("color");

    const [username, setUsername] = useState(usernameSession);
    const [email, setEmail] = useState(emailSession);
    const [colorSelected, setColorSelected] = useState(colorSession);
    const [showPicker, setShowPicker] = useState(false);

    const iconUser = <FontAwesomeIcon icon={faUser} />;
    const iconEnvelope = <FontAwesomeIcon icon={faEnvelope} />;

    const colors = [
        "#FF6900",
        "#FCB900",
        "#7BDCB5",
        "#00D084",
        "#8ED1FC",
        "#0693E3",
        "#ABB8C3",
        "#EB144C",
        "#F78DA7",
        "#9900EF",
    ];

    const handleChangeColor = useCallback(() => {
        setShowPicker(val => !val);
    }, []);
    const handleChangeUser = useCallback(event => {
        setUsername(event.target.value);
    }, []);
    const handleChangeEmail = useCallback(event => {
        setEmail(event.target.value);
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        console.log({
            _id: userIdSession,
            username,
            email,
            color: colorSelected,
        });
    };

    const fadeStyles = useSpring({
        config: {...config.default},
        from: {transformOrigin: "left", transform: "scaleX(0)"},
        to: {
            transform: showPicker ? "scaleX(1)" : "scaleX(0)",
        },
    });

    return (
        <div className={"formProfile"}>
            <p>{username}</p>
            <p>{email}</p>
            <p>{colorSelected}</p>
            <Avatar emailToHash={"cassartkv@gmail.com"} />
            <form className={"formProfile"}>
                <Field
                    onChange={handleChangeUser}
                    value={username}
                    icon={iconUser}
                    label={"User Name"}
                    placeholder={usernameSession}
                    // username ? "username already in use" : "This username is available" >>
                    help={"This username is available"}
                />
                <Field
                    onChange={handleChangeEmail}
                    value={email}
                    icon={iconEnvelope}
                    label={"Email"}
                    placeholder={emailSession}
                    // email !valide ? "This email is invalid" : "email valid" >>
                    help={"This email is invalid"}
                />
                <div className={"field"}>
                    <label className={"label"}>{"Color"}</label>
                    <div className={"k-colorPicker "}>
                        <div className={"k-colorPicker__selectedContainer"}>
                            <div
                                onClick={handleChangeColor}
                                className={"k-colorPicker__select"}
                                style={{backgroundColor: colorSelected}}
                            />
                        </div>
                        <animated.div
                            className={"k-colorPicker__selectedContainer"}
                            style={fadeStyles}>
                            {colors.map((color, i) => {
                                const key = i;
                                return (
                                    <div
                                        key={key}
                                        onClick={() => {
                                            setColorSelected(color);
                                        }}
                                        className={"k-colorPicker__select"}
                                        style={{backgroundColor: color}}
                                    />
                                );
                            })}
                        </animated.div>
                    </div>
                </div>
                <div className={"formProfile__buttonGroup"}>
                    <Button label={"Save"} onClick={handleSubmit} />
                    <Button label={"Cancel"} onClick={onCloseModal} />
                </div>{" "}
            </form>
        </div>
    );
};

export default FormProfile;
