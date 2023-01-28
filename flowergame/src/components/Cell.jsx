import constants from "./consts";

function Cell({x, y, color}) {
    return (
        <div
            key={`cell_${x}_${y}`}
            className={"cell"}
            style={{
                left: `${x}px`,
                top: `${y}px`,
                width: `${constants.CELL_SIZE - 1}px`,
                height: `${constants.CELL_SIZE - 1}px`,
                backgroundColor: color,
            }}
        >
        </div>
    );

}

export default Cell;