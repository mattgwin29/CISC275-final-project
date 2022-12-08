import React from "react";
//import Board from "./Board";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { render } from "react-dom";
import { Dropper } from "./Dropper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <p>Zachary England, Blair Felker, Matt Gwin</p>
                <Dropper />
                <br></br>
            </DndProvider>
        </div>
    );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
