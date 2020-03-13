var grid;
var pen;
var shape;
var size = 19;
var score;
var blockCount;
var faze;
function init() {
    grid = document.getElementById("grid");
    grid.innerHTML = "";
    score = 0;
    for (var i = 0; i < size; i++) {
        row = grid.insertRow(i);
        for (var j = 0; j < size; j++) {
            cell = row.insertCell(j);
            active = document.createAttribute("active");
            static = document.createAttribute("static");
            point = document.createAttribute("point");
            active.value = "false";
            point.value = "false";
            static.value = "false";
            cell.className = "none";
            cell.setAttributeNode(point);
            cell.setAttributeNode(active);
            cell.setAttributeNode(static);

        }
    }
    main();

}
function main() {
    pen = new Draw();
    shape = generateShape();
    blockCount = activateShape();

    var mainInterval = setInterval(function () {
        var moveHorizont = setInterval(function () {
            document.addEventListener("keydown", keyDownHandler, false);
        }
            , 90);
        Drawbackground();
        var value = moveObj();
        checkLine();

        if (value == "true") {

            shape = generateShape();
            blockCount = activateShape();
        }
        else if (value == "gg") {
            alert("Game-Over");
            clearInterval(moveHorizont);
            clearInterval(mainInterval);
        }
    }

        , 130);
}
function moveObj() {
    var stopped = "false";
    var found = 0;
    var stopAll = false;

    for (var i = size - 1; i >= 0; i--) {

        for (var j = 0; j < size; j++) {
            var currcell = grid.rows[i].cells[j];
            var cellRow = currcell.parentNode.rowIndex;
            var cellCol = currcell.cellIndex;
            //alert();
            if (currcell.getAttribute("active") == "true" && found <= blockCount) {


                currcell.setAttribute("active", "false");
                pen.remove(currcell);
                //alert(found);
                found++;

                if (cellRow == size - 1) {
                    currcell.setAttribute("static", "true");
                    pen.draw(currcell, shape);
                    //clearActive();
                    stopAll = true;

                    stopped = "true";

                }
                else if (grid.rows[cellRow + 1].cells[cellCol].getAttribute("static") == "true") {
                    if (cellRow == 0) {
                        currcell.setAttribute("static", "true");
                        pen.draw(currcell, shape);
                        return "gg";
                    }
                    currcell.setAttribute("static", "true");
                    pen.draw(currcell, shape);
                    stopAll = true;
                    stopped = "true";

                }
                else if (grid.rows[cellRow + 1].cells[cellCol].getAttribute("static") == "false") {
                    var nextRow = grid.rows[cellRow + 1].cells[cellCol];
                    nextRow.setAttribute("active", "true");
                    pen.draw(nextRow, shape);

                }

            }


        }

    }
    if (stopAll) {

        stopUnit();
        stopped = "true";
    }

    return stopped;
}
function checkLine() {

    for (var i = size - 1; i >= 0; i--) {
        var hole = 0;
        for (var j = 0; j < size; j++) {
            var currcell = grid.rows[i].cells[j];
            var cellRow = currcell.parentNode.rowIndex;
            var cellCol = currcell.cellIndex;
            if (currcell.getAttribute("static") == "false") {
                hole++;
            }
            if (j == size - 1 && hole == 0) {
                //alert(cellRow);
                score += 100;
                document.getElementById("score").innerHTML = score;
                moveDown(cellRow);
                //reDraw();
            }
        }
    }
}
function moveDown(rowNum) {


    for (var i = size - 1; i >= 0; i--) {
        var rowPattern = [];

        for (var j = 0; j < size; j++) {
            var currcell = grid.rows[i].cells[j];
            var cellRow = currcell.parentNode.rowIndex;
            var cellCol = currcell.cellIndex;
            var class_name = currcell.className;
            rowPattern.push(class_name);
            if (currcell.getAttribute("static") == "true") {
                var nextCell;
                if (cellRow == rowNum) {


                    currcell.setAttribute("static", "false");
                    pen.remove(currcell);


                }

                else if (cellRow < rowNum) {
                    pen.remove(currcell);

                    nextCell = grid.rows[cellRow + 1].cells[cellCol];
                    currcell.setAttribute("static", "false");
                    nextCell.setAttribute("static", "true");
                    reDraw(rowPattern, i + 1);

                }
                //else if (cellRow > rowNum) {
                //    reDraw(rowPattern, i);
                //}
            }

        }
    }
}
function reDraw(rowPattern, rowNum) {

    for (var i = 0; i < size; i++) {

        var currCell = grid.rows[rowNum].cells[i];

        currCell.className = rowPattern[i];
    }
}
function Drawbackground() {
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            var currCell = grid.rows[i].cells[j];
            if (currCell.getAttribute("active") == "false" && currCell.getAttribute("static") == "false") {
                pen.remove(currCell);
            }
        }
    }
}
function moveRight(shape) {
    var found = 0;
    var moveArr = [];
    var stopped = false;

    for (var i = size - 1; i >= 0; i--) {

        for (var j = size - 1; j >= 0; j--) {

            var currcell = grid.rows[i].cells[j];
            if (currcell.getAttribute("active") == "false") {
                var index = moveArr.indexOf(currcell);

                if (index > -1) {
                    arr.splice(index, 1);
                }

            }

            var cellRow = currcell.parentNode.rowIndex;
            var cellCol = currcell.cellIndex;

            if (currcell.getAttribute("active") == "true" && found <= blockCount) {

                found++;
                currcell.setAttribute("active", "false");
                


                var nextCell;
                if (cellCol < size - 1) {
                    nextCell = grid.rows[cellRow].cells[cellCol + 1];
                    if (nextCell.getAttribute("static") == "true") {
                        nextCell = currcell;

                        found = blockCount + 1;
                        stopped = true;

                    }
                    else {

                        moveArr.push(nextCell);

                    }


                }
                else {
                    nextCell = currcell;
                    found = blockCount + 1;
                    stopped = true;

                    //currcell.setAttribute("moved", "false");
                }
                nextCell.setAttribute("active", "true");
                pen.draw(nextCell, shape);
                pen.remove(currcell, shape);
            }
        }
    }
    if (stopped && moveArr != null) {
        // alert("stopped");
        correctMoved("R", moveArr);
    }


}
function moveLeft(shape) {
    var found = 0;
    var stopped = false;
    var moveArr = [];
    for (var i = size - 1; i >= 0; i--) {
        for (var j = 0; j < size; j++) {
            var currcell = grid.rows[i].cells[j];
            var cellRow = currcell.parentNode.rowIndex;
            var cellCol = currcell.cellIndex;
            if (currcell.getAttribute("active") == "false") {
                var index = moveArr.indexOf(currcell);

                if (index > -1) {
                    arr.splice(index, 1);
                }

            }
            if (currcell.getAttribute("active") == "true" && found <= blockCount) {
                found++;
                currcell.setAttribute("active", "false");
                pen.remove(currcell);
                var nextCell;
                if (cellCol > 0) {
                    nextCell = grid.rows[cellRow].cells[cellCol - 1];
                    if (nextCell.getAttribute("static") == "true") {
                        nextCell = currcell;
                        found = blockCount + 1;
                        stopped = true;
                    }
                    else {
                        moveArr.push(nextCell);
                    }

                }
                else {
                    nextCell = currcell;
                    found = blockCount + 1;
                    stopped = true;

                }
                nextCell.setAttribute("active", "true");
                pen.draw(nextCell, shape);

            }
        }
    }
    if (stopped && moveArr != null) {
        // alert("stopped");
        correctMoved("L", moveArr);
    }
}
function keyDownHandler(event) {
    switch (event.keyCode) {
        case 65: {
            moveLeft();
            break;
        }
        case 68:
            {
                moveRight();
                break;
            }
        //case 37: {
        //    rotateRight();
        //    break;
        //}



    }

}
function generateShape() {
    return Math.floor(Math.random() * 7);
}
function activateShape() {
    var midCell = (size + 1) / 2;
    switch (shape) {
        case 0: {
            // aproved
            grid.rows[0].cells[midCell].setAttribute("active", "true");
            pen.draw(grid.rows[0].cells[midCell], shape);
            grid.rows[1].cells[midCell].setAttribute("active", "true");
            pen.draw(grid.rows[1].cells[midCell], shape);
            grid.rows[0].cells[midCell + 1].setAttribute("active", "true");
            pen.draw(grid.rows[0].cells[midCell + 1], shape);
            grid.rows[1].cells[midCell - 1].setAttribute("active", "true");
            pen.draw(grid.rows[1].cells[midCell - 1], shape);
            return 4;
            break;
        }
        case 1: {
            // approved
            grid.rows[0].cells[midCell].setAttribute("active", "true");
            pen.draw(grid.rows[0].cells[midCell], shape);
            grid.rows[1].cells[midCell].setAttribute("active", "true");
            pen.draw(grid.rows[1].cells[midCell], shape);
            grid.rows[1].cells[midCell + 1].setAttribute("active", "true");
            pen.draw(grid.rows[1].cells[midCell + 1], shape);
            grid.rows[1].cells[midCell - 1].setAttribute("active", "true");
            pen.draw(grid.rows[1].cells[midCell - 1], shape);
            return 4;
            break;
        }
        case 2: {
            // approved
            grid.rows[0].cells[midCell].setAttribute("active", "true");
            pen.draw(grid.rows[0].cells[midCell], shape);
            grid.rows[1].cells[midCell].setAttribute("active", "true");
            pen.draw(grid.rows[1].cells[midCell], shape);
            grid.rows[2].cells[midCell].setAttribute("active", "true");
            pen.draw(grid.rows[2].cells[midCell], shape);
            grid.rows[3].cells[midCell].setAttribute("active", "true");
            pen.draw(grid.rows[3].cells[midCell], shape);

            return 4;
            break;
        }
        case 3: {
            //aproved
            grid.rows[0].cells[midCell].setAttribute("active", "true");
            pen.draw(grid.rows[0].cells[midCell], shape);
            grid.rows[1].cells[midCell].setAttribute("active", "true");
            pen.draw(grid.rows[1].cells[midCell], shape);
            grid.rows[0].cells[midCell - 1].setAttribute("active", "true");
            pen.draw(grid.rows[0].cells[midCell - 1], shape);
            grid.rows[1].cells[midCell + 1].setAttribute("active", "true");
            pen.draw(grid.rows[1].cells[midCell + 1], shape);
            return 4;
            break;
        }
        case 4: {
            //approved
            grid.rows[0].cells[midCell].setAttribute("active", "true");
            pen.draw(grid.rows[0].cells[midCell], shape);
            grid.rows[1].cells[midCell].setAttribute("active", "true");
            pen.draw(grid.rows[1].cells[midCell], shape);
            grid.rows[1].cells[midCell - 1].setAttribute("active", "true");
            pen.draw(grid.rows[1].cells[midCell - 1], shape);
            grid.rows[0].cells[midCell - 1].setAttribute("active", "true");
            pen.draw(grid.rows[0].cells[midCell - 1], shape);
            return 4;
            break;
        }
        case 5: {
            grid.rows[0].cells[midCell].setAttribute("active", "true");
            pen.draw(grid.rows[0].cells[midCell], shape);
            grid.rows[1].cells[midCell].setAttribute("active", "true");
            pen.draw(grid.rows[1].cells[midCell], shape);
            grid.rows[1].cells[midCell + 1].setAttribute("active", "true");
            pen.draw(grid.rows[1].cells[midCell + 1], shape);
            grid.rows[1].cells[midCell + 2].setAttribute("active", "true");
            pen.draw(grid.rows[1].cells[midCell + 2], shape);
            grid.rows[1].cells[midCell + 3].setAttribute("active", "true");
            pen.draw(grid.rows[1].cells[midCell + 3], shape);
            return 4;
            break;
        }
        case 6: {
            grid.rows[0].cells[midCell].setAttribute("active", "true");
            pen.draw(grid.rows[0].cells[midCell], shape);
            grid.rows[1].cells[midCell].setAttribute("active", "true");
            pen.draw(grid.rows[1].cells[midCell], shape);
            grid.rows[1].cells[midCell - 1].setAttribute("active", "true");
            pen.draw(grid.rows[1].cells[midCell - 1], shape);
            grid.rows[1].cells[midCell - 2].setAttribute("active", "true");
            pen.draw(grid.rows[1].cells[midCell - 2], shape);
            grid.rows[1].cells[midCell - 3].setAttribute("active", "true");
            pen.draw(grid.rows[1].cells[midCell - 3], shape);
            return 4;
            break;
        }
    }
}
function stopUnit() {
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            var currcell = grid.rows[i].cells[j];
            var cellRow = currcell.parentNode.rowIndex;
            var cellCol = currcell.cellIndex;

            if (currcell.getAttribute("active") == "true") {
                pen.remove(currcell);
                currcell.setAttribute("active", "false");
                grid.rows[cellRow - 1].cells[cellCol].setAttribute("static", "true");
                pen.draw(grid.rows[cellRow - 1].cells[cellCol], shape);

            }

        }
    }
}
function correctMoved(dir, moveArr) {
    var firstTime = true;
    for (var i = 0; i < moveArr.length; i++) {
        var currcell = moveArr[i];
        var cellRow = currcell.parentNode.rowIndex;
        var cellCol = currcell.cellIndex;
        //alert("row: " + cellRow + " col: " + cellCol);


        pen.remove(currcell);
        var nextCell;
        if (dir == "R") {
            nextCell = grid.rows[cellRow].cells[cellCol - 1];
        }

        else if (dir == "L") {
            nextCell = grid.rows[cellRow].cells[cellCol + 1];
        }
        if (firstTime) {
            removeFromArray(moveArr);
        }
        firstTime = false;
        nextCell.setAttribute("active", "true");
        pen.draw(nextCell, shape);
    }

}
function removeFromArray(moveArr) {
    for (var i = 0; i < moveArr.length; i++) {
        var currcel = moveArr[i];
        currcel.setAttribute("active", "false");
    }
}
