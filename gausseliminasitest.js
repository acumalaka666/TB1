const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function gaussJordan(x, y, verbose = 0) {
    const m = x.length;
    const n = x[0].length;
    let augmentedMat = new Array(m).fill(0).map(() => new Array(n + 1).fill(0));

    for (let i = 0; i < m; i++) {
        augmentedMat[i] = [...x[i], y[i]];
    }

    if (verbose > 0) {
        console.log('# Matriks tambahan awal');
        augmentedMat.forEach(row => console.log(row));
    }

    const outerLoop = [[0, m - 1, 1], [m - 1, 0, -1]];
    for (let d = 0; d < 2; d++) {
        for (let i = outerLoop[d][0]; d === 0 ? i <= outerLoop[d][1] : i >= outerLoop[d][1]; i += outerLoop[d][2]) {
            const innerLoop = [[i + 1, m, 1], [i - 1, -1, -1]];
            for (let j = innerLoop[d][0]; d === 0 ? j < innerLoop[d][1] : j > innerLoop[d][1]; j += innerLoop[d][2]) {
                const k = (-1) * augmentedMat[j][i] / augmentedMat[i][i];
                const tempRow = augmentedMat[i].map(val => k * val);
                if (verbose > 1) {
                    console.log(`# Gunakan baris ${i + 1} untuk baris ${j + 1}`);
                    console.log(`k=${k}`, '*', augmentedMat[i], '=', tempRow);
                }
                augmentedMat[j] = augmentedMat[j].map((val, index) => val + tempRow[index]);
                if (verbose > 1) {
                    augmentedMat.forEach(row => console.log(row));
                }
            }
        }
    }

    for (let i = 0; i < m; i++) {
        augmentedMat[i] = augmentedMat[i].map(val => val / augmentedMat[i][i]);
    }

    if (verbose > 0) {
        console.log('# Normalisasi baris');
        augmentedMat.forEach(row => console.log(row));
    }

    return augmentedMat.map(row => row[n]);
}

function main() {
    console.log("Masukkan koefisien matriks (pisahkan angka dengan spasi):");
    const coefficients = [];
    for (let i = 0; i < 3; i++) {
        const row = readlineSync.question('Masukkan baris matriks: ').split(' ').map(Number);
        coefficients.push(row);
    }
    console.log("Masukkan sisi kanan matriks (pisahkan angka dengan spasi):");
    const rightHandSide = readlineSync.question('Masukkan sisi kanan matriks: ').split(' ').map(Number);

    let verbose = 0;
    const verboseInput = readlineSync.question("Apakah Anda ingin menampilkan langkah-langkahnya? (y/n): ");
    if (verboseInput.toLowerCase() === "y") {
        verbose = 2;
    }

    const hasil = gaussJordan(coefficients, rightHandSide, verbose);
    console.log("Hasilnya adalah:", hasil);
}

main();
