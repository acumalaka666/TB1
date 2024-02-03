function solveGaussJordan() {
    const matrixInput = document.getElementById("matrixInput").value;
    const lines = matrixInput.split('\n');
    const rows = lines.length;
    const cols = lines[0].split(' ').length;

    const matrix = [];
    for (let i = 0; i < rows; i++) {
        const line = lines[i].split(' ');
        matrix.push([]);
        for (let j = 0; j < cols; j++) {
            matrix[i].push(new Fraction(line[j]));
        }
    }

    let outputText = "";

    // Gauss
    let pivot = new Fraction("0");
    for (let k = 0; k < cols; k++) {
        if (matrix[0][k] !== 0 && pivot.num === 0) {
            pivot = matrix[0][k];
        }
        if (pivot.num !== 0) {
            matrix[0][k] /= pivot;
        }
    }

    for (let i = 0; i < cols - 1; i++) {
        for (let j = i + 1; j < rows; j++) {
            if (matrix[i][i].num === 0) {
                continue;
            }
            const ratio = matrix[j][i] / matrix[i][i];
            outputText += `r${j + 1} -${ratio.num >= 0 ? '-' : '+'} ${Math.abs(ratio)} r${i + 1}\n`;
            pivot = new Fraction("0");
            for (let k = i; k < cols; k++) {
                matrix[j][k] = matrix[j][k] - ratio * matrix[i][k];
                if (matrix[j][k] !== 0 && pivot.num === 0) {
                    pivot = matrix[j][k];
                }
                if (pivot.num !== 0) {
                    matrix[j][k] /= pivot;
                }
            }
        }
        outputText += '\n';
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
}

