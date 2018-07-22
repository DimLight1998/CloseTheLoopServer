/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.MyPointProto = (function() {

    /**
     * Properties of a MyPointProto.
     * @exports IMyPointProto
     * @interface IMyPointProto
     * @property {number} x MyPointProto x
     * @property {number} y MyPointProto y
     */

    /**
     * Constructs a new MyPointProto.
     * @exports MyPointProto
     * @classdesc Represents a MyPointProto.
     * @implements IMyPointProto
     * @constructor
     * @param {IMyPointProto=} [properties] Properties to set
     */
    function MyPointProto(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MyPointProto x.
     * @member {number} x
     * @memberof MyPointProto
     * @instance
     */
    MyPointProto.prototype.x = 0;

    /**
     * MyPointProto y.
     * @member {number} y
     * @memberof MyPointProto
     * @instance
     */
    MyPointProto.prototype.y = 0;

    /**
     * Creates a new MyPointProto instance using the specified properties.
     * @function create
     * @memberof MyPointProto
     * @static
     * @param {IMyPointProto=} [properties] Properties to set
     * @returns {MyPointProto} MyPointProto instance
     */
    MyPointProto.create = function create(properties) {
        return new MyPointProto(properties);
    };

    /**
     * Encodes the specified MyPointProto message. Does not implicitly {@link MyPointProto.verify|verify} messages.
     * @function encode
     * @memberof MyPointProto
     * @static
     * @param {IMyPointProto} message MyPointProto message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MyPointProto.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.x);
        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.y);
        return writer;
    };

    /**
     * Encodes the specified MyPointProto message, length delimited. Does not implicitly {@link MyPointProto.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MyPointProto
     * @static
     * @param {IMyPointProto} message MyPointProto message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MyPointProto.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MyPointProto message from the specified reader or buffer.
     * @function decode
     * @memberof MyPointProto
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MyPointProto} MyPointProto
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MyPointProto.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MyPointProto();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.x = reader.uint32();
                break;
            case 2:
                message.y = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("x"))
            throw $util.ProtocolError("missing required 'x'", { instance: message });
        if (!message.hasOwnProperty("y"))
            throw $util.ProtocolError("missing required 'y'", { instance: message });
        return message;
    };

    /**
     * Decodes a MyPointProto message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MyPointProto
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MyPointProto} MyPointProto
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MyPointProto.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MyPointProto message.
     * @function verify
     * @memberof MyPointProto
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MyPointProto.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.x))
            return "x: integer expected";
        if (!$util.isInteger(message.y))
            return "y: integer expected";
        return null;
    };

    /**
     * Creates a MyPointProto message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MyPointProto
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MyPointProto} MyPointProto
     */
    MyPointProto.fromObject = function fromObject(object) {
        if (object instanceof $root.MyPointProto)
            return object;
        var message = new $root.MyPointProto();
        if (object.x != null)
            message.x = object.x >>> 0;
        if (object.y != null)
            message.y = object.y >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a MyPointProto message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MyPointProto
     * @static
     * @param {MyPointProto} message MyPointProto
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MyPointProto.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.x = 0;
            object.y = 0;
        }
        if (message.x != null && message.hasOwnProperty("x"))
            object.x = message.x;
        if (message.y != null && message.hasOwnProperty("y"))
            object.y = message.y;
        return object;
    };

    /**
     * Converts this MyPointProto to JSON.
     * @function toJSON
     * @memberof MyPointProto
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MyPointProto.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MyPointProto;
})();

$root.PlayerInfoProto = (function() {

    /**
     * Properties of a PlayerInfoProto.
     * @exports IPlayerInfoProto
     * @interface IPlayerInfoProto
     * @property {number} playerID PlayerInfoProto playerID
     * @property {IMyPointProto} headPos PlayerInfoProto headPos
     * @property {number} headDirection PlayerInfoProto headDirection
     * @property {number} nKill PlayerInfoProto nKill
     * @property {number} state PlayerInfoProto state
     * @property {Array.<ITrack>|null} [tracks] PlayerInfoProto tracks
     */

    /**
     * Constructs a new PlayerInfoProto.
     * @exports PlayerInfoProto
     * @classdesc Represents a PlayerInfoProto.
     * @implements IPlayerInfoProto
     * @constructor
     * @param {IPlayerInfoProto=} [properties] Properties to set
     */
    function PlayerInfoProto(properties) {
        this.tracks = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PlayerInfoProto playerID.
     * @member {number} playerID
     * @memberof PlayerInfoProto
     * @instance
     */
    PlayerInfoProto.prototype.playerID = 0;

    /**
     * PlayerInfoProto headPos.
     * @member {IMyPointProto} headPos
     * @memberof PlayerInfoProto
     * @instance
     */
    PlayerInfoProto.prototype.headPos = null;

    /**
     * PlayerInfoProto headDirection.
     * @member {number} headDirection
     * @memberof PlayerInfoProto
     * @instance
     */
    PlayerInfoProto.prototype.headDirection = 0;

    /**
     * PlayerInfoProto nKill.
     * @member {number} nKill
     * @memberof PlayerInfoProto
     * @instance
     */
    PlayerInfoProto.prototype.nKill = 0;

    /**
     * PlayerInfoProto state.
     * @member {number} state
     * @memberof PlayerInfoProto
     * @instance
     */
    PlayerInfoProto.prototype.state = 0;

    /**
     * PlayerInfoProto tracks.
     * @member {Array.<ITrack>} tracks
     * @memberof PlayerInfoProto
     * @instance
     */
    PlayerInfoProto.prototype.tracks = $util.emptyArray;

    /**
     * Creates a new PlayerInfoProto instance using the specified properties.
     * @function create
     * @memberof PlayerInfoProto
     * @static
     * @param {IPlayerInfoProto=} [properties] Properties to set
     * @returns {PlayerInfoProto} PlayerInfoProto instance
     */
    PlayerInfoProto.create = function create(properties) {
        return new PlayerInfoProto(properties);
    };

    /**
     * Encodes the specified PlayerInfoProto message. Does not implicitly {@link PlayerInfoProto.verify|verify} messages.
     * @function encode
     * @memberof PlayerInfoProto
     * @static
     * @param {IPlayerInfoProto} message PlayerInfoProto message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayerInfoProto.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.playerID);
        $root.MyPointProto.encode(message.headPos, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.headDirection);
        writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.nKill);
        writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.state);
        if (message.tracks != null && message.tracks.length)
            for (var i = 0; i < message.tracks.length; ++i)
                $root.Track.encode(message.tracks[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified PlayerInfoProto message, length delimited. Does not implicitly {@link PlayerInfoProto.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PlayerInfoProto
     * @static
     * @param {IPlayerInfoProto} message PlayerInfoProto message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PlayerInfoProto.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PlayerInfoProto message from the specified reader or buffer.
     * @function decode
     * @memberof PlayerInfoProto
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PlayerInfoProto} PlayerInfoProto
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayerInfoProto.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PlayerInfoProto();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.playerID = reader.uint32();
                break;
            case 2:
                message.headPos = $root.MyPointProto.decode(reader, reader.uint32());
                break;
            case 3:
                message.headDirection = reader.uint32();
                break;
            case 4:
                message.nKill = reader.uint32();
                break;
            case 5:
                message.state = reader.uint32();
                break;
            case 6:
                if (!(message.tracks && message.tracks.length))
                    message.tracks = [];
                message.tracks.push($root.Track.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("playerID"))
            throw $util.ProtocolError("missing required 'playerID'", { instance: message });
        if (!message.hasOwnProperty("headPos"))
            throw $util.ProtocolError("missing required 'headPos'", { instance: message });
        if (!message.hasOwnProperty("headDirection"))
            throw $util.ProtocolError("missing required 'headDirection'", { instance: message });
        if (!message.hasOwnProperty("nKill"))
            throw $util.ProtocolError("missing required 'nKill'", { instance: message });
        if (!message.hasOwnProperty("state"))
            throw $util.ProtocolError("missing required 'state'", { instance: message });
        return message;
    };

    /**
     * Decodes a PlayerInfoProto message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PlayerInfoProto
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PlayerInfoProto} PlayerInfoProto
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PlayerInfoProto.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PlayerInfoProto message.
     * @function verify
     * @memberof PlayerInfoProto
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PlayerInfoProto.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.playerID))
            return "playerID: integer expected";
        {
            var error = $root.MyPointProto.verify(message.headPos);
            if (error)
                return "headPos." + error;
        }
        if (!$util.isInteger(message.headDirection))
            return "headDirection: integer expected";
        if (!$util.isInteger(message.nKill))
            return "nKill: integer expected";
        if (!$util.isInteger(message.state))
            return "state: integer expected";
        if (message.tracks != null && message.hasOwnProperty("tracks")) {
            if (!Array.isArray(message.tracks))
                return "tracks: array expected";
            for (var i = 0; i < message.tracks.length; ++i) {
                var error = $root.Track.verify(message.tracks[i]);
                if (error)
                    return "tracks." + error;
            }
        }
        return null;
    };

    /**
     * Creates a PlayerInfoProto message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PlayerInfoProto
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PlayerInfoProto} PlayerInfoProto
     */
    PlayerInfoProto.fromObject = function fromObject(object) {
        if (object instanceof $root.PlayerInfoProto)
            return object;
        var message = new $root.PlayerInfoProto();
        if (object.playerID != null)
            message.playerID = object.playerID >>> 0;
        if (object.headPos != null) {
            if (typeof object.headPos !== "object")
                throw TypeError(".PlayerInfoProto.headPos: object expected");
            message.headPos = $root.MyPointProto.fromObject(object.headPos);
        }
        if (object.headDirection != null)
            message.headDirection = object.headDirection >>> 0;
        if (object.nKill != null)
            message.nKill = object.nKill >>> 0;
        if (object.state != null)
            message.state = object.state >>> 0;
        if (object.tracks) {
            if (!Array.isArray(object.tracks))
                throw TypeError(".PlayerInfoProto.tracks: array expected");
            message.tracks = [];
            for (var i = 0; i < object.tracks.length; ++i) {
                if (typeof object.tracks[i] !== "object")
                    throw TypeError(".PlayerInfoProto.tracks: object expected");
                message.tracks[i] = $root.Track.fromObject(object.tracks[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a PlayerInfoProto message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PlayerInfoProto
     * @static
     * @param {PlayerInfoProto} message PlayerInfoProto
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PlayerInfoProto.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.tracks = [];
        if (options.defaults) {
            object.playerID = 0;
            object.headPos = null;
            object.headDirection = 0;
            object.nKill = 0;
            object.state = 0;
        }
        if (message.playerID != null && message.hasOwnProperty("playerID"))
            object.playerID = message.playerID;
        if (message.headPos != null && message.hasOwnProperty("headPos"))
            object.headPos = $root.MyPointProto.toObject(message.headPos, options);
        if (message.headDirection != null && message.hasOwnProperty("headDirection"))
            object.headDirection = message.headDirection;
        if (message.nKill != null && message.hasOwnProperty("nKill"))
            object.nKill = message.nKill;
        if (message.state != null && message.hasOwnProperty("state"))
            object.state = message.state;
        if (message.tracks && message.tracks.length) {
            object.tracks = [];
            for (var j = 0; j < message.tracks.length; ++j)
                object.tracks[j] = $root.Track.toObject(message.tracks[j], options);
        }
        return object;
    };

    /**
     * Converts this PlayerInfoProto to JSON.
     * @function toJSON
     * @memberof PlayerInfoProto
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PlayerInfoProto.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PlayerInfoProto;
})();

$root.Track = (function() {

    /**
     * Properties of a Track.
     * @exports ITrack
     * @interface ITrack
     * @property {number} x Track x
     * @property {number} y Track y
     * @property {number} d Track d
     */

    /**
     * Constructs a new Track.
     * @exports Track
     * @classdesc Represents a Track.
     * @implements ITrack
     * @constructor
     * @param {ITrack=} [properties] Properties to set
     */
    function Track(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Track x.
     * @member {number} x
     * @memberof Track
     * @instance
     */
    Track.prototype.x = 0;

    /**
     * Track y.
     * @member {number} y
     * @memberof Track
     * @instance
     */
    Track.prototype.y = 0;

    /**
     * Track d.
     * @member {number} d
     * @memberof Track
     * @instance
     */
    Track.prototype.d = 0;

    /**
     * Creates a new Track instance using the specified properties.
     * @function create
     * @memberof Track
     * @static
     * @param {ITrack=} [properties] Properties to set
     * @returns {Track} Track instance
     */
    Track.create = function create(properties) {
        return new Track(properties);
    };

    /**
     * Encodes the specified Track message. Does not implicitly {@link Track.verify|verify} messages.
     * @function encode
     * @memberof Track
     * @static
     * @param {ITrack} message Track message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Track.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.x);
        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.y);
        writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.d);
        return writer;
    };

    /**
     * Encodes the specified Track message, length delimited. Does not implicitly {@link Track.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Track
     * @static
     * @param {ITrack} message Track message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Track.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Track message from the specified reader or buffer.
     * @function decode
     * @memberof Track
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Track} Track
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Track.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Track();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.x = reader.uint32();
                break;
            case 2:
                message.y = reader.uint32();
                break;
            case 3:
                message.d = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("x"))
            throw $util.ProtocolError("missing required 'x'", { instance: message });
        if (!message.hasOwnProperty("y"))
            throw $util.ProtocolError("missing required 'y'", { instance: message });
        if (!message.hasOwnProperty("d"))
            throw $util.ProtocolError("missing required 'd'", { instance: message });
        return message;
    };

    /**
     * Decodes a Track message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Track
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Track} Track
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Track.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Track message.
     * @function verify
     * @memberof Track
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Track.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.x))
            return "x: integer expected";
        if (!$util.isInteger(message.y))
            return "y: integer expected";
        if (!$util.isInteger(message.d))
            return "d: integer expected";
        return null;
    };

    /**
     * Creates a Track message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Track
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Track} Track
     */
    Track.fromObject = function fromObject(object) {
        if (object instanceof $root.Track)
            return object;
        var message = new $root.Track();
        if (object.x != null)
            message.x = object.x >>> 0;
        if (object.y != null)
            message.y = object.y >>> 0;
        if (object.d != null)
            message.d = object.d >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a Track message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Track
     * @static
     * @param {Track} message Track
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Track.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.x = 0;
            object.y = 0;
            object.d = 0;
        }
        if (message.x != null && message.hasOwnProperty("x"))
            object.x = message.x;
        if (message.y != null && message.hasOwnProperty("y"))
            object.y = message.y;
        if (message.d != null && message.hasOwnProperty("d"))
            object.d = message.d;
        return object;
    };

    /**
     * Converts this Track to JSON.
     * @function toJSON
     * @memberof Track
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Track.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Track;
})();

$root.LeaderBoardItem = (function() {

    /**
     * Properties of a LeaderBoardItem.
     * @exports ILeaderBoardItem
     * @interface ILeaderBoardItem
     * @property {number} id LeaderBoardItem id
     * @property {number} ratio LeaderBoardItem ratio
     */

    /**
     * Constructs a new LeaderBoardItem.
     * @exports LeaderBoardItem
     * @classdesc Represents a LeaderBoardItem.
     * @implements ILeaderBoardItem
     * @constructor
     * @param {ILeaderBoardItem=} [properties] Properties to set
     */
    function LeaderBoardItem(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * LeaderBoardItem id.
     * @member {number} id
     * @memberof LeaderBoardItem
     * @instance
     */
    LeaderBoardItem.prototype.id = 0;

    /**
     * LeaderBoardItem ratio.
     * @member {number} ratio
     * @memberof LeaderBoardItem
     * @instance
     */
    LeaderBoardItem.prototype.ratio = 0;

    /**
     * Creates a new LeaderBoardItem instance using the specified properties.
     * @function create
     * @memberof LeaderBoardItem
     * @static
     * @param {ILeaderBoardItem=} [properties] Properties to set
     * @returns {LeaderBoardItem} LeaderBoardItem instance
     */
    LeaderBoardItem.create = function create(properties) {
        return new LeaderBoardItem(properties);
    };

    /**
     * Encodes the specified LeaderBoardItem message. Does not implicitly {@link LeaderBoardItem.verify|verify} messages.
     * @function encode
     * @memberof LeaderBoardItem
     * @static
     * @param {ILeaderBoardItem} message LeaderBoardItem message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LeaderBoardItem.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
        writer.uint32(/* id 2, wireType 5 =*/21).float(message.ratio);
        return writer;
    };

    /**
     * Encodes the specified LeaderBoardItem message, length delimited. Does not implicitly {@link LeaderBoardItem.verify|verify} messages.
     * @function encodeDelimited
     * @memberof LeaderBoardItem
     * @static
     * @param {ILeaderBoardItem} message LeaderBoardItem message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LeaderBoardItem.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a LeaderBoardItem message from the specified reader or buffer.
     * @function decode
     * @memberof LeaderBoardItem
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {LeaderBoardItem} LeaderBoardItem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LeaderBoardItem.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.LeaderBoardItem();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.uint32();
                break;
            case 2:
                message.ratio = reader.float();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("id"))
            throw $util.ProtocolError("missing required 'id'", { instance: message });
        if (!message.hasOwnProperty("ratio"))
            throw $util.ProtocolError("missing required 'ratio'", { instance: message });
        return message;
    };

    /**
     * Decodes a LeaderBoardItem message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof LeaderBoardItem
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {LeaderBoardItem} LeaderBoardItem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LeaderBoardItem.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a LeaderBoardItem message.
     * @function verify
     * @memberof LeaderBoardItem
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    LeaderBoardItem.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.id))
            return "id: integer expected";
        if (typeof message.ratio !== "number")
            return "ratio: number expected";
        return null;
    };

    /**
     * Creates a LeaderBoardItem message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof LeaderBoardItem
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {LeaderBoardItem} LeaderBoardItem
     */
    LeaderBoardItem.fromObject = function fromObject(object) {
        if (object instanceof $root.LeaderBoardItem)
            return object;
        var message = new $root.LeaderBoardItem();
        if (object.id != null)
            message.id = object.id >>> 0;
        if (object.ratio != null)
            message.ratio = Number(object.ratio);
        return message;
    };

    /**
     * Creates a plain object from a LeaderBoardItem message. Also converts values to other types if specified.
     * @function toObject
     * @memberof LeaderBoardItem
     * @static
     * @param {LeaderBoardItem} message LeaderBoardItem
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    LeaderBoardItem.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.id = 0;
            object.ratio = 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.ratio != null && message.hasOwnProperty("ratio"))
            object.ratio = options.json && !isFinite(message.ratio) ? String(message.ratio) : message.ratio;
        return object;
    };

    /**
     * Converts this LeaderBoardItem to JSON.
     * @function toJSON
     * @memberof LeaderBoardItem
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    LeaderBoardItem.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return LeaderBoardItem;
})();

$root.PayLoad = (function() {

    /**
     * Properties of a PayLoad.
     * @exports IPayLoad
     * @interface IPayLoad
     * @property {Uint8Array} mapString PayLoad mapString
     * @property {Array.<IPlayerInfoProto>|null} [players] PayLoad players
     * @property {IMyPointProto} leftTop PayLoad leftTop
     * @property {Array.<ILeaderBoardItem>|null} [leaderBoard] PayLoad leaderBoard
     * @property {number} soundFx PayLoad soundFx
     */

    /**
     * Constructs a new PayLoad.
     * @exports PayLoad
     * @classdesc Represents a PayLoad.
     * @implements IPayLoad
     * @constructor
     * @param {IPayLoad=} [properties] Properties to set
     */
    function PayLoad(properties) {
        this.players = [];
        this.leaderBoard = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PayLoad mapString.
     * @member {Uint8Array} mapString
     * @memberof PayLoad
     * @instance
     */
    PayLoad.prototype.mapString = $util.newBuffer([]);

    /**
     * PayLoad players.
     * @member {Array.<IPlayerInfoProto>} players
     * @memberof PayLoad
     * @instance
     */
    PayLoad.prototype.players = $util.emptyArray;

    /**
     * PayLoad leftTop.
     * @member {IMyPointProto} leftTop
     * @memberof PayLoad
     * @instance
     */
    PayLoad.prototype.leftTop = null;

    /**
     * PayLoad leaderBoard.
     * @member {Array.<ILeaderBoardItem>} leaderBoard
     * @memberof PayLoad
     * @instance
     */
    PayLoad.prototype.leaderBoard = $util.emptyArray;

    /**
     * PayLoad soundFx.
     * @member {number} soundFx
     * @memberof PayLoad
     * @instance
     */
    PayLoad.prototype.soundFx = 0;

    /**
     * Creates a new PayLoad instance using the specified properties.
     * @function create
     * @memberof PayLoad
     * @static
     * @param {IPayLoad=} [properties] Properties to set
     * @returns {PayLoad} PayLoad instance
     */
    PayLoad.create = function create(properties) {
        return new PayLoad(properties);
    };

    /**
     * Encodes the specified PayLoad message. Does not implicitly {@link PayLoad.verify|verify} messages.
     * @function encode
     * @memberof PayLoad
     * @static
     * @param {IPayLoad} message PayLoad message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PayLoad.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.mapString);
        if (message.players != null && message.players.length)
            for (var i = 0; i < message.players.length; ++i)
                $root.PlayerInfoProto.encode(message.players[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        $root.MyPointProto.encode(message.leftTop, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.leaderBoard != null && message.leaderBoard.length)
            for (var i = 0; i < message.leaderBoard.length; ++i)
                $root.LeaderBoardItem.encode(message.leaderBoard[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.soundFx);
        return writer;
    };

    /**
     * Encodes the specified PayLoad message, length delimited. Does not implicitly {@link PayLoad.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PayLoad
     * @static
     * @param {IPayLoad} message PayLoad message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PayLoad.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PayLoad message from the specified reader or buffer.
     * @function decode
     * @memberof PayLoad
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PayLoad} PayLoad
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PayLoad.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PayLoad();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.mapString = reader.bytes();
                break;
            case 2:
                if (!(message.players && message.players.length))
                    message.players = [];
                message.players.push($root.PlayerInfoProto.decode(reader, reader.uint32()));
                break;
            case 3:
                message.leftTop = $root.MyPointProto.decode(reader, reader.uint32());
                break;
            case 4:
                if (!(message.leaderBoard && message.leaderBoard.length))
                    message.leaderBoard = [];
                message.leaderBoard.push($root.LeaderBoardItem.decode(reader, reader.uint32()));
                break;
            case 5:
                message.soundFx = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("mapString"))
            throw $util.ProtocolError("missing required 'mapString'", { instance: message });
        if (!message.hasOwnProperty("leftTop"))
            throw $util.ProtocolError("missing required 'leftTop'", { instance: message });
        if (!message.hasOwnProperty("soundFx"))
            throw $util.ProtocolError("missing required 'soundFx'", { instance: message });
        return message;
    };

    /**
     * Decodes a PayLoad message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PayLoad
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PayLoad} PayLoad
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PayLoad.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PayLoad message.
     * @function verify
     * @memberof PayLoad
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PayLoad.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!(message.mapString && typeof message.mapString.length === "number" || $util.isString(message.mapString)))
            return "mapString: buffer expected";
        if (message.players != null && message.hasOwnProperty("players")) {
            if (!Array.isArray(message.players))
                return "players: array expected";
            for (var i = 0; i < message.players.length; ++i) {
                var error = $root.PlayerInfoProto.verify(message.players[i]);
                if (error)
                    return "players." + error;
            }
        }
        {
            var error = $root.MyPointProto.verify(message.leftTop);
            if (error)
                return "leftTop." + error;
        }
        if (message.leaderBoard != null && message.hasOwnProperty("leaderBoard")) {
            if (!Array.isArray(message.leaderBoard))
                return "leaderBoard: array expected";
            for (var i = 0; i < message.leaderBoard.length; ++i) {
                var error = $root.LeaderBoardItem.verify(message.leaderBoard[i]);
                if (error)
                    return "leaderBoard." + error;
            }
        }
        if (!$util.isInteger(message.soundFx))
            return "soundFx: integer expected";
        return null;
    };

    /**
     * Creates a PayLoad message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PayLoad
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PayLoad} PayLoad
     */
    PayLoad.fromObject = function fromObject(object) {
        if (object instanceof $root.PayLoad)
            return object;
        var message = new $root.PayLoad();
        if (object.mapString != null)
            if (typeof object.mapString === "string")
                $util.base64.decode(object.mapString, message.mapString = $util.newBuffer($util.base64.length(object.mapString)), 0);
            else if (object.mapString.length)
                message.mapString = object.mapString;
        if (object.players) {
            if (!Array.isArray(object.players))
                throw TypeError(".PayLoad.players: array expected");
            message.players = [];
            for (var i = 0; i < object.players.length; ++i) {
                if (typeof object.players[i] !== "object")
                    throw TypeError(".PayLoad.players: object expected");
                message.players[i] = $root.PlayerInfoProto.fromObject(object.players[i]);
            }
        }
        if (object.leftTop != null) {
            if (typeof object.leftTop !== "object")
                throw TypeError(".PayLoad.leftTop: object expected");
            message.leftTop = $root.MyPointProto.fromObject(object.leftTop);
        }
        if (object.leaderBoard) {
            if (!Array.isArray(object.leaderBoard))
                throw TypeError(".PayLoad.leaderBoard: array expected");
            message.leaderBoard = [];
            for (var i = 0; i < object.leaderBoard.length; ++i) {
                if (typeof object.leaderBoard[i] !== "object")
                    throw TypeError(".PayLoad.leaderBoard: object expected");
                message.leaderBoard[i] = $root.LeaderBoardItem.fromObject(object.leaderBoard[i]);
            }
        }
        if (object.soundFx != null)
            message.soundFx = object.soundFx >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a PayLoad message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PayLoad
     * @static
     * @param {PayLoad} message PayLoad
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PayLoad.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.players = [];
            object.leaderBoard = [];
        }
        if (options.defaults) {
            if (options.bytes === String)
                object.mapString = "";
            else {
                object.mapString = [];
                if (options.bytes !== Array)
                    object.mapString = $util.newBuffer(object.mapString);
            }
            object.leftTop = null;
            object.soundFx = 0;
        }
        if (message.mapString != null && message.hasOwnProperty("mapString"))
            object.mapString = options.bytes === String ? $util.base64.encode(message.mapString, 0, message.mapString.length) : options.bytes === Array ? Array.prototype.slice.call(message.mapString) : message.mapString;
        if (message.players && message.players.length) {
            object.players = [];
            for (var j = 0; j < message.players.length; ++j)
                object.players[j] = $root.PlayerInfoProto.toObject(message.players[j], options);
        }
        if (message.leftTop != null && message.hasOwnProperty("leftTop"))
            object.leftTop = $root.MyPointProto.toObject(message.leftTop, options);
        if (message.leaderBoard && message.leaderBoard.length) {
            object.leaderBoard = [];
            for (var j = 0; j < message.leaderBoard.length; ++j)
                object.leaderBoard[j] = $root.LeaderBoardItem.toObject(message.leaderBoard[j], options);
        }
        if (message.soundFx != null && message.hasOwnProperty("soundFx"))
            object.soundFx = message.soundFx;
        return object;
    };

    /**
     * Converts this PayLoad to JSON.
     * @function toJSON
     * @memberof PayLoad
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PayLoad.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PayLoad;
})();

module.exports = $root;
