const test = [
    [{
        real: 1,
        imag: 2
    }, {
        real: 3,
        imag: 4
    }],
    [{
        real: 5,
        imag: 6
    }, {
        real: 7,
        imag: 8
    }],
    [{
        real: 9,
        imag: 10
    }, {
        real: 11,
        imag: 12
    }]
]

console.log(flatten(test))
console.log(test);
console.log(matrix(3, 2, flatten(test)))
