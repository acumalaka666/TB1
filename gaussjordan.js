function createMatrix() {
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);

    let matrixHTML = "<table>";
    for (let i = 0; i < rows; i++) {
        matrixHTML += "<tr>";
        for (let j = 0; j < cols; j++) {
            matrixHTML += `<td><input type="number" id="cell_${i}_${j}" placeholder="${i + 1},${j + 1}"></td>`;
        }
        matrixHTML += "</tr>";
    }
    matrixHTML += "</table>";

    document.getElementById("matrix-container").innerHTML = matrixHTML;
}

function solveGaussJordan() {
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);

    // Mendapatkan nilai dari matriks
    let matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            matrix[i][j] = parseFloat(document.getElementById(`cell_${i}_${j}`).value) || 0;
        }
    }

    // Menyelesaikan matriks menggunakan metode Gauss-Jordan
    const steps = gaussJordan(matrix);

    // Menampilkan langkah-langkah penyelesaian
    displaySteps(steps);
}

function gaussJordan(matrix) {
    // Implementasi metode Gauss-Jordan di sini
    // ...

    // Contoh langkah-langkah:
    const steps = [];
    steps.push(matrix.map(row => [...row])); // Langkah awal

    // Contoh langkah 1: Menggunakan operasi baris elementer untuk membuat 0 di bawah elemen matriks[0][0]
    // ...

    // Contoh langkah 2: Membuat elemen matriks[1][1] menjadi 1
    // ...

    // Langkah selanjutnya sesuai dengan metode Gauss-Jordan

    return steps;
}

function displaySteps(steps) {
    const stepsContainer = document.getElementById("steps-container");
    stepsContainer.innerHTML = "";

    for (let i = 0; i < steps.length; i++) {
        const stepTable = "<table>" +
            steps[i].map(row => "<tr>" + row.map(cell => `<td>${cell.toFixed(2)}</td>`).join("") + "</tr>").join("") +
            "</table>";

        const stepDiv = document.createElement("div");
        stepDiv.innerHTML = `<h3>Langkah ${i + 1}</h3>${stepTable}`;
        stepsContainer.appendChild(stepDiv);
    }
}
