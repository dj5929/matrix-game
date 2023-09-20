function randomNumber(max) {
    return Math.floor(Math.random() * (max));
}
function getRowColFromSquare(sq) {
    var col = sq.charCodeAt(0) - 65;
    var row = parseInt(sq[1]) - 1;
    return ([col, row]);
}
function getSquareFromRowCol(col, row) {
    var col_str = String.fromCharCode(col + 65);
    var row_str = row + 1;
    return (col_str + row_str.toString());
}
function getNearRandomSqaure(prevSquare, matrixSize, prevUserMove) {
    if (!prevSquare) {
        let newOppSq = getSquareFromRowCol(randomNumber(matrixSize), randomNumber(matrixSize));
        while (newOppSq === prevUserMove) newOppSq = getSquareFromRowCol(randomNumber(matrixSize), randomNumber(matrixSize));
        return newOppSq;
    };
    const [col, row] = getRowColFromSquare(prevSquare);
    console.log("Near square", prevSquare, prevUserMove);
    var options = [];
    [-1, 0, 1].forEach((i) => {
        [-1, 0, 1].forEach((j) => {
            const newCol = col + i;
            const newRow = row + j;
            console.log(newCol, newRow, newCol >= 0 && newCol < matrixSize && newRow >= 0 && newRow < matrixSize);
            if (newCol >= 0 && newCol < matrixSize && newRow >= 0 && newRow < matrixSize) options.push(getSquareFromRowCol(newCol, newRow));
        });
    });
    options = options.filter((val) => val !== prevSquare && val !== prevUserMove);
    console.log("options", options);
    return (options[randomNumber(options.length)]);
}

function getOppMove(userMoveState, prevOppMove, prevUserMove, matrixSize) {
    console.log("Getting opponent move : ", userMoveState, prevOppMove, prevUserMove);
    return userMoveState ? getNearRandomSqaure(prevUserMove, matrixSize, prevUserMove) : getNearRandomSqaure(prevOppMove, matrixSize, prevUserMove);
};
function checkDistance(sq1, sq2) {
    if (sq1 && sq2) {
        const [prevCol, prevRow] = getRowColFromSquare(sq1);
        const [currCol, currRow] = getRowColFromSquare(sq2);
        const vertDist = Math.abs(prevCol - currCol);
        const horzDist = Math.abs(prevRow - currRow);

        if (!(vertDist <= 1 && horzDist <= 1 && vertDist + horzDist > 0)) {
            return false;
        }
        return true;
    }
    return (true);
}

class DefaultDict {
    constructor(defaultVal) {
        return new Proxy({}, {
            get: (target, name) => name in target ? target[name] : defaultVal
        });
    }
}
export { checkDistance, getOppMove, DefaultDict };