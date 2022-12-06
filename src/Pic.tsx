import React, { CSSProperties, FC } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./constants";
import { DragPreviewImage } from "react-dnd";
export interface BoxProps {
    left: number;
    top: number;
    id: string;
    image: string;
    angle: number;
    width: number;
    height: number;
}

const styleC: CSSProperties = {
    //height: "5rem",
    position: "absolute",
    //width: "5rem",
    color: "white"
    //padding: "1rem"
};

const Pic: FC<BoxProps> = ({ id, left, top, image, angle, width, height }) => {
    const [isDragging, drag, preview] = useDrag({
        item: { type: ItemTypes.PIC, id: id, left: left, top: top },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging
        })
    });
    const pieceImage = "./Assets/Images/" + id + ".png";
    return (
        <>
            <DragPreviewImage connect={preview} src={pieceImage} />
            <div
                ref={drag}
                style={{
                    ...styleC,
                    opacity: isDragging ? 0.99 : 1,
                    //backgroundColor: "red",
                    top: top + "px",
                    left: left + "px",
                    transform: "rotate(" + angle + "deg)"
                }}
            >
                <img
                    src={require(`${image}`)}
                    height={height + "%"}
                    width={width + "%"}
                />
            </div>{" "}
        </>
    );
};

export default Pic;
