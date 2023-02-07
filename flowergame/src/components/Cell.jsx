import constants from "./consts";

function Cell({x, y}) {
    return (
        <div
            className={"cell"}
            style={{
                left: `${x}px`,
                top: `${y}px`,
                width: `${constants.CELL_SIZE - 1}px`,
                height: `${constants.CELL_SIZE - 1}px`,
                background: constants.DRAW_COLOR
            }}
        />
    );

}

export default Cell;