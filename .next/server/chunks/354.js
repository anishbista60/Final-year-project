exports.id = 354;
exports.ids = [354];
exports.modules = {

/***/ 13753:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */ 
/**
 * Module exports.
 * @public
 */ exports.parse = parse;
exports.serialize = serialize;
/**
 * Module variables.
 * @private
 */ var __toString = Object.prototype.toString;
/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */ var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */ function parse(str, options) {
    if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
    }
    var obj = {};
    var opt = options || {};
    var dec = opt.decode || decode;
    var index = 0;
    while(index < str.length){
        var eqIdx = str.indexOf("=", index);
        // no more cookie pairs
        if (eqIdx === -1) {
            break;
        }
        var endIdx = str.indexOf(";", index);
        if (endIdx === -1) {
            endIdx = str.length;
        } else if (endIdx < eqIdx) {
            // backtrack on prior semicolon
            index = str.lastIndexOf(";", eqIdx - 1) + 1;
            continue;
        }
        var key = str.slice(index, eqIdx).trim();
        // only assign once
        if (undefined === obj[key]) {
            var val = str.slice(eqIdx + 1, endIdx).trim();
            // quoted values
            if (val.charCodeAt(0) === 0x22) {
                val = val.slice(1, -1);
            }
            obj[key] = tryDecode(val, dec);
        }
        index = endIdx + 1;
    }
    return obj;
}
/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */ function serialize(name, val, options) {
    var opt = options || {};
    var enc = opt.encode || encode;
    if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
    }
    if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
    }
    var value = enc(val);
    if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
    }
    var str = name + "=" + value;
    if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
            throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
    }
    if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
            throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
    }
    if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
            throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
    }
    if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
            throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
    }
    if (opt.httpOnly) {
        str += "; HttpOnly";
    }
    if (opt.secure) {
        str += "; Secure";
    }
    if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch(priority){
            case "low":
                str += "; Priority=Low";
                break;
            case "medium":
                str += "; Priority=Medium";
                break;
            case "high":
                str += "; Priority=High";
                break;
            default:
                throw new TypeError("option priority is invalid");
        }
    }
    if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch(sameSite){
            case true:
                str += "; SameSite=Strict";
                break;
            case "lax":
                str += "; SameSite=Lax";
                break;
            case "strict":
                str += "; SameSite=Strict";
                break;
            case "none":
                str += "; SameSite=None";
                break;
            default:
                throw new TypeError("option sameSite is invalid");
        }
    }
    return str;
}
/**
 * URL-decode string value. Optimized to skip native call when no %.
 *
 * @param {string} str
 * @returns {string}
 */ function decode(str) {
    return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
}
/**
 * URL-encode value.
 *
 * @param {string} str
 * @returns {string}
 */ function encode(val) {
    return encodeURIComponent(val);
}
/**
 * Determine if value is a Date.
 *
 * @param {*} val
 * @private
 */ function isDate(val) {
    return __toString.call(val) === "[object Date]" || val instanceof Date;
}
/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */ function tryDecode(str, decode) {
    try {
        return decode(str);
    } catch (e) {
        return str;
    }
}


/***/ }),

/***/ 8338:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// A linked list to keep track of recently-used-ness
const Yallist = __webpack_require__(74899);
const MAX = Symbol("max");
const LENGTH = Symbol("length");
const LENGTH_CALCULATOR = Symbol("lengthCalculator");
const ALLOW_STALE = Symbol("allowStale");
const MAX_AGE = Symbol("maxAge");
const DISPOSE = Symbol("dispose");
const NO_DISPOSE_ON_SET = Symbol("noDisposeOnSet");
const LRU_LIST = Symbol("lruList");
const CACHE = Symbol("cache");
const UPDATE_AGE_ON_GET = Symbol("updateAgeOnGet");
const naiveLength = ()=>1;
// lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.
class LRUCache {
    constructor(options){
        if (typeof options === "number") options = {
            max: options
        };
        if (!options) options = {};
        if (options.max && (typeof options.max !== "number" || options.max < 0)) throw new TypeError("max must be a non-negative number");
        // Kind of weird to have a default max of Infinity, but oh well.
        const max = this[MAX] = options.max || Infinity;
        const lc = options.length || naiveLength;
        this[LENGTH_CALCULATOR] = typeof lc !== "function" ? naiveLength : lc;
        this[ALLOW_STALE] = options.stale || false;
        if (options.maxAge && typeof options.maxAge !== "number") throw new TypeError("maxAge must be a number");
        this[MAX_AGE] = options.maxAge || 0;
        this[DISPOSE] = options.dispose;
        this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
        this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
        this.reset();
    }
    // resize the cache when the max changes.
    set max(mL) {
        if (typeof mL !== "number" || mL < 0) throw new TypeError("max must be a non-negative number");
        this[MAX] = mL || Infinity;
        trim(this);
    }
    get max() {
        return this[MAX];
    }
    set allowStale(allowStale) {
        this[ALLOW_STALE] = !!allowStale;
    }
    get allowStale() {
        return this[ALLOW_STALE];
    }
    set maxAge(mA) {
        if (typeof mA !== "number") throw new TypeError("maxAge must be a non-negative number");
        this[MAX_AGE] = mA;
        trim(this);
    }
    get maxAge() {
        return this[MAX_AGE];
    }
    // resize the cache when the lengthCalculator changes.
    set lengthCalculator(lC) {
        if (typeof lC !== "function") lC = naiveLength;
        if (lC !== this[LENGTH_CALCULATOR]) {
            this[LENGTH_CALCULATOR] = lC;
            this[LENGTH] = 0;
            this[LRU_LIST].forEach((hit)=>{
                hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
                this[LENGTH] += hit.length;
            });
        }
        trim(this);
    }
    get lengthCalculator() {
        return this[LENGTH_CALCULATOR];
    }
    get length() {
        return this[LENGTH];
    }
    get itemCount() {
        return this[LRU_LIST].length;
    }
    rforEach(fn, thisp) {
        thisp = thisp || this;
        for(let walker = this[LRU_LIST].tail; walker !== null;){
            const prev = walker.prev;
            forEachStep(this, fn, walker, thisp);
            walker = prev;
        }
    }
    forEach(fn, thisp) {
        thisp = thisp || this;
        for(let walker = this[LRU_LIST].head; walker !== null;){
            const next = walker.next;
            forEachStep(this, fn, walker, thisp);
            walker = next;
        }
    }
    keys() {
        return this[LRU_LIST].toArray().map((k)=>k.key);
    }
    values() {
        return this[LRU_LIST].toArray().map((k)=>k.value);
    }
    reset() {
        if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
            this[LRU_LIST].forEach((hit)=>this[DISPOSE](hit.key, hit.value));
        }
        this[CACHE] = new Map() // hash of items by key
        ;
        this[LRU_LIST] = new Yallist() // list of items in order of use recency
        ;
        this[LENGTH] = 0 // length of items in the list
        ;
    }
    dump() {
        return this[LRU_LIST].map((hit)=>isStale(this, hit) ? false : {
                k: hit.key,
                v: hit.value,
                e: hit.now + (hit.maxAge || 0)
            }).toArray().filter((h)=>h);
    }
    dumpLru() {
        return this[LRU_LIST];
    }
    set(key, value, maxAge) {
        maxAge = maxAge || this[MAX_AGE];
        if (maxAge && typeof maxAge !== "number") throw new TypeError("maxAge must be a number");
        const now = maxAge ? Date.now() : 0;
        const len = this[LENGTH_CALCULATOR](value, key);
        if (this[CACHE].has(key)) {
            if (len > this[MAX]) {
                del(this, this[CACHE].get(key));
                return false;
            }
            const node = this[CACHE].get(key);
            const item = node.value;
            // dispose of the old one before overwriting
            // split out into 2 ifs for better coverage tracking
            if (this[DISPOSE]) {
                if (!this[NO_DISPOSE_ON_SET]) this[DISPOSE](key, item.value);
            }
            item.now = now;
            item.maxAge = maxAge;
            item.value = value;
            this[LENGTH] += len - item.length;
            item.length = len;
            this.get(key);
            trim(this);
            return true;
        }
        const hit = new Entry(key, value, len, now, maxAge);
        // oversized objects fall out of cache automatically.
        if (hit.length > this[MAX]) {
            if (this[DISPOSE]) this[DISPOSE](key, value);
            return false;
        }
        this[LENGTH] += hit.length;
        this[LRU_LIST].unshift(hit);
        this[CACHE].set(key, this[LRU_LIST].head);
        trim(this);
        return true;
    }
    has(key) {
        if (!this[CACHE].has(key)) return false;
        const hit = this[CACHE].get(key).value;
        return !isStale(this, hit);
    }
    get(key) {
        return get(this, key, true);
    }
    peek(key) {
        return get(this, key, false);
    }
    pop() {
        const node = this[LRU_LIST].tail;
        if (!node) return null;
        del(this, node);
        return node.value;
    }
    del(key) {
        del(this, this[CACHE].get(key));
    }
    load(arr) {
        // reset the cache
        this.reset();
        const now = Date.now();
        // A previous serialized cache has the most recent items first
        for(let l = arr.length - 1; l >= 0; l--){
            const hit = arr[l];
            const expiresAt = hit.e || 0;
            if (expiresAt === 0) // the item was created without expiration in a non aged cache
            this.set(hit.k, hit.v);
            else {
                const maxAge = expiresAt - now;
                // dont add already expired items
                if (maxAge > 0) {
                    this.set(hit.k, hit.v, maxAge);
                }
            }
        }
    }
    prune() {
        this[CACHE].forEach((value, key)=>get(this, key, false));
    }
}
const get = (self, key, doUse)=>{
    const node = self[CACHE].get(key);
    if (node) {
        const hit = node.value;
        if (isStale(self, hit)) {
            del(self, node);
            if (!self[ALLOW_STALE]) return undefined;
        } else {
            if (doUse) {
                if (self[UPDATE_AGE_ON_GET]) node.value.now = Date.now();
                self[LRU_LIST].unshiftNode(node);
            }
        }
        return hit.value;
    }
};
const isStale = (self, hit)=>{
    if (!hit || !hit.maxAge && !self[MAX_AGE]) return false;
    const diff = Date.now() - hit.now;
    return hit.maxAge ? diff > hit.maxAge : self[MAX_AGE] && diff > self[MAX_AGE];
};
const trim = (self)=>{
    if (self[LENGTH] > self[MAX]) {
        for(let walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && walker !== null;){
            // We know that we're about to delete this one, and also
            // what the next least recently used key will be, so just
            // go ahead and set it now.
            const prev = walker.prev;
            del(self, walker);
            walker = prev;
        }
    }
};
const del = (self, node)=>{
    if (node) {
        const hit = node.value;
        if (self[DISPOSE]) self[DISPOSE](hit.key, hit.value);
        self[LENGTH] -= hit.length;
        self[CACHE].delete(hit.key);
        self[LRU_LIST].removeNode(node);
    }
};
class Entry {
    constructor(key, value, length, now, maxAge){
        this.key = key;
        this.value = value;
        this.length = length;
        this.now = now;
        this.maxAge = maxAge || 0;
    }
}
const forEachStep = (self, fn, node, thisp)=>{
    let hit = node.value;
    if (isStale(self, hit)) {
        del(self, node);
        if (!self[ALLOW_STALE]) hit = undefined;
    }
    if (hit) fn.call(thisp, hit.value, hit.key, self);
};
module.exports = LRUCache;


/***/ }),

/***/ 54941:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _interopRequireDefault = __webpack_require__(6548);
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.UnsupportedStrategy = exports.UnknownError = exports.OAuthCallbackError = exports.MissingSecret = exports.MissingAuthorize = exports.MissingAdapterMethods = exports.MissingAdapter = exports.MissingAPIRoute = exports.InvalidCallbackUrl = exports.AccountNotLinkedError = void 0;
exports.adapterErrorHandler = adapterErrorHandler;
exports.capitalize = capitalize;
exports.eventsErrorHandler = eventsErrorHandler;
exports.upperSnake = upperSnake;
var _regenerator = _interopRequireDefault(__webpack_require__(53371));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(62310));
var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(16184));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(41659));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(54497));
var _createClass2 = _interopRequireDefault(__webpack_require__(50589));
var _inherits2 = _interopRequireDefault(__webpack_require__(20883));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(73381));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(68168));
var _wrapNativeSuper2 = _interopRequireDefault(__webpack_require__(6227));
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = (0, _getPrototypeOf2.default)(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = (0, _getPrototypeOf2.default)(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return (0, _possibleConstructorReturn2.default)(this, result);
    };
}
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
var UnknownError = function(_Error) {
    (0, _inherits2.default)(UnknownError, _Error);
    var _super = _createSuper(UnknownError);
    function UnknownError(error) {
        var _message;
        var _this;
        (0, _classCallCheck2.default)(this, UnknownError);
        _this = _super.call(this, (_message = error === null || error === void 0 ? void 0 : error.message) !== null && _message !== void 0 ? _message : error);
        _this.name = "UnknownError";
        _this.code = error.code;
        if (error instanceof Error) {
            _this.stack = error.stack;
        }
        return _this;
    }
    (0, _createClass2.default)(UnknownError, [
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    name: this.name,
                    message: this.message,
                    stack: this.stack
                };
            }
        }
    ]);
    return UnknownError;
}((0, _wrapNativeSuper2.default)(Error));
exports.UnknownError = UnknownError;
var OAuthCallbackError = function(_UnknownError) {
    (0, _inherits2.default)(OAuthCallbackError, _UnknownError);
    var _super2 = _createSuper(OAuthCallbackError);
    function OAuthCallbackError() {
        var _this2;
        (0, _classCallCheck2.default)(this, OAuthCallbackError);
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        _this2 = _super2.call.apply(_super2, [
            this
        ].concat(args));
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this2), "name", "OAuthCallbackError");
        return _this2;
    }
    return (0, _createClass2.default)(OAuthCallbackError);
}(UnknownError);
exports.OAuthCallbackError = OAuthCallbackError;
var AccountNotLinkedError = function(_UnknownError2) {
    (0, _inherits2.default)(AccountNotLinkedError, _UnknownError2);
    var _super3 = _createSuper(AccountNotLinkedError);
    function AccountNotLinkedError() {
        var _this3;
        (0, _classCallCheck2.default)(this, AccountNotLinkedError);
        for(var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++){
            args[_key2] = arguments[_key2];
        }
        _this3 = _super3.call.apply(_super3, [
            this
        ].concat(args));
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this3), "name", "AccountNotLinkedError");
        return _this3;
    }
    return (0, _createClass2.default)(AccountNotLinkedError);
}(UnknownError);
exports.AccountNotLinkedError = AccountNotLinkedError;
var MissingAPIRoute = function(_UnknownError3) {
    (0, _inherits2.default)(MissingAPIRoute, _UnknownError3);
    var _super4 = _createSuper(MissingAPIRoute);
    function MissingAPIRoute() {
        var _this4;
        (0, _classCallCheck2.default)(this, MissingAPIRoute);
        for(var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++){
            args[_key3] = arguments[_key3];
        }
        _this4 = _super4.call.apply(_super4, [
            this
        ].concat(args));
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this4), "name", "MissingAPIRouteError");
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this4), "code", "MISSING_NEXTAUTH_API_ROUTE_ERROR");
        return _this4;
    }
    return (0, _createClass2.default)(MissingAPIRoute);
}(UnknownError);
exports.MissingAPIRoute = MissingAPIRoute;
var MissingSecret = function(_UnknownError4) {
    (0, _inherits2.default)(MissingSecret, _UnknownError4);
    var _super5 = _createSuper(MissingSecret);
    function MissingSecret() {
        var _this5;
        (0, _classCallCheck2.default)(this, MissingSecret);
        for(var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++){
            args[_key4] = arguments[_key4];
        }
        _this5 = _super5.call.apply(_super5, [
            this
        ].concat(args));
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this5), "name", "MissingSecretError");
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this5), "code", "NO_SECRET");
        return _this5;
    }
    return (0, _createClass2.default)(MissingSecret);
}(UnknownError);
exports.MissingSecret = MissingSecret;
var MissingAuthorize = function(_UnknownError5) {
    (0, _inherits2.default)(MissingAuthorize, _UnknownError5);
    var _super6 = _createSuper(MissingAuthorize);
    function MissingAuthorize() {
        var _this6;
        (0, _classCallCheck2.default)(this, MissingAuthorize);
        for(var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++){
            args[_key5] = arguments[_key5];
        }
        _this6 = _super6.call.apply(_super6, [
            this
        ].concat(args));
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this6), "name", "MissingAuthorizeError");
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this6), "code", "CALLBACK_CREDENTIALS_HANDLER_ERROR");
        return _this6;
    }
    return (0, _createClass2.default)(MissingAuthorize);
}(UnknownError);
exports.MissingAuthorize = MissingAuthorize;
var MissingAdapter = function(_UnknownError6) {
    (0, _inherits2.default)(MissingAdapter, _UnknownError6);
    var _super7 = _createSuper(MissingAdapter);
    function MissingAdapter() {
        var _this7;
        (0, _classCallCheck2.default)(this, MissingAdapter);
        for(var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++){
            args[_key6] = arguments[_key6];
        }
        _this7 = _super7.call.apply(_super7, [
            this
        ].concat(args));
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this7), "name", "MissingAdapterError");
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this7), "code", "EMAIL_REQUIRES_ADAPTER_ERROR");
        return _this7;
    }
    return (0, _createClass2.default)(MissingAdapter);
}(UnknownError);
exports.MissingAdapter = MissingAdapter;
var MissingAdapterMethods = function(_UnknownError7) {
    (0, _inherits2.default)(MissingAdapterMethods, _UnknownError7);
    var _super8 = _createSuper(MissingAdapterMethods);
    function MissingAdapterMethods() {
        var _this8;
        (0, _classCallCheck2.default)(this, MissingAdapterMethods);
        for(var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++){
            args[_key7] = arguments[_key7];
        }
        _this8 = _super8.call.apply(_super8, [
            this
        ].concat(args));
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this8), "name", "MissingAdapterMethodsError");
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this8), "code", "MISSING_ADAPTER_METHODS_ERROR");
        return _this8;
    }
    return (0, _createClass2.default)(MissingAdapterMethods);
}(UnknownError);
exports.MissingAdapterMethods = MissingAdapterMethods;
var UnsupportedStrategy = function(_UnknownError8) {
    (0, _inherits2.default)(UnsupportedStrategy, _UnknownError8);
    var _super9 = _createSuper(UnsupportedStrategy);
    function UnsupportedStrategy() {
        var _this9;
        (0, _classCallCheck2.default)(this, UnsupportedStrategy);
        for(var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++){
            args[_key8] = arguments[_key8];
        }
        _this9 = _super9.call.apply(_super9, [
            this
        ].concat(args));
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this9), "name", "UnsupportedStrategyError");
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this9), "code", "CALLBACK_CREDENTIALS_JWT_ERROR");
        return _this9;
    }
    return (0, _createClass2.default)(UnsupportedStrategy);
}(UnknownError);
exports.UnsupportedStrategy = UnsupportedStrategy;
var InvalidCallbackUrl = function(_UnknownError9) {
    (0, _inherits2.default)(InvalidCallbackUrl, _UnknownError9);
    var _super10 = _createSuper(InvalidCallbackUrl);
    function InvalidCallbackUrl() {
        var _this10;
        (0, _classCallCheck2.default)(this, InvalidCallbackUrl);
        for(var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++){
            args[_key9] = arguments[_key9];
        }
        _this10 = _super10.call.apply(_super10, [
            this
        ].concat(args));
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this10), "name", "InvalidCallbackUrl");
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this10), "code", "INVALID_CALLBACK_URL_ERROR");
        return _this10;
    }
    return (0, _createClass2.default)(InvalidCallbackUrl);
}(UnknownError);
exports.InvalidCallbackUrl = InvalidCallbackUrl;
function upperSnake(s) {
    return s.replace(/([A-Z])/g, "_$1").toUpperCase();
}
function capitalize(s) {
    return "".concat(s[0].toUpperCase()).concat(s.slice(1));
}
function eventsErrorHandler(methods, logger) {
    return Object.keys(methods).reduce(function(acc, name) {
        acc[name] = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
            var method, _args = arguments;
            return _regenerator.default.wrap(function _callee$(_context) {
                while(1){
                    switch(_context.prev = _context.next){
                        case 0:
                            _context.prev = 0;
                            method = methods[name];
                            _context.next = 4;
                            return method.apply(void 0, _args);
                        case 4:
                            return _context.abrupt("return", _context.sent);
                        case 7:
                            _context.prev = 7;
                            _context.t0 = _context["catch"](0);
                            logger.error("".concat(upperSnake(name), "_EVENT_ERROR"), _context.t0);
                        case 10:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, null, [
                [
                    0,
                    7
                ]
            ]);
        }));
        return acc;
    }, {});
}
function adapterErrorHandler(adapter, logger) {
    if (!adapter) return;
    return Object.keys(adapter).reduce(function(acc, name) {
        acc[name] = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2() {
            var _len10, args, _key10, method, e, _args2 = arguments;
            return _regenerator.default.wrap(function _callee2$(_context2) {
                while(1){
                    switch(_context2.prev = _context2.next){
                        case 0:
                            _context2.prev = 0;
                            for(_len10 = _args2.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++){
                                args[_key10] = _args2[_key10];
                            }
                            logger.debug("adapter_".concat(name), {
                                args: args
                            });
                            method = adapter[name];
                            _context2.next = 6;
                            return method.apply(void 0, args);
                        case 6:
                            return _context2.abrupt("return", _context2.sent);
                        case 9:
                            _context2.prev = 9;
                            _context2.t0 = _context2["catch"](0);
                            logger.error("adapter_error_".concat(name), _context2.t0);
                            e = new UnknownError(_context2.t0);
                            e.name = "".concat(capitalize(name), "Error");
                            throw e;
                        case 15:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, null, [
                [
                    0,
                    9
                ]
            ]);
        }));
        return acc;
    }, {});
}


/***/ }),

/***/ 26565:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _interopRequireDefault = __webpack_require__(6548);
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.AuthHandler = AuthHandler;
var _logger = _interopRequireWildcard(__webpack_require__(45663));
var _detectOrigin = __webpack_require__(28337);
var routes = _interopRequireWildcard(__webpack_require__(21632));
var _pages = _interopRequireDefault(__webpack_require__(53779));
var _init = __webpack_require__(79379);
var _assert = __webpack_require__(84886);
var _cookie = __webpack_require__(8936);
var _cookie2 = __webpack_require__(13753);
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
async function getBody(req) {
    try {
        return await req.json();
    } catch (_unused) {}
}
async function toInternalRequest(req) {
    var _headers$xForwarded2;
    if (req instanceof Request) {
        var _req$headers$get, _url$searchParams$get, _headers$xForwarded;
        const url = new URL(req.url);
        const nextauth = url.pathname.split("/").slice(3);
        const headers = Object.fromEntries(req.headers);
        const query = Object.fromEntries(url.searchParams);
        query.nextauth = nextauth;
        return {
            action: nextauth[0],
            method: req.method,
            headers,
            body: await getBody(req),
            cookies: (0, _cookie2.parse)((_req$headers$get = req.headers.get("cookie")) !== null && _req$headers$get !== void 0 ? _req$headers$get : ""),
            providerId: nextauth[1],
            error: (_url$searchParams$get = url.searchParams.get("error")) !== null && _url$searchParams$get !== void 0 ? _url$searchParams$get : nextauth[1],
            origin: (0, _detectOrigin.detectOrigin)((_headers$xForwarded = headers["x-forwarded-host"]) !== null && _headers$xForwarded !== void 0 ? _headers$xForwarded : headers.host, headers["x-forwarded-proto"]),
            query
        };
    }
    const { headers  } = req;
    const host = (_headers$xForwarded2 = headers === null || headers === void 0 ? void 0 : headers["x-forwarded-host"]) !== null && _headers$xForwarded2 !== void 0 ? _headers$xForwarded2 : headers === null || headers === void 0 ? void 0 : headers.host;
    req.origin = (0, _detectOrigin.detectOrigin)(host, headers === null || headers === void 0 ? void 0 : headers["x-forwarded-proto"]);
    return req;
}
async function AuthHandler(params) {
    var _req$body$callbackUrl, _req$body, _req$query2, _req$body2;
    const { options: authOptions , req: incomingRequest  } = params;
    const req = await toInternalRequest(incomingRequest);
    (0, _logger.setLogger)(authOptions.logger, authOptions.debug);
    const assertionResult = (0, _assert.assertConfig)({
        options: authOptions,
        req
    });
    if (Array.isArray(assertionResult)) {
        assertionResult.forEach(_logger.default.warn);
    } else if (assertionResult instanceof Error) {
        var _req$query, _req$query$callbackUr;
        _logger.default.error(assertionResult.code, assertionResult);
        const htmlPages = [
            "signin",
            "signout",
            "error",
            "verify-request"
        ];
        if (!htmlPages.includes(req.action) || req.method !== "GET") {
            const message = `There is a problem with the server configuration. Check the server logs for more information.`;
            return {
                status: 500,
                headers: [
                    {
                        key: "Content-Type",
                        value: "application/json"
                    }
                ],
                body: {
                    message
                }
            };
        }
        const { pages , theme  } = authOptions;
        const authOnErrorPage = (pages === null || pages === void 0 ? void 0 : pages.error) && ((_req$query = req.query) === null || _req$query === void 0 ? void 0 : (_req$query$callbackUr = _req$query.callbackUrl) === null || _req$query$callbackUr === void 0 ? void 0 : _req$query$callbackUr.startsWith(pages.error));
        if (!(pages !== null && pages !== void 0 && pages.error) || authOnErrorPage) {
            if (authOnErrorPage) {
                _logger.default.error("AUTH_ON_ERROR_PAGE_ERROR", new Error(`The error page ${pages === null || pages === void 0 ? void 0 : pages.error} should not require authentication`));
            }
            const render = (0, _pages.default)({
                theme
            });
            return render.error({
                error: "configuration"
            });
        }
        return {
            redirect: `${pages.error}?error=Configuration`
        };
    }
    const { action , providerId , error , method ="GET"  } = req;
    const { options , cookies  } = await (0, _init.init)({
        authOptions,
        action,
        providerId,
        origin: req.origin,
        callbackUrl: (_req$body$callbackUrl = (_req$body = req.body) === null || _req$body === void 0 ? void 0 : _req$body.callbackUrl) !== null && _req$body$callbackUrl !== void 0 ? _req$body$callbackUrl : (_req$query2 = req.query) === null || _req$query2 === void 0 ? void 0 : _req$query2.callbackUrl,
        csrfToken: (_req$body2 = req.body) === null || _req$body2 === void 0 ? void 0 : _req$body2.csrfToken,
        cookies: req.cookies,
        isPost: method === "POST"
    });
    const sessionStore = new _cookie.SessionStore(options.cookies.sessionToken, req, options.logger);
    if (method === "GET") {
        const render = (0, _pages.default)({
            ...options,
            query: req.query,
            cookies
        });
        const { pages  } = options;
        switch(action){
            case "providers":
                return await routes.providers(options.providers);
            case "session":
                {
                    const session = await routes.session({
                        options,
                        sessionStore
                    });
                    if (session.cookies) cookies.push(...session.cookies);
                    return {
                        ...session,
                        cookies
                    };
                }
            case "csrf":
                return {
                    headers: [
                        {
                            key: "Content-Type",
                            value: "application/json"
                        }
                    ],
                    body: {
                        csrfToken: options.csrfToken
                    },
                    cookies
                };
            case "signin":
                if (pages.signIn) {
                    let signinUrl = `${pages.signIn}${pages.signIn.includes("?") ? "&" : "?"}callbackUrl=${encodeURIComponent(options.callbackUrl)}`;
                    if (error) signinUrl = `${signinUrl}&error=${encodeURIComponent(error)}`;
                    return {
                        redirect: signinUrl,
                        cookies
                    };
                }
                return render.signin();
            case "signout":
                if (pages.signOut) return {
                    redirect: pages.signOut,
                    cookies
                };
                return render.signout();
            case "callback":
                if (options.provider) {
                    const callback = await routes.callback({
                        body: req.body,
                        query: req.query,
                        headers: req.headers,
                        cookies: req.cookies,
                        method,
                        options,
                        sessionStore
                    });
                    if (callback.cookies) cookies.push(...callback.cookies);
                    return {
                        ...callback,
                        cookies
                    };
                }
                break;
            case "verify-request":
                if (pages.verifyRequest) {
                    return {
                        redirect: pages.verifyRequest,
                        cookies
                    };
                }
                return render.verifyRequest();
            case "error":
                if ([
                    "Signin",
                    "OAuthSignin",
                    "OAuthCallback",
                    "OAuthCreateAccount",
                    "EmailCreateAccount",
                    "Callback",
                    "OAuthAccountNotLinked",
                    "EmailSignin",
                    "CredentialsSignin",
                    "SessionRequired"
                ].includes(error)) {
                    return {
                        redirect: `${options.url}/signin?error=${error}`,
                        cookies
                    };
                }
                if (pages.error) {
                    return {
                        redirect: `${pages.error}${pages.error.includes("?") ? "&" : "?"}error=${error}`,
                        cookies
                    };
                }
                return render.error({
                    error: error
                });
            default:
        }
    } else if (method === "POST") {
        switch(action){
            case "signin":
                if (options.csrfTokenVerified && options.provider) {
                    const signin = await routes.signin({
                        query: req.query,
                        body: req.body,
                        options
                    });
                    if (signin.cookies) cookies.push(...signin.cookies);
                    return {
                        ...signin,
                        cookies
                    };
                }
                return {
                    redirect: `${options.url}/signin?csrf=true`,
                    cookies
                };
            case "signout":
                if (options.csrfTokenVerified) {
                    const signout = await routes.signout({
                        options,
                        sessionStore
                    });
                    if (signout.cookies) cookies.push(...signout.cookies);
                    return {
                        ...signout,
                        cookies
                    };
                }
                return {
                    redirect: `${options.url}/signout?csrf=true`,
                    cookies
                };
            case "callback":
                if (options.provider) {
                    if (options.provider.type === "credentials" && !options.csrfTokenVerified) {
                        return {
                            redirect: `${options.url}/signin?csrf=true`,
                            cookies
                        };
                    }
                    const callback = await routes.callback({
                        body: req.body,
                        query: req.query,
                        headers: req.headers,
                        cookies: req.cookies,
                        method,
                        options,
                        sessionStore
                    });
                    if (callback.cookies) cookies.push(...callback.cookies);
                    return {
                        ...callback,
                        cookies
                    };
                }
                break;
            case "_log":
                {
                    if (authOptions.logger) {
                        try {
                            var _req$body3;
                            const { code , level , ...metadata } = (_req$body3 = req.body) !== null && _req$body3 !== void 0 ? _req$body3 : {};
                            _logger.default[level](code, metadata);
                        } catch (error) {
                            _logger.default.error("LOGGER_ERROR", error);
                        }
                    }
                    return {};
                }
            case "session":
                {
                    if (options.csrfTokenVerified) {
                        var _req$body4;
                        const session = await routes.session({
                            options,
                            sessionStore,
                            newSession: (_req$body4 = req.body) === null || _req$body4 === void 0 ? void 0 : _req$body4.data,
                            isUpdate: true
                        });
                        if (session.cookies) cookies.push(...session.cookies);
                        return {
                            ...session,
                            cookies
                        };
                    }
                    return {
                        status: 400,
                        body: {},
                        cookies
                    };
                }
            default:
        }
    }
    return {
        status: 400,
        body: `Error: This action with HTTP ${method} is not supported by NextAuth.js`
    };
}


/***/ }),

/***/ 79379:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _interopRequireDefault = __webpack_require__(6548);
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.init = init;
var _crypto = __webpack_require__(6113);
var _logger = _interopRequireDefault(__webpack_require__(45663));
var _errors = __webpack_require__(54941);
var _providers = _interopRequireDefault(__webpack_require__(18566));
var _utils = __webpack_require__(73005);
var cookie = _interopRequireWildcard(__webpack_require__(8936));
var jwt = _interopRequireWildcard(__webpack_require__(31314));
var _defaultCallbacks = __webpack_require__(8224);
var _csrfToken = __webpack_require__(67055);
var _callbackUrl = __webpack_require__(75972);
var _parseUrl = _interopRequireDefault(__webpack_require__(30323));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
async function init({ authOptions , providerId , action , origin , cookies: reqCookies , callbackUrl: reqCallbackUrl , csrfToken: reqCsrfToken , isPost  }) {
    var _authOptions$useSecur, _authOptions$events;
    const url = (0, _parseUrl.default)(origin);
    const secret = (0, _utils.createSecret)({
        authOptions,
        url
    });
    const { providers , provider  } = (0, _providers.default)({
        providers: authOptions.providers,
        url,
        providerId
    });
    const maxAge = 30 * 24 * 60 * 60;
    const options = {
        debug: false,
        pages: {},
        theme: {
            colorScheme: "auto",
            logo: "",
            brandColor: "",
            buttonText: ""
        },
        ...authOptions,
        url,
        action,
        provider,
        cookies: {
            ...cookie.defaultCookies((_authOptions$useSecur = authOptions.useSecureCookies) !== null && _authOptions$useSecur !== void 0 ? _authOptions$useSecur : url.base.startsWith("https://")),
            ...authOptions.cookies
        },
        secret,
        providers,
        session: {
            strategy: authOptions.adapter ? "database" : "jwt",
            maxAge,
            updateAge: 24 * 60 * 60,
            generateSessionToken: ()=>{
                var _randomUUID;
                return (_randomUUID = _crypto.randomUUID === null || _crypto.randomUUID === void 0 ? void 0 : (0, _crypto.randomUUID)()) !== null && _randomUUID !== void 0 ? _randomUUID : (0, _crypto.randomBytes)(32).toString("hex");
            },
            ...authOptions.session
        },
        jwt: {
            secret,
            maxAge,
            encode: jwt.encode,
            decode: jwt.decode,
            ...authOptions.jwt
        },
        events: (0, _errors.eventsErrorHandler)((_authOptions$events = authOptions.events) !== null && _authOptions$events !== void 0 ? _authOptions$events : {}, _logger.default),
        adapter: (0, _errors.adapterErrorHandler)(authOptions.adapter, _logger.default),
        callbacks: {
            ..._defaultCallbacks.defaultCallbacks,
            ...authOptions.callbacks
        },
        logger: _logger.default,
        callbackUrl: url.origin
    };
    const cookies = [];
    const { csrfToken , cookie: csrfCookie , csrfTokenVerified  } = (0, _csrfToken.createCSRFToken)({
        options,
        cookieValue: reqCookies === null || reqCookies === void 0 ? void 0 : reqCookies[options.cookies.csrfToken.name],
        isPost,
        bodyValue: reqCsrfToken
    });
    options.csrfToken = csrfToken;
    options.csrfTokenVerified = csrfTokenVerified;
    if (csrfCookie) {
        cookies.push({
            name: options.cookies.csrfToken.name,
            value: csrfCookie,
            options: options.cookies.csrfToken.options
        });
    }
    const { callbackUrl , callbackUrlCookie  } = await (0, _callbackUrl.createCallbackUrl)({
        options,
        cookieValue: reqCookies === null || reqCookies === void 0 ? void 0 : reqCookies[options.cookies.callbackUrl.name],
        paramValue: reqCallbackUrl
    });
    options.callbackUrl = callbackUrl;
    if (callbackUrlCookie) {
        cookies.push({
            name: options.cookies.callbackUrl.name,
            value: callbackUrlCookie,
            options: options.cookies.callbackUrl.options
        });
    }
    return {
        options,
        cookies
    };
}


/***/ }),

/***/ 84886:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _interopRequireDefault = __webpack_require__(6548);
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.assertConfig = assertConfig;
var _errors = __webpack_require__(54941);
var _parseUrl = _interopRequireDefault(__webpack_require__(30323));
var _cookie = __webpack_require__(8936);
let warned = false;
function isValidHttpUrl(url, baseUrl) {
    try {
        return /^https?:/.test(new URL(url, url.startsWith("/") ? baseUrl : undefined).protocol);
    } catch (_unused) {
        return false;
    }
}
function assertConfig(params) {
    var _req$query, _req$query2, _options$useSecureCoo, _req$cookies, _options$cookies$call, _options$cookies, _options$cookies$call2;
    const { options , req  } = params;
    const warnings = [];
    if (!warned) {
        if (!req.origin) warnings.push("NEXTAUTH_URL");
        if (!options.secret && "production" !== "production") {}
        if (options.debug) warnings.push("DEBUG_ENABLED");
    }
    if (!options.secret && "production" === "production") {
        return new _errors.MissingSecret("Please define a `secret` in production.");
    }
    if (!((_req$query = req.query) !== null && _req$query !== void 0 && _req$query.nextauth) && !req.action) {
        return new _errors.MissingAPIRoute("Cannot find [...nextauth].{js,ts} in `/pages/api/auth`. Make sure the filename is written correctly.");
    }
    const callbackUrlParam = (_req$query2 = req.query) === null || _req$query2 === void 0 ? void 0 : _req$query2.callbackUrl;
    const url = (0, _parseUrl.default)(req.origin);
    if (callbackUrlParam && !isValidHttpUrl(callbackUrlParam, url.base)) {
        return new _errors.InvalidCallbackUrl(`Invalid callback URL. Received: ${callbackUrlParam}`);
    }
    const { callbackUrl: defaultCallbackUrl  } = (0, _cookie.defaultCookies)((_options$useSecureCoo = options.useSecureCookies) !== null && _options$useSecureCoo !== void 0 ? _options$useSecureCoo : url.base.startsWith("https://"));
    const callbackUrlCookie = (_req$cookies = req.cookies) === null || _req$cookies === void 0 ? void 0 : _req$cookies[(_options$cookies$call = (_options$cookies = options.cookies) === null || _options$cookies === void 0 ? void 0 : (_options$cookies$call2 = _options$cookies.callbackUrl) === null || _options$cookies$call2 === void 0 ? void 0 : _options$cookies$call2.name) !== null && _options$cookies$call !== void 0 ? _options$cookies$call : defaultCallbackUrl.name];
    if (callbackUrlCookie && !isValidHttpUrl(callbackUrlCookie, url.base)) {
        return new _errors.InvalidCallbackUrl(`Invalid callback URL. Received: ${callbackUrlCookie}`);
    }
    let hasCredentials, hasEmail;
    let hasTwitterOAuth2;
    for (const provider of options.providers){
        if (provider.type === "credentials") hasCredentials = true;
        else if (provider.type === "email") hasEmail = true;
        else if (provider.id === "twitter" && provider.version === "2.0") hasTwitterOAuth2 = true;
    }
    if (hasCredentials) {
        var _options$session;
        const dbStrategy = ((_options$session = options.session) === null || _options$session === void 0 ? void 0 : _options$session.strategy) === "database";
        const onlyCredentials = !options.providers.some((p)=>p.type !== "credentials");
        if (dbStrategy && onlyCredentials) {
            return new _errors.UnsupportedStrategy("Signin in with credentials only supported if JWT strategy is enabled");
        }
        const credentialsNoAuthorize = options.providers.some((p)=>p.type === "credentials" && !p.authorize);
        if (credentialsNoAuthorize) {
            return new _errors.MissingAuthorize("Must define an authorize() handler to use credentials authentication provider");
        }
    }
    if (hasEmail) {
        const { adapter  } = options;
        if (!adapter) {
            return new _errors.MissingAdapter("E-mail login requires an adapter.");
        }
        const missingMethods = [
            "createVerificationToken",
            "useVerificationToken",
            "getUserByEmail"
        ].filter((method)=>!adapter[method]);
        if (missingMethods.length) {
            return new _errors.MissingAdapterMethods(`Required adapter methods were missing: ${missingMethods.join(", ")}`);
        }
    }
    if (!warned) {
        if (hasTwitterOAuth2) warnings.push("TWITTER_OAUTH_2_BETA");
        warned = true;
    }
    return warnings;
}


/***/ }),

/***/ 75249:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = callbackHandler;
var _errors = __webpack_require__(54941);
var _utils = __webpack_require__(73005);
async function callbackHandler(params) {
    const { sessionToken , profile: _profile , account , options  } = params;
    if (!(account !== null && account !== void 0 && account.providerAccountId) || !account.type) throw new Error("Missing or invalid provider account");
    if (![
        "email",
        "oauth"
    ].includes(account.type)) throw new Error("Provider not supported");
    const { adapter , jwt , events , session: { strategy: sessionStrategy , generateSessionToken  }  } = options;
    if (!adapter) {
        return {
            user: _profile,
            account
        };
    }
    const profile = _profile;
    const { createUser , updateUser , getUser , getUserByAccount , getUserByEmail , linkAccount , createSession , getSessionAndUser , deleteSession  } = adapter;
    let session = null;
    let user = null;
    let isNewUser = false;
    const useJwtSession = sessionStrategy === "jwt";
    if (sessionToken) {
        if (useJwtSession) {
            try {
                session = await jwt.decode({
                    ...jwt,
                    token: sessionToken
                });
                if (session && "sub" in session && session.sub) {
                    user = await getUser(session.sub);
                }
            } catch (_unused) {}
        } else {
            const userAndSession = await getSessionAndUser(sessionToken);
            if (userAndSession) {
                session = userAndSession.session;
                user = userAndSession.user;
            }
        }
    }
    if (account.type === "email") {
        const userByEmail = await getUserByEmail(profile.email);
        if (userByEmail) {
            var _user, _events$updateUser;
            if (((_user = user) === null || _user === void 0 ? void 0 : _user.id) !== userByEmail.id && !useJwtSession && sessionToken) {
                await deleteSession(sessionToken);
            }
            user = await updateUser({
                id: userByEmail.id,
                emailVerified: new Date()
            });
            await ((_events$updateUser = events.updateUser) === null || _events$updateUser === void 0 ? void 0 : _events$updateUser.call(events, {
                user
            }));
        } else {
            var _events$createUser;
            const { id: _ , ...newUser } = {
                ...profile,
                emailVerified: new Date()
            };
            user = await createUser(newUser);
            await ((_events$createUser = events.createUser) === null || _events$createUser === void 0 ? void 0 : _events$createUser.call(events, {
                user
            }));
            isNewUser = true;
        }
        session = useJwtSession ? {} : await createSession({
            sessionToken: await generateSessionToken(),
            userId: user.id,
            expires: (0, _utils.fromDate)(options.session.maxAge)
        });
        return {
            session,
            user,
            isNewUser
        };
    } else if (account.type === "oauth") {
        const userByAccount = await getUserByAccount({
            providerAccountId: account.providerAccountId,
            provider: account.provider
        });
        if (userByAccount) {
            if (user) {
                if (userByAccount.id === user.id) {
                    return {
                        session,
                        user,
                        isNewUser
                    };
                }
                throw new _errors.AccountNotLinkedError("The account is already associated with another user");
            }
            session = useJwtSession ? {} : await createSession({
                sessionToken: await generateSessionToken(),
                userId: userByAccount.id,
                expires: (0, _utils.fromDate)(options.session.maxAge)
            });
            return {
                session,
                user: userByAccount,
                isNewUser
            };
        } else {
            var _events$createUser2, _events$linkAccount2;
            if (user) {
                var _events$linkAccount;
                await linkAccount({
                    ...account,
                    userId: user.id
                });
                await ((_events$linkAccount = events.linkAccount) === null || _events$linkAccount === void 0 ? void 0 : _events$linkAccount.call(events, {
                    user,
                    account,
                    profile
                }));
                return {
                    session,
                    user,
                    isNewUser
                };
            }
            const userByEmail = profile.email ? await getUserByEmail(profile.email) : null;
            if (userByEmail) {
                const provider = options.provider;
                if (provider !== null && provider !== void 0 && provider.allowDangerousEmailAccountLinking) {
                    user = userByEmail;
                } else {
                    throw new _errors.AccountNotLinkedError("Another account already exists with the same e-mail address");
                }
            } else {
                const { id: _ , ...newUser } = {
                    ...profile,
                    emailVerified: null
                };
                user = await createUser(newUser);
            }
            await ((_events$createUser2 = events.createUser) === null || _events$createUser2 === void 0 ? void 0 : _events$createUser2.call(events, {
                user
            }));
            await linkAccount({
                ...account,
                userId: user.id
            });
            await ((_events$linkAccount2 = events.linkAccount) === null || _events$linkAccount2 === void 0 ? void 0 : _events$linkAccount2.call(events, {
                user,
                account,
                profile
            }));
            session = useJwtSession ? {} : await createSession({
                sessionToken: await generateSessionToken(),
                userId: user.id,
                expires: (0, _utils.fromDate)(options.session.maxAge)
            });
            return {
                session,
                user,
                isNewUser: true
            };
        }
    }
    throw new Error("Unsupported account type");
}


/***/ }),

/***/ 75972:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.createCallbackUrl = createCallbackUrl;
async function createCallbackUrl({ options , paramValue , cookieValue  }) {
    const { url , callbacks  } = options;
    let callbackUrl = url.origin;
    if (paramValue) {
        callbackUrl = await callbacks.redirect({
            url: paramValue,
            baseUrl: url.origin
        });
    } else if (cookieValue) {
        callbackUrl = await callbacks.redirect({
            url: cookieValue,
            baseUrl: url.origin
        });
    }
    return {
        callbackUrl,
        callbackUrlCookie: callbackUrl !== cookieValue ? callbackUrl : undefined
    };
}


/***/ }),

/***/ 67055:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.createCSRFToken = createCSRFToken;
var _crypto = __webpack_require__(6113);
function createCSRFToken({ options , cookieValue , isPost , bodyValue  }) {
    if (cookieValue) {
        const [csrfToken, csrfTokenHash] = cookieValue.split("|");
        const expectedCsrfTokenHash = (0, _crypto.createHash)("sha256").update(`${csrfToken}${options.secret}`).digest("hex");
        if (csrfTokenHash === expectedCsrfTokenHash) {
            const csrfTokenVerified = isPost && csrfToken === bodyValue;
            return {
                csrfTokenVerified,
                csrfToken
            };
        }
    }
    const csrfToken = (0, _crypto.randomBytes)(32).toString("hex");
    const csrfTokenHash = (0, _crypto.createHash)("sha256").update(`${csrfToken}${options.secret}`).digest("hex");
    const cookie = `${csrfToken}|${csrfTokenHash}`;
    return {
        cookie,
        csrfToken
    };
}


/***/ }),

/***/ 8224:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.defaultCallbacks = void 0;
const defaultCallbacks = {
    signIn () {
        return true;
    },
    redirect ({ url , baseUrl  }) {
        if (url.startsWith("/")) return `${baseUrl}${url}`;
        else if (new URL(url).origin === baseUrl) return url;
        return baseUrl;
    },
    session ({ session  }) {
        return session;
    },
    jwt ({ token  }) {
        return token;
    }
};
exports.defaultCallbacks = defaultCallbacks;


/***/ }),

/***/ 36111:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = getAdapterUserFromEmail;
async function getAdapterUserFromEmail({ email , adapter  }) {
    const { getUserByEmail  } = adapter;
    const adapterUser = email ? await getUserByEmail(email) : null;
    if (adapterUser) return adapterUser;
    return {
        id: email,
        email,
        emailVerified: null
    };
}


/***/ }),

/***/ 11705:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = email;
var _crypto = __webpack_require__(6113);
var _utils = __webpack_require__(73005);
async function email(identifier, options) {
    var _await$provider$gener, _provider$generateVer, _provider$maxAge;
    const { url , adapter , provider , callbackUrl , theme  } = options;
    const token = (_await$provider$gener = await ((_provider$generateVer = provider.generateVerificationToken) === null || _provider$generateVer === void 0 ? void 0 : _provider$generateVer.call(provider))) !== null && _await$provider$gener !== void 0 ? _await$provider$gener : (0, _crypto.randomBytes)(32).toString("hex");
    const ONE_DAY_IN_SECONDS = 86400;
    const expires = new Date(Date.now() + ((_provider$maxAge = provider.maxAge) !== null && _provider$maxAge !== void 0 ? _provider$maxAge : ONE_DAY_IN_SECONDS) * 1000);
    const params = new URLSearchParams({
        callbackUrl,
        token,
        email: identifier
    });
    const _url = `${url}/callback/${provider.id}?${params}`;
    await Promise.all([
        provider.sendVerificationRequest({
            identifier,
            token,
            expires,
            url: _url,
            provider,
            theme
        }),
        adapter.createVerificationToken({
            identifier,
            token: (0, _utils.hashToken)(token, options),
            expires
        })
    ]);
    return `${url}/verify-request?${new URLSearchParams({
        provider: provider.id,
        type: provider.type
    })}`;
}


/***/ }),

/***/ 16555:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = getAuthorizationUrl;
var _client = __webpack_require__(77984);
var _clientLegacy = __webpack_require__(92691);
var checks = _interopRequireWildcard(__webpack_require__(98704));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
async function getAuthorizationUrl({ options , query  }) {
    var _provider$version;
    const { logger , provider  } = options;
    let params = {};
    if (typeof provider.authorization === "string") {
        const parsedUrl = new URL(provider.authorization);
        const parsedParams = Object.fromEntries(parsedUrl.searchParams);
        params = {
            ...params,
            ...parsedParams
        };
    } else {
        var _provider$authorizati;
        params = {
            ...params,
            ...(_provider$authorizati = provider.authorization) === null || _provider$authorizati === void 0 ? void 0 : _provider$authorizati.params
        };
    }
    params = {
        ...params,
        ...query
    };
    if ((_provider$version = provider.version) !== null && _provider$version !== void 0 && _provider$version.startsWith("1.")) {
        var _provider$authorizati2;
        const client = (0, _clientLegacy.oAuth1Client)(options);
        const tokens = await client.getOAuthRequestToken(params);
        const url = `${(_provider$authorizati2 = provider.authorization) === null || _provider$authorizati2 === void 0 ? void 0 : _provider$authorizati2.url}?${new URLSearchParams({
            oauth_token: tokens.oauth_token,
            oauth_token_secret: tokens.oauth_token_secret,
            ...tokens.params
        })}`;
        _clientLegacy.oAuth1TokenStore.set(tokens.oauth_token, tokens.oauth_token_secret);
        logger.debug("GET_AUTHORIZATION_URL", {
            url,
            provider
        });
        return {
            redirect: url
        };
    }
    const client = await (0, _client.openidClient)(options);
    const authorizationParams = params;
    const cookies = [];
    await checks.state.create(options, cookies, authorizationParams);
    await checks.pkce.create(options, cookies, authorizationParams);
    await checks.nonce.create(options, cookies, authorizationParams);
    const url = client.authorizationUrl(authorizationParams);
    logger.debug("GET_AUTHORIZATION_URL", {
        url,
        cookies,
        provider
    });
    return {
        redirect: url,
        cookies
    };
}


/***/ }),

/***/ 9869:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = oAuthCallback;
var _openidClient = __webpack_require__(51966);
var _client = __webpack_require__(77984);
var _clientLegacy = __webpack_require__(92691);
var _checks = _interopRequireWildcard(__webpack_require__(98704));
var _errors = __webpack_require__(54941);
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
async function oAuthCallback(params) {
    var _body$error, _provider$version;
    const { options , query , body , method , cookies  } = params;
    const { logger , provider  } = options;
    const errorMessage = (_body$error = body === null || body === void 0 ? void 0 : body.error) !== null && _body$error !== void 0 ? _body$error : query === null || query === void 0 ? void 0 : query.error;
    if (errorMessage) {
        const error = new Error(errorMessage);
        logger.error("OAUTH_CALLBACK_HANDLER_ERROR", {
            error,
            error_description: query === null || query === void 0 ? void 0 : query.error_description,
            providerId: provider.id
        });
        logger.debug("OAUTH_CALLBACK_HANDLER_ERROR", {
            body
        });
        throw error;
    }
    if ((_provider$version = provider.version) !== null && _provider$version !== void 0 && _provider$version.startsWith("1.")) {
        try {
            const client = await (0, _clientLegacy.oAuth1Client)(options);
            const { oauth_token , oauth_verifier  } = query !== null && query !== void 0 ? query : {};
            const tokens = await client.getOAuthAccessToken(oauth_token, _clientLegacy.oAuth1TokenStore.get(oauth_token), oauth_verifier);
            let profile = await client.get(provider.profileUrl, tokens.oauth_token, tokens.oauth_token_secret);
            if (typeof profile === "string") {
                profile = JSON.parse(profile);
            }
            const newProfile = await getProfile({
                profile,
                tokens,
                provider,
                logger
            });
            return {
                ...newProfile,
                cookies: []
            };
        } catch (error) {
            logger.error("OAUTH_V1_GET_ACCESS_TOKEN_ERROR", error);
            throw error;
        }
    }
    if (query !== null && query !== void 0 && query.oauth_token) _clientLegacy.oAuth1TokenStore.delete(query.oauth_token);
    try {
        var _provider$token, _provider$token2, _provider$userinfo;
        const client = await (0, _client.openidClient)(options);
        let tokens;
        const checks = {};
        const resCookies = [];
        await _checks.state.use(cookies, resCookies, options, checks);
        await _checks.pkce.use(cookies, resCookies, options, checks);
        await _checks.nonce.use(cookies, resCookies, options, checks);
        const params = {
            ...client.callbackParams({
                url: `http://n?${new URLSearchParams(query)}`,
                body,
                method
            }),
            ...(_provider$token = provider.token) === null || _provider$token === void 0 ? void 0 : _provider$token.params
        };
        if ((_provider$token2 = provider.token) !== null && _provider$token2 !== void 0 && _provider$token2.request) {
            const response = await provider.token.request({
                provider,
                params,
                checks,
                client
            });
            tokens = new _openidClient.TokenSet(response.tokens);
        } else if (provider.idToken) {
            tokens = await client.callback(provider.callbackUrl, params, checks);
        } else {
            tokens = await client.oauthCallback(provider.callbackUrl, params, checks);
        }
        if (Array.isArray(tokens.scope)) {
            tokens.scope = tokens.scope.join(" ");
        }
        let profile;
        if ((_provider$userinfo = provider.userinfo) !== null && _provider$userinfo !== void 0 && _provider$userinfo.request) {
            profile = await provider.userinfo.request({
                provider,
                tokens,
                client
            });
        } else if (provider.idToken) {
            profile = tokens.claims();
        } else {
            var _provider$userinfo2;
            profile = await client.userinfo(tokens, {
                params: (_provider$userinfo2 = provider.userinfo) === null || _provider$userinfo2 === void 0 ? void 0 : _provider$userinfo2.params
            });
        }
        const profileResult = await getProfile({
            profile,
            provider,
            tokens,
            logger
        });
        return {
            ...profileResult,
            cookies: resCookies
        };
    } catch (error) {
        throw new _errors.OAuthCallbackError(error);
    }
}
async function getProfile({ profile: OAuthProfile , tokens , provider , logger  }) {
    try {
        var _profile$email;
        logger.debug("PROFILE_DATA", {
            OAuthProfile
        });
        const profile = await provider.profile(OAuthProfile, tokens);
        profile.email = (_profile$email = profile.email) === null || _profile$email === void 0 ? void 0 : _profile$email.toLowerCase();
        if (!profile.id) throw new TypeError(`Profile id is missing in ${provider.name} OAuth profile response`);
        return {
            profile,
            account: {
                provider: provider.id,
                type: provider.type,
                providerAccountId: profile.id.toString(),
                ...tokens
            },
            OAuthProfile
        };
    } catch (error) {
        logger.error("OAUTH_PARSE_PROFILE_ERROR", {
            error: error,
            OAuthProfile
        });
    }
}


/***/ }),

/***/ 98704:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.pkce = exports.nonce = exports.PKCE_CODE_CHALLENGE_METHOD = void 0;
exports.signCookie = signCookie;
exports.state = void 0;
var _openidClient = __webpack_require__(51966);
var jwt = _interopRequireWildcard(__webpack_require__(31314));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
async function signCookie(type, value, maxAge, options) {
    const { cookies , logger  } = options;
    logger.debug(`CREATE_${type.toUpperCase()}`, {
        value,
        maxAge
    });
    const expires = new Date();
    expires.setTime(expires.getTime() + maxAge * 1000);
    return {
        name: cookies[type].name,
        value: await jwt.encode({
            ...options.jwt,
            maxAge,
            token: {
                value
            }
        }),
        options: {
            ...cookies[type].options,
            expires
        }
    };
}
const PKCE_MAX_AGE = 60 * 15;
const PKCE_CODE_CHALLENGE_METHOD = "S256";
exports.PKCE_CODE_CHALLENGE_METHOD = PKCE_CODE_CHALLENGE_METHOD;
const pkce = {
    async create (options, cookies, resParams) {
        var _options$provider, _options$provider$che, _options$cookies$pkce;
        if (!((_options$provider = options.provider) !== null && _options$provider !== void 0 && (_options$provider$che = _options$provider.checks) !== null && _options$provider$che !== void 0 && _options$provider$che.includes("pkce"))) return;
        const code_verifier = _openidClient.generators.codeVerifier();
        const value = _openidClient.generators.codeChallenge(code_verifier);
        resParams.code_challenge = value;
        resParams.code_challenge_method = PKCE_CODE_CHALLENGE_METHOD;
        const maxAge = (_options$cookies$pkce = options.cookies.pkceCodeVerifier.options.maxAge) !== null && _options$cookies$pkce !== void 0 ? _options$cookies$pkce : PKCE_MAX_AGE;
        cookies.push(await signCookie("pkceCodeVerifier", code_verifier, maxAge, options));
    },
    async use (cookies, resCookies, options, checks) {
        var _options$provider2, _options$provider2$ch;
        if (!((_options$provider2 = options.provider) !== null && _options$provider2 !== void 0 && (_options$provider2$ch = _options$provider2.checks) !== null && _options$provider2$ch !== void 0 && _options$provider2$ch.includes("pkce"))) return;
        const codeVerifier = cookies === null || cookies === void 0 ? void 0 : cookies[options.cookies.pkceCodeVerifier.name];
        if (!codeVerifier) throw new TypeError("PKCE code_verifier cookie was missing.");
        const value = await jwt.decode({
            ...options.jwt,
            token: codeVerifier
        });
        if (!(value !== null && value !== void 0 && value.value)) throw new TypeError("PKCE code_verifier value could not be parsed.");
        resCookies.push({
            name: options.cookies.pkceCodeVerifier.name,
            value: "",
            options: {
                ...options.cookies.pkceCodeVerifier.options,
                maxAge: 0
            }
        });
        checks.code_verifier = value.value;
    }
};
exports.pkce = pkce;
const STATE_MAX_AGE = 60 * 15;
const state = {
    async create (options, cookies, resParams) {
        var _options$provider$che2, _options$cookies$stat;
        if (!((_options$provider$che2 = options.provider.checks) !== null && _options$provider$che2 !== void 0 && _options$provider$che2.includes("state"))) return;
        const value = _openidClient.generators.state();
        resParams.state = value;
        const maxAge = (_options$cookies$stat = options.cookies.state.options.maxAge) !== null && _options$cookies$stat !== void 0 ? _options$cookies$stat : STATE_MAX_AGE;
        cookies.push(await signCookie("state", value, maxAge, options));
    },
    async use (cookies, resCookies, options, checks) {
        var _options$provider$che3;
        if (!((_options$provider$che3 = options.provider.checks) !== null && _options$provider$che3 !== void 0 && _options$provider$che3.includes("state"))) return;
        const state = cookies === null || cookies === void 0 ? void 0 : cookies[options.cookies.state.name];
        if (!state) throw new TypeError("State cookie was missing.");
        const value = await jwt.decode({
            ...options.jwt,
            token: state
        });
        if (!(value !== null && value !== void 0 && value.value)) throw new TypeError("State value could not be parsed.");
        resCookies.push({
            name: options.cookies.state.name,
            value: "",
            options: {
                ...options.cookies.state.options,
                maxAge: 0
            }
        });
        checks.state = value.value;
    }
};
exports.state = state;
const NONCE_MAX_AGE = 60 * 15;
const nonce = {
    async create (options, cookies, resParams) {
        var _options$provider$che4, _options$cookies$nonc;
        if (!((_options$provider$che4 = options.provider.checks) !== null && _options$provider$che4 !== void 0 && _options$provider$che4.includes("nonce"))) return;
        const value = _openidClient.generators.nonce();
        resParams.nonce = value;
        const maxAge = (_options$cookies$nonc = options.cookies.nonce.options.maxAge) !== null && _options$cookies$nonc !== void 0 ? _options$cookies$nonc : NONCE_MAX_AGE;
        cookies.push(await signCookie("nonce", value, maxAge, options));
    },
    async use (cookies, resCookies, options, checks) {
        var _options$provider3, _options$provider3$ch;
        if (!((_options$provider3 = options.provider) !== null && _options$provider3 !== void 0 && (_options$provider3$ch = _options$provider3.checks) !== null && _options$provider3$ch !== void 0 && _options$provider3$ch.includes("nonce"))) return;
        const nonce = cookies === null || cookies === void 0 ? void 0 : cookies[options.cookies.nonce.name];
        if (!nonce) throw new TypeError("Nonce cookie was missing.");
        const value = await jwt.decode({
            ...options.jwt,
            token: nonce
        });
        if (!(value !== null && value !== void 0 && value.value)) throw new TypeError("Nonce value could not be parsed.");
        resCookies.push({
            name: options.cookies.nonce.name,
            value: "",
            options: {
                ...options.cookies.nonce.options,
                maxAge: 0
            }
        });
        checks.nonce = value.value;
    }
};
exports.nonce = nonce;


/***/ }),

/***/ 92691:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.oAuth1Client = oAuth1Client;
exports.oAuth1TokenStore = void 0;
var _oauth = __webpack_require__(5921);
function oAuth1Client(options) {
    var _provider$version, _provider$encoding;
    const provider = options.provider;
    const oauth1Client = new _oauth.OAuth(provider.requestTokenUrl, provider.accessTokenUrl, provider.clientId, provider.clientSecret, (_provider$version = provider.version) !== null && _provider$version !== void 0 ? _provider$version : "1.0", provider.callbackUrl, (_provider$encoding = provider.encoding) !== null && _provider$encoding !== void 0 ? _provider$encoding : "HMAC-SHA1");
    const originalGet = oauth1Client.get.bind(oauth1Client);
    oauth1Client.get = async (...args)=>{
        return await new Promise((resolve, reject)=>{
            originalGet(...args, (error, result)=>{
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
    };
    const originalGetOAuth1AccessToken = oauth1Client.getOAuthAccessToken.bind(oauth1Client);
    oauth1Client.getOAuthAccessToken = async (...args)=>{
        return await new Promise((resolve, reject)=>{
            originalGetOAuth1AccessToken(...args, (error, oauth_token, oauth_token_secret)=>{
                if (error) {
                    return reject(error);
                }
                resolve({
                    oauth_token,
                    oauth_token_secret
                });
            });
        });
    };
    const originalGetOAuthRequestToken = oauth1Client.getOAuthRequestToken.bind(oauth1Client);
    oauth1Client.getOAuthRequestToken = async (params = {})=>{
        return await new Promise((resolve, reject)=>{
            originalGetOAuthRequestToken(params, (error, oauth_token, oauth_token_secret, params)=>{
                if (error) {
                    return reject(error);
                }
                resolve({
                    oauth_token,
                    oauth_token_secret,
                    params
                });
            });
        });
    };
    return oauth1Client;
}
const oAuth1TokenStore = new Map();
exports.oAuth1TokenStore = oAuth1TokenStore;


/***/ }),

/***/ 77984:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.openidClient = openidClient;
var _openidClient = __webpack_require__(51966);
async function openidClient(options) {
    const provider = options.provider;
    if (provider.httpOptions) _openidClient.custom.setHttpOptionsDefaults(provider.httpOptions);
    let issuer;
    if (provider.wellKnown) {
        issuer = await _openidClient.Issuer.discover(provider.wellKnown);
    } else {
        var _provider$authorizati, _provider$token, _provider$userinfo;
        issuer = new _openidClient.Issuer({
            issuer: provider.issuer,
            authorization_endpoint: (_provider$authorizati = provider.authorization) === null || _provider$authorizati === void 0 ? void 0 : _provider$authorizati.url,
            token_endpoint: (_provider$token = provider.token) === null || _provider$token === void 0 ? void 0 : _provider$token.url,
            userinfo_endpoint: (_provider$userinfo = provider.userinfo) === null || _provider$userinfo === void 0 ? void 0 : _provider$userinfo.url,
            jwks_uri: provider.jwks_endpoint
        });
    }
    const client = new issuer.Client({
        client_id: provider.clientId,
        client_secret: provider.clientSecret,
        redirect_uris: [
            provider.callbackUrl
        ],
        ...provider.client
    }, provider.jwks);
    client[_openidClient.custom.clock_tolerance] = 10;
    return client;
}


/***/ }),

/***/ 18566:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = parseProviders;
var _merge = __webpack_require__(37461);
function parseProviders(params) {
    const { url , providerId  } = params;
    const providers = params.providers.map(({ options: userOptions , ...rest })=>{
        var _ref;
        if (rest.type === "oauth") {
            var _normalizedUserOption;
            const normalizedOptions = normalizeOAuthOptions(rest);
            const normalizedUserOptions = normalizeOAuthOptions(userOptions, true);
            const id = (_normalizedUserOption = normalizedUserOptions === null || normalizedUserOptions === void 0 ? void 0 : normalizedUserOptions.id) !== null && _normalizedUserOption !== void 0 ? _normalizedUserOption : rest.id;
            return (0, _merge.merge)(normalizedOptions, {
                ...normalizedUserOptions,
                signinUrl: `${url}/signin/${id}`,
                callbackUrl: `${url}/callback/${id}`
            });
        }
        const id = (_ref = userOptions === null || userOptions === void 0 ? void 0 : userOptions.id) !== null && _ref !== void 0 ? _ref : rest.id;
        return (0, _merge.merge)(rest, {
            ...userOptions,
            signinUrl: `${url}/signin/${id}`,
            callbackUrl: `${url}/callback/${id}`
        });
    });
    return {
        providers,
        provider: providers.find(({ id  })=>id === providerId)
    };
}
function normalizeOAuthOptions(oauthOptions, isUserOptions = false) {
    var _normalized$version;
    if (!oauthOptions) return;
    const normalized = Object.entries(oauthOptions).reduce((acc, [key, value])=>{
        if ([
            "authorization",
            "token",
            "userinfo"
        ].includes(key) && typeof value === "string") {
            var _url$searchParams;
            const url = new URL(value);
            acc[key] = {
                url: `${url.origin}${url.pathname}`,
                params: Object.fromEntries((_url$searchParams = url.searchParams) !== null && _url$searchParams !== void 0 ? _url$searchParams : [])
            };
        } else {
            acc[key] = value;
        }
        return acc;
    }, {});
    if (!isUserOptions && !((_normalized$version = normalized.version) !== null && _normalized$version !== void 0 && _normalized$version.startsWith("1."))) {
        var _ref2, _normalized$idToken, _normalized$wellKnown, _normalized$authoriza, _normalized$authoriza2, _normalized$authoriza3;
        normalized.idToken = Boolean((_ref2 = (_normalized$idToken = normalized.idToken) !== null && _normalized$idToken !== void 0 ? _normalized$idToken : (_normalized$wellKnown = normalized.wellKnown) === null || _normalized$wellKnown === void 0 ? void 0 : _normalized$wellKnown.includes("openid-configuration")) !== null && _ref2 !== void 0 ? _ref2 : (_normalized$authoriza = normalized.authorization) === null || _normalized$authoriza === void 0 ? void 0 : (_normalized$authoriza2 = _normalized$authoriza.params) === null || _normalized$authoriza2 === void 0 ? void 0 : (_normalized$authoriza3 = _normalized$authoriza2.scope) === null || _normalized$authoriza3 === void 0 ? void 0 : _normalized$authoriza3.includes("openid"));
        if (!normalized.checks) normalized.checks = [
            "state"
        ];
    }
    return normalized;
}


/***/ }),

/***/ 73005:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.createSecret = createSecret;
exports.fromDate = fromDate;
exports.hashToken = hashToken;
var _crypto = __webpack_require__(6113);
function fromDate(time, date = Date.now()) {
    return new Date(date + time * 1000);
}
function hashToken(token, options) {
    var _provider$secret;
    const { provider , secret  } = options;
    return (0, _crypto.createHash)("sha256").update(`${token}${(_provider$secret = provider.secret) !== null && _provider$secret !== void 0 ? _provider$secret : secret}`).digest("hex");
}
function createSecret(params) {
    var _authOptions$secret;
    const { authOptions , url  } = params;
    return (_authOptions$secret = authOptions.secret) !== null && _authOptions$secret !== void 0 ? _authOptions$secret : (0, _crypto.createHash)("sha256").update(JSON.stringify({
        ...url,
        ...authOptions
    })).digest("hex");
}


/***/ }),

/***/ 45548:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = ErrorPage;
var _preact = __webpack_require__(7228);
function ErrorPage(props) {
    var _errors$error$toLower;
    const { url , error ="default" , theme  } = props;
    const signinPageUrl = `${url}/signin`;
    const errors = {
        default: {
            status: 200,
            heading: "Error",
            message: (0, _preact.h)("p", null, (0, _preact.h)("a", {
                className: "site",
                href: url === null || url === void 0 ? void 0 : url.origin
            }, url === null || url === void 0 ? void 0 : url.host))
        },
        configuration: {
            status: 500,
            heading: "Server error",
            message: (0, _preact.h)("div", null, (0, _preact.h)("p", null, "There is a problem with the server configuration."), (0, _preact.h)("p", null, "Check the server logs for more information."))
        },
        accessdenied: {
            status: 403,
            heading: "Access Denied",
            message: (0, _preact.h)("div", null, (0, _preact.h)("p", null, "You do not have permission to sign in."), (0, _preact.h)("p", null, (0, _preact.h)("a", {
                className: "button",
                href: signinPageUrl
            }, "Sign in")))
        },
        verification: {
            status: 403,
            heading: "Unable to sign in",
            message: (0, _preact.h)("div", null, (0, _preact.h)("p", null, "The sign in link is no longer valid."), (0, _preact.h)("p", null, "It may have been used already or it may have expired.")),
            signin: (0, _preact.h)("p", null, (0, _preact.h)("a", {
                className: "button",
                href: signinPageUrl
            }, "Sign in"))
        }
    };
    const { status , heading , message , signin  } = (_errors$error$toLower = errors[error.toLowerCase()]) !== null && _errors$error$toLower !== void 0 ? _errors$error$toLower : errors.default;
    return {
        status,
        html: (0, _preact.h)("div", {
            className: "error"
        }, (theme === null || theme === void 0 ? void 0 : theme.brandColor) && (0, _preact.h)("style", {
            dangerouslySetInnerHTML: {
                __html: `
        :root {
          --brand-color: ${theme === null || theme === void 0 ? void 0 : theme.brandColor}
        }
      `
            }
        }), (0, _preact.h)("div", {
            className: "card"
        }, (theme === null || theme === void 0 ? void 0 : theme.logo) && (0, _preact.h)("img", {
            src: theme.logo,
            alt: "Logo",
            className: "logo"
        }), (0, _preact.h)("h1", null, heading), (0, _preact.h)("div", {
            className: "message"
        }, message), signin))
    };
}


/***/ }),

/***/ 53779:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _interopRequireDefault = __webpack_require__(6548);
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = renderPage;
var _preactRenderToString = _interopRequireDefault(__webpack_require__(21749));
var _signin = _interopRequireDefault(__webpack_require__(21043));
var _signout = _interopRequireDefault(__webpack_require__(41943));
var _verifyRequest = _interopRequireDefault(__webpack_require__(76116));
var _error = _interopRequireDefault(__webpack_require__(45548));
var _css = _interopRequireDefault(__webpack_require__(86108));
function renderPage(params) {
    const { url , theme , query , cookies  } = params;
    function send({ html , title , status  }) {
        var _theme$colorScheme;
        return {
            cookies,
            status,
            headers: [
                {
                    key: "Content-Type",
                    value: "text/html"
                }
            ],
            body: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${(0, _css.default)()}</style><title>${title}</title></head><body class="__next-auth-theme-${(_theme$colorScheme = theme === null || theme === void 0 ? void 0 : theme.colorScheme) !== null && _theme$colorScheme !== void 0 ? _theme$colorScheme : "auto"}"><div class="page">${(0, _preactRenderToString.default)(html)}</div></body></html>`
        };
    }
    return {
        signin (props) {
            return send({
                html: (0, _signin.default)({
                    csrfToken: params.csrfToken,
                    providers: params.providers,
                    callbackUrl: params.callbackUrl,
                    theme,
                    ...query,
                    ...props
                }),
                title: "Sign In"
            });
        },
        signout (props) {
            return send({
                html: (0, _signout.default)({
                    csrfToken: params.csrfToken,
                    url,
                    theme,
                    ...props
                }),
                title: "Sign Out"
            });
        },
        verifyRequest (props) {
            return send({
                html: (0, _verifyRequest.default)({
                    url,
                    theme,
                    ...props
                }),
                title: "Verify Request"
            });
        },
        error (props) {
            return send({
                ...(0, _error.default)({
                    url,
                    theme,
                    ...props
                }),
                title: "Error"
            });
        }
    };
}


/***/ }),

/***/ 21043:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _interopRequireDefault = __webpack_require__(6548);
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = SigninPage;
var _preact = __webpack_require__(7228);
var _extends2 = _interopRequireDefault(__webpack_require__(10952));
function SigninPage(props) {
    var _errors$errorType;
    const { csrfToken , providers , callbackUrl , theme , email , error: errorType  } = props;
    const providersToRender = providers.filter((provider)=>{
        if (provider.type === "oauth" || provider.type === "email") {
            return true;
        } else if (provider.type === "credentials" && provider.credentials) {
            return true;
        }
        return false;
    });
    if (typeof document !== "undefined" && theme.buttonText) {
        document.documentElement.style.setProperty("--button-text-color", theme.buttonText);
    }
    if (typeof document !== "undefined" && theme.brandColor) {
        document.documentElement.style.setProperty("--brand-color", theme.brandColor);
    }
    const errors = {
        Signin: "Try signing in with a different account.",
        OAuthSignin: "Try signing in with a different account.",
        OAuthCallback: "Try signing in with a different account.",
        OAuthCreateAccount: "Try signing in with a different account.",
        EmailCreateAccount: "Try signing in with a different account.",
        Callback: "Try signing in with a different account.",
        OAuthAccountNotLinked: "To confirm your identity, sign in with the same account you used originally.",
        EmailSignin: "The e-mail could not be sent.",
        CredentialsSignin: "Sign in failed. Check the details you provided are correct.",
        SessionRequired: "Please sign in to access this page.",
        default: "Unable to sign in."
    };
    const error = errorType && ((_errors$errorType = errors[errorType]) !== null && _errors$errorType !== void 0 ? _errors$errorType : errors.default);
    const logos = "https://authjs.dev/img/providers";
    return (0, _preact.h)("div", {
        className: "signin"
    }, theme.brandColor && (0, _preact.h)("style", {
        dangerouslySetInnerHTML: {
            __html: `
        :root {
          --brand-color: ${theme.brandColor}
        }
      `
        }
    }), theme.buttonText && (0, _preact.h)("style", {
        dangerouslySetInnerHTML: {
            __html: `
        :root {
          --button-text-color: ${theme.buttonText}
        }
      `
        }
    }), (0, _preact.h)("div", {
        className: "card"
    }, theme.logo && (0, _preact.h)("img", {
        src: theme.logo,
        alt: "Logo",
        className: "logo"
    }), error && (0, _preact.h)("div", {
        className: "error"
    }, (0, _preact.h)("p", null, error)), providersToRender.map((provider, i)=>{
        var _provider$style$bg, _provider$style, _provider$style$bgDar, _provider$style2, _provider$style$text, _provider$style3, _provider$style$textD, _provider$style4, _provider$style5, _provider$style6;
        return (0, _preact.h)("div", {
            key: provider.id,
            className: "provider"
        }, provider.type === "oauth" && (0, _preact.h)("form", {
            action: provider.signinUrl,
            method: "POST"
        }, (0, _preact.h)("input", {
            type: "hidden",
            name: "csrfToken",
            value: csrfToken
        }), callbackUrl && (0, _preact.h)("input", {
            type: "hidden",
            name: "callbackUrl",
            value: callbackUrl
        }), (0, _preact.h)("button", {
            type: "submit",
            className: "button",
            style: {
                "--provider-bg": (_provider$style$bg = (_provider$style = provider.style) === null || _provider$style === void 0 ? void 0 : _provider$style.bg) !== null && _provider$style$bg !== void 0 ? _provider$style$bg : "",
                "--provider-dark-bg": (_provider$style$bgDar = (_provider$style2 = provider.style) === null || _provider$style2 === void 0 ? void 0 : _provider$style2.bgDark) !== null && _provider$style$bgDar !== void 0 ? _provider$style$bgDar : "",
                "--provider-color": (_provider$style$text = (_provider$style3 = provider.style) === null || _provider$style3 === void 0 ? void 0 : _provider$style3.text) !== null && _provider$style$text !== void 0 ? _provider$style$text : "",
                "--provider-dark-color": (_provider$style$textD = (_provider$style4 = provider.style) === null || _provider$style4 === void 0 ? void 0 : _provider$style4.textDark) !== null && _provider$style$textD !== void 0 ? _provider$style$textD : ""
            }
        }, ((_provider$style5 = provider.style) === null || _provider$style5 === void 0 ? void 0 : _provider$style5.logo) && (0, _preact.h)("img", {
            loading: "lazy",
            height: 24,
            width: 24,
            id: "provider-logo",
            src: `${provider.style.logo.startsWith("/") ? logos : ""}${provider.style.logo}`
        }), ((_provider$style6 = provider.style) === null || _provider$style6 === void 0 ? void 0 : _provider$style6.logoDark) && (0, _preact.h)("img", {
            loading: "lazy",
            height: 24,
            width: 24,
            id: "provider-logo-dark",
            src: `${provider.style.logo.startsWith("/") ? logos : ""}${provider.style.logoDark}`
        }), (0, _preact.h)("span", null, "Sign in with ", provider.name))), (provider.type === "email" || provider.type === "credentials") && i > 0 && providersToRender[i - 1].type !== "email" && providersToRender[i - 1].type !== "credentials" && (0, _preact.h)("hr", null), provider.type === "email" && (0, _preact.h)("form", {
            action: provider.signinUrl,
            method: "POST"
        }, (0, _preact.h)("input", {
            type: "hidden",
            name: "csrfToken",
            value: csrfToken
        }), (0, _preact.h)("label", {
            className: "section-header",
            htmlFor: `input-email-for-${provider.id}-provider`
        }, "Email"), (0, _preact.h)("input", {
            id: `input-email-for-${provider.id}-provider`,
            autoFocus: true,
            type: "email",
            name: "email",
            value: email,
            placeholder: "email@example.com",
            required: true
        }), (0, _preact.h)("button", {
            id: "submitButton",
            type: "submit"
        }, "Sign in with ", provider.name)), provider.type === "credentials" && (0, _preact.h)("form", {
            action: provider.callbackUrl,
            method: "POST"
        }, (0, _preact.h)("input", {
            type: "hidden",
            name: "csrfToken",
            value: csrfToken
        }), Object.keys(provider.credentials).map((credential)=>{
            var _provider$credentials, _provider$credentials2, _provider$credentials3;
            return (0, _preact.h)("div", {
                key: `input-group-${provider.id}`
            }, (0, _preact.h)("label", {
                className: "section-header",
                htmlFor: `input-${credential}-for-${provider.id}-provider`
            }, (_provider$credentials = provider.credentials[credential].label) !== null && _provider$credentials !== void 0 ? _provider$credentials : credential), (0, _preact.h)("input", (0, _extends2.default)({
                name: credential,
                id: `input-${credential}-for-${provider.id}-provider`,
                type: (_provider$credentials2 = provider.credentials[credential].type) !== null && _provider$credentials2 !== void 0 ? _provider$credentials2 : "text",
                placeholder: (_provider$credentials3 = provider.credentials[credential].placeholder) !== null && _provider$credentials3 !== void 0 ? _provider$credentials3 : ""
            }, provider.credentials[credential])));
        }), (0, _preact.h)("button", {
            type: "submit"
        }, "Sign in with ", provider.name)), (provider.type === "email" || provider.type === "credentials") && i + 1 < providersToRender.length && (0, _preact.h)("hr", null));
    })));
}


/***/ }),

/***/ 41943:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = SignoutPage;
var _preact = __webpack_require__(7228);
function SignoutPage(props) {
    const { url , csrfToken , theme  } = props;
    return (0, _preact.h)("div", {
        className: "signout"
    }, theme.brandColor && (0, _preact.h)("style", {
        dangerouslySetInnerHTML: {
            __html: `
        :root {
          --brand-color: ${theme.brandColor}
        }
      `
        }
    }), theme.buttonText && (0, _preact.h)("style", {
        dangerouslySetInnerHTML: {
            __html: `
        :root {
          --button-text-color: ${theme.buttonText}
        }
      `
        }
    }), (0, _preact.h)("div", {
        className: "card"
    }, theme.logo && (0, _preact.h)("img", {
        src: theme.logo,
        alt: "Logo",
        className: "logo"
    }), (0, _preact.h)("h1", null, "Signout"), (0, _preact.h)("p", null, "Are you sure you want to sign out?"), (0, _preact.h)("form", {
        action: `${url}/signout`,
        method: "POST"
    }, (0, _preact.h)("input", {
        type: "hidden",
        name: "csrfToken",
        value: csrfToken
    }), (0, _preact.h)("button", {
        id: "submitButton",
        type: "submit"
    }, "Sign out"))));
}


/***/ }),

/***/ 76116:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = VerifyRequestPage;
var _preact = __webpack_require__(7228);
function VerifyRequestPage(props) {
    const { url , theme  } = props;
    return (0, _preact.h)("div", {
        className: "verify-request"
    }, theme.brandColor && (0, _preact.h)("style", {
        dangerouslySetInnerHTML: {
            __html: `
        :root {
          --brand-color: ${theme.brandColor}
        }
      `
        }
    }), (0, _preact.h)("div", {
        className: "card"
    }, theme.logo && (0, _preact.h)("img", {
        src: theme.logo,
        alt: "Logo",
        className: "logo"
    }), (0, _preact.h)("h1", null, "Check your email"), (0, _preact.h)("p", null, "A sign in link has been sent to your email address."), (0, _preact.h)("p", null, (0, _preact.h)("a", {
        className: "site",
        href: url.origin
    }, url.host))));
}


/***/ }),

/***/ 54259:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _interopRequireDefault = __webpack_require__(6548);
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = callback;
var _callback = _interopRequireDefault(__webpack_require__(9869));
var _callbackHandler = _interopRequireDefault(__webpack_require__(75249));
var _utils = __webpack_require__(73005);
var _getUserFromEmail = _interopRequireDefault(__webpack_require__(36111));
async function callback(params) {
    const { options , query , body , method , headers , sessionStore  } = params;
    const { provider , adapter , url , callbackUrl , pages , jwt , events , callbacks , session: { strategy: sessionStrategy , maxAge: sessionMaxAge  } , logger  } = options;
    const cookies = [];
    const useJwtSession = sessionStrategy === "jwt";
    if (provider.type === "oauth") {
        try {
            const { profile , account , OAuthProfile , cookies: oauthCookies  } = await (0, _callback.default)({
                query,
                body,
                method,
                options,
                cookies: params.cookies
            });
            if (oauthCookies.length) cookies.push(...oauthCookies);
            try {
                var _events$signIn;
                logger.debug("OAUTH_CALLBACK_RESPONSE", {
                    profile,
                    account,
                    OAuthProfile
                });
                if (!profile || !account || !OAuthProfile) {
                    return {
                        redirect: `${url}/signin`,
                        cookies
                    };
                }
                let userOrProfile = profile;
                if (adapter) {
                    const { getUserByAccount  } = adapter;
                    const userByAccount = await getUserByAccount({
                        providerAccountId: account.providerAccountId,
                        provider: provider.id
                    });
                    if (userByAccount) userOrProfile = userByAccount;
                }
                try {
                    const isAllowed = await callbacks.signIn({
                        user: userOrProfile,
                        account,
                        profile: OAuthProfile
                    });
                    if (!isAllowed) {
                        return {
                            redirect: `${url}/error?error=AccessDenied`,
                            cookies
                        };
                    } else if (typeof isAllowed === "string") {
                        return {
                            redirect: isAllowed,
                            cookies
                        };
                    }
                } catch (error) {
                    return {
                        redirect: `${url}/error?error=${encodeURIComponent(error.message)}`,
                        cookies
                    };
                }
                const { user , session , isNewUser  } = await (0, _callbackHandler.default)({
                    sessionToken: sessionStore.value,
                    profile,
                    account,
                    options
                });
                if (useJwtSession) {
                    var _user$id;
                    const defaultToken = {
                        name: user.name,
                        email: user.email,
                        picture: user.image,
                        sub: (_user$id = user.id) === null || _user$id === void 0 ? void 0 : _user$id.toString()
                    };
                    const token = await callbacks.jwt({
                        token: defaultToken,
                        user,
                        account,
                        profile: OAuthProfile,
                        isNewUser,
                        trigger: isNewUser ? "signUp" : "signIn"
                    });
                    const newToken = await jwt.encode({
                        ...jwt,
                        token
                    });
                    const cookieExpires = new Date();
                    cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
                    const sessionCookies = sessionStore.chunk(newToken, {
                        expires: cookieExpires
                    });
                    cookies.push(...sessionCookies);
                } else {
                    cookies.push({
                        name: options.cookies.sessionToken.name,
                        value: session.sessionToken,
                        options: {
                            ...options.cookies.sessionToken.options,
                            expires: session.expires
                        }
                    });
                }
                await ((_events$signIn = events.signIn) === null || _events$signIn === void 0 ? void 0 : _events$signIn.call(events, {
                    user,
                    account,
                    profile,
                    isNewUser
                }));
                if (isNewUser && pages.newUser) {
                    return {
                        redirect: `${pages.newUser}${pages.newUser.includes("?") ? "&" : "?"}callbackUrl=${encodeURIComponent(callbackUrl)}`,
                        cookies
                    };
                }
                return {
                    redirect: callbackUrl,
                    cookies
                };
            } catch (error) {
                if (error.name === "AccountNotLinkedError") {
                    return {
                        redirect: `${url}/error?error=OAuthAccountNotLinked`,
                        cookies
                    };
                } else if (error.name === "CreateUserError") {
                    return {
                        redirect: `${url}/error?error=OAuthCreateAccount`,
                        cookies
                    };
                }
                logger.error("OAUTH_CALLBACK_HANDLER_ERROR", error);
                return {
                    redirect: `${url}/error?error=Callback`,
                    cookies
                };
            }
        } catch (error) {
            if (error.name === "OAuthCallbackError") {
                logger.error("OAUTH_CALLBACK_ERROR", {
                    error: error,
                    providerId: provider.id
                });
                return {
                    redirect: `${url}/error?error=OAuthCallback`,
                    cookies
                };
            }
            logger.error("OAUTH_CALLBACK_ERROR", error);
            return {
                redirect: `${url}/error?error=Callback`,
                cookies
            };
        }
    } else if (provider.type === "email") {
        try {
            var _events$signIn2;
            const token = query === null || query === void 0 ? void 0 : query.token;
            const identifier = query === null || query === void 0 ? void 0 : query.email;
            if (!token || !identifier) {
                return {
                    redirect: `${url}/error?error=configuration`,
                    cookies
                };
            }
            const invite = await adapter.useVerificationToken({
                identifier,
                token: (0, _utils.hashToken)(token, options)
            });
            const invalidInvite = !invite || invite.expires.valueOf() < Date.now();
            if (invalidInvite) {
                return {
                    redirect: `${url}/error?error=Verification`,
                    cookies
                };
            }
            const profile = await (0, _getUserFromEmail.default)({
                email: identifier,
                adapter
            });
            const account = {
                providerAccountId: profile.email,
                type: "email",
                provider: provider.id
            };
            try {
                const signInCallbackResponse = await callbacks.signIn({
                    user: profile,
                    account
                });
                if (!signInCallbackResponse) {
                    return {
                        redirect: `${url}/error?error=AccessDenied`,
                        cookies
                    };
                } else if (typeof signInCallbackResponse === "string") {
                    return {
                        redirect: signInCallbackResponse,
                        cookies
                    };
                }
            } catch (error) {
                return {
                    redirect: `${url}/error?error=${encodeURIComponent(error.message)}`,
                    cookies
                };
            }
            const { user , session , isNewUser  } = await (0, _callbackHandler.default)({
                sessionToken: sessionStore.value,
                profile,
                account,
                options
            });
            if (useJwtSession) {
                var _user$id2;
                const defaultToken = {
                    name: user.name,
                    email: user.email,
                    picture: user.image,
                    sub: (_user$id2 = user.id) === null || _user$id2 === void 0 ? void 0 : _user$id2.toString()
                };
                const token = await callbacks.jwt({
                    token: defaultToken,
                    user,
                    account,
                    isNewUser,
                    trigger: isNewUser ? "signUp" : "signIn"
                });
                const newToken = await jwt.encode({
                    ...jwt,
                    token
                });
                const cookieExpires = new Date();
                cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
                const sessionCookies = sessionStore.chunk(newToken, {
                    expires: cookieExpires
                });
                cookies.push(...sessionCookies);
            } else {
                cookies.push({
                    name: options.cookies.sessionToken.name,
                    value: session.sessionToken,
                    options: {
                        ...options.cookies.sessionToken.options,
                        expires: session.expires
                    }
                });
            }
            await ((_events$signIn2 = events.signIn) === null || _events$signIn2 === void 0 ? void 0 : _events$signIn2.call(events, {
                user,
                account,
                isNewUser
            }));
            if (isNewUser && pages.newUser) {
                return {
                    redirect: `${pages.newUser}${pages.newUser.includes("?") ? "&" : "?"}callbackUrl=${encodeURIComponent(callbackUrl)}`,
                    cookies
                };
            }
            return {
                redirect: callbackUrl,
                cookies
            };
        } catch (error) {
            if (error.name === "CreateUserError") {
                return {
                    redirect: `${url}/error?error=EmailCreateAccount`,
                    cookies
                };
            }
            logger.error("CALLBACK_EMAIL_ERROR", error);
            return {
                redirect: `${url}/error?error=Callback`,
                cookies
            };
        }
    } else if (provider.type === "credentials" && method === "POST") {
        var _user$id3, _events$signIn3;
        const credentials = body;
        let user;
        try {
            user = await provider.authorize(credentials, {
                query,
                body,
                headers,
                method
            });
            if (!user) {
                return {
                    status: 401,
                    redirect: `${url}/error?${new URLSearchParams({
                        error: "CredentialsSignin",
                        provider: provider.id
                    })}`,
                    cookies
                };
            }
        } catch (error) {
            return {
                status: 401,
                redirect: `${url}/error?error=${encodeURIComponent(error.message)}`,
                cookies
            };
        }
        const account = {
            providerAccountId: user.id,
            type: "credentials",
            provider: provider.id
        };
        try {
            const isAllowed = await callbacks.signIn({
                user,
                account,
                credentials
            });
            if (!isAllowed) {
                return {
                    status: 403,
                    redirect: `${url}/error?error=AccessDenied`,
                    cookies
                };
            } else if (typeof isAllowed === "string") {
                return {
                    redirect: isAllowed,
                    cookies
                };
            }
        } catch (error) {
            return {
                redirect: `${url}/error?error=${encodeURIComponent(error.message)}`,
                cookies
            };
        }
        const defaultToken = {
            name: user.name,
            email: user.email,
            picture: user.image,
            sub: (_user$id3 = user.id) === null || _user$id3 === void 0 ? void 0 : _user$id3.toString()
        };
        const token = await callbacks.jwt({
            token: defaultToken,
            user,
            account,
            isNewUser: false,
            trigger: "signIn"
        });
        const newToken = await jwt.encode({
            ...jwt,
            token
        });
        const cookieExpires = new Date();
        cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
        const sessionCookies = sessionStore.chunk(newToken, {
            expires: cookieExpires
        });
        cookies.push(...sessionCookies);
        await ((_events$signIn3 = events.signIn) === null || _events$signIn3 === void 0 ? void 0 : _events$signIn3.call(events, {
            user,
            account
        }));
        return {
            redirect: callbackUrl,
            cookies
        };
    }
    return {
        status: 500,
        body: `Error: Callback for provider type ${provider.type} not supported`,
        cookies
    };
}


/***/ }),

/***/ 21632:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _interopRequireDefault = __webpack_require__(6548);
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "callback", ({
    enumerable: true,
    get: function() {
        return _callback.default;
    }
}));
Object.defineProperty(exports, "providers", ({
    enumerable: true,
    get: function() {
        return _providers.default;
    }
}));
Object.defineProperty(exports, "session", ({
    enumerable: true,
    get: function() {
        return _session.default;
    }
}));
Object.defineProperty(exports, "signin", ({
    enumerable: true,
    get: function() {
        return _signin.default;
    }
}));
Object.defineProperty(exports, "signout", ({
    enumerable: true,
    get: function() {
        return _signout.default;
    }
}));
var _callback = _interopRequireDefault(__webpack_require__(54259));
var _signin = _interopRequireDefault(__webpack_require__(69429));
var _signout = _interopRequireDefault(__webpack_require__(56202));
var _session = _interopRequireDefault(__webpack_require__(88789));
var _providers = _interopRequireDefault(__webpack_require__(91348));


/***/ }),

/***/ 91348:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = providers;
function providers(providers) {
    return {
        headers: [
            {
                key: "Content-Type",
                value: "application/json"
            }
        ],
        body: providers.reduce((acc, { id , name , type , signinUrl , callbackUrl  })=>{
            acc[id] = {
                id,
                name,
                type,
                signinUrl,
                callbackUrl
            };
            return acc;
        }, {})
    };
}


/***/ }),

/***/ 88789:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = session;
var _utils = __webpack_require__(73005);
async function session(params) {
    const { options , sessionStore , newSession , isUpdate  } = params;
    const { adapter , jwt , events , callbacks , logger , session: { strategy: sessionStrategy , maxAge: sessionMaxAge  }  } = options;
    const response = {
        body: {},
        headers: [
            {
                key: "Content-Type",
                value: "application/json"
            }
        ],
        cookies: []
    };
    const sessionToken = sessionStore.value;
    if (!sessionToken) return response;
    if (sessionStrategy === "jwt") {
        try {
            var _response$cookies, _events$session;
            const decodedToken = await jwt.decode({
                ...jwt,
                token: sessionToken
            });
            if (!decodedToken) throw new Error("JWT invalid");
            const token = await callbacks.jwt({
                token: decodedToken,
                ...isUpdate && {
                    trigger: "update"
                },
                session: newSession
            });
            const newExpires = (0, _utils.fromDate)(sessionMaxAge);
            const updatedSession = await callbacks.session({
                session: {
                    user: {
                        name: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.name,
                        email: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.email,
                        image: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.picture
                    },
                    expires: newExpires.toISOString()
                },
                token
            });
            response.body = updatedSession;
            const newToken = await jwt.encode({
                ...jwt,
                token,
                maxAge: options.session.maxAge
            });
            const sessionCookies = sessionStore.chunk(newToken, {
                expires: newExpires
            });
            (_response$cookies = response.cookies) === null || _response$cookies === void 0 ? void 0 : _response$cookies.push(...sessionCookies);
            await ((_events$session = events.session) === null || _events$session === void 0 ? void 0 : _events$session.call(events, {
                session: updatedSession,
                token
            }));
        } catch (error) {
            var _response$cookies2;
            logger.error("JWT_SESSION_ERROR", error);
            (_response$cookies2 = response.cookies) === null || _response$cookies2 === void 0 ? void 0 : _response$cookies2.push(...sessionStore.clean());
        }
    } else {
        try {
            const { getSessionAndUser , deleteSession , updateSession  } = adapter;
            let userAndSession = await getSessionAndUser(sessionToken);
            if (userAndSession && userAndSession.session.expires.valueOf() < Date.now()) {
                await deleteSession(sessionToken);
                userAndSession = null;
            }
            if (userAndSession) {
                var _response$cookies3, _events$session2;
                const { user , session  } = userAndSession;
                const sessionUpdateAge = options.session.updateAge;
                const sessionIsDueToBeUpdatedDate = session.expires.valueOf() - sessionMaxAge * 1000 + sessionUpdateAge * 1000;
                const newExpires = (0, _utils.fromDate)(sessionMaxAge);
                if (sessionIsDueToBeUpdatedDate <= Date.now()) {
                    await updateSession({
                        sessionToken,
                        expires: newExpires
                    });
                }
                const sessionPayload = await callbacks.session({
                    session: {
                        user: {
                            name: user.name,
                            email: user.email,
                            image: user.image
                        },
                        expires: session.expires.toISOString()
                    },
                    user,
                    newSession,
                    ...isUpdate ? {
                        trigger: "update"
                    } : {}
                });
                response.body = sessionPayload;
                (_response$cookies3 = response.cookies) === null || _response$cookies3 === void 0 ? void 0 : _response$cookies3.push({
                    name: options.cookies.sessionToken.name,
                    value: sessionToken,
                    options: {
                        ...options.cookies.sessionToken.options,
                        expires: newExpires
                    }
                });
                await ((_events$session2 = events.session) === null || _events$session2 === void 0 ? void 0 : _events$session2.call(events, {
                    session: sessionPayload
                }));
            } else if (sessionToken) {
                var _response$cookies4;
                (_response$cookies4 = response.cookies) === null || _response$cookies4 === void 0 ? void 0 : _response$cookies4.push(...sessionStore.clean());
            }
        } catch (error) {
            logger.error("SESSION_ERROR", error);
        }
    }
    return response;
}


/***/ }),

/***/ 69429:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _interopRequireDefault = __webpack_require__(6548);
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = signin;
var _authorizationUrl = _interopRequireDefault(__webpack_require__(16555));
var _signin = _interopRequireDefault(__webpack_require__(11705));
var _getUserFromEmail = _interopRequireDefault(__webpack_require__(36111));
async function signin(params) {
    const { options , query , body  } = params;
    const { url , callbacks , logger , provider  } = options;
    if (!provider.type) {
        return {
            status: 500,
            text: `Error: Type not specified for ${provider.name}`
        };
    }
    if (provider.type === "oauth") {
        try {
            const response = await (0, _authorizationUrl.default)({
                options,
                query
            });
            return response;
        } catch (error) {
            logger.error("SIGNIN_OAUTH_ERROR", {
                error: error,
                providerId: provider.id
            });
            return {
                redirect: `${url}/error?error=OAuthSignin`
            };
        }
    } else if (provider.type === "email") {
        var _provider$normalizeId;
        let email = body === null || body === void 0 ? void 0 : body.email;
        if (!email) return {
            redirect: `${url}/error?error=EmailSignin`
        };
        const normalizer = (_provider$normalizeId = provider.normalizeIdentifier) !== null && _provider$normalizeId !== void 0 ? _provider$normalizeId : (identifier)=>{
            let [local, domain] = identifier.toLowerCase().trim().split("@");
            domain = domain.split(",")[0];
            return `${local}@${domain}`;
        };
        try {
            email = normalizer(body === null || body === void 0 ? void 0 : body.email);
        } catch (error) {
            logger.error("SIGNIN_EMAIL_ERROR", {
                error,
                providerId: provider.id
            });
            return {
                redirect: `${url}/error?error=EmailSignin`
            };
        }
        const user = await (0, _getUserFromEmail.default)({
            email,
            adapter: options.adapter
        });
        const account = {
            providerAccountId: email,
            userId: email,
            type: "email",
            provider: provider.id
        };
        try {
            const signInCallbackResponse = await callbacks.signIn({
                user,
                account,
                email: {
                    verificationRequest: true
                }
            });
            if (!signInCallbackResponse) {
                return {
                    redirect: `${url}/error?error=AccessDenied`
                };
            } else if (typeof signInCallbackResponse === "string") {
                return {
                    redirect: signInCallbackResponse
                };
            }
        } catch (error) {
            return {
                redirect: `${url}/error?${new URLSearchParams({
                    error: error
                })}`
            };
        }
        try {
            const redirect = await (0, _signin.default)(email, options);
            return {
                redirect
            };
        } catch (error) {
            logger.error("SIGNIN_EMAIL_ERROR", {
                error,
                providerId: provider.id
            });
            return {
                redirect: `${url}/error?error=EmailSignin`
            };
        }
    }
    return {
        redirect: `${url}/signin`
    };
}


/***/ }),

/***/ 56202:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = signout;
async function signout(params) {
    const { options , sessionStore  } = params;
    const { adapter , events , jwt , callbackUrl , logger , session  } = options;
    const sessionToken = sessionStore === null || sessionStore === void 0 ? void 0 : sessionStore.value;
    if (!sessionToken) {
        return {
            redirect: callbackUrl
        };
    }
    if (session.strategy === "jwt") {
        try {
            var _events$signOut;
            const decodedJwt = await jwt.decode({
                ...jwt,
                token: sessionToken
            });
            await ((_events$signOut = events.signOut) === null || _events$signOut === void 0 ? void 0 : _events$signOut.call(events, {
                token: decodedJwt
            }));
        } catch (error) {
            logger.error("SIGNOUT_ERROR", error);
        }
    } else {
        try {
            var _events$signOut2;
            const session = await adapter.deleteSession(sessionToken);
            await ((_events$signOut2 = events.signOut) === null || _events$signOut2 === void 0 ? void 0 : _events$signOut2.call(events, {
                session
            }));
        } catch (error) {
            logger.error("SIGNOUT_ERROR", error);
        }
    }
    const sessionCookies = sessionStore.clean();
    return {
        redirect: callbackUrl,
        cookies: sessionCookies
    };
}


/***/ }),

/***/ 61040:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));


/***/ }),

/***/ 86108:
/***/ ((module) => {

"use strict";

module.exports = function() {
    return ':root{--border-width:1px;--border-radius:0.5rem;--color-error:#c94b4b;--color-info:#157efb;--color-info-text:#fff}.__next-auth-theme-auto,.__next-auth-theme-light{--color-background:#ececec;--color-background-card:#fff;--color-text:#000;--color-primary:#444;--color-control-border:#bbb;--color-button-active-background:#f9f9f9;--color-button-active-border:#aaa;--color-seperator:#ccc}.__next-auth-theme-dark{--color-background:#161b22;--color-background-card:#0d1117;--color-text:#fff;--color-primary:#ccc;--color-control-border:#555;--color-button-active-background:#060606;--color-button-active-border:#666;--color-seperator:#444}@media (prefers-color-scheme:dark){.__next-auth-theme-auto{--color-background:#161b22;--color-background-card:#0d1117;--color-text:#fff;--color-primary:#ccc;--color-control-border:#555;--color-button-active-background:#060606;--color-button-active-border:#666;--color-seperator:#444}}body{background-color:var(--color-background);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;margin:0;padding:0}h1{font-weight:400;margin-bottom:1.5rem;padding:0 1rem}h1,p{color:var(--color-text)}form{margin:0;padding:0}label{font-weight:500;margin-bottom:.25rem;text-align:left}input[type],label{color:var(--color-text);display:block}input[type]{background:var(--color-background-card);border:var(--border-width) solid var(--color-control-border);border-radius:var(--border-radius);box-sizing:border-box;font-size:1rem;padding:.5rem 1rem;width:100%}input[type]:focus{box-shadow:none}p{font-size:1.1rem;line-height:2rem;margin:0 0 1.5rem;padding:0 1rem}a.button{line-height:1rem;text-decoration:none}a.button:link,a.button:visited{background-color:var(--color-background);color:var(--color-primary)}button span{flex-grow:1}a.button,button{align-items:center;background-color:var(--provider-bg,var(--color-background-card));border-color:rgba(0,0,0,.1);border-radius:var(--border-radius);color:var(--provider-color,var(--color-primary));display:flex;font-size:1.1rem;font-weight:500;justify-content:center;margin:0 0 .75rem;min-height:62px;padding:.75rem 1rem;position:relative;transition:all .1s ease-in-out}@media (max-width:450px){a.button,button{font-size:.9rem}}a.button:active,a.button:hover,button:active,button:hover{cursor:pointer}a.button #provider-logo,button #provider-logo{display:block;width:25px}a.button #provider-logo-dark,button #provider-logo-dark{display:none}#submitButton{background-color:var(--brand-color,var(--color-info));color:var(--button-text-color,var(--color-info-text));width:100%}@media (prefers-color-scheme:dark){a.button,button{background-color:var(--provider-dark-bg,var(--color-background));color:var(--provider-dark-color,var(--color-primary))}#provider-logo{display:none!important}#provider-logo-dark{display:block!important;width:25px}}a.site{color:var(--color-primary);font-size:1rem;line-height:2rem;text-decoration:none}a.site:hover{text-decoration:underline}.page{display:grid;height:100%;margin:0;padding:0;place-items:center;position:absolute;width:100%}.page>div{text-align:center}.error a.button{display:inline-block;margin-top:.5rem;padding-left:2rem;padding-right:2rem}.error .message{margin-bottom:1.5rem}.signin input[type=text]{display:block;margin-left:auto;margin-right:auto}.signin hr{border:0;border-top:1px solid var(--color-seperator);display:block;margin:2rem auto 1rem;overflow:visible}.signin hr:before{background:var(--color-background-card);color:#888;content:"or";padding:0 .4rem;position:relative;top:-.7rem}.signin .error{background:#f5f5f5;background:var(--color-error);border-radius:.3rem;font-weight:500}.signin .error p{color:var(--color-info-text);font-size:.9rem;line-height:1.2rem;padding:.5rem 1rem;text-align:left}.signin form,.signin>div{display:block}.signin form input[type],.signin>div input[type]{margin-bottom:.5rem}.signin form button,.signin>div button{width:100%}.signin form,.signin>div{max-width:300px}.logo{display:inline-block;margin-bottom:25px;margin-top:20px;max-height:70px;max-width:150px}@media screen and (min-width:450px){.card{width:350px}}@media screen and (max-width:450px){.card{width:200px}}.card{background-color:var(--color-background-card);border-radius:30px;margin:20px 0;padding:20px 50px}.card .header{color:var(--color-primary)}.section-header{color:var(--color-text)}';
};


/***/ }),

/***/ 88354:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var _exportNames = {};
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return _next.default;
    }
}));
var _types = __webpack_require__(61040);
Object.keys(_types).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _types[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _types[key];
        }
    });
});
var _next = _interopRequireWildcard(__webpack_require__(91071));
Object.keys(_next).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _next[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _next[key];
        }
    });
});
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}


/***/ }),

/***/ 91071:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = void 0;
exports.getServerSession = getServerSession;
exports.unstable_getServerSession = unstable_getServerSession;
var _core = __webpack_require__(26565);
var _utils = __webpack_require__(79534);
async function NextAuthApiHandler(req, res, options) {
    var _options$secret, _options$jwt$secret, _options$jwt, _ref, _handler$status, _handler$cookies, _handler$headers;
    const { nextauth , ...query } = req.query;
    (_options$secret = options.secret) !== null && _options$secret !== void 0 ? _options$secret : options.secret = (_options$jwt$secret = (_options$jwt = options.jwt) === null || _options$jwt === void 0 ? void 0 : _options$jwt.secret) !== null && _options$jwt$secret !== void 0 ? _options$jwt$secret : process.env.NEXTAUTH_SECRET;
    const handler = await (0, _core.AuthHandler)({
        req: {
            body: req.body,
            query,
            cookies: req.cookies,
            headers: req.headers,
            method: req.method,
            action: nextauth === null || nextauth === void 0 ? void 0 : nextauth[0],
            providerId: nextauth === null || nextauth === void 0 ? void 0 : nextauth[1],
            error: (_ref = req.query.error) !== null && _ref !== void 0 ? _ref : nextauth === null || nextauth === void 0 ? void 0 : nextauth[1]
        },
        options
    });
    res.status((_handler$status = handler.status) !== null && _handler$status !== void 0 ? _handler$status : 200);
    (_handler$cookies = handler.cookies) === null || _handler$cookies === void 0 ? void 0 : _handler$cookies.forEach((cookie)=>(0, _utils.setCookie)(res, cookie));
    (_handler$headers = handler.headers) === null || _handler$headers === void 0 ? void 0 : _handler$headers.forEach((h)=>res.setHeader(h.key, h.value));
    if (handler.redirect) {
        var _req$body;
        if (((_req$body = req.body) === null || _req$body === void 0 ? void 0 : _req$body.json) !== "true") {
            res.status(302).setHeader("Location", handler.redirect);
            return res.end();
        }
        return res.json({
            url: handler.redirect
        });
    }
    return res.send(handler.body);
}
async function NextAuthRouteHandler(req, context, options) {
    var _options$secret2, _context$params, _query$error;
    (_options$secret2 = options.secret) !== null && _options$secret2 !== void 0 ? _options$secret2 : options.secret = process.env.NEXTAUTH_SECRET;
    const { headers , cookies  } = __webpack_require__(68558);
    const nextauth = (_context$params = context.params) === null || _context$params === void 0 ? void 0 : _context$params.nextauth;
    const query = Object.fromEntries(req.nextUrl.searchParams);
    const body = await (0, _utils.getBody)(req);
    const internalResponse = await (0, _core.AuthHandler)({
        req: {
            body,
            query,
            cookies: Object.fromEntries(cookies().getAll().map((c)=>[
                    c.name,
                    c.value
                ])),
            headers: Object.fromEntries(headers()),
            method: req.method,
            action: nextauth === null || nextauth === void 0 ? void 0 : nextauth[0],
            providerId: nextauth === null || nextauth === void 0 ? void 0 : nextauth[1],
            error: (_query$error = query.error) !== null && _query$error !== void 0 ? _query$error : nextauth === null || nextauth === void 0 ? void 0 : nextauth[1]
        },
        options
    });
    const response = (0, _utils.toResponse)(internalResponse);
    const redirect = response.headers.get("Location");
    if ((body === null || body === void 0 ? void 0 : body.json) === "true" && redirect) {
        response.headers.delete("Location");
        response.headers.set("Content-Type", "application/json");
        return new Response(JSON.stringify({
            url: redirect
        }), {
            headers: response.headers
        });
    }
    return response;
}
function NextAuth(...args) {
    var _args$;
    if (args.length === 1) {
        return async (req, res)=>{
            if (res !== null && res !== void 0 && res.params) {
                return await NextAuthRouteHandler(req, res, args[0]);
            }
            return await NextAuthApiHandler(req, res, args[0]);
        };
    }
    if ((_args$ = args[1]) !== null && _args$ !== void 0 && _args$.params) {
        return NextAuthRouteHandler(...args);
    }
    return NextAuthApiHandler(...args);
}
var _default = NextAuth;
exports["default"] = _default;
let experimentalRSCWarningShown = false;
async function getServerSession(...args) {
    var _options, _options$secret3;
    const isRSC = args.length === 0 || args.length === 1;
    if (!experimentalRSCWarningShown && isRSC && "production" !== "production") {}
    let req, res, options;
    if (isRSC) {
        options = Object.assign({}, args[0], {
            providers: []
        });
        const { headers , cookies  } = __webpack_require__(68558);
        req = {
            headers: Object.fromEntries(headers()),
            cookies: Object.fromEntries(cookies().getAll().map((c)=>[
                    c.name,
                    c.value
                ]))
        };
        res = {
            getHeader () {},
            setCookie () {},
            setHeader () {}
        };
    } else {
        req = args[0];
        res = args[1];
        options = Object.assign({}, args[2], {
            providers: []
        });
    }
    (_options$secret3 = (_options = options).secret) !== null && _options$secret3 !== void 0 ? _options$secret3 : _options.secret = process.env.NEXTAUTH_SECRET;
    const session = await (0, _core.AuthHandler)({
        options,
        req: {
            action: "session",
            method: "GET",
            cookies: req.cookies,
            headers: req.headers
        }
    });
    const { body , cookies , status =200  } = session;
    cookies === null || cookies === void 0 ? void 0 : cookies.forEach((cookie)=>(0, _utils.setCookie)(res, cookie));
    if (body && typeof body !== "string" && Object.keys(body).length) {
        if (status === 200) {
            if (isRSC) delete body.expires;
            return body;
        }
        throw new Error(body.message);
    }
    return null;
}
let deprecatedWarningShown = false;
async function unstable_getServerSession(...args) {
    if (!deprecatedWarningShown && "production" !== "production") {}
    return await getServerSession(...args);
}


/***/ }),

/***/ 79534:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getBody = getBody;
exports.setCookie = setCookie;
exports.toResponse = toResponse;
var _cookie = __webpack_require__(13753);
function setCookie(res, cookie) {
    var _res$getHeader;
    let setCookieHeader = (_res$getHeader = res.getHeader("Set-Cookie")) !== null && _res$getHeader !== void 0 ? _res$getHeader : [];
    if (!Array.isArray(setCookieHeader)) {
        setCookieHeader = [
            setCookieHeader
        ];
    }
    const { name , value , options  } = cookie;
    const cookieHeader = (0, _cookie.serialize)(name, value, options);
    setCookieHeader.push(cookieHeader);
    res.setHeader("Set-Cookie", setCookieHeader);
}
async function getBody(req) {
    if (!("body" in req) || !req.body || req.method !== "POST") return;
    const contentType = req.headers.get("content-type");
    if (contentType !== null && contentType !== void 0 && contentType.includes("application/json")) {
        return await req.json();
    } else if (contentType !== null && contentType !== void 0 && contentType.includes("application/x-www-form-urlencoded")) {
        const params = new URLSearchParams(await req.text());
        return Object.fromEntries(params);
    }
}
function toResponse(res) {
    var _res$headers, _res$cookies, _res$status;
    const headers = new Headers((_res$headers = res.headers) === null || _res$headers === void 0 ? void 0 : _res$headers.reduce((acc, { key , value  })=>{
        acc[key] = value;
        return acc;
    }, {}));
    (_res$cookies = res.cookies) === null || _res$cookies === void 0 ? void 0 : _res$cookies.forEach((cookie)=>{
        const { name , value , options  } = cookie;
        const cookieHeader = (0, _cookie.serialize)(name, value, options);
        if (headers.has("Set-Cookie")) headers.append("Set-Cookie", cookieHeader);
        else headers.set("Set-Cookie", cookieHeader);
    });
    let body = res.body;
    if (headers.get("content-type") === "application/json") body = JSON.stringify(res.body);
    else if (headers.get("content-type") === "application/x-www-form-urlencoded") body = new URLSearchParams(res.body).toString();
    const status = res.redirect ? 302 : (_res$status = res.status) !== null && _res$status !== void 0 ? _res$status : 200;
    const response = new Response(body, {
        headers,
        status
    });
    if (res.redirect) response.headers.set("Location", res.redirect);
    return response;
}


/***/ }),

/***/ 28337:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.detectOrigin = detectOrigin;
function detectOrigin(forwardedHost, protocol) {
    var _process$env$VERCEL;
    if ((_process$env$VERCEL = process.env.VERCEL) !== null && _process$env$VERCEL !== void 0 ? _process$env$VERCEL : process.env.AUTH_TRUST_HOST) return `${protocol === "http" ? "http" : "https"}://${forwardedHost}`;
    return process.env.NEXTAUTH_URL;
}


/***/ }),

/***/ 45663:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _interopRequireDefault = __webpack_require__(6548);
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = void 0;
exports.proxyLogger = proxyLogger;
exports.setLogger = setLogger;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(41659));
var _errors = __webpack_require__(54941);
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), !0).forEach(function(key) {
            (0, _defineProperty2.default)(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function formatError(o) {
    if (o instanceof Error && !(o instanceof _errors.UnknownError)) {
        return {
            message: o.message,
            stack: o.stack,
            name: o.name
        };
    }
    if (hasErrorProperty(o)) {
        var _o$message;
        o.error = formatError(o.error);
        o.message = (_o$message = o.message) !== null && _o$message !== void 0 ? _o$message : o.error.message;
    }
    return o;
}
function hasErrorProperty(x) {
    return !!(x !== null && x !== void 0 && x.error);
}
var _logger = {
    error: function error(code, metadata) {
        metadata = formatError(metadata);
        console.error("[next-auth][error][".concat(code, "]"), "\nhttps://next-auth.js.org/errors#".concat(code.toLowerCase()), metadata.message, metadata);
    },
    warn: function warn(code) {
        console.warn("[next-auth][warn][".concat(code, "]"), "\nhttps://next-auth.js.org/warnings#".concat(code.toLowerCase()));
    },
    debug: function debug(code, metadata) {
        console.log("[next-auth][debug][".concat(code, "]"), metadata);
    }
};
function setLogger() {
    var newLogger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var debug = arguments.length > 1 ? arguments[1] : undefined;
    if (!debug) _logger.debug = function() {};
    if (newLogger.error) _logger.error = newLogger.error;
    if (newLogger.warn) _logger.warn = newLogger.warn;
    if (newLogger.debug) _logger.debug = newLogger.debug;
}
var _default = _logger;
exports["default"] = _default;
function proxyLogger() {
    var logger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _logger;
    var basePath = arguments.length > 1 ? arguments[1] : undefined;
    try {
        if (true) {
            return logger;
        }
        var clientLogger = {};
        var _loop = function _loop(level) {
            clientLogger[level] = function(code, metadata) {
                _logger[level](code, metadata);
                if (level === "error") {
                    metadata = formatError(metadata);
                }
                ;
                metadata.client = true;
                var url = "".concat(basePath, "/_log");
                var body = new URLSearchParams(_objectSpread({
                    level: level,
                    code: code
                }, metadata));
                if (navigator.sendBeacon) {
                    return navigator.sendBeacon(url, body);
                }
                return fetch(url, {
                    method: "POST",
                    body: body,
                    keepalive: true
                });
            };
        };
        for(var level in logger){
            _loop(level);
        }
        return clientLogger;
    } catch (_unused) {
        return _logger;
    }
}


/***/ }),

/***/ 37461:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.merge = merge;
function isObject(item) {
    return item && typeof item === "object" && !Array.isArray(item);
}
function merge(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for(const key in source){
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, {
                    [key]: {}
                });
                merge(target[key], source[key]);
            } else {
                Object.assign(target, {
                    [key]: source[key]
                });
            }
        }
    }
    return merge(target, ...sources);
}


/***/ }),

/***/ 30323:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = parseUrl;
function parseUrl(url) {
    var _url2;
    const defaultUrl = new URL("http://localhost:3000/api/auth");
    if (url && !url.startsWith("http")) {
        url = `https://${url}`;
    }
    const _url = new URL((_url2 = url) !== null && _url2 !== void 0 ? _url2 : defaultUrl);
    const path = (_url.pathname === "/" ? defaultUrl.pathname : _url.pathname).replace(/\/$/, "");
    const base = `${_url.origin}${path}`;
    return {
        origin: _url.origin,
        host: _url.host,
        path,
        base,
        toString: ()=>base
    };
}


/***/ }),

/***/ 68558:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = __webpack_require__(904);


/***/ }),

/***/ 5921:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

exports.OAuth = __webpack_require__(57658).OAuth;
exports.OAuthEcho = __webpack_require__(57658).OAuthEcho;
exports.OAuth2 = __webpack_require__(64205).OAuth2;


/***/ }),

/***/ 2606:
/***/ ((module) => {

"use strict";
// Returns true if this is a host that closes *before* it ends?!?!

module.exports.isAnEarlyCloseHost = function(hostName) {
    return hostName && hostName.match(".*google(apis)?.com$");
};


/***/ }),

/***/ 57658:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var crypto = __webpack_require__(6113), sha1 = __webpack_require__(64375), http = __webpack_require__(13685), https = __webpack_require__(95687), URL = __webpack_require__(57310), querystring = __webpack_require__(63477), OAuthUtils = __webpack_require__(2606);
exports.OAuth = function(requestUrl, accessUrl, consumerKey, consumerSecret, version, authorize_callback, signatureMethod, nonceSize, customHeaders) {
    this._isEcho = false;
    this._requestUrl = requestUrl;
    this._accessUrl = accessUrl;
    this._consumerKey = consumerKey;
    this._consumerSecret = this._encodeData(consumerSecret);
    if (signatureMethod == "RSA-SHA1") {
        this._privateKey = consumerSecret;
    }
    this._version = version;
    if (authorize_callback === undefined) {
        this._authorize_callback = "oob";
    } else {
        this._authorize_callback = authorize_callback;
    }
    if (signatureMethod != "PLAINTEXT" && signatureMethod != "HMAC-SHA1" && signatureMethod != "RSA-SHA1") throw new Error("Un-supported signature method: " + signatureMethod);
    this._signatureMethod = signatureMethod;
    this._nonceSize = nonceSize || 32;
    this._headers = customHeaders || {
        "Accept": "*/*",
        "Connection": "close",
        "User-Agent": "Node authentication"
    };
    this._clientOptions = this._defaultClientOptions = {
        "requestTokenHttpMethod": "POST",
        "accessTokenHttpMethod": "POST",
        "followRedirects": true
    };
    this._oauthParameterSeperator = ",";
};
exports.OAuthEcho = function(realm, verify_credentials, consumerKey, consumerSecret, version, signatureMethod, nonceSize, customHeaders) {
    this._isEcho = true;
    this._realm = realm;
    this._verifyCredentials = verify_credentials;
    this._consumerKey = consumerKey;
    this._consumerSecret = this._encodeData(consumerSecret);
    if (signatureMethod == "RSA-SHA1") {
        this._privateKey = consumerSecret;
    }
    this._version = version;
    if (signatureMethod != "PLAINTEXT" && signatureMethod != "HMAC-SHA1" && signatureMethod != "RSA-SHA1") throw new Error("Un-supported signature method: " + signatureMethod);
    this._signatureMethod = signatureMethod;
    this._nonceSize = nonceSize || 32;
    this._headers = customHeaders || {
        "Accept": "*/*",
        "Connection": "close",
        "User-Agent": "Node authentication"
    };
    this._oauthParameterSeperator = ",";
};
exports.OAuthEcho.prototype = exports.OAuth.prototype;
exports.OAuth.prototype._getTimestamp = function() {
    return Math.floor(new Date().getTime() / 1000);
};
exports.OAuth.prototype._encodeData = function(toEncode) {
    if (toEncode == null || toEncode == "") return "";
    else {
        var result = encodeURIComponent(toEncode);
        // Fix the mismatch between OAuth's  RFC3986's and Javascript's beliefs in what is right and wrong ;)
        return result.replace(/\!/g, "%21").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A");
    }
};
exports.OAuth.prototype._decodeData = function(toDecode) {
    if (toDecode != null) {
        toDecode = toDecode.replace(/\+/g, " ");
    }
    return decodeURIComponent(toDecode);
};
exports.OAuth.prototype._getSignature = function(method, url, parameters, tokenSecret) {
    var signatureBase = this._createSignatureBase(method, url, parameters);
    return this._createSignature(signatureBase, tokenSecret);
};
exports.OAuth.prototype._normalizeUrl = function(url) {
    var parsedUrl = URL.parse(url, true);
    var port = "";
    if (parsedUrl.port) {
        if (parsedUrl.protocol == "http:" && parsedUrl.port != "80" || parsedUrl.protocol == "https:" && parsedUrl.port != "443") {
            port = ":" + parsedUrl.port;
        }
    }
    if (!parsedUrl.pathname || parsedUrl.pathname == "") parsedUrl.pathname = "/";
    return parsedUrl.protocol + "//" + parsedUrl.hostname + port + parsedUrl.pathname;
};
// Is the parameter considered an OAuth parameter
exports.OAuth.prototype._isParameterNameAnOAuthParameter = function(parameter) {
    var m = parameter.match("^oauth_");
    if (m && m[0] === "oauth_") {
        return true;
    } else {
        return false;
    }
};
// build the OAuth request authorization header
exports.OAuth.prototype._buildAuthorizationHeaders = function(orderedParameters) {
    var authHeader = "OAuth ";
    if (this._isEcho) {
        authHeader += 'realm="' + this._realm + '",';
    }
    for(var i = 0; i < orderedParameters.length; i++){
        // Whilst the all the parameters should be included within the signature, only the oauth_ arguments
        // should appear within the authorization header.
        if (this._isParameterNameAnOAuthParameter(orderedParameters[i][0])) {
            authHeader += "" + this._encodeData(orderedParameters[i][0]) + '="' + this._encodeData(orderedParameters[i][1]) + '"' + this._oauthParameterSeperator;
        }
    }
    authHeader = authHeader.substring(0, authHeader.length - this._oauthParameterSeperator.length);
    return authHeader;
};
// Takes an object literal that represents the arguments, and returns an array
// of argument/value pairs.
exports.OAuth.prototype._makeArrayOfArgumentsHash = function(argumentsHash) {
    var argument_pairs = [];
    for(var key in argumentsHash){
        if (argumentsHash.hasOwnProperty(key)) {
            var value = argumentsHash[key];
            if (Array.isArray(value)) {
                for(var i = 0; i < value.length; i++){
                    argument_pairs[argument_pairs.length] = [
                        key,
                        value[i]
                    ];
                }
            } else {
                argument_pairs[argument_pairs.length] = [
                    key,
                    value
                ];
            }
        }
    }
    return argument_pairs;
};
// Sorts the encoded key value pairs by encoded name, then encoded value
exports.OAuth.prototype._sortRequestParams = function(argument_pairs) {
    // Sort by name, then value.
    argument_pairs.sort(function(a, b) {
        if (a[0] == b[0]) {
            return a[1] < b[1] ? -1 : 1;
        } else return a[0] < b[0] ? -1 : 1;
    });
    return argument_pairs;
};
exports.OAuth.prototype._normaliseRequestParams = function(args) {
    var argument_pairs = this._makeArrayOfArgumentsHash(args);
    // First encode them #3.4.1.3.2 .1
    for(var i = 0; i < argument_pairs.length; i++){
        argument_pairs[i][0] = this._encodeData(argument_pairs[i][0]);
        argument_pairs[i][1] = this._encodeData(argument_pairs[i][1]);
    }
    // Then sort them #3.4.1.3.2 .2
    argument_pairs = this._sortRequestParams(argument_pairs);
    // Then concatenate together #3.4.1.3.2 .3 & .4
    var args = "";
    for(var i = 0; i < argument_pairs.length; i++){
        args += argument_pairs[i][0];
        args += "=";
        args += argument_pairs[i][1];
        if (i < argument_pairs.length - 1) args += "&";
    }
    return args;
};
exports.OAuth.prototype._createSignatureBase = function(method, url, parameters) {
    url = this._encodeData(this._normalizeUrl(url));
    parameters = this._encodeData(parameters);
    return method.toUpperCase() + "&" + url + "&" + parameters;
};
exports.OAuth.prototype._createSignature = function(signatureBase, tokenSecret) {
    if (tokenSecret === undefined) var tokenSecret = "";
    else tokenSecret = this._encodeData(tokenSecret);
    // consumerSecret is already encoded
    var key = this._consumerSecret + "&" + tokenSecret;
    var hash = "";
    if (this._signatureMethod == "PLAINTEXT") {
        hash = key;
    } else if (this._signatureMethod == "RSA-SHA1") {
        key = this._privateKey || "";
        hash = crypto.createSign("RSA-SHA1").update(signatureBase).sign(key, "base64");
    } else {
        if (crypto.Hmac) {
            hash = crypto.createHmac("sha1", key).update(signatureBase).digest("base64");
        } else {
            hash = sha1.HMACSHA1(key, signatureBase);
        }
    }
    return hash;
};
exports.OAuth.prototype.NONCE_CHARS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
];
exports.OAuth.prototype._getNonce = function(nonceSize) {
    var result = [];
    var chars = this.NONCE_CHARS;
    var char_pos;
    var nonce_chars_length = chars.length;
    for(var i = 0; i < nonceSize; i++){
        char_pos = Math.floor(Math.random() * nonce_chars_length);
        result[i] = chars[char_pos];
    }
    return result.join("");
};
exports.OAuth.prototype._createClient = function(port, hostname, method, path, headers, sslEnabled) {
    var options = {
        host: hostname,
        port: port,
        path: path,
        method: method,
        headers: headers
    };
    var httpModel;
    if (sslEnabled) {
        httpModel = https;
    } else {
        httpModel = http;
    }
    return httpModel.request(options);
};
exports.OAuth.prototype._prepareParameters = function(oauth_token, oauth_token_secret, method, url, extra_params) {
    var oauthParameters = {
        "oauth_timestamp": this._getTimestamp(),
        "oauth_nonce": this._getNonce(this._nonceSize),
        "oauth_version": this._version,
        "oauth_signature_method": this._signatureMethod,
        "oauth_consumer_key": this._consumerKey
    };
    if (oauth_token) {
        oauthParameters["oauth_token"] = oauth_token;
    }
    var sig;
    if (this._isEcho) {
        sig = this._getSignature("GET", this._verifyCredentials, this._normaliseRequestParams(oauthParameters), oauth_token_secret);
    } else {
        if (extra_params) {
            for(var key in extra_params){
                if (extra_params.hasOwnProperty(key)) oauthParameters[key] = extra_params[key];
            }
        }
        var parsedUrl = URL.parse(url, false);
        if (parsedUrl.query) {
            var key2;
            var extraParameters = querystring.parse(parsedUrl.query);
            for(var key in extraParameters){
                var value = extraParameters[key];
                if (typeof value == "object") {
                    // TODO: This probably should be recursive
                    for(key2 in value){
                        oauthParameters[key + "[" + key2 + "]"] = value[key2];
                    }
                } else {
                    oauthParameters[key] = value;
                }
            }
        }
        sig = this._getSignature(method, url, this._normaliseRequestParams(oauthParameters), oauth_token_secret);
    }
    var orderedParameters = this._sortRequestParams(this._makeArrayOfArgumentsHash(oauthParameters));
    orderedParameters[orderedParameters.length] = [
        "oauth_signature",
        sig
    ];
    return orderedParameters;
};
exports.OAuth.prototype._performSecureRequest = function(oauth_token, oauth_token_secret, method, url, extra_params, post_body, post_content_type, callback) {
    var orderedParameters = this._prepareParameters(oauth_token, oauth_token_secret, method, url, extra_params);
    if (!post_content_type) {
        post_content_type = "application/x-www-form-urlencoded";
    }
    var parsedUrl = URL.parse(url, false);
    if (parsedUrl.protocol == "http:" && !parsedUrl.port) parsedUrl.port = 80;
    if (parsedUrl.protocol == "https:" && !parsedUrl.port) parsedUrl.port = 443;
    var headers = {};
    var authorization = this._buildAuthorizationHeaders(orderedParameters);
    if (this._isEcho) {
        headers["X-Verify-Credentials-Authorization"] = authorization;
    } else {
        headers["Authorization"] = authorization;
    }
    headers["Host"] = parsedUrl.host;
    for(var key in this._headers){
        if (this._headers.hasOwnProperty(key)) {
            headers[key] = this._headers[key];
        }
    }
    // Filter out any passed extra_params that are really to do with OAuth
    for(var key in extra_params){
        if (this._isParameterNameAnOAuthParameter(key)) {
            delete extra_params[key];
        }
    }
    if ((method == "POST" || method == "PUT") && post_body == null && extra_params != null) {
        // Fix the mismatch between the output of querystring.stringify() and this._encodeData()
        post_body = querystring.stringify(extra_params).replace(/\!/g, "%21").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A");
    }
    if (post_body) {
        if (Buffer.isBuffer(post_body)) {
            headers["Content-length"] = post_body.length;
        } else {
            headers["Content-length"] = Buffer.byteLength(post_body);
        }
    } else {
        headers["Content-length"] = 0;
    }
    headers["Content-Type"] = post_content_type;
    var path;
    if (!parsedUrl.pathname || parsedUrl.pathname == "") parsedUrl.pathname = "/";
    if (parsedUrl.query) path = parsedUrl.pathname + "?" + parsedUrl.query;
    else path = parsedUrl.pathname;
    var request;
    if (parsedUrl.protocol == "https:") {
        request = this._createClient(parsedUrl.port, parsedUrl.hostname, method, path, headers, true);
    } else {
        request = this._createClient(parsedUrl.port, parsedUrl.hostname, method, path, headers);
    }
    var clientOptions = this._clientOptions;
    if (callback) {
        var data = "";
        var self = this;
        // Some hosts *cough* google appear to close the connection early / send no content-length header
        // allow this behaviour.
        var allowEarlyClose = OAuthUtils.isAnEarlyCloseHost(parsedUrl.hostname);
        var callbackCalled = false;
        var passBackControl = function(response) {
            if (!callbackCalled) {
                callbackCalled = true;
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    callback(null, data, response);
                } else {
                    // Follow 301 or 302 redirects with Location HTTP header
                    if ((response.statusCode == 301 || response.statusCode == 302) && clientOptions.followRedirects && response.headers && response.headers.location) {
                        self._performSecureRequest(oauth_token, oauth_token_secret, method, response.headers.location, extra_params, post_body, post_content_type, callback);
                    } else {
                        callback({
                            statusCode: response.statusCode,
                            data: data
                        }, data, response);
                    }
                }
            }
        };
        request.on("response", function(response) {
            response.setEncoding("utf8");
            response.on("data", function(chunk) {
                data += chunk;
            });
            response.on("end", function() {
                passBackControl(response);
            });
            response.on("close", function() {
                if (allowEarlyClose) {
                    passBackControl(response);
                }
            });
        });
        request.on("error", function(err) {
            if (!callbackCalled) {
                callbackCalled = true;
                callback(err);
            }
        });
        if ((method == "POST" || method == "PUT") && post_body != null && post_body != "") {
            request.write(post_body);
        }
        request.end();
    } else {
        if ((method == "POST" || method == "PUT") && post_body != null && post_body != "") {
            request.write(post_body);
        }
        return request;
    }
    return;
};
exports.OAuth.prototype.setClientOptions = function(options) {
    var key, mergedOptions = {}, hasOwnProperty = Object.prototype.hasOwnProperty;
    for(key in this._defaultClientOptions){
        if (!hasOwnProperty.call(options, key)) {
            mergedOptions[key] = this._defaultClientOptions[key];
        } else {
            mergedOptions[key] = options[key];
        }
    }
    this._clientOptions = mergedOptions;
};
exports.OAuth.prototype.getOAuthAccessToken = function(oauth_token, oauth_token_secret, oauth_verifier, callback) {
    var extraParams = {};
    if (typeof oauth_verifier == "function") {
        callback = oauth_verifier;
    } else {
        extraParams.oauth_verifier = oauth_verifier;
    }
    this._performSecureRequest(oauth_token, oauth_token_secret, this._clientOptions.accessTokenHttpMethod, this._accessUrl, extraParams, null, null, function(error, data, response) {
        if (error) callback(error);
        else {
            var results = querystring.parse(data);
            var oauth_access_token = results["oauth_token"];
            delete results["oauth_token"];
            var oauth_access_token_secret = results["oauth_token_secret"];
            delete results["oauth_token_secret"];
            callback(null, oauth_access_token, oauth_access_token_secret, results);
        }
    });
};
// Deprecated
exports.OAuth.prototype.getProtectedResource = function(url, method, oauth_token, oauth_token_secret, callback) {
    this._performSecureRequest(oauth_token, oauth_token_secret, method, url, null, "", null, callback);
};
exports.OAuth.prototype["delete"] = function(url, oauth_token, oauth_token_secret, callback) {
    return this._performSecureRequest(oauth_token, oauth_token_secret, "DELETE", url, null, "", null, callback);
};
exports.OAuth.prototype.get = function(url, oauth_token, oauth_token_secret, callback) {
    return this._performSecureRequest(oauth_token, oauth_token_secret, "GET", url, null, "", null, callback);
};
exports.OAuth.prototype._putOrPost = function(method, url, oauth_token, oauth_token_secret, post_body, post_content_type, callback) {
    var extra_params = null;
    if (typeof post_content_type == "function") {
        callback = post_content_type;
        post_content_type = null;
    }
    if (typeof post_body != "string" && !Buffer.isBuffer(post_body)) {
        post_content_type = "application/x-www-form-urlencoded";
        extra_params = post_body;
        post_body = null;
    }
    return this._performSecureRequest(oauth_token, oauth_token_secret, method, url, extra_params, post_body, post_content_type, callback);
};
exports.OAuth.prototype.put = function(url, oauth_token, oauth_token_secret, post_body, post_content_type, callback) {
    return this._putOrPost("PUT", url, oauth_token, oauth_token_secret, post_body, post_content_type, callback);
};
exports.OAuth.prototype.post = function(url, oauth_token, oauth_token_secret, post_body, post_content_type, callback) {
    return this._putOrPost("POST", url, oauth_token, oauth_token_secret, post_body, post_content_type, callback);
};
/**
 * Gets a request token from the OAuth provider and passes that information back
 * to the calling code.
 *
 * The callback should expect a function of the following form:
 *
 * function(err, token, token_secret, parsedQueryString) {}
 *
 * This method has optional parameters so can be called in the following 2 ways:
 *
 * 1) Primary use case: Does a basic request with no extra parameters
 *  getOAuthRequestToken( callbackFunction )
 *
 * 2) As above but allows for provision of extra parameters to be sent as part of the query to the server.
 *  getOAuthRequestToken( extraParams, callbackFunction )
 *
 * N.B. This method will HTTP POST verbs by default, if you wish to override this behaviour you will
 * need to provide a requestTokenHttpMethod option when creating the client.
 *
 **/ exports.OAuth.prototype.getOAuthRequestToken = function(extraParams, callback) {
    if (typeof extraParams == "function") {
        callback = extraParams;
        extraParams = {};
    }
    // Callbacks are 1.0A related
    if (this._authorize_callback) {
        extraParams["oauth_callback"] = this._authorize_callback;
    }
    this._performSecureRequest(null, null, this._clientOptions.requestTokenHttpMethod, this._requestUrl, extraParams, null, null, function(error, data, response) {
        if (error) callback(error);
        else {
            var results = querystring.parse(data);
            var oauth_token = results["oauth_token"];
            var oauth_token_secret = results["oauth_token_secret"];
            delete results["oauth_token"];
            delete results["oauth_token_secret"];
            callback(null, oauth_token, oauth_token_secret, results);
        }
    });
};
exports.OAuth.prototype.signUrl = function(url, oauth_token, oauth_token_secret, method) {
    if (method === undefined) {
        var method = "GET";
    }
    var orderedParameters = this._prepareParameters(oauth_token, oauth_token_secret, method, url, {});
    var parsedUrl = URL.parse(url, false);
    var query = "";
    for(var i = 0; i < orderedParameters.length; i++){
        query += orderedParameters[i][0] + "=" + this._encodeData(orderedParameters[i][1]) + "&";
    }
    query = query.substring(0, query.length - 1);
    return parsedUrl.protocol + "//" + parsedUrl.host + parsedUrl.pathname + "?" + query;
};
exports.OAuth.prototype.authHeader = function(url, oauth_token, oauth_token_secret, method) {
    if (method === undefined) {
        var method = "GET";
    }
    var orderedParameters = this._prepareParameters(oauth_token, oauth_token_secret, method, url, {});
    return this._buildAuthorizationHeaders(orderedParameters);
};


/***/ }),

/***/ 64205:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var querystring = __webpack_require__(63477), crypto = __webpack_require__(6113), https = __webpack_require__(95687), http = __webpack_require__(13685), URL = __webpack_require__(57310), OAuthUtils = __webpack_require__(2606);
exports.OAuth2 = function(clientId, clientSecret, baseSite, authorizePath, accessTokenPath, customHeaders) {
    this._clientId = clientId;
    this._clientSecret = clientSecret;
    this._baseSite = baseSite;
    this._authorizeUrl = authorizePath || "/oauth/authorize";
    this._accessTokenUrl = accessTokenPath || "/oauth/access_token";
    this._accessTokenName = "access_token";
    this._authMethod = "Bearer";
    this._customHeaders = customHeaders || {};
    this._useAuthorizationHeaderForGET = false;
    //our agent
    this._agent = undefined;
};
// Allows you to set an agent to use instead of the default HTTP or
// HTTPS agents. Useful when dealing with your own certificates.
exports.OAuth2.prototype.setAgent = function(agent) {
    this._agent = agent;
};
// This 'hack' method is required for sites that don't use
// 'access_token' as the name of the access token (for requests).
// ( http://tools.ietf.org/html/draft-ietf-oauth-v2-16#section-7 )
// it isn't clear what the correct value should be atm, so allowing
// for specific (temporary?) override for now.
exports.OAuth2.prototype.setAccessTokenName = function(name) {
    this._accessTokenName = name;
};
// Sets the authorization method for Authorization header.
// e.g. Authorization: Bearer <token>  # "Bearer" is the authorization method.
exports.OAuth2.prototype.setAuthMethod = function(authMethod) {
    this._authMethod = authMethod;
};
// If you use the OAuth2 exposed 'get' method (and don't construct your own _request call )
// this will specify whether to use an 'Authorize' header instead of passing the access_token as a query parameter
exports.OAuth2.prototype.useAuthorizationHeaderforGET = function(useIt) {
    this._useAuthorizationHeaderForGET = useIt;
};
exports.OAuth2.prototype._getAccessTokenUrl = function() {
    return this._baseSite + this._accessTokenUrl; /* + "?" + querystring.stringify(params); */ 
};
// Build the authorization header. In particular, build the part after the colon.
// e.g. Authorization: Bearer <token>  # Build "Bearer <token>"
exports.OAuth2.prototype.buildAuthHeader = function(token) {
    return this._authMethod + " " + token;
};
exports.OAuth2.prototype._chooseHttpLibrary = function(parsedUrl) {
    var http_library = https;
    // As this is OAUth2, we *assume* https unless told explicitly otherwise.
    if (parsedUrl.protocol != "https:") {
        http_library = http;
    }
    return http_library;
};
exports.OAuth2.prototype._request = function(method, url, headers, post_body, access_token, callback) {
    var parsedUrl = URL.parse(url, true);
    if (parsedUrl.protocol == "https:" && !parsedUrl.port) {
        parsedUrl.port = 443;
    }
    var http_library = this._chooseHttpLibrary(parsedUrl);
    var realHeaders = {};
    for(var key in this._customHeaders){
        realHeaders[key] = this._customHeaders[key];
    }
    if (headers) {
        for(var key in headers){
            realHeaders[key] = headers[key];
        }
    }
    realHeaders["Host"] = parsedUrl.host;
    if (!realHeaders["User-Agent"]) {
        realHeaders["User-Agent"] = "Node-oauth";
    }
    if (post_body) {
        if (Buffer.isBuffer(post_body)) {
            realHeaders["Content-Length"] = post_body.length;
        } else {
            realHeaders["Content-Length"] = Buffer.byteLength(post_body);
        }
    } else {
        realHeaders["Content-length"] = 0;
    }
    if (access_token && !("Authorization" in realHeaders)) {
        if (!parsedUrl.query) parsedUrl.query = {};
        parsedUrl.query[this._accessTokenName] = access_token;
    }
    var queryStr = querystring.stringify(parsedUrl.query);
    if (queryStr) queryStr = "?" + queryStr;
    var options = {
        host: parsedUrl.hostname,
        port: parsedUrl.port,
        path: parsedUrl.pathname + queryStr,
        method: method,
        headers: realHeaders
    };
    this._executeRequest(http_library, options, post_body, callback);
};
exports.OAuth2.prototype._executeRequest = function(http_library, options, post_body, callback) {
    // Some hosts *cough* google appear to close the connection early / send no content-length header
    // allow this behaviour.
    var allowEarlyClose = OAuthUtils.isAnEarlyCloseHost(options.host);
    var callbackCalled = false;
    function passBackControl(response, result) {
        if (!callbackCalled) {
            callbackCalled = true;
            if (!(response.statusCode >= 200 && response.statusCode <= 299) && response.statusCode != 301 && response.statusCode != 302) {
                callback({
                    statusCode: response.statusCode,
                    data: result
                });
            } else {
                callback(null, result, response);
            }
        }
    }
    var result = "";
    //set the agent on the request options
    if (this._agent) {
        options.agent = this._agent;
    }
    var request = http_library.request(options);
    request.on("response", function(response) {
        response.on("data", function(chunk) {
            result += chunk;
        });
        response.on("close", function(err) {
            if (allowEarlyClose) {
                passBackControl(response, result);
            }
        });
        response.addListener("end", function() {
            passBackControl(response, result);
        });
    });
    request.on("error", function(e) {
        callbackCalled = true;
        callback(e);
    });
    if ((options.method == "POST" || options.method == "PUT") && post_body) {
        request.write(post_body);
    }
    request.end();
};
exports.OAuth2.prototype.getAuthorizeUrl = function(params) {
    var params = params || {};
    params["client_id"] = this._clientId;
    return this._baseSite + this._authorizeUrl + "?" + querystring.stringify(params);
};
exports.OAuth2.prototype.getOAuthAccessToken = function(code, params, callback) {
    var params = params || {};
    params["client_id"] = this._clientId;
    params["client_secret"] = this._clientSecret;
    var codeParam = params.grant_type === "refresh_token" ? "refresh_token" : "code";
    params[codeParam] = code;
    var post_data = querystring.stringify(params);
    var post_headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    };
    this._request("POST", this._getAccessTokenUrl(), post_headers, post_data, null, function(error, data, response) {
        if (error) callback(error);
        else {
            var results;
            try {
                // As of http://tools.ietf.org/html/draft-ietf-oauth-v2-07
                // responses should be in JSON
                results = JSON.parse(data);
            } catch (e) {
                // .... However both Facebook + Github currently use rev05 of the spec
                // and neither seem to specify a content-type correctly in their response headers :(
                // clients of these services will suffer a *minor* performance cost of the exception
                // being thrown
                results = querystring.parse(data);
            }
            var access_token = results["access_token"];
            var refresh_token = results["refresh_token"];
            delete results["refresh_token"];
            callback(null, access_token, refresh_token, results); // callback results =-=
        }
    });
};
// Deprecated
exports.OAuth2.prototype.getProtectedResource = function(url, access_token, callback) {
    this._request("GET", url, {}, "", access_token, callback);
};
exports.OAuth2.prototype.get = function(url, access_token, callback) {
    if (this._useAuthorizationHeaderForGET) {
        var headers = {
            "Authorization": this.buildAuthHeader(access_token)
        };
        access_token = null;
    } else {
        headers = {};
    }
    this._request("GET", url, headers, "", access_token, callback);
};


/***/ }),

/***/ 64375:
/***/ ((__unused_webpack_module, exports) => {

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS 180-1
 * Version 2.2 Copyright Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */ /*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */ var hexcase = 1; /* hex output format. 0 - lowercase; 1 - uppercase        */ 
var b64pad = "="; /* base-64 pad character. "=" for strict RFC compliance   */ 
/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */ function hex_sha1(s) {
    return rstr2hex(rstr_sha1(str2rstr_utf8(s)));
}
function b64_sha1(s) {
    return rstr2b64(rstr_sha1(str2rstr_utf8(s)));
}
function any_sha1(s, e) {
    return rstr2any(rstr_sha1(str2rstr_utf8(s)), e);
}
function hex_hmac_sha1(k, d) {
    return rstr2hex(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d)));
}
function b64_hmac_sha1(k, d) {
    return rstr2b64(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d)));
}
function any_hmac_sha1(k, d, e) {
    return rstr2any(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d)), e);
}
/*
 * Perform a simple self-test to see if the VM is working
 */ function sha1_vm_test() {
    return hex_sha1("abc").toLowerCase() == "a9993e364706816aba3e25717850c26c9cd0d89d";
}
/*
 * Calculate the SHA1 of a raw string
 */ function rstr_sha1(s) {
    return binb2rstr(binb_sha1(rstr2binb(s), s.length * 8));
}
/*
 * Calculate the HMAC-SHA1 of a key and some data (raw strings)
 */ function rstr_hmac_sha1(key, data) {
    var bkey = rstr2binb(key);
    if (bkey.length > 16) bkey = binb_sha1(bkey, key.length * 8);
    var ipad = Array(16), opad = Array(16);
    for(var i = 0; i < 16; i++){
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }
    var hash = binb_sha1(ipad.concat(rstr2binb(data)), 512 + data.length * 8);
    return binb2rstr(binb_sha1(opad.concat(hash), 512 + 160));
}
/*
 * Convert a raw string to a hex string
 */ function rstr2hex(input) {
    try {
        hexcase;
    } catch (e) {
        hexcase = 0;
    }
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var output = "";
    var x;
    for(var i = 0; i < input.length; i++){
        x = input.charCodeAt(i);
        output += hex_tab.charAt(x >>> 4 & 0x0F) + hex_tab.charAt(x & 0x0F);
    }
    return output;
}
/*
 * Convert a raw string to a base-64 string
 */ function rstr2b64(input) {
    try {
        b64pad;
    } catch (e) {
        b64pad = "";
    }
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var output = "";
    var len = input.length;
    for(var i = 0; i < len; i += 3){
        var triplet = input.charCodeAt(i) << 16 | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0) | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
        for(var j = 0; j < 4; j++){
            if (i * 8 + j * 6 > input.length * 8) output += b64pad;
            else output += tab.charAt(triplet >>> 6 * (3 - j) & 0x3F);
        }
    }
    return output;
}
/*
 * Convert a raw string to an arbitrary string encoding
 */ function rstr2any(input, encoding) {
    var divisor = encoding.length;
    var remainders = Array();
    var i, q, x, quotient;
    /* Convert to an array of 16-bit big-endian values, forming the dividend */ var dividend = Array(Math.ceil(input.length / 2));
    for(i = 0; i < dividend.length; i++){
        dividend[i] = input.charCodeAt(i * 2) << 8 | input.charCodeAt(i * 2 + 1);
    }
    /*
   * Repeatedly perform a long division. The binary array forms the dividend,
   * the length of the encoding is the divisor. Once computed, the quotient
   * forms the dividend for the next step. We stop when the dividend is zero.
   * All remainders are stored for later use.
   */ while(dividend.length > 0){
        quotient = Array();
        x = 0;
        for(i = 0; i < dividend.length; i++){
            x = (x << 16) + dividend[i];
            q = Math.floor(x / divisor);
            x -= q * divisor;
            if (quotient.length > 0 || q > 0) quotient[quotient.length] = q;
        }
        remainders[remainders.length] = x;
        dividend = quotient;
    }
    /* Convert the remainders to the output string */ var output = "";
    for(i = remainders.length - 1; i >= 0; i--)output += encoding.charAt(remainders[i]);
    /* Append leading zero equivalents */ var full_length = Math.ceil(input.length * 8 / (Math.log(encoding.length) / Math.log(2)));
    for(i = output.length; i < full_length; i++)output = encoding[0] + output;
    return output;
}
/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */ function str2rstr_utf8(input) {
    var output = "";
    var i = -1;
    var x, y;
    while(++i < input.length){
        /* Decode utf-16 surrogate pairs */ x = input.charCodeAt(i);
        y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
        if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
            x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
            i++;
        }
        /* Encode output as utf-8 */ if (x <= 0x7F) output += String.fromCharCode(x);
        else if (x <= 0x7FF) output += String.fromCharCode(0xC0 | x >>> 6 & 0x1F, 0x80 | x & 0x3F);
        else if (x <= 0xFFFF) output += String.fromCharCode(0xE0 | x >>> 12 & 0x0F, 0x80 | x >>> 6 & 0x3F, 0x80 | x & 0x3F);
        else if (x <= 0x1FFFFF) output += String.fromCharCode(0xF0 | x >>> 18 & 0x07, 0x80 | x >>> 12 & 0x3F, 0x80 | x >>> 6 & 0x3F, 0x80 | x & 0x3F);
    }
    return output;
}
/*
 * Encode a string as utf-16
 */ function str2rstr_utf16le(input) {
    var output = "";
    for(var i = 0; i < input.length; i++)output += String.fromCharCode(input.charCodeAt(i) & 0xFF, input.charCodeAt(i) >>> 8 & 0xFF);
    return output;
}
function str2rstr_utf16be(input) {
    var output = "";
    for(var i = 0; i < input.length; i++)output += String.fromCharCode(input.charCodeAt(i) >>> 8 & 0xFF, input.charCodeAt(i) & 0xFF);
    return output;
}
/*
 * Convert a raw string to an array of big-endian words
 * Characters >255 have their high-byte silently ignored.
 */ function rstr2binb(input) {
    var output = Array(input.length >> 2);
    for(var i = 0; i < output.length; i++)output[i] = 0;
    for(var i = 0; i < input.length * 8; i += 8)output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << 24 - i % 32;
    return output;
}
/*
 * Convert an array of big-endian words to a string
 */ function binb2rstr(input) {
    var output = "";
    for(var i = 0; i < input.length * 32; i += 8)output += String.fromCharCode(input[i >> 5] >>> 24 - i % 32 & 0xFF);
    return output;
}
/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */ function binb_sha1(x, len) {
    /* append padding */ x[len >> 5] |= 0x80 << 24 - len % 32;
    x[(len + 64 >> 9 << 4) + 15] = len;
    var w = Array(80);
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    var e = -1009589776;
    for(var i = 0; i < x.length; i += 16){
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        var olde = e;
        for(var j = 0; j < 80; j++){
            if (j < 16) w[j] = x[i + j];
            else w[j] = bit_rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            var t = safe_add(safe_add(bit_rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
            e = d;
            d = c;
            c = bit_rol(b, 30);
            b = a;
            a = t;
        }
        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
        e = safe_add(e, olde);
    }
    return Array(a, b, c, d, e);
}
/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */ function sha1_ft(t, b, c, d) {
    if (t < 20) return b & c | ~b & d;
    if (t < 40) return b ^ c ^ d;
    if (t < 60) return b & c | b & d | c & d;
    return b ^ c ^ d;
}
/*
 * Determine the appropriate additive constant for the current iteration
 */ function sha1_kt(t) {
    return t < 20 ? 1518500249 : t < 40 ? 1859775393 : t < 60 ? -1894007588 : -899497514;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */ function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 0xFFFF;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */ function bit_rol(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
}
exports.HMACSHA1 = function(key, data) {
    return b64_hmac_sha1(key, data);
};


/***/ }),

/***/ 4530:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const { strict: assert  } = __webpack_require__(39491);
const { createHash  } = __webpack_require__(6113);
const { format  } = __webpack_require__(73837);
const shake256 = __webpack_require__(22205);
let encode;
if (Buffer.isEncoding("base64url")) {
    encode = (input)=>input.toString("base64url");
} else {
    const fromBase64 = (base64)=>base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    encode = (input)=>fromBase64(input.toString("base64"));
}
/** SPECIFICATION
 * Its (_hash) value is the base64url encoding of the left-most half of the hash of the octets of
 * the ASCII representation of the token value, where the hash algorithm used is the hash algorithm
 * used in the alg Header Parameter of the ID Token's JOSE Header. For instance, if the alg is
 * RS256, hash the token value with SHA-256, then take the left-most 128 bits and base64url encode
 * them. The _hash value is a case sensitive string.
 */ /**
 * @name getHash
 * @api private
 *
 * returns the sha length based off the JOSE alg heade value, defaults to sha256
 *
 * @param token {String} token value to generate the hash from
 * @param alg {String} ID Token JOSE header alg value (i.e. RS256, HS384, ES512, PS256)
 * @param [crv] {String} For EdDSA the curve decides what hash algorithm is used. Required for EdDSA
 */ function getHash(alg, crv) {
    switch(alg){
        case "HS256":
        case "RS256":
        case "PS256":
        case "ES256":
        case "ES256K":
            return createHash("sha256");
        case "HS384":
        case "RS384":
        case "PS384":
        case "ES384":
            return createHash("sha384");
        case "HS512":
        case "RS512":
        case "PS512":
        case "ES512":
            return createHash("sha512");
        case "EdDSA":
            switch(crv){
                case "Ed25519":
                    return createHash("sha512");
                case "Ed448":
                    if (!shake256) {
                        throw new TypeError("Ed448 *_hash calculation is not supported in your Node.js runtime version");
                    }
                    return createHash("shake256", {
                        outputLength: 114
                    });
                default:
                    throw new TypeError("unrecognized or invalid EdDSA curve provided");
            }
        default:
            throw new TypeError("unrecognized or invalid JWS algorithm provided");
    }
}
function generate(token, alg, crv) {
    const digest = getHash(alg, crv).update(token).digest();
    return encode(digest.slice(0, digest.length / 2));
}
function validate(names, actual, source, alg, crv) {
    if (typeof names.claim !== "string" || !names.claim) {
        throw new TypeError("names.claim must be a non-empty string");
    }
    if (typeof names.source !== "string" || !names.source) {
        throw new TypeError("names.source must be a non-empty string");
    }
    assert(typeof actual === "string" && actual, `${names.claim} must be a non-empty string`);
    assert(typeof source === "string" && source, `${names.source} must be a non-empty string`);
    let expected;
    let msg;
    try {
        expected = generate(source, alg, crv);
    } catch (err) {
        msg = format("%s could not be validated (%s)", names.claim, err.message);
    }
    msg = msg || format("%s mismatch, expected %s, got: %s", names.claim, expected, actual);
    assert.equal(expected, actual, msg);
}
module.exports = {
    validate,
    generate
};


/***/ }),

/***/ 22205:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const crypto = __webpack_require__(6113);
const [major, minor] = process.versions.node.split(".").map((x)=>parseInt(x, 10));
const xofOutputLength = major > 12 || major === 12 && minor >= 8;
const shake256 = xofOutputLength && crypto.getHashes().includes("shake256");
module.exports = shake256;


/***/ }),

/***/ 3508:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const { inspect  } = __webpack_require__(73837);
const stdhttp = __webpack_require__(13685);
const crypto = __webpack_require__(6113);
const { strict: assert  } = __webpack_require__(39491);
const querystring = __webpack_require__(63477);
const url = __webpack_require__(57310);
const jose = __webpack_require__(69167);
const tokenHash = __webpack_require__(4530);
const isKeyObject = __webpack_require__(52837);
const decodeJWT = __webpack_require__(57797);
const base64url = __webpack_require__(12506);
const defaults = __webpack_require__(57318);
const parseWwwAuthenticate = __webpack_require__(68639);
const { assertSigningAlgValuesSupport , assertIssuerConfiguration  } = __webpack_require__(71573);
const pick = __webpack_require__(64215);
const isPlainObject = __webpack_require__(31646);
const processResponse = __webpack_require__(37823);
const TokenSet = __webpack_require__(11039);
const { OPError , RPError  } = __webpack_require__(9881);
const now = __webpack_require__(98584);
const { random  } = __webpack_require__(93004);
const request = __webpack_require__(21468);
const { CLOCK_TOLERANCE  } = __webpack_require__(14126);
const { keystores  } = __webpack_require__(22967);
const KeyStore = __webpack_require__(95648);
const clone = __webpack_require__(39751);
const { authenticatedPost , resolveResponseType , resolveRedirectUri  } = __webpack_require__(91132);
const { queryKeyStore  } = __webpack_require__(8266);
const DeviceFlowHandle = __webpack_require__(96711);
const [major, minor] = process.version.slice(1).split(".").map((str)=>parseInt(str, 10));
const rsaPssParams = major >= 17 || major === 16 && minor >= 9;
const retryAttempt = Symbol();
const skipNonceCheck = Symbol();
const skipMaxAgeCheck = Symbol();
function pickCb(input) {
    return pick(input, "access_token", "code", "error_description", "error_uri", "error", "expires_in", "id_token", "iss", "response", "session_state", "state", "token_type");
}
function authorizationHeaderValue(token, tokenType = "Bearer") {
    return `${tokenType} ${token}`;
}
function verifyPresence(payload, jwt, prop) {
    if (payload[prop] === undefined) {
        throw new RPError({
            message: `missing required JWT property ${prop}`,
            jwt
        });
    }
}
function authorizationParams(params) {
    const authParams = {
        client_id: this.client_id,
        scope: "openid",
        response_type: resolveResponseType.call(this),
        redirect_uri: resolveRedirectUri.call(this),
        ...params
    };
    Object.entries(authParams).forEach(([key, value])=>{
        if (value === null || value === undefined) {
            delete authParams[key];
        } else if (key === "claims" && typeof value === "object") {
            authParams[key] = JSON.stringify(value);
        } else if (key === "resource" && Array.isArray(value)) {
            authParams[key] = value;
        } else if (typeof value !== "string") {
            authParams[key] = String(value);
        }
    });
    return authParams;
}
function getKeystore(jwks) {
    if (!isPlainObject(jwks) || !Array.isArray(jwks.keys) || jwks.keys.some((k)=>!isPlainObject(k) || !("kty" in k))) {
        throw new TypeError("jwks must be a JSON Web Key Set formatted object");
    }
    return KeyStore.fromJWKS(jwks, {
        onlyPrivate: true
    });
}
// if an OP doesnt support client_secret_basic but supports client_secret_post, use it instead
// this is in place to take care of most common pitfalls when first using discovered Issuers without
// the support for default values defined by Discovery 1.0
function checkBasicSupport(client, properties) {
    try {
        const supported = client.issuer.token_endpoint_auth_methods_supported;
        if (!supported.includes(properties.token_endpoint_auth_method)) {
            if (supported.includes("client_secret_post")) {
                properties.token_endpoint_auth_method = "client_secret_post";
            }
        }
    } catch (err) {}
}
function handleCommonMistakes(client, metadata, properties) {
    if (!metadata.token_endpoint_auth_method) {
        // if no explicit value was provided
        checkBasicSupport(client, properties);
    }
    // :fp: c'mon people... RTFM
    if (metadata.redirect_uri) {
        if (metadata.redirect_uris) {
            throw new TypeError("provide a redirect_uri or redirect_uris, not both");
        }
        properties.redirect_uris = [
            metadata.redirect_uri
        ];
        delete properties.redirect_uri;
    }
    if (metadata.response_type) {
        if (metadata.response_types) {
            throw new TypeError("provide a response_type or response_types, not both");
        }
        properties.response_types = [
            metadata.response_type
        ];
        delete properties.response_type;
    }
}
function getDefaultsForEndpoint(endpoint, issuer, properties) {
    if (!issuer[`${endpoint}_endpoint`]) return;
    const tokenEndpointAuthMethod = properties.token_endpoint_auth_method;
    const tokenEndpointAuthSigningAlg = properties.token_endpoint_auth_signing_alg;
    const eam = `${endpoint}_endpoint_auth_method`;
    const easa = `${endpoint}_endpoint_auth_signing_alg`;
    if (properties[eam] === undefined && properties[easa] === undefined) {
        if (tokenEndpointAuthMethod !== undefined) {
            properties[eam] = tokenEndpointAuthMethod;
        }
        if (tokenEndpointAuthSigningAlg !== undefined) {
            properties[easa] = tokenEndpointAuthSigningAlg;
        }
    }
}
class BaseClient {
    #metadata;
    #issuer;
    #aadIssValidation;
    #additionalAuthorizedParties;
    constructor(issuer, aadIssValidation, metadata = {}, jwks, options){
        this.#metadata = new Map();
        this.#issuer = issuer;
        this.#aadIssValidation = aadIssValidation;
        if (typeof metadata.client_id !== "string" || !metadata.client_id) {
            throw new TypeError("client_id is required");
        }
        const properties = {
            grant_types: [
                "authorization_code"
            ],
            id_token_signed_response_alg: "RS256",
            authorization_signed_response_alg: "RS256",
            response_types: [
                "code"
            ],
            token_endpoint_auth_method: "client_secret_basic",
            ...this.fapi() ? {
                grant_types: [
                    "authorization_code",
                    "implicit"
                ],
                id_token_signed_response_alg: "PS256",
                authorization_signed_response_alg: "PS256",
                response_types: [
                    "code id_token"
                ],
                tls_client_certificate_bound_access_tokens: true,
                token_endpoint_auth_method: undefined
            } : undefined,
            ...metadata
        };
        if (this.fapi()) {
            switch(properties.token_endpoint_auth_method){
                case "self_signed_tls_client_auth":
                case "tls_client_auth":
                    break;
                case "private_key_jwt":
                    if (!jwks) {
                        throw new TypeError("jwks is required");
                    }
                    break;
                case undefined:
                    throw new TypeError("token_endpoint_auth_method is required");
                default:
                    throw new TypeError("invalid or unsupported token_endpoint_auth_method");
            }
        }
        handleCommonMistakes(this, metadata, properties);
        assertSigningAlgValuesSupport("token", this.issuer, properties);
        [
            "introspection",
            "revocation"
        ].forEach((endpoint)=>{
            getDefaultsForEndpoint(endpoint, this.issuer, properties);
            assertSigningAlgValuesSupport(endpoint, this.issuer, properties);
        });
        Object.entries(properties).forEach(([key, value])=>{
            this.#metadata.set(key, value);
            if (!this[key]) {
                Object.defineProperty(this, key, {
                    get () {
                        return this.#metadata.get(key);
                    },
                    enumerable: true
                });
            }
        });
        if (jwks !== undefined) {
            const keystore = getKeystore.call(this, jwks);
            keystores.set(this, keystore);
        }
        if (options != null && options.additionalAuthorizedParties) {
            this.#additionalAuthorizedParties = clone(options.additionalAuthorizedParties);
        }
        this[CLOCK_TOLERANCE] = 0;
    }
    authorizationUrl(params = {}) {
        if (!isPlainObject(params)) {
            throw new TypeError("params must be a plain object");
        }
        assertIssuerConfiguration(this.issuer, "authorization_endpoint");
        const target = url.parse(this.issuer.authorization_endpoint, true);
        target.search = null;
        target.query = {
            ...target.query,
            ...authorizationParams.call(this, params)
        };
        return url.format(target);
    }
    authorizationPost(params = {}) {
        if (!isPlainObject(params)) {
            throw new TypeError("params must be a plain object");
        }
        const inputs = authorizationParams.call(this, params);
        const formInputs = Object.keys(inputs).map((name)=>`<input type="hidden" name="${name}" value="${inputs[name]}"/>`).join("\n");
        return `<!DOCTYPE html>
<head>
<title>Requesting Authorization</title>
</head>
<body onload="javascript:document.forms[0].submit()">
<form method="post" action="${this.issuer.authorization_endpoint}">
  ${formInputs}
</form>
</body>
</html>`;
    }
    endSessionUrl(params = {}) {
        assertIssuerConfiguration(this.issuer, "end_session_endpoint");
        const { 0: postLogout , length  } = this.post_logout_redirect_uris || [];
        const { post_logout_redirect_uri =length === 1 ? postLogout : undefined  } = params;
        let id_token_hint;
        ({ id_token_hint , ...params } = params);
        if (id_token_hint instanceof TokenSet) {
            if (!id_token_hint.id_token) {
                throw new TypeError("id_token not present in TokenSet");
            }
            id_token_hint = id_token_hint.id_token;
        }
        const target = url.parse(this.issuer.end_session_endpoint, true);
        target.search = null;
        defaults(target.query, params, {
            post_logout_redirect_uri,
            client_id: this.client_id
        }, {
            id_token_hint
        });
        Object.entries(target.query).forEach(([key, value])=>{
            if (value === null || value === undefined) {
                delete target.query[key];
            }
        });
        return url.format(target);
    }
    callbackParams(input) {
        const isIncomingMessage = input instanceof stdhttp.IncomingMessage || input && input.method && input.url;
        const isString = typeof input === "string";
        if (!isString && !isIncomingMessage) {
            throw new TypeError("#callbackParams only accepts string urls, http.IncomingMessage or a lookalike");
        }
        if (isIncomingMessage) {
            switch(input.method){
                case "GET":
                    return pickCb(url.parse(input.url, true).query);
                case "POST":
                    if (input.body === undefined) {
                        throw new TypeError("incoming message body missing, include a body parser prior to this method call");
                    }
                    switch(typeof input.body){
                        case "object":
                        case "string":
                            if (Buffer.isBuffer(input.body)) {
                                return pickCb(querystring.parse(input.body.toString("utf-8")));
                            }
                            if (typeof input.body === "string") {
                                return pickCb(querystring.parse(input.body));
                            }
                            return pickCb(input.body);
                        default:
                            throw new TypeError("invalid IncomingMessage body object");
                    }
                default:
                    throw new TypeError("invalid IncomingMessage method");
            }
        } else {
            return pickCb(url.parse(input, true).query);
        }
    }
    async callback(redirectUri, parameters, checks = {}, { exchangeBody , clientAssertionPayload , DPoP  } = {}) {
        let params = pickCb(parameters);
        if (checks.jarm && !("response" in parameters)) {
            throw new RPError({
                message: "expected a JARM response",
                checks,
                params
            });
        } else if ("response" in parameters) {
            const decrypted = await this.decryptJARM(params.response);
            params = await this.validateJARM(decrypted);
        }
        if (this.default_max_age && !checks.max_age) {
            checks.max_age = this.default_max_age;
        }
        if (params.state && !checks.state) {
            throw new TypeError("checks.state argument is missing");
        }
        if (!params.state && checks.state) {
            throw new RPError({
                message: "state missing from the response",
                checks,
                params
            });
        }
        if (checks.state !== params.state) {
            throw new RPError({
                printf: [
                    "state mismatch, expected %s, got: %s",
                    checks.state,
                    params.state
                ],
                checks,
                params
            });
        }
        if ("iss" in params) {
            assertIssuerConfiguration(this.issuer, "issuer");
            if (params.iss !== this.issuer.issuer) {
                throw new RPError({
                    printf: [
                        "iss mismatch, expected %s, got: %s",
                        this.issuer.issuer,
                        params.iss
                    ],
                    params
                });
            }
        } else if (this.issuer.authorization_response_iss_parameter_supported && !("id_token" in params) && !("response" in parameters)) {
            throw new RPError({
                message: "iss missing from the response",
                params
            });
        }
        if (params.error) {
            throw new OPError(params);
        }
        const RESPONSE_TYPE_REQUIRED_PARAMS = {
            code: [
                "code"
            ],
            id_token: [
                "id_token"
            ],
            token: [
                "access_token",
                "token_type"
            ]
        };
        if (checks.response_type) {
            for (const type of checks.response_type.split(" ")){
                if (type === "none") {
                    if (params.code || params.id_token || params.access_token) {
                        throw new RPError({
                            message: 'unexpected params encountered for "none" response',
                            checks,
                            params
                        });
                    }
                } else {
                    for (const param of RESPONSE_TYPE_REQUIRED_PARAMS[type]){
                        if (!params[param]) {
                            throw new RPError({
                                message: `${param} missing from response`,
                                checks,
                                params
                            });
                        }
                    }
                }
            }
        }
        if (params.id_token) {
            const tokenset = new TokenSet(params);
            await this.decryptIdToken(tokenset);
            await this.validateIdToken(tokenset, checks.nonce, "authorization", checks.max_age, checks.state);
            if (!params.code) {
                return tokenset;
            }
        }
        if (params.code) {
            const tokenset = await this.grant({
                ...exchangeBody,
                grant_type: "authorization_code",
                code: params.code,
                redirect_uri: redirectUri,
                code_verifier: checks.code_verifier
            }, {
                clientAssertionPayload,
                DPoP
            });
            await this.decryptIdToken(tokenset);
            await this.validateIdToken(tokenset, checks.nonce, "token", checks.max_age);
            if (params.session_state) {
                tokenset.session_state = params.session_state;
            }
            return tokenset;
        }
        return new TokenSet(params);
    }
    async oauthCallback(redirectUri, parameters, checks = {}, { exchangeBody , clientAssertionPayload , DPoP  } = {}) {
        let params = pickCb(parameters);
        if (checks.jarm && !("response" in parameters)) {
            throw new RPError({
                message: "expected a JARM response",
                checks,
                params
            });
        } else if ("response" in parameters) {
            const decrypted = await this.decryptJARM(params.response);
            params = await this.validateJARM(decrypted);
        }
        if (params.state && !checks.state) {
            throw new TypeError("checks.state argument is missing");
        }
        if (!params.state && checks.state) {
            throw new RPError({
                message: "state missing from the response",
                checks,
                params
            });
        }
        if (checks.state !== params.state) {
            throw new RPError({
                printf: [
                    "state mismatch, expected %s, got: %s",
                    checks.state,
                    params.state
                ],
                checks,
                params
            });
        }
        if ("iss" in params) {
            assertIssuerConfiguration(this.issuer, "issuer");
            if (params.iss !== this.issuer.issuer) {
                throw new RPError({
                    printf: [
                        "iss mismatch, expected %s, got: %s",
                        this.issuer.issuer,
                        params.iss
                    ],
                    params
                });
            }
        } else if (this.issuer.authorization_response_iss_parameter_supported && !("id_token" in params) && !("response" in parameters)) {
            throw new RPError({
                message: "iss missing from the response",
                params
            });
        }
        if (params.error) {
            throw new OPError(params);
        }
        if (typeof params.id_token === "string" && params.id_token.length) {
            throw new RPError({
                message: "id_token detected in the response, you must use client.callback() instead of client.oauthCallback()",
                params
            });
        }
        delete params.id_token;
        const RESPONSE_TYPE_REQUIRED_PARAMS = {
            code: [
                "code"
            ],
            token: [
                "access_token",
                "token_type"
            ]
        };
        if (checks.response_type) {
            for (const type of checks.response_type.split(" ")){
                if (type === "none") {
                    if (params.code || params.id_token || params.access_token) {
                        throw new RPError({
                            message: 'unexpected params encountered for "none" response',
                            checks,
                            params
                        });
                    }
                }
                if (RESPONSE_TYPE_REQUIRED_PARAMS[type]) {
                    for (const param of RESPONSE_TYPE_REQUIRED_PARAMS[type]){
                        if (!params[param]) {
                            throw new RPError({
                                message: `${param} missing from response`,
                                checks,
                                params
                            });
                        }
                    }
                }
            }
        }
        if (params.code) {
            const tokenset = await this.grant({
                ...exchangeBody,
                grant_type: "authorization_code",
                code: params.code,
                redirect_uri: redirectUri,
                code_verifier: checks.code_verifier
            }, {
                clientAssertionPayload,
                DPoP
            });
            if (typeof tokenset.id_token === "string" && tokenset.id_token.length) {
                throw new RPError({
                    message: "id_token detected in the response, you must use client.callback() instead of client.oauthCallback()",
                    params
                });
            }
            delete tokenset.id_token;
            return tokenset;
        }
        return new TokenSet(params);
    }
    async decryptIdToken(token) {
        if (!this.id_token_encrypted_response_alg) {
            return token;
        }
        let idToken = token;
        if (idToken instanceof TokenSet) {
            if (!idToken.id_token) {
                throw new TypeError("id_token not present in TokenSet");
            }
            idToken = idToken.id_token;
        }
        const expectedAlg = this.id_token_encrypted_response_alg;
        const expectedEnc = this.id_token_encrypted_response_enc;
        const result = await this.decryptJWE(idToken, expectedAlg, expectedEnc);
        if (token instanceof TokenSet) {
            token.id_token = result;
            return token;
        }
        return result;
    }
    async validateJWTUserinfo(body) {
        const expectedAlg = this.userinfo_signed_response_alg;
        return this.validateJWT(body, expectedAlg, []);
    }
    async decryptJARM(response) {
        if (!this.authorization_encrypted_response_alg) {
            return response;
        }
        const expectedAlg = this.authorization_encrypted_response_alg;
        const expectedEnc = this.authorization_encrypted_response_enc;
        return this.decryptJWE(response, expectedAlg, expectedEnc);
    }
    async decryptJWTUserinfo(body) {
        if (!this.userinfo_encrypted_response_alg) {
            return body;
        }
        const expectedAlg = this.userinfo_encrypted_response_alg;
        const expectedEnc = this.userinfo_encrypted_response_enc;
        return this.decryptJWE(body, expectedAlg, expectedEnc);
    }
    async decryptJWE(jwe, expectedAlg, expectedEnc = "A128CBC-HS256") {
        const header = JSON.parse(base64url.decode(jwe.split(".")[0]));
        if (header.alg !== expectedAlg) {
            throw new RPError({
                printf: [
                    "unexpected JWE alg received, expected %s, got: %s",
                    expectedAlg,
                    header.alg
                ],
                jwt: jwe
            });
        }
        if (header.enc !== expectedEnc) {
            throw new RPError({
                printf: [
                    "unexpected JWE enc received, expected %s, got: %s",
                    expectedEnc,
                    header.enc
                ],
                jwt: jwe
            });
        }
        const getPlaintext = (result)=>new TextDecoder().decode(result.plaintext);
        let plaintext;
        if (expectedAlg.match(/^(?:RSA|ECDH)/)) {
            const keystore = await keystores.get(this);
            for (const { keyObject: key  } of keystore.all({
                ...jose.decodeProtectedHeader(jwe),
                use: "enc"
            })){
                plaintext = await jose.compactDecrypt(jwe, key).then(getPlaintext, ()=>{});
                if (plaintext) break;
            }
        } else {
            plaintext = await jose.compactDecrypt(jwe, this.secretForAlg(expectedAlg === "dir" ? expectedEnc : expectedAlg)).then(getPlaintext, ()=>{});
        }
        if (!plaintext) {
            throw new RPError({
                message: "failed to decrypt JWE",
                jwt: jwe
            });
        }
        return plaintext;
    }
    async validateIdToken(tokenSet, nonce, returnedBy, maxAge, state) {
        let idToken = tokenSet;
        const expectedAlg = this.id_token_signed_response_alg;
        const isTokenSet = idToken instanceof TokenSet;
        if (isTokenSet) {
            if (!idToken.id_token) {
                throw new TypeError("id_token not present in TokenSet");
            }
            idToken = idToken.id_token;
        }
        idToken = String(idToken);
        const timestamp = now();
        const { protected: header , payload , key  } = await this.validateJWT(idToken, expectedAlg);
        if (typeof maxAge === "number" || maxAge !== skipMaxAgeCheck && this.require_auth_time) {
            if (!payload.auth_time) {
                throw new RPError({
                    message: "missing required JWT property auth_time",
                    jwt: idToken
                });
            }
            if (typeof payload.auth_time !== "number") {
                throw new RPError({
                    message: "JWT auth_time claim must be a JSON numeric value",
                    jwt: idToken
                });
            }
        }
        if (typeof maxAge === "number" && payload.auth_time + maxAge < timestamp - this[CLOCK_TOLERANCE]) {
            throw new RPError({
                printf: [
                    "too much time has elapsed since the last End-User authentication, max_age %i, auth_time: %i, now %i",
                    maxAge,
                    payload.auth_time,
                    timestamp - this[CLOCK_TOLERANCE]
                ],
                now: timestamp,
                tolerance: this[CLOCK_TOLERANCE],
                auth_time: payload.auth_time,
                jwt: idToken
            });
        }
        if (nonce !== skipNonceCheck && (payload.nonce || nonce !== undefined) && payload.nonce !== nonce) {
            throw new RPError({
                printf: [
                    "nonce mismatch, expected %s, got: %s",
                    nonce,
                    payload.nonce
                ],
                jwt: idToken
            });
        }
        if (returnedBy === "authorization") {
            if (!payload.at_hash && tokenSet.access_token) {
                throw new RPError({
                    message: "missing required property at_hash",
                    jwt: idToken
                });
            }
            if (!payload.c_hash && tokenSet.code) {
                throw new RPError({
                    message: "missing required property c_hash",
                    jwt: idToken
                });
            }
            if (this.fapi()) {
                if (!payload.s_hash && (tokenSet.state || state)) {
                    throw new RPError({
                        message: "missing required property s_hash",
                        jwt: idToken
                    });
                }
            }
            if (payload.s_hash) {
                if (!state) {
                    throw new TypeError('cannot verify s_hash, "checks.state" property not provided');
                }
                try {
                    tokenHash.validate({
                        claim: "s_hash",
                        source: "state"
                    }, payload.s_hash, state, header.alg, key.jwk && key.jwk.crv);
                } catch (err) {
                    throw new RPError({
                        message: err.message,
                        jwt: idToken
                    });
                }
            }
        }
        if (this.fapi() && payload.iat < timestamp - 3600) {
            throw new RPError({
                printf: [
                    "JWT issued too far in the past, now %i, iat %i",
                    timestamp,
                    payload.iat
                ],
                now: timestamp,
                tolerance: this[CLOCK_TOLERANCE],
                iat: payload.iat,
                jwt: idToken
            });
        }
        if (tokenSet.access_token && payload.at_hash !== undefined) {
            try {
                tokenHash.validate({
                    claim: "at_hash",
                    source: "access_token"
                }, payload.at_hash, tokenSet.access_token, header.alg, key.jwk && key.jwk.crv);
            } catch (err) {
                throw new RPError({
                    message: err.message,
                    jwt: idToken
                });
            }
        }
        if (tokenSet.code && payload.c_hash !== undefined) {
            try {
                tokenHash.validate({
                    claim: "c_hash",
                    source: "code"
                }, payload.c_hash, tokenSet.code, header.alg, key.jwk && key.jwk.crv);
            } catch (err) {
                throw new RPError({
                    message: err.message,
                    jwt: idToken
                });
            }
        }
        return tokenSet;
    }
    async validateJWT(jwt, expectedAlg, required = [
        "iss",
        "sub",
        "aud",
        "exp",
        "iat"
    ]) {
        const isSelfIssued = this.issuer.issuer === "https://self-issued.me";
        const timestamp = now();
        let header;
        let payload;
        try {
            ({ header , payload  } = decodeJWT(jwt, {
                complete: true
            }));
        } catch (err) {
            throw new RPError({
                printf: [
                    "failed to decode JWT (%s: %s)",
                    err.name,
                    err.message
                ],
                jwt
            });
        }
        if (header.alg !== expectedAlg) {
            throw new RPError({
                printf: [
                    "unexpected JWT alg received, expected %s, got: %s",
                    expectedAlg,
                    header.alg
                ],
                jwt
            });
        }
        if (isSelfIssued) {
            required = [
                ...required,
                "sub_jwk"
            ];
        }
        required.forEach(verifyPresence.bind(undefined, payload, jwt));
        if (payload.iss !== undefined) {
            let expectedIss = this.issuer.issuer;
            if (this.#aadIssValidation) {
                expectedIss = this.issuer.issuer.replace("{tenantid}", payload.tid);
            }
            if (payload.iss !== expectedIss) {
                throw new RPError({
                    printf: [
                        "unexpected iss value, expected %s, got: %s",
                        expectedIss,
                        payload.iss
                    ],
                    jwt
                });
            }
        }
        if (payload.iat !== undefined) {
            if (typeof payload.iat !== "number") {
                throw new RPError({
                    message: "JWT iat claim must be a JSON numeric value",
                    jwt
                });
            }
        }
        if (payload.nbf !== undefined) {
            if (typeof payload.nbf !== "number") {
                throw new RPError({
                    message: "JWT nbf claim must be a JSON numeric value",
                    jwt
                });
            }
            if (payload.nbf > timestamp + this[CLOCK_TOLERANCE]) {
                throw new RPError({
                    printf: [
                        "JWT not active yet, now %i, nbf %i",
                        timestamp + this[CLOCK_TOLERANCE],
                        payload.nbf
                    ],
                    now: timestamp,
                    tolerance: this[CLOCK_TOLERANCE],
                    nbf: payload.nbf,
                    jwt
                });
            }
        }
        if (payload.exp !== undefined) {
            if (typeof payload.exp !== "number") {
                throw new RPError({
                    message: "JWT exp claim must be a JSON numeric value",
                    jwt
                });
            }
            if (timestamp - this[CLOCK_TOLERANCE] >= payload.exp) {
                throw new RPError({
                    printf: [
                        "JWT expired, now %i, exp %i",
                        timestamp - this[CLOCK_TOLERANCE],
                        payload.exp
                    ],
                    now: timestamp,
                    tolerance: this[CLOCK_TOLERANCE],
                    exp: payload.exp,
                    jwt
                });
            }
        }
        if (payload.aud !== undefined) {
            if (Array.isArray(payload.aud)) {
                if (payload.aud.length > 1 && !payload.azp) {
                    throw new RPError({
                        message: "missing required JWT property azp",
                        jwt
                    });
                }
                if (!payload.aud.includes(this.client_id)) {
                    throw new RPError({
                        printf: [
                            "aud is missing the client_id, expected %s to be included in %j",
                            this.client_id,
                            payload.aud
                        ],
                        jwt
                    });
                }
            } else if (payload.aud !== this.client_id) {
                throw new RPError({
                    printf: [
                        "aud mismatch, expected %s, got: %s",
                        this.client_id,
                        payload.aud
                    ],
                    jwt
                });
            }
        }
        if (payload.azp !== undefined) {
            let additionalAuthorizedParties = this.#additionalAuthorizedParties;
            if (typeof additionalAuthorizedParties === "string") {
                additionalAuthorizedParties = [
                    this.client_id,
                    additionalAuthorizedParties
                ];
            } else if (Array.isArray(additionalAuthorizedParties)) {
                additionalAuthorizedParties = [
                    this.client_id,
                    ...additionalAuthorizedParties
                ];
            } else {
                additionalAuthorizedParties = [
                    this.client_id
                ];
            }
            if (!additionalAuthorizedParties.includes(payload.azp)) {
                throw new RPError({
                    printf: [
                        "azp mismatch, got: %s",
                        payload.azp
                    ],
                    jwt
                });
            }
        }
        let keys;
        if (isSelfIssued) {
            try {
                assert(isPlainObject(payload.sub_jwk));
                const key = await jose.importJWK(payload.sub_jwk, header.alg);
                assert.equal(key.type, "public");
                keys = [
                    {
                        keyObject: key
                    }
                ];
            } catch (err) {
                throw new RPError({
                    message: "failed to use sub_jwk claim as an asymmetric JSON Web Key",
                    jwt
                });
            }
            if (await jose.calculateJwkThumbprint(payload.sub_jwk) !== payload.sub) {
                throw new RPError({
                    message: "failed to match the subject with sub_jwk",
                    jwt
                });
            }
        } else if (header.alg.startsWith("HS")) {
            keys = [
                this.secretForAlg(header.alg)
            ];
        } else if (header.alg !== "none") {
            keys = await queryKeyStore.call(this.issuer, {
                ...header,
                use: "sig"
            });
        }
        if (!keys && header.alg === "none") {
            return {
                protected: header,
                payload
            };
        }
        for (const key of keys){
            const verified = await jose.compactVerify(jwt, key instanceof Uint8Array ? key : key.keyObject).catch(()=>{});
            if (verified) {
                return {
                    payload,
                    protected: verified.protectedHeader,
                    key
                };
            }
        }
        throw new RPError({
            message: "failed to validate JWT signature",
            jwt
        });
    }
    async refresh(refreshToken, { exchangeBody , clientAssertionPayload , DPoP  } = {}) {
        let token = refreshToken;
        if (token instanceof TokenSet) {
            if (!token.refresh_token) {
                throw new TypeError("refresh_token not present in TokenSet");
            }
            token = token.refresh_token;
        }
        const tokenset = await this.grant({
            ...exchangeBody,
            grant_type: "refresh_token",
            refresh_token: String(token)
        }, {
            clientAssertionPayload,
            DPoP
        });
        if (tokenset.id_token) {
            await this.decryptIdToken(tokenset);
            await this.validateIdToken(tokenset, skipNonceCheck, "token", skipMaxAgeCheck);
            if (refreshToken instanceof TokenSet && refreshToken.id_token) {
                const expectedSub = refreshToken.claims().sub;
                const actualSub = tokenset.claims().sub;
                if (actualSub !== expectedSub) {
                    throw new RPError({
                        printf: [
                            "sub mismatch, expected %s, got: %s",
                            expectedSub,
                            actualSub
                        ],
                        jwt: tokenset.id_token
                    });
                }
            }
        }
        return tokenset;
    }
    async requestResource(resourceUrl, accessToken, { method , headers , body , DPoP , tokenType =DPoP ? "DPoP" : accessToken instanceof TokenSet ? accessToken.token_type : "Bearer"  } = {}, retry) {
        if (accessToken instanceof TokenSet) {
            if (!accessToken.access_token) {
                throw new TypeError("access_token not present in TokenSet");
            }
            accessToken = accessToken.access_token;
        }
        if (!accessToken) {
            throw new TypeError("no access token provided");
        } else if (typeof accessToken !== "string") {
            throw new TypeError("invalid access token provided");
        }
        const requestOpts = {
            headers: {
                Authorization: authorizationHeaderValue(accessToken, tokenType),
                ...headers
            },
            body
        };
        const mTLS = !!this.tls_client_certificate_bound_access_tokens;
        const response = await request.call(this, {
            ...requestOpts,
            responseType: "buffer",
            method,
            url: resourceUrl
        }, {
            accessToken,
            mTLS,
            DPoP
        });
        const wwwAuthenticate = response.headers["www-authenticate"];
        if (retry !== retryAttempt && wwwAuthenticate && wwwAuthenticate.toLowerCase().startsWith("dpop ") && parseWwwAuthenticate(wwwAuthenticate).error === "use_dpop_nonce") {
            return this.requestResource(resourceUrl, accessToken, {
                method,
                headers,
                body,
                DPoP,
                tokenType
            });
        }
        return response;
    }
    async userinfo(accessToken, { method ="GET" , via ="header" , tokenType , params , DPoP  } = {}) {
        assertIssuerConfiguration(this.issuer, "userinfo_endpoint");
        const options = {
            tokenType,
            method: String(method).toUpperCase(),
            DPoP
        };
        if (options.method !== "GET" && options.method !== "POST") {
            throw new TypeError("#userinfo() method can only be POST or a GET");
        }
        if (via === "body" && options.method !== "POST") {
            throw new TypeError("can only send body on POST");
        }
        const jwt = !!(this.userinfo_signed_response_alg || this.userinfo_encrypted_response_alg);
        if (jwt) {
            options.headers = {
                Accept: "application/jwt"
            };
        } else {
            options.headers = {
                Accept: "application/json"
            };
        }
        const mTLS = !!this.tls_client_certificate_bound_access_tokens;
        let targetUrl;
        if (mTLS && this.issuer.mtls_endpoint_aliases) {
            targetUrl = this.issuer.mtls_endpoint_aliases.userinfo_endpoint;
        }
        targetUrl = new url.URL(targetUrl || this.issuer.userinfo_endpoint);
        if (via === "body") {
            options.headers.Authorization = undefined;
            options.headers["Content-Type"] = "application/x-www-form-urlencoded";
            options.body = new url.URLSearchParams();
            options.body.append("access_token", accessToken instanceof TokenSet ? accessToken.access_token : accessToken);
        }
        // handle additional parameters, GET via querystring, POST via urlencoded body
        if (params) {
            if (options.method === "GET") {
                Object.entries(params).forEach(([key, value])=>{
                    targetUrl.searchParams.append(key, value);
                });
            } else if (options.body) {
                // POST && via body
                Object.entries(params).forEach(([key, value])=>{
                    options.body.append(key, value);
                });
            } else {
                // POST && via header
                options.body = new url.URLSearchParams();
                options.headers["Content-Type"] = "application/x-www-form-urlencoded";
                Object.entries(params).forEach(([key, value])=>{
                    options.body.append(key, value);
                });
            }
        }
        if (options.body) {
            options.body = options.body.toString();
        }
        const response = await this.requestResource(targetUrl, accessToken, options);
        let parsed = processResponse(response, {
            bearer: true
        });
        if (jwt) {
            if (!/^application\/jwt/.test(response.headers["content-type"])) {
                throw new RPError({
                    message: "expected application/jwt response from the userinfo_endpoint",
                    response
                });
            }
            const body = response.body.toString();
            const userinfo = await this.decryptJWTUserinfo(body);
            if (!this.userinfo_signed_response_alg) {
                try {
                    parsed = JSON.parse(userinfo);
                    assert(isPlainObject(parsed));
                } catch (err) {
                    throw new RPError({
                        message: "failed to parse userinfo JWE payload as JSON",
                        jwt: userinfo
                    });
                }
            } else {
                ({ payload: parsed  } = await this.validateJWTUserinfo(userinfo));
            }
        } else {
            try {
                parsed = JSON.parse(response.body);
            } catch (err) {
                Object.defineProperty(err, "response", {
                    value: response
                });
                throw err;
            }
        }
        if (accessToken instanceof TokenSet && accessToken.id_token) {
            const expectedSub = accessToken.claims().sub;
            if (parsed.sub !== expectedSub) {
                throw new RPError({
                    printf: [
                        "userinfo sub mismatch, expected %s, got: %s",
                        expectedSub,
                        parsed.sub
                    ],
                    body: parsed,
                    jwt: accessToken.id_token
                });
            }
        }
        return parsed;
    }
    encryptionSecret(len) {
        const hash = len <= 256 ? "sha256" : len <= 384 ? "sha384" : len <= 512 ? "sha512" : false;
        if (!hash) {
            throw new Error("unsupported symmetric encryption key derivation");
        }
        return crypto.createHash(hash).update(this.client_secret).digest().slice(0, len / 8);
    }
    secretForAlg(alg) {
        if (!this.client_secret) {
            throw new TypeError("client_secret is required");
        }
        if (/^A(\d{3})(?:GCM)?KW$/.test(alg)) {
            return this.encryptionSecret(parseInt(RegExp.$1, 10));
        }
        if (/^A(\d{3})(?:GCM|CBC-HS(\d{3}))$/.test(alg)) {
            return this.encryptionSecret(parseInt(RegExp.$2 || RegExp.$1, 10));
        }
        return new TextEncoder().encode(this.client_secret);
    }
    async grant(body, { clientAssertionPayload , DPoP  } = {}, retry) {
        assertIssuerConfiguration(this.issuer, "token_endpoint");
        const response = await authenticatedPost.call(this, "token", {
            form: body,
            responseType: "json"
        }, {
            clientAssertionPayload,
            DPoP
        });
        let responseBody;
        try {
            responseBody = processResponse(response);
        } catch (err) {
            if (retry !== retryAttempt && err instanceof OPError && err.error === "use_dpop_nonce") {
                return this.grant(body, {
                    clientAssertionPayload,
                    DPoP
                }, retryAttempt);
            }
            throw err;
        }
        return new TokenSet(responseBody);
    }
    async deviceAuthorization(params = {}, { exchangeBody , clientAssertionPayload , DPoP  } = {}) {
        assertIssuerConfiguration(this.issuer, "device_authorization_endpoint");
        assertIssuerConfiguration(this.issuer, "token_endpoint");
        const body = authorizationParams.call(this, {
            client_id: this.client_id,
            redirect_uri: null,
            response_type: null,
            ...params
        });
        const response = await authenticatedPost.call(this, "device_authorization", {
            responseType: "json",
            form: body
        }, {
            clientAssertionPayload,
            endpointAuthMethod: "token"
        });
        const responseBody = processResponse(response);
        return new DeviceFlowHandle({
            client: this,
            exchangeBody,
            clientAssertionPayload,
            response: responseBody,
            maxAge: params.max_age,
            DPoP
        });
    }
    async revoke(token, hint, { revokeBody , clientAssertionPayload  } = {}) {
        assertIssuerConfiguration(this.issuer, "revocation_endpoint");
        if (hint !== undefined && typeof hint !== "string") {
            throw new TypeError("hint must be a string");
        }
        const form = {
            ...revokeBody,
            token
        };
        if (hint) {
            form.token_type_hint = hint;
        }
        const response = await authenticatedPost.call(this, "revocation", {
            form
        }, {
            clientAssertionPayload
        });
        processResponse(response, {
            body: false
        });
    }
    async introspect(token, hint, { introspectBody , clientAssertionPayload  } = {}) {
        assertIssuerConfiguration(this.issuer, "introspection_endpoint");
        if (hint !== undefined && typeof hint !== "string") {
            throw new TypeError("hint must be a string");
        }
        const form = {
            ...introspectBody,
            token
        };
        if (hint) {
            form.token_type_hint = hint;
        }
        const response = await authenticatedPost.call(this, "introspection", {
            form,
            responseType: "json"
        }, {
            clientAssertionPayload
        });
        const responseBody = processResponse(response);
        return responseBody;
    }
    static async register(metadata, options = {}) {
        const { initialAccessToken , jwks , ...clientOptions } = options;
        assertIssuerConfiguration(this.issuer, "registration_endpoint");
        if (jwks !== undefined && !(metadata.jwks || metadata.jwks_uri)) {
            const keystore = await getKeystore.call(this, jwks);
            metadata.jwks = keystore.toJWKS();
        }
        const response = await request.call(this, {
            headers: {
                Accept: "application/json",
                ...initialAccessToken ? {
                    Authorization: authorizationHeaderValue(initialAccessToken)
                } : undefined
            },
            responseType: "json",
            json: metadata,
            url: this.issuer.registration_endpoint,
            method: "POST"
        });
        const responseBody = processResponse(response, {
            statusCode: 201,
            bearer: true
        });
        return new this(responseBody, jwks, clientOptions);
    }
    get metadata() {
        return clone(Object.fromEntries(this.#metadata.entries()));
    }
    static async fromUri(registrationClientUri, registrationAccessToken, jwks, clientOptions) {
        const response = await request.call(this, {
            method: "GET",
            url: registrationClientUri,
            responseType: "json",
            headers: {
                Authorization: authorizationHeaderValue(registrationAccessToken),
                Accept: "application/json"
            }
        });
        const responseBody = processResponse(response, {
            bearer: true
        });
        return new this(responseBody, jwks, clientOptions);
    }
    async requestObject(requestObject = {}, { sign: signingAlgorithm = this.request_object_signing_alg || "none" , encrypt: { alg: eKeyManagement = this.request_object_encryption_alg , enc: eContentEncryption = this.request_object_encryption_enc || "A128CBC-HS256"  } = {}  } = {}) {
        if (!isPlainObject(requestObject)) {
            throw new TypeError("requestObject must be a plain object");
        }
        let signed;
        let key;
        const unix = now();
        const header = {
            alg: signingAlgorithm,
            typ: "oauth-authz-req+jwt"
        };
        const payload = JSON.stringify(defaults({}, requestObject, {
            iss: this.client_id,
            aud: this.issuer.issuer,
            client_id: this.client_id,
            jti: random(),
            iat: unix,
            exp: unix + 300,
            ...this.fapi() ? {
                nbf: unix
            } : undefined
        }));
        if (signingAlgorithm === "none") {
            signed = [
                base64url.encode(JSON.stringify(header)),
                base64url.encode(payload),
                ""
            ].join(".");
        } else {
            const symmetric = signingAlgorithm.startsWith("HS");
            if (symmetric) {
                key = this.secretForAlg(signingAlgorithm);
            } else {
                const keystore = await keystores.get(this);
                if (!keystore) {
                    throw new TypeError(`no keystore present for client, cannot sign using alg ${signingAlgorithm}`);
                }
                key = keystore.get({
                    alg: signingAlgorithm,
                    use: "sig"
                });
                if (!key) {
                    throw new TypeError(`no key to sign with found for alg ${signingAlgorithm}`);
                }
            }
            signed = await new jose.CompactSign(new TextEncoder().encode(payload)).setProtectedHeader({
                ...header,
                kid: symmetric ? undefined : key.jwk.kid
            }).sign(symmetric ? key : key.keyObject);
        }
        if (!eKeyManagement) {
            return signed;
        }
        const fields = {
            alg: eKeyManagement,
            enc: eContentEncryption,
            cty: "oauth-authz-req+jwt"
        };
        if (fields.alg.match(/^(RSA|ECDH)/)) {
            [key] = await queryKeyStore.call(this.issuer, {
                alg: fields.alg,
                use: "enc"
            }, {
                allowMulti: true
            });
        } else {
            key = this.secretForAlg(fields.alg === "dir" ? fields.enc : fields.alg);
        }
        return new jose.CompactEncrypt(new TextEncoder().encode(signed)).setProtectedHeader({
            ...fields,
            kid: key instanceof Uint8Array ? undefined : key.jwk.kid
        }).encrypt(key instanceof Uint8Array ? key : key.keyObject);
    }
    async pushedAuthorizationRequest(params = {}, { clientAssertionPayload  } = {}) {
        assertIssuerConfiguration(this.issuer, "pushed_authorization_request_endpoint");
        const body = {
            ..."request" in params ? params : authorizationParams.call(this, params),
            client_id: this.client_id
        };
        const response = await authenticatedPost.call(this, "pushed_authorization_request", {
            responseType: "json",
            form: body
        }, {
            clientAssertionPayload,
            endpointAuthMethod: "token"
        });
        const responseBody = processResponse(response, {
            statusCode: 201
        });
        if (!("expires_in" in responseBody)) {
            throw new RPError({
                message: "expected expires_in in Pushed Authorization Successful Response",
                response
            });
        }
        if (typeof responseBody.expires_in !== "number") {
            throw new RPError({
                message: "invalid expires_in value in Pushed Authorization Successful Response",
                response
            });
        }
        if (!("request_uri" in responseBody)) {
            throw new RPError({
                message: "expected request_uri in Pushed Authorization Successful Response",
                response
            });
        }
        if (typeof responseBody.request_uri !== "string") {
            throw new RPError({
                message: "invalid request_uri value in Pushed Authorization Successful Response",
                response
            });
        }
        return responseBody;
    }
    get issuer() {
        return this.#issuer;
    }
    /* istanbul ignore next */ [inspect.custom]() {
        return `${this.constructor.name} ${inspect(this.metadata, {
            depth: Infinity,
            colors: process.stdout.isTTY,
            compact: false,
            sorted: true
        })}`;
    }
    fapi() {
        return this.constructor.name === "FAPI1Client";
    }
    async validateJARM(response) {
        const expectedAlg = this.authorization_signed_response_alg;
        const { payload  } = await this.validateJWT(response, expectedAlg, [
            "iss",
            "exp",
            "aud"
        ]);
        return pickCb(payload);
    }
}
const RSPS = /^(?:RS|PS)(?:256|384|512)$/;
function determineRsaAlgorithm(privateKey, privateKeyInput, valuesSupported) {
    if (typeof privateKeyInput === "object" && typeof privateKeyInput.key === "object" && privateKeyInput.key.alg) {
        return privateKeyInput.key.alg;
    }
    if (Array.isArray(valuesSupported)) {
        let candidates = valuesSupported.filter(RegExp.prototype.test.bind(RSPS));
        if (privateKey.asymmetricKeyType === "rsa-pss") {
            candidates = candidates.filter((value)=>value.startsWith("PS"));
        }
        return [
            "PS256",
            "PS384",
            "PS512",
            "RS256",
            "RS384",
            "RS384"
        ].find((preferred)=>candidates.includes(preferred));
    }
    return "PS256";
}
const p256 = Buffer.from([
    42,
    134,
    72,
    206,
    61,
    3,
    1,
    7
]);
const p384 = Buffer.from([
    43,
    129,
    4,
    0,
    34
]);
const p521 = Buffer.from([
    43,
    129,
    4,
    0,
    35
]);
const secp256k1 = Buffer.from([
    43,
    129,
    4,
    0,
    10
]);
function determineEcAlgorithm(privateKey, privateKeyInput) {
    // If input was a JWK
    switch(typeof privateKeyInput === "object" && typeof privateKeyInput.key === "object" && privateKeyInput.key.crv){
        case "P-256":
            return "ES256";
        case "secp256k1":
            return "ES256K";
        case "P-384":
            return "ES384";
        case "P-512":
            return "ES512";
        default:
            break;
    }
    const buf = privateKey.export({
        format: "der",
        type: "pkcs8"
    });
    const i = buf[1] < 128 ? 17 : 18;
    const len = buf[i];
    const curveOid = buf.slice(i + 1, i + 1 + len);
    if (curveOid.equals(p256)) {
        return "ES256";
    }
    if (curveOid.equals(p384)) {
        return "ES384";
    }
    if (curveOid.equals(p521)) {
        return "ES512";
    }
    if (curveOid.equals(secp256k1)) {
        return "ES256K";
    }
    throw new TypeError("unsupported DPoP private key curve");
}
const jwkCache = new WeakMap();
async function getJwk(privateKey, privateKeyInput) {
    if (typeof privateKeyInput === "object" && typeof privateKeyInput.key === "object" && privateKeyInput.key.crv) {
        return pick(privateKeyInput.key, "kty", "crv", "x", "y", "e", "n");
    }
    if (jwkCache.has(privateKeyInput)) {
        return jwkCache.get(privateKeyInput);
    }
    const jwk = pick(await jose.exportJWK(privateKey), "kty", "crv", "x", "y", "e", "n");
    if (isKeyObject(privateKeyInput)) {
        jwkCache.set(privateKeyInput, jwk);
    }
    return jwk;
}
/**
 * @name dpopProof
 * @api private
 */ async function dpopProof(payload, privateKeyInput, accessToken) {
    if (!isPlainObject(payload)) {
        throw new TypeError("payload must be a plain object");
    }
    let privateKey;
    if (isKeyObject(privateKeyInput)) {
        privateKey = privateKeyInput;
    } else {
        privateKey = crypto.createPrivateKey(privateKeyInput);
    }
    if (privateKey.type !== "private") {
        throw new TypeError('"DPoP" option must be a private key');
    }
    let alg;
    switch(privateKey.asymmetricKeyType){
        case "ed25519":
        case "ed448":
            alg = "EdDSA";
            break;
        case "ec":
            alg = determineEcAlgorithm(privateKey, privateKeyInput);
            break;
        case "rsa":
        case rsaPssParams && "rsa-pss":
            alg = determineRsaAlgorithm(privateKey, privateKeyInput, this.issuer.dpop_signing_alg_values_supported);
            break;
        default:
            throw new TypeError("unsupported DPoP private key asymmetric key type");
    }
    if (!alg) {
        throw new TypeError("could not determine DPoP JWS Algorithm");
    }
    return new jose.SignJWT({
        ath: accessToken ? base64url.encode(crypto.createHash("sha256").update(accessToken).digest()) : undefined,
        ...payload
    }).setProtectedHeader({
        alg,
        typ: "dpop+jwt",
        jwk: await getJwk(privateKey, privateKeyInput)
    }).setIssuedAt().setJti(random()).sign(privateKey);
}
Object.defineProperty(BaseClient.prototype, "dpopProof", {
    enumerable: true,
    configurable: true,
    value (...args) {
        process.emitWarning("The DPoP APIs implements an IETF draft (https://www.ietf.org/archive/id/draft-ietf-oauth-dpop-04.html). Breaking draft implementations are included as minor versions of the openid-client library, therefore, the ~ semver operator should be used and close attention be payed to library changelog as well as the drafts themselves.", "DraftWarning");
        Object.defineProperty(BaseClient.prototype, "dpopProof", {
            enumerable: true,
            configurable: true,
            value: dpopProof
        });
        return this.dpopProof(...args);
    }
});
module.exports = (issuer, aadIssValidation = false)=>class Client extends BaseClient {
        constructor(...args){
            super(issuer, aadIssValidation, ...args);
        }
        static get issuer() {
            return issuer;
        }
    };
module.exports.BaseClient = BaseClient;


/***/ }),

/***/ 96711:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const { inspect  } = __webpack_require__(73837);
const { RPError , OPError  } = __webpack_require__(9881);
const now = __webpack_require__(98584);
class DeviceFlowHandle {
    #aborted;
    #client;
    #clientAssertionPayload;
    #DPoP;
    #exchangeBody;
    #expires_at;
    #interval;
    #maxAge;
    #response;
    constructor({ client , exchangeBody , clientAssertionPayload , response , maxAge , DPoP  }){
        [
            "verification_uri",
            "user_code",
            "device_code"
        ].forEach((prop)=>{
            if (typeof response[prop] !== "string" || !response[prop]) {
                throw new RPError(`expected ${prop} string to be returned by Device Authorization Response, got %j`, response[prop]);
            }
        });
        if (!Number.isSafeInteger(response.expires_in)) {
            throw new RPError("expected expires_in number to be returned by Device Authorization Response, got %j", response.expires_in);
        }
        this.#expires_at = now() + response.expires_in;
        this.#client = client;
        this.#DPoP = DPoP;
        this.#maxAge = maxAge;
        this.#exchangeBody = exchangeBody;
        this.#clientAssertionPayload = clientAssertionPayload;
        this.#response = response;
        this.#interval = response.interval * 1000 || 5000;
    }
    abort() {
        this.#aborted = true;
    }
    async poll({ signal  } = {}) {
        if (signal && signal.aborted || this.#aborted) {
            throw new RPError("polling aborted");
        }
        if (this.expired()) {
            throw new RPError("the device code %j has expired and the device authorization session has concluded", this.device_code);
        }
        await new Promise((resolve)=>setTimeout(resolve, this.#interval));
        let tokenset;
        try {
            tokenset = await this.#client.grant({
                ...this.#exchangeBody,
                grant_type: "urn:ietf:params:oauth:grant-type:device_code",
                device_code: this.device_code
            }, {
                clientAssertionPayload: this.#clientAssertionPayload,
                DPoP: this.#DPoP
            });
        } catch (err) {
            switch(err instanceof OPError && err.error){
                case "slow_down":
                    this.#interval += 5000;
                case "authorization_pending":
                    return this.poll({
                        signal
                    });
                default:
                    throw err;
            }
        }
        if ("id_token" in tokenset) {
            await this.#client.decryptIdToken(tokenset);
            await this.#client.validateIdToken(tokenset, undefined, "token", this.#maxAge);
        }
        return tokenset;
    }
    get device_code() {
        return this.#response.device_code;
    }
    get user_code() {
        return this.#response.user_code;
    }
    get verification_uri() {
        return this.#response.verification_uri;
    }
    get verification_uri_complete() {
        return this.#response.verification_uri_complete;
    }
    get expires_in() {
        return Math.max.apply(null, [
            this.#expires_at - now(),
            0
        ]);
    }
    expired() {
        return this.expires_in === 0;
    }
    /* istanbul ignore next */ [inspect.custom]() {
        return `${this.constructor.name} ${inspect(this.#response, {
            depth: Infinity,
            colors: process.stdout.isTTY,
            compact: false,
            sorted: true
        })}`;
    }
}
module.exports = DeviceFlowHandle;


/***/ }),

/***/ 9881:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const { format  } = __webpack_require__(73837);
class OPError extends Error {
    constructor({ error_description , error , error_uri , session_state , state , scope  }, response){
        super(!error_description ? error : `${error} (${error_description})`);
        Object.assign(this, {
            error
        }, error_description && {
            error_description
        }, error_uri && {
            error_uri
        }, state && {
            state
        }, scope && {
            scope
        }, session_state && {
            session_state
        });
        if (response) {
            Object.defineProperty(this, "response", {
                value: response
            });
        }
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
class RPError extends Error {
    constructor(...args){
        if (typeof args[0] === "string") {
            super(format(...args));
        } else {
            const { message , printf , response , ...rest } = args[0];
            if (printf) {
                super(format(...printf));
            } else {
                super(message);
            }
            Object.assign(this, rest);
            if (response) {
                Object.defineProperty(this, "response", {
                    value: response
                });
            }
        }
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = {
    OPError,
    RPError
};


/***/ }),

/***/ 71573:
/***/ ((module) => {

"use strict";

function assertSigningAlgValuesSupport(endpoint, issuer, properties) {
    if (!issuer[`${endpoint}_endpoint`]) return;
    const eam = `${endpoint}_endpoint_auth_method`;
    const easa = `${endpoint}_endpoint_auth_signing_alg`;
    const easavs = `${endpoint}_endpoint_auth_signing_alg_values_supported`;
    if (properties[eam] && properties[eam].endsWith("_jwt") && !properties[easa] && !issuer[easavs]) {
        throw new TypeError(`${easavs} must be configured on the issuer if ${easa} is not defined on a client`);
    }
}
function assertIssuerConfiguration(issuer, endpoint) {
    if (!issuer[endpoint]) {
        throw new TypeError(`${endpoint} must be configured on the issuer`);
    }
}
module.exports = {
    assertSigningAlgValuesSupport,
    assertIssuerConfiguration
};


/***/ }),

/***/ 12506:
/***/ ((module) => {

"use strict";

let encode;
if (Buffer.isEncoding("base64url")) {
    encode = (input, encoding = "utf8")=>Buffer.from(input, encoding).toString("base64url");
} else {
    const fromBase64 = (base64)=>base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    encode = (input, encoding = "utf8")=>fromBase64(Buffer.from(input, encoding).toString("base64"));
}
const decode = (input)=>Buffer.from(input, "base64");
module.exports.decode = decode;
module.exports.encode = encode;


/***/ }),

/***/ 91132:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const jose = __webpack_require__(69167);
const { RPError  } = __webpack_require__(9881);
const { assertIssuerConfiguration  } = __webpack_require__(71573);
const { random  } = __webpack_require__(93004);
const now = __webpack_require__(98584);
const request = __webpack_require__(21468);
const { keystores  } = __webpack_require__(22967);
const merge = __webpack_require__(52945);
const formUrlEncode = (value)=>encodeURIComponent(value).replace(/%20/g, "+");
async function clientAssertion(endpoint, payload) {
    let alg = this[`${endpoint}_endpoint_auth_signing_alg`];
    if (!alg) {
        assertIssuerConfiguration(this.issuer, `${endpoint}_endpoint_auth_signing_alg_values_supported`);
    }
    if (this[`${endpoint}_endpoint_auth_method`] === "client_secret_jwt") {
        if (!alg) {
            const supported = this.issuer[`${endpoint}_endpoint_auth_signing_alg_values_supported`];
            alg = Array.isArray(supported) && supported.find((signAlg)=>/^HS(?:256|384|512)/.test(signAlg));
        }
        if (!alg) {
            throw new RPError(`failed to determine a JWS Algorithm to use for ${this[`${endpoint}_endpoint_auth_method`]} Client Assertion`);
        }
        return new jose.CompactSign(Buffer.from(JSON.stringify(payload))).setProtectedHeader({
            alg
        }).sign(this.secretForAlg(alg));
    }
    const keystore = await keystores.get(this);
    if (!keystore) {
        throw new TypeError("no client jwks provided for signing a client assertion with");
    }
    if (!alg) {
        const supported = this.issuer[`${endpoint}_endpoint_auth_signing_alg_values_supported`];
        alg = Array.isArray(supported) && supported.find((signAlg)=>keystore.get({
                alg: signAlg,
                use: "sig"
            }));
    }
    if (!alg) {
        throw new RPError(`failed to determine a JWS Algorithm to use for ${this[`${endpoint}_endpoint_auth_method`]} Client Assertion`);
    }
    const key = keystore.get({
        alg,
        use: "sig"
    });
    if (!key) {
        throw new RPError(`no key found in client jwks to sign a client assertion with using alg ${alg}`);
    }
    return new jose.CompactSign(Buffer.from(JSON.stringify(payload))).setProtectedHeader({
        alg,
        kid: key.jwk && key.jwk.kid
    }).sign(key.keyObject);
}
async function authFor(endpoint, { clientAssertionPayload  } = {}) {
    const authMethod = this[`${endpoint}_endpoint_auth_method`];
    switch(authMethod){
        case "self_signed_tls_client_auth":
        case "tls_client_auth":
        case "none":
            return {
                form: {
                    client_id: this.client_id
                }
            };
        case "client_secret_post":
            if (!this.client_secret) {
                throw new TypeError("client_secret_post client authentication method requires a client_secret");
            }
            return {
                form: {
                    client_id: this.client_id,
                    client_secret: this.client_secret
                }
            };
        case "private_key_jwt":
        case "client_secret_jwt":
            {
                const timestamp = now();
                const audience = [
                    ...new Set([
                        this.issuer.issuer,
                        this.issuer.token_endpoint
                    ].filter(Boolean))
                ];
                const assertion = await clientAssertion.call(this, endpoint, {
                    iat: timestamp,
                    exp: timestamp + 60,
                    jti: random(),
                    iss: this.client_id,
                    sub: this.client_id,
                    aud: audience,
                    ...clientAssertionPayload
                });
                return {
                    form: {
                        client_id: this.client_id,
                        client_assertion: assertion,
                        client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"
                    }
                };
            }
        case "client_secret_basic":
            {
                // This is correct behaviour, see https://tools.ietf.org/html/rfc6749#section-2.3.1 and the
                // related appendix. (also https://github.com/panva/node-openid-client/pull/91)
                // > The client identifier is encoded using the
                // > "application/x-www-form-urlencoded" encoding algorithm per
                // > Appendix B, and the encoded value is used as the username; the client
                // > password is encoded using the same algorithm and used as the
                // > password.
                if (!this.client_secret) {
                    throw new TypeError("client_secret_basic client authentication method requires a client_secret");
                }
                const encoded = `${formUrlEncode(this.client_id)}:${formUrlEncode(this.client_secret)}`;
                const value = Buffer.from(encoded).toString("base64");
                return {
                    headers: {
                        Authorization: `Basic ${value}`
                    }
                };
            }
        default:
            {
                throw new TypeError(`missing, or unsupported, ${endpoint}_endpoint_auth_method`);
            }
    }
}
function resolveResponseType() {
    const { length , 0: value  } = this.response_types;
    if (length === 1) {
        return value;
    }
    return undefined;
}
function resolveRedirectUri() {
    const { length , 0: value  } = this.redirect_uris || [];
    if (length === 1) {
        return value;
    }
    return undefined;
}
async function authenticatedPost(endpoint, opts, { clientAssertionPayload , endpointAuthMethod =endpoint , DPoP  } = {}) {
    const auth = await authFor.call(this, endpointAuthMethod, {
        clientAssertionPayload
    });
    const requestOpts = merge(opts, auth);
    const mTLS = this[`${endpointAuthMethod}_endpoint_auth_method`].includes("tls_client_auth") || endpoint === "token" && this.tls_client_certificate_bound_access_tokens;
    let targetUrl;
    if (mTLS && this.issuer.mtls_endpoint_aliases) {
        targetUrl = this.issuer.mtls_endpoint_aliases[`${endpoint}_endpoint`];
    }
    targetUrl = targetUrl || this.issuer[`${endpoint}_endpoint`];
    if ("form" in requestOpts) {
        for (const [key, value] of Object.entries(requestOpts.form)){
            if (typeof value === "undefined") {
                delete requestOpts.form[key];
            }
        }
    }
    return request.call(this, {
        ...requestOpts,
        method: "POST",
        url: targetUrl,
        headers: {
            ...endpoint !== "revocation" ? {
                Accept: "application/json"
            } : undefined,
            ...requestOpts.headers
        }
    }, {
        mTLS,
        DPoP
    });
}
module.exports = {
    resolveResponseType,
    resolveRedirectUri,
    authFor,
    authenticatedPost
};


/***/ }),

/***/ 14126:
/***/ ((module) => {

"use strict";

const HTTP_OPTIONS = Symbol();
const CLOCK_TOLERANCE = Symbol();
module.exports = {
    CLOCK_TOLERANCE,
    HTTP_OPTIONS
};


/***/ }),

/***/ 57797:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const base64url = __webpack_require__(12506);
module.exports = (token)=>{
    if (typeof token !== "string" || !token) {
        throw new TypeError("JWT must be a string");
    }
    const { 0: header , 1: payload , 2: signature , length  } = token.split(".");
    if (length === 5) {
        throw new TypeError("encrypted JWTs cannot be decoded");
    }
    if (length !== 3) {
        throw new Error("JWTs must have three components");
    }
    try {
        return {
            header: JSON.parse(base64url.decode(header)),
            payload: JSON.parse(base64url.decode(payload)),
            signature
        };
    } catch (err) {
        throw new Error("JWT is malformed");
    }
};


/***/ }),

/***/ 39751:
/***/ ((module) => {

"use strict";

module.exports = globalThis.structuredClone || ((obj)=>JSON.parse(JSON.stringify(obj)));


/***/ }),

/***/ 57318:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const isPlainObject = __webpack_require__(31646);
function defaults(deep, target, ...sources) {
    for (const source of sources){
        if (!isPlainObject(source)) {
            continue;
        }
        for (const [key, value] of Object.entries(source)){
            /* istanbul ignore if */ if (key === "__proto__" || key === "constructor") {
                continue;
            }
            if (typeof target[key] === "undefined" && typeof value !== "undefined") {
                target[key] = value;
            }
            if (deep && isPlainObject(target[key]) && isPlainObject(value)) {
                defaults(true, target[key], value);
            }
        }
    }
    return target;
}
module.exports = defaults.bind(undefined, false);
module.exports.deep = defaults.bind(undefined, true);


/***/ }),

/***/ 93004:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const { createHash , randomBytes  } = __webpack_require__(6113);
const base64url = __webpack_require__(12506);
const random = (bytes = 32)=>base64url.encode(randomBytes(bytes));
module.exports = {
    random,
    state: random,
    nonce: random,
    codeVerifier: random,
    codeChallenge: (codeVerifier)=>base64url.encode(createHash("sha256").update(codeVerifier).digest())
};


/***/ }),

/***/ 52837:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const util = __webpack_require__(73837);
const crypto = __webpack_require__(6113);
module.exports = util.types.isKeyObject || ((obj)=>obj && obj instanceof crypto.KeyObject);


/***/ }),

/***/ 31646:
/***/ ((module) => {

"use strict";

module.exports = (a)=>!!a && a.constructor === Object;


/***/ }),

/***/ 8266:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const objectHash = __webpack_require__(7348);
const LRU = __webpack_require__(8338);
const { RPError  } = __webpack_require__(9881);
const { assertIssuerConfiguration  } = __webpack_require__(71573);
const KeyStore = __webpack_require__(95648);
const { keystores  } = __webpack_require__(22967);
const processResponse = __webpack_require__(37823);
const request = __webpack_require__(21468);
const inFlight = new WeakMap();
const caches = new WeakMap();
const lrus = (ctx)=>{
    if (!caches.has(ctx)) {
        caches.set(ctx, new LRU({
            max: 100
        }));
    }
    return caches.get(ctx);
};
async function getKeyStore(reload = false) {
    assertIssuerConfiguration(this, "jwks_uri");
    const keystore = keystores.get(this);
    const cache = lrus(this);
    if (reload || !keystore) {
        if (inFlight.has(this)) {
            return inFlight.get(this);
        }
        cache.reset();
        inFlight.set(this, (async ()=>{
            const response = await request.call(this, {
                method: "GET",
                responseType: "json",
                url: this.jwks_uri,
                headers: {
                    Accept: "application/json, application/jwk-set+json"
                }
            }).finally(()=>{
                inFlight.delete(this);
            });
            const jwks = processResponse(response);
            const joseKeyStore = KeyStore.fromJWKS(jwks, {
                onlyPublic: true
            });
            cache.set("throttle", true, 60 * 1000);
            keystores.set(this, joseKeyStore);
            return joseKeyStore;
        })());
        return inFlight.get(this);
    }
    return keystore;
}
async function queryKeyStore({ kid , kty , alg , use  }, { allowMulti =false  } = {}) {
    const cache = lrus(this);
    const def = {
        kid,
        kty,
        alg,
        use
    };
    const defHash = objectHash(def, {
        algorithm: "sha256",
        ignoreUnknown: true,
        unorderedArrays: true,
        unorderedSets: true
    });
    // refresh keystore on every unknown key but also only upto once every minute
    const freshJwksUri = cache.get(defHash) || cache.get("throttle");
    const keystore = await getKeyStore.call(this, !freshJwksUri);
    const keys = keystore.all(def);
    delete def.use;
    if (keys.length === 0) {
        throw new RPError({
            printf: [
                "no valid key found in issuer's jwks_uri for key parameters %j",
                def
            ],
            jwks: keystore
        });
    }
    if (!allowMulti && keys.length > 1 && !kid) {
        throw new RPError({
            printf: [
                "multiple matching keys found in issuer's jwks_uri for key parameters %j, kid must be provided in this case",
                def
            ],
            jwks: keystore
        });
    }
    cache.set(defHash, true);
    return keys;
}
module.exports.queryKeyStore = queryKeyStore;
module.exports.keystore = getKeyStore;


/***/ }),

/***/ 95648:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const jose = __webpack_require__(69167);
const clone = __webpack_require__(39751);
const isPlainObject = __webpack_require__(31646);
const isKeyObject = __webpack_require__(52837);
const internal = Symbol();
function fauxAlg(kty) {
    switch(kty){
        case "RSA":
            return "RSA-OAEP";
        case "EC":
            return "ECDH-ES";
        case "OKP":
            return "ECDH-ES";
        case "oct":
            return "HS256";
        default:
            return undefined;
    }
}
const keyscore = (key, { alg , use  })=>{
    let score = 0;
    if (alg && key.alg) {
        score++;
    }
    if (use && key.use) {
        score++;
    }
    return score;
};
function getKtyFromAlg(alg) {
    switch(typeof alg === "string" && alg.slice(0, 2)){
        case "RS":
        case "PS":
            return "RSA";
        case "ES":
            return "EC";
        case "Ed":
            return "OKP";
        default:
            return undefined;
    }
}
function getAlgorithms(use, alg, kty, crv) {
    // Ed25519, Ed448, and secp256k1 always have "alg"
    // OKP always has use
    if (alg) {
        return new Set([
            alg
        ]);
    }
    switch(kty){
        case "EC":
            {
                let algs = [];
                if (use === "enc" || use === undefined) {
                    algs = algs.concat([
                        "ECDH-ES",
                        "ECDH-ES+A128KW",
                        "ECDH-ES+A192KW",
                        "ECDH-ES+A256KW"
                    ]);
                }
                if (use === "sig" || use === undefined) {
                    algs = algs.concat([
                        `ES${crv.slice(-3)}`.replace("21", "12")
                    ]);
                }
                return new Set(algs);
            }
        case "OKP":
            {
                return new Set([
                    "ECDH-ES",
                    "ECDH-ES+A128KW",
                    "ECDH-ES+A192KW",
                    "ECDH-ES+A256KW"
                ]);
            }
        case "RSA":
            {
                let algs = [];
                if (use === "enc" || use === undefined) {
                    algs = algs.concat([
                        "RSA-OAEP",
                        "RSA-OAEP-256",
                        "RSA-OAEP-384",
                        "RSA-OAEP-512",
                        "RSA1_5"
                    ]);
                }
                if (use === "sig" || use === undefined) {
                    algs = algs.concat([
                        "PS256",
                        "PS384",
                        "PS512",
                        "RS256",
                        "RS384",
                        "RS512"
                    ]);
                }
                return new Set(algs);
            }
        default:
            throw new Error("unreachable");
    }
}
module.exports = class KeyStore {
    #keys;
    constructor(i, keys){
        if (i !== internal) throw new Error("invalid constructor call");
        this.#keys = keys;
    }
    toJWKS() {
        return {
            keys: this.map(({ jwk: { d , p , q , dp , dq , qi , ...jwk }  })=>jwk)
        };
    }
    all({ alg , kid , use  } = {}) {
        if (!use || !alg) {
            throw new Error();
        }
        const kty = getKtyFromAlg(alg);
        const search = {
            alg,
            use
        };
        return this.filter((key)=>{
            let candidate = true;
            if (candidate && kty !== undefined && key.jwk.kty !== kty) {
                candidate = false;
            }
            if (candidate && kid !== undefined && key.jwk.kid !== kid) {
                candidate = false;
            }
            if (candidate && use !== undefined && key.jwk.use !== undefined && key.jwk.use !== use) {
                candidate = false;
            }
            if (candidate && key.jwk.alg && key.jwk.alg !== alg) {
                candidate = false;
            } else if (!key.algorithms.has(alg)) {
                candidate = false;
            }
            return candidate;
        }).sort((first, second)=>keyscore(second, search) - keyscore(first, search));
    }
    get(...args) {
        return this.all(...args)[0];
    }
    static async fromJWKS(jwks, { onlyPublic =false , onlyPrivate =false  } = {}) {
        if (!isPlainObject(jwks) || !Array.isArray(jwks.keys) || jwks.keys.some((k)=>!isPlainObject(k) || !("kty" in k))) {
            throw new TypeError("jwks must be a JSON Web Key Set formatted object");
        }
        const keys = [];
        for (let jwk of jwks.keys){
            jwk = clone(jwk);
            const { kty , kid , crv  } = jwk;
            let { alg , use  } = jwk;
            if (typeof kty !== "string" || !kty) {
                continue;
            }
            if (use !== undefined && use !== "sig" && use !== "enc") {
                continue;
            }
            if (typeof alg !== "string" && alg !== undefined) {
                continue;
            }
            if (typeof kid !== "string" && kid !== undefined) {
                continue;
            }
            if (kty === "EC" && use === "sig") {
                switch(crv){
                    case "P-256":
                        alg = "ES256";
                        break;
                    case "P-384":
                        alg = "ES384";
                        break;
                    case "P-521":
                        alg = "ES512";
                        break;
                    default:
                        break;
                }
            }
            if (crv === "secp256k1") {
                use = "sig";
                alg = "ES256K";
            }
            if (kty === "OKP") {
                switch(crv){
                    case "Ed25519":
                    case "Ed448":
                        use = "sig";
                        alg = "EdDSA";
                        break;
                    case "X25519":
                    case "X448":
                        use = "enc";
                        break;
                    default:
                        break;
                }
            }
            if (alg && !use) {
                switch(true){
                    case alg.startsWith("ECDH"):
                        use = "enc";
                        break;
                    case alg.startsWith("RSA"):
                        use = "enc";
                        break;
                    default:
                        break;
                }
            }
            const keyObject = await jose.importJWK(jwk, alg || fauxAlg(jwk.kty)).catch(()=>{});
            if (!keyObject) continue;
            if (keyObject instanceof Uint8Array || keyObject.type === "secret") {
                if (onlyPrivate) {
                    throw new Error("jwks must only contain private keys");
                }
                continue;
            }
            if (!isKeyObject(keyObject)) {
                throw new Error("what?!");
            }
            if (onlyPrivate && keyObject.type !== "private") {
                throw new Error("jwks must only contain private keys");
            }
            if (onlyPublic && keyObject.type !== "public") {
                continue;
            }
            if (kty === "RSA" && keyObject.asymmetricKeySize < 2048) {
                continue;
            }
            keys.push({
                jwk: {
                    ...jwk,
                    alg,
                    use
                },
                keyObject,
                get algorithms () {
                    Object.defineProperty(this, "algorithms", {
                        value: getAlgorithms(this.jwk.use, this.jwk.alg, this.jwk.kty, this.jwk.crv),
                        enumerable: true,
                        configurable: false
                    });
                    return this.algorithms;
                }
            });
        }
        return new this(internal, keys);
    }
    filter(...args) {
        return this.#keys.filter(...args);
    }
    find(...args) {
        return this.#keys.find(...args);
    }
    every(...args) {
        return this.#keys.every(...args);
    }
    some(...args) {
        return this.#keys.some(...args);
    }
    map(...args) {
        return this.#keys.map(...args);
    }
    forEach(...args) {
        return this.#keys.forEach(...args);
    }
    reduce(...args) {
        return this.#keys.reduce(...args);
    }
    sort(...args) {
        return this.#keys.sort(...args);
    }
    *[Symbol.iterator]() {
        for (const key of this.#keys){
            yield key;
        }
    }
};


/***/ }),

/***/ 52945:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const isPlainObject = __webpack_require__(31646);
function merge(target, ...sources) {
    for (const source of sources){
        if (!isPlainObject(source)) {
            continue;
        }
        for (const [key, value] of Object.entries(source)){
            /* istanbul ignore if */ if (key === "__proto__" || key === "constructor") {
                continue;
            }
            if (isPlainObject(target[key]) && isPlainObject(value)) {
                target[key] = merge(target[key], value);
            } else if (typeof value !== "undefined") {
                target[key] = value;
            }
        }
    }
    return target;
}
module.exports = merge;


/***/ }),

/***/ 64215:
/***/ ((module) => {

"use strict";

module.exports = function pick(object, ...paths) {
    const obj = {};
    for (const path of paths){
        if (object[path] !== undefined) {
            obj[path] = object[path];
        }
    }
    return obj;
};


/***/ }),

/***/ 37823:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const { STATUS_CODES  } = __webpack_require__(13685);
const { format  } = __webpack_require__(73837);
const { OPError  } = __webpack_require__(9881);
const parseWwwAuthenticate = __webpack_require__(68639);
const throwAuthenticateErrors = (response)=>{
    const params = parseWwwAuthenticate(response.headers["www-authenticate"]);
    if (params.error) {
        throw new OPError(params, response);
    }
};
const isStandardBodyError = (response)=>{
    let result = false;
    try {
        let jsonbody;
        if (typeof response.body !== "object" || Buffer.isBuffer(response.body)) {
            jsonbody = JSON.parse(response.body);
        } else {
            jsonbody = response.body;
        }
        result = typeof jsonbody.error === "string" && jsonbody.error.length;
        if (result) Object.defineProperty(response, "body", {
            value: jsonbody,
            configurable: true
        });
    } catch (err) {}
    return result;
};
function processResponse(response, { statusCode =200 , body =true , bearer =false  } = {}) {
    if (response.statusCode !== statusCode) {
        if (bearer) {
            throwAuthenticateErrors(response);
        }
        if (isStandardBodyError(response)) {
            throw new OPError(response.body, response);
        }
        throw new OPError({
            error: format("expected %i %s, got: %i %s", statusCode, STATUS_CODES[statusCode], response.statusCode, STATUS_CODES[response.statusCode])
        }, response);
    }
    if (body && !response.body) {
        throw new OPError({
            error: format("expected %i %s with body but no body was returned", statusCode, STATUS_CODES[statusCode])
        }, response);
    }
    return response.body;
}
module.exports = processResponse;


/***/ }),

/***/ 21468:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const assert = __webpack_require__(39491);
const querystring = __webpack_require__(63477);
const http = __webpack_require__(13685);
const https = __webpack_require__(95687);
const { once  } = __webpack_require__(82361);
const { URL  } = __webpack_require__(57310);
const LRU = __webpack_require__(8338);
const pkg = __webpack_require__(67891);
const { RPError  } = __webpack_require__(9881);
const pick = __webpack_require__(64215);
const { deep: defaultsDeep  } = __webpack_require__(57318);
const { HTTP_OPTIONS  } = __webpack_require__(14126);
let DEFAULT_HTTP_OPTIONS;
const NQCHAR = /^[\x21\x23-\x5B\x5D-\x7E]+$/;
const allowed = [
    "agent",
    "ca",
    "cert",
    "crl",
    "headers",
    "key",
    "lookup",
    "passphrase",
    "pfx",
    "timeout"
];
const setDefaults = (props, options)=>{
    DEFAULT_HTTP_OPTIONS = defaultsDeep({}, props.length ? pick(options, ...props) : options, DEFAULT_HTTP_OPTIONS);
};
setDefaults([], {
    headers: {
        "User-Agent": `${pkg.name}/${pkg.version} (${pkg.homepage})`
    },
    timeout: 3500
});
function send(req, body, contentType) {
    if (contentType) {
        req.removeHeader("content-type");
        req.setHeader("content-type", contentType);
    }
    if (body) {
        req.removeHeader("content-length");
        req.setHeader("content-length", Buffer.byteLength(body));
        req.write(body);
    }
    req.end();
}
const nonces = new LRU({
    max: 100
});
module.exports = async function request(options, { accessToken , mTLS =false , DPoP  } = {}) {
    let url;
    try {
        url = new URL(options.url);
        delete options.url;
        assert(/^(https?:)$/.test(url.protocol));
    } catch (err) {
        throw new TypeError("only valid absolute URLs can be requested");
    }
    const optsFn = this[HTTP_OPTIONS];
    let opts = options;
    const nonceKey = `${url.origin}${url.pathname}`;
    if (DPoP && "dpopProof" in this) {
        opts.headers = opts.headers || {};
        opts.headers.DPoP = await this.dpopProof({
            htu: `${url.origin}${url.pathname}`,
            htm: options.method,
            nonce: nonces.get(nonceKey)
        }, DPoP, accessToken);
    }
    let userOptions;
    if (optsFn) {
        userOptions = pick(optsFn.call(this, url, defaultsDeep({}, opts, DEFAULT_HTTP_OPTIONS)), ...allowed);
    }
    opts = defaultsDeep({}, userOptions, opts, DEFAULT_HTTP_OPTIONS);
    if (mTLS && !opts.pfx && !(opts.key && opts.cert)) {
        throw new TypeError("mutual-TLS certificate and key not set");
    }
    if (opts.searchParams) {
        for (const [key, value] of Object.entries(opts.searchParams)){
            url.searchParams.delete(key);
            url.searchParams.set(key, value);
        }
    }
    let responseType;
    let form;
    let json;
    let body;
    ({ form , responseType , json , body , ...opts } = opts);
    for (const [key, value] of Object.entries(opts.headers || {})){
        if (value === undefined) {
            delete opts.headers[key];
        }
    }
    let response;
    const req = (url.protocol === "https:" ? https.request : http.request)(url.href, opts);
    return (async ()=>{
        if (json) {
            send(req, JSON.stringify(json), "application/json");
        } else if (form) {
            send(req, querystring.stringify(form), "application/x-www-form-urlencoded");
        } else if (body) {
            send(req, body);
        } else {
            send(req);
        }
        [response] = await Promise.race([
            once(req, "response"),
            once(req, "timeout")
        ]);
        // timeout reached
        if (!response) {
            req.destroy();
            throw new RPError(`outgoing request timed out after ${opts.timeout}ms`);
        }
        const parts = [];
        for await (const part of response){
            parts.push(part);
        }
        if (parts.length) {
            switch(responseType){
                case "json":
                    {
                        Object.defineProperty(response, "body", {
                            get () {
                                let value = Buffer.concat(parts);
                                try {
                                    value = JSON.parse(value);
                                } catch (err) {
                                    Object.defineProperty(err, "response", {
                                        value: response
                                    });
                                    throw err;
                                } finally{
                                    Object.defineProperty(response, "body", {
                                        value,
                                        configurable: true
                                    });
                                }
                                return value;
                            },
                            configurable: true
                        });
                        break;
                    }
                case undefined:
                case "buffer":
                    {
                        Object.defineProperty(response, "body", {
                            get () {
                                const value = Buffer.concat(parts);
                                Object.defineProperty(response, "body", {
                                    value,
                                    configurable: true
                                });
                                return value;
                            },
                            configurable: true
                        });
                        break;
                    }
                default:
                    throw new TypeError("unsupported responseType request option");
            }
        }
        return response;
    })().catch((err)=>{
        if (response) Object.defineProperty(err, "response", {
            value: response
        });
        throw err;
    }).finally(()=>{
        const dpopNonce = response && response.headers["dpop-nonce"];
        if (dpopNonce && NQCHAR.test(dpopNonce)) {
            nonces.set(nonceKey, dpopNonce);
        }
    });
};
module.exports.setDefaults = setDefaults.bind(undefined, allowed);


/***/ }),

/***/ 98584:
/***/ ((module) => {

"use strict";

module.exports = ()=>Math.floor(Date.now() / 1000);


/***/ }),

/***/ 22967:
/***/ ((module) => {

"use strict";

module.exports.keystores = new WeakMap();


/***/ }),

/***/ 83171:
/***/ ((module) => {

"use strict";
// Credit: https://github.com/rohe/pyoidc/blob/master/src/oic/utils/webfinger.py
// -- Normalization --
// A string of any other type is interpreted as a URI either the form of scheme
// "://" authority path-abempty [ "?" query ] [ "#" fragment ] or authority
// path-abempty [ "?" query ] [ "#" fragment ] per RFC 3986 [RFC3986] and is
// normalized according to the following rules:
//
// If the user input Identifier does not have an RFC 3986 [RFC3986] scheme
// portion, the string is interpreted as [userinfo "@"] host [":" port]
// path-abempty [ "?" query ] [ "#" fragment ] per RFC 3986 [RFC3986].
// If the userinfo component is present and all of the path component, query
// component, and port component are empty, the acct scheme is assumed. In this
// case, the normalized URI is formed by prefixing acct: to the string as the
// scheme. Per the 'acct' URI Scheme [I‑D.ietf‑appsawg‑acct‑uri], if there is an
// at-sign character ('@') in the userinfo component, it needs to be
// percent-encoded as described in RFC 3986 [RFC3986].
// For all other inputs without a scheme portion, the https scheme is assumed,
// and the normalized URI is formed by prefixing https:// to the string as the
// scheme.
// If the resulting URI contains a fragment portion, it MUST be stripped off
// together with the fragment delimiter character "#".
// The WebFinger [I‑D.ietf‑appsawg‑webfinger] Resource in this case is the
// resulting URI, and the WebFinger Host is the authority component.
//
// Note: Since the definition of authority in RFC 3986 [RFC3986] is
// [ userinfo "@" ] host [ ":" port ], it is legal to have a user input
// identifier like userinfo@host:port, e.g., alice@example.com:8080.

const PORT = /^\d+$/;
function hasScheme(input) {
    if (input.includes("://")) return true;
    const authority = input.replace(/(\/|\?)/g, "#").split("#")[0];
    if (authority.includes(":")) {
        const index = authority.indexOf(":");
        const hostOrPort = authority.slice(index + 1);
        if (!PORT.test(hostOrPort)) {
            return true;
        }
    }
    return false;
}
function acctSchemeAssumed(input) {
    if (!input.includes("@")) return false;
    const parts = input.split("@");
    const host = parts[parts.length - 1];
    return !(host.includes(":") || host.includes("/") || host.includes("?"));
}
function normalize(input) {
    if (typeof input !== "string") {
        throw new TypeError("input must be a string");
    }
    let output;
    if (hasScheme(input)) {
        output = input;
    } else if (acctSchemeAssumed(input)) {
        output = `acct:${input}`;
    } else {
        output = `https://${input}`;
    }
    return output.split("#")[0];
}
module.exports = normalize;


/***/ }),

/***/ 68639:
/***/ ((module) => {

"use strict";

const REGEXP = /(\w+)=("[^"]*")/g;
module.exports = (wwwAuthenticate)=>{
    const params = {};
    try {
        while(REGEXP.exec(wwwAuthenticate) !== null){
            if (RegExp.$1 && RegExp.$2) {
                params[RegExp.$1] = RegExp.$2.slice(1, -1);
            }
        }
    } catch (err) {}
    return params;
};


/***/ }),

/***/ 65752:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const Issuer = __webpack_require__(39274);
const { OPError , RPError  } = __webpack_require__(9881);
const Strategy = __webpack_require__(37385);
const TokenSet = __webpack_require__(11039);
const { CLOCK_TOLERANCE , HTTP_OPTIONS  } = __webpack_require__(14126);
const generators = __webpack_require__(93004);
const { setDefaults  } = __webpack_require__(21468);
module.exports = {
    Issuer,
    Strategy,
    TokenSet,
    errors: {
        OPError,
        RPError
    },
    custom: {
        setHttpOptionsDefaults: setDefaults,
        http_options: HTTP_OPTIONS,
        clock_tolerance: CLOCK_TOLERANCE
    },
    generators
};


/***/ }),

/***/ 39274:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const { inspect  } = __webpack_require__(73837);
const url = __webpack_require__(57310);
const { RPError  } = __webpack_require__(9881);
const getClient = __webpack_require__(3508);
const registry = __webpack_require__(64343);
const processResponse = __webpack_require__(37823);
const webfingerNormalize = __webpack_require__(83171);
const request = __webpack_require__(21468);
const clone = __webpack_require__(39751);
const { keystore  } = __webpack_require__(8266);
const AAD_MULTITENANT_DISCOVERY = [
    "https://login.microsoftonline.com/common/.well-known/openid-configuration",
    "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration",
    "https://login.microsoftonline.com/organizations/v2.0/.well-known/openid-configuration",
    "https://login.microsoftonline.com/consumers/v2.0/.well-known/openid-configuration"
];
const AAD_MULTITENANT = Symbol();
const ISSUER_DEFAULTS = {
    claim_types_supported: [
        "normal"
    ],
    claims_parameter_supported: false,
    grant_types_supported: [
        "authorization_code",
        "implicit"
    ],
    request_parameter_supported: false,
    request_uri_parameter_supported: true,
    require_request_uri_registration: false,
    response_modes_supported: [
        "query",
        "fragment"
    ],
    token_endpoint_auth_methods_supported: [
        "client_secret_basic"
    ]
};
class Issuer {
    #metadata;
    constructor(meta = {}){
        const aadIssValidation = meta[AAD_MULTITENANT];
        delete meta[AAD_MULTITENANT];
        [
            "introspection",
            "revocation"
        ].forEach((endpoint)=>{
            // if intro/revocation endpoint auth specific meta is missing use the token ones if they
            // are defined
            if (meta[`${endpoint}_endpoint`] && meta[`${endpoint}_endpoint_auth_methods_supported`] === undefined && meta[`${endpoint}_endpoint_auth_signing_alg_values_supported`] === undefined) {
                if (meta.token_endpoint_auth_methods_supported) {
                    meta[`${endpoint}_endpoint_auth_methods_supported`] = meta.token_endpoint_auth_methods_supported;
                }
                if (meta.token_endpoint_auth_signing_alg_values_supported) {
                    meta[`${endpoint}_endpoint_auth_signing_alg_values_supported`] = meta.token_endpoint_auth_signing_alg_values_supported;
                }
            }
        });
        this.#metadata = new Map();
        Object.entries(meta).forEach(([key, value])=>{
            this.#metadata.set(key, value);
            if (!this[key]) {
                Object.defineProperty(this, key, {
                    get () {
                        return this.#metadata.get(key);
                    },
                    enumerable: true
                });
            }
        });
        registry.set(this.issuer, this);
        const Client = getClient(this, aadIssValidation);
        Object.defineProperties(this, {
            Client: {
                value: Client,
                enumerable: true
            },
            FAPI1Client: {
                value: class FAPI1Client extends Client {
                },
                enumerable: true
            }
        });
    }
    get metadata() {
        return clone(Object.fromEntries(this.#metadata.entries()));
    }
    static async webfinger(input) {
        const resource = webfingerNormalize(input);
        const { host  } = url.parse(resource);
        const webfingerUrl = `https://${host}/.well-known/webfinger`;
        const response = await request.call(this, {
            method: "GET",
            url: webfingerUrl,
            responseType: "json",
            searchParams: {
                resource,
                rel: "http://openid.net/specs/connect/1.0/issuer"
            },
            headers: {
                Accept: "application/json"
            }
        });
        const body = processResponse(response);
        const location = Array.isArray(body.links) && body.links.find((link)=>typeof link === "object" && link.rel === "http://openid.net/specs/connect/1.0/issuer" && link.href);
        if (!location) {
            throw new RPError({
                message: "no issuer found in webfinger response",
                body
            });
        }
        if (typeof location.href !== "string" || !location.href.startsWith("https://")) {
            throw new RPError({
                printf: [
                    "invalid issuer location %s",
                    location.href
                ],
                body
            });
        }
        const expectedIssuer = location.href;
        if (registry.has(expectedIssuer)) {
            return registry.get(expectedIssuer);
        }
        const issuer = await this.discover(expectedIssuer);
        if (issuer.issuer !== expectedIssuer) {
            registry.del(issuer.issuer);
            throw new RPError("discovered issuer mismatch, expected %s, got: %s", expectedIssuer, issuer.issuer);
        }
        return issuer;
    }
    static async discover(uri) {
        const parsed = url.parse(uri);
        if (parsed.pathname.includes("/.well-known/")) {
            const response = await request.call(this, {
                method: "GET",
                responseType: "json",
                url: uri,
                headers: {
                    Accept: "application/json"
                }
            });
            const body = processResponse(response);
            return new Issuer({
                ...ISSUER_DEFAULTS,
                ...body,
                [AAD_MULTITENANT]: !!AAD_MULTITENANT_DISCOVERY.find((discoveryURL)=>uri.startsWith(discoveryURL))
            });
        }
        let pathname;
        if (parsed.pathname.endsWith("/")) {
            pathname = `${parsed.pathname}.well-known/openid-configuration`;
        } else {
            pathname = `${parsed.pathname}/.well-known/openid-configuration`;
        }
        const wellKnownUri = url.format({
            ...parsed,
            pathname
        });
        const response = await request.call(this, {
            method: "GET",
            responseType: "json",
            url: wellKnownUri,
            headers: {
                Accept: "application/json"
            }
        });
        const body = processResponse(response);
        return new Issuer({
            ...ISSUER_DEFAULTS,
            ...body,
            [AAD_MULTITENANT]: !!AAD_MULTITENANT_DISCOVERY.find((discoveryURL)=>wellKnownUri.startsWith(discoveryURL))
        });
    }
    async reloadJwksUri() {
        await keystore.call(this, true);
    }
    /* istanbul ignore next */ [inspect.custom]() {
        return `${this.constructor.name} ${inspect(this.metadata, {
            depth: Infinity,
            colors: process.stdout.isTTY,
            compact: false,
            sorted: true
        })}`;
    }
}
module.exports = Issuer;


/***/ }),

/***/ 64343:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const LRU = __webpack_require__(8338);
module.exports = new LRU({
    max: 100
});


/***/ }),

/***/ 37385:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const url = __webpack_require__(57310);
const { format  } = __webpack_require__(73837);
const cloneDeep = __webpack_require__(39751);
const { RPError , OPError  } = __webpack_require__(9881);
const { BaseClient  } = __webpack_require__(3508);
const { random , codeChallenge  } = __webpack_require__(93004);
const pick = __webpack_require__(64215);
const { resolveResponseType , resolveRedirectUri  } = __webpack_require__(91132);
function verified(err, user, info = {}) {
    if (err) {
        this.error(err);
    } else if (!user) {
        this.fail(info);
    } else {
        this.success(user, info);
    }
}
function OpenIDConnectStrategy({ client , params ={} , passReqToCallback =false , sessionKey , usePKCE =true , extras ={}  } = {}, verify) {
    if (!(client instanceof BaseClient)) {
        throw new TypeError("client must be an instance of openid-client Client");
    }
    if (typeof verify !== "function") {
        throw new TypeError("verify callback must be a function");
    }
    if (!client.issuer || !client.issuer.issuer) {
        throw new TypeError("client must have an issuer with an identifier");
    }
    this._client = client;
    this._issuer = client.issuer;
    this._verify = verify;
    this._passReqToCallback = passReqToCallback;
    this._usePKCE = usePKCE;
    this._key = sessionKey || `oidc:${url.parse(this._issuer.issuer).hostname}`;
    this._params = cloneDeep(params);
    // state and nonce are handled in authenticate()
    delete this._params.state;
    delete this._params.nonce;
    this._extras = cloneDeep(extras);
    if (!this._params.response_type) this._params.response_type = resolveResponseType.call(client);
    if (!this._params.redirect_uri) this._params.redirect_uri = resolveRedirectUri.call(client);
    if (!this._params.scope) this._params.scope = "openid";
    if (this._usePKCE === true) {
        const supportedMethods = Array.isArray(this._issuer.code_challenge_methods_supported) ? this._issuer.code_challenge_methods_supported : false;
        if (supportedMethods && supportedMethods.includes("S256")) {
            this._usePKCE = "S256";
        } else if (supportedMethods && supportedMethods.includes("plain")) {
            this._usePKCE = "plain";
        } else if (supportedMethods) {
            throw new TypeError("neither code_challenge_method supported by the client is supported by the issuer");
        } else {
            this._usePKCE = "S256";
        }
    } else if (typeof this._usePKCE === "string" && ![
        "plain",
        "S256"
    ].includes(this._usePKCE)) {
        throw new TypeError(`${this._usePKCE} is not valid/implemented PKCE code_challenge_method`);
    }
    this.name = url.parse(client.issuer.issuer).hostname;
}
OpenIDConnectStrategy.prototype.authenticate = function authenticate(req, options) {
    (async ()=>{
        const client = this._client;
        if (!req.session) {
            throw new TypeError("authentication requires session support");
        }
        const reqParams = client.callbackParams(req);
        const sessionKey = this._key;
        const { 0: parameter , length  } = Object.keys(reqParams);
        /**
     * Start authentication request if this has no authorization response parameters or
     * this might a login initiated from a third party as per
     * https://openid.net/specs/openid-connect-core-1_0.html#ThirdPartyInitiatedLogin.
     */ if (length === 0 || length === 1 && parameter === "iss") {
            // provide options object with extra authentication parameters
            const params = {
                state: random(),
                ...this._params,
                ...options
            };
            if (!params.nonce && params.response_type.includes("id_token")) {
                params.nonce = random();
            }
            req.session[sessionKey] = pick(params, "nonce", "state", "max_age", "response_type");
            if (this._usePKCE && params.response_type.includes("code")) {
                const verifier = random();
                req.session[sessionKey].code_verifier = verifier;
                switch(this._usePKCE){
                    case "S256":
                        params.code_challenge = codeChallenge(verifier);
                        params.code_challenge_method = "S256";
                        break;
                    case "plain":
                        params.code_challenge = verifier;
                        break;
                }
            }
            this.redirect(client.authorizationUrl(params));
            return;
        }
        /* end authentication request */ /* start authentication response */ const session = req.session[sessionKey];
        if (Object.keys(session || {}).length === 0) {
            throw new Error(format('did not find expected authorization request details in session, req.session["%s"] is %j', sessionKey, session));
        }
        const { state , nonce , max_age: maxAge , code_verifier: codeVerifier , response_type: responseType  } = session;
        try {
            delete req.session[sessionKey];
        } catch (err) {}
        const opts = {
            redirect_uri: this._params.redirect_uri,
            ...options
        };
        const checks = {
            state,
            nonce,
            max_age: maxAge,
            code_verifier: codeVerifier,
            response_type: responseType
        };
        const tokenset = await client.callback(opts.redirect_uri, reqParams, checks, this._extras);
        const passReq = this._passReqToCallback;
        const loadUserinfo = this._verify.length > (passReq ? 3 : 2) && client.issuer.userinfo_endpoint;
        const args = [
            tokenset,
            verified.bind(this)
        ];
        if (loadUserinfo) {
            if (!tokenset.access_token) {
                throw new RPError({
                    message: "expected access_token to be returned when asking for userinfo in verify callback",
                    tokenset
                });
            }
            const userinfo = await client.userinfo(tokenset);
            args.splice(1, 0, userinfo);
        }
        if (passReq) {
            args.unshift(req);
        }
        this._verify(...args);
    /* end authentication response */ })().catch((error)=>{
        if (error instanceof OPError && error.error !== "server_error" && !error.error.startsWith("invalid") || error instanceof RPError) {
            this.fail(error);
        } else {
            this.error(error);
        }
    });
};
module.exports = OpenIDConnectStrategy;


/***/ }),

/***/ 11039:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const base64url = __webpack_require__(12506);
const now = __webpack_require__(98584);
class TokenSet {
    constructor(values){
        Object.assign(this, values);
        const { constructor , ...properties } = Object.getOwnPropertyDescriptors(this.constructor.prototype);
        Object.defineProperties(this, properties);
    }
    set expires_in(value) {
        this.expires_at = now() + Number(value);
    }
    get expires_in() {
        return Math.max.apply(null, [
            this.expires_at - now(),
            0
        ]);
    }
    expired() {
        return this.expires_in === 0;
    }
    claims() {
        if (!this.id_token) {
            throw new TypeError("id_token not present in TokenSet");
        }
        return JSON.parse(base64url.decode(this.id_token.split(".")[1]));
    }
}
module.exports = TokenSet;


/***/ }),

/***/ 7348:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

var crypto = __webpack_require__(6113);
/**
 * Exported function
 *
 * Options:
 *
 *  - `algorithm` hash algo to be used by this instance: *'sha1', 'md5'
 *  - `excludeValues` {true|*false} hash object keys, values ignored
 *  - `encoding` hash encoding, supports 'buffer', '*hex', 'binary', 'base64'
 *  - `ignoreUnknown` {true|*false} ignore unknown object types
 *  - `replacer` optional function that replaces values before hashing
 *  - `respectFunctionProperties` {*true|false} consider function properties when hashing
 *  - `respectFunctionNames` {*true|false} consider 'name' property of functions for hashing
 *  - `respectType` {*true|false} Respect special properties (prototype, constructor)
 *    when hashing to distinguish between types
 *  - `unorderedArrays` {true|*false} Sort all arrays before hashing
 *  - `unorderedSets` {*true|false} Sort `Set` and `Map` instances before hashing
 *  * = default
 *
 * @param {object} object value to hash
 * @param {object} options hashing options
 * @return {string} hash value
 * @api public
 */ exports = module.exports = objectHash;
function objectHash(object, options) {
    options = applyDefaults(object, options);
    return hash(object, options);
}
/**
 * Exported sugar methods
 *
 * @param {object} object value to hash
 * @return {string} hash value
 * @api public
 */ exports.sha1 = function(object) {
    return objectHash(object);
};
exports.keys = function(object) {
    return objectHash(object, {
        excludeValues: true,
        algorithm: "sha1",
        encoding: "hex"
    });
};
exports.MD5 = function(object) {
    return objectHash(object, {
        algorithm: "md5",
        encoding: "hex"
    });
};
exports.keysMD5 = function(object) {
    return objectHash(object, {
        algorithm: "md5",
        encoding: "hex",
        excludeValues: true
    });
};
// Internals
var hashes = crypto.getHashes ? crypto.getHashes().slice() : [
    "sha1",
    "md5"
];
hashes.push("passthrough");
var encodings = [
    "buffer",
    "hex",
    "binary",
    "base64"
];
function applyDefaults(object, sourceOptions) {
    sourceOptions = sourceOptions || {};
    // create a copy rather than mutating
    var options = {};
    options.algorithm = sourceOptions.algorithm || "sha1";
    options.encoding = sourceOptions.encoding || "hex";
    options.excludeValues = sourceOptions.excludeValues ? true : false;
    options.algorithm = options.algorithm.toLowerCase();
    options.encoding = options.encoding.toLowerCase();
    options.ignoreUnknown = sourceOptions.ignoreUnknown !== true ? false : true; // default to false
    options.respectType = sourceOptions.respectType === false ? false : true; // default to true
    options.respectFunctionNames = sourceOptions.respectFunctionNames === false ? false : true;
    options.respectFunctionProperties = sourceOptions.respectFunctionProperties === false ? false : true;
    options.unorderedArrays = sourceOptions.unorderedArrays !== true ? false : true; // default to false
    options.unorderedSets = sourceOptions.unorderedSets === false ? false : true; // default to false
    options.unorderedObjects = sourceOptions.unorderedObjects === false ? false : true; // default to true
    options.replacer = sourceOptions.replacer || undefined;
    options.excludeKeys = sourceOptions.excludeKeys || undefined;
    if (typeof object === "undefined") {
        throw new Error("Object argument required.");
    }
    // if there is a case-insensitive match in the hashes list, accept it
    // (i.e. SHA256 for sha256)
    for(var i = 0; i < hashes.length; ++i){
        if (hashes[i].toLowerCase() === options.algorithm.toLowerCase()) {
            options.algorithm = hashes[i];
        }
    }
    if (hashes.indexOf(options.algorithm) === -1) {
        throw new Error('Algorithm "' + options.algorithm + '"  not supported. ' + "supported values: " + hashes.join(", "));
    }
    if (encodings.indexOf(options.encoding) === -1 && options.algorithm !== "passthrough") {
        throw new Error('Encoding "' + options.encoding + '"  not supported. ' + "supported values: " + encodings.join(", "));
    }
    return options;
}
/** Check if the given function is a native function */ function isNativeFunction(f) {
    if (typeof f !== "function") {
        return false;
    }
    var exp = /^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i;
    return exp.exec(Function.prototype.toString.call(f)) != null;
}
function hash(object, options) {
    var hashingStream;
    if (options.algorithm !== "passthrough") {
        hashingStream = crypto.createHash(options.algorithm);
    } else {
        hashingStream = new PassThrough();
    }
    if (typeof hashingStream.write === "undefined") {
        hashingStream.write = hashingStream.update;
        hashingStream.end = hashingStream.update;
    }
    var hasher = typeHasher(options, hashingStream);
    hasher.dispatch(object);
    if (!hashingStream.update) {
        hashingStream.end("");
    }
    if (hashingStream.digest) {
        return hashingStream.digest(options.encoding === "buffer" ? undefined : options.encoding);
    }
    var buf = hashingStream.read();
    if (options.encoding === "buffer") {
        return buf;
    }
    return buf.toString(options.encoding);
}
/**
 * Expose streaming API
 *
 * @param {object} object  Value to serialize
 * @param {object} options  Options, as for hash()
 * @param {object} stream  A stream to write the serializiation to
 * @api public
 */ exports.writeToStream = function(object, options, stream) {
    if (typeof stream === "undefined") {
        stream = options;
        options = {};
    }
    options = applyDefaults(object, options);
    return typeHasher(options, stream).dispatch(object);
};
function typeHasher(options, writeTo, context) {
    context = context || [];
    var write = function(str) {
        if (writeTo.update) {
            return writeTo.update(str, "utf8");
        } else {
            return writeTo.write(str, "utf8");
        }
    };
    return {
        dispatch: function(value) {
            if (options.replacer) {
                value = options.replacer(value);
            }
            var type = typeof value;
            if (value === null) {
                type = "null";
            }
            //console.log("[DEBUG] Dispatch: ", value, "->", type, " -> ", "_" + type);
            return this["_" + type](value);
        },
        _object: function(object) {
            var pattern = /\[object (.*)\]/i;
            var objString = Object.prototype.toString.call(object);
            var objType = pattern.exec(objString);
            if (!objType) {
                objType = "unknown:[" + objString + "]";
            } else {
                objType = objType[1]; // take only the class name
            }
            objType = objType.toLowerCase();
            var objectNumber = null;
            if ((objectNumber = context.indexOf(object)) >= 0) {
                return this.dispatch("[CIRCULAR:" + objectNumber + "]");
            } else {
                context.push(object);
            }
            if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
                write("buffer:");
                return write(object);
            }
            if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
                if (this["_" + objType]) {
                    this["_" + objType](object);
                } else if (options.ignoreUnknown) {
                    return write("[" + objType + "]");
                } else {
                    throw new Error('Unknown object type "' + objType + '"');
                }
            } else {
                var keys = Object.keys(object);
                if (options.unorderedObjects) {
                    keys = keys.sort();
                }
                // Make sure to incorporate special properties, so
                // Types with different prototypes will produce
                // a different hash and objects derived from
                // different functions (`new Foo`, `new Bar`) will
                // produce different hashes.
                // We never do this for native functions since some
                // seem to break because of that.
                if (options.respectType !== false && !isNativeFunction(object)) {
                    keys.splice(0, 0, "prototype", "__proto__", "constructor");
                }
                if (options.excludeKeys) {
                    keys = keys.filter(function(key) {
                        return !options.excludeKeys(key);
                    });
                }
                write("object:" + keys.length + ":");
                var self = this;
                return keys.forEach(function(key) {
                    self.dispatch(key);
                    write(":");
                    if (!options.excludeValues) {
                        self.dispatch(object[key]);
                    }
                    write(",");
                });
            }
        },
        _array: function(arr, unordered) {
            unordered = typeof unordered !== "undefined" ? unordered : options.unorderedArrays !== false; // default to options.unorderedArrays
            var self = this;
            write("array:" + arr.length + ":");
            if (!unordered || arr.length <= 1) {
                return arr.forEach(function(entry) {
                    return self.dispatch(entry);
                });
            }
            // the unordered case is a little more complicated:
            // since there is no canonical ordering on objects,
            // i.e. {a:1} < {a:2} and {a:1} > {a:2} are both false,
            // we first serialize each entry using a PassThrough stream
            // before sorting.
            // also: we can’t use the same context array for all entries
            // since the order of hashing should *not* matter. instead,
            // we keep track of the additions to a copy of the context array
            // and add all of them to the global context array when we’re done
            var contextAdditions = [];
            var entries = arr.map(function(entry) {
                var strm = new PassThrough();
                var localContext = context.slice(); // make copy
                var hasher = typeHasher(options, strm, localContext);
                hasher.dispatch(entry);
                // take only what was added to localContext and append it to contextAdditions
                contextAdditions = contextAdditions.concat(localContext.slice(context.length));
                return strm.read().toString();
            });
            context = context.concat(contextAdditions);
            entries.sort();
            return this._array(entries, false);
        },
        _date: function(date) {
            return write("date:" + date.toJSON());
        },
        _symbol: function(sym) {
            return write("symbol:" + sym.toString());
        },
        _error: function(err) {
            return write("error:" + err.toString());
        },
        _boolean: function(bool) {
            return write("bool:" + bool.toString());
        },
        _string: function(string) {
            write("string:" + string.length + ":");
            write(string.toString());
        },
        _function: function(fn) {
            write("fn:");
            if (isNativeFunction(fn)) {
                this.dispatch("[native]");
            } else {
                this.dispatch(fn.toString());
            }
            if (options.respectFunctionNames !== false) {
                // Make sure we can still distinguish native functions
                // by their name, otherwise String and Function will
                // have the same hash
                this.dispatch("function-name:" + String(fn.name));
            }
            if (options.respectFunctionProperties) {
                this._object(fn);
            }
        },
        _number: function(number) {
            return write("number:" + number.toString());
        },
        _xml: function(xml) {
            return write("xml:" + xml.toString());
        },
        _null: function() {
            return write("Null");
        },
        _undefined: function() {
            return write("Undefined");
        },
        _regexp: function(regex) {
            return write("regex:" + regex.toString());
        },
        _uint8array: function(arr) {
            write("uint8array:");
            return this.dispatch(Array.prototype.slice.call(arr));
        },
        _uint8clampedarray: function(arr) {
            write("uint8clampedarray:");
            return this.dispatch(Array.prototype.slice.call(arr));
        },
        _int8array: function(arr) {
            write("uint8array:");
            return this.dispatch(Array.prototype.slice.call(arr));
        },
        _uint16array: function(arr) {
            write("uint16array:");
            return this.dispatch(Array.prototype.slice.call(arr));
        },
        _int16array: function(arr) {
            write("uint16array:");
            return this.dispatch(Array.prototype.slice.call(arr));
        },
        _uint32array: function(arr) {
            write("uint32array:");
            return this.dispatch(Array.prototype.slice.call(arr));
        },
        _int32array: function(arr) {
            write("uint32array:");
            return this.dispatch(Array.prototype.slice.call(arr));
        },
        _float32array: function(arr) {
            write("float32array:");
            return this.dispatch(Array.prototype.slice.call(arr));
        },
        _float64array: function(arr) {
            write("float64array:");
            return this.dispatch(Array.prototype.slice.call(arr));
        },
        _arraybuffer: function(arr) {
            write("arraybuffer:");
            return this.dispatch(new Uint8Array(arr));
        },
        _url: function(url) {
            return write("url:" + url.toString(), "utf8");
        },
        _map: function(map) {
            write("map:");
            var arr = Array.from(map);
            return this._array(arr, options.unorderedSets !== false);
        },
        _set: function(set) {
            write("set:");
            var arr = Array.from(set);
            return this._array(arr, options.unorderedSets !== false);
        },
        _file: function(file) {
            write("file:");
            return this.dispatch([
                file.name,
                file.size,
                file.type,
                file.lastModfied
            ]);
        },
        _blob: function() {
            if (options.ignoreUnknown) {
                return write("[blob]");
            }
            throw Error("Hashing Blob objects is currently not supported\n" + "(see https://github.com/puleos/object-hash/issues/26)\n" + 'Use "options.replacer" or "options.ignoreUnknown"\n');
        },
        _domwindow: function() {
            return write("domwindow");
        },
        _bigint: function(number) {
            return write("bigint:" + number.toString());
        },
        /* Node.js standard native objects */ _process: function() {
            return write("process");
        },
        _timer: function() {
            return write("timer");
        },
        _pipe: function() {
            return write("pipe");
        },
        _tcp: function() {
            return write("tcp");
        },
        _udp: function() {
            return write("udp");
        },
        _tty: function() {
            return write("tty");
        },
        _statwatcher: function() {
            return write("statwatcher");
        },
        _securecontext: function() {
            return write("securecontext");
        },
        _connection: function() {
            return write("connection");
        },
        _zlib: function() {
            return write("zlib");
        },
        _context: function() {
            return write("context");
        },
        _nodescript: function() {
            return write("nodescript");
        },
        _httpparser: function() {
            return write("httpparser");
        },
        _dataview: function() {
            return write("dataview");
        },
        _signal: function() {
            return write("signal");
        },
        _fsevent: function() {
            return write("fsevent");
        },
        _tlswrap: function() {
            return write("tlswrap");
        }
    };
}
// Mini-implementation of stream.PassThrough
// We are far from having need for the full implementation, and we can
// make assumptions like "many writes, then only one final read"
// and we can ignore encoding specifics
function PassThrough() {
    return {
        buf: "",
        write: function(b) {
            this.buf += b;
        },
        end: function(b) {
            this.buf += b;
        },
        read: function() {
            return this.buf;
        }
    };
}


/***/ }),

/***/ 14363:
/***/ ((module) => {

"use strict";

module.exports = function(Yallist) {
    Yallist.prototype[Symbol.iterator] = function*() {
        for(let walker = this.head; walker; walker = walker.next){
            yield walker.value;
        }
    };
};


/***/ }),

/***/ 74899:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = Yallist;
Yallist.Node = Node;
Yallist.create = Yallist;
function Yallist(list) {
    var self = this;
    if (!(self instanceof Yallist)) {
        self = new Yallist();
    }
    self.tail = null;
    self.head = null;
    self.length = 0;
    if (list && typeof list.forEach === "function") {
        list.forEach(function(item) {
            self.push(item);
        });
    } else if (arguments.length > 0) {
        for(var i = 0, l = arguments.length; i < l; i++){
            self.push(arguments[i]);
        }
    }
    return self;
}
Yallist.prototype.removeNode = function(node) {
    if (node.list !== this) {
        throw new Error("removing node which does not belong to this list");
    }
    var next = node.next;
    var prev = node.prev;
    if (next) {
        next.prev = prev;
    }
    if (prev) {
        prev.next = next;
    }
    if (node === this.head) {
        this.head = next;
    }
    if (node === this.tail) {
        this.tail = prev;
    }
    node.list.length--;
    node.next = null;
    node.prev = null;
    node.list = null;
    return next;
};
Yallist.prototype.unshiftNode = function(node) {
    if (node === this.head) {
        return;
    }
    if (node.list) {
        node.list.removeNode(node);
    }
    var head = this.head;
    node.list = this;
    node.next = head;
    if (head) {
        head.prev = node;
    }
    this.head = node;
    if (!this.tail) {
        this.tail = node;
    }
    this.length++;
};
Yallist.prototype.pushNode = function(node) {
    if (node === this.tail) {
        return;
    }
    if (node.list) {
        node.list.removeNode(node);
    }
    var tail = this.tail;
    node.list = this;
    node.prev = tail;
    if (tail) {
        tail.next = node;
    }
    this.tail = node;
    if (!this.head) {
        this.head = node;
    }
    this.length++;
};
Yallist.prototype.push = function() {
    for(var i = 0, l = arguments.length; i < l; i++){
        push(this, arguments[i]);
    }
    return this.length;
};
Yallist.prototype.unshift = function() {
    for(var i = 0, l = arguments.length; i < l; i++){
        unshift(this, arguments[i]);
    }
    return this.length;
};
Yallist.prototype.pop = function() {
    if (!this.tail) {
        return undefined;
    }
    var res = this.tail.value;
    this.tail = this.tail.prev;
    if (this.tail) {
        this.tail.next = null;
    } else {
        this.head = null;
    }
    this.length--;
    return res;
};
Yallist.prototype.shift = function() {
    if (!this.head) {
        return undefined;
    }
    var res = this.head.value;
    this.head = this.head.next;
    if (this.head) {
        this.head.prev = null;
    } else {
        this.tail = null;
    }
    this.length--;
    return res;
};
Yallist.prototype.forEach = function(fn, thisp) {
    thisp = thisp || this;
    for(var walker = this.head, i = 0; walker !== null; i++){
        fn.call(thisp, walker.value, i, this);
        walker = walker.next;
    }
};
Yallist.prototype.forEachReverse = function(fn, thisp) {
    thisp = thisp || this;
    for(var walker = this.tail, i = this.length - 1; walker !== null; i--){
        fn.call(thisp, walker.value, i, this);
        walker = walker.prev;
    }
};
Yallist.prototype.get = function(n) {
    for(var i = 0, walker = this.head; walker !== null && i < n; i++){
        // abort out of the list early if we hit a cycle
        walker = walker.next;
    }
    if (i === n && walker !== null) {
        return walker.value;
    }
};
Yallist.prototype.getReverse = function(n) {
    for(var i = 0, walker = this.tail; walker !== null && i < n; i++){
        // abort out of the list early if we hit a cycle
        walker = walker.prev;
    }
    if (i === n && walker !== null) {
        return walker.value;
    }
};
Yallist.prototype.map = function(fn, thisp) {
    thisp = thisp || this;
    var res = new Yallist();
    for(var walker = this.head; walker !== null;){
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.next;
    }
    return res;
};
Yallist.prototype.mapReverse = function(fn, thisp) {
    thisp = thisp || this;
    var res = new Yallist();
    for(var walker = this.tail; walker !== null;){
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.prev;
    }
    return res;
};
Yallist.prototype.reduce = function(fn, initial) {
    var acc;
    var walker = this.head;
    if (arguments.length > 1) {
        acc = initial;
    } else if (this.head) {
        walker = this.head.next;
        acc = this.head.value;
    } else {
        throw new TypeError("Reduce of empty list with no initial value");
    }
    for(var i = 0; walker !== null; i++){
        acc = fn(acc, walker.value, i);
        walker = walker.next;
    }
    return acc;
};
Yallist.prototype.reduceReverse = function(fn, initial) {
    var acc;
    var walker = this.tail;
    if (arguments.length > 1) {
        acc = initial;
    } else if (this.tail) {
        walker = this.tail.prev;
        acc = this.tail.value;
    } else {
        throw new TypeError("Reduce of empty list with no initial value");
    }
    for(var i = this.length - 1; walker !== null; i--){
        acc = fn(acc, walker.value, i);
        walker = walker.prev;
    }
    return acc;
};
Yallist.prototype.toArray = function() {
    var arr = new Array(this.length);
    for(var i = 0, walker = this.head; walker !== null; i++){
        arr[i] = walker.value;
        walker = walker.next;
    }
    return arr;
};
Yallist.prototype.toArrayReverse = function() {
    var arr = new Array(this.length);
    for(var i = 0, walker = this.tail; walker !== null; i++){
        arr[i] = walker.value;
        walker = walker.prev;
    }
    return arr;
};
Yallist.prototype.slice = function(from, to) {
    to = to || this.length;
    if (to < 0) {
        to += this.length;
    }
    from = from || 0;
    if (from < 0) {
        from += this.length;
    }
    var ret = new Yallist();
    if (to < from || to < 0) {
        return ret;
    }
    if (from < 0) {
        from = 0;
    }
    if (to > this.length) {
        to = this.length;
    }
    for(var i = 0, walker = this.head; walker !== null && i < from; i++){
        walker = walker.next;
    }
    for(; walker !== null && i < to; i++, walker = walker.next){
        ret.push(walker.value);
    }
    return ret;
};
Yallist.prototype.sliceReverse = function(from, to) {
    to = to || this.length;
    if (to < 0) {
        to += this.length;
    }
    from = from || 0;
    if (from < 0) {
        from += this.length;
    }
    var ret = new Yallist();
    if (to < from || to < 0) {
        return ret;
    }
    if (from < 0) {
        from = 0;
    }
    if (to > this.length) {
        to = this.length;
    }
    for(var i = this.length, walker = this.tail; walker !== null && i > to; i--){
        walker = walker.prev;
    }
    for(; walker !== null && i > from; i--, walker = walker.prev){
        ret.push(walker.value);
    }
    return ret;
};
Yallist.prototype.splice = function(start, deleteCount, ...nodes) {
    if (start > this.length) {
        start = this.length - 1;
    }
    if (start < 0) {
        start = this.length + start;
    }
    for(var i = 0, walker = this.head; walker !== null && i < start; i++){
        walker = walker.next;
    }
    var ret = [];
    for(var i = 0; walker && i < deleteCount; i++){
        ret.push(walker.value);
        walker = this.removeNode(walker);
    }
    if (walker === null) {
        walker = this.tail;
    }
    if (walker !== this.head && walker !== this.tail) {
        walker = walker.prev;
    }
    for(var i = 0; i < nodes.length; i++){
        walker = insert(this, walker, nodes[i]);
    }
    return ret;
};
Yallist.prototype.reverse = function() {
    var head = this.head;
    var tail = this.tail;
    for(var walker = head; walker !== null; walker = walker.prev){
        var p = walker.prev;
        walker.prev = walker.next;
        walker.next = p;
    }
    this.head = tail;
    this.tail = head;
    return this;
};
function insert(self, node, value) {
    var inserted = node === self.head ? new Node(value, null, node, self) : new Node(value, node, node.next, self);
    if (inserted.next === null) {
        self.tail = inserted;
    }
    if (inserted.prev === null) {
        self.head = inserted;
    }
    self.length++;
    return inserted;
}
function push(self, item) {
    self.tail = new Node(item, self.tail, null, self);
    if (!self.head) {
        self.head = self.tail;
    }
    self.length++;
}
function unshift(self, item) {
    self.head = new Node(item, null, self.head, self);
    if (!self.tail) {
        self.tail = self.head;
    }
    self.length++;
}
function Node(value, prev, next, list) {
    if (!(this instanceof Node)) {
        return new Node(value, prev, next, list);
    }
    this.list = list;
    this.value = value;
    if (prev) {
        prev.next = this;
        this.prev = prev;
    } else {
        this.prev = null;
    }
    if (next) {
        next.prev = this;
        this.next = next;
    } else {
        this.next = null;
    }
}
try {
    // add if support for Symbol.iterator is present
    __webpack_require__(14363)(Yallist);
} catch (er) {}


/***/ }),

/***/ 16184:
/***/ ((module) => {

"use strict";

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;


/***/ }),

/***/ 62310:
/***/ ((module) => {

"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;


/***/ }),

/***/ 54497:
/***/ ((module) => {

"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;


/***/ }),

/***/ 28341:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var setPrototypeOf = __webpack_require__(85082);
var isNativeReflectConstruct = __webpack_require__(18452);
function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
        module.exports = _construct = Reflect.construct.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
    } else {
        module.exports = _construct = function _construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) setPrototypeOf(instance, Class.prototype);
            return instance;
        }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
    return _construct.apply(null, arguments);
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;


/***/ }),

/***/ 50589:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toPropertyKey = __webpack_require__(68399);
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;


/***/ }),

/***/ 41659:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toPropertyKey = __webpack_require__(68399);
function _defineProperty(obj, key, value) {
    key = toPropertyKey(key);
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;


/***/ }),

/***/ 10952:
/***/ ((module) => {

"use strict";

function _extends() {
    module.exports = _extends = Object.assign ? Object.assign.bind() : function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    return _extends.apply(this, arguments);
}
module.exports = _extends, module.exports.__esModule = true, module.exports["default"] = module.exports;


/***/ }),

/***/ 68168:
/***/ ((module) => {

"use strict";

function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    return _getPrototypeOf(o);
}
module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;


/***/ }),

/***/ 20883:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var setPrototypeOf = __webpack_require__(85082);
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    Object.defineProperty(subClass, "prototype", {
        writable: false
    });
    if (superClass) setPrototypeOf(subClass, superClass);
}
module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;


/***/ }),

/***/ 54051:
/***/ ((module) => {

"use strict";

function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
module.exports = _isNativeFunction, module.exports.__esModule = true, module.exports["default"] = module.exports;


/***/ }),

/***/ 18452:
/***/ ((module) => {

"use strict";

function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;


/***/ }),

/***/ 73381:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var _typeof = (__webpack_require__(15711)["default"]);
var assertThisInitialized = __webpack_require__(16184);
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    } else if (call !== void 0) {
        throw new TypeError("Derived constructors may only return object or undefined");
    }
    return assertThisInitialized(self);
}
module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;


/***/ }),

/***/ 44181:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var _typeof = (__webpack_require__(15711)["default"]);
function _regeneratorRuntime() {
    "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ 
    module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
        return exports;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
    }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        return Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }), obj[key];
    }
    try {
        define({}, "");
    } catch (err) {
        define = function define(obj, key, value) {
            return obj[key] = value;
        };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
        return defineProperty(generator, "_invoke", {
            value: makeInvokeMethod(innerFn, self, context)
        }), generator;
    }
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if ("throw" !== record.type) {
                var result = record.arg, value = result.value;
                return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                }) : PromiseImpl.resolve(value).then(function(unwrapped) {
                    result.value = unwrapped, resolve(result);
                }, function(error) {
                    return invoke("throw", error, resolve, reject);
                });
            }
            reject(record.arg);
        }
        var previousPromise;
        defineProperty(this, "_invoke", {
            value: function value(method, arg) {
                function callInvokeWithMethodAndArg() {
                    return new PromiseImpl(function(resolve, reject) {
                        invoke(method, arg, resolve, reject);
                    });
                }
                return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            }
        });
    }
    function makeInvokeMethod(innerFn, self, context) {
        var state = "suspendedStart";
        return function(method, arg) {
            if ("executing" === state) throw new Error("Generator is already running");
            if ("completed" === state) {
                if ("throw" === method) throw arg;
                return doneResult();
            }
            for(context.method = method, context.arg = arg;;){
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if ("next" === context.method) context.sent = context._sent = context.arg;
                else if ("throw" === context.method) {
                    if ("suspendedStart" === state) throw state = "completed", context.arg;
                    context.dispatchException(context.arg);
                } else "return" === context.method && context.abrupt("return", context.arg);
                state = "executing";
                var record = tryCatch(innerFn, self, context);
                if ("normal" === record.type) {
                    if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                }
                "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
            }
        };
    }
    function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method, method = delegate.iterator[methodName];
        if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
        var info = record.arg;
        return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if ("function" == typeof iterable.next) return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next = function next() {
                    for(; ++i < iterable.length;)if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
                    return next.value = undefined, next.done = !0, next;
                };
                return next.next = next;
            }
        }
        return {
            next: doneResult
        };
    }
    function doneResult() {
        return {
            value: undefined,
            done: !0
        };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function(genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function(genFun) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function(arg) {
        return {
            __await: arg
        };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
        return this;
    }), define(Gp, "toString", function() {
        return "[object Generator]";
    }), exports.keys = function(val) {
        var object = Object(val), keys = [];
        for(var key in object)keys.push(key);
        return keys.reverse(), function next() {
            for(; keys.length;){
                var key = keys.pop();
                if (key in object) return next.value = key, next.done = !1, next;
            }
            return next.done = !0, next;
        };
    }, exports.values = values, Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for(var name in this)"t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
        },
        stop: function stop() {
            this.done = !0;
            var rootRecord = this.tryEntries[0].completion;
            if ("throw" === rootRecord.type) throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function dispatchException(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
                return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
            }
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i], record = entry.completion;
                if ("root" === entry.tryLoc) return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                    } else {
                        if (!hasFinally) throw new Error("try statement without catch or finally");
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    }
                }
            }
        },
        abrupt: function abrupt(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
            var record = finallyEntry ? finallyEntry.completion : {};
            return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
        },
        complete: function complete(record, afterLoc) {
            if ("throw" === record.type) throw record.arg;
            return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
            }
        },
        "catch": function _catch(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if ("throw" === record.type) {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            return this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
        }
    }, exports;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;


/***/ }),

/***/ 85082:
/***/ ((module) => {

"use strict";

function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;


/***/ }),

/***/ 65716:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var _typeof = (__webpack_require__(15711)["default"]);
function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (_typeof(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
}
module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;


/***/ }),

/***/ 68399:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var _typeof = (__webpack_require__(15711)["default"]);
var toPrimitive = __webpack_require__(65716);
function _toPropertyKey(arg) {
    var key = toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;


/***/ }),

/***/ 15711:
/***/ ((module) => {

"use strict";

function _typeof(obj) {
    "@babel/helpers - typeof";
    return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;


/***/ }),

/***/ 6227:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getPrototypeOf = __webpack_require__(68168);
var setPrototypeOf = __webpack_require__(85082);
var isNativeFunction = __webpack_require__(54051);
var construct = __webpack_require__(28341);
function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
        if (Class === null || !isNativeFunction(Class)) return Class;
        if (typeof Class !== "function") {
            throw new TypeError("Super expression must either be null or a function");
        }
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return construct(Class, arguments, getPrototypeOf(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return setPrototypeOf(Wrapper, Class);
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    return _wrapNativeSuper(Class);
}
module.exports = _wrapNativeSuper, module.exports.__esModule = true, module.exports["default"] = module.exports;


/***/ }),

/***/ 53371:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(44181)();
module.exports = runtime;
// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
    regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
    if (typeof globalThis === "object") {
        globalThis.regeneratorRuntime = runtime;
    } else {
        Function("r", "regeneratorRuntime = r")(runtime);
    }
}


/***/ }),

/***/ 51966:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Issuer": () => (/* binding */ Issuer),
/* harmony export */   "Strategy": () => (/* binding */ Strategy),
/* harmony export */   "TokenSet": () => (/* binding */ TokenSet),
/* harmony export */   "custom": () => (/* binding */ custom),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "errors": () => (/* binding */ errors),
/* harmony export */   "generators": () => (/* binding */ generators)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65752);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_index_js__WEBPACK_IMPORTED_MODULE_0__);
const Issuer = _index_js__WEBPACK_IMPORTED_MODULE_0__.Issuer;
const Strategy = _index_js__WEBPACK_IMPORTED_MODULE_0__.Strategy;
const TokenSet = _index_js__WEBPACK_IMPORTED_MODULE_0__.TokenSet;
const errors = _index_js__WEBPACK_IMPORTED_MODULE_0__.errors;
const custom = _index_js__WEBPACK_IMPORTED_MODULE_0__.custom;
const generators = _index_js__WEBPACK_IMPORTED_MODULE_0__.generators;


/***/ }),

/***/ 21749:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "render": () => (/* binding */ S),
/* harmony export */   "renderToStaticMarkup": () => (/* binding */ S),
/* harmony export */   "renderToString": () => (/* binding */ S),
/* harmony export */   "shallowRender": () => (/* binding */ x)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7228);

var n = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i, o = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/, i = /[\s\n\\/='"\0<>]/, l = /^xlink:?./, a = /["&<]/;
function s(e) {
    if (!1 === a.test(e += "")) return e;
    for(var t = 0, r = 0, n = "", o = ""; r < e.length; r++){
        switch(e.charCodeAt(r)){
            case 34:
                o = "&quot;";
                break;
            case 38:
                o = "&amp;";
                break;
            case 60:
                o = "&lt;";
                break;
            default:
                continue;
        }
        r !== t && (n += e.slice(t, r)), n += o, t = r + 1;
    }
    return r !== t && (n += e.slice(t, r)), n;
}
var f = function(e, t) {
    return String(e).replace(/(\n+)/g, "$1" + (t || "	"));
}, u = function(e, t, r) {
    return String(e).length > (t || 40) || !r && -1 !== String(e).indexOf("\n") || -1 !== String(e).indexOf("<");
}, c = {}, _ = /([A-Z])/g;
function p(e) {
    var t = "";
    for(var r in e){
        var o = e[r];
        null != o && "" !== o && (t && (t += " "), t += "-" == r[0] ? r : c[r] || (c[r] = r.replace(_, "-$1").toLowerCase()), t = "number" == typeof o && !1 === n.test(r) ? t + ": " + o + "px;" : t + ": " + o + ";");
    }
    return t || void 0;
}
function d(e, t) {
    return Array.isArray(t) ? t.reduce(d, e) : null != t && !1 !== t && e.push(t), e;
}
function v() {
    this.__d = !0;
}
function h(e, t) {
    return {
        __v: e,
        context: t,
        props: e.props,
        setState: v,
        forceUpdate: v,
        __d: !0,
        __h: []
    };
}
function g(e, t) {
    var r = e.contextType, n = r && t[r.__c];
    return null != r ? n ? n.props.value : r.__ : t;
}
var y = [];
function m(r, n, a, c, _, v) {
    if (null == r || "boolean" == typeof r) return "";
    if ("object" != typeof r) return "function" == typeof r ? "" : s(r);
    var b = a.pretty, x = b && "string" == typeof b ? b : "	";
    if (Array.isArray(r)) {
        for(var k = "", S = 0; S < r.length; S++)b && S > 0 && (k += "\n"), k += m(r[S], n, a, c, _, v);
        return k;
    }
    if (void 0 !== r.constructor) return "";
    var w, C = r.type, O = r.props, j = !1;
    if ("function" == typeof C) {
        if (j = !0, !a.shallow || !c && !1 !== a.renderRootComponent) {
            if (C === preact__WEBPACK_IMPORTED_MODULE_0__.Fragment) {
                var A = [];
                return d(A, r.props.children), m(A, n, a, !1 !== a.shallowHighOrder, _, v);
            }
            var F, H = r.__c = h(r, n);
            preact__WEBPACK_IMPORTED_MODULE_0__.options.__b && preact__WEBPACK_IMPORTED_MODULE_0__.options.__b(r);
            var M = preact__WEBPACK_IMPORTED_MODULE_0__.options.__r;
            if (C.prototype && "function" == typeof C.prototype.render) {
                var L = g(C, n);
                (H = r.__c = new C(O, L)).__v = r, H._dirty = H.__d = !0, H.props = O, null == H.state && (H.state = {}), null == H._nextState && null == H.__s && (H._nextState = H.__s = H.state), H.context = L, C.getDerivedStateFromProps ? H.state = Object.assign({}, H.state, C.getDerivedStateFromProps(H.props, H.state)) : H.componentWillMount && (H.componentWillMount(), H.state = H._nextState !== H.state ? H._nextState : H.__s !== H.state ? H.__s : H.state), M && M(r), F = H.render(H.props, H.state, H.context);
            } else for(var T = g(C, n), E = 0; H.__d && E++ < 25;)H.__d = !1, M && M(r), F = C.call(r.__c, O, T);
            return H.getChildContext && (n = Object.assign({}, n, H.getChildContext())), preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed && preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed(r), m(F, n, a, !1 !== a.shallowHighOrder, _, v);
        }
        C = (w = C).displayName || w !== Function && w.name || function(e) {
            var t = (Function.prototype.toString.call(e).match(/^\s*function\s+([^( ]+)/) || "")[1];
            if (!t) {
                for(var r = -1, n = y.length; n--;)if (y[n] === e) {
                    r = n;
                    break;
                }
                r < 0 && (r = y.push(e) - 1), t = "UnnamedComponent" + r;
            }
            return t;
        }(w);
    }
    var $, D, N = "<" + C;
    if (O) {
        var P = Object.keys(O);
        a && !0 === a.sortAttributes && P.sort();
        for(var W = 0; W < P.length; W++){
            var I = P[W], R = O[I];
            if ("children" !== I) {
                if (!i.test(I) && (a && a.allAttributes || "key" !== I && "ref" !== I && "__self" !== I && "__source" !== I)) {
                    if ("defaultValue" === I) I = "value";
                    else if ("defaultChecked" === I) I = "checked";
                    else if ("defaultSelected" === I) I = "selected";
                    else if ("className" === I) {
                        if (void 0 !== O.class) continue;
                        I = "class";
                    } else _ && l.test(I) && (I = I.toLowerCase().replace(/^xlink:?/, "xlink:"));
                    if ("htmlFor" === I) {
                        if (O.for) continue;
                        I = "for";
                    }
                    "style" === I && R && "object" == typeof R && (R = p(R)), "a" === I[0] && "r" === I[1] && "boolean" == typeof R && (R = String(R));
                    var U = a.attributeHook && a.attributeHook(I, R, n, a, j);
                    if (U || "" === U) N += U;
                    else if ("dangerouslySetInnerHTML" === I) D = R && R.__html;
                    else if ("textarea" === C && "value" === I) $ = R;
                    else if ((R || 0 === R || "" === R) && "function" != typeof R) {
                        if (!(!0 !== R && "" !== R || (R = I, a && a.xml))) {
                            N = N + " " + I;
                            continue;
                        }
                        if ("value" === I) {
                            if ("select" === C) {
                                v = R;
                                continue;
                            }
                            "option" === C && v == R && void 0 === O.selected && (N += " selected");
                        }
                        N = N + " " + I + '="' + s(R) + '"';
                    }
                }
            } else $ = R;
        }
    }
    if (b) {
        var V = N.replace(/\n\s*/, " ");
        V === N || ~V.indexOf("\n") ? b && ~N.indexOf("\n") && (N += "\n") : N = V;
    }
    if (N += ">", i.test(C)) throw new Error(C + " is not a valid HTML tag name in " + N);
    var q, z = o.test(C) || a.voidElements && a.voidElements.test(C), Z = [];
    if (D) b && u(D) && (D = "\n" + x + f(D, x)), N += D;
    else if (null != $ && d(q = [], $).length) {
        for(var B = b && ~N.indexOf("\n"), G = !1, J = 0; J < q.length; J++){
            var K = q[J];
            if (null != K && !1 !== K) {
                var Q = m(K, n, a, !0, "svg" === C || "foreignObject" !== C && _, v);
                if (b && !B && u(Q) && (B = !0), Q) if (b) {
                    var X = Q.length > 0 && "<" != Q[0];
                    G && X ? Z[Z.length - 1] += Q : Z.push(Q), G = X;
                } else Z.push(Q);
            }
        }
        if (b && B) for(var Y = Z.length; Y--;)Z[Y] = "\n" + x + f(Z[Y], x);
    }
    if (Z.length || D) N += Z.join("");
    else if (a && a.xml) return N.substring(0, N.length - 1) + " />";
    return !z || q || D ? (b && ~N.indexOf("\n") && (N += "\n"), N = N + "</" + C + ">") : N = N.replace(/>$/, " />"), N;
}
var b = {
    shallow: !0
};
S.render = S;
var x = function(e, t) {
    return S(e, t, b);
}, k = [];
function S(n, o, i) {
    o = o || {};
    var l = preact__WEBPACK_IMPORTED_MODULE_0__.options.__s;
    preact__WEBPACK_IMPORTED_MODULE_0__.options.__s = !0;
    var a, s = (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
    return s.__k = [
        n
    ], a = i && (i.pretty || i.voidElements || i.sortAttributes || i.shallow || i.allAttributes || i.xml || i.attributeHook) ? m(n, o, i) : F(n, o, !1, void 0, s), preact__WEBPACK_IMPORTED_MODULE_0__.options.__c && preact__WEBPACK_IMPORTED_MODULE_0__.options.__c(n, k), preact__WEBPACK_IMPORTED_MODULE_0__.options.__s = l, k.length = 0, a;
}
function w(e) {
    return null == e || "boolean" == typeof e ? null : "string" == typeof e || "number" == typeof e || "bigint" == typeof e ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(null, null, e) : e;
}
function C(e, t) {
    return "className" === e ? "class" : "htmlFor" === e ? "for" : "defaultValue" === e ? "value" : "defaultChecked" === e ? "checked" : "defaultSelected" === e ? "selected" : t && l.test(e) ? e.toLowerCase().replace(/^xlink:?/, "xlink:") : e;
}
function O(e, t) {
    return "style" === e && null != t && "object" == typeof t ? p(t) : "a" === e[0] && "r" === e[1] && "boolean" == typeof t ? String(t) : t;
}
var j = Array.isArray, A = Object.assign;
function F(r, n, l, a, f) {
    if (null == r || !0 === r || !1 === r || "" === r) return "";
    if ("object" != typeof r) return "function" == typeof r ? "" : s(r);
    if (j(r)) {
        var u = "";
        f.__k = r;
        for(var c = 0; c < r.length; c++)u += F(r[c], n, l, a, f), r[c] = w(r[c]);
        return u;
    }
    if (void 0 !== r.constructor) return "";
    r.__ = f, preact__WEBPACK_IMPORTED_MODULE_0__.options.__b && preact__WEBPACK_IMPORTED_MODULE_0__.options.__b(r);
    var _ = r.type, p = r.props;
    if ("function" == typeof _) {
        var d;
        if (_ === preact__WEBPACK_IMPORTED_MODULE_0__.Fragment) d = p.children;
        else {
            d = _.prototype && "function" == typeof _.prototype.render ? function(e, r) {
                var n = e.type, o = g(n, r), i = new n(e.props, o);
                e.__c = i, i.__v = e, i.__d = !0, i.props = e.props, null == i.state && (i.state = {}), null == i.__s && (i.__s = i.state), i.context = o, n.getDerivedStateFromProps ? i.state = A({}, i.state, n.getDerivedStateFromProps(i.props, i.state)) : i.componentWillMount && (i.componentWillMount(), i.state = i.__s !== i.state ? i.__s : i.state);
                var l = preact__WEBPACK_IMPORTED_MODULE_0__.options.__r;
                return l && l(e), i.render(i.props, i.state, i.context);
            }(r, n) : function(e, r) {
                var n, o = h(e, r), i = g(e.type, r);
                e.__c = o;
                for(var l = preact__WEBPACK_IMPORTED_MODULE_0__.options.__r, a = 0; o.__d && a++ < 25;)o.__d = !1, l && l(e), n = e.type.call(o, e.props, i);
                return n;
            }(r, n);
            var v = r.__c;
            v.getChildContext && (n = A({}, n, v.getChildContext()));
        }
        var y = F(d = null != d && d.type === preact__WEBPACK_IMPORTED_MODULE_0__.Fragment && null == d.key ? d.props.children : d, n, l, a, r);
        return preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed && preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed(r), r.__ = void 0, preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount && preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount(r), y;
    }
    var m, b, x = "<";
    if (x += _, p) for(var k in m = p.children, p){
        var S = p[k];
        if (!("key" === k || "ref" === k || "__self" === k || "__source" === k || "children" === k || "className" === k && "class" in p || "htmlFor" === k && "for" in p || i.test(k))) {
            if (S = O(k = C(k, l), S), "dangerouslySetInnerHTML" === k) b = S && S.__html;
            else if ("textarea" === _ && "value" === k) m = S;
            else if ((S || 0 === S || "" === S) && "function" != typeof S) {
                if (!0 === S || "" === S) {
                    S = k, x = x + " " + k;
                    continue;
                }
                if ("value" === k) {
                    if ("select" === _) {
                        a = S;
                        continue;
                    }
                    "option" !== _ || a != S || "selected" in p || (x += " selected");
                }
                x = x + " " + k + '="' + s(S) + '"';
            }
        }
    }
    var H = x;
    if (x += ">", i.test(_)) throw new Error(_ + " is not a valid HTML tag name in " + x);
    var M = "", L = !1;
    if (b) M += b, L = !0;
    else if ("string" == typeof m) M += s(m), L = !0;
    else if (j(m)) {
        r.__k = m;
        for(var T = 0; T < m.length; T++){
            var E = m[T];
            if (m[T] = w(E), null != E && !1 !== E) {
                var $ = F(E, n, "svg" === _ || "foreignObject" !== _ && l, a, r);
                $ && (M += $, L = !0);
            }
        }
    } else if (null != m && !1 !== m && !0 !== m) {
        r.__k = [
            w(m)
        ];
        var D = F(m, n, "svg" === _ || "foreignObject" !== _ && l, a, r);
        D && (M += D, L = !0);
    }
    if (preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed && preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed(r), r.__ = void 0, preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount && preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount(r), L) x += M;
    else if (o.test(_)) return H + " />";
    return x + "</" + _ + ">";
}
S.shallowRender = x;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (S);
 //# sourceMappingURL=index.module.js.map


/***/ }),

/***/ 7228:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ k),
/* harmony export */   "Fragment": () => (/* binding */ _),
/* harmony export */   "cloneElement": () => (/* binding */ E),
/* harmony export */   "createContext": () => (/* binding */ F),
/* harmony export */   "createElement": () => (/* binding */ y),
/* harmony export */   "createRef": () => (/* binding */ d),
/* harmony export */   "h": () => (/* binding */ y),
/* harmony export */   "hydrate": () => (/* binding */ D),
/* harmony export */   "isValidElement": () => (/* binding */ i),
/* harmony export */   "options": () => (/* binding */ l),
/* harmony export */   "render": () => (/* binding */ B),
/* harmony export */   "toChildArray": () => (/* binding */ P)
/* harmony export */ });
var n, l, u, i, t, r, o, f, e, c = {}, s = [], a = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function h(n, l) {
    for(var u in l)n[u] = l[u];
    return n;
}
function v(n) {
    var l = n.parentNode;
    l && l.removeChild(n);
}
function y(l, u, i) {
    var t, r, o, f = {};
    for(o in u)"key" == o ? t = u[o] : "ref" == o ? r = u[o] : f[o] = u[o];
    if (arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : i), "function" == typeof l && null != l.defaultProps) for(o in l.defaultProps)void 0 === f[o] && (f[o] = l.defaultProps[o]);
    return p(l, f, t, r, null);
}
function p(n, i, t, r, o) {
    var f = {
        type: n,
        props: i,
        key: t,
        ref: r,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: null == o ? ++u : o
    };
    return null == o && null != l.vnode && l.vnode(f), f;
}
function d() {
    return {
        current: null
    };
}
function _(n) {
    return n.children;
}
function k(n, l) {
    this.props = n, this.context = l;
}
function b(n, l) {
    if (null == l) return n.__ ? b(n.__, n.__.__k.indexOf(n) + 1) : null;
    for(var u; l < n.__k.length; l++)if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
    return "function" == typeof n.type ? b(n) : null;
}
function g(n) {
    var l, u;
    if (null != (n = n.__) && null != n.__c) {
        for(n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++)if (null != (u = n.__k[l]) && null != u.__e) {
            n.__e = n.__c.base = u.__e;
            break;
        }
        return g(n);
    }
}
function m(n) {
    (!n.__d && (n.__d = !0) && t.push(n) && !w.__r++ || r !== l.debounceRendering) && ((r = l.debounceRendering) || o)(w);
}
function w() {
    var n, l, u, i, r, o, e, c;
    for(t.sort(f); n = t.shift();)n.__d && (l = t.length, i = void 0, r = void 0, e = (o = (u = n).__v).__e, (c = u.__P) && (i = [], (r = h({}, o)).__v = o.__v + 1, L(c, o, r, u.__n, void 0 !== c.ownerSVGElement, null != o.__h ? [
        e
    ] : null, i, null == e ? b(o) : e, o.__h), M(i, o), o.__e != e && g(o)), t.length > l && t.sort(f));
    w.__r = 0;
}
function x(n, l, u, i, t, r, o, f, e, a) {
    var h, v, y, d, k, g, m, w = i && i.__k || s, x = w.length;
    for(u.__k = [], h = 0; h < l.length; h++)if (null != (d = u.__k[h] = null == (d = l[h]) || "boolean" == typeof d || "function" == typeof d ? null : "string" == typeof d || "number" == typeof d || "bigint" == typeof d ? p(null, d, null, null, d) : Array.isArray(d) ? p(_, {
        children: d
    }, null, null, null) : d.__b > 0 ? p(d.type, d.props, d.key, d.ref ? d.ref : null, d.__v) : d)) {
        if (d.__ = u, d.__b = u.__b + 1, null === (y = w[h]) || y && d.key == y.key && d.type === y.type) w[h] = void 0;
        else for(v = 0; v < x; v++){
            if ((y = w[v]) && d.key == y.key && d.type === y.type) {
                w[v] = void 0;
                break;
            }
            y = null;
        }
        L(n, d, y = y || c, t, r, o, f, e, a), k = d.__e, (v = d.ref) && y.ref != v && (m || (m = []), y.ref && m.push(y.ref, null, d), m.push(v, d.__c || k, d)), null != k ? (null == g && (g = k), "function" == typeof d.type && d.__k === y.__k ? d.__d = e = A(d, e, n) : e = C(n, d, y, w, k, e), "function" == typeof u.type && (u.__d = e)) : e && y.__e == e && e.parentNode != n && (e = b(y));
    }
    for(u.__e = g, h = x; h--;)null != w[h] && ("function" == typeof u.type && null != w[h].__e && w[h].__e == u.__d && (u.__d = $(i).nextSibling), S(w[h], w[h]));
    if (m) for(h = 0; h < m.length; h++)O(m[h], m[++h], m[++h]);
}
function A(n, l, u) {
    for(var i, t = n.__k, r = 0; t && r < t.length; r++)(i = t[r]) && (i.__ = n, l = "function" == typeof i.type ? A(i, l, u) : C(u, i, i, t, i.__e, l));
    return l;
}
function P(n, l) {
    return l = l || [], null == n || "boolean" == typeof n || (Array.isArray(n) ? n.some(function(n) {
        P(n, l);
    }) : l.push(n)), l;
}
function C(n, l, u, i, t, r) {
    var o, f, e;
    if (void 0 !== l.__d) o = l.__d, l.__d = void 0;
    else if (null == u || t != r || null == t.parentNode) n: if (null == r || r.parentNode !== n) n.appendChild(t), o = null;
    else {
        for(f = r, e = 0; (f = f.nextSibling) && e < i.length; e += 1)if (f == t) break n;
        n.insertBefore(t, r), o = r;
    }
    return void 0 !== o ? o : t.nextSibling;
}
function $(n) {
    var l, u, i;
    if (null == n.type || "string" == typeof n.type) return n.__e;
    if (n.__k) {
        for(l = n.__k.length - 1; l >= 0; l--)if ((u = n.__k[l]) && (i = $(u))) return i;
    }
    return null;
}
function H(n, l, u, i, t) {
    var r;
    for(r in u)"children" === r || "key" === r || r in l || T(n, r, null, u[r], i);
    for(r in l)t && "function" != typeof l[r] || "children" === r || "key" === r || "value" === r || "checked" === r || u[r] === l[r] || T(n, r, l[r], u[r], i);
}
function I(n, l, u) {
    "-" === l[0] ? n.setProperty(l, null == u ? "" : u) : n[l] = null == u ? "" : "number" != typeof u || a.test(l) ? u : u + "px";
}
function T(n, l, u, i, t) {
    var r;
    n: if ("style" === l) if ("string" == typeof u) n.style.cssText = u;
    else {
        if ("string" == typeof i && (n.style.cssText = i = ""), i) for(l in i)u && l in u || I(n.style, l, "");
        if (u) for(l in u)i && u[l] === i[l] || I(n.style, l, u[l]);
    }
    else if ("o" === l[0] && "n" === l[1]) r = l !== (l = l.replace(/Capture$/, "")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + r] = u, u ? i || n.addEventListener(l, r ? z : j, r) : n.removeEventListener(l, r ? z : j, r);
    else if ("dangerouslySetInnerHTML" !== l) {
        if (t) l = l.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("width" !== l && "height" !== l && "href" !== l && "list" !== l && "form" !== l && "tabIndex" !== l && "download" !== l && l in n) try {
            n[l] = null == u ? "" : u;
            break n;
        } catch (n) {}
        "function" == typeof u || (null == u || !1 === u && "-" !== l[4] ? n.removeAttribute(l) : n.setAttribute(l, u));
    }
}
function j(n) {
    return this.l[n.type + !1](l.event ? l.event(n) : n);
}
function z(n) {
    return this.l[n.type + !0](l.event ? l.event(n) : n);
}
function L(n, u, i, t, r, o, f, e, c) {
    var s, a, v, y, p, d, b, g, m, w, A, P, C, $, H, I = u.type;
    if (void 0 !== u.constructor) return null;
    null != i.__h && (c = i.__h, e = u.__e = i.__e, u.__h = null, o = [
        e
    ]), (s = l.__b) && s(u);
    try {
        n: if ("function" == typeof I) {
            if (g = u.props, m = (s = I.contextType) && t[s.__c], w = s ? m ? m.props.value : s.__ : t, i.__c ? b = (a = u.__c = i.__c).__ = a.__E : ("prototype" in I && I.prototype.render ? u.__c = a = new I(g, w) : (u.__c = a = new k(g, w), a.constructor = I, a.render = q), m && m.sub(a), a.props = g, a.state || (a.state = {}), a.context = w, a.__n = t, v = a.__d = !0, a.__h = [], a._sb = []), null == a.__s && (a.__s = a.state), null != I.getDerivedStateFromProps && (a.__s == a.state && (a.__s = h({}, a.__s)), h(a.__s, I.getDerivedStateFromProps(g, a.__s))), y = a.props, p = a.state, a.__v = u, v) null == I.getDerivedStateFromProps && null != a.componentWillMount && a.componentWillMount(), null != a.componentDidMount && a.__h.push(a.componentDidMount);
            else {
                if (null == I.getDerivedStateFromProps && g !== y && null != a.componentWillReceiveProps && a.componentWillReceiveProps(g, w), !a.__e && null != a.shouldComponentUpdate && !1 === a.shouldComponentUpdate(g, a.__s, w) || u.__v === i.__v) {
                    for(u.__v !== i.__v && (a.props = g, a.state = a.__s, a.__d = !1), a.__e = !1, u.__e = i.__e, u.__k = i.__k, u.__k.forEach(function(n) {
                        n && (n.__ = u);
                    }), A = 0; A < a._sb.length; A++)a.__h.push(a._sb[A]);
                    a._sb = [], a.__h.length && f.push(a);
                    break n;
                }
                null != a.componentWillUpdate && a.componentWillUpdate(g, a.__s, w), null != a.componentDidUpdate && a.__h.push(function() {
                    a.componentDidUpdate(y, p, d);
                });
            }
            if (a.context = w, a.props = g, a.__P = n, P = l.__r, C = 0, "prototype" in I && I.prototype.render) {
                for(a.state = a.__s, a.__d = !1, P && P(u), s = a.render(a.props, a.state, a.context), $ = 0; $ < a._sb.length; $++)a.__h.push(a._sb[$]);
                a._sb = [];
            } else do {
                a.__d = !1, P && P(u), s = a.render(a.props, a.state, a.context), a.state = a.__s;
            }while (a.__d && ++C < 25);
            a.state = a.__s, null != a.getChildContext && (t = h(h({}, t), a.getChildContext())), v || null == a.getSnapshotBeforeUpdate || (d = a.getSnapshotBeforeUpdate(y, p)), H = null != s && s.type === _ && null == s.key ? s.props.children : s, x(n, Array.isArray(H) ? H : [
                H
            ], u, i, t, r, o, f, e, c), a.base = u.__e, u.__h = null, a.__h.length && f.push(a), b && (a.__E = a.__ = null), a.__e = !1;
        } else null == o && u.__v === i.__v ? (u.__k = i.__k, u.__e = i.__e) : u.__e = N(i.__e, u, i, t, r, o, f, c);
        (s = l.diffed) && s(u);
    } catch (n) {
        u.__v = null, (c || null != o) && (u.__e = e, u.__h = !!c, o[o.indexOf(e)] = null), l.__e(n, u, i);
    }
}
function M(n, u) {
    l.__c && l.__c(u, n), n.some(function(u) {
        try {
            n = u.__h, u.__h = [], n.some(function(n) {
                n.call(u);
            });
        } catch (n) {
            l.__e(n, u.__v);
        }
    });
}
function N(l, u, i, t, r, o, f, e) {
    var s, a, h, y = i.props, p = u.props, d = u.type, _ = 0;
    if ("svg" === d && (r = !0), null != o) {
        for(; _ < o.length; _++)if ((s = o[_]) && "setAttribute" in s == !!d && (d ? s.localName === d : 3 === s.nodeType)) {
            l = s, o[_] = null;
            break;
        }
    }
    if (null == l) {
        if (null === d) return document.createTextNode(p);
        l = r ? document.createElementNS("http://www.w3.org/2000/svg", d) : document.createElement(d, p.is && p), o = null, e = !1;
    }
    if (null === d) y === p || e && l.data === p || (l.data = p);
    else {
        if (o = o && n.call(l.childNodes), a = (y = i.props || c).dangerouslySetInnerHTML, h = p.dangerouslySetInnerHTML, !e) {
            if (null != o) for(y = {}, _ = 0; _ < l.attributes.length; _++)y[l.attributes[_].name] = l.attributes[_].value;
            (h || a) && (h && (a && h.__html == a.__html || h.__html === l.innerHTML) || (l.innerHTML = h && h.__html || ""));
        }
        if (H(l, p, y, r, e), h) u.__k = [];
        else if (_ = u.props.children, x(l, Array.isArray(_) ? _ : [
            _
        ], u, i, t, r && "foreignObject" !== d, o, f, o ? o[0] : i.__k && b(i, 0), e), null != o) for(_ = o.length; _--;)null != o[_] && v(o[_]);
        e || ("value" in p && void 0 !== (_ = p.value) && (_ !== l.value || "progress" === d && !_ || "option" === d && _ !== y.value) && T(l, "value", _, y.value, !1), "checked" in p && void 0 !== (_ = p.checked) && _ !== l.checked && T(l, "checked", _, y.checked, !1));
    }
    return l;
}
function O(n, u, i) {
    try {
        "function" == typeof n ? n(u) : n.current = u;
    } catch (n) {
        l.__e(n, i);
    }
}
function S(n, u, i) {
    var t, r;
    if (l.unmount && l.unmount(n), (t = n.ref) && (t.current && t.current !== n.__e || O(t, null, u)), null != (t = n.__c)) {
        if (t.componentWillUnmount) try {
            t.componentWillUnmount();
        } catch (n) {
            l.__e(n, u);
        }
        t.base = t.__P = null, n.__c = void 0;
    }
    if (t = n.__k) for(r = 0; r < t.length; r++)t[r] && S(t[r], u, i || "function" != typeof n.type);
    i || null == n.__e || v(n.__e), n.__ = n.__e = n.__d = void 0;
}
function q(n, l, u) {
    return this.constructor(n, u);
}
function B(u, i, t) {
    var r, o, f;
    l.__ && l.__(u, i), o = (r = "function" == typeof t) ? null : t && t.__k || i.__k, f = [], L(i, u = (!r && t || i).__k = y(_, null, [
        u
    ]), o || c, c, void 0 !== i.ownerSVGElement, !r && t ? [
        t
    ] : o ? null : i.firstChild ? n.call(i.childNodes) : null, f, !r && t ? t : o ? o.__e : i.firstChild, r), M(f, u);
}
function D(n, l) {
    B(n, l, D);
}
function E(l, u, i) {
    var t, r, o, f = h({}, l.props);
    for(o in u)"key" == o ? t = u[o] : "ref" == o ? r = u[o] : f[o] = u[o];
    return arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : i), p(l.type, f, t || l.key, r || l.ref, null);
}
function F(n, l) {
    var u = {
        __c: l = "__cC" + e++,
        __: n,
        Consumer: function(n, l) {
            return n.children(l);
        },
        Provider: function(n) {
            var u, i;
            return this.getChildContext || (u = [], (i = {})[l] = this, this.getChildContext = function() {
                return i;
            }, this.shouldComponentUpdate = function(n) {
                this.props.value !== n.value && u.some(function(n) {
                    n.__e = !0, m(n);
                });
            }, this.sub = function(n) {
                u.push(n);
                var l = n.componentWillUnmount;
                n.componentWillUnmount = function() {
                    u.splice(u.indexOf(n), 1), l && l.call(n);
                };
            }), n.children;
        }
    };
    return u.Provider.__ = u.Consumer.contextType = u;
}
n = s.slice, l = {
    __e: function(n, l, u, i) {
        for(var t, r, o; l = l.__;)if ((t = l.__c) && !t.__) try {
            if ((r = t.constructor) && null != r.getDerivedStateFromError && (t.setState(r.getDerivedStateFromError(n)), o = t.__d), null != t.componentDidCatch && (t.componentDidCatch(n, i || {}), o = t.__d), o) return t.__E = t;
        } catch (l) {
            n = l;
        }
        throw n;
    }
}, u = 0, i = function(n) {
    return null != n && void 0 === n.constructor;
}, k.prototype.setState = function(n, l) {
    var u;
    u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = h({}, this.state), "function" == typeof n && (n = n(h({}, u), this.props)), n && h(u, n), null != n && this.__v && (l && this._sb.push(l), m(this));
}, k.prototype.forceUpdate = function(n) {
    this.__v && (this.__e = !0, n && this.__h.push(n), m(this));
}, k.prototype.render = _, t = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f = function(n, l) {
    return n.__v.__b - l.__v.__b;
}, w.__r = 0, e = 0;
 //# sourceMappingURL=preact.module.js.map


/***/ }),

/***/ 67891:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"openid-client","version":"5.4.1","description":"OpenID Connect Relying Party (RP, Client) implementation for Node.js runtime, supports passportjs","keywords":["auth","authentication","basic","certified","client","connect","dynamic","electron","hybrid","identity","implicit","oauth","oauth2","oidc","openid","passport","relying party","strategy"],"homepage":"https://github.com/panva/node-openid-client","repository":"panva/node-openid-client","funding":{"url":"https://github.com/sponsors/panva"},"license":"MIT","author":"Filip Skokan <panva.ip@gmail.com>","exports":{"types":"./types/index.d.ts","import":"./lib/index.mjs","require":"./lib/index.js"},"main":"./lib/index.js","types":"./types/index.d.ts","files":["lib","types/index.d.ts"],"scripts":{"format":"npx prettier --loglevel silent --write ./lib ./test ./certification ./types","test":"mocha test/**/*.test.js"},"dependencies":{"jose":"^4.14.1","lru-cache":"^6.0.0","object-hash":"^2.2.0","oidc-token-hash":"^5.0.2"},"devDependencies":{"@types/node":"^16.18.24","@types/passport":"^1.0.12","base64url":"^3.0.1","chai":"^4.3.7","jose2":"npm:jose@^2.0.6","mocha":"^10.2.0","nock":"^13.3.0","prettier":"^2.8.7","readable-mock-req":"^0.2.2","sinon":"^9.2.4","timekeeper":"^2.2.0"},"standard-version":{"scripts":{"postchangelog":"sed -i \'\' -e \'s/### \\\\[/## [/g\' CHANGELOG.md"},"types":[{"type":"feat","section":"Features"},{"type":"fix","section":"Fixes"},{"type":"chore","hidden":true},{"type":"docs","hidden":true},{"type":"style","hidden":true},{"type":"refactor","section":"Refactor","hidden":false},{"type":"perf","section":"Performance","hidden":false},{"type":"test","hidden":true}]}}');

/***/ })

};
;