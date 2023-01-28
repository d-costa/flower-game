import React, {useState} from "react";
import constants, {encode, GridSpacer} from "./consts";

import Cell from "./Cell";
import {Link as RouterLink} from "react-router-dom";
import {Divider, Grid, Link} from "@mui/material";


function Game({queryState}) {
    // function makeEmptyBoard() {
    //     let board = [];
    //     for (let row = 0; row < rows; row++) {
    //         board[row] = [];
    //         for (let col = 0; col < cols; col++) {
    //             board[row][col] = false;
    //         }
    //     }
    //     return board;
    // }

    function handleBoardClick(event) {
        console.log("click")
        if (simulation || boardRef === null)
            return

        const rect = boardRef.getBoundingClientRect();

        const doc = document.documentElement;
        // const elemOffsetX = (rect.left + window.scrollX) - doc.clientLeft
        // const elemOffsetY = (rect.top + window.scrollY) - doc.clientTop
        const elemOffsetX = (rect.left) - doc.clientLeft
        const elemOffsetY = (rect.top) - doc.clientTop

        const offsetX = event.clientX - elemOffsetX;
        const offsetY = event.clientY - elemOffsetY;
        const x = Math.floor(offsetX / constants.CELL_SIZE);
        const y = Math.floor(offsetY / constants.CELL_SIZE)

        if (x >= 0 && x <= cols && y >= 0 && y <= rows) {
            const index = aliveCells.findIndex(c => c.x === x && c.y === y);
            let newCells;

            if (index >= 0) {
                newCells = Array.from(aliveCells.slice(0, index)).concat(Array.from(aliveCells.slice(index + 1)));
            } else {
                newCells = [{x, y}].concat(aliveCells)
            }

            setAliveCells(newCells);
        }
    }

    /**
     * Get Cell true position from index x and y
     */
    function getCellCoords(x, y) {
        const posX = Math.floor(constants.CELL_SIZE * x);
        const posY = Math.floor(constants.CELL_SIZE * y)
        return {x: posX, y: posY};
    }

    function simulate() {
        setEncodedInitial(encode(aliveCells));

        if (!simulation) {
            setSimulation(true);
        }

        step()
        step()
    }

    function getNeighbours(x, y) {
        const directions = [
            [-1, -1], [0, -1], [1, -1],
            [-1, 0], [1, 0],
            [-1, 1], [0, 1], [1, 1]
        ];
        let count = 0;

        directions.forEach(d => {
            let index = aliveCells.findIndex(c => c.x === x + d[0] && c.y === y + d[1]);
            if (index >= 0) count++;
        });
        return count;
    }

    function step() {
        console.log("starting... ", JSON.stringify(aliveCells))
        let newCells = []

        for (let y = 0; y < cols; y++) {
            for (let x = 0; x < rows; x++) {
                // Rule One. A living flower with less than two living neighbors is cut off. It dies.
                // Rule Two. A living flower with two or three living neighbors is connected. It lives.
                // Rule Three. A living flower with more than three living neighbors is starved and overcrowded. It dies.
                // Rule Four. A dead flower with exactly three living neighbors is reborn. It springs back to life.
                const currAlive = aliveCells.findIndex(c => c === {x, y})
                const neighbours = getNeighbours(x, y);

                if (neighbours === 3 || (neighbours === 2 && !currAlive)) {
                    newCells.push({x, y});
                }
            }
        }
        console.log("new cells: ", JSON.stringify(newCells))

        setAliveCells(Array.from(newCells));

        // window.setTimeout(simulate, constants.SIMULATION_STEP);
    }

// /**
//  * Board Offset from origin
//  */
// function getBoardElementOffset() {
//     const rect = boardRef.getBoundingClientRect();
//     const doc = document.documentElement;
//     return {
//         x: (rect.left + window.scrollX) - doc.clientLeft,
//         y: (rect.top + window.scrollY) - doc.clientTop,
//     };
// }

    const rows = constants.HEIGHT / constants.CELL_SIZE;
    const cols = constants.WIDTH / constants.CELL_SIZE;
    console.log("query", queryState)

// const [aliveCells, setAliveCells] = useState(queryState? decode(queryState) :[]);
    const [aliveCells, setAliveCells] = useState([]);
    const [encodedInitial, setEncodedInitial] = useState(null);
    const [boardRef, setBoardRef] = useState(null);
    const [simulation, setSimulation] = useState(false);


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (simulation) {
    //             step();
    //             console.log("after step: ", JSON.stringify(aliveCells))
    //         }
    //     }, constants.SIMULATION_STEP);
    //
    //     return () => clearInterval(interval);
    // }, [simulation]);

    return (
        <div className="game">

            <div className="board"
                 style={{
                     width: constants.WIDTH,
                     height: constants.HEIGHT,
                     backgroundSize: `${constants.CELL_SIZE}px ${constants.CELL_SIZE}px`
                 }}
                 ref={(n) => {
                     setBoardRef(n);
                 }}
                 onClick={handleBoardClick}
            >
                {
                    aliveCells.map(coords => {
                        const pos = getCellCoords(coords.x, coords.y)
                        return pos ? <Cell x={pos.x} y={pos.y}
                                           color={simulation ? constants.ALIVE_COLOR : constants.DRAW_COLOR}/> : null
                    })
                }
            </div>
            <div>
                {simulation ? null : <button onClick={simulate}>Go</button>}
            </div>
            <div className={"footer"}>
                <Divider variant={"fullWidth"} style={{margin: "1rem"}}/>

                <Grid container direction={"row"} justifyContent={"center"} spacing={2} alignItems={"center"}>
                    <Grid item>
                        <a href={`/?${constants.CELLS_QUERY_PARAM}=${encodedInitial ? encodedInitial : encode(aliveCells)}`}>Permalink</a>
                    </Grid>
                    <GridSpacer/>
                    <Grid item>
                        <RouterLink to={"/about"}>About</RouterLink>
                    </Grid>
                    <GridSpacer/>
                    <Grid item>
                        <Link href="https://github.com/d-costa/flower-game">Source Code</Link>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Game;