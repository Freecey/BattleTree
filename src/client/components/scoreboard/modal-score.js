import * as React from "react";
import {createPortal} from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";

import TableScore from "./table-score";
// import ButtonCloseModal from "./button-close-modal";
import Button from "./button";

const ModalScore = ({show = false, onCloseModal, onShareScore}) => {
    if (!show) {
        return null;
    }

    return createPortal(
        <div className={classnames("k-modalScore")}>
            <div className={classnames("box", "k-boxModal")}>
                <TableScore />
                <div className={classnames("k-buttonsGroup")}>
                    <Button label={"Close"} onClick={onCloseModal} />
                    <Button label={"Share"} onClick={onShareScore} />
                </div>
            </div>
        </div>,
        document.querySelector("#scoreModal"),
    );
};

ModalScore.propTypes = {
    show: PropTypes.bool,
    onCloseModal: PropTypes.func.isRequired,
    onShareScore: PropTypes.func,
};

export default ModalScore;
