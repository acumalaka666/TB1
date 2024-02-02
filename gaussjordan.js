class Fraction {
    constructor(frac) {
        this.num = parseInt(frac.split("/")[0]);
        this.den = frac.includes("/") ? parseInt(frac.split("/")[1]) : 1;
        this.reduce();
    }

    reduce() {
        const commonDivisor = this.gcd(this.den, this.num);
        this.den = this.den / commonDivisor;
        this.num = this.num / commonDivisor;
        if (this.den < 0) {
            this.den *= -1;
            this.num *= -1;
        }
    }

    gcd(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b > 0) {
            const c = a % b;
            a = b;
            b = c;
        }
        return a;
    }

    add(other) {
        const res = new Fraction("1");
        const lcm = (this.den * other.den) / this.gcd(this.den, other.den);
        res.den = lcm;
        res.num = (this.num * (lcm / this.den)) + (other.num * (lcm / other.den));
        res.reduce();
        return res;
    }

    subtract(other) {
        const res = new Fraction("1");
        const lcm = (this.den * other.den) / this.gcd(this.den, other.den);
        res.den = lcm;
        res.num = (this.num * (lcm / this.den)) - (other.num * (lcm / other.den));
        res.reduce();
        return res;
    }

    multiply(other) {
        const res = new Fraction("1");
        res.den = this.den * other.den;
        res.num = this.num * other.num;
        res.reduce();
        return res;
    }

    divide(other) {
        const res = new Fraction("1");
        res.den = this.den * other.num;
        res.num = this.num * other.den;
        res.reduce();
        return res;
    }

    toString() {
        if (this.den !== 1) {
            return `${this.num}/${this.den}`;
        } else {
            return `${this.num}`;
        }
    }

    abs() {
        const res = new Fraction("1");
        res.num = Math.abs(this.num);
        res.den = this.den;
        return res;
    }

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

    // Gauss
    for (let i = 0; i < cols; i++) {
        const pivot = matrix[0][i];
        if (pivot.num !== 0) {
            for (let k = 0; k < cols; k++) {
                matrix[0][k] /= pivot;
            }
            break;
        }
    }

    for (let i = 0; i < cols - 1; i++) {
        for (let j = i + 1; j < rows; j++) {
            if (matrix[i][i].num === 0) {
                continue;
            }
            const ratio = matrix[j][i] / matrix[i][i];
            for (let k = i; k < cols; k++) {
                matrix[j][k] = matrix[j][k] - ratio * matrix[i][k];
            }
        }
    }

    // Jordan
    for (let i = Math.min(rows, cols) - 1; i > 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
            const ratio = matrix[j][i];
            for (let k = cols - 1; k >= i; k--) {
                matrix[j][k] = matrix[j][k] - ratio * matrix[i][k];
            }
        }
    }

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
