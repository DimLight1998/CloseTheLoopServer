export class Uint16TripleQueue {
    queueA: Uint16Array;
    queueB: Uint16Array;
    queueC: Uint16Array;
    head: number;
    tail: number;

    constructor(size: number) {
        this.queueA = new Uint16Array(new ArrayBuffer(size * 2));
        this.queueB = new Uint16Array(new ArrayBuffer(size * 2));
        this.queueC = new Uint16Array(new ArrayBuffer(size * 2));
        this.clear();
    }

    clear(): void {
        this.head = this.tail = 0;
    }

    push(a: number, b: number, c: number): void {
        this.queueA[this.tail] = a;
        this.queueB[this.tail] = b;
        this.queueC[this.tail] = c;
        this.tail++;
    }

    shift(): [number, number, number] {
        const res: [number, number, number] = [this.queueA[this.head], this.queueB[this.head], this.queueC[this.head]];
        this.head++;
        return res;
    }

    empty(): boolean {
        return this.head === this.tail;
    }
}