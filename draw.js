class Draw {
    draw(cell, type) {
        switch (type) {
            case 0: {
                cell.className = "one";
                break;
            }
            case 1: {
                cell.className = "two";
                break;
            }
            case 2: {
                cell.className = "three";
                break;
            }
            case 3: {
                cell.className = "four";
                break;
            }
            case 4: {
                cell.className = "five";
                break;
            }
            case 5: {
                cell.className = "six";
                break;
            }
            case 6: {
                cell.className = "seven";
                break;
            }
        }
    }
    remove(cell) {
        cell.className = "none";
    }
}