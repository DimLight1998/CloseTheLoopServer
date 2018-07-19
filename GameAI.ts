// todo keep this file sync with local until ddl.

import { GameRoom } from './GameRoom';
import { ServerPlayerInfo } from './ServerPlayerInfo';

export class GameAI {
    // 供ai操作的游戏对象
    game: GameRoom;
    playerID: number;
    playerInfo: ServerPlayerInfo;
    status: string;
    plan: [number, number][];

    constructor(game: GameRoom, playerID: number) {
        this.game = game;
        this.playerID = playerID;
        this.playerInfo = this.game.getPlayerInfoById(this.playerID);
        this.status = 'idle';
    }

    static getRandomInt(lowerInc: number, upperExc: number): number {
        return lowerInc + Math.floor(Math.random() * (upperExc - lowerInc));
    }

    updateAI(): void {
        // todo update this file
        this.game.changeDirectionRelative(this.playerID, 'left');
    }

    idleUpdate(): void {
        // idle state means the robot is on its own land and is safe
        // schedule a path
        let probSelectNext: number = 1;
        let end: boolean = false;
        let pathNodes: [number, number][] = [];
        let [curX, curY]: [number, number] = [this.playerInfo.headPos.x, this.playerInfo.headPos.y];
        while (!end) {
            if (Math.random() < probSelectNext) {
                probSelectNext *= 0.6;
                let pushing: [number, number] = this.randomOutPointAround(curX, curY);
                pathNodes.push(pushing);
                [curX, curY] = pushing;
            } else {
                end = true;
                pathNodes.push(null);
            }
        }

        this.plan = pathNodes;

        // now we get a path, started with a point (outside), end with 'end'
        this.status = 'execute';
        this.executeUpdate();
    }

    executeUpdate(): void {
        let curDir: number = this.playerInfo.headDirection;
        let [curX, curY]: [number, number] = [this.playerInfo.headPos.x, this.playerInfo.headPos.y];

        // peek the first value in the plan
        if (this.plan.length === 0 || this.plan[0] === null) {
            // nothing to do, go to base to change to idle status
        } else {
            let [tarX, tarY]: [number, number] = this.plan[0];
            let [diffX, diffY]: [number, number] = [tarX - curX, tarY - curY];
        }
    }

    randomPointAround(x: number, y: number, normInfDistance: number): [number, number] {
        let retX: number = GameAI.getRandomInt(
            Math.max(x - normInfDistance, 0),
            Math.min(x + normInfDistance + 1, this.game.nRows)
        );
        let retY: number = GameAI.getRandomInt(
            Math.max(y - normInfDistance, 0),
            Math.min(y + normInfDistance + 1, this.game.nCols)
        );
        return [retX, retY];
    }

    randomPointAroundMe(normInfDistance: number): [number, number] {
        return this.randomPointAround(this.playerInfo.headPos.x, this.playerInfo.headPos.y, normInfDistance);
    }

    randomOutPointAround(x: number, y: number): [number, number] {
        let isOutSide: boolean = false;
        let tryDistance: number = 5;
        let [tarX, tarY]: [number, number] = [0, 0];

        while (!isOutSide) {
            for (let i: number = 0; i < 4; i++) {
                [tarX, tarY] = this.randomPointAround(x, y, tryDistance);
                if (!this.isMyLand(tarX, tarY)) {
                    isOutSide = true;
                    break;
                }
            }
            if (!isOutSide) {
                tryDistance *= 1.4;
            }
        }

        return [tarX, tarY];
    }

    isMyLand(x: number, y: number): boolean {
        return this.game.colorMap[x][y] === this.playerID;
    }

    isMyTrack(x: number, y: number): boolean {
        return this.game.trackMap[x][y] === this.playerID;
    }
}