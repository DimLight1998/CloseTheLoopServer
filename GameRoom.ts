// todo keep this file sync with local until ddl.

import { ServerPlayerInfo } from './ServerPlayerInfo';
import { GameAI } from './GameAI';
import { MyPoint, PayLoadJson, PlayerInfo } from './PlayerInfo';
import { IServerAdapter } from './IAdapter';
import { PayLoad, MyPointProto, PlayerInfoProto, Track, LeaderBoardItem, IPlayerInfoProto } from './PayLoadProtobuf';
import { Uint16PairQueue } from './Uint16PairQueue';

export class GameRoom {
    static directions: MyPoint[] = [
        { x: -1, y: 0 }, // up
        { x: 0, y: 1 }, // right
        { x: 1, y: 0 }, // down
        { x: 0, y: -1 }, // left
    ];

    static roundDuration: number = 200;// 200ms per round

    nRows: number;
    nCols: number;
    colorMap: number[][];
    trackMap: number[][];
    serverPlayerInfos: ServerPlayerInfo[];
    playerNum: number;// do not exceed 14
    timer: any;
    lastUpdateTime: number;
    serverAdapter: IServerAdapter = null;
    playersToClear: [number, boolean][] = [];
    potentialFillList: number[] = [];
    rebornList: number[] = [];
    leaderBoard: [number, number][] = [];
    soundFxs: number[] = [];
    newPlayers: number[] = [];
    rebornHumanList: number[] = [];

    mapStatus: number[][] = null;
    maxT: number;
    payload: PayLoad;

    inWx: boolean = false;

    pairQueue: Uint16PairQueue = null;
    storageQueue: Uint16PairQueue = null;

    constructor(nRows: number, nCols: number, playerNum: number) {
        this.nRows = nRows;
        this.nCols = nCols;
        this.playerNum = playerNum;
        this.colorMap = GameRoom.create2DArray(nRows, nCols);
        this.trackMap = GameRoom.create2DArray(nRows, nCols);
        this.mapStatus = GameRoom.create2DArray(nRows, nCols);

        GameAI.vis = GameRoom.create3DArray(nRows, nCols, 4);
        GameAI.max_t = 0;
        GameAI.prevDir = GameRoom.create3DArray(nRows, nCols, 4);
        GameAI.dist = GameRoom.create3DArray(nRows, nCols, 4);

        this.maxT = 0;
        this.soundFxs = Array(this.playerNum + 1).fill(0);

        this.payload = new PayLoad();
        this.payload.players = [];
        this.payload.leaderBoard = [];
        for (let i: number = 0; i < this.playerNum; i++) {
            this.payload.players.push(new PlayerInfoProto());
            this.payload.players[i].headPos = new MyPointProto();
            this.payload.leaderBoard.push(new LeaderBoardItem());
        }
        this.payload.leftTop = new MyPointProto();

        this.pairQueue = new Uint16PairQueue(nRows * nCols);
        this.storageQueue = new Uint16PairQueue(nRows * nCols);
    }

    static create2DArray(nRows: number, nCols: number): number[][] {
        return Array(nRows).fill(0).map(() => Array(nCols).fill(0));
    }

    static create3DArray(nRows: number, nCols: number, nDims: number): number[][][] {
        return Array(nRows).fill(0).map(() => Array(nCols).fill(0).map(() => Array(nDims).fill(0)));
    }

    static randInt(l: number, r: number): number {
        return l + Math.floor(Math.random() * (r - l + 1));
    }

    static rangeAll(rMin: number, rMax: number, cMin: number, cMax: number, callback: (r: number, c: number) => boolean): boolean {
        for (let r: number = rMin; r <= rMax; r++) {
            for (let c: number = cMin; c <= cMax; c++) {
                if (!callback(r, c)) {
                    return false;
                }
            }
        }
        return true;
    }

    static isAlive(info: PlayerInfo | IPlayerInfoProto): boolean {
        return info.state === 0 || info.state === 3;
    }

    public setServerAdapter(adapter: IServerAdapter): void {
        this.serverAdapter = adapter;
    }

    /**
     * initialize all AI players (will be replaced soon), update round regularly.
     */
    public startNewGame(): void {
        this.initAIPlayers();
        if (!this.inWx) {
            this.timer = setTimeout(this.updateRound.bind(this), 0);// invoke the first time
        }
    }

    /**
     * change the player's direction, prevent turning back.
     */
    changeDirection(playerID: number, direction: number): void { // validate the direction
        const player: ServerPlayerInfo = this.serverPlayerInfos[playerID - 1];
        if ((player.headDirection + 2) % 4 === direction) {
            // invalid direction
        } else {
            player.nextDirection = direction;
        }
    }

    changeDirectionRelative(playerID: number, nextDirection: string): void {
        let currentDirection: number = this.getPlayerInfoById(playerID).headDirection;
        if (nextDirection === 'left') {
            this.changeDirection(playerID, (currentDirection + 3) % 4);
        } else if (nextDirection === 'right') {
            this.changeDirection(playerID, (currentDirection + 1) % 4);
        }
    }

    getPlayerInfoById(playerID: number): ServerPlayerInfo {
        return this.serverPlayerInfos[playerID - 1];
    }

    /**
     * try to generate a 3x3 block for a player to spawn on, return the center of the block.
     * sometimes finding such area is hard (maybe impossible), return null in this case.
     */
    randomSpawnNewPlayer(playerID: number): MyPoint {
        const maxTryNum: number = 20;
        for (let i: number = 0; i < maxTryNum; i++) {
            const r: number = GameRoom.randInt(0, this.nRows - 1);
            const c: number = GameRoom.randInt(0, this.nCols - 1);
            if (GameRoom.rangeAll(r - 1, r + 1, c - 1, c + 1, (r: number, c: number): boolean => {
                if (this.outOfRange(r, c)) {
                    return false;
                }
                return this.colorMap[r][c] === 0;
            })) {
                GameRoom.rangeAll(r - 1, r + 1, c - 1, c + 1, (r: number, c: number): boolean => {
                    this.colorMap[r][c] = playerID;
                    return true;// will continue
                });
                return {
                    x: r,
                    y: c
                };
            }
        }
        return null;
    }

    /**
     * fill the room with AI players, they will be replaced when new player enters in.
     */
    initAIPlayers(): void {
        this.serverPlayerInfos = [];
        this.rebornList = [];
        for (let i: number = 0; i < this.playerNum; i++) {
            const info: ServerPlayerInfo = {
                playerID: i + 1, // 0 reserverd for space
                isAI: true,
                aiInstance: null,
                headPos: null, // do it later
                headDirection: 0, // up
                nKill: 0,
                state: 2, // 0 活着，1正在爆炸，2死了
                nextDirection: 0, // same as headDirection
                tracks: [],
                focusPoint: null
            };
            this.serverPlayerInfos.push(info);

            info.aiInstance = new GameAI(this, i + 1);

            this.rebornList.push(info.playerID);
        }
    }

    addToClearList(playerID: number, includeMap: boolean): void {
        for (let i: number = 0; i < this.playersToClear.length; i++) {
            if (this.playersToClear[i][0] === playerID) {
                this.playersToClear[i][1] = this.playersToClear[i][1] || includeMap;
                return;
            }
        }
        this.playersToClear.push([playerID, includeMap]);
    }

    updateDyingPlayers(): void {
        for (let player of this.serverPlayerInfos) {
            if (player.state === 1) {
                player.state = 2;
            } else if (player.state === 3) {
                player.state = 0;
            }
        }
    }

    /**
     * update all players' location, logically.
     */
    updatePlayerPos(): void {
        for (let player of this.serverPlayerInfos) {
            if (GameRoom.isAlive(player)) { // alive

                if (this.colorMap[player.headPos.x][player.headPos.y] !== player.playerID) {
                    this.trackMap[player.headPos.x][player.headPos.y] = player.playerID;

                    if (player.headDirection !== player.nextDirection) {
                        let a: number = player.headDirection;
                        let b: number = player.nextDirection;
                        let res: number;
                        if ((a + 1) % 4 !== b) { // anti clock wise
                            res = (a + 1) % 4;
                        } else { // clock wise
                            res = a;
                        }
                        player.tracks.push([player.headPos.x, player.headPos.y, res]);
                    }
                }

                player.headDirection = player.nextDirection;
                const vector: MyPoint = GameRoom.directions[player.headDirection];

                let nextPositionX: number = player.headPos.x + vector.x;
                let nextPositionY: number = player.headPos.y + vector.y;
                if (this.colorMap[player.headPos.x][player.headPos.y] !== player.playerID &&
                    !this.atBorder(nextPositionX, nextPositionY) &&
                    this.colorMap[nextPositionX][nextPositionY] === player.playerID) {
                    this.potentialFillList.push(player.playerID);
                }

                player.headPos.x += vector.x;
                player.headPos.y += vector.y;
            }
        }
    }

    updateTrackCutting(): void {
        for (let player of this.serverPlayerInfos) {
            if (GameRoom.isAlive(player) && !this.atBorder(player.headPos.x, player.headPos.y)) {
                let currentTrackId: number = this.trackMap[player.headPos.x][player.headPos.y];
                if (currentTrackId !== 0) {
                    const otherPlayer: ServerPlayerInfo = this.serverPlayerInfos[currentTrackId - 1];
                    if (GameRoom.isAlive(otherPlayer)
                        && !this.atBorder(otherPlayer.headPos.x, otherPlayer.headPos.y)) {// will be killed by wall
                        if (this.colorMap[otherPlayer.headPos.x][otherPlayer.headPos.y] !== otherPlayer.playerID) {
                            this.addToClearList(otherPlayer.playerID, true);

                            // update sound
                            this.soundFxs[player.playerID] = Math.max(this.soundFxs[player.playerID], 2);

                            // update nKill
                            this.getPlayerInfoById(player.playerID).nKill++;
                        } else {
                            this.addToClearList(otherPlayer.playerID, false);
                        }
                    }
                }
            }
        }
    }

    updatePlayerOverlapping(): void {
        for (let player of this.serverPlayerInfos) {
            if (GameRoom.isAlive(player)) {
                let [curPlayerX, curPlayerY]: [number, number] = [player.headPos.x, player.headPos.y];

                if (this.atBorder(curPlayerX, curPlayerY)) {
                    this.addToClearList(player.playerID, true);
                } else {
                    for (let otherPlayer of this.serverPlayerInfos) {
                        if (otherPlayer !== player &&
                            GameRoom.isAlive(otherPlayer) &&
                            otherPlayer.headPos.x === curPlayerX &&
                            otherPlayer.headPos.y === curPlayerY &&
                            this.colorMap[otherPlayer.headPos.x][otherPlayer.headPos.y] !== otherPlayer.playerID) {
                            this.soundFxs[player.playerID] = Math.max(this.soundFxs[player.playerID], 2);
                            this.getPlayerInfoById(player.playerID).nKill++;
                            this.addToClearList(otherPlayer.playerID, true);
                        }
                    }
                }
            }
        }
    }

    floodFill(r: number, c: number, playerId: number): boolean {
        // start flood fill
        let adjToWall: boolean = false;

        this.pairQueue.clear();
        this.storageQueue.clear();

        this.pairQueue.push(r, c);
        this.storageQueue.push(r, c);
        this.mapStatus[r][c] = this.maxT;

        while (!this.pairQueue.empty()) {
            let [x, y]: [number, number] = this.pairQueue.shift();

            for (let dir of GameRoom.directions) {
                let [nx, ny]: [number, number] = [x + dir.x, y + dir.y];
                if (this.atBorder(nx, ny)) {
                    adjToWall = true;
                } else {
                    if (this.colorMap[nx][ny] !== playerId
                        && this.trackMap[nx][ny] !== playerId
                        && this.mapStatus[nx][ny] !== this.maxT) {
                        this.mapStatus[nx][ny] = this.maxT;
                        this.pairQueue.push(nx, ny);
                        this.storageQueue.push(nx, ny);
                    }
                }
            }
        }

        if (!adjToWall) {
            // console.log(storage);

            // this block is not adjacent to a wall, so it should be colored
            for (let i: number = this.storageQueue.head; i < this.storageQueue.tail; i++) {
                this.colorMap[this.storageQueue.queueA[i]][this.storageQueue.queueB[i]] = playerId;
            }
            return true;
        }
        return false;
    }

    fillPlayer(playerId: number): boolean {
        // let cur: number = Date.now();
        let success: boolean = false;

        this.maxT++;
        // flood fill
        for (let r: number = 0; r < this.nRows; r++) {
            for (let c: number = 0; c < this.nCols; c++) {
                if (this.mapStatus[r][c] !== this.maxT && this.colorMap[r][c] !== playerId && this.trackMap[r][c] !== playerId) {
                    success = this.floodFill(r, c, playerId) || success;
                }
            }
        }

        for (let r: number = 0; r < this.nRows; r++) {
            for (let c: number = 0; c < this.nCols; c++) {
                if (this.trackMap[r][c] === playerId) {
                    this.colorMap[r][c] = playerId;
                    this.trackMap[r][c] = 0;
                    success = true;
                }
            }
        }

        this.serverPlayerInfos[playerId - 1].tracks = [];
        return success;

        // console.log('bfs costs ' + (Date.now() - cur) + 'ms');
    }

    updateColorFilling(): void {
        /**
         * This function will consider color and track with id `walledId` as wall.
         */

        // since there are modification to the clearList, we should update potential list
        let excludeList: number[] = this.playersToClear.map(p => p[0]);

        this.potentialFillList = this.potentialFillList.filter(x => excludeList.indexOf(x) === -1);

        // for elements still in the potential list, fill for them
        for (let playerId of this.potentialFillList) {
            let success: boolean = this.fillPlayer(playerId);
            if (success) {
                this.soundFxs[playerId] = Math.max(1, this.soundFxs[playerId]);
            }
        }
    }

    updatePlayerReborn(): void {
        for (let playerID of this.rebornList) {
            const info: ServerPlayerInfo = this.serverPlayerInfos[playerID - 1];
            info.headPos = this.randomSpawnNewPlayer(playerID);
            if (info.headPos !== null) {
                info.focusPoint = {
                    x: info.headPos.x,
                    y: info.headPos.y
                };
                info.state = 3;
                info.nKill = 0;
                info.aiInstance.init();
            }
        }
        this.rebornList = [];
    }

    updateLeaderBoard(): void {
        let count: number[] = Array.from({ length: this.playerNum + 1 }, () => 0);
        for (let r: number = 0; r < this.nRows; r++) {
            for (let c: number = 0; c < this.nCols; c++) {
                count[this.colorMap[r][c]]++;
            }
        }

        for (let i: number = 0; i < count.length; i++) {
            count[i] /= this.nRows * this.nCols;
        }

        this.leaderBoard = [];
        for (let i: number = 1; i < count.length; i++) {
            this.leaderBoard.push([i, count[i]]);
        }
        this.leaderBoard.sort(([, score1], [, score2]) => score2 - score1);
    }

    updateAIs(): void {
        if (GameAI.maxDistance < GameAI.finalMaxDistance) {
            GameAI.maxDistance += GameAI.distanceStep;
        }
        for (const player of this.serverPlayerInfos) {
            if (GameRoom.isAlive(player)) {
                player.aiInstance.updateAI();
            }
        }
        for (const player of this.serverPlayerInfos) {
            if (GameRoom.isAlive(player)) {
                player.aiInstance.lateUpdateAI();
            }
        }
    }

    initSounds(): void {
        for (let i: number = 0; i <= this.playerNum; i++) {
            this.soundFxs[i] = 0;
        }
    }

    updateHumanReborn(): void {
        const MaxChoice: number = 10;
        if (this.rebornHumanList.length === 0) {
            return;
        }
        let choices: ([number, number][])[] = Array(this.rebornHumanList.length).fill([]);
        for (let r: number = 0; r < this.nRows; r++) {
            for (let c: number = 0; c < this.nCols; c++) {
                if (this.colorMap[r][c] === 0) {
                    continue;
                }
                let index: number = this.rebornHumanList.indexOf(this.colorMap[r][c]);
                if (index !== -1 && choices[index].length < MaxChoice) {
                    choices[index].push([r, c]);
                }
            }
        }
        for (let i: number = 0; i < this.rebornHumanList.length; i++) {
            let playerId: number = this.rebornHumanList[i];
            if (choices[i].length > 0) {
                let [r, c]: [number, number] = choices[i][GameRoom.randInt(0, choices[i].length - 1)];
                this.serverPlayerInfos[playerId - 1].headPos.x = r;
                this.serverPlayerInfos[playerId - 1].headPos.y = c;
                this.serverPlayerInfos[playerId - 1].state = 3;
            } else {
                this.serverPlayerInfos[playerId - 1].state = 4;
            }
        }
        this.rebornHumanList = [];
    }

    /**
     * update all players' position logically. if it has a server adapter, dispatch the world to other clients.
     */
    updateRound(): void {
        this.lastUpdateTime = Date.now();
        this.playersToClear = [];
        this.potentialFillList = [];
        this.initSounds();
        this.updateDyingPlayers();
        this.updatePlayerPos();
        this.updateHumanReborn();
        this.updatePlayerReborn();
        this.updateTrackCutting();
        this.updatePlayerOverlapping();
        this.updateColorFilling();
        this.clearPlayers();
        this.updateDeadPlayer();
        this.updateLeaderBoard();
        if (this.serverAdapter !== null) {
            this.serverAdapter.dispatchNewWorld();
        }
        this.updateAIs();
        let currentTime: number = Date.now();
        let duration: number = this.lastUpdateTime + GameRoom.roundDuration - currentTime;
        if (duration < 0) {
            console.log('Warning! next update should happen ' + -duration + 'ms ago!');
            duration = 0;
        } else {
            // console.log('actually compute costs ' + (currentTime - this.lastUpdateTime) + 'ms');
        }
        if (!this.inWx) {
            this.timer = setTimeout(this.updateRound.bind(this), duration);
        }
    }

    /**
     * add a real player into serverPlayerInfos by replacing a random AI player,
     * return original ID of the player. If no such AI player found, return null.
     */
    replaceAIWithPlayer(): number {
        const validIndexes: number[] = [];
        for (let i: number = 0; i < this.serverPlayerInfos.length; i++) {
            if (this.serverPlayerInfos[i].isAI) {
                validIndexes.push(i);
            }
        }
        if (validIndexes.length === 0) {
            return null;
        }
        const index: number = validIndexes[GameRoom.randInt(0, validIndexes.length - 1)];
        const obj: ServerPlayerInfo = this.serverPlayerInfos[index];
        this.newPlayers.push(obj.playerID);
        return obj.playerID;
    }

    replacePlayerWithAI(playerID: number): void {
        const obj: ServerPlayerInfo = this.serverPlayerInfos[playerID - 1];
        obj.isAI = true;
        obj.aiInstance.init();
        this.addToClearList(obj.playerID, true);
    }

    /**
     * check if the given point is at border of the map.On the map,
     * 0 to(row - 1) and 0 to(col - 1)(both included) are walkable areas,
     * -1, row and col represent borders.Only return true if the point is exactly on the border.
     */
    atBorder(row: number, col: number): boolean {
        if (row < -1 || row > this.nRows || col < -1 || col > this.nCols) {
            return false;
        }
        return row === -1 ||
            row === this.nRows ||
            col === -1 ||
            col === this.nCols;
    }

    /**
     * check if the given point is out of the walkable area. note the border is also considered out of range.
     */
    outOfRange(r: number, c: number): boolean {
        return r < 0 ||
            r >= this.nRows ||
            c < 0 ||
            c >= this.nCols;
    }

    /**
     * dump the current status into a json, used for dispatching world.
     * @param playerID2Track the player to which the current status is specialized. (not the whole status is dumped
     * for transmission issue)
     */
    getListenerView(playerID2Track: number, viewNRows: number, viewNCols: number): PayLoadJson {
        let leftTop: MyPoint = null;
        let mapString: string = '';
        const playerInfos: PlayerInfo[] = [];
        const func: (r: number, c: number) => boolean = (r: number, c: number): boolean => {
            let color: number = 0;
            let track: number = 0;
            if (this.atBorder(r, c)) { // wall
                color = 15;
                track = 0;
            } else if (this.outOfRange(r, c)) {
                color = track = 0;
            } else {
                color = this.colorMap[r][c];
                track = this.trackMap[r][c];
            }
            // tslint:disable-next-line:no-bitwise
            mapString += String.fromCharCode(track << 4 | color);// low bit for color
            return true;
        };
        for (let info of this.serverPlayerInfos) {
            playerInfos.push({
                playerID: info.playerID,
                headPos: info.headPos,
                headDirection: info.headDirection,
                state: info.state,
                tracks: info.tracks,
                nKill: info.nKill
            });

            // @bug this implementation is wrong when one player has multiple viewports, but now it is okay
            if (Math.abs(info.focusPoint.x - info.headPos.x) > viewNRows / 4) {
                info.focusPoint.x = info.headPos.x;
            }
            if (Math.abs(info.focusPoint.y - info.headPos.y) > viewNCols / 4) {
                info.focusPoint.y = info.headPos.y;
            }
            if (info.playerID === playerID2Track) {
                leftTop = {
                    x: info.focusPoint.x - Math.floor(viewNRows / 2),
                    y: info.focusPoint.y - Math.floor(viewNCols / 2)
                };
                GameRoom.rangeAll(leftTop.x, leftTop.x + viewNRows - 1,
                    leftTop.y, leftTop.y + viewNCols - 1, func);
            }
        }

        return {
            mapString,
            players: playerInfos,
            leftTop,
            leaderBoard: this.leaderBoard,
            soundFx: this.soundFxs[playerID2Track]
        };
    }

    initPlayerInfoProto(): void {
        for (let i: number = 0; i < this.playerNum; i++) {
            this.payload.players[i].playerID = this.serverPlayerInfos[i].playerID;
            if (this.serverPlayerInfos[i].headPos !== null) {
                this.payload.players[i].headPos.x = this.serverPlayerInfos[i].headPos.x;
                this.payload.players[i].headPos.y = this.serverPlayerInfos[i].headPos.y;
            } else {
                this.payload.players[i].headPos.x = -1; // dummy value
                this.payload.players[i].headPos.y = -1; // dummy value
            }
            this.payload.players[i].headDirection = this.serverPlayerInfos[i].headDirection;
            this.payload.players[i].nKill = this.serverPlayerInfos[i].nKill;
            this.payload.players[i].state = this.serverPlayerInfos[i].state;
            this.payload.players[i].tracks = [];
            for (let [x, y, d] of this.serverPlayerInfos[i].tracks) {
                this.payload.players[i].tracks.push(new Track({ x: x, y: y, d: d }));
            }
            this.payload.leaderBoard[i].id = this.leaderBoard[i][0];
            this.payload.leaderBoard[i].ratio = Math.floor(this.leaderBoard[i][1] * 10000);
        }
    }

    getListenerViewProtobuf(playerID2Track: number, viewNRows: number, viewNCols: number): PayLoad {

        const info: ServerPlayerInfo = this.serverPlayerInfos[playerID2Track - 1];

        // @bug this implementation is wrong when one player has multiple viewports, but now it is okay
        if (Math.abs(info.focusPoint.x - info.headPos.x) > viewNRows / 4) {
            info.focusPoint.x = info.headPos.x;
        }
        if (Math.abs(info.focusPoint.y - info.headPos.y) > viewNCols / 4) {
            info.focusPoint.y = info.headPos.y;
        }
        this.payload.leftTop.x = info.focusPoint.x - Math.floor(viewNRows / 2);
        this.payload.leftTop.y = info.focusPoint.y - Math.floor(viewNCols / 2);

        const [x1, x2, y1, y2]: [number, number, number, number]
            = [this.payload.leftTop.x, this.payload.leftTop.x + viewNRows - 1,
            this.payload.leftTop.y, this.payload.leftTop.y + viewNCols - 1];

        this.payload.mapString = new Uint8Array(new ArrayBuffer(viewNRows * viewNCols));
        let cnt: number = 0;
        for (let r: number = x1; r <= x2; r++) {
            for (let c: number = y1; c <= y2; c++) {
                let color: number = 0;
                let track: number = 0;
                if (this.atBorder(r, c)) { // wall
                    color = 15;
                    track = 0;
                } else if (this.outOfRange(r, c)) {
                    color = track = 0;
                } else {
                    color = this.colorMap[r][c];
                    track = this.trackMap[r][c];
                }
                // tslint:disable-next-line:no-bitwise
                this.payload.mapString[cnt++] = (track << 4 | color);// low bit for color
            }
        }
        this.payload.soundFx = this.soundFxs[playerID2Track];

        return this.payload;
    }

    /**
     * Clear player's track map and/or color map.
     */
    clearPlayers(): void {
        for (let id of this.newPlayers) {
            this.addToClearList(id, true);
        }
        for (let p of this.playersToClear) {
            const player: ServerPlayerInfo = this.serverPlayerInfos[p[0] - 1];
            player.tracks = [];
            if (p[1] === true) { // @refactor
                player.state = 1;
                this.soundFxs[player.playerID] = Math.max(this.soundFxs[player.playerID], 3);
                if (!player.isAI) {// is human
                    p[1] = false;// do not clear color
                }
            }
        }
        if (this.playersToClear.length > 0) {
            for (let i: number = 0; i < this.nRows; i++) {
                for (let j: number = 0; j < this.nCols; j++) {
                    if (this.trackMap[i][j] !== 0 || this.colorMap[i][j] !== 0) {
                        for (let p of this.playersToClear) {
                            if (p[0] === this.trackMap[i][j]) {
                                this.trackMap[i][j] = 0;
                            }

                            if (p[1] && p[0] === this.colorMap[i][j]) {
                                this.colorMap[i][j] = 0;
                            }
                        }
                    }
                }
            }
        }
        while (this.newPlayers.length > 0) {
            let id: number = this.newPlayers.pop();
            if (this.serverPlayerInfos[id - 1].state === 1) {
                this.serverPlayerInfos[id - 1].state = 4;
            }
            this.serverPlayerInfos[id - 1].isAI = false;
        }
    }

    updateDeadPlayer(): void {
        for (let info of this.serverPlayerInfos) {
            if (info.state === 2 && info.isAI) {
                this.rebornList.push(info.playerID);
            } else if (info.state === 4) {
                info.state = 2;
                this.rebornList.push(info.playerID);
            }
        }
    }

    rebornHumanPlayer(playerId: number): void {
        this.rebornHumanList.push(playerId);
    }
}