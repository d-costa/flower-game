import React, { useEffect, useState } from "react";
import constants, { decode, encode, GridSpacer } from "./consts";
import Cell from "./Cell";

import { Link as RouterLink } from "react-router-dom";
import { Divider, Grid, Link } from "@mui/material";

function Game({ queryState }) {
  function handleBoardClick(event) {
    if (simulation || boardRef === null) return;

    const rect = boardRef.getBoundingClientRect();

    const doc = document.documentElement;
    // const elemOffsetX = (rect.left + window.scrollX) - doc.clientLeft
    // const elemOffsetY = (rect.top + window.scrollY) - doc.clientTop
    const elemOffsetX = rect.left - doc.clientLeft;
    const elemOffsetY = rect.top - doc.clientTop;

    const offsetX = event.clientX - elemOffsetX;
    const offsetY = event.clientY - elemOffsetY;
    const x = Math.floor(offsetX / constants.CELL_SIZE);
    const y = Math.floor(offsetY / constants.CELL_SIZE);

    if (x >= 0 && x <= cols && y >= 0 && y <= rows) {
      const index = aliveCells.findIndex((c) => c.x === x && c.y === y);
      let newCells;

      if (index >= 0) {
        newCells = Array.from(aliveCells.slice(0, index)).concat(
          Array.from(aliveCells.slice(index + 1))
        );
      } else {
        newCells = [{ x, y }].concat(aliveCells);
      }

      setAliveCells(newCells);
    }
  }

  /**
   * Get Cell true position from index x and y
   */
  function getCellCoords(x, y) {
    const posX = Math.floor(constants.CELL_SIZE * x);
    const posY = Math.floor(constants.CELL_SIZE * y);
    return { x: posX, y: posY };
  }

  function simulate() {
    if (simulation) return;

    setEncodedInitial(encode(aliveCells));
    setSimulation(true);
  }

  const rows = constants.HEIGHT / constants.CELL_SIZE;
  const cols = constants.WIDTH / constants.CELL_SIZE;

  const [aliveCells, setAliveCells] = useState([]);
  const [encodedInitial, setEncodedInitial] = useState(null);
  const [boardRef, setBoardRef] = useState(null);
  const [simulation, setSimulation] = useState(false);

  useEffect(() => {
    if (queryState !== undefined && !simulation) {
      setAliveCells(decode(queryState));
    }
  }, [queryState, simulation]);

  useEffect(() => {
    function getNeighbours(x, y) {
      const directions = [
        [-1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
      ];
      let count = 0;

      directions.forEach((d) => {
        let index = aliveCells.findIndex(
          (c) => c.x === x + d[0] && c.y === y + d[1]
        );
        if (index >= 0) count++;
      });
      return count;
    }
    function step() {
      let newCells = [];

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          // Rule One. A living flower with less than two living neighbors is cut off. It dies.
          // Rule Two. A living flower with two or three living neighbors is connected. It lives.
          // Rule Three. A living flower with more than three living neighbors is starved and overcrowded. It dies.
          // Rule Four. A dead flower with exactly three living neighbors is reborn. It springs back to life.
          const currAlive =
            aliveCells.findIndex((c) => c.x === x && c.y === y) >= 0;
          const neighbours = getNeighbours(x, y);

          if (
            (currAlive && neighbours >= 2 && neighbours <= 3) ||
            (!currAlive && neighbours === 3)
          ) {
            newCells.push({ x, y });
          }
        }
      }
      setAliveCells(Array.from(newCells));
    }

    const interval = setInterval(() => {
      if (simulation) {
        step();
      }
    }, constants.SIMULATION_INTERVAL);

    return () => clearInterval(interval);
  }, [aliveCells, simulation, cols, rows]);

  return (
    <div className="game">
      <div
        className="board"
        style={{
          width: constants.WIDTH,
          height: constants.HEIGHT,
          backgroundSize: `${constants.CELL_SIZE}px ${constants.CELL_SIZE}px`,
        }}
        ref={(n) => {
          setBoardRef(n);
        }}
        onClick={handleBoardClick}
      >
        {aliveCells.map((coords) => {
          const pos = getCellCoords(coords.x, coords.y);
          return pos ? (
            <div key={`cell_${pos.x}_${pos.y}`}>
              <Cell
                x={pos.x}
                y={pos.y}
                color={
                  simulation ? constants.ALIVE_COLOR : constants.DRAW_COLOR
                }
              />
            </div>
          ) : null;
        })}
      </div>
      <div>
        <button onClick={simulate} disabled={simulation}>
          Go
        </button>
      </div>
      <div className={"footer"}>
        <Divider variant={"fullWidth"} style={{ margin: "1rem" }} />

        <Grid
          container
          direction={"row"}
          justifyContent={"center"}
          spacing={2}
          alignItems={"center"}
        >
          <Grid item>
            <Link
              href={`?${constants.CELLS_QUERY_PARAM}=${
                encodedInitial ? encodedInitial : encode(aliveCells)
              }`}
            >
              Permalink
            </Link>
          </Grid>
          <GridSpacer />
          <Grid item>
            <RouterLink
              to={"/about"}
              className={
                "MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineAlways css-1ps4owl-MuiTypography-root-MuiLink-root"
              }
            >
              About
            </RouterLink>
          </Grid>
          <GridSpacer />
          <Grid item>
            <Link href="https://github.com/d-costa/flower-game">
              Source Code
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Game;
