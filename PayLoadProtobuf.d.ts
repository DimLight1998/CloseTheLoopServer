import * as $protobuf from "protobufjs";
/** Properties of a MyPointProto. */
export interface IMyPointProto {

    /** MyPointProto x */
    x: number;

    /** MyPointProto y */
    y: number;
}

/** Represents a MyPointProto. */
export class MyPointProto implements IMyPointProto {

    /**
     * Constructs a new MyPointProto.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMyPointProto);

    /** MyPointProto x. */
    public x: number;

    /** MyPointProto y. */
    public y: number;

    /**
     * Creates a new MyPointProto instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MyPointProto instance
     */
    public static create(properties?: IMyPointProto): MyPointProto;

    /**
     * Encodes the specified MyPointProto message. Does not implicitly {@link MyPointProto.verify|verify} messages.
     * @param message MyPointProto message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMyPointProto, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MyPointProto message, length delimited. Does not implicitly {@link MyPointProto.verify|verify} messages.
     * @param message MyPointProto message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMyPointProto, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MyPointProto message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MyPointProto
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MyPointProto;

    /**
     * Decodes a MyPointProto message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MyPointProto
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MyPointProto;

    /**
     * Verifies a MyPointProto message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MyPointProto message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MyPointProto
     */
    public static fromObject(object: { [k: string]: any }): MyPointProto;

    /**
     * Creates a plain object from a MyPointProto message. Also converts values to other types if specified.
     * @param message MyPointProto
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MyPointProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MyPointProto to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a PlayerInfoProto. */
export interface IPlayerInfoProto {

    /** PlayerInfoProto playerID */
    playerID: number;

    /** PlayerInfoProto headPos */
    headPos: IMyPointProto;

    /** PlayerInfoProto headDirection */
    headDirection: number;

    /** PlayerInfoProto nKill */
    nKill: number;

    /** PlayerInfoProto state */
    state: number;

    /** PlayerInfoProto tracks */
    tracks?: (ITrack[]|null);
}

/** Represents a PlayerInfoProto. */
export class PlayerInfoProto implements IPlayerInfoProto {

    /**
     * Constructs a new PlayerInfoProto.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPlayerInfoProto);

    /** PlayerInfoProto playerID. */
    public playerID: number;

    /** PlayerInfoProto headPos. */
    public headPos: IMyPointProto;

    /** PlayerInfoProto headDirection. */
    public headDirection: number;

    /** PlayerInfoProto nKill. */
    public nKill: number;

    /** PlayerInfoProto state. */
    public state: number;

    /** PlayerInfoProto tracks. */
    public tracks: ITrack[];

    /**
     * Creates a new PlayerInfoProto instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PlayerInfoProto instance
     */
    public static create(properties?: IPlayerInfoProto): PlayerInfoProto;

    /**
     * Encodes the specified PlayerInfoProto message. Does not implicitly {@link PlayerInfoProto.verify|verify} messages.
     * @param message PlayerInfoProto message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPlayerInfoProto, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PlayerInfoProto message, length delimited. Does not implicitly {@link PlayerInfoProto.verify|verify} messages.
     * @param message PlayerInfoProto message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPlayerInfoProto, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PlayerInfoProto message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PlayerInfoProto
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PlayerInfoProto;

    /**
     * Decodes a PlayerInfoProto message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PlayerInfoProto
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PlayerInfoProto;

    /**
     * Verifies a PlayerInfoProto message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PlayerInfoProto message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PlayerInfoProto
     */
    public static fromObject(object: { [k: string]: any }): PlayerInfoProto;

    /**
     * Creates a plain object from a PlayerInfoProto message. Also converts values to other types if specified.
     * @param message PlayerInfoProto
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PlayerInfoProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PlayerInfoProto to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Track. */
export interface ITrack {

    /** Track x */
    x: number;

    /** Track y */
    y: number;

    /** Track d */
    d: number;
}

/** Represents a Track. */
export class Track implements ITrack {

    /**
     * Constructs a new Track.
     * @param [properties] Properties to set
     */
    constructor(properties?: ITrack);

    /** Track x. */
    public x: number;

    /** Track y. */
    public y: number;

    /** Track d. */
    public d: number;

    /**
     * Creates a new Track instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Track instance
     */
    public static create(properties?: ITrack): Track;

    /**
     * Encodes the specified Track message. Does not implicitly {@link Track.verify|verify} messages.
     * @param message Track message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ITrack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Track message, length delimited. Does not implicitly {@link Track.verify|verify} messages.
     * @param message Track message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ITrack, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Track message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Track
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Track;

    /**
     * Decodes a Track message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Track
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Track;

    /**
     * Verifies a Track message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Track message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Track
     */
    public static fromObject(object: { [k: string]: any }): Track;

    /**
     * Creates a plain object from a Track message. Also converts values to other types if specified.
     * @param message Track
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Track, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Track to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a LeaderBoardItem. */
export interface ILeaderBoardItem {

    /** LeaderBoardItem id */
    id: number;

    /** LeaderBoardItem ratio */
    ratio: number;
}

/** Represents a LeaderBoardItem. */
export class LeaderBoardItem implements ILeaderBoardItem {

    /**
     * Constructs a new LeaderBoardItem.
     * @param [properties] Properties to set
     */
    constructor(properties?: ILeaderBoardItem);

    /** LeaderBoardItem id. */
    public id: number;

    /** LeaderBoardItem ratio. */
    public ratio: number;

    /**
     * Creates a new LeaderBoardItem instance using the specified properties.
     * @param [properties] Properties to set
     * @returns LeaderBoardItem instance
     */
    public static create(properties?: ILeaderBoardItem): LeaderBoardItem;

    /**
     * Encodes the specified LeaderBoardItem message. Does not implicitly {@link LeaderBoardItem.verify|verify} messages.
     * @param message LeaderBoardItem message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ILeaderBoardItem, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified LeaderBoardItem message, length delimited. Does not implicitly {@link LeaderBoardItem.verify|verify} messages.
     * @param message LeaderBoardItem message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ILeaderBoardItem, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a LeaderBoardItem message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns LeaderBoardItem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): LeaderBoardItem;

    /**
     * Decodes a LeaderBoardItem message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns LeaderBoardItem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): LeaderBoardItem;

    /**
     * Verifies a LeaderBoardItem message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a LeaderBoardItem message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns LeaderBoardItem
     */
    public static fromObject(object: { [k: string]: any }): LeaderBoardItem;

    /**
     * Creates a plain object from a LeaderBoardItem message. Also converts values to other types if specified.
     * @param message LeaderBoardItem
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: LeaderBoardItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this LeaderBoardItem to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a PayLoad. */
export interface IPayLoad {

    /** PayLoad mapString */
    mapString: Uint8Array;

    /** PayLoad players */
    players?: (IPlayerInfoProto[]|null);

    /** PayLoad leftTop */
    leftTop: IMyPointProto;

    /** PayLoad leaderBoard */
    leaderBoard?: (ILeaderBoardItem[]|null);

    /** PayLoad soundFx */
    soundFx: number;
}

/** Represents a PayLoad. */
export class PayLoad implements IPayLoad {

    /**
     * Constructs a new PayLoad.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPayLoad);

    /** PayLoad mapString. */
    public mapString: Uint8Array;

    /** PayLoad players. */
    public players: IPlayerInfoProto[];

    /** PayLoad leftTop. */
    public leftTop: IMyPointProto;

    /** PayLoad leaderBoard. */
    public leaderBoard: ILeaderBoardItem[];

    /** PayLoad soundFx. */
    public soundFx: number;

    /**
     * Creates a new PayLoad instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PayLoad instance
     */
    public static create(properties?: IPayLoad): PayLoad;

    /**
     * Encodes the specified PayLoad message. Does not implicitly {@link PayLoad.verify|verify} messages.
     * @param message PayLoad message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPayLoad, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PayLoad message, length delimited. Does not implicitly {@link PayLoad.verify|verify} messages.
     * @param message PayLoad message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPayLoad, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PayLoad message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PayLoad
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PayLoad;

    /**
     * Decodes a PayLoad message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PayLoad
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PayLoad;

    /**
     * Verifies a PayLoad message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PayLoad message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PayLoad
     */
    public static fromObject(object: { [k: string]: any }): PayLoad;

    /**
     * Creates a plain object from a PayLoad message. Also converts values to other types if specified.
     * @param message PayLoad
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PayLoad, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PayLoad to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
