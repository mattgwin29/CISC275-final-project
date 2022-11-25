import React, { useState } from "react";
import type { CSSProperties, FC } from "react";
import { useDrop, XYCoord } from "react-dnd";
import Pic from "./Pic";
import { ItemTypes } from "./constants";

type DropperProps = {
    pieceInfo: Coord[];
};

const style: CSSProperties = {
    height: "20rem",
    width: "50rem",
    marginRight: "1.5rem",
    marginBottom: "1.5rem",
    color: "white",
    padding: "1rem",
    textAlign: "center",
    fontSize: "1rem",
    lineHeight: "normal",
    float: "left",
    backgroundColor: "black"
};

/*
const renderPiece = (i: number, top: number, left: number) => {
    //const x = i * 200;
    //const y = 150;
    return <Pic id={i} left={left} top={top} />;
};*/
//Run this in a loop to make pieces with unique ids

type Coord = {
    id: number;
    top: number;
    left: number;
};

export const Dropper: FC<DropperProps> = (props) => {
    //const pics = [];
    //const [top, setTop] = useState<number>(150);
    //const [left, setLeft] = useState<number>(100);
    const [pieces, setPieces] = useState<Coord[]>(props.pieceInfo);

    function movePiece(id: number, left: number, top: number): void {
        const pieces2 = pieces.map(
            (cor: Coord): Coord =>
                cor.id === id ? { ...cor, top: top, left: left } : cor
        );
        setPieces(pieces2);
    }

    const [, drop] = useDrop({
        accept: ItemTypes.PIC,
        drop: (
            item: { type: string; id: number; top: number; left: number },
            monitor
        ) => {
            const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
            const ileft = item.left + delta.x;
            const itop = item.top + delta.y;
            movePiece(item.id, ileft, itop);
            //setLeft(left + delta.x);
            //setTop(top + delta.y);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });

    /*const isActive = canDrop && isOver;
    let backgroundColor = "#222";
    if (isActive) {
        backgroundColor = "darkgreen";
    }*/
    /*
    function resetPiece() {
        setTop(150);
        setLeft(100);
    }*/
    return (
        <div ref={drop} style={{ ...style }} data-testid="dustbin">
            {pieces.map((coord: Coord) => {
                return (
                    <div key={coord.id}>
                        <Pic id={coord.id} top={coord.top} left={coord.left} />
                    </div>
                );
            })}
        </div>
    );
};
//put {pics} in the div
