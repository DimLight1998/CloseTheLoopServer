import { Uint16PairQueue } from './Uint16PairQueue';

const size: number = 1600;
const rnd: number = 100;

let cur: number;

let queue: [number, number][] = [];

cur = Date.now();

for (let r: number = 0; r < rnd; r++) {
    for (let i: number = 0; i < size; i++) {
        queue.push([i, i]);
    }
    while (queue.length > 0) {
        queue.shift();
    }
}

console.log(Date.now() - cur);

let pq: Uint16PairQueue = new Uint16PairQueue(size);

cur = Date.now();

for (let r: number = 0; r < rnd; r++) {
    for (let i: number = 0; i < size; i++) {
        pq.push(i, i);
    }
    for (let i: number = 0; i < size; i++) {
        pq.shift();
    }
}

console.log(Date.now() - cur);