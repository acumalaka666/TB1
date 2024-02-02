class Fraction {
    // ... (sama seperti sebelumnya)

    static fromInput(inputId) {
        return new Fraction(document.getElementById(inputId).value);
    }
}

function generateMatrix() {
    const rows = parseInt(document.getElementById("rowsInput").value);
    const cols = parseInt(document.getElementById("colsInput").value);

    const matrixInputs = document.getElementById("matrixInputs");
    matrixInputs.innerHTML = "";

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const inputId = `matrixInput_${i}_${j}`;
            const input = document.createElement("input");
            input.type = "text";
            input.className = "matrixInput";
            input.id = inputId;
            matrixInputs.appendChild(input);

            if (j < cols - 1) {
                const space = document.createTextNode(" ");
                matrixInputs.appendChild(space);
            }
        }
        const lineBreak = document.createElement("br");
        matrixInputs.appendChild(lineBreak);
    }
}

function getMatrixFromInput(rows, cols) {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix.push([]);
        for (let j = 0; j < cols; j++) {
            matrix[i].push(Fraction.fromInput(`matrixInput_${i}_${j}`));
        }
    }
    return matrix;
}

function solveGaussJordan() {
    const rows = parseInt(document.getElementById("rowsInput").value);
    const cols = parseInt(document.getElementById("colsInput").value);

    const matrix = getMatrixFromInput(rows, cols);

    let outputText = "";

    // ... (sama seperti sebelumnya)

    // Output
    outputText += "Result:\n";
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            outputText += matrix[i][j].toString() + ' ';
        }
        outputText += '\n';
    }

    document.getElementById("output").textContent = outputText;
}
