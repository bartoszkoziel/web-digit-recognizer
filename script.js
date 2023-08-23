var isDrawing = false

document.body.onload = () => {
    createGrid()
    handleClick()
}

createGrid = () => {

    const gridContainer = document.getElementById('grid-container');

    for (i = 0; i < 28; i++) {
        for (j = 0; j < 28; j++){
            const square = document.createElement('div');
            square.className = 'square';
            square.id = i + "_" + j
            gridContainer.appendChild(square);
        }
    }
}

handleClick = () => {
    const gridContainer = document.getElementById('grid-container');
    const btnClear = document.getElementById('btnClear');

    gridContainer.addEventListener('mousedown', () => {
        isDrawing = true;
    });

    gridContainer.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    gridContainer.addEventListener('mousemove', (event) => {
        if (isDrawing) {
            const square = event.target;
            square.classList.add('selected');
        }
    });

    gridContainer.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });

    btnClear.addEventListener("click", () => {
        clearGrid()
    })
}

clearGrid = () => {
    // Get all elements with the class "white"
    var whiteElements = document.querySelectorAll('.selected');

    // Loop through each element and remove the class "white"
    whiteElements.forEach(function(element) {
    element.classList.remove('selected');
    });
}