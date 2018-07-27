import ndarray from 'ndarray';

let cur: number;

cur = Date.now();

let arr: number[][] = Array.from({ length: 80 }, () => Array.from({ length: 80 }, () => 0));

for (let rnd: number = 0; rnd < 1000; rnd++) {
    for (let i: number = 0; i < 80; i++) {
        for (let j: number = 0; j < 80; j++) {
            arr[i][j]++;
        }
    }
}

console.log(Date.now() - cur);

cur = Date.now();

let ndarr: ndarray = ndarray(new Uint32Array(new ArrayBuffer(80 * 80 * 4)), [80, 80]);

for (let rnd: number = 0; rnd < 1000; rnd++) {
    for (let i: number = 0; i < 80; i++) {
        for (let j: number = 0; j < 80; j++) {
            ndarr.set(i, j, ndarr.get(i, j) + 1);
        }
    }
}

console.log(Date.now() - cur);