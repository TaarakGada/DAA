import { copyFileSync } from "fs";


const MatrixA: number[][] = [
    [2, 3, 4, 5],
    [5, 2, 5, 7],
    [6, 3, 6, 5],
    [7, 4, 8, 2],
];
const MatrixB: number[][] = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
];

const size: number = MatrixA[0].length
// For first of 4

function addMatrices(matrixA: number[][], matrixB: number[][]) {
    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
        throw new Error('Matrices must have the same dimensions for addition');
    }

    let sum: number[][] = [];
    for (let i = 0; i < matrixA.length; i++) {
        sum[i] = [];
        for (let j = 0; j < matrixA[0].length; j++) {
            sum[i][j] = matrixA[i][j] + matrixB[i][j];
        }
    }
    return sum;
}

function subtractMatrices(matrixA: number[][], matrixB: number[][]) {
    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
        throw new Error('Matrices must have the same dimensions for addition');
    }

    let sum: number[][] = [];
    for (let i = 0; i < matrixA.length; i++) {
        sum[i] = [];
        for (let j = 0; j < matrixA[0].length; j++) {
            sum[i][j] = matrixA[i][j] - matrixB[i][j];
        }
    }
    return sum;
}


function multiplyMatrices(matrixA: number[][], matrixB: number[][]) {
    if (matrixA[0].length !== matrixB.length) {
        throw new Error('Number of columns in the first matrix must be equal to the number of rows in the second matrix');
    }

    let product: number[][] = [];
    for (let i = 0; i < matrixA.length; i++) {
        product[i] = [];
        for (let j = 0; j < matrixB[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < matrixA[0].length; k++) {
                sum += matrixA[i][k] * matrixB[k][j];
            }
            product[i][j] = sum;
        }
    }
    return product;
}

function listToMatrix(list: number[], rows: number, cols: number): number[][] {
    var matrix: number[][] = [];
    for (var i = 0; i < rows; i++) {
        matrix[i] = [];
        for (var j = 0; j < cols; j++) {
            matrix[i][j] = list[i * cols + j];
        }
    }
    return matrix;
}


const split = (mat: number[][]) => {

    const m1: number[] = [];
    const m2: number[] = [];
    const m3: number[] = [];
    const m4: number[] = [];

    for (let i = 0; i < size / 2; i++) {
        for (let j = 0; j < size / 2; j++) {
            m2.push(mat[j][i])
        }
    }

    //  for second of 4
    for (let i = size / 2; i < size; i++) {
        for (let j = 0; j < size / 2; j++) {
            m3.push(mat[j][i])
        }
    }

    // For thrid of 4
    for (let i = 0; i < size / 2; i++) {
        for (let j = size / 2; j < size; j++) {
            m1.push(mat[j][i])
        }
    }

    //  for forth of 4
    for (let i = size / 2; i < size; i++) {
        for (let j = size / 2; j < size; j++) {
            m4.push(mat[j][i])
        }
    }
    return [listToMatrix(m1, size / 2, size / 2), listToMatrix(m2, size / 2, size / 2), listToMatrix(m3, size / 2, size / 2), listToMatrix(m4, size / 2, size / 2)]
}

const MatASplit = split(MatrixA)
const MatBSplit = split(MatrixB)


const m1 = multiplyMatrices(
    addMatrices(MatASplit[0], MatASplit[1]),
    addMatrices(MatBSplit[0], MatBSplit[2])
)

const m2 = multiplyMatrices(
    addMatrices(MatASplit[2], MatASplit[3]),
    addMatrices(MatBSplit[1], MatBSplit[3])
)

const m3 = multiplyMatrices(
    subtractMatrices(MatASplit[0], MatASplit[3]),
    addMatrices(MatBSplit[0], MatBSplit[3])
)

const m4 = multiplyMatrices(
    MatASplit[0],
    subtractMatrices(MatBSplit[2], MatBSplit[3])
)

const m5 = multiplyMatrices(
    addMatrices(MatASplit[0], MatASplit[1]),
    MatBSplit[0]
)

const m6 = multiplyMatrices(
    addMatrices(MatASplit[0], MatASplit[2]),
    MatBSplit[3]
)

const m7 = multiplyMatrices(
    MatASplit[3],
    subtractMatrices(MatASplit[1], MatASplit[0])
)



const I = subtractMatrices(subtractMatrices(addMatrices(m2, m3), m6), m7)
const J = addMatrices(m4, m6)
const K = addMatrices(m6, m7)
const L = subtractMatrices(m1, subtractMatrices(m3, subtractMatrices(m4, m5)))



console.log(I, J, K, L)



