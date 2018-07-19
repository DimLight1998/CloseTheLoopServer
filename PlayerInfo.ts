// todo keep this file sync with local until ddl.

export class MyPoint {
    x: number = 0;
    y: number = 0;
}

export class MyColor {
    r: number = 0;
    g: number = 0;
    b: number = 0;
    a: number = 0;
}

export class PlayerInfo {
    playerID: number = 0;
    headPos: MyPoint = null;
    headDirection: number = 0;
    nBlocks: number = 0;
    state: number = 0;// 0 活着，1正在爆炸，2死了
    tracks: [number, number, number][] = [];
}

export class PayLoadJson {
    mapString: string = null;
    players: PlayerInfo[] = [];
    leftTop: MyPoint = null;
}