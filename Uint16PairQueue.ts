export class Uint16PairQueue {
    queueA: Uint16Array;
    queueB: Uint16Array;
    head: number;
    tail: number;

    constructor(size: number) {
        this.queueA = new Uint16Array(new ArrayBuffer(size * 2));
        this.queueB = new Uint16Array(new ArrayBuffer(size * 2));
        this.clear();
    }

    clear(): void {
        this.head = this.tail = 0;
    }

    push(a: number, b: number): void {
        this.queueA[this.tail] = a;
        this.queueB[this.tail] = b;
        this.tail++;
    }

    shift(): [number, number] {
        const res: [number, number] = [this.queueA[this.head], this.queueB[this.head]];
        this.head++;
        return res;
    }

    empty(): boolean {
        return this.head === this.tail;
    }
}