import React, { useState } from "react";
import type { CSSProperties, FC } from "react";
import { useDrop, XYCoord } from "react-dnd";
import Pic from "./Pic";
import { ItemTypes } from "./constants";
import { Button } from "react-bootstrap";
import { Piece } from "./interfaces/piece";

const style: CSSProperties = {
    height: "35rem",
    width: "80%",
    color: "white",
    padding: "1rem",
    textAlign: "center",
    fontSize: "1rem",
    lineHeight: "normal",
    float: "left",
    backgroundColor: "black",
    // paddingRight: "30px",
    // paddingLeft: "30px",
    marginLeft: "10%",
    marginRight: "10%",
    marginBottom: "10%",
    borderStyle: "solid",
    borderWidth: "10px",
    borderColor: "red"
};
/*
addToBank("F");
addToBank("I");
addToBank("L");
addToBank("N");
addToBank("P");
addToBank("T");
addToBank("U");
addToBank("V");
addToBank("W");
addToBank("X");
addToBank("Y");
addToBank("Z");
*/
export const Dropper: FC = () => {
    //PieceBank state definition and filling it
    //console.log(document.getElementById("dustbin"));
    //console.log("test");
    //box pos left
    //box pos width
    const [PieceBank, setPieceBank] = useState<Piece[]>([
        {
            id: "F",
            angle: 0,
            width: 100,
            height: 100,
            top: 150,
            left: 100,
            onBoard: false,
            reflected: false,
            image: "./Assets/Images/" + "F" + ".png"
        }
    ]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function reflectPiece(reflId: string) {
        const newBank: Piece[] = PieceBank.map(
            (p: Piece): Piece =>
                p.id === reflId ? { ...p, reflected: !p.reflected } : p
        );
        setPieceBank(newBank);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function rotatePiece(rotId: string, rotation: number) {
        const newBank: Piece[] = PieceBank.map(
            (p: Piece): Piece =>
                p.id === rotId ? { ...p, angle: rotation } : p
        );
        setPieceBank(newBank);
    }
    //Add a piece to the set of total pieces
    /*
    function addToBank(newId: string) {
        const newPiece: Piece = {
            id: newId,
            angle: 0,
            width: 100,
            height: 100,
            top: 150,
            left: 100,
            onBoard: false,
            reflected: false,
            image: "./src/images/" + newId + ".png"
        };
        setPieceBank([...PieceBank, newPiece]);
    }
    */
    //Move a piece by changing the state for that piece's top and left
    function movePiece(id: string, left: number, top: number): void {
        const newPieces = PieceBank.map(
            (piece: Piece): Piece =>
                piece.id === id ? { ...piece, top: top, left: left } : piece
        );
        setPieceBank(newPieces);
    }

    function resetPieces(): void {
        const newPieces = PieceBank.map(
            (piece: Piece): Piece => ({ ...piece, top: 150, left: 100 })
        );
        setPieceBank(newPieces);
    }

    const [, drop] = useDrop({
        accept: ItemTypes.PIC,
        drop: (
            item: { type: string; id: string; top: number; left: number },
            monitor
        ) => {
            const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
            const ileft = item.left + delta.x;
            const itop = item.top + delta.y;
            movePiece(item.id, ileft, itop);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });
    return (
        <div ref={drop} style={{ ...style }} id="dustbin" data-testid="dustbin">
            <Button onClick={resetPieces}>Reset</Button>
            {PieceBank.map((p: Piece) => {
                return (
                    <div key={p.id} data-testid={p.id}>
                        <Pic
                            id={p.id}
                            top={p.top}
                            left={p.left}
                            image={p.image}
                        />
                    </div>
                );
            })}
        </div>
    );
};
