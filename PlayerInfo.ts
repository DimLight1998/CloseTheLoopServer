// todo keep this file sync with local until ddl.
export class MyPoint {
    x: number;
    y: number;
}

export class MyColor {
    r: number;
    g: number;
    b: number;
    a: number;
}

export class PlayerInfo {
    playerID: number;
    headPos: MyPoint;
    headDirection: number;
    nKill: number;
    state: number;// 0 活着，1正在爆炸，2死了
    tracks: [number, number, number][];
}

export class PayLoadJson {
    mapString: string;
    players: PlayerInfo[];
    leftTop: MyPoint;
    leaderBoard: [number, number][];

    /**
     * Possible values:
     *
     * - 0: No sound.
     * - 1: Loop closed.
     * - 2: Kill others.
     * - 3: Killed by others.
     *
     * **Higher value has higher priority.**
     */
    soundFx: number;
}