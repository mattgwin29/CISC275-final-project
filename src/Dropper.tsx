import React, { useState } from "react";
import type { CSSProperties, FC } from "react";
import { useDrop, XYCoord } from "react-dnd";
import Pic from "./Pic";
import { ItemTypes } from "./constants";
import { Button, Form } from "react-bootstrap";
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
const styleI: CSSProperties = {
    height: "100px",
    width: "100px"
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

    const p: string[] = [
        "F",
        "I",
        "L",
        "N",
        "P",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
    ];

    const pageWidth = document.documentElement.scrollWidth;
    const pageHeight = document.documentElement.scrollHeight;
    console.log(pageWidth);
    console.log(pageHeight);

    const pieces: Piece[] = p.map(
        (s: string): Piece => ({
            id: s,
            angle: 0,
            width: 100,
            height: 100,
            top: 400,
            left: 0,
            onBoard: false,
            reflected: false,
            image: "./Assets/Images/" + s + ".png"
        })
    );

    const solutions: string[] = ["3x20", "4x15", "5x12", "6x10"];

    const [solutionImage, setSolutionImage] = useState<string>(
        "./Assets/solutions/3x20.png"
    );

    function setRandomPuzzle() {
        const current = Math.floor(Math.random() * solutions.length);
        setSolutionImage("./Assets/solutions/" + solutions[current] + ".png");
    }

    const [PieceBank, setPieceBank] = useState<Piece[]>(pieces);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function reflectPiece(reflId: string) {
        const newBank: Piece[] = PieceBank.map(
            (p: Piece): Piece =>
                p.id === reflId ? { ...p, reflected: !p.reflected } : p
        );
        const picBank: Piece[] = newBank.map(
            (p: Piece): Piece =>
                p.reflected
                    ? { ...p, image: "./Assets/Images/" + p.id + ".png" }
                    : { ...p, image: "./Assets/Images/" + p.id + "2.png" }
        );
        setPieceBank(picBank);
    }

    const [selected, setSelected] = useState<string>("Z");

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

    function anglePiece(id: string): void {
        const newPieces = PieceBank.map(
            (piece: Piece): Piece =>
                piece.id === id ? { ...piece, angle: piece.angle + 90 } : piece
        );
        setPieceBank(newPieces);
    }

    function resetPieces(): void {
        const newPieces = PieceBank.map(
            (piece: Piece): Piece => ({
                ...piece,
                top: 440,
                left: 220,
                angle: 0
            })
        );
        setPieceBank(newPieces);
    }
    //Scale of Pieces because yeah scale exists wow amazing here is scale
    const [scale, setScale] = useState<string>("100");
    const scaleNum = parseInt(scale) / 100 || 0;
    function updateScale(event: React.ChangeEvent<HTMLInputElement>) {
        setScale(event.target.value);
    }
    //Function that is called on change
    const [, drop] = useDrop({
        accept: ItemTypes.PIC,
        drop: (
            item: { type: string; id: string; top: number; left: number },
            monitor
        ) => {
            const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
            const ileft = item.left + delta.x;
            const itop = item.top + delta.y;
            setSelected(item.id);
            movePiece(item.id, ileft, itop);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });
    return (
        <>
            <div
                ref={drop}
                style={{ ...style }}
                id="dustbin"
                data-testid="dustbin"
            >
                <header>
                    Current Puzzle = {solutionImage.substring(19, 23)}
                </header>
                <Button onClick={setRandomPuzzle}>Randomize Puzzle</Button>
                <Button onClick={resetPieces}>Reset</Button>
                <Button onClick={() => anglePiece(selected)}>
                    Rotate Last Piece
                </Button>
                <Button onClick={() => reflectPiece(selected)}>
                    Reflect Last Piece
                </Button>
                <div style={styleI}>
                    <Form.Group controlId="scaleTime">
                        <Form.Label>Scale %</Form.Label>
                        <Form.Control
                            type="number"
                            value={scale}
                            onChange={updateScale}
                        />
                    </Form.Group>
                </div>
                <div>
                    {" "}
                    <img src={require(`${solutionImage}`)} />
                </div>
                {PieceBank.map((p: Piece) => {
                    return (
                        <div key={p.id} data-testid="pieces">
                            <Pic
                                id={p.id}
                                top={p.top}
                                left={p.left}
                                image={p.image}
                                angle={p.angle}
                                width={p.width * scaleNum}
                                height={p.height * scaleNum}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};
