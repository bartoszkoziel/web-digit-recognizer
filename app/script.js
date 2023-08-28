var isDrawing = false
var grid = []
var answer = ""

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
    const btnSend = document.getElementById('btnSend')

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

    btnSend.addEventListener("click", () => {
        answer = sendGrid()
    })
}

clearGrid = () => {
    grid = []
    let whiteElements = document.querySelectorAll('.selected');

    whiteElements.forEach(function(element) {
    element.classList.remove('selected');

    document.getElementById("divPred").innerHTML = ""
    });
}

sendGrid = () => {
    let elements = document.querySelectorAll('.square');

    elements.forEach(function(element) {
        if (element.classList.contains('selected')) {
            grid.push(1)
        }

        else {
            grid.push(0)
        }
    })

    const body = JSON.stringify(grid)
    const headers = { "Content-Type": "application/json"}

    console.log("FETCHING")

    let wynik = fetch("/handleUpload", { method: "post", body, headers })
        .then(data => {
            response = data.json()

            return response.then((pred) => {
                pred = pred[0]
                // let text = ""

                for (i=0; i<10; i++){
                    let p = document.createElement("p")
                    p.append(i + ": " + pred[i].toFixed(2))
                    document.getElementById("divPred").append(p)
                }
            })
        })

    console.log("WYNICZEK HERE: ", wynik)
}