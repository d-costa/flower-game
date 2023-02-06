import {Grid, Typography} from "@mui/material";

const constants = {
    CELL_SIZE: 20,
    WIDTH: 1280,
    HEIGHT: 800,
    ALIVE_COLOR: "#38c176",
    DRAW_COLOR: "#ccc",
    ENCODING_CELL_SEPARATOR: "_",
    ENCODING_COORDS_SEPARATOR: "-",
    CELLS_QUERY_PARAM: "cells",
    SIMULATION_INTERVAL: 500,
}

function encode(cells) {
    let encoded = [];
    cells.forEach(c => {
        encoded.push(`${c.x}${constants.ENCODING_COORDS_SEPARATOR}${c.y}`);
    })
    return encoded.join(constants.ENCODING_CELL_SEPARATOR);
}

function decode(encodedString) {
    let cells = [];
    if (encodedString == null || encodedString.length === 0)
        return cells;

    encodedString.split(constants.ENCODING_CELL_SEPARATOR).forEach(cell => {
        let coords = cell.split(constants.ENCODING_COORDS_SEPARATOR)
        cells.push({x: parseInt(coords[0]), y: parseInt(coords[1])})
    })
    return cells;
}

function GridSpacer() {
    return (
        <Grid item>
            <Typography>|</Typography>
        </Grid>
    )
}

export {encode, decode, GridSpacer}
export default constants;
