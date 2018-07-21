// todo keep this file sync with local until ddl.

import { PayLoadJson } from './PlayerInfo';

// 一个视图需要一个adapter
export interface IClientAdapter {
    /**
     * Use this method to pass the operation to the server.
     */
    changeDirection(playerID: number, direction: number): void;

    // 传入Date.now()，得到地图信息和 收到服务器消息时间-读取时间 ，方便调整下一回合的时间
    /**
     * Send a request for getting new map. The timestamp is used for self-adjusting.
     */
    requestNewWorld(currentTime: number): void;

    /**
     * Send a registration information for a player to the server. Returns the id for the player.
     * Will eventually success.
     */
    registerPlayer(onSuccess: (playerId: number, roomId: number) => void): void;// 多人模式下，在这里也能建立websocket连接

    /**
     * Send a registration information for a view port to the server.
     * @param callback This function will be called for the purpose of refreshing world.
     */
    registerViewPort(playerID2Track: number, roomID: number,
        nRows: number, nCols: number,
        callback: (info: PayLoadJson, deltaTime: number) => void): void;
}

// 一个房间需要一个server adapter
export interface IServerAdapter {
    handleChangeDirection(playerID: number, direction: number): void;

    handleRegisterToThisRoom(): number;

    dispatchNewWorld(): Promise<void>;// 向所有注册的客户端发送各自的数据
}

export interface IRoomMangerAdapter {
    handleRegisterPlayer(): [number, number];// playerID, roomID

    handlePlayerDisconnect(playerID: number, roomID: number): void;
}