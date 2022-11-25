import React, { CSSProperties, FC } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./constants";

export interface BoxProps {
    left: number;
    top: number;
    id: number;
}

const styleC: CSSProperties = {
    height: "5rem",
    position: "absolute",
    width: "5rem",
    color: "white",
    padding: "1rem"
};

const Pic: FC<BoxProps> = ({ id, left, top }) => {
    const [, drag] = useDrag({
        item: { type: ItemTypes.PIC, id: id, left: left, top: top }
    });

    return (
        <div
            ref={drag}
            style={{
                ...styleC,
                backgroundColor: "red",
                top: top + "px",
                left: left + "px"
            }}
        ></div>
    );
};

export default Pic;
