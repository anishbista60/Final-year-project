exports.id = 528;
exports.ids = [528];
exports.modules = {

/***/ 94432:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "Z", ({
    enumerable: true,
    get: function() {
        return _asyncToGenerator;
    }
}));
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


/***/ }),

/***/ 67688:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "Z", ({
    enumerable: true,
    get: function() {
        return _extends;
    }
}));
function extends_() {
    extends_ = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return extends_.apply(this, arguments);
}
function _extends() {
    return extends_.apply(this, arguments);
}


/***/ }),

/***/ 46356:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "Z", ({
    enumerable: true,
    get: function() {
        return _interopRequireDefault;
    }
}));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}


/***/ }),

/***/ 51644:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "Z", ({
    enumerable: true,
    get: function() {
        return _interopRequireWildcard;
    }
}));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
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

/***/ 52495:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "Z", ({
    enumerable: true,
    get: function() {
        return _objectWithoutPropertiesLoose;
    }
}));
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}


/***/ }),

/***/ 23170:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(27574);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.BroadcastChannel = BroadcastChannel;
exports.apiBaseUrl = apiBaseUrl;
exports.fetchData = fetchData;
exports.now = now;

var _regenerator = _interopRequireDefault(__webpack_require__(71299));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(75166));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(76954));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function fetchData(_x, _x2, _x3) {
  return _fetchData.apply(this, arguments);
}

function _fetchData() {
  _fetchData = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(path, __NEXTAUTH, logger) {
    var _ref,
        ctx,
        _ref$req,
        req,
        url,
        _req$headers,
        options,
        res,
        data,
        _args = arguments;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref = _args.length > 3 && _args[3] !== undefined ? _args[3] : {}, ctx = _ref.ctx, _ref$req = _ref.req, req = _ref$req === void 0 ? ctx === null || ctx === void 0 ? void 0 : ctx.req : _ref$req;
            url = "".concat(apiBaseUrl(__NEXTAUTH), "/").concat(path);
            _context.prev = 2;
            options = {
              headers: _objectSpread({
                "Content-Type": "application/json"
              }, req !== null && req !== void 0 && (_req$headers = req.headers) !== null && _req$headers !== void 0 && _req$headers.cookie ? {
                cookie: req.headers.cookie
              } : {})
            };

            if (req !== null && req !== void 0 && req.body) {
              options.body = JSON.stringify(req.body);
              options.method = "POST";
            }

            _context.next = 7;
            return fetch(url, options);

          case 7:
            res = _context.sent;
            _context.next = 10;
            return res.json();

          case 10:
            data = _context.sent;

            if (res.ok) {
              _context.next = 13;
              break;
            }

            throw data;

          case 13:
            return _context.abrupt("return", Object.keys(data).length > 0 ? data : null);

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](2);
            logger.error("CLIENT_FETCH_ERROR", {
              error: _context.t0,
              url: url
            });
            return _context.abrupt("return", null);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 16]]);
  }));
  return _fetchData.apply(this, arguments);
}

function apiBaseUrl(__NEXTAUTH) {
  if (typeof window === "undefined") {
    return "".concat(__NEXTAUTH.baseUrlServer).concat(__NEXTAUTH.basePathServer);
  }

  return __NEXTAUTH.basePath;
}

function now() {
  return Math.floor(Date.now() / 1000);
}

function BroadcastChannel() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "nextauth.message";
  return {
    receive: function receive(onReceive) {
      var handler = function handler(event) {
        var _event$newValue;

        if (event.key !== name) return;
        var message = JSON.parse((_event$newValue = event.newValue) !== null && _event$newValue !== void 0 ? _event$newValue : "{}");
        if ((message === null || message === void 0 ? void 0 : message.event) !== "session" || !(message !== null && message !== void 0 && message.data)) return;
        onReceive(message);
      };

      window.addEventListener("storage", handler);
      return function () {
        return window.removeEventListener("storage", handler);
      };
    },
    post: function post(message) {
      if (typeof window === "undefined") return;

      try {
        localStorage.setItem(name, JSON.stringify(_objectSpread(_objectSpread({}, message), {}, {
          timestamp: now()
        })));
      } catch (_unused) {}
    }
  };
}

/***/ }),

/***/ 78574:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(27574);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.UnsupportedStrategy = exports.UnknownError = exports.OAuthCallbackError = exports.MissingSecret = exports.MissingAuthorize = exports.MissingAdapterMethods = exports.MissingAdapter = exports.MissingAPIRoute = exports.InvalidCallbackUrl = exports.AccountNotLinkedError = void 0;
exports.adapterErrorHandler = adapterErrorHandler;
exports.capitalize = capitalize;
exports.eventsErrorHandler = eventsErrorHandler;
exports.upperSnake = upperSnake;

var _regenerator = _interopRequireDefault(__webpack_require__(71299));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(76954));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(95295));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(75166));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(7432));

var _createClass2 = _interopRequireDefault(__webpack_require__(46063));

var _inherits2 = _interopRequireDefault(__webpack_require__(14287));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(67943));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(9224));

var _wrapNativeSuper2 = _interopRequireDefault(__webpack_require__(21669));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var UnknownError = function (_Error) {
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

  (0, _createClass2.default)(UnknownError, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        name: this.name,
        message: this.message,
        stack: this.stack
      };
    }
  }]);
  return UnknownError;
}((0, _wrapNativeSuper2.default)(Error));

exports.UnknownError = UnknownError;

var OAuthCallbackError = function (_UnknownError) {
  (0, _inherits2.default)(OAuthCallbackError, _UnknownError);

  var _super2 = _createSuper(OAuthCallbackError);

  function OAuthCallbackError() {
    var _this2;

    (0, _classCallCheck2.default)(this, OAuthCallbackError);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this2 = _super2.call.apply(_super2, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this2), "name", "OAuthCallbackError");
    return _this2;
  }

  return (0, _createClass2.default)(OAuthCallbackError);
}(UnknownError);

exports.OAuthCallbackError = OAuthCallbackError;

var AccountNotLinkedError = function (_UnknownError2) {
  (0, _inherits2.default)(AccountNotLinkedError, _UnknownError2);

  var _super3 = _createSuper(AccountNotLinkedError);

  function AccountNotLinkedError() {
    var _this3;

    (0, _classCallCheck2.default)(this, AccountNotLinkedError);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _super3.call.apply(_super3, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this3), "name", "AccountNotLinkedError");
    return _this3;
  }

  return (0, _createClass2.default)(AccountNotLinkedError);
}(UnknownError);

exports.AccountNotLinkedError = AccountNotLinkedError;

var MissingAPIRoute = function (_UnknownError3) {
  (0, _inherits2.default)(MissingAPIRoute, _UnknownError3);

  var _super4 = _createSuper(MissingAPIRoute);

  function MissingAPIRoute() {
    var _this4;

    (0, _classCallCheck2.default)(this, MissingAPIRoute);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this4 = _super4.call.apply(_super4, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this4), "name", "MissingAPIRouteError");
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this4), "code", "MISSING_NEXTAUTH_API_ROUTE_ERROR");
    return _this4;
  }

  return (0, _createClass2.default)(MissingAPIRoute);
}(UnknownError);

exports.MissingAPIRoute = MissingAPIRoute;

var MissingSecret = function (_UnknownError4) {
  (0, _inherits2.default)(MissingSecret, _UnknownError4);

  var _super5 = _createSuper(MissingSecret);

  function MissingSecret() {
    var _this5;

    (0, _classCallCheck2.default)(this, MissingSecret);

    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    _this5 = _super5.call.apply(_super5, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this5), "name", "MissingSecretError");
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this5), "code", "NO_SECRET");
    return _this5;
  }

  return (0, _createClass2.default)(MissingSecret);
}(UnknownError);

exports.MissingSecret = MissingSecret;

var MissingAuthorize = function (_UnknownError5) {
  (0, _inherits2.default)(MissingAuthorize, _UnknownError5);

  var _super6 = _createSuper(MissingAuthorize);

  function MissingAuthorize() {
    var _this6;

    (0, _classCallCheck2.default)(this, MissingAuthorize);

    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    _this6 = _super6.call.apply(_super6, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this6), "name", "MissingAuthorizeError");
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this6), "code", "CALLBACK_CREDENTIALS_HANDLER_ERROR");
    return _this6;
  }

  return (0, _createClass2.default)(MissingAuthorize);
}(UnknownError);

exports.MissingAuthorize = MissingAuthorize;

var MissingAdapter = function (_UnknownError6) {
  (0, _inherits2.default)(MissingAdapter, _UnknownError6);

  var _super7 = _createSuper(MissingAdapter);

  function MissingAdapter() {
    var _this7;

    (0, _classCallCheck2.default)(this, MissingAdapter);

    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    _this7 = _super7.call.apply(_super7, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this7), "name", "MissingAdapterError");
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this7), "code", "EMAIL_REQUIRES_ADAPTER_ERROR");
    return _this7;
  }

  return (0, _createClass2.default)(MissingAdapter);
}(UnknownError);

exports.MissingAdapter = MissingAdapter;

var MissingAdapterMethods = function (_UnknownError7) {
  (0, _inherits2.default)(MissingAdapterMethods, _UnknownError7);

  var _super8 = _createSuper(MissingAdapterMethods);

  function MissingAdapterMethods() {
    var _this8;

    (0, _classCallCheck2.default)(this, MissingAdapterMethods);

    for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }

    _this8 = _super8.call.apply(_super8, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this8), "name", "MissingAdapterMethodsError");
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this8), "code", "MISSING_ADAPTER_METHODS_ERROR");
    return _this8;
  }

  return (0, _createClass2.default)(MissingAdapterMethods);
}(UnknownError);

exports.MissingAdapterMethods = MissingAdapterMethods;

var UnsupportedStrategy = function (_UnknownError8) {
  (0, _inherits2.default)(UnsupportedStrategy, _UnknownError8);

  var _super9 = _createSuper(UnsupportedStrategy);

  function UnsupportedStrategy() {
    var _this9;

    (0, _classCallCheck2.default)(this, UnsupportedStrategy);

    for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8];
    }

    _this9 = _super9.call.apply(_super9, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this9), "name", "UnsupportedStrategyError");
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this9), "code", "CALLBACK_CREDENTIALS_JWT_ERROR");
    return _this9;
  }

  return (0, _createClass2.default)(UnsupportedStrategy);
}(UnknownError);

exports.UnsupportedStrategy = UnsupportedStrategy;

var InvalidCallbackUrl = function (_UnknownError9) {
  (0, _inherits2.default)(InvalidCallbackUrl, _UnknownError9);

  var _super10 = _createSuper(InvalidCallbackUrl);

  function InvalidCallbackUrl() {
    var _this10;

    (0, _classCallCheck2.default)(this, InvalidCallbackUrl);

    for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      args[_key9] = arguments[_key9];
    }

    _this10 = _super10.call.apply(_super10, [this].concat(args));
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
  return Object.keys(methods).reduce(function (acc, name) {
    acc[name] = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
      var method,
          _args = arguments;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
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
      }, _callee, null, [[0, 7]]);
    }));
    return acc;
  }, {});
}

function adapterErrorHandler(adapter, logger) {
  if (!adapter) return;
  return Object.keys(adapter).reduce(function (acc, name) {
    acc[name] = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2() {
      var _len10,
          args,
          _key10,
          method,
          e,
          _args2 = arguments;

      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;

              for (_len10 = _args2.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
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
      }, _callee2, null, [[0, 9]]);
    }));
    return acc;
  }, {});
}

/***/ }),

/***/ 63370:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(27574);

var _typeof = __webpack_require__(50426);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var _exportNames = {
  SessionContext: true,
  useSession: true,
  getSession: true,
  getCsrfToken: true,
  getProviders: true,
  signIn: true,
  signOut: true,
  SessionProvider: true
};
exports.SessionContext = void 0;
exports.SessionProvider = SessionProvider;
exports.getCsrfToken = getCsrfToken;
exports.getProviders = getProviders;
exports.getSession = getSession;
exports.signIn = signIn;
exports.signOut = signOut;
exports.useSession = useSession;

var _regenerator = _interopRequireDefault(__webpack_require__(71299));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(75166));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(76954));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(31974));

var React = _interopRequireWildcard(__webpack_require__(18038));

var _logger2 = _interopRequireWildcard(__webpack_require__(37719));

var _parseUrl = _interopRequireDefault(__webpack_require__(78756));

var _utils = __webpack_require__(23170);

var _jsxRuntime = __webpack_require__(56786);

var _types = __webpack_require__(39631);

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});

var _process$env$NEXTAUTH, _ref, _process$env$NEXTAUTH2, _process$env$NEXTAUTH3, _React$createContext;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var __NEXTAUTH = {
  baseUrl: (0, _parseUrl.default)((_process$env$NEXTAUTH = process.env.NEXTAUTH_URL) !== null && _process$env$NEXTAUTH !== void 0 ? _process$env$NEXTAUTH : process.env.VERCEL_URL).origin,
  basePath: (0, _parseUrl.default)(process.env.NEXTAUTH_URL).path,
  baseUrlServer: (0, _parseUrl.default)((_ref = (_process$env$NEXTAUTH2 = process.env.NEXTAUTH_URL_INTERNAL) !== null && _process$env$NEXTAUTH2 !== void 0 ? _process$env$NEXTAUTH2 : process.env.NEXTAUTH_URL) !== null && _ref !== void 0 ? _ref : process.env.VERCEL_URL).origin,
  basePathServer: (0, _parseUrl.default)((_process$env$NEXTAUTH3 = process.env.NEXTAUTH_URL_INTERNAL) !== null && _process$env$NEXTAUTH3 !== void 0 ? _process$env$NEXTAUTH3 : process.env.NEXTAUTH_URL).path,
  _lastSync: 0,
  _session: undefined,
  _getSession: function _getSession() {}
};
var broadcast = (0, _utils.BroadcastChannel)();
var logger = (0, _logger2.proxyLogger)(_logger2.default, __NEXTAUTH.basePath);

function useOnline() {
  var _React$useState = React.useState(typeof navigator !== "undefined" ? navigator.onLine : false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      isOnline = _React$useState2[0],
      setIsOnline = _React$useState2[1];

  var setOnline = function setOnline() {
    return setIsOnline(true);
  };

  var setOffline = function setOffline() {
    return setIsOnline(false);
  };

  React.useEffect(function () {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);
    return function () {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);
  return isOnline;
}

var SessionContext = (_React$createContext = React.createContext) === null || _React$createContext === void 0 ? void 0 : _React$createContext.call(React, undefined);
exports.SessionContext = SessionContext;

function useSession(options) {
  if (!SessionContext) {
    throw new Error("React Context is unavailable in Server Components");
  }

  var value = React.useContext(SessionContext);

  if (!value && "production" !== "production") {}

  var _ref2 = options !== null && options !== void 0 ? options : {},
      required = _ref2.required,
      onUnauthenticated = _ref2.onUnauthenticated;

  var requiredAndNotLoading = required && value.status === "unauthenticated";
  React.useEffect(function () {
    if (requiredAndNotLoading) {
      var url = "/api/auth/signin?".concat(new URLSearchParams({
        error: "SessionRequired",
        callbackUrl: window.location.href
      }));
      if (onUnauthenticated) onUnauthenticated();else window.location.href = url;
    }
  }, [requiredAndNotLoading, onUnauthenticated]);

  if (requiredAndNotLoading) {
    return {
      data: value.data,
      update: value.update,
      status: "loading"
    };
  }

  return value;
}

function getSession(_x) {
  return _getSession2.apply(this, arguments);
}

function _getSession2() {
  _getSession2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(params) {
    var _params$broadcast;

    var session;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _utils.fetchData)("session", __NEXTAUTH, logger, params);

          case 2:
            session = _context3.sent;

            if ((_params$broadcast = params === null || params === void 0 ? void 0 : params.broadcast) !== null && _params$broadcast !== void 0 ? _params$broadcast : true) {
              broadcast.post({
                event: "session",
                data: {
                  trigger: "getSession"
                }
              });
            }

            return _context3.abrupt("return", session);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getSession2.apply(this, arguments);
}

function getCsrfToken(_x2) {
  return _getCsrfToken.apply(this, arguments);
}

function _getCsrfToken() {
  _getCsrfToken = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4(params) {
    var response;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _utils.fetchData)("csrf", __NEXTAUTH, logger, params);

          case 2:
            response = _context4.sent;
            return _context4.abrupt("return", response === null || response === void 0 ? void 0 : response.csrfToken);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getCsrfToken.apply(this, arguments);
}

function getProviders() {
  return _getProviders.apply(this, arguments);
}

function _getProviders() {
  _getProviders = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee5() {
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _utils.fetchData)("providers", __NEXTAUTH, logger);

          case 2:
            return _context5.abrupt("return", _context5.sent);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getProviders.apply(this, arguments);
}

function signIn(_x3, _x4, _x5) {
  return _signIn.apply(this, arguments);
}

function _signIn() {
  _signIn = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee6(provider, options, authorizationParams) {
    var _ref5, _ref5$callbackUrl, callbackUrl, _ref5$redirect, redirect, baseUrl, providers, isCredentials, isEmail, isSupportingReturn, signInUrl, _signInUrl, res, data, _data$url, url, error;

    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _ref5 = options !== null && options !== void 0 ? options : {}, _ref5$callbackUrl = _ref5.callbackUrl, callbackUrl = _ref5$callbackUrl === void 0 ? window.location.href : _ref5$callbackUrl, _ref5$redirect = _ref5.redirect, redirect = _ref5$redirect === void 0 ? true : _ref5$redirect;
            baseUrl = (0, _utils.apiBaseUrl)(__NEXTAUTH);
            _context6.next = 4;
            return getProviders();

          case 4:
            providers = _context6.sent;

            if (providers) {
              _context6.next = 8;
              break;
            }

            window.location.href = "".concat(baseUrl, "/error");
            return _context6.abrupt("return");

          case 8:
            if (!(!provider || !(provider in providers))) {
              _context6.next = 11;
              break;
            }

            window.location.href = "".concat(baseUrl, "/signin?").concat(new URLSearchParams({
              callbackUrl: callbackUrl
            }));
            return _context6.abrupt("return");

          case 11:
            isCredentials = providers[provider].type === "credentials";
            isEmail = providers[provider].type === "email";
            isSupportingReturn = isCredentials || isEmail;
            signInUrl = "".concat(baseUrl, "/").concat(isCredentials ? "callback" : "signin", "/").concat(provider);
            _signInUrl = "".concat(signInUrl, "?").concat(new URLSearchParams(authorizationParams));
            _context6.t0 = fetch;
            _context6.t1 = _signInUrl;
            _context6.t2 = {
              "Content-Type": "application/x-www-form-urlencoded"
            };
            _context6.t3 = URLSearchParams;
            _context6.t4 = _objectSpread;
            _context6.t5 = _objectSpread({}, options);
            _context6.t6 = {};
            _context6.next = 25;
            return getCsrfToken();

          case 25:
            _context6.t7 = _context6.sent;
            _context6.t8 = callbackUrl;
            _context6.t9 = {
              csrfToken: _context6.t7,
              callbackUrl: _context6.t8,
              json: true
            };
            _context6.t10 = (0, _context6.t4)(_context6.t5, _context6.t6, _context6.t9);
            _context6.t11 = new _context6.t3(_context6.t10);
            _context6.t12 = {
              method: "post",
              headers: _context6.t2,
              body: _context6.t11
            };
            _context6.next = 33;
            return (0, _context6.t0)(_context6.t1, _context6.t12);

          case 33:
            res = _context6.sent;
            _context6.next = 36;
            return res.json();

          case 36:
            data = _context6.sent;

            if (!(redirect || !isSupportingReturn)) {
              _context6.next = 42;
              break;
            }

            url = (_data$url = data.url) !== null && _data$url !== void 0 ? _data$url : callbackUrl;
            window.location.href = url;
            if (url.includes("#")) window.location.reload();
            return _context6.abrupt("return");

          case 42:
            error = new URL(data.url).searchParams.get("error");

            if (!res.ok) {
              _context6.next = 46;
              break;
            }

            _context6.next = 46;
            return __NEXTAUTH._getSession({
              event: "storage"
            });

          case 46:
            return _context6.abrupt("return", {
              error: error,
              status: res.status,
              ok: res.ok,
              url: error ? null : data.url
            });

          case 47:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _signIn.apply(this, arguments);
}

function signOut(_x6) {
  return _signOut.apply(this, arguments);
}

function _signOut() {
  _signOut = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee7(options) {
    var _options$redirect;

    var _ref6, _ref6$callbackUrl, callbackUrl, baseUrl, fetchOptions, res, data, _data$url2, url;

    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _ref6 = options !== null && options !== void 0 ? options : {}, _ref6$callbackUrl = _ref6.callbackUrl, callbackUrl = _ref6$callbackUrl === void 0 ? window.location.href : _ref6$callbackUrl;
            baseUrl = (0, _utils.apiBaseUrl)(__NEXTAUTH);
            _context7.t0 = {
              "Content-Type": "application/x-www-form-urlencoded"
            };
            _context7.t1 = URLSearchParams;
            _context7.next = 6;
            return getCsrfToken();

          case 6:
            _context7.t2 = _context7.sent;
            _context7.t3 = callbackUrl;
            _context7.t4 = {
              csrfToken: _context7.t2,
              callbackUrl: _context7.t3,
              json: true
            };
            _context7.t5 = new _context7.t1(_context7.t4);
            fetchOptions = {
              method: "post",
              headers: _context7.t0,
              body: _context7.t5
            };
            _context7.next = 13;
            return fetch("".concat(baseUrl, "/signout"), fetchOptions);

          case 13:
            res = _context7.sent;
            _context7.next = 16;
            return res.json();

          case 16:
            data = _context7.sent;
            broadcast.post({
              event: "session",
              data: {
                trigger: "signout"
              }
            });

            if (!((_options$redirect = options === null || options === void 0 ? void 0 : options.redirect) !== null && _options$redirect !== void 0 ? _options$redirect : true)) {
              _context7.next = 23;
              break;
            }

            url = (_data$url2 = data.url) !== null && _data$url2 !== void 0 ? _data$url2 : callbackUrl;
            window.location.href = url;
            if (url.includes("#")) window.location.reload();
            return _context7.abrupt("return");

          case 23:
            _context7.next = 25;
            return __NEXTAUTH._getSession({
              event: "storage"
            });

          case 25:
            return _context7.abrupt("return", data);

          case 26:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _signOut.apply(this, arguments);
}

function SessionProvider(props) {
  if (!SessionContext) {
    throw new Error("React Context is unavailable in Server Components");
  }

  var children = props.children,
      basePath = props.basePath,
      refetchInterval = props.refetchInterval,
      refetchWhenOffline = props.refetchWhenOffline;
  if (basePath) __NEXTAUTH.basePath = basePath;
  var hasInitialSession = props.session !== undefined;
  __NEXTAUTH._lastSync = hasInitialSession ? (0, _utils.now)() : 0;

  var _React$useState3 = React.useState(function () {
    if (hasInitialSession) __NEXTAUTH._session = props.session;
    return props.session;
  }),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      session = _React$useState4[0],
      setSession = _React$useState4[1];

  var _React$useState5 = React.useState(!hasInitialSession),
      _React$useState6 = (0, _slicedToArray2.default)(_React$useState5, 2),
      loading = _React$useState6[0],
      setLoading = _React$useState6[1];

  React.useEffect(function () {
    __NEXTAUTH._getSession = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
      var _ref4,
          event,
          storageEvent,
          _args = arguments;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref4 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, event = _ref4.event;
              _context.prev = 1;
              storageEvent = event === "storage";

              if (!(storageEvent || __NEXTAUTH._session === undefined)) {
                _context.next = 10;
                break;
              }

              __NEXTAUTH._lastSync = (0, _utils.now)();
              _context.next = 7;
              return getSession({
                broadcast: !storageEvent
              });

            case 7:
              __NEXTAUTH._session = _context.sent;
              setSession(__NEXTAUTH._session);
              return _context.abrupt("return");

            case 10:
              if (!(!event || __NEXTAUTH._session === null || (0, _utils.now)() < __NEXTAUTH._lastSync)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return");

            case 12:
              __NEXTAUTH._lastSync = (0, _utils.now)();
              _context.next = 15;
              return getSession();

            case 15:
              __NEXTAUTH._session = _context.sent;
              setSession(__NEXTAUTH._session);
              _context.next = 22;
              break;

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](1);
              logger.error("CLIENT_SESSION_ERROR", _context.t0);

            case 22:
              _context.prev = 22;
              setLoading(false);
              return _context.finish(22);

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 19, 22, 25]]);
    }));

    __NEXTAUTH._getSession();

    return function () {
      __NEXTAUTH._lastSync = 0;
      __NEXTAUTH._session = undefined;

      __NEXTAUTH._getSession = function () {};
    };
  }, []);
  React.useEffect(function () {
    var unsubscribe = broadcast.receive(function () {
      return __NEXTAUTH._getSession({
        event: "storage"
      });
    });
    return function () {
      return unsubscribe();
    };
  }, []);
  React.useEffect(function () {
    var _props$refetchOnWindo = props.refetchOnWindowFocus,
        refetchOnWindowFocus = _props$refetchOnWindo === void 0 ? true : _props$refetchOnWindo;

    var visibilityHandler = function visibilityHandler() {
      if (refetchOnWindowFocus && document.visibilityState === "visible") __NEXTAUTH._getSession({
        event: "visibilitychange"
      });
    };

    document.addEventListener("visibilitychange", visibilityHandler, false);
    return function () {
      return document.removeEventListener("visibilitychange", visibilityHandler, false);
    };
  }, [props.refetchOnWindowFocus]);
  var isOnline = useOnline();
  var shouldRefetch = refetchWhenOffline !== false || isOnline;
  React.useEffect(function () {
    if (refetchInterval && shouldRefetch) {
      var refetchIntervalTimer = setInterval(function () {
        if (__NEXTAUTH._session) {
          __NEXTAUTH._getSession({
            event: "poll"
          });
        }
      }, refetchInterval * 1000);
      return function () {
        return clearInterval(refetchIntervalTimer);
      };
    }
  }, [refetchInterval, shouldRefetch]);
  var value = React.useMemo(function () {
    return {
      data: session,
      status: loading ? "loading" : session ? "authenticated" : "unauthenticated",
      update: function update(data) {
        return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2() {
          var newSession;
          return _regenerator.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(loading || !session)) {
                    _context2.next = 2;
                    break;
                  }

                  return _context2.abrupt("return");

                case 2:
                  setLoading(true);
                  _context2.t0 = _utils.fetchData;
                  _context2.t1 = __NEXTAUTH;
                  _context2.t2 = logger;
                  _context2.next = 8;
                  return getCsrfToken();

                case 8:
                  _context2.t3 = _context2.sent;
                  _context2.t4 = data;
                  _context2.t5 = {
                    csrfToken: _context2.t3,
                    data: _context2.t4
                  };
                  _context2.t6 = {
                    body: _context2.t5
                  };
                  _context2.t7 = {
                    req: _context2.t6
                  };
                  _context2.next = 15;
                  return (0, _context2.t0)("session", _context2.t1, _context2.t2, _context2.t7);

                case 15:
                  newSession = _context2.sent;
                  setLoading(false);

                  if (newSession) {
                    setSession(newSession);
                    broadcast.post({
                      event: "session",
                      data: {
                        trigger: "getSession"
                      }
                    });
                  }

                  return _context2.abrupt("return", newSession);

                case 19:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }))();
      }
    };
  }, [session, loading]);
  return (0, _jsxRuntime.jsx)(SessionContext.Provider, {
    value: value,
    children: children
  });
}

/***/ }),

/***/ 39631:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 37719:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(27574);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
exports.proxyLogger = proxyLogger;
exports.setLogger = setLogger;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(75166));

var _errors = __webpack_require__(78574);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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
  if (!debug) _logger.debug = function () {};
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
    if (typeof window === "undefined") {
      return logger;
    }

    var clientLogger = {};

    var _loop = function _loop(level) {
      clientLogger[level] = function (code, metadata) {
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

    for (var level in logger) {
      _loop(level);
    }

    return clientLogger;
  } catch (_unused) {
    return _logger;
  }
}

/***/ }),

/***/ 78756:
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
    toString: () => base
  };
}

/***/ }),

/***/ 93211:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.addBasePath = addBasePath;
var _addPathPrefix = __webpack_require__(11751);
var _normalizeTrailingSlash = __webpack_require__(35156);
const basePath =  false || "";
function addBasePath(path, required) {
    if (false) {}
    return (0, _normalizeTrailingSlash).normalizePathTrailingSlash((0, _addPathPrefix).addPathPrefix(path, basePath));
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=add-base-path.js.map


/***/ }),

/***/ 20579:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.callServer = callServer;
var _async_to_generator = (__webpack_require__(94432)/* ["default"] */ .Z);
var _client = __webpack_require__(97897);
function callServer(id, args) {
    return _callServer.apply(this, arguments);
}
function _callServer() {
    _callServer = _async_to_generator(function*(id, args) {
        const actionId = id;
        // Fetching the current url with the action header.
        // TODO: Refactor this to look up from a manifest.
        const res = yield fetch("", {
            method: "POST",
            headers: {
                Accept: "text/x-component",
                "Next-Action": actionId
            },
            body: yield (0, _client).encodeReply(args)
        });
        if (!res.ok) {
            throw new Error((yield res.text()));
        }
        return (yield res.json())[0];
    });
    return _callServer.apply(this, arguments);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-call-server.js.map


/***/ }),

/***/ 80879:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.AppRouterAnnouncer = AppRouterAnnouncer;
var _react = __webpack_require__(18038);
var _reactDom = __webpack_require__(83743);
const ANNOUNCER_TYPE = "next-route-announcer";
const ANNOUNCER_ID = "__next-route-announcer__";
function getAnnouncerNode() {
    var ref;
    const existingAnnouncer = document.getElementsByName(ANNOUNCER_TYPE)[0];
    if (existingAnnouncer == null ? void 0 : (ref = existingAnnouncer.shadowRoot) == null ? void 0 : ref.childNodes[0]) {
        return existingAnnouncer.shadowRoot.childNodes[0];
    } else {
        const container = document.createElement(ANNOUNCER_TYPE);
        const announcer = document.createElement("div");
        announcer.setAttribute("aria-live", "assertive");
        announcer.setAttribute("id", ANNOUNCER_ID);
        announcer.setAttribute("role", "alert");
        announcer.style.cssText = "position:absolute;border:0;height:1px;margin:-1px;padding:0;width:1px;clip:rect(0 0 0 0);overflow:hidden;white-space:nowrap;word-wrap:normal";
        // Use shadow DOM here to avoid any potential CSS bleed
        const shadow = container.attachShadow({
            mode: "open"
        });
        shadow.appendChild(announcer);
        document.body.appendChild(container);
        return announcer;
    }
}
function AppRouterAnnouncer({ tree  }) {
    const [portalNode, setPortalNode] = (0, _react).useState(null);
    (0, _react).useEffect(()=>{
        const announcer = getAnnouncerNode();
        setPortalNode(announcer);
        return ()=>{
            const container = document.getElementsByTagName(ANNOUNCER_TYPE)[0];
            if (container == null ? void 0 : container.isConnected) {
                document.body.removeChild(container);
            }
        };
    }, []);
    const [routeAnnouncement, setRouteAnnouncement] = (0, _react).useState("");
    const previousTitle = (0, _react).useRef();
    (0, _react).useEffect(()=>{
        let currentTitle = "";
        if (document.title) {
            currentTitle = document.title;
        } else {
            const pageHeader = document.querySelector("h1");
            if (pageHeader) {
                currentTitle = pageHeader.innerText || pageHeader.textContent || "";
            }
        }
        // Only announce the title change, but not for the first load because screen
        // readers do that automatically.
        if (typeof previousTitle.current !== "undefined") {
            setRouteAnnouncement(currentTitle);
        }
        previousTitle.current = currentTitle;
    }, [
        tree
    ]);
    return portalNode ? /*#__PURE__*/ (0, _reactDom).createPortal(routeAnnouncement, portalNode) : null;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-router-announcer.js.map


/***/ }),

/***/ 35687:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.FLIGHT_PARAMETERS = exports.RSC_VARY_HEADER = exports.RSC_CONTENT_TYPE_HEADER = exports.FETCH_CACHE_HEADER = exports.NEXT_URL = exports.NEXT_ROUTER_PREFETCH = exports.NEXT_ROUTER_STATE_TREE = exports.ACTION = exports.RSC = void 0;
const RSC = "RSC";
exports.RSC = RSC;
const ACTION = "Next-Action";
exports.ACTION = ACTION;
const NEXT_ROUTER_STATE_TREE = "Next-Router-State-Tree";
exports.NEXT_ROUTER_STATE_TREE = NEXT_ROUTER_STATE_TREE;
const NEXT_ROUTER_PREFETCH = "Next-Router-Prefetch";
exports.NEXT_ROUTER_PREFETCH = NEXT_ROUTER_PREFETCH;
const NEXT_URL = "Next-Url";
exports.NEXT_URL = NEXT_URL;
const FETCH_CACHE_HEADER = "x-vercel-sc-headers";
exports.FETCH_CACHE_HEADER = FETCH_CACHE_HEADER;
const RSC_CONTENT_TYPE_HEADER = "text/x-component";
exports.RSC_CONTENT_TYPE_HEADER = RSC_CONTENT_TYPE_HEADER;
const RSC_VARY_HEADER = `${RSC}, ${NEXT_ROUTER_STATE_TREE}, ${NEXT_ROUTER_PREFETCH}`;
exports.RSC_VARY_HEADER = RSC_VARY_HEADER;
const FLIGHT_PARAMETERS = [
    [
        RSC
    ],
    [
        NEXT_ROUTER_STATE_TREE
    ],
    [
        NEXT_ROUTER_PREFETCH
    ]
];
exports.FLIGHT_PARAMETERS = FLIGHT_PARAMETERS;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-router-headers.js.map


/***/ }),

/***/ 67144:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = AppRouter;
exports.urlToUrlWithoutFlightMarker = urlToUrlWithoutFlightMarker;
var _async_to_generator = (__webpack_require__(94432)/* ["default"] */ .Z);
var _interop_require_wildcard = (__webpack_require__(51644)/* ["default"] */ .Z);
var _object_without_properties_loose = (__webpack_require__(52495)/* ["default"] */ .Z);
var _react = _interop_require_wildcard(__webpack_require__(18038));
var _appRouterContext = __webpack_require__(3280);
var _routerReducer = __webpack_require__(54145);
var _routerReducerTypes = __webpack_require__(59465);
var _createHrefFromUrl = __webpack_require__(7315);
var _hooksClientContext = __webpack_require__(69274);
var _useReducerWithDevtools = __webpack_require__(19013);
var _errorBoundary = __webpack_require__(23682);
var _createInitialRouterState = __webpack_require__(62832);
var _isBot = __webpack_require__(1897);
var _addBasePath = __webpack_require__(93211);
var _appRouterAnnouncer = __webpack_require__(80879);
var _redirectBoundary = __webpack_require__(81907);
var _notFoundBoundary = __webpack_require__(93478);
var _findHeadInCache = __webpack_require__(93651);
function AppRouter(props) {
    const { globalErrorComponent  } = props, rest = _object_without_properties_loose(props, [
        "globalErrorComponent"
    ]);
    return /*#__PURE__*/ _react.default.createElement(_errorBoundary.ErrorBoundary, {
        errorComponent: globalErrorComponent
    }, /*#__PURE__*/ _react.default.createElement(Router, Object.assign({}, rest)));
}
const isServer = "undefined" === "undefined";
// Ensure the initialParallelRoutes are not combined because of double-rendering in the browser with Strict Mode.
let initialParallelRoutes = isServer ? null : new Map();
function urlToUrlWithoutFlightMarker(url) {
    const urlWithoutFlightParameters = new URL(url, location.origin);
    // TODO-APP: handle .rsc for static export case
    return urlWithoutFlightParameters;
}
const HotReloader =  true ? null : 0;
function isExternalURL(url) {
    return url.origin !== window.location.origin;
}
/**
 * The global router that wraps the application components.
 */ function Router({ initialHead , initialTree , initialCanonicalUrl , children , assetPrefix , notFound , notFoundStyles , asNotFound  }) {
    const initialState = (0, _react).useMemo(()=>(0, _createInitialRouterState).createInitialRouterState({
            children,
            initialCanonicalUrl,
            initialTree,
            initialParallelRoutes,
            isServer,
            location: !isServer ? window.location : null,
            initialHead
        }), [
        children,
        initialCanonicalUrl,
        initialTree,
        initialHead
    ]);
    const [{ tree , cache , prefetchCache , pushRef , focusAndScrollRef , canonicalUrl , nextUrl  }, dispatch, sync] = (0, _useReducerWithDevtools).useReducerWithReduxDevtools(_routerReducer.reducer, initialState);
    (0, _react).useEffect(()=>{
        // Ensure initialParallelRoutes is cleaned up from memory once it's used.
        initialParallelRoutes = null;
    }, []);
    // Add memoized pathname/query for useSearchParams and usePathname.
    const { searchParams , pathname  } = (0, _react).useMemo(()=>{
        const url = new URL(canonicalUrl,  true ? "http://n" : 0);
        return {
            // This is turned into a readonly class in `useSearchParams`
            searchParams: url.searchParams,
            pathname: url.pathname
        };
    }, [
        canonicalUrl
    ]);
    /**
   * Server response that only patches the cache and tree.
   */ const changeByServerResponse = (0, _react).useCallback((previousTree, flightData, overrideCanonicalUrl)=>{
        dispatch({
            type: _routerReducerTypes.ACTION_SERVER_PATCH,
            flightData,
            previousTree,
            overrideCanonicalUrl,
            cache: {
                status: _appRouterContext.CacheStates.LAZY_INITIALIZED,
                data: null,
                subTreeData: null,
                parallelRoutes: new Map()
            },
            mutable: {}
        });
    }, [
        dispatch
    ]);
    /**
   * The app router that is exposed through `useRouter`. It's only concerned with dispatching actions to the reducer, does not hold state.
   */ const appRouter = (0, _react).useMemo(()=>{
        const navigate = (href, navigateType, forceOptimisticNavigation)=>{
            const url = new URL((0, _addBasePath).addBasePath(href), location.origin);
            return dispatch({
                type: _routerReducerTypes.ACTION_NAVIGATE,
                url,
                isExternalUrl: isExternalURL(url),
                locationSearch: location.search,
                forceOptimisticNavigation,
                navigateType,
                cache: {
                    status: _appRouterContext.CacheStates.LAZY_INITIALIZED,
                    data: null,
                    subTreeData: null,
                    parallelRoutes: new Map()
                },
                mutable: {}
            });
        };
        const routerInstance = {
            back: ()=>window.history.back(),
            forward: ()=>window.history.forward(),
            prefetch: _async_to_generator(function*(href) {
                // If prefetch has already been triggered, don't trigger it again.
                if ((0, _isBot).isBot(window.navigator.userAgent)) {
                    return;
                }
                const url = new URL((0, _addBasePath).addBasePath(href), location.origin);
                // External urls can't be prefetched in the same way.
                if (isExternalURL(url)) {
                    return;
                }
                // @ts-ignore startTransition exists
                _react.default.startTransition(()=>{
                    dispatch({
                        type: _routerReducerTypes.ACTION_PREFETCH,
                        url
                    });
                });
            }),
            replace: (href, options = {})=>{
                // @ts-ignore startTransition exists
                _react.default.startTransition(()=>{
                    navigate(href, "replace", Boolean(options.forceOptimisticNavigation));
                });
            },
            push: (href, options = {})=>{
                // @ts-ignore startTransition exists
                _react.default.startTransition(()=>{
                    navigate(href, "push", Boolean(options.forceOptimisticNavigation));
                });
            },
            refresh: ()=>{
                // @ts-ignore startTransition exists
                _react.default.startTransition(()=>{
                    dispatch({
                        type: _routerReducerTypes.ACTION_REFRESH,
                        cache: {
                            status: _appRouterContext.CacheStates.LAZY_INITIALIZED,
                            data: null,
                            subTreeData: null,
                            parallelRoutes: new Map()
                        },
                        mutable: {},
                        origin: window.location.origin
                    });
                });
            },
            // @ts-ignore we don't want to expose this method at all
            fastRefresh: ()=>{
                if (true) {
                    throw new Error("fastRefresh can only be used in development mode. Please use refresh instead.");
                } else {}
            }
        };
        return routerInstance;
    }, [
        dispatch
    ]);
    (0, _react).useEffect(()=>{
        // When mpaNavigation flag is set do a hard navigation to the new url.
        if (pushRef.mpaNavigation) {
            const location1 = window.location;
            if (pushRef.pendingPush) {
                location1.assign(canonicalUrl);
            } else {
                location1.replace(canonicalUrl);
            }
            return;
        }
        // Identifier is shortened intentionally.
        // __NA is used to identify if the history entry can be handled by the app-router.
        // __N is used to identify if the history entry can be handled by the old router.
        const historyState = {
            __NA: true,
            tree
        };
        if (pushRef.pendingPush && (0, _createHrefFromUrl).createHrefFromUrl(new URL(window.location.href)) !== canonicalUrl) {
            // This intentionally mutates React state, pushRef is overwritten to ensure additional push/replace calls do not trigger an additional history entry.
            pushRef.pendingPush = false;
            window.history.pushState(historyState, "", canonicalUrl);
        } else {
            window.history.replaceState(historyState, "", canonicalUrl);
        }
        sync();
    }, [
        tree,
        pushRef,
        canonicalUrl,
        sync
    ]);
    // Add `window.nd` for debugging purposes.
    // This is not meant for use in applications as concurrent rendering will affect the cache/tree/router.
    if (false) {}
    /**
   * Handle popstate event, this is used to handle back/forward in the browser.
   * By default dispatches ACTION_RESTORE, however if the history entry was not pushed/replaced by app-router it will reload the page.
   * That case can happen when the old router injected the history entry.
   */ const onPopState = (0, _react).useCallback(({ state  })=>{
        if (!state) {
            // TODO-APP: this case only happens when pushState/replaceState was called outside of Next.js. It should probably reload the page in this case.
            return;
        }
        // This case happens when the history entry was pushed by the `pages` router.
        if (!state.__NA) {
            window.location.reload();
            return;
        }
        // @ts-ignore useTransition exists
        // TODO-APP: Ideally the back button should not use startTransition as it should apply the updates synchronously
        // Without startTransition works if the cache is there for this path
        _react.default.startTransition(()=>{
            dispatch({
                type: _routerReducerTypes.ACTION_RESTORE,
                url: new URL(window.location.href),
                tree: state.tree
            });
        });
    }, [
        dispatch
    ]);
    // Register popstate event to call onPopstate.
    (0, _react).useEffect(()=>{
        window.addEventListener("popstate", onPopState);
        return ()=>{
            window.removeEventListener("popstate", onPopState);
        };
    }, [
        onPopState
    ]);
    const head = (0, _react).useMemo(()=>{
        return (0, _findHeadInCache).findHeadInCache(cache, tree[1]);
    }, [
        cache,
        tree
    ]);
    const content = /*#__PURE__*/ _react.default.createElement(_notFoundBoundary.NotFoundBoundary, {
        notFound: notFound,
        notFoundStyles: notFoundStyles,
        asNotFound: asNotFound
    }, /*#__PURE__*/ _react.default.createElement(_redirectBoundary.RedirectBoundary, null, head, cache.subTreeData, /*#__PURE__*/ _react.default.createElement(_appRouterAnnouncer.AppRouterAnnouncer, {
        tree: tree
    })));
    return /*#__PURE__*/ _react.default.createElement(_hooksClientContext.PathnameContext.Provider, {
        value: pathname
    }, /*#__PURE__*/ _react.default.createElement(_hooksClientContext.SearchParamsContext.Provider, {
        value: searchParams
    }, /*#__PURE__*/ _react.default.createElement(_appRouterContext.GlobalLayoutRouterContext.Provider, {
        value: {
            changeByServerResponse,
            tree,
            focusAndScrollRef,
            nextUrl
        }
    }, /*#__PURE__*/ _react.default.createElement(_appRouterContext.AppRouterContext.Provider, {
        value: appRouter
    }, /*#__PURE__*/ _react.default.createElement(_appRouterContext.LayoutRouterContext.Provider, {
        value: {
            childNodes: cache.parallelRoutes,
            tree: tree,
            // Root node always has `url`
            // Provided in AppTreeContext to ensure it can be overwritten in layout-router
            url: canonicalUrl
        }
    }, HotReloader ? /*#__PURE__*/ _react.default.createElement(HotReloader, {
        assetPrefix: assetPrefix
    }, content) : content)))));
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-router.js.map


/***/ }),

/***/ 47885:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.bailoutToClientRendering = bailoutToClientRendering;
var _dynamicNoSsr = __webpack_require__(30201);
var _staticGenerationAsyncStorage = __webpack_require__(1839);
function bailoutToClientRendering() {
    const staticGenerationStore = _staticGenerationAsyncStorage.staticGenerationAsyncStorage.getStore();
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.forceStatic) {
        return true;
    }
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.isStaticGeneration) {
        (0, _dynamicNoSsr).suspense();
    }
    return false;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=bailout-to-client-rendering.js.map


/***/ }),

/***/ 68107:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.clientHookInServerComponentError = clientHookInServerComponentError;
var _interop_require_default = (__webpack_require__(46356)/* ["default"] */ .Z);
var _react = _interop_require_default(__webpack_require__(18038));
function clientHookInServerComponentError(hookName) {
    if (false) {}
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=client-hook-in-server-component-error.js.map


/***/ }),

/***/ 23682:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = GlobalError;
exports.ErrorBoundary = ErrorBoundary;
var _interop_require_default = (__webpack_require__(46356)/* ["default"] */ .Z);
var _react = _interop_require_default(__webpack_require__(18038));
function GlobalError({ error  }) {
    return /*#__PURE__*/ _react.default.createElement("html", null, /*#__PURE__*/ _react.default.createElement("head", null), /*#__PURE__*/ _react.default.createElement("body", null, /*#__PURE__*/ _react.default.createElement("div", {
        style: styles.error
    }, /*#__PURE__*/ _react.default.createElement("div", {
        style: styles.desc
    }, /*#__PURE__*/ _react.default.createElement("h2", {
        style: styles.text
    }, "Application error: a client-side exception has occurred (see the browser console for more information)."), (error == null ? void 0 : error.digest) && /*#__PURE__*/ _react.default.createElement("p", {
        style: styles.text
    }, `Digest: ${error.digest}`)))));
}
const styles = {
    error: {
        // https://github.com/sindresorhus/modern-normalize/blob/main/modern-normalize.css#L38-L52
        fontFamily: 'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
        height: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    desc: {
        textAlign: "left"
    },
    text: {
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "3em",
        margin: 0
    }
};
class ErrorBoundaryHandler extends _react.default.Component {
    static getDerivedStateFromError(error) {
        return {
            error
        };
    }
    render() {
        if (this.state.error) {
            return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, this.props.errorStyles, /*#__PURE__*/ _react.default.createElement(this.props.errorComponent, {
                error: this.state.error,
                reset: this.reset
            }));
        }
        return this.props.children;
    }
    constructor(props){
        super(props);
        this.reset = ()=>{
            this.setState({
                error: null
            });
        };
        this.state = {
            error: null
        };
    }
}
exports.ErrorBoundaryHandler = ErrorBoundaryHandler;
function ErrorBoundary({ errorComponent , errorStyles , children  }) {
    if (errorComponent) {
        return /*#__PURE__*/ _react.default.createElement(ErrorBoundaryHandler, {
            errorComponent: errorComponent,
            errorStyles: errorStyles
        }, children);
    }
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, children);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=error-boundary.js.map


/***/ }),

/***/ 79218:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.DYNAMIC_ERROR_CODE = void 0;
const DYNAMIC_ERROR_CODE = "DYNAMIC_SERVER_USAGE";
exports.DYNAMIC_ERROR_CODE = DYNAMIC_ERROR_CODE;
class DynamicServerError extends Error {
    constructor(type){
        super(`Dynamic server usage: ${type}`);
        this.digest = DYNAMIC_ERROR_CODE;
    }
}
exports.DynamicServerError = DynamicServerError;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=hooks-server-context.js.map


/***/ }),

/***/ 93494:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.createInfinitePromise = createInfinitePromise;
/**
 * Used to cache in createInfinitePromise
 */ let infinitePromise;
function createInfinitePromise() {
    if (!infinitePromise) {
        // Only create the Promise once
        infinitePromise = new Promise(()=>{
        // This is used to debug when the rendering is never updated.
        // setTimeout(() => {
        //   infinitePromise = new Error('Infinite promise')
        //   resolve()
        // }, 5000)
        });
    }
    return infinitePromise;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=infinite-promise.js.map


/***/ }),

/***/ 77914:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = OuterLayoutRouter;
var _extends = (__webpack_require__(67688)/* ["default"] */ .Z);
var _interop_require_default = (__webpack_require__(46356)/* ["default"] */ .Z);
var _interop_require_wildcard = (__webpack_require__(51644)/* ["default"] */ .Z);
var _react = _interop_require_wildcard(__webpack_require__(18038));
var _reactDom = _interop_require_default(__webpack_require__(83743));
var _appRouterContext = __webpack_require__(3280);
var _fetchServerResponse = __webpack_require__(67794);
var _infinitePromise = __webpack_require__(93494);
var _errorBoundary = __webpack_require__(23682);
var _matchSegments = __webpack_require__(75309);
var _handleSmoothScroll = __webpack_require__(21668);
var _redirectBoundary = __webpack_require__(81907);
var _notFoundBoundary = __webpack_require__(93478);
var _getSegmentValue = __webpack_require__(56051);
var _createRouterCacheKey = __webpack_require__(63867);
function OuterLayoutRouter({ parallelRouterKey , segmentPath , childProp , error , errorStyles , templateStyles , loading , loadingStyles , hasLoading , template , notFound , notFoundStyles , asNotFound  }) {
    const context = (0, _react).useContext(_appRouterContext.LayoutRouterContext);
    if (!context) {
        throw new Error("invariant expected layout router to be mounted");
    }
    const { childNodes , tree , url  } = context;
    // Get the current parallelRouter cache node
    let childNodesForParallelRouter = childNodes.get(parallelRouterKey);
    // If the parallel router cache node does not exist yet, create it.
    // This writes to the cache when there is no item in the cache yet. It never *overwrites* existing cache items which is why it's safe in concurrent mode.
    if (!childNodesForParallelRouter) {
        childNodes.set(parallelRouterKey, new Map());
        childNodesForParallelRouter = childNodes.get(parallelRouterKey);
    }
    // Get the active segment in the tree
    // The reason arrays are used in the data format is that these are transferred from the server to the browser so it's optimized to save bytes.
    const treeSegment = tree[1][parallelRouterKey][0];
    const childPropSegment = childProp.segment;
    // If segment is an array it's a dynamic route and we want to read the dynamic route value as the segment to get from the cache.
    const currentChildSegmentValue = (0, _getSegmentValue).getSegmentValue(treeSegment);
    /**
   * Decides which segments to keep rendering, all segments that are not active will be wrapped in `<Offscreen>`.
   */ // TODO-APP: Add handling of `<Offscreen>` when it's available.
    const preservedSegments = [
        treeSegment
    ];
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, preservedSegments.map((preservedSegment)=>{
        const isChildPropSegment = (0, _matchSegments).matchSegment(preservedSegment, childPropSegment);
        const preservedSegmentValue = (0, _getSegmentValue).getSegmentValue(preservedSegment);
        const cacheKey = (0, _createRouterCacheKey).createRouterCacheKey(preservedSegment);
        return(/*
            - Error boundary
              - Only renders error boundary if error component is provided.
              - Rendered for each segment to ensure they have their own error state.
            - Loading boundary
              - Only renders suspense boundary if loading components is provided.
              - Rendered for each segment to ensure they have their own loading state.
              - Passed to the router during rendering to ensure it can be immediately rendered when suspending on a Flight fetch.
          */ /*#__PURE__*/ _react.default.createElement(_appRouterContext.TemplateContext.Provider, {
            key: cacheKey,
            value: /*#__PURE__*/ _react.default.createElement(_errorBoundary.ErrorBoundary, {
                errorComponent: error,
                errorStyles: errorStyles
            }, /*#__PURE__*/ _react.default.createElement(LoadingBoundary, {
                hasLoading: hasLoading,
                loading: loading,
                loadingStyles: loadingStyles
            }, /*#__PURE__*/ _react.default.createElement(_notFoundBoundary.NotFoundBoundary, {
                notFound: notFound,
                notFoundStyles: notFoundStyles,
                asNotFound: asNotFound
            }, /*#__PURE__*/ _react.default.createElement(_redirectBoundary.RedirectBoundary, null, /*#__PURE__*/ _react.default.createElement(InnerLayoutRouter, {
                parallelRouterKey: parallelRouterKey,
                url: url,
                tree: tree,
                childNodes: childNodesForParallelRouter,
                childProp: isChildPropSegment ? childProp : null,
                segmentPath: segmentPath,
                cacheKey: cacheKey,
                isActive: currentChildSegmentValue === preservedSegmentValue
            })))))
        }, /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, templateStyles, template)));
    }));
}
/**
 * Add refetch marker to router state at the point of the current layout segment.
 * This ensures the response returned is not further down than the current layout segment.
 */ function walkAddRefetch(segmentPathToWalk, treeToRecreate) {
    if (segmentPathToWalk) {
        const [segment, parallelRouteKey] = segmentPathToWalk;
        const isLast = segmentPathToWalk.length === 2;
        if ((0, _matchSegments).matchSegment(treeToRecreate[0], segment)) {
            if (treeToRecreate[1].hasOwnProperty(parallelRouteKey)) {
                if (isLast) {
                    const subTree = walkAddRefetch(undefined, treeToRecreate[1][parallelRouteKey]);
                    return [
                        treeToRecreate[0],
                        _extends({}, treeToRecreate[1], {
                            [parallelRouteKey]: [
                                subTree[0],
                                subTree[1],
                                subTree[2],
                                "refetch"
                            ]
                        })
                    ];
                }
                return [
                    treeToRecreate[0],
                    _extends({}, treeToRecreate[1], {
                        [parallelRouteKey]: walkAddRefetch(segmentPathToWalk.slice(2), treeToRecreate[1][parallelRouteKey])
                    })
                ];
            }
        }
    }
    return treeToRecreate;
}
// TODO-APP: Replace with new React API for finding dom nodes without a `ref` when available
/**
 * Wraps ReactDOM.findDOMNode with additional logic to hide React Strict Mode warning
 */ function findDOMNode(instance) {
    // Tree-shake for server bundle
    if (false) {}
    // Only apply strict mode warning when not in production
    if (false) {}
    return _reactDom.default.findDOMNode(instance);
}
/**
 * Check if the top corner of the HTMLElement is in the viewport.
 */ function topOfElementInViewport(element, viewportHeight) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= viewportHeight;
}
/**
 * Find the DOM node for a hash fragment.
 * If `top` the page has to scroll to the top of the page. This mirrors the browser's behavior.
 * If the hash fragment is an id, the page has to scroll to the element with that id.
 * If the hash fragment is a name, the page has to scroll to the first element with that name.
 */ function getHashFragmentDomNode(hashFragment) {
    // If the hash fragment is `top` the page has to scroll to the top of the page.
    if (hashFragment === "top") {
        return document.body;
    }
    var ref;
    // If the hash fragment is an id, the page has to scroll to the element with that id.
    return (ref = document.getElementById(hashFragment)) != null ? ref : document.getElementsByName(hashFragment)[0];
}
class ScrollAndFocusHandler extends _react.default.Component {
    componentDidMount() {
        this.handlePotentialScroll();
    }
    componentDidUpdate() {
        // Because this property is overwritten in handlePotentialScroll it's fine to always run it when true as it'll be set to false for subsequent renders.
        if (this.props.focusAndScrollRef.apply) {
            this.handlePotentialScroll();
        }
    }
    render() {
        return this.props.children;
    }
    constructor(...args){
        super(...args);
        this.handlePotentialScroll = ()=>{
            // Handle scroll and focus, it's only applied once in the first useEffect that triggers that changed.
            const { focusAndScrollRef  } = this.props;
            if (focusAndScrollRef.apply) {
                let domNode = null;
                const hashFragment = focusAndScrollRef.hashFragment;
                if (hashFragment) {
                    domNode = getHashFragmentDomNode(hashFragment);
                }
                // `findDOMNode` is tricky because it returns just the first child if the component is a fragment.
                // This already caused a bug where the first child was a <link/> in head.
                if (!domNode) {
                    domNode = findDOMNode(this);
                }
                // If there is no DOMNode this layout-router level is skipped. It'll be handled higher-up in the tree.
                if (!(domNode instanceof HTMLElement)) {
                    return;
                }
                // State is mutated to ensure that the focus and scroll is applied only once.
                focusAndScrollRef.apply = false;
                (0, _handleSmoothScroll).handleSmoothScroll(()=>{
                    // In case of hash scroll we need to scroll to the top of the element
                    if (hashFragment) {
                        window.scrollTo(0, domNode.offsetTop);
                        return;
                    }
                    // Store the current viewport height because reading `clientHeight` causes a reflow,
                    // and it won't change during this function.
                    const htmlElement = document.documentElement;
                    const viewportHeight = htmlElement.clientHeight;
                    // If the element's top edge is already in the viewport, exit early.
                    if (topOfElementInViewport(domNode, viewportHeight)) {
                        return;
                    }
                    // Otherwise, try scrolling go the top of the document to be backward compatible with pages
                    // scrollIntoView() called on `<html/>` element scrolls horizontally on chrome and firefox (that shouldn't happen)
                    // We could use it to scroll horizontally following RTL but that also seems to be broken - it will always scroll left
                    // scrollLeft = 0 also seems to ignore RTL and manually checking for RTL is too much hassle so we will scroll just vertically
                    htmlElement.scrollTop = 0;
                    // Scroll to domNode if domNode is not in viewport when scrolled to top of document
                    if (!topOfElementInViewport(domNode, viewportHeight)) {
                        domNode.scrollIntoView();
                    }
                }, {
                    // We will force layout by querying domNode position
                    dontForceLayout: true
                });
                // Set focus on the element
                domNode.focus();
            }
        };
    }
}
/**
 * InnerLayoutRouter handles rendering the provided segment based on the cache.
 */ function InnerLayoutRouter({ parallelRouterKey , url , childNodes , childProp , segmentPath , tree , // isActive,
cacheKey  }) {
    const context = (0, _react).useContext(_appRouterContext.GlobalLayoutRouterContext);
    if (!context) {
        throw new Error("invariant global layout router not mounted");
    }
    const { changeByServerResponse , tree: fullTree , focusAndScrollRef  } = context;
    // Read segment path from the parallel router cache node.
    let childNode = childNodes.get(cacheKey);
    // If childProp is available this means it's the Flight / SSR case.
    if (childProp && // TODO-APP: verify if this can be null based on user code
    childProp.current !== null) {
        if (childNode) {
            if (childNode.status === _appRouterContext.CacheStates.LAZY_INITIALIZED) {
                // @ts-expect-error we're changing it's type!
                childNode.status = _appRouterContext.CacheStates.READY;
                // @ts-expect-error
                childNode.subTreeData = childProp.current;
                // Mutates the prop in order to clean up the memory associated with the subTreeData as it is now part of the cache.
                childProp.current = null;
            }
        } else {
            // Add the segment's subTreeData to the cache.
            // This writes to the cache when there is no item in the cache yet. It never *overwrites* existing cache items which is why it's safe in concurrent mode.
            childNodes.set(cacheKey, {
                status: _appRouterContext.CacheStates.READY,
                data: null,
                subTreeData: childProp.current,
                parallelRoutes: new Map()
            });
            // Mutates the prop in order to clean up the memory associated with the subTreeData as it is now part of the cache.
            childProp.current = null;
            // In the above case childNode was set on childNodes, so we have to get it from the cacheNodes again.
            childNode = childNodes.get(cacheKey);
        }
    }
    // When childNode is not available during rendering client-side we need to fetch it from the server.
    if (!childNode || childNode.status === _appRouterContext.CacheStates.LAZY_INITIALIZED) {
        /**
     * Router state with refetch marker added
     */ // TODO-APP: remove ''
        const refetchTree = walkAddRefetch([
            "",
            ...segmentPath
        ], fullTree);
        /**
     * Flight data fetch kicked off during render and put into the cache.
     */ childNodes.set(cacheKey, {
            status: _appRouterContext.CacheStates.DATA_FETCH,
            data: (0, _fetchServerResponse).fetchServerResponse(new URL(url, location.origin), refetchTree, context.nextUrl),
            subTreeData: null,
            head: childNode && childNode.status === _appRouterContext.CacheStates.LAZY_INITIALIZED ? childNode.head : undefined,
            parallelRoutes: childNode && childNode.status === _appRouterContext.CacheStates.LAZY_INITIALIZED ? childNode.parallelRoutes : new Map()
        });
        // In the above case childNode was set on childNodes, so we have to get it from the cacheNodes again.
        childNode = childNodes.get(cacheKey);
    }
    // This case should never happen so it throws an error. It indicates there's a bug in the Next.js.
    if (!childNode) {
        throw new Error("Child node should always exist");
    }
    // This case should never happen so it throws an error. It indicates there's a bug in the Next.js.
    if (childNode.subTreeData && childNode.data) {
        throw new Error("Child node should not have both subTreeData and data");
    }
    // If cache node has a data request we have to unwrap response by `use` and update the cache.
    if (childNode.data) {
        /**
     * Flight response data
     */ // When the data has not resolved yet `use` will suspend here.
        const [flightData, overrideCanonicalUrl] = (0, _react).use(childNode.data);
        // Handle case when navigating to page in `pages` from `app`
        if (typeof flightData === "string") {
            window.location.href = url;
            return null;
        }
        // segmentPath from the server does not match the layout's segmentPath
        childNode.data = null;
        // setTimeout is used to start a new transition during render, this is an intentional hack around React.
        setTimeout(()=>{
            // @ts-ignore startTransition exists
            _react.default.startTransition(()=>{
                changeByServerResponse(fullTree, flightData, overrideCanonicalUrl);
            });
        });
        // Suspend infinitely as `changeByServerResponse` will cause a different part of the tree to be rendered.
        (0, _react).use((0, _infinitePromise).createInfinitePromise());
    }
    // If cache node has no subTreeData and no data request we have to infinitely suspend as the data will likely flow in from another place.
    // TODO-APP: double check users can't return null in a component that will kick in here.
    if (!childNode.subTreeData) {
        (0, _react).use((0, _infinitePromise).createInfinitePromise());
    }
    const subtree = /*#__PURE__*/ _react.default.createElement(_appRouterContext.LayoutRouterContext.Provider, {
        value: {
            tree: tree[1][parallelRouterKey],
            childNodes: childNode.parallelRoutes,
            // TODO-APP: overriding of url for parallel routes
            url: url
        }
    }, childNode.subTreeData);
    // Ensure root layout is not wrapped in a div as the root layout renders `<html>`
    return /*#__PURE__*/ _react.default.createElement(ScrollAndFocusHandler, {
        focusAndScrollRef: focusAndScrollRef
    }, subtree);
}
/**
 * Renders suspense boundary with the provided "loading" property as the fallback.
 * If no loading property is provided it renders the children without a suspense boundary.
 */ function LoadingBoundary({ children , loading , loadingStyles , hasLoading  }) {
    if (hasLoading) {
        return /*#__PURE__*/ _react.default.createElement(_react.default.Suspense, {
            fallback: /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, loadingStyles, loading)
        }, children);
    }
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, children);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=layout-router.js.map


/***/ }),

/***/ 75309:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.canSegmentBeOverridden = exports.matchSegment = void 0;
var _getSegmentParam = __webpack_require__(95232);
const matchSegment = (existingSegment, segment)=>{
    // Common case: segment is just a string
    if (typeof existingSegment === "string" && typeof segment === "string") {
        return existingSegment === segment;
    }
    // Dynamic parameter case: segment is an array with param/value. Both param and value are compared.
    if (Array.isArray(existingSegment) && Array.isArray(segment)) {
        return existingSegment[0] === segment[0] && existingSegment[1] === segment[1];
    }
    return false;
};
exports.matchSegment = matchSegment;
const canSegmentBeOverridden = (existingSegment, segment)=>{
    var ref;
    if (Array.isArray(existingSegment) || !Array.isArray(segment)) {
        return false;
    }
    return ((ref = (0, _getSegmentParam).getSegmentParam(existingSegment)) == null ? void 0 : ref.param) === segment[0];
};
exports.canSegmentBeOverridden = canSegmentBeOverridden;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=match-segments.js.map


/***/ }),

/***/ 59204:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.useSearchParams = useSearchParams;
exports.usePathname = usePathname;
Object.defineProperty(exports, "ServerInsertedHTMLContext", ({
    enumerable: true,
    get: function() {
        return _serverInsertedHtml.ServerInsertedHTMLContext;
    }
}));
Object.defineProperty(exports, "useServerInsertedHTML", ({
    enumerable: true,
    get: function() {
        return _serverInsertedHtml.useServerInsertedHTML;
    }
}));
exports.useRouter = useRouter;
exports.useParams = useParams;
exports.useSelectedLayoutSegments = useSelectedLayoutSegments;
exports.useSelectedLayoutSegment = useSelectedLayoutSegment;
Object.defineProperty(exports, "redirect", ({
    enumerable: true,
    get: function() {
        return _redirect.redirect;
    }
}));
Object.defineProperty(exports, "notFound", ({
    enumerable: true,
    get: function() {
        return _notFound.notFound;
    }
}));
var _react = __webpack_require__(18038);
var _appRouterContext = __webpack_require__(3280);
var _hooksClientContext = __webpack_require__(69274);
var _clientHookInServerComponentError = __webpack_require__(68107);
var _getSegmentValue = __webpack_require__(56051);
var _serverInsertedHtml = __webpack_require__(3349);
var _redirect = __webpack_require__(87388);
var _notFound = __webpack_require__(62961);
const INTERNAL_URLSEARCHPARAMS_INSTANCE = Symbol("internal for urlsearchparams readonly");
function readonlyURLSearchParamsError() {
    return new Error("ReadonlyURLSearchParams cannot be modified");
}
class ReadonlyURLSearchParams {
    [Symbol.iterator]() {
        return this[INTERNAL_URLSEARCHPARAMS_INSTANCE][Symbol.iterator]();
    }
    append() {
        throw readonlyURLSearchParamsError();
    }
    delete() {
        throw readonlyURLSearchParamsError();
    }
    set() {
        throw readonlyURLSearchParamsError();
    }
    sort() {
        throw readonlyURLSearchParamsError();
    }
    constructor(urlSearchParams){
        this[INTERNAL_URLSEARCHPARAMS_INSTANCE] = urlSearchParams;
        this.entries = urlSearchParams.entries.bind(urlSearchParams);
        this.forEach = urlSearchParams.forEach.bind(urlSearchParams);
        this.get = urlSearchParams.get.bind(urlSearchParams);
        this.getAll = urlSearchParams.getAll.bind(urlSearchParams);
        this.has = urlSearchParams.has.bind(urlSearchParams);
        this.keys = urlSearchParams.keys.bind(urlSearchParams);
        this.values = urlSearchParams.values.bind(urlSearchParams);
        this.toString = urlSearchParams.toString.bind(urlSearchParams);
    }
}
exports.ReadonlyURLSearchParams = ReadonlyURLSearchParams;
function useSearchParams() {
    (0, _clientHookInServerComponentError).clientHookInServerComponentError("useSearchParams");
    const searchParams = (0, _react).useContext(_hooksClientContext.SearchParamsContext);
    // In the case where this is `null`, the compat types added in
    // `next-env.d.ts` will add a new overload that changes the return type to
    // include `null`.
    const readonlySearchParams = (0, _react).useMemo(()=>{
        if (!searchParams) {
            // When the router is not ready in pages, we won't have the search params
            // available.
            return null;
        }
        return new ReadonlyURLSearchParams(searchParams);
    }, [
        searchParams
    ]);
    if (true) {
        // AsyncLocalStorage should not be included in the client bundle.
        const { bailoutToClientRendering  } = __webpack_require__(47885);
        if (bailoutToClientRendering()) {
            // TODO-APP: handle dynamic = 'force-static' here and on the client
            return readonlySearchParams;
        }
    }
    return readonlySearchParams;
}
function usePathname() {
    (0, _clientHookInServerComponentError).clientHookInServerComponentError("usePathname");
    // In the case where this is `null`, the compat types added in `next-env.d.ts`
    // will add a new overload that changes the return type to include `null`.
    return (0, _react).useContext(_hooksClientContext.PathnameContext);
}
function useRouter() {
    (0, _clientHookInServerComponentError).clientHookInServerComponentError("useRouter");
    const router = (0, _react).useContext(_appRouterContext.AppRouterContext);
    if (router === null) {
        throw new Error("invariant expected app router to be mounted");
    }
    return router;
}
// TODO-APP: handle parallel routes
function getSelectedParams(tree, params = {}) {
    // After first parallel route prefer children, if there's no children pick the first parallel route.
    const parallelRoutes = tree[1];
    var _children;
    const node = (_children = parallelRoutes.children) != null ? _children : Object.values(parallelRoutes)[0];
    if (!node) return params;
    const segment = node[0];
    const isDynamicParameter = Array.isArray(segment);
    const segmentValue = isDynamicParameter ? segment[1] : segment;
    if (!segmentValue || segmentValue.startsWith("__PAGE__")) return params;
    if (isDynamicParameter) {
        params[segment[0]] = segment[1];
    }
    return getSelectedParams(node, params);
}
function useParams() {
    (0, _clientHookInServerComponentError).clientHookInServerComponentError("useParams");
    const globalLayoutRouterContext = (0, _react).useContext(_appRouterContext.GlobalLayoutRouterContext);
    if (!globalLayoutRouterContext) {
        // This only happens in `pages`. Type is overwritten in navigation.d.ts
        return null;
    }
    return getSelectedParams(globalLayoutRouterContext.tree);
}
// TODO-APP: handle parallel routes
/**
 * Get the canonical parameters from the current level to the leaf node.
 */ function getSelectedLayoutSegmentPath(tree, parallelRouteKey, first = true, segmentPath = []) {
    let node;
    if (first) {
        // Use the provided parallel route key on the first parallel route
        node = tree[1][parallelRouteKey];
    } else {
        // After first parallel route prefer children, if there's no children pick the first parallel route.
        const parallelRoutes = tree[1];
        var _children;
        node = (_children = parallelRoutes.children) != null ? _children : Object.values(parallelRoutes)[0];
    }
    if (!node) return segmentPath;
    const segment = node[0];
    const segmentValue = (0, _getSegmentValue).getSegmentValue(segment);
    if (!segmentValue || segmentValue.startsWith("__PAGE__")) return segmentPath;
    segmentPath.push(segmentValue);
    return getSelectedLayoutSegmentPath(node, parallelRouteKey, false, segmentPath);
}
function useSelectedLayoutSegments(parallelRouteKey = "children") {
    (0, _clientHookInServerComponentError).clientHookInServerComponentError("useSelectedLayoutSegments");
    const { tree  } = (0, _react).useContext(_appRouterContext.LayoutRouterContext);
    return getSelectedLayoutSegmentPath(tree, parallelRouteKey);
}
function useSelectedLayoutSegment(parallelRouteKey = "children") {
    (0, _clientHookInServerComponentError).clientHookInServerComponentError("useSelectedLayoutSegment");
    const selectedLayoutSegments = useSelectedLayoutSegments(parallelRouteKey);
    if (selectedLayoutSegments.length === 0) {
        return null;
    }
    return selectedLayoutSegments[0];
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigation.js.map


/***/ }),

/***/ 93478:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.NotFoundBoundary = NotFoundBoundary;
var _interop_require_default = (__webpack_require__(46356)/* ["default"] */ .Z);
var _react = _interop_require_default(__webpack_require__(18038));
class NotFoundErrorBoundary extends _react.default.Component {
    static getDerivedStateFromError(error) {
        if ((error == null ? void 0 : error.digest) === "NEXT_NOT_FOUND") {
            return {
                notFoundTriggered: true
            };
        }
        // Re-throw if error is not for 404
        throw error;
    }
    render() {
        if (this.state.notFoundTriggered) {
            return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement("meta", {
                name: "robots",
                content: "noindex"
            }), this.props.notFoundStyles, this.props.notFound);
        }
        return this.props.children;
    }
    constructor(props){
        super(props);
        this.state = {
            notFoundTriggered: !!props.asNotFound
        };
    }
}
function NotFoundBoundary({ notFound , notFoundStyles , asNotFound , children  }) {
    return notFound ? /*#__PURE__*/ _react.default.createElement(NotFoundErrorBoundary, {
        notFound: notFound,
        notFoundStyles: notFoundStyles,
        asNotFound: asNotFound
    }, children) : /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, children);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=not-found-boundary.js.map


/***/ }),

/***/ 62961:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.notFound = notFound;
exports.isNotFoundError = isNotFoundError;
const NOT_FOUND_ERROR_CODE = "NEXT_NOT_FOUND";
function notFound() {
    // eslint-disable-next-line no-throw-literal
    const error = new Error(NOT_FOUND_ERROR_CODE);
    error.digest = NOT_FOUND_ERROR_CODE;
    throw error;
}
function isNotFoundError(error) {
    return (error == null ? void 0 : error.digest) === NOT_FOUND_ERROR_CODE;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=not-found.js.map


/***/ }),

/***/ 81907:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.RedirectBoundary = RedirectBoundary;
var _interop_require_wildcard = (__webpack_require__(51644)/* ["default"] */ .Z);
var _react = _interop_require_wildcard(__webpack_require__(18038));
var _navigation = __webpack_require__(59204);
var _redirect = __webpack_require__(87388);
function HandleRedirect({ redirect , reset  }) {
    const router = (0, _navigation).useRouter();
    (0, _react).useEffect(()=>{
        // @ts-ignore startTransition exists
        _react.default.startTransition(()=>{
            router.replace(redirect, {});
            reset();
        });
    }, [
        redirect,
        reset,
        router
    ]);
    return null;
}
class RedirectErrorBoundary extends _react.default.Component {
    static getDerivedStateFromError(error) {
        if ((0, _redirect).isRedirectError(error)) {
            const url = (0, _redirect).getURLFromRedirectError(error);
            return {
                redirect: url
            };
        }
        // Re-throw if error is not for redirect
        throw error;
    }
    render() {
        const redirect = this.state.redirect;
        if (redirect !== null) {
            return /*#__PURE__*/ _react.default.createElement(HandleRedirect, {
                redirect: redirect,
                reset: ()=>this.setState({
                        redirect: null
                    })
            });
        }
        return this.props.children;
    }
    constructor(props){
        super(props);
        this.state = {
            redirect: null
        };
    }
}
exports.RedirectErrorBoundary = RedirectErrorBoundary;
function RedirectBoundary({ children  }) {
    const router = (0, _navigation).useRouter();
    return /*#__PURE__*/ _react.default.createElement(RedirectErrorBoundary, {
        router: router
    }, children);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect-boundary.js.map


/***/ }),

/***/ 87388:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.redirect = redirect;
exports.isRedirectError = isRedirectError;
exports.getURLFromRedirectError = getURLFromRedirectError;
const REDIRECT_ERROR_CODE = "NEXT_REDIRECT";
function redirect(url) {
    // eslint-disable-next-line no-throw-literal
    const error = new Error(REDIRECT_ERROR_CODE);
    error.digest = `${REDIRECT_ERROR_CODE};${url}`;
    throw error;
}
function isRedirectError(error) {
    return typeof (error == null ? void 0 : error.digest) === "string" && error.digest.startsWith(REDIRECT_ERROR_CODE + ";") && error.digest.length > REDIRECT_ERROR_CODE.length + 1;
}
function getURLFromRedirectError(error) {
    if (!isRedirectError(error)) return null;
    // Slices off the beginning of the digest that contains the code and the
    // separating ';'.
    return error.digest.slice(REDIRECT_ERROR_CODE.length + 1);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect.js.map


/***/ }),

/***/ 65110:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = RenderFromTemplateContext;
var _interop_require_wildcard = (__webpack_require__(51644)/* ["default"] */ .Z);
var _react = _interop_require_wildcard(__webpack_require__(18038));
var _appRouterContext = __webpack_require__(3280);
function RenderFromTemplateContext() {
    const children = (0, _react).useContext(_appRouterContext.TemplateContext);
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, children);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=render-from-template-context.js.map


/***/ }),

/***/ 36467:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.applyFlightData = applyFlightData;
var _appRouterContext = __webpack_require__(3280);
var _fillLazyItemsTillLeafWithHead = __webpack_require__(73146);
var _fillCacheWithNewSubtreeData = __webpack_require__(43563);
function applyFlightData(state, cache, flightDataPath, wasPrefetched) {
    // The one before last item is the router state tree patch
    const [treePatch, subTreeData, head] = flightDataPath.slice(-3);
    // Handles case where prefetch only returns the router tree patch without rendered components.
    if (subTreeData === null) {
        return false;
    }
    if (flightDataPath.length === 3) {
        cache.status = _appRouterContext.CacheStates.READY;
        cache.subTreeData = subTreeData;
        (0, _fillLazyItemsTillLeafWithHead).fillLazyItemsTillLeafWithHead(cache, state.cache, treePatch, head, wasPrefetched);
    } else {
        // Copy subTreeData for the root node of the cache.
        cache.status = _appRouterContext.CacheStates.READY;
        cache.subTreeData = state.cache.subTreeData;
        // Create a copy of the existing cache with the subTreeData applied.
        (0, _fillCacheWithNewSubtreeData).fillCacheWithNewSubTreeData(cache, state.cache, flightDataPath);
    }
    return true;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=apply-flight-data.js.map


/***/ }),

/***/ 47953:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.applyRouterStatePatchToTree = applyRouterStatePatchToTree;
var _extends = (__webpack_require__(67688)/* ["default"] */ .Z);
var _matchSegments = __webpack_require__(75309);
/**
 * Deep merge of the two router states. Parallel route keys are preserved if the patch doesn't have them.
 */ function applyPatch(initialTree, patchTree) {
    const [initialSegment, initialParallelRoutes] = initialTree;
    const [patchSegment, patchParallelRoutes] = patchTree;
    // if the applied patch segment is __DEFAULT__ then we can ignore it and return the initial tree
    // this is because the __DEFAULT__ segment is used as a placeholder on navigation
    if (patchSegment === "__DEFAULT__" && initialSegment !== "__DEFAULT__") {
        return initialTree;
    }
    if ((0, _matchSegments).matchSegment(initialSegment, patchSegment)) {
        const newParallelRoutes = {};
        for(const key in initialParallelRoutes){
            const isInPatchTreeParallelRoutes = typeof patchParallelRoutes[key] !== "undefined";
            if (isInPatchTreeParallelRoutes) {
                newParallelRoutes[key] = applyPatch(initialParallelRoutes[key], patchParallelRoutes[key]);
            } else {
                newParallelRoutes[key] = initialParallelRoutes[key];
            }
        }
        for(const key1 in patchParallelRoutes){
            if (newParallelRoutes[key1]) {
                continue;
            }
            newParallelRoutes[key1] = patchParallelRoutes[key1];
        }
        const tree = [
            initialSegment,
            newParallelRoutes
        ];
        if (initialTree[2]) {
            tree[2] = initialTree[2];
        }
        if (initialTree[3]) {
            tree[3] = initialTree[3];
        }
        if (initialTree[4]) {
            tree[4] = initialTree[4];
        }
        return tree;
    }
    return patchTree;
}
function applyRouterStatePatchToTree(flightSegmentPath, flightRouterState, treePatch) {
    const [segment, parallelRoutes, , , isRootLayout] = flightRouterState;
    // Root refresh
    if (flightSegmentPath.length === 1) {
        const tree = applyPatch(flightRouterState, treePatch);
        return tree;
    }
    const [currentSegment, parallelRouteKey] = flightSegmentPath;
    // Tree path returned from the server should always match up with the current tree in the browser
    if (!(0, _matchSegments).matchSegment(currentSegment, segment)) {
        return null;
    }
    const lastSegment = flightSegmentPath.length === 2;
    let parallelRoutePatch;
    if (lastSegment) {
        parallelRoutePatch = applyPatch(parallelRoutes[parallelRouteKey], treePatch);
    } else {
        parallelRoutePatch = applyRouterStatePatchToTree(flightSegmentPath.slice(2), parallelRoutes[parallelRouteKey], treePatch);
        if (parallelRoutePatch === null) {
            return null;
        }
    }
    const tree = [
        flightSegmentPath[0],
        _extends({}, parallelRoutes, {
            [parallelRouteKey]: parallelRoutePatch
        })
    ];
    // Current segment is the root layout
    if (isRootLayout) {
        tree[4] = true;
    }
    return tree;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=apply-router-state-patch-to-tree.js.map


/***/ }),

/***/ 19055:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.extractPathFromFlightRouterState = extractPathFromFlightRouterState;
exports.computeChangedPath = computeChangedPath;
var _interceptionRoutes = __webpack_require__(78652);
var _matchSegments = __webpack_require__(75309);
const segmentToPathname = (segment)=>{
    if (typeof segment === "string") {
        return segment;
    }
    return segment[1];
};
function extractPathFromFlightRouterState(flightRouterState) {
    const segment = Array.isArray(flightRouterState[0]) ? flightRouterState[0][1] : flightRouterState[0];
    if (segment === "__DEFAULT__" || _interceptionRoutes.INTERCEPTION_ROUTE_MARKERS.some((m)=>segment.startsWith(m))) return undefined;
    if (segment === "__PAGE__") return "";
    const path = [
        segment
    ];
    var ref;
    const parallelRoutes = (ref = flightRouterState[1]) != null ? ref : {};
    const childrenPath = parallelRoutes.children ? extractPathFromFlightRouterState(parallelRoutes.children) : undefined;
    if (childrenPath !== undefined) {
        path.push(childrenPath);
    } else {
        for (const [key, value] of Object.entries(parallelRoutes)){
            if (key === "children") continue;
            const childPath = extractPathFromFlightRouterState(value);
            if (childPath !== undefined) {
                path.push(childPath);
            }
        }
    }
    const finalPath = path.join("/");
    // it'll end up including a trailing slash because of '__PAGE__'
    return finalPath.endsWith("/") ? finalPath.slice(0, -1) : finalPath;
}
function computeChangedPath(treeA, treeB) {
    const [segmentA, parallelRoutesA] = treeA;
    const [segmentB, parallelRoutesB] = treeB;
    const normalizedSegmentA = segmentToPathname(segmentA);
    const normalizedSegmentB = segmentToPathname(segmentB);
    if (_interceptionRoutes.INTERCEPTION_ROUTE_MARKERS.some((m)=>normalizedSegmentA.startsWith(m) || normalizedSegmentB.startsWith(m))) {
        return "";
    }
    if (!(0, _matchSegments).matchSegment(segmentA, segmentB)) {
        var ref;
        // once we find where the tree changed, we compute the rest of the path by traversing the tree
        return (ref = extractPathFromFlightRouterState(treeB)) != null ? ref : "";
    }
    for(const parallelRouterKey in parallelRoutesA){
        if (parallelRoutesB[parallelRouterKey]) {
            const changedPath = computeChangedPath(parallelRoutesA[parallelRouterKey], parallelRoutesB[parallelRouterKey]);
            if (changedPath !== null) {
                if (changedPath === "") {
                    return segmentToPathname(segmentB);
                }
                return `${segmentToPathname(segmentB)}/${changedPath}`;
            }
        }
    }
    return null;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=compute-changed-path.js.map


/***/ }),

/***/ 7315:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.createHrefFromUrl = createHrefFromUrl;
function createHrefFromUrl(url, includeHash = true) {
    return url.pathname + url.search + (includeHash ? url.hash : "");
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=create-href-from-url.js.map


/***/ }),

/***/ 62832:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.createInitialRouterState = createInitialRouterState;
var _appRouterContext = __webpack_require__(3280);
var _createHrefFromUrl = __webpack_require__(7315);
var _fillLazyItemsTillLeafWithHead = __webpack_require__(73146);
function createInitialRouterState({ initialTree , children , initialCanonicalUrl , initialParallelRoutes , isServer , location , initialHead  }) {
    const cache = {
        status: _appRouterContext.CacheStates.READY,
        data: null,
        subTreeData: children,
        // The cache gets seeded during the first render. `initialParallelRoutes` ensures the cache from the first render is there during the second render.
        parallelRoutes: isServer ? new Map() : initialParallelRoutes
    };
    // When the cache hasn't been seeded yet we fill the cache with the head.
    if (initialParallelRoutes === null || initialParallelRoutes.size === 0) {
        (0, _fillLazyItemsTillLeafWithHead).fillLazyItemsTillLeafWithHead(cache, undefined, initialTree, initialHead);
    }
    var ref;
    return {
        tree: initialTree,
        cache,
        prefetchCache: new Map(),
        pushRef: {
            pendingPush: false,
            mpaNavigation: false
        },
        focusAndScrollRef: {
            apply: false,
            hashFragment: null
        },
        canonicalUrl: // This is safe to do as canonicalUrl can't be rendered, it's only used to control the history updates in the useEffect further down in this file.
        location ? (0, _createHrefFromUrl).createHrefFromUrl(location) : initialCanonicalUrl,
        nextUrl: (ref = location == null ? void 0 : location.pathname) != null ? ref : null
    };
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=create-initial-router-state.js.map


/***/ }),

/***/ 12489:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.createOptimisticTree = createOptimisticTree;
var _extends = (__webpack_require__(67688)/* ["default"] */ .Z);
var _matchSegments = __webpack_require__(75309);
function createOptimisticTree(segments, flightRouterState, parentRefetch) {
    const [existingSegment, existingParallelRoutes, url, refresh, isRootLayout] = flightRouterState || [
        null,
        {}
    ];
    const segment = segments[0];
    const isLastSegment = segments.length === 1;
    const segmentMatches = existingSegment !== null && (0, _matchSegments).matchSegment(existingSegment, segment);
    const shouldRefetchThisLevel = !flightRouterState || !segmentMatches;
    let parallelRoutes = {};
    if (existingSegment !== null && segmentMatches) {
        parallelRoutes = existingParallelRoutes;
    }
    let childTree;
    if (!isLastSegment) {
        const childItem = createOptimisticTree(segments.slice(1), parallelRoutes ? parallelRoutes.children : null, parentRefetch || shouldRefetchThisLevel);
        childTree = childItem;
    }
    const result = [
        segment,
        _extends({}, parallelRoutes, childTree ? {
            children: childTree
        } : {})
    ];
    if (url) {
        result[2] = url;
    }
    if (!parentRefetch && shouldRefetchThisLevel) {
        result[3] = "refetch";
    } else if (segmentMatches && refresh) {
        result[3] = refresh;
    }
    if (segmentMatches && isRootLayout) {
        result[4] = isRootLayout;
    }
    return result;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=create-optimistic-tree.js.map


/***/ }),

/***/ 40593:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.createRecordFromThenable = createRecordFromThenable;
function createRecordFromThenable(thenable) {
    thenable.status = "pending";
    thenable.then((value)=>{
        if (thenable.status === "pending") {
            thenable.status = "fulfilled";
            thenable.value = value;
        }
    }, (err)=>{
        if (thenable.status === "pending") {
            thenable.status = "rejected";
            thenable.value = err;
        }
    });
    return thenable;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=create-record-from-thenable.js.map


/***/ }),

/***/ 63867:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.createRouterCacheKey = createRouterCacheKey;
function createRouterCacheKey(segment) {
    return Array.isArray(segment) ? `${segment[0]}|${segment[1]}|${segment[2]}` : segment;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=create-router-cache-key.js.map


/***/ }),

/***/ 67794:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.fetchServerResponse = fetchServerResponse;
var _async_to_generator = (__webpack_require__(94432)/* ["default"] */ .Z);
var _client = __webpack_require__(97897);
var _appRouterHeaders = __webpack_require__(35687);
var _appRouter = __webpack_require__(67144);
var _appCallServer = __webpack_require__(20579);
function fetchServerResponse(url, flightRouterState, nextUrl, prefetch) {
    return _fetchServerResponse.apply(this, arguments);
}
function _fetchServerResponse() {
    _fetchServerResponse = _async_to_generator(function*(url, flightRouterState, nextUrl, prefetch) {
        const headers = {
            // Enable flight response
            [_appRouterHeaders.RSC]: "1",
            // Provide the current router state
            [_appRouterHeaders.NEXT_ROUTER_STATE_TREE]: JSON.stringify(flightRouterState)
        };
        if (prefetch) {
            // Enable prefetch response
            headers[_appRouterHeaders.NEXT_ROUTER_PREFETCH] = "1";
        }
        if (nextUrl) {
            headers[_appRouterHeaders.NEXT_URL] = nextUrl;
        }
        try {
            let fetchUrl = url;
            if (true) {
                if (false) {}
            }
            const res = yield fetch(fetchUrl, {
                // Backwards compat for older browsers. `same-origin` is the default in modern browsers.
                credentials: "same-origin",
                headers
            });
            const canonicalUrl = res.redirected ? (0, _appRouter).urlToUrlWithoutFlightMarker(res.url) : undefined;
            const contentType = res.headers.get("content-type") || "";
            let isFlightResponse = contentType === _appRouterHeaders.RSC_CONTENT_TYPE_HEADER;
            if (true) {
                if (false) {}
            }
            // If fetch returns something different than flight response handle it like a mpa navigation
            if (!isFlightResponse) {
                return [
                    res.url,
                    undefined
                ];
            }
            // Handle the `fetch` readable stream that can be unwrapped by `React.use`.
            const flightData = yield (0, _client).createFromFetch(Promise.resolve(res), {
                callServer: _appCallServer.callServer
            });
            return [
                flightData,
                canonicalUrl
            ];
        } catch (err) {
            console.error("Failed to fetch RSC payload. Falling back to browser navigation.", err);
            // If fetch fails handle it like a mpa navigation
            // TODO-APP: Add a test for the case where a CORS request fails, e.g. external url redirect coming from the response.
            // See https://github.com/vercel/next.js/issues/43605#issuecomment-1451617521 for a reproduction.
            return [
                url.toString(),
                undefined
            ];
        }
    });
    return _fetchServerResponse.apply(this, arguments);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=fetch-server-response.js.map


/***/ }),

/***/ 30914:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.fillCacheWithDataProperty = fillCacheWithDataProperty;
var _appRouterContext = __webpack_require__(3280);
function fillCacheWithDataProperty(newCache, existingCache, segments, fetchResponse) {
    const isLastEntry = segments.length === 1;
    const parallelRouteKey = "children";
    const [segment] = segments;
    const existingChildSegmentMap = existingCache.parallelRoutes.get(parallelRouteKey);
    if (!existingChildSegmentMap) {
        // Bailout because the existing cache does not have the path to the leaf node
        // Will trigger lazy fetch in layout-router because of missing segment
        return {
            bailOptimistic: true
        };
    }
    let childSegmentMap = newCache.parallelRoutes.get(parallelRouteKey);
    if (!childSegmentMap || childSegmentMap === existingChildSegmentMap) {
        childSegmentMap = new Map(existingChildSegmentMap);
        newCache.parallelRoutes.set(parallelRouteKey, childSegmentMap);
    }
    const existingChildCacheNode = existingChildSegmentMap.get(segment);
    let childCacheNode = childSegmentMap.get(segment);
    // In case of last segment start off the fetch at this level and don't copy further down.
    if (isLastEntry) {
        if (!childCacheNode || !childCacheNode.data || childCacheNode === existingChildCacheNode) {
            childSegmentMap.set(segment, {
                status: _appRouterContext.CacheStates.DATA_FETCH,
                data: fetchResponse(),
                subTreeData: null,
                parallelRoutes: new Map()
            });
        }
        return;
    }
    if (!childCacheNode || !existingChildCacheNode) {
        // Start fetch in the place where the existing cache doesn't have the data yet.
        if (!childCacheNode) {
            childSegmentMap.set(segment, {
                status: _appRouterContext.CacheStates.DATA_FETCH,
                data: fetchResponse(),
                subTreeData: null,
                parallelRoutes: new Map()
            });
        }
        return;
    }
    if (childCacheNode === existingChildCacheNode) {
        childCacheNode = {
            status: childCacheNode.status,
            data: childCacheNode.data,
            subTreeData: childCacheNode.subTreeData,
            parallelRoutes: new Map(childCacheNode.parallelRoutes)
        };
        childSegmentMap.set(segment, childCacheNode);
    }
    return fillCacheWithDataProperty(childCacheNode, existingChildCacheNode, segments.slice(1), fetchResponse);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=fill-cache-with-data-property.js.map


/***/ }),

/***/ 43563:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.fillCacheWithNewSubTreeData = fillCacheWithNewSubTreeData;
var _appRouterContext = __webpack_require__(3280);
var _invalidateCacheByRouterState = __webpack_require__(35543);
var _fillLazyItemsTillLeafWithHead = __webpack_require__(73146);
var _createRouterCacheKey = __webpack_require__(63867);
function fillCacheWithNewSubTreeData(newCache, existingCache, flightDataPath) {
    const isLastEntry = flightDataPath.length <= 5;
    const [parallelRouteKey, segment] = flightDataPath;
    const cacheKey = (0, _createRouterCacheKey).createRouterCacheKey(segment);
    const existingChildSegmentMap = existingCache.parallelRoutes.get(parallelRouteKey);
    if (!existingChildSegmentMap) {
        // Bailout because the existing cache does not have the path to the leaf node
        // Will trigger lazy fetch in layout-router because of missing segment
        return;
    }
    let childSegmentMap = newCache.parallelRoutes.get(parallelRouteKey);
    if (!childSegmentMap || childSegmentMap === existingChildSegmentMap) {
        childSegmentMap = new Map(existingChildSegmentMap);
        newCache.parallelRoutes.set(parallelRouteKey, childSegmentMap);
    }
    const existingChildCacheNode = existingChildSegmentMap.get(cacheKey);
    let childCacheNode = childSegmentMap.get(cacheKey);
    if (isLastEntry) {
        if (!childCacheNode || !childCacheNode.data || childCacheNode === existingChildCacheNode) {
            childCacheNode = {
                status: _appRouterContext.CacheStates.READY,
                data: null,
                subTreeData: flightDataPath[3],
                // Ensure segments other than the one we got data for are preserved.
                parallelRoutes: existingChildCacheNode ? new Map(existingChildCacheNode.parallelRoutes) : new Map()
            };
            if (existingChildCacheNode) {
                (0, _invalidateCacheByRouterState).invalidateCacheByRouterState(childCacheNode, existingChildCacheNode, flightDataPath[2]);
            }
            (0, _fillLazyItemsTillLeafWithHead).fillLazyItemsTillLeafWithHead(childCacheNode, existingChildCacheNode, flightDataPath[2], flightDataPath[4]);
            childSegmentMap.set(cacheKey, childCacheNode);
        }
        return;
    }
    if (!childCacheNode || !existingChildCacheNode) {
        // Bailout because the existing cache does not have the path to the leaf node
        // Will trigger lazy fetch in layout-router because of missing segment
        return;
    }
    if (childCacheNode === existingChildCacheNode) {
        childCacheNode = {
            status: childCacheNode.status,
            data: childCacheNode.data,
            subTreeData: childCacheNode.subTreeData,
            parallelRoutes: new Map(childCacheNode.parallelRoutes)
        };
        childSegmentMap.set(cacheKey, childCacheNode);
    }
    fillCacheWithNewSubTreeData(childCacheNode, existingChildCacheNode, flightDataPath.slice(2));
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=fill-cache-with-new-subtree-data.js.map


/***/ }),

/***/ 73146:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.fillLazyItemsTillLeafWithHead = fillLazyItemsTillLeafWithHead;
var _appRouterContext = __webpack_require__(3280);
var _createRouterCacheKey = __webpack_require__(63867);
function fillLazyItemsTillLeafWithHead(newCache, existingCache, routerState, head, wasPrefetched) {
    const isLastSegment = Object.keys(routerState[1]).length === 0;
    if (isLastSegment) {
        newCache.head = head;
        return;
    }
    // Remove segment that we got data for so that it is filled in during rendering of subTreeData.
    for(const key in routerState[1]){
        const parallelRouteState = routerState[1][key];
        const segmentForParallelRoute = parallelRouteState[0];
        const cacheKey = (0, _createRouterCacheKey).createRouterCacheKey(segmentForParallelRoute);
        if (existingCache) {
            if (cacheKey === "__DEFAULT__") {
                continue;
            }
            const existingParallelRoutesCacheNode = existingCache.parallelRoutes.get(key);
            if (existingParallelRoutesCacheNode) {
                let parallelRouteCacheNode = new Map(existingParallelRoutesCacheNode);
                const existingCacheNode = parallelRouteCacheNode.get(cacheKey);
                const newCacheNode = wasPrefetched && existingCacheNode ? {
                    status: existingCacheNode.status,
                    data: existingCacheNode.data,
                    subTreeData: existingCacheNode.subTreeData,
                    parallelRoutes: new Map(existingCacheNode.parallelRoutes)
                } : {
                    status: _appRouterContext.CacheStates.LAZY_INITIALIZED,
                    data: null,
                    subTreeData: null,
                    parallelRoutes: new Map(existingCacheNode == null ? void 0 : existingCacheNode.parallelRoutes)
                };
                // Overrides the cache key with the new cache node.
                parallelRouteCacheNode.set(cacheKey, newCacheNode);
                // Traverse deeper to apply the head / fill lazy items till the head.
                fillLazyItemsTillLeafWithHead(newCacheNode, existingCacheNode, parallelRouteState, head, wasPrefetched);
                newCache.parallelRoutes.set(key, parallelRouteCacheNode);
                continue;
            }
        }
        const newCacheNode = {
            status: _appRouterContext.CacheStates.LAZY_INITIALIZED,
            data: null,
            subTreeData: null,
            parallelRoutes: new Map()
        };
        const existingParallelRoutes = newCache.parallelRoutes.get(key);
        if (existingParallelRoutes) {
            existingParallelRoutes.set(cacheKey, newCacheNode);
        } else {
            newCache.parallelRoutes.set(key, new Map([
                [
                    cacheKey,
                    newCacheNode
                ]
            ]));
        }
        fillLazyItemsTillLeafWithHead(newCacheNode, undefined, parallelRouteState, head, wasPrefetched);
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=fill-lazy-items-till-leaf-with-head.js.map


/***/ }),

/***/ 94246:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.handleMutable = handleMutable;
var _computeChangedPath = __webpack_require__(19055);
function handleMutable(state, mutable) {
    var ref;
    return {
        // Set href.
        canonicalUrl: typeof mutable.canonicalUrl !== "undefined" ? mutable.canonicalUrl === state.canonicalUrl ? state.canonicalUrl : mutable.canonicalUrl : state.canonicalUrl,
        pushRef: {
            pendingPush: typeof mutable.pendingPush !== "undefined" ? mutable.pendingPush : state.pushRef.pendingPush,
            mpaNavigation: typeof mutable.mpaNavigation !== "undefined" ? mutable.mpaNavigation : state.pushRef.mpaNavigation
        },
        // All navigation requires scroll and focus management to trigger.
        focusAndScrollRef: {
            apply: typeof mutable.applyFocusAndScroll !== "undefined" ? mutable.applyFocusAndScroll : state.focusAndScrollRef.apply,
            hashFragment: // #top is handled in layout-router.
            mutable.hashFragment && mutable.hashFragment !== "" ? decodeURIComponent(mutable.hashFragment.slice(1)) : null
        },
        // Apply cache.
        cache: mutable.cache ? mutable.cache : state.cache,
        prefetchCache: mutable.prefetchCache ? mutable.prefetchCache : state.prefetchCache,
        // Apply patched router state.
        tree: typeof mutable.patchedTree !== "undefined" ? mutable.patchedTree : state.tree,
        nextUrl: typeof mutable.patchedTree !== "undefined" ? (ref = (0, _computeChangedPath).computeChangedPath(state.tree, mutable.patchedTree)) != null ? ref : state.canonicalUrl : state.nextUrl
    };
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=handle-mutable.js.map


/***/ }),

/***/ 9109:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.invalidateCacheBelowFlightSegmentPath = invalidateCacheBelowFlightSegmentPath;
var _createRouterCacheKey = __webpack_require__(63867);
function invalidateCacheBelowFlightSegmentPath(newCache, existingCache, flightSegmentPath) {
    const isLastEntry = flightSegmentPath.length <= 2;
    const [parallelRouteKey, segment] = flightSegmentPath;
    const cacheKey = (0, _createRouterCacheKey).createRouterCacheKey(segment);
    const existingChildSegmentMap = existingCache.parallelRoutes.get(parallelRouteKey);
    if (!existingChildSegmentMap) {
        // Bailout because the existing cache does not have the path to the leaf node
        // Will trigger lazy fetch in layout-router because of missing segment
        return;
    }
    let childSegmentMap = newCache.parallelRoutes.get(parallelRouteKey);
    if (!childSegmentMap || childSegmentMap === existingChildSegmentMap) {
        childSegmentMap = new Map(existingChildSegmentMap);
        newCache.parallelRoutes.set(parallelRouteKey, childSegmentMap);
    }
    // In case of last entry don't copy further down.
    if (isLastEntry) {
        childSegmentMap.delete(cacheKey);
        return;
    }
    const existingChildCacheNode = existingChildSegmentMap.get(cacheKey);
    let childCacheNode = childSegmentMap.get(cacheKey);
    if (!childCacheNode || !existingChildCacheNode) {
        // Bailout because the existing cache does not have the path to the leaf node
        // Will trigger lazy fetch in layout-router because of missing segment
        return;
    }
    if (childCacheNode === existingChildCacheNode) {
        childCacheNode = {
            status: childCacheNode.status,
            data: childCacheNode.data,
            subTreeData: childCacheNode.subTreeData,
            parallelRoutes: new Map(childCacheNode.parallelRoutes)
        };
        childSegmentMap.set(cacheKey, childCacheNode);
    }
    invalidateCacheBelowFlightSegmentPath(childCacheNode, existingChildCacheNode, flightSegmentPath.slice(2));
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=invalidate-cache-below-flight-segmentpath.js.map


/***/ }),

/***/ 35543:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.invalidateCacheByRouterState = invalidateCacheByRouterState;
var _createRouterCacheKey = __webpack_require__(63867);
function invalidateCacheByRouterState(newCache, existingCache, routerState) {
    // Remove segment that we got data for so that it is filled in during rendering of subTreeData.
    for(const key in routerState[1]){
        const segmentForParallelRoute = routerState[1][key][0];
        const cacheKey = (0, _createRouterCacheKey).createRouterCacheKey(segmentForParallelRoute);
        const existingParallelRoutesCacheNode = existingCache.parallelRoutes.get(key);
        if (existingParallelRoutesCacheNode) {
            let parallelRouteCacheNode = new Map(existingParallelRoutesCacheNode);
            parallelRouteCacheNode.delete(cacheKey);
            newCache.parallelRoutes.set(key, parallelRouteCacheNode);
        }
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=invalidate-cache-by-router-state.js.map


/***/ }),

/***/ 52152:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.isNavigatingToNewRootLayout = isNavigatingToNewRootLayout;
function isNavigatingToNewRootLayout(currentTree, nextTree) {
    // Compare segments
    const currentTreeSegment = currentTree[0];
    const nextTreeSegment = nextTree[0];
    // If any segment is different before we find the root layout, the root layout has changed.
    // E.g. /same/(group1)/layout.js -> /same/(group2)/layout.js
    // First segment is 'same' for both, keep looking. (group1) changed to (group2) before the root layout was found, it must have changed.
    if (Array.isArray(currentTreeSegment) && Array.isArray(nextTreeSegment)) {
        // Compare dynamic param name and type but ignore the value, different values would not affect the current root layout
        // /[name] - /slug1 and /slug2, both values (slug1 & slug2) still has the same layout /[name]/layout.js
        if (currentTreeSegment[0] !== nextTreeSegment[0] || currentTreeSegment[2] !== nextTreeSegment[2]) {
            return true;
        }
    } else if (currentTreeSegment !== nextTreeSegment) {
        return true;
    }
    // Current tree root layout found
    if (currentTree[4]) {
        // If the next tree doesn't have the root layout flag, it must have changed.
        return !nextTree[4];
    }
    // Current tree  didn't have its root layout here, must have changed.
    if (nextTree[4]) {
        return true;
    }
    // We can't assume it's `parallelRoutes.children` here in case the root layout is `app/@something/layout.js`
    // But it's not possible to be more than one parallelRoutes before the root layout is found
    // TODO-APP: change to traverse all parallel routes
    const currentTreeChild = Object.values(currentTree[1])[0];
    const nextTreeChild = Object.values(nextTree[1])[0];
    if (!currentTreeChild || !nextTreeChild) return true;
    return isNavigatingToNewRootLayout(currentTreeChild, nextTreeChild);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=is-navigating-to-new-root-layout.js.map


/***/ }),

/***/ 64217:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.readRecordValue = readRecordValue;
function readRecordValue(thenable) {
    // @ts-expect-error TODO: fix type
    if (thenable.status === "fulfilled") {
        // @ts-expect-error TODO: fix type
        return thenable.value;
    } else {
        throw thenable;
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=read-record-value.js.map


/***/ }),

/***/ 80468:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.fastRefreshReducer = void 0;
var _fetchServerResponse = __webpack_require__(67794);
var _createRecordFromThenable = __webpack_require__(40593);
var _readRecordValue = __webpack_require__(64217);
var _createHrefFromUrl = __webpack_require__(7315);
var _applyRouterStatePatchToTree = __webpack_require__(47953);
var _isNavigatingToNewRootLayout = __webpack_require__(52152);
var _navigateReducer = __webpack_require__(96720);
var _handleMutable = __webpack_require__(94246);
var _applyFlightData = __webpack_require__(36467);
// A version of refresh reducer that keeps the cache around instead of wiping all of it.
function fastRefreshReducerImpl(state, action) {
    const { cache , mutable , origin  } = action;
    const href = state.canonicalUrl;
    const isForCurrentTree = JSON.stringify(mutable.previousTree) === JSON.stringify(state.tree);
    if (isForCurrentTree) {
        return (0, _handleMutable).handleMutable(state, mutable);
    }
    if (!cache.data) {
        // TODO-APP: verify that `href` is not an external url.
        // Fetch data from the root of the tree.
        cache.data = (0, _createRecordFromThenable).createRecordFromThenable((0, _fetchServerResponse).fetchServerResponse(new URL(href, origin), [
            state.tree[0],
            state.tree[1],
            state.tree[2],
            "refetch"
        ], state.nextUrl));
    }
    const [flightData, canonicalUrlOverride] = (0, _readRecordValue).readRecordValue(cache.data);
    // Handle case when navigating to page in `pages` from `app`
    if (typeof flightData === "string") {
        return (0, _navigateReducer).handleExternalUrl(state, mutable, flightData, state.pushRef.pendingPush);
    }
    // Remove cache.data as it has been resolved at this point.
    cache.data = null;
    // TODO-APP: Currently the Flight data can only have one item but in the future it can have multiple paths.
    const flightDataPath = flightData[0];
    // FlightDataPath with more than two items means unexpected Flight data was returned
    if (flightDataPath.length !== 3) {
        // TODO-APP: handle this case better
        console.log("REFRESH FAILED");
        return state;
    }
    // Given the path can only have two items the items are only the router state and subTreeData for the root.
    const [treePatch] = flightDataPath;
    const newTree = (0, _applyRouterStatePatchToTree).applyRouterStatePatchToTree([
        ""
    ], state.tree, treePatch);
    if (newTree === null) {
        throw new Error("SEGMENT MISMATCH");
    }
    if ((0, _isNavigatingToNewRootLayout).isNavigatingToNewRootLayout(state.tree, newTree)) {
        return (0, _navigateReducer).handleExternalUrl(state, mutable, href, state.pushRef.pendingPush);
    }
    const canonicalUrlOverrideHref = canonicalUrlOverride ? (0, _createHrefFromUrl).createHrefFromUrl(canonicalUrlOverride) : undefined;
    if (canonicalUrlOverride) {
        mutable.canonicalUrl = canonicalUrlOverrideHref;
    }
    const applied = (0, _applyFlightData).applyFlightData(state, cache, flightDataPath);
    if (applied) {
        mutable.cache = cache;
    }
    mutable.previousTree = state.tree;
    mutable.patchedTree = newTree;
    mutable.canonicalUrl = href;
    return (0, _handleMutable).handleMutable(state, mutable);
}
function fastRefreshReducerNoop(state, _action) {
    return state;
}
const fastRefreshReducer =  true ? fastRefreshReducerNoop : 0;
exports.fastRefreshReducer = fastRefreshReducer;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=fast-refresh-reducer.js.map


/***/ }),

/***/ 93651:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.findHeadInCache = findHeadInCache;
var _createRouterCacheKey = __webpack_require__(63867);
function findHeadInCache(cache, parallelRoutes) {
    const isLastItem = Object.keys(parallelRoutes).length === 0;
    if (isLastItem) {
        return cache.head;
    }
    for(const key in parallelRoutes){
        const [segment, childParallelRoutes] = parallelRoutes[key];
        const childSegmentMap = cache.parallelRoutes.get(key);
        if (!childSegmentMap) {
            continue;
        }
        const cacheKey = (0, _createRouterCacheKey).createRouterCacheKey(segment);
        const cacheNode = childSegmentMap.get(cacheKey);
        if (!cacheNode) {
            continue;
        }
        const item = findHeadInCache(cacheNode, childParallelRoutes);
        if (item) {
            return item;
        }
    }
    return undefined;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=find-head-in-cache.js.map


/***/ }),

/***/ 56051:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getSegmentValue = getSegmentValue;
function getSegmentValue(segment) {
    return Array.isArray(segment) ? segment[1] : segment;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=get-segment-value.js.map


/***/ }),

/***/ 96720:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.handleExternalUrl = handleExternalUrl;
exports.navigateReducer = navigateReducer;
var _appRouterContext = __webpack_require__(3280);
var _fetchServerResponse = __webpack_require__(67794);
var _createRecordFromThenable = __webpack_require__(40593);
var _readRecordValue = __webpack_require__(64217);
var _createHrefFromUrl = __webpack_require__(7315);
var _invalidateCacheBelowFlightSegmentpath = __webpack_require__(9109);
var _fillCacheWithDataProperty = __webpack_require__(30914);
var _createOptimisticTree = __webpack_require__(12489);
var _applyRouterStatePatchToTree = __webpack_require__(47953);
var _shouldHardNavigate = __webpack_require__(67474);
var _isNavigatingToNewRootLayout = __webpack_require__(52152);
var _handleMutable = __webpack_require__(94246);
var _applyFlightData = __webpack_require__(36467);
function handleExternalUrl(state, mutable, url, pendingPush) {
    mutable.previousTree = state.tree;
    mutable.mpaNavigation = true;
    mutable.canonicalUrl = url;
    mutable.pendingPush = pendingPush;
    mutable.applyFocusAndScroll = false;
    return (0, _handleMutable).handleMutable(state, mutable);
}
function navigateReducer(state, action) {
    const { url , isExternalUrl , navigateType , cache , mutable , forceOptimisticNavigation  } = action;
    const { pathname , hash  } = url;
    const href = (0, _createHrefFromUrl).createHrefFromUrl(url);
    const pendingPush = navigateType === "push";
    const isForCurrentTree = JSON.stringify(mutable.previousTree) === JSON.stringify(state.tree);
    if (isForCurrentTree) {
        return (0, _handleMutable).handleMutable(state, mutable);
    }
    if (isExternalUrl) {
        return handleExternalUrl(state, mutable, url.toString(), pendingPush);
    }
    const prefetchValues = state.prefetchCache.get((0, _createHrefFromUrl).createHrefFromUrl(url, false));
    if (prefetchValues) {
        // The one before last item is the router state tree patch
        const { treeAtTimeOfPrefetch , data  } = prefetchValues;
        // Unwrap cache data with `use` to suspend here (in the reducer) until the fetch resolves.
        const [flightData, canonicalUrlOverride] = (0, _readRecordValue).readRecordValue(data);
        // Handle case when navigating to page in `pages` from `app`
        if (typeof flightData === "string") {
            return handleExternalUrl(state, mutable, flightData, pendingPush);
        }
        // TODO-APP: Currently the Flight data can only have one item but in the future it can have multiple paths.
        const flightDataPath = flightData[0];
        const flightSegmentPath = flightDataPath.slice(0, -3);
        // The one before last item is the router state tree patch
        const [treePatch] = flightDataPath.slice(-3);
        // Create new tree based on the flightSegmentPath and router state patch
        let newTree = (0, _applyRouterStatePatchToTree).applyRouterStatePatchToTree([
            "",
            ...flightSegmentPath
        ], state.tree, treePatch);
        // If the tree patch can't be applied to the current tree then we use the tree at time of prefetch
        // TODO-APP: This should instead fill in the missing pieces in `state.tree` with the data from `treeAtTimeOfPrefetch`, then apply the patch.
        if (newTree === null) {
            newTree = (0, _applyRouterStatePatchToTree).applyRouterStatePatchToTree([
                "",
                ...flightSegmentPath
            ], treeAtTimeOfPrefetch, treePatch);
        }
        if (newTree !== null) {
            if ((0, _isNavigatingToNewRootLayout).isNavigatingToNewRootLayout(state.tree, newTree)) {
                return handleExternalUrl(state, mutable, href, pendingPush);
            }
            const applied = (0, _applyFlightData).applyFlightData(state, cache, flightDataPath, true);
            const hardNavigate = (0, _shouldHardNavigate).shouldHardNavigate([
                "",
                ...flightSegmentPath
            ], state.tree);
            if (hardNavigate) {
                cache.status = _appRouterContext.CacheStates.READY;
                // Copy subTreeData for the root node of the cache.
                cache.subTreeData = state.cache.subTreeData;
                (0, _invalidateCacheBelowFlightSegmentpath).invalidateCacheBelowFlightSegmentPath(cache, state.cache, flightSegmentPath);
                // Ensure the existing cache value is used when the cache was not invalidated.
                mutable.cache = cache;
            } else if (applied) {
                mutable.cache = cache;
            }
            mutable.previousTree = state.tree;
            mutable.patchedTree = newTree;
            mutable.applyFocusAndScroll = true;
            mutable.canonicalUrl = canonicalUrlOverride ? (0, _createHrefFromUrl).createHrefFromUrl(canonicalUrlOverride) : href;
            mutable.pendingPush = pendingPush;
            mutable.hashFragment = hash;
            return (0, _handleMutable).handleMutable(state, mutable);
        }
    }
    // When doing a hard push there can be two cases: with optimistic tree and without
    // The with optimistic tree case only happens when the layouts have a loading state (loading.js)
    // The without optimistic tree case happens when there is no loading state, in that case we suspend in this reducer
    // forceOptimisticNavigation is used for links that have `prefetch={false}`.
    if (forceOptimisticNavigation) {
        const segments = pathname.split("/");
        // TODO-APP: figure out something better for index pages
        segments.push("");
        // Optimistic tree case.
        // If the optimistic tree is deeper than the current state leave that deeper part out of the fetch
        const optimisticTree = (0, _createOptimisticTree).createOptimisticTree(segments, state.tree, false);
        // Copy subTreeData for the root node of the cache.
        cache.status = _appRouterContext.CacheStates.READY;
        cache.subTreeData = state.cache.subTreeData;
        // Copy existing cache nodes as far as possible and fill in `data` property with the started data fetch.
        // The `data` property is used to suspend in layout-router during render if it hasn't resolved yet by the time it renders.
        const res = (0, _fillCacheWithDataProperty).fillCacheWithDataProperty(cache, state.cache, segments.slice(1), ()=>(0, _fetchServerResponse).fetchServerResponse(url, optimisticTree, state.nextUrl));
        // If optimistic fetch couldn't happen it falls back to the non-optimistic case.
        if (!(res == null ? void 0 : res.bailOptimistic)) {
            mutable.previousTree = state.tree;
            mutable.patchedTree = optimisticTree;
            mutable.pendingPush = pendingPush;
            mutable.hashFragment = hash;
            mutable.applyFocusAndScroll = true;
            mutable.cache = cache;
            mutable.canonicalUrl = href;
            return (0, _handleMutable).handleMutable(state, mutable);
        }
    }
    // Below is the not-optimistic case. Data is fetched at the root and suspended there without a suspense boundary.
    // If no in-flight fetch at the top, start it.
    if (!cache.data) {
        cache.data = (0, _createRecordFromThenable).createRecordFromThenable((0, _fetchServerResponse).fetchServerResponse(url, state.tree, state.nextUrl));
    }
    // Unwrap cache data with `use` to suspend here (in the reducer) until the fetch resolves.
    const [flightData, canonicalUrlOverride] = (0, _readRecordValue).readRecordValue(cache.data);
    // Handle case when navigating to page in `pages` from `app`
    if (typeof flightData === "string") {
        return handleExternalUrl(state, mutable, flightData, pendingPush);
    }
    // Remove cache.data as it has been resolved at this point.
    cache.data = null;
    // TODO-APP: Currently the Flight data can only have one item but in the future it can have multiple paths.
    const flightDataPath = flightData[0];
    // The one before last item is the router state tree patch
    const [treePatch] = flightDataPath.slice(-3, -2);
    // Path without the last segment, router state, and the subTreeData
    const flightSegmentPath = flightDataPath.slice(0, -4);
    // Create new tree based on the flightSegmentPath and router state patch
    const newTree = (0, _applyRouterStatePatchToTree).applyRouterStatePatchToTree([
        "",
        ...flightSegmentPath
    ], state.tree, treePatch);
    if (newTree === null) {
        throw new Error("SEGMENT MISMATCH");
    }
    if ((0, _isNavigatingToNewRootLayout).isNavigatingToNewRootLayout(state.tree, newTree)) {
        return handleExternalUrl(state, mutable, href, pendingPush);
    }
    mutable.canonicalUrl = canonicalUrlOverride ? (0, _createHrefFromUrl).createHrefFromUrl(canonicalUrlOverride) : href;
    mutable.previousTree = state.tree;
    mutable.patchedTree = newTree;
    mutable.applyFocusAndScroll = true;
    mutable.pendingPush = pendingPush;
    mutable.hashFragment = hash;
    const applied = (0, _applyFlightData).applyFlightData(state, cache, flightDataPath);
    if (applied) {
        mutable.cache = cache;
    }
    return (0, _handleMutable).handleMutable(state, mutable);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigate-reducer.js.map


/***/ }),

/***/ 72258:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.prefetchReducer = prefetchReducer;
var _createHrefFromUrl = __webpack_require__(7315);
var _fetchServerResponse = __webpack_require__(67794);
var _createRecordFromThenable = __webpack_require__(40593);
function prefetchReducer(state, action) {
    const { url  } = action;
    const href = (0, _createHrefFromUrl).createHrefFromUrl(url, false);
    // If the href was already prefetched it is not necessary to prefetch it again
    if (state.prefetchCache.has(href)) {
        return state;
    }
    // fetchServerResponse is intentionally not awaited so that it can be unwrapped in the navigate-reducer
    const serverResponse = (0, _createRecordFromThenable).createRecordFromThenable((0, _fetchServerResponse).fetchServerResponse(url, state.tree, state.nextUrl, true));
    // Create new tree based on the flightSegmentPath and router state patch
    state.prefetchCache.set(href, {
        // Create new tree based on the flightSegmentPath and router state patch
        treeAtTimeOfPrefetch: state.tree,
        data: serverResponse
    });
    return state;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=prefetch-reducer.js.map


/***/ }),

/***/ 94495:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.refreshReducer = refreshReducer;
var _fetchServerResponse = __webpack_require__(67794);
var _createRecordFromThenable = __webpack_require__(40593);
var _readRecordValue = __webpack_require__(64217);
var _createHrefFromUrl = __webpack_require__(7315);
var _applyRouterStatePatchToTree = __webpack_require__(47953);
var _isNavigatingToNewRootLayout = __webpack_require__(52152);
var _navigateReducer = __webpack_require__(96720);
var _handleMutable = __webpack_require__(94246);
var _appRouterContext = __webpack_require__(3280);
var _fillLazyItemsTillLeafWithHead = __webpack_require__(73146);
function refreshReducer(state, action) {
    const { cache , mutable , origin  } = action;
    const href = state.canonicalUrl;
    const isForCurrentTree = JSON.stringify(mutable.previousTree) === JSON.stringify(state.tree);
    if (isForCurrentTree) {
        return (0, _handleMutable).handleMutable(state, mutable);
    }
    if (!cache.data) {
        // TODO-APP: verify that `href` is not an external url.
        // Fetch data from the root of the tree.
        cache.data = (0, _createRecordFromThenable).createRecordFromThenable((0, _fetchServerResponse).fetchServerResponse(new URL(href, origin), [
            state.tree[0],
            state.tree[1],
            state.tree[2],
            "refetch"
        ], state.nextUrl));
    }
    const [flightData, canonicalUrlOverride] = (0, _readRecordValue).readRecordValue(cache.data);
    // Handle case when navigating to page in `pages` from `app`
    if (typeof flightData === "string") {
        return (0, _navigateReducer).handleExternalUrl(state, mutable, flightData, state.pushRef.pendingPush);
    }
    // Remove cache.data as it has been resolved at this point.
    cache.data = null;
    // TODO-APP: Currently the Flight data can only have one item but in the future it can have multiple paths.
    const flightDataPath = flightData[0];
    // FlightDataPath with more than two items means unexpected Flight data was returned
    if (flightDataPath.length !== 3) {
        // TODO-APP: handle this case better
        console.log("REFRESH FAILED");
        return state;
    }
    // Given the path can only have two items the items are only the router state and subTreeData for the root.
    const [treePatch] = flightDataPath;
    const newTree = (0, _applyRouterStatePatchToTree).applyRouterStatePatchToTree([
        ""
    ], state.tree, treePatch);
    if (newTree === null) {
        throw new Error("SEGMENT MISMATCH");
    }
    if ((0, _isNavigatingToNewRootLayout).isNavigatingToNewRootLayout(state.tree, newTree)) {
        return (0, _navigateReducer).handleExternalUrl(state, mutable, href, state.pushRef.pendingPush);
    }
    const canonicalUrlOverrideHref = canonicalUrlOverride ? (0, _createHrefFromUrl).createHrefFromUrl(canonicalUrlOverride) : undefined;
    if (canonicalUrlOverride) {
        mutable.canonicalUrl = canonicalUrlOverrideHref;
    }
    // The one before last item is the router state tree patch
    const [subTreeData, head] = flightDataPath.slice(-2);
    // Handles case where prefetch only returns the router tree patch without rendered components.
    if (subTreeData !== null) {
        cache.status = _appRouterContext.CacheStates.READY;
        cache.subTreeData = subTreeData;
        (0, _fillLazyItemsTillLeafWithHead).fillLazyItemsTillLeafWithHead(cache, undefined, treePatch, head);
        mutable.cache = cache;
        mutable.prefetchCache = new Map();
    }
    mutable.previousTree = state.tree;
    mutable.patchedTree = newTree;
    mutable.canonicalUrl = href;
    return (0, _handleMutable).handleMutable(state, mutable);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=refresh-reducer.js.map


/***/ }),

/***/ 7853:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.restoreReducer = restoreReducer;
var _createHrefFromUrl = __webpack_require__(7315);
function restoreReducer(state, action) {
    const { url , tree  } = action;
    const href = (0, _createHrefFromUrl).createHrefFromUrl(url);
    return {
        // Set canonical url
        canonicalUrl: href,
        pushRef: state.pushRef,
        focusAndScrollRef: state.focusAndScrollRef,
        cache: state.cache,
        prefetchCache: state.prefetchCache,
        // Restore provided tree
        tree: tree,
        nextUrl: url.pathname
    };
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=restore-reducer.js.map


/***/ }),

/***/ 85159:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.serverPatchReducer = serverPatchReducer;
var _createHrefFromUrl = __webpack_require__(7315);
var _applyRouterStatePatchToTree = __webpack_require__(47953);
var _isNavigatingToNewRootLayout = __webpack_require__(52152);
var _navigateReducer = __webpack_require__(96720);
var _applyFlightData = __webpack_require__(36467);
var _handleMutable = __webpack_require__(94246);
function serverPatchReducer(state, action) {
    const { flightData , previousTree , overrideCanonicalUrl , cache , mutable  } = action;
    const isForCurrentTree = JSON.stringify(previousTree) === JSON.stringify(state.tree);
    // When a fetch is slow to resolve it could be that you navigated away while the request was happening or before the reducer runs.
    // In that case opt-out of applying the patch given that the data could be stale.
    if (!isForCurrentTree) {
        // TODO-APP: Handle tree mismatch
        console.log("TREE MISMATCH");
        // Keep everything as-is.
        return state;
    }
    if (mutable.previousTree) {
        return (0, _handleMutable).handleMutable(state, mutable);
    }
    // Handle case when navigating to page in `pages` from `app`
    if (typeof flightData === "string") {
        return (0, _navigateReducer).handleExternalUrl(state, mutable, flightData, state.pushRef.pendingPush);
    }
    // TODO-APP: Currently the Flight data can only have one item but in the future it can have multiple paths.
    const flightDataPath = flightData[0];
    // Slices off the last segment (which is at -4) as it doesn't exist in the tree yet
    const flightSegmentPath = flightDataPath.slice(0, -4);
    const [treePatch] = flightDataPath.slice(-3, -2);
    const newTree = (0, _applyRouterStatePatchToTree).applyRouterStatePatchToTree([
        "",
        ...flightSegmentPath
    ], state.tree, treePatch);
    if (newTree === null) {
        throw new Error("SEGMENT MISMATCH");
    }
    if ((0, _isNavigatingToNewRootLayout).isNavigatingToNewRootLayout(state.tree, newTree)) {
        return (0, _navigateReducer).handleExternalUrl(state, mutable, state.canonicalUrl, state.pushRef.pendingPush);
    }
    const canonicalUrlOverrideHref = overrideCanonicalUrl ? (0, _createHrefFromUrl).createHrefFromUrl(overrideCanonicalUrl) : undefined;
    if (canonicalUrlOverrideHref) {
        mutable.canonicalUrl = canonicalUrlOverrideHref;
    }
    (0, _applyFlightData).applyFlightData(state, cache, flightDataPath);
    mutable.previousTree = state.tree;
    mutable.patchedTree = newTree;
    mutable.cache = cache;
    return (0, _handleMutable).handleMutable(state, mutable);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=server-patch-reducer.js.map


/***/ }),

/***/ 59465:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.ACTION_FAST_REFRESH = exports.ACTION_PREFETCH = exports.ACTION_SERVER_PATCH = exports.ACTION_RESTORE = exports.ACTION_NAVIGATE = exports.ACTION_REFRESH = void 0;
const ACTION_REFRESH = "refresh";
exports.ACTION_REFRESH = ACTION_REFRESH;
const ACTION_NAVIGATE = "navigate";
exports.ACTION_NAVIGATE = ACTION_NAVIGATE;
const ACTION_RESTORE = "restore";
exports.ACTION_RESTORE = ACTION_RESTORE;
const ACTION_SERVER_PATCH = "server-patch";
exports.ACTION_SERVER_PATCH = ACTION_SERVER_PATCH;
const ACTION_PREFETCH = "prefetch";
exports.ACTION_PREFETCH = ACTION_PREFETCH;
const ACTION_FAST_REFRESH = "fast-refresh";
exports.ACTION_FAST_REFRESH = ACTION_FAST_REFRESH;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=router-reducer-types.js.map


/***/ }),

/***/ 54145:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.reducer = void 0;
var _routerReducerTypes = __webpack_require__(59465);
var _navigateReducer = __webpack_require__(96720);
var _serverPatchReducer = __webpack_require__(85159);
var _restoreReducer = __webpack_require__(7853);
var _refreshReducer = __webpack_require__(94495);
var _prefetchReducer = __webpack_require__(72258);
var _fastRefreshReducer = __webpack_require__(80468);
/**
 * Reducer that handles the app-router state updates.
 */ function clientReducer(state, action) {
    switch(action.type){
        case _routerReducerTypes.ACTION_NAVIGATE:
            {
                return (0, _navigateReducer).navigateReducer(state, action);
            }
        case _routerReducerTypes.ACTION_SERVER_PATCH:
            {
                return (0, _serverPatchReducer).serverPatchReducer(state, action);
            }
        case _routerReducerTypes.ACTION_RESTORE:
            {
                return (0, _restoreReducer).restoreReducer(state, action);
            }
        case _routerReducerTypes.ACTION_REFRESH:
            {
                return (0, _refreshReducer).refreshReducer(state, action);
            }
        case _routerReducerTypes.ACTION_FAST_REFRESH:
            {
                return (0, _fastRefreshReducer).fastRefreshReducer(state, action);
            }
        case _routerReducerTypes.ACTION_PREFETCH:
            {
                return (0, _prefetchReducer).prefetchReducer(state, action);
            }
        // This case should never be hit as dispatch is strongly typed.
        default:
            throw new Error("Unknown action");
    }
}
function serverReducer(state, _action) {
    return state;
}
const reducer =  true ? serverReducer : 0;
exports.reducer = reducer;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=router-reducer.js.map


/***/ }),

/***/ 67474:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.shouldHardNavigate = shouldHardNavigate;
var _matchSegments = __webpack_require__(75309);
function shouldHardNavigate(flightSegmentPath, flightRouterState) {
    const [segment, parallelRoutes] = flightRouterState;
    // TODO-APP: Check if `as` can be replaced.
    const [currentSegment, parallelRouteKey] = flightSegmentPath;
    // Check if current segment matches the existing segment.
    if (!(0, _matchSegments).matchSegment(currentSegment, segment)) {
        // If dynamic parameter in tree doesn't match up with segment path a hard navigation is triggered.
        if (Array.isArray(currentSegment)) {
            return true;
        }
        // If the existing segment did not match soft navigation is triggered.
        return false;
    }
    const lastSegment = flightSegmentPath.length <= 2;
    if (lastSegment) {
        return false;
    }
    return shouldHardNavigate(flightSegmentPath.slice(2), parallelRoutes[parallelRouteKey]);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=should-hard-navigate.js.map


/***/ }),

/***/ 60347:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.createSearchParamsBailoutProxy = createSearchParamsBailoutProxy;
var _staticGenerationBailout = __webpack_require__(71);
function createSearchParamsBailoutProxy() {
    return new Proxy({}, {
        get (_target, prop) {
            // React adds some properties on the object when serializing for client components
            if (typeof prop === "string") {
                (0, _staticGenerationBailout).staticGenerationBailout(`searchParams.${prop}`);
            }
        }
    });
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=searchparams-bailout-proxy.js.map


/***/ }),

/***/ 71:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.staticGenerationBailout = void 0;
var _hooksServerContext = __webpack_require__(79218);
var _staticGenerationAsyncStorage = __webpack_require__(1839);
class StaticGenBailoutError extends Error {
    constructor(...args){
        super(...args);
        this.code = "NEXT_STATIC_GEN_BAILOUT";
    }
}
const staticGenerationBailout = (reason, opts)=>{
    const staticGenerationStore = _staticGenerationAsyncStorage.staticGenerationAsyncStorage.getStore();
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.forceStatic) {
        return true;
    }
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.dynamicShouldError) {
        const { dynamic ="error" , link  } = opts || {};
        const suffix = link ? ` See more info here: ${link}` : "";
        throw new StaticGenBailoutError(`Page with \`dynamic = "${dynamic}"\` couldn't be rendered statically because it used \`${reason}\`.${suffix}`);
    }
    if (staticGenerationStore) {
        staticGenerationStore.revalidate = 0;
    }
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.isStaticGeneration) {
        const err = new _hooksServerContext.DynamicServerError(reason);
        staticGenerationStore.dynamicUsageDescription = reason;
        staticGenerationStore.dynamicUsageStack = err.stack;
        throw err;
    }
    return false;
};
exports.staticGenerationBailout = staticGenerationBailout;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=static-generation-bailout.js.map


/***/ }),

/***/ 31390:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = StaticGenerationSearchParamsBailoutProvider;
var _interop_require_default = (__webpack_require__(46356)/* ["default"] */ .Z);
var _react = _interop_require_default(__webpack_require__(18038));
var _searchparamsBailoutProxy = __webpack_require__(60347);
function StaticGenerationSearchParamsBailoutProvider({ Component , propsForComponent  }) {
    const searchParams = (0, _searchparamsBailoutProxy).createSearchParamsBailoutProxy();
    return /*#__PURE__*/ _react.default.createElement(Component, Object.assign({
        searchParams: searchParams
    }, propsForComponent));
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=static-generation-searchparams-bailout-provider.js.map


/***/ }),

/***/ 19013:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.useReducerWithReduxDevtools = void 0;
var _react = __webpack_require__(18038);
function normalizeRouterState(val) {
    if (val instanceof Map) {
        const obj = {};
        for (const [key, value] of val.entries()){
            if (typeof value === "function") {
                obj[key] = "fn()";
                continue;
            }
            if (typeof value === "object" && value !== null) {
                if (value.$$typeof) {
                    obj[key] = value.$$typeof.toString();
                    continue;
                }
                if (value._bundlerConfig) {
                    obj[key] = "FlightData";
                    continue;
                }
            }
            obj[key] = normalizeRouterState(value);
        }
        return obj;
    }
    if (typeof val === "object" && val !== null) {
        const obj = {};
        for(const key in val){
            const value = val[key];
            if (typeof value === "function") {
                obj[key] = "fn()";
                continue;
            }
            if (typeof value === "object" && value !== null) {
                if (value.$$typeof) {
                    obj[key] = value.$$typeof.toString();
                    continue;
                }
                if (value.hasOwnProperty("_bundlerConfig")) {
                    obj[key] = "FlightData";
                    continue;
                }
            }
            obj[key] = normalizeRouterState(value);
        }
        return obj;
    }
    if (Array.isArray(val)) {
        return val.map(normalizeRouterState);
    }
    return val;
}
function devToolReducer(fn, ref) {
    return (state, action)=>{
        const res = fn(state, action);
        if (ref.current) {
            ref.current.send(action, normalizeRouterState(res));
        }
        return res;
    };
}
function useReducerWithReduxDevtoolsNoop(fn, initialState) {
    const [state, dispatch] = (0, _react).useReducer(fn, initialState);
    return [
        state,
        dispatch,
        ()=>{}
    ];
}
function useReducerWithReduxDevtoolsImpl(fn, initialState) {
    const devtoolsConnectionRef = (0, _react).useRef();
    const enabledRef = (0, _react).useRef();
    (0, _react).useEffect(()=>{
        if (devtoolsConnectionRef.current || enabledRef.current === false) {
            return;
        }
        if (enabledRef.current === undefined && typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "undefined") {
            enabledRef.current = false;
            return;
        }
        devtoolsConnectionRef.current = window.__REDUX_DEVTOOLS_EXTENSION__.connect({
            instanceId: 8000,
            name: "next-router"
        });
        if (devtoolsConnectionRef.current) {
            devtoolsConnectionRef.current.init(normalizeRouterState(initialState));
        }
        return ()=>{
            devtoolsConnectionRef.current = undefined;
        };
    }, [
        initialState
    ]);
    const [state, dispatch] = (0, _react).useReducer(devToolReducer(/* logReducer( */ fn /*)*/ , devtoolsConnectionRef), initialState);
    const sync = (0, _react).useCallback(()=>{
        if (devtoolsConnectionRef.current) {
            devtoolsConnectionRef.current.send({
                type: "RENDER_SYNC"
            }, normalizeRouterState(state));
        }
    }, [
        state
    ]);
    return [
        state,
        dispatch,
        sync
    ];
}
const useReducerWithReduxDevtools =  false ? 0 : useReducerWithReduxDevtoolsNoop;
exports.useReducerWithReduxDevtools = useReducerWithReduxDevtools;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-reducer-with-devtools.js.map


/***/ }),

/***/ 35156:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.normalizePathTrailingSlash = void 0;
var _removeTrailingSlash = __webpack_require__(93297);
var _parsePath = __webpack_require__(28854);
const normalizePathTrailingSlash = (path)=>{
    if (!path.startsWith("/") || undefined) {
        return path;
    }
    const { pathname , query , hash  } = (0, _parsePath).parsePath(path);
    if (false) {}
    return `${(0, _removeTrailingSlash).removeTrailingSlash(pathname)}${query}${hash}`;
};
exports.normalizePathTrailingSlash = normalizePathTrailingSlash;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=normalize-trailing-slash.js.map


/***/ }),

/***/ 30201:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.suspense = suspense;
exports.NoSSR = NoSSR;
var _interop_require_default = (__webpack_require__(46356)/* ["default"] */ .Z);
var _react = _interop_require_default(__webpack_require__(18038));
var _noSsrError = __webpack_require__(60574);
function suspense() {
    const error = new Error(_noSsrError.NEXT_DYNAMIC_NO_SSR_CODE);
    error.digest = _noSsrError.NEXT_DYNAMIC_NO_SSR_CODE;
    throw error;
}
function NoSSR({ children  }) {
    if (true) {
        suspense();
    }
    return children;
} //# sourceMappingURL=dynamic-no-ssr.js.map


/***/ }),

/***/ 60574:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.NEXT_DYNAMIC_NO_SSR_CODE = void 0;
const NEXT_DYNAMIC_NO_SSR_CODE = "DYNAMIC_SERVER_USAGE";
exports.NEXT_DYNAMIC_NO_SSR_CODE = NEXT_DYNAMIC_NO_SSR_CODE; //# sourceMappingURL=no-ssr-error.js.map


/***/ }),

/***/ 85940:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "Z", ({
    enumerable: true,
    get: function() {
        return _extends;
    }
}));
function extends_() {
    extends_ = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return extends_.apply(this, arguments);
}
function _extends() {
    return extends_.apply(this, arguments);
}


/***/ }),

/***/ 35985:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.createProxy = createProxy;
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ // Modified from https://github.com/facebook/react/blob/main/packages/react-server-dom-webpack/src/ReactFlightWebpackNodeRegister.js
const CLIENT_REFERENCE = Symbol.for("react.client.reference");
const PROMISE_PROTOTYPE = Promise.prototype;
const deepProxyHandlers = {
    get: function(target, name, _receiver) {
        switch(name){
            // These names are read by the Flight runtime if you end up using the exports object.
            case "$$typeof":
                // These names are a little too common. We should probably have a way to
                // have the Flight runtime extract the inner target instead.
                return target.$$typeof;
            case "$$id":
                return target.$$id;
            case "$$async":
                return target.$$async;
            case "name":
                return target.name;
            case "displayName":
                return undefined;
            // We need to special case this because createElement reads it if we pass this
            // reference.
            case "defaultProps":
                return undefined;
            // Avoid this attempting to be serialized.
            case "toJSON":
                return undefined;
            case Symbol.toPrimitive.toString():
                // @ts-ignore
                return Object.prototype[Symbol.toPrimitive];
            case "Provider":
                throw new Error(`Cannot render a Client Context Provider on the Server. ` + `Instead, you can export a Client Component wrapper ` + `that itself renders a Client Context Provider.`);
            default:
                break;
        }
        const expression = String(target.name) + "." + String(name);
        throw new Error(`Cannot access ${expression} on the server. ` + "You cannot dot into a client module from a server component. " + "You can only pass the imported name through.");
    },
    set: function() {
        throw new Error("Cannot assign to a client module from a server module.");
    }
};
const proxyHandlers = {
    get: function(target, name, _receiver) {
        switch(name){
            // These names are read by the Flight runtime if you end up using the exports object.
            case "$$typeof":
                return target.$$typeof;
            case "$$id":
                return target.$$id;
            case "$$async":
                return target.$$async;
            case "name":
                return target.name;
            // We need to special case this because createElement reads it if we pass this
            // reference.
            case "defaultProps":
                return undefined;
            // Avoid this attempting to be serialized.
            case "toJSON":
                return undefined;
            case Symbol.toPrimitive.toString():
                // @ts-ignore
                return Object.prototype[Symbol.toPrimitive];
            case "__esModule":
                // Something is conditionally checking which export to use. We'll pretend to be
                // an ESM compat module but then we'll check again on the client.
                const moduleId = target.$$id;
                target.default = Object.defineProperties(function() {
                    throw new Error(`Attempted to call the default export of ${moduleId} from the server ` + `but it's on the client. It's not possible to invoke a client function from ` + `the server, it can only be rendered as a Component or passed to props of a ` + `Client Component.`);
                }, {
                    $$typeof: {
                        value: CLIENT_REFERENCE
                    },
                    // This a placeholder value that tells the client to conditionally use the
                    // whole object or just the default export.
                    $$id: {
                        value: target.$$id + "#"
                    },
                    $$async: {
                        value: target.$$async
                    }
                });
                return true;
            case "then":
                if (target.then) {
                    // Use a cached value
                    return target.then;
                }
                if (!target.$$async) {
                    // If this module is expected to return a Promise (such as an AsyncModule) then
                    // we should resolve that with a client reference that unwraps the Promise on
                    // the client.
                    const clientReference = Object.defineProperties({}, {
                        $$typeof: {
                            value: CLIENT_REFERENCE
                        },
                        $$id: {
                            value: target.$$id
                        },
                        $$async: {
                            value: true
                        }
                    });
                    const proxy = new Proxy(clientReference, proxyHandlers);
                    // Treat this as a resolved Promise for React's use()
                    target.status = "fulfilled";
                    target.value = proxy;
                    const then = target.then = Object.defineProperties(function then(resolve, _reject) {
                        // Expose to React.
                        return Promise.resolve(resolve(proxy));
                    }, // export then we should treat it as a reference to that name.
                    {
                        $$typeof: {
                            value: CLIENT_REFERENCE
                        },
                        $$id: {
                            value: target.$$id
                        },
                        $$async: {
                            value: false
                        }
                    });
                    return then;
                } else {
                    // Since typeof .then === 'function' is a feature test we'd continue recursing
                    // indefinitely if we return a function. Instead, we return an object reference
                    // if we check further.
                    return undefined;
                }
            default:
                break;
        }
        let cachedReference = target[name];
        if (!cachedReference) {
            const reference = Object.defineProperties(function() {
                throw new Error(`Attempted to call ${String(name)}() from the server but ${String(name)} is on the client. ` + `It's not possible to invoke a client function from the server, it can ` + `only be rendered as a Component or passed to props of a Client Component.`);
            }, {
                $$typeof: {
                    value: CLIENT_REFERENCE
                },
                $$id: {
                    value: target.$$id + "#" + name
                },
                $$async: {
                    value: target.$$async
                }
            });
            cachedReference = target[name] = new Proxy(reference, deepProxyHandlers);
        }
        return cachedReference;
    },
    getPrototypeOf (_target) {
        // Pretend to be a Promise in case anyone asks.
        return PROMISE_PROTOTYPE;
    },
    set: function() {
        throw new Error("Cannot assign to a client module from a server module.");
    }
};
function createProxy(moduleId) {
    const clientReference = Object.defineProperties({}, {
        $$typeof: {
            value: CLIENT_REFERENCE
        },
        // Represents the whole Module object instead of a particular import.
        $$id: {
            value: moduleId
        },
        $$async: {
            value: false
        }
    });
    return new Proxy(clientReference, proxyHandlers);
} //# sourceMappingURL=module-proxy.js.map


/***/ }),

/***/ 18829:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy  } = __webpack_require__(35985);
module.exports = createProxy("/Users/anishbista/chatbot-app/chat/node_modules/next/dist/client/components/app-router.js");
 //# sourceMappingURL=app-router.js.map


/***/ }),

/***/ 28412:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy  } = __webpack_require__(35985);
module.exports = createProxy("/Users/anishbista/chatbot-app/chat/node_modules/next/dist/client/components/error-boundary.js");
 //# sourceMappingURL=error-boundary.js.map


/***/ }),

/***/ 45226:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy  } = __webpack_require__(35985);
module.exports = createProxy("/Users/anishbista/chatbot-app/chat/node_modules/next/dist/client/components/layout-router.js");
 //# sourceMappingURL=layout-router.js.map


/***/ }),

/***/ 42872:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy  } = __webpack_require__(35985);
module.exports = createProxy("/Users/anishbista/chatbot-app/chat/node_modules/next/dist/client/components/render-from-template-context.js");
 //# sourceMappingURL=render-from-template-context.js.map


/***/ }),

/***/ 75183:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.createSearchParamsBailoutProxy = createSearchParamsBailoutProxy;
var _staticGenerationBailout = __webpack_require__(79282);
function createSearchParamsBailoutProxy() {
    return new Proxy({}, {
        get (_target, prop) {
            // React adds some properties on the object when serializing for client components
            if (typeof prop === "string") {
                (0, _staticGenerationBailout).staticGenerationBailout(`searchParams.${prop}`);
            }
        }
    });
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=searchparams-bailout-proxy.js.map


/***/ }),

/***/ 23785:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy  } = __webpack_require__(35985);
module.exports = createProxy("/Users/anishbista/chatbot-app/chat/node_modules/next/dist/client/components/static-generation-searchparams-bailout-provider.js");
 //# sourceMappingURL=static-generation-searchparams-bailout-provider.js.map


/***/ }),

/***/ 31336:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * react-server-dom-webpack-server.edge.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 
var aa = __webpack_require__(34212), f = "function" === typeof AsyncLocalStorage, ba = f ? new AsyncLocalStorage : null, m = null, n = 0;
function p(a, b) {
    if (0 !== b.length) if (512 < b.length) 0 < n && (a.enqueue(new Uint8Array(m.buffer, 0, n)), m = new Uint8Array(512), n = 0), a.enqueue(b);
    else {
        var d = m.length - n;
        d < b.length && (0 === d ? a.enqueue(m) : (m.set(b.subarray(0, d), n), a.enqueue(m), b = b.subarray(d)), m = new Uint8Array(512), n = 0);
        m.set(b, n);
        n += b.length;
    }
    return !0;
}
var q = new TextEncoder;
function r(a) {
    return q.encode(a);
}
function ca(a, b) {
    "function" === typeof a.error ? a.error(b) : a.close();
}
var t = JSON.stringify;
function da(a, b, d) {
    a = t(d, a.toJSON);
    b = b.toString(16) + ":" + a + "\n";
    return q.encode(b);
}
function u(a, b, d) {
    a = t(d);
    b = b.toString(16) + ":" + a + "\n";
    return q.encode(b);
}
var w = Symbol.for("react.client.reference"), ea = Symbol.for("react.server.reference"), x = Symbol.for("react.element"), fa = Symbol.for("react.fragment"), ha = Symbol.for("react.provider"), ia = Symbol.for("react.server_context"), ja = Symbol.for("react.forward_ref"), ka = Symbol.for("react.suspense"), la = Symbol.for("react.suspense_list"), ma = Symbol.for("react.memo"), z = Symbol.for("react.lazy"), na = Symbol.for("react.default_value"), qa = Symbol.for("react.memo_cache_sentinel"), ra = Symbol.iterator;
function A(a, b, d, c, e, g, h) {
    this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
    this.attributeName = c;
    this.attributeNamespace = e;
    this.mustUseProperty = d;
    this.propertyName = a;
    this.type = b;
    this.sanitizeURL = g;
    this.removeEmptyString = h;
}
[
    "contentEditable",
    "draggable",
    "spellCheck",
    "value"
].forEach(function(a) {
    new A(a, 2, !1, a.toLowerCase(), null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
    new A(a, 3, !1, a.toLowerCase(), null, !1, !1);
});
[
    "rowSpan",
    "start"
].forEach(function(a) {
    new A(a, 5, !1, a.toLowerCase(), null, !1, !1);
});
var B = /[\-:]([a-z])/g;
function C(a) {
    return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering transform-origin underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
    a.replace(B, C);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
    a.replace(B, C);
});
[
    "xml:base",
    "xml:lang",
    "xml:space"
].forEach(function(a) {
    a.replace(B, C);
});
[
    "tabIndex",
    "crossOrigin"
].forEach(function(a) {
    new A(a, 1, !1, a.toLowerCase(), null, !1, !1);
});
[
    "src",
    "href",
    "action"
].forEach(function(a) {
    new A(a, 1, !1, a.toLowerCase(), null, !0, !0);
});
var sa = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    scale: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
}, ta = [
    "Webkit",
    "ms",
    "Moz",
    "O"
];
Object.keys(sa).forEach(function(a) {
    ta.forEach(function(b) {
        b = b + a.charAt(0).toUpperCase() + a.substring(1);
        sa[b] = sa[a];
    });
});
var ua = Array.isArray;
r('"></template>');
r("<script>");
r("</script>");
r('<script src="');
r('<script type="module" src="');
r('" integrity="');
r('" async=""></script>');
r("<!-- -->");
r(' style="');
r(":");
r(";");
r(" ");
r('="');
r('"');
r('=""');
r(">");
r("/>");
r(' selected=""');
r("\n");
r("<!DOCTYPE html>");
r("</");
r(">");
r('<template id="');
r('"></template>');
r("<!--$-->");
r('<!--$?--><template id="');
r('"></template>');
r("<!--$!-->");
r("<!--/$-->");
r("<template");
r('"');
r(' data-dgst="');
r(' data-msg="');
r(' data-stck="');
r("></template>");
r('<div hidden id="');
r('">');
r("</div>");
r('<svg aria-hidden="true" style="display:none" id="');
r('">');
r("</svg>");
r('<math aria-hidden="true" style="display:none" id="');
r('">');
r("</math>");
r('<table hidden id="');
r('">');
r("</table>");
r('<table hidden><tbody id="');
r('">');
r("</tbody></table>");
r('<table hidden><tr id="');
r('">');
r("</tr></table>");
r('<table hidden><colgroup id="');
r('">');
r("</colgroup></table>");
r('$RS=function(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};;$RS("');
r('$RS("');
r('","');
r('")</script>');
r('<template data-rsi="" data-sid="');
r('" data-pid="');
r('$RC=function(b,c,e){c=document.getElementById(c);c.parentNode.removeChild(c);var a=document.getElementById(b);if(a){b=a.previousSibling;if(e)b.data="$!",a.setAttribute("data-dgst",e);else{e=b.parentNode;a=b.nextSibling;var f=0;do{if(a&&8===a.nodeType){var d=a.data;if("/$"===d)if(0===f)break;else f--;else"$"!==d&&"$?"!==d&&"$!"!==d||f++}d=a.nextSibling;e.removeChild(a);a=d}while(a);for(;c.firstChild;)e.insertBefore(c.firstChild,a);b.data="$"}b._reactRetry&&b._reactRetry()}};$RC("');
r('$RC("');
r('$RC=function(b,c,e){c=document.getElementById(c);c.parentNode.removeChild(c);var a=document.getElementById(b);if(a){b=a.previousSibling;if(e)b.data="$!",a.setAttribute("data-dgst",e);else{e=b.parentNode;a=b.nextSibling;var f=0;do{if(a&&8===a.nodeType){var d=a.data;if("/$"===d)if(0===f)break;else f--;else"$"!==d&&"$?"!==d&&"$!"!==d||f++}d=a.nextSibling;e.removeChild(a);a=d}while(a);for(;c.firstChild;)e.insertBefore(c.firstChild,a);b.data="$"}b._reactRetry&&b._reactRetry()}};$RM=new Map;\n$RR=function(r,t,w){for(var u=$RC,n=$RM,p=new Map,q=document,g,b,h=q.querySelectorAll("link[data-precedence],style[data-precedence]"),v=[],k=0;b=h[k++];)"not all"===b.getAttribute("media")?v.push(b):("LINK"===b.tagName&&n.set(b.getAttribute("href"),b),p.set(b.dataset.precedence,g=b));b=0;h=[];var l,a;for(k=!0;;){if(k){var f=w[b++];if(!f){k=!1;b=0;continue}var c=!1,m=0;var d=f[m++];if(a=n.get(d)){var e=a._p;c=!0}else{a=q.createElement("link");a.href=d;a.rel="stylesheet";for(a.dataset.precedence=\nl=f[m++];e=f[m++];)a.setAttribute(e,f[m++]);e=a._p=new Promise(function(x,y){a.onload=x;a.onerror=y});n.set(d,a)}d=a.getAttribute("media");!e||"l"===e.s||d&&!matchMedia(d).matches||h.push(e);if(c)continue}else{a=v[b++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=p.get(l)||g;c===g&&(g=a);p.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=q.head,c.insertBefore(a,c.firstChild))}Promise.all(h).then(u.bind(null,r,t,""),u.bind(null,r,t,"Resource failed to load"))};$RR("');
r('$RM=new Map;\n$RR=function(r,t,w){for(var u=$RC,n=$RM,p=new Map,q=document,g,b,h=q.querySelectorAll("link[data-precedence],style[data-precedence]"),v=[],k=0;b=h[k++];)"not all"===b.getAttribute("media")?v.push(b):("LINK"===b.tagName&&n.set(b.getAttribute("href"),b),p.set(b.dataset.precedence,g=b));b=0;h=[];var l,a;for(k=!0;;){if(k){var f=w[b++];if(!f){k=!1;b=0;continue}var c=!1,m=0;var d=f[m++];if(a=n.get(d)){var e=a._p;c=!0}else{a=q.createElement("link");a.href=d;a.rel="stylesheet";for(a.dataset.precedence=\nl=f[m++];e=f[m++];)a.setAttribute(e,f[m++]);e=a._p=new Promise(function(x,y){a.onload=x;a.onerror=y});n.set(d,a)}d=a.getAttribute("media");!e||"l"===e.s||d&&!matchMedia(d).matches||h.push(e);if(c)continue}else{a=v[b++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=p.get(l)||g;c===g&&(g=a);p.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=q.head,c.insertBefore(a,c.firstChild))}Promise.all(h).then(u.bind(null,r,t,""),u.bind(null,r,t,"Resource failed to load"))};$RR("');
r('$RR("');
r('","');
r('",');
r('"');
r(")</script>");
r('<template data-rci="" data-bid="');
r('<template data-rri="" data-bid="');
r('" data-sid="');
r('" data-sty="');
r('$RX=function(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};;$RX("');
r('$RX("');
r('"');
r(",");
r(")</script>");
r('<template data-rxi="" data-bid="');
r('" data-dgst="');
r('" data-msg="');
r('" data-stck="');
r('<style media="not all" data-precedence="');
r('" data-href="');
r('">');
r("</style>");
r('<style data-precedence="');
r('" data-href="');
r(" ");
r('">');
r("</style>");
r("[");
r(",[");
r(",");
r("]");
var D = null;
function E(a, b) {
    if (a !== b) {
        a.context._currentValue = a.parentValue;
        a = a.parent;
        var d = b.parent;
        if (null === a) {
            if (null !== d) throw Error("The stacks must reach the root at the same time. This is a bug in React.");
        } else {
            if (null === d) throw Error("The stacks must reach the root at the same time. This is a bug in React.");
            E(a, d);
            b.context._currentValue = b.value;
        }
    }
}
function va(a) {
    a.context._currentValue = a.parentValue;
    a = a.parent;
    null !== a && va(a);
}
function wa(a) {
    var b = a.parent;
    null !== b && wa(b);
    a.context._currentValue = a.value;
}
function xa(a, b) {
    a.context._currentValue = a.parentValue;
    a = a.parent;
    if (null === a) throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
    a.depth === b.depth ? E(a, b) : xa(a, b);
}
function ya(a, b) {
    var d = b.parent;
    if (null === d) throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
    a.depth === d.depth ? E(a, d) : ya(a, d);
    b.context._currentValue = b.value;
}
function za(a) {
    var b = D;
    b !== a && (null === b ? wa(a) : null === a ? va(b) : b.depth === a.depth ? E(b, a) : b.depth > a.depth ? xa(b, a) : ya(b, a), D = a);
}
function Aa(a, b) {
    var d = a._currentValue;
    a._currentValue = b;
    var c = D;
    return D = a = {
        parent: c,
        depth: null === c ? 0 : c.depth + 1,
        context: a,
        parentValue: d,
        value: b
    };
}
var Ba = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`");
function Ca() {}
function Da(a, b, d) {
    d = a[d];
    void 0 === d ? a.push(b) : d !== b && (b.then(Ca, Ca), b = d);
    switch(b.status){
        case "fulfilled":
            return b.value;
        case "rejected":
            throw b.reason;
        default:
            if ("string" !== typeof b.status) switch(a = b, a.status = "pending", a.then(function(c) {
                if ("pending" === b.status) {
                    var e = b;
                    e.status = "fulfilled";
                    e.value = c;
                }
            }, function(c) {
                if ("pending" === b.status) {
                    var e = b;
                    e.status = "rejected";
                    e.reason = c;
                }
            }), b.status){
                case "fulfilled":
                    return b.value;
                case "rejected":
                    throw b.reason;
            }
            F = b;
            throw Ba;
    }
}
var F = null;
function Ea() {
    if (null === F) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
    var a = F;
    F = null;
    return a;
}
var H = null, I = 0, J = null;
function Fa() {
    var a = J;
    J = null;
    return a;
}
function Ga(a) {
    return a._currentValue;
}
var Ka = {
    useMemo: function(a) {
        return a();
    },
    useCallback: function(a) {
        return a;
    },
    useDebugValue: function() {},
    useDeferredValue: K,
    useTransition: K,
    readContext: Ga,
    useContext: Ga,
    useReducer: K,
    useRef: K,
    useState: K,
    useInsertionEffect: K,
    useLayoutEffect: K,
    useImperativeHandle: K,
    useEffect: K,
    useId: Ha,
    useMutableSource: K,
    useSyncExternalStore: K,
    useCacheRefresh: function() {
        return Ia;
    },
    useMemoCache: function(a) {
        for(var b = Array(a), d = 0; d < a; d++)b[d] = qa;
        return b;
    },
    use: Ja
};
function K() {
    throw Error("This Hook is not supported in Server Components.");
}
function Ia() {
    throw Error("Refreshing the cache is not supported in Server Components.");
}
function Ha() {
    if (null === H) throw Error("useId can only be used while React is rendering");
    var a = H.identifierCount++;
    return ":" + H.identifierPrefix + "S" + a.toString(32) + ":";
}
function Ja(a) {
    if (null !== a && "object" === typeof a || "function" === typeof a) {
        if ("function" === typeof a.then) {
            var b = I;
            I += 1;
            null === J && (J = []);
            return Da(J, a, b);
        }
        if (a.$$typeof === ia) return a._currentValue;
    }
    throw Error("An unsupported type was passed to use(): " + String(a));
}
function La() {
    return (new AbortController).signal;
}
function Ma() {
    if (L) return L;
    if (f) {
        var a = ba.getStore();
        if (a) return a;
    }
    return new Map;
}
var Na = {
    getCacheSignal: function() {
        var a = Ma(), b = a.get(La);
        void 0 === b && (b = La(), a.set(La, b));
        return b;
    },
    getCacheForType: function(a) {
        var b = Ma(), d = b.get(a);
        void 0 === d && (d = a(), b.set(a, d));
        return d;
    }
}, L = null;
function Oa(a) {
    return Object.prototype.toString.call(a).replace(/^\[object (.*)\]$/, function(b, d) {
        return d;
    });
}
function Pa(a) {
    switch(typeof a){
        case "string":
            return JSON.stringify(10 >= a.length ? a : a.substr(0, 10) + "...");
        case "object":
            if (ua(a)) return "[...]";
            a = Oa(a);
            return "Object" === a ? "{...}" : a;
        case "function":
            return "function";
        default:
            return String(a);
    }
}
function M(a) {
    if ("string" === typeof a) return a;
    switch(a){
        case ka:
            return "Suspense";
        case la:
            return "SuspenseList";
    }
    if ("object" === typeof a) switch(a.$$typeof){
        case ja:
            return M(a.render);
        case ma:
            return M(a.type);
        case z:
            var b = a._payload;
            a = a._init;
            try {
                return M(a(b));
            } catch (d) {}
    }
    return "";
}
function N(a, b) {
    var d = Oa(a);
    if ("Object" !== d && "Array" !== d) return d;
    d = -1;
    var c = 0;
    if (ua(a)) {
        var e = "[";
        for(var g = 0; g < a.length; g++){
            0 < g && (e += ", ");
            var h = a[g];
            h = "object" === typeof h && null !== h ? N(h) : Pa(h);
            "" + g === b ? (d = e.length, c = h.length, e += h) : e = 10 > h.length && 40 > e.length + h.length ? e + h : e + "...";
        }
        e += "]";
    } else if (a.$$typeof === x) e = "<" + M(a.type) + "/>";
    else {
        e = "{";
        g = Object.keys(a);
        for(h = 0; h < g.length; h++){
            0 < h && (e += ", ");
            var k = g[h], l = JSON.stringify(k);
            e += ('"' + k + '"' === l ? k : l) + ": ";
            l = a[k];
            l = "object" === typeof l && null !== l ? N(l) : Pa(l);
            k === b ? (d = e.length, c = l.length, e += l) : e = 10 > l.length && 40 > e.length + l.length ? e + l : e + "...";
        }
        e += "}";
    }
    return void 0 === b ? e : -1 < d && 0 < c ? (a = " ".repeat(d) + "^".repeat(c), "\n  " + e + "\n  " + a) : "\n  " + e;
}
var Qa = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Ra = Qa.ContextRegistry, Sa = Qa.ReactCurrentDispatcher, Ta = Qa.ReactCurrentCache;
function Ua(a) {
    console.error(a);
}
function Va(a, b, d, c, e) {
    if (null !== Ta.current && Ta.current !== Na) throw Error("Currently React only supports one RSC renderer at a time.");
    Ta.current = Na;
    var g = new Set, h = [], k = {
        status: 0,
        fatalError: null,
        destination: null,
        bundlerConfig: b,
        cache: new Map,
        nextChunkId: 0,
        pendingChunks: 0,
        abortableTasks: g,
        pingedTasks: h,
        completedImportChunks: [],
        completedJSONChunks: [],
        completedErrorChunks: [],
        writtenSymbols: new Map,
        writtenClientReferences: new Map,
        writtenServerReferences: new Map,
        writtenProviders: new Map,
        identifierPrefix: e || "",
        identifierCount: 1,
        onError: void 0 === d ? Ua : d,
        toJSON: function(l, v) {
            return Wa(k, this, l, v);
        }
    };
    k.pendingChunks++;
    b = Xa(c);
    a = Ya(k, a, b, g);
    h.push(a);
    return k;
}
var Za = {};
function $a(a, b) {
    a.pendingChunks++;
    var d = Ya(a, null, D, a.abortableTasks);
    switch(b.status){
        case "fulfilled":
            return d.model = b.value, ab(a, d), d.id;
        case "rejected":
            var c = O(a, b.reason);
            Q(a, d.id, c);
            return d.id;
        default:
            "string" !== typeof b.status && (b.status = "pending", b.then(function(e) {
                "pending" === b.status && (b.status = "fulfilled", b.value = e);
            }, function(e) {
                "pending" === b.status && (b.status = "rejected", b.reason = e);
            }));
    }
    b.then(function(e) {
        d.model = e;
        ab(a, d);
    }, function(e) {
        d.status = 4;
        e = O(a, e);
        Q(a, d.id, e);
        null !== a.destination && R(a, a.destination);
    });
    return d.id;
}
function bb(a) {
    if ("fulfilled" === a.status) return a.value;
    if ("rejected" === a.status) throw a.reason;
    throw a;
}
function cb(a) {
    switch(a.status){
        case "fulfilled":
        case "rejected":
            break;
        default:
            "string" !== typeof a.status && (a.status = "pending", a.then(function(b) {
                "pending" === a.status && (a.status = "fulfilled", a.value = b);
            }, function(b) {
                "pending" === a.status && (a.status = "rejected", a.reason = b);
            }));
    }
    return {
        $$typeof: z,
        _payload: a,
        _init: bb
    };
}
function S(a, b, d, c, e, g) {
    if (null !== c && void 0 !== c) throw Error("Refs cannot be used in Server Components, nor passed to Client Components.");
    if ("function" === typeof b) {
        if (b.$$typeof === w) return [
            x,
            b,
            d,
            e
        ];
        I = 0;
        J = g;
        e = b(e);
        return "object" === typeof e && null !== e && "function" === typeof e.then ? "fulfilled" === e.status ? e.value : cb(e) : e;
    }
    if ("string" === typeof b) return [
        x,
        b,
        d,
        e
    ];
    if ("symbol" === typeof b) return b === fa ? e.children : [
        x,
        b,
        d,
        e
    ];
    if (null != b && "object" === typeof b) {
        if (b.$$typeof === w) return [
            x,
            b,
            d,
            e
        ];
        switch(b.$$typeof){
            case z:
                var h = b._init;
                b = h(b._payload);
                return S(a, b, d, c, e, g);
            case ja:
                return a = b.render, I = 0, J = g, a(e, void 0);
            case ma:
                return S(a, b.type, d, c, e, g);
            case ha:
                return Aa(b._context, e.value), [
                    x,
                    b,
                    d,
                    {
                        value: e.value,
                        children: e.children,
                        __pop: Za
                    }
                ];
        }
    }
    throw Error("Unsupported Server Component type: " + Pa(b));
}
function ab(a, b) {
    var d = a.pingedTasks;
    d.push(b);
    1 === d.length && setTimeout(function() {
        return db(a);
    }, 0);
}
function Ya(a, b, d, c) {
    var e = {
        id: a.nextChunkId++,
        status: 0,
        model: b,
        context: d,
        ping: function() {
            return ab(a, e);
        },
        thenableState: null
    };
    c.add(e);
    return e;
}
function eb(a, b, d, c) {
    var e = c.$$async ? c.$$id + "#async" : c.$$id, g = a.writtenClientReferences, h = g.get(e);
    if (void 0 !== h) return b[0] === x && "1" === d ? "$L" + h.toString(16) : "$" + h.toString(16);
    try {
        var k = a.bundlerConfig[c.$$id];
        var l = c.$$async ? {
            id: k.id,
            chunks: k.chunks,
            name: k.name,
            async: !0
        } : k;
        a.pendingChunks++;
        var v = a.nextChunkId++, oa = t(l), y = v.toString(16) + ":I" + oa + "\n";
        var P = q.encode(y);
        a.completedImportChunks.push(P);
        g.set(e, v);
        return b[0] === x && "1" === d ? "$L" + v.toString(16) : "$" + v.toString(16);
    } catch (pa) {
        return a.pendingChunks++, b = a.nextChunkId++, d = O(a, pa), Q(a, b, d), "$" + b.toString(16);
    }
}
function Wa(a, b, d, c) {
    switch(c){
        case x:
            return "$";
    }
    for(; "object" === typeof c && null !== c && (c.$$typeof === x || c.$$typeof === z);)try {
        switch(c.$$typeof){
            case x:
                var e = c;
                c = S(a, e.type, e.key, e.ref, e.props, null);
                break;
            case z:
                var g = c._init;
                c = g(c._payload);
        }
    } catch (h) {
        d = h === Ba ? Ea() : h;
        if ("object" === typeof d && null !== d && "function" === typeof d.then) return a.pendingChunks++, a = Ya(a, c, D, a.abortableTasks), c = a.ping, d.then(c, c), a.thenableState = Fa(), "$L" + a.id.toString(16);
        a.pendingChunks++;
        c = a.nextChunkId++;
        d = O(a, d);
        Q(a, c, d);
        return "$L" + c.toString(16);
    }
    if (null === c) return null;
    if ("object" === typeof c) {
        if (c.$$typeof === w) return eb(a, b, d, c);
        if ("function" === typeof c.then) return "$@" + $a(a, c).toString(16);
        if (c.$$typeof === ha) return c = c._context._globalName, b = a.writtenProviders, d = b.get(d), void 0 === d && (a.pendingChunks++, d = a.nextChunkId++, b.set(c, d), c = u(a, d, "$P" + c), a.completedJSONChunks.push(c)), "$" + d.toString(16);
        if (c === Za) {
            a = D;
            if (null === a) throw Error("Tried to pop a Context at the root of the app. This is a bug in React.");
            c = a.parentValue;
            a.context._currentValue = c === na ? a.context._defaultValue : c;
            D = a.parent;
            return;
        }
        return !ua(c) && (null === c || "object" !== typeof c ? a = null : (a = ra && c[ra] || c["@@iterator"], a = "function" === typeof a ? a : null), a) ? Array.from(c) : c;
    }
    if ("string" === typeof c) return a = "$" === c[0] ? "$" + c : c, a;
    if ("boolean" === typeof c || "number" === typeof c) return c;
    if ("undefined" === typeof c) return "$undefined";
    if ("function" === typeof c) {
        if (c.$$typeof === w) return eb(a, b, d, c);
        if (c.$$typeof === ea) return d = a.writtenServerReferences, b = d.get(c), void 0 !== b ? a = "$F" + b.toString(16) : (b = c.$$bound, e = {
            id: c.$$id,
            bound: b ? Promise.resolve(b) : null
        }, a.pendingChunks++, b = a.nextChunkId++, e = da(a, b, e), a.completedJSONChunks.push(e), d.set(c, b), a = "$F" + b.toString(16)), a;
        if (/^on[A-Z]/.test(d)) throw Error("Event handlers cannot be passed to Client Component props." + N(b, d) + "\nIf you need interactivity, consider converting part of this to a Client Component.");
        throw Error('Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server".' + N(b, d));
    }
    if ("symbol" === typeof c) {
        e = a.writtenSymbols;
        g = e.get(c);
        if (void 0 !== g) return "$" + g.toString(16);
        g = c.description;
        if (Symbol.for(g) !== c) throw Error("Only global symbols received from Symbol.for(...) can be passed to Client Components. The symbol Symbol.for(" + (c.description + ") cannot be found among global symbols.") + N(b, d));
        a.pendingChunks++;
        d = a.nextChunkId++;
        b = u(a, d, "$S" + g);
        a.completedImportChunks.push(b);
        e.set(c, d);
        return "$" + d.toString(16);
    }
    if ("bigint" === typeof c) throw Error("BigInt (" + c + ") is not yet supported in Client Component props." + N(b, d));
    throw Error("Type " + typeof c + " is not supported in Client Component props." + N(b, d));
}
function O(a, b) {
    a = a.onError;
    b = a(b);
    if (null != b && "string" !== typeof b) throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof b + '" instead');
    return b || "";
}
function fb(a, b) {
    null !== a.destination ? (a.status = 2, ca(a.destination, b)) : (a.status = 1, a.fatalError = b);
}
function Q(a, b, d) {
    d = {
        digest: d
    };
    b = b.toString(16) + ":E" + t(d) + "\n";
    b = q.encode(b);
    a.completedErrorChunks.push(b);
}
function db(a) {
    var b = Sa.current, d = L;
    Sa.current = Ka;
    L = a.cache;
    H = a;
    try {
        var c = a.pingedTasks;
        a.pingedTasks = [];
        for(var e = 0; e < c.length; e++){
            var g = c[e];
            var h = a;
            if (0 === g.status) {
                za(g.context);
                try {
                    var k = g.model;
                    if ("object" === typeof k && null !== k && k.$$typeof === x) {
                        var l = k, v = g.thenableState;
                        g.model = k;
                        k = S(h, l.type, l.key, l.ref, l.props, v);
                        for(g.thenableState = null; "object" === typeof k && null !== k && k.$$typeof === x;)l = k, g.model = k, k = S(h, l.type, l.key, l.ref, l.props, null);
                    }
                    var oa = da(h, g.id, k);
                    h.completedJSONChunks.push(oa);
                    h.abortableTasks.delete(g);
                    g.status = 1;
                } catch (G) {
                    var y = G === Ba ? Ea() : G;
                    if ("object" === typeof y && null !== y && "function" === typeof y.then) {
                        var P = g.ping;
                        y.then(P, P);
                        g.thenableState = Fa();
                    } else {
                        h.abortableTasks.delete(g);
                        g.status = 4;
                        var pa = O(h, y);
                        Q(h, g.id, pa);
                    }
                }
            }
        }
        null !== a.destination && R(a, a.destination);
    } catch (G) {
        O(a, G), fb(a, G);
    } finally{
        Sa.current = b, L = d, H = null;
    }
}
function R(a, b) {
    m = new Uint8Array(512);
    n = 0;
    try {
        for(var d = a.completedImportChunks, c = 0; c < d.length; c++)a.pendingChunks--, p(b, d[c]);
        d.splice(0, c);
        var e = a.completedJSONChunks;
        for(c = 0; c < e.length; c++)a.pendingChunks--, p(b, e[c]);
        e.splice(0, c);
        var g = a.completedErrorChunks;
        for(c = 0; c < g.length; c++)a.pendingChunks--, p(b, g[c]);
        g.splice(0, c);
    } finally{
        m && 0 < n && (b.enqueue(new Uint8Array(m.buffer, 0, n)), m = null, n = 0);
    }
    0 === a.pendingChunks && b.close();
}
function gb(a) {
    f ? setTimeout(function() {
        return ba.run(a.cache, db, a);
    }, 0) : setTimeout(function() {
        return db(a);
    }, 0);
}
function hb(a, b) {
    try {
        var d = a.abortableTasks;
        if (0 < d.size) {
            var c = O(a, void 0 === b ? Error("The render was aborted by the server without a reason.") : b);
            a.pendingChunks++;
            var e = a.nextChunkId++;
            Q(a, e, c);
            d.forEach(function(g) {
                g.status = 3;
                var h = "$" + e.toString(16);
                g = u(a, g.id, h);
                a.completedErrorChunks.push(g);
            });
            d.clear();
        }
        null !== a.destination && R(a, a.destination);
    } catch (g) {
        O(a, g), fb(a, g);
    }
}
function Xa(a) {
    if (a) {
        var b = D;
        za(null);
        for(var d = 0; d < a.length; d++){
            var c = a[d], e = c[0];
            c = c[1];
            Ra[e] || (Ra[e] = aa.createServerContext(e, na));
            Aa(Ra[e], c);
        }
        a = D;
        za(b);
        return a;
    }
    return null;
}
var T = new Map, ib = new Map;
function jb() {}
function kb(a) {
    for(var b = a.chunks, d = [], c = 0; c < b.length; c++){
        var e = b[c], g = T.get(e);
        if (void 0 === g) {
            g = globalThis.__next_chunk_load__(e);
            d.push(g);
            var h = T.set.bind(T, e, null);
            g.then(h, jb);
            T.set(e, g);
        } else null !== g && d.push(g);
    }
    if (a.async) {
        if (b = ib.get(a.id)) return "fulfilled" === b.status ? null : b;
        var k = Promise.all(d).then(function() {
            return globalThis.__next_require__(a.id);
        });
        k.then(function(l) {
            k.status = "fulfilled";
            k.value = l;
        }, function(l) {
            k.status = "rejected";
            k.reason = l;
        });
        ib.set(a.id, k);
        return k;
    }
    return 0 < d.length ? Promise.all(d) : null;
}
function lb(a) {
    if (a.async) {
        var b = ib.get(a.id);
        if ("fulfilled" === b.status) b = b.value;
        else throw b.reason;
    } else b = globalThis.__next_require__(a.id);
    return "*" === a.name ? b : "" === a.name ? b.__esModule ? b.default : b : b[a.name];
}
function U(a, b, d, c) {
    this.status = a;
    this.value = b;
    this.reason = d;
    this._response = c;
}
U.prototype = Object.create(Promise.prototype);
U.prototype.then = function(a, b) {
    switch(this.status){
        case "resolved_model":
            V(this);
    }
    switch(this.status){
        case "fulfilled":
            a(this.value);
            break;
        case "pending":
        case "blocked":
            a && (null === this.value && (this.value = []), this.value.push(a));
            b && (null === this.reason && (this.reason = []), this.reason.push(b));
            break;
        default:
            b(this.reason);
    }
};
function W(a, b) {
    for(var d = 0; d < a.length; d++)(0, a[d])(b);
}
function mb(a, b) {
    if ("pending" === a.status || "blocked" === a.status) {
        var d = a.reason;
        a.status = "rejected";
        a.reason = b;
        null !== d && W(d, b);
    }
}
function nb(a, b, d, c, e, g) {
    var h = a._bundlerConfig[b];
    a = kb(h);
    if (d) d = Promise.all([
        d,
        a
    ]).then(function(k) {
        k = k[0];
        var l = lb(h);
        return l.bind.apply(l, [
            null
        ].concat(k));
    });
    else if (a) d = Promise.resolve(a).then(function() {
        return lb(h);
    });
    else return lb(h);
    d.then(ob(c, e, g), pb(c));
    return null;
}
var X = null, Y = null;
function V(a) {
    var b = X, d = Y;
    X = a;
    Y = null;
    try {
        var c = JSON.parse(a.value, a._response._fromJSON);
        null !== Y && 0 < Y.deps ? (Y.value = c, a.status = "blocked", a.value = null, a.reason = null) : (a.status = "fulfilled", a.value = c);
    } catch (e) {
        a.status = "rejected", a.reason = e;
    } finally{
        X = b, Y = d;
    }
}
function qb(a, b) {
    a._chunks.forEach(function(d) {
        "pending" === d.status && mb(d, b);
    });
}
function Z(a, b) {
    var d = a._chunks, c = d.get(b);
    c || (c = new U("pending", null, null, a), d.set(b, c));
    return c;
}
function ob(a, b, d) {
    if (Y) {
        var c = Y;
        c.deps++;
    } else c = Y = {
        deps: 1,
        value: null
    };
    return function(e) {
        b[d] = e;
        c.deps--;
        0 === c.deps && "blocked" === a.status && (e = a.value, a.status = "fulfilled", a.value = c.value, null !== e && W(e, c.value));
    };
}
function pb(a) {
    return function(b) {
        return mb(a, b);
    };
}
function rb(a, b, d, c) {
    if ("$" === c[0]) switch(c[1]){
        case "$":
            return c.substring(1);
        case "@":
            return b = parseInt(c.substring(2), 16), Z(a, b);
        case "S":
            return Symbol.for(c.substring(2));
        case "F":
            c = parseInt(c.substring(2), 16);
            c = Z(a, c);
            "resolved_model" === c.status && V(c);
            if ("fulfilled" !== c.status) throw c.reason;
            c = c.value;
            return nb(a, c.id, c.bound, X, b, d);
        case "u":
            return;
        default:
            c = parseInt(c.substring(1), 16);
            a = Z(a, c);
            switch(a.status){
                case "resolved_model":
                    V(a);
            }
            switch(a.status){
                case "fulfilled":
                    return a.value;
                case "pending":
                case "blocked":
                    return c = X, a.then(ob(c, b, d), pb(c)), null;
                default:
                    throw a.reason;
            }
    }
    return c;
}
function sb(a) {
    var b = new Map, d = {
        _bundlerConfig: a,
        _chunks: b,
        _fromJSON: function(c, e) {
            return "string" === typeof e ? rb(d, this, c, e) : e;
        }
    };
    return d;
}
function tb(a, b, d) {
    var c = a._chunks, e = c.get(b);
    if (e) {
        if ("pending" === e.status && (a = e.value, b = e.reason, e.status = "resolved_model", e.value = d, null !== a)) switch(V(e), e.status){
            case "fulfilled":
                W(a, e.value);
                break;
            case "pending":
            case "blocked":
                e.value = a;
                e.reason = b;
                break;
            case "rejected":
                b && W(b, e.reason);
        }
    } else c.set(b, new U("resolved_model", d, null, a));
}
exports.decodeReply = function(a, b) {
    var d = sb(b);
    "string" === typeof a ? tb(d, 0, a) : a.forEach(function(c, e) {
        if ("string" === typeof c) tb(d, +e, c);
        else throw Error("Not implemented.");
    });
    qb(d, Error("Connection closed."));
    return Z(d, 0);
};
exports.renderToReadableStream = function(a, b, d) {
    var c = Va(a, b, d ? d.onError : void 0, d ? d.context : void 0, d ? d.identifierPrefix : void 0);
    if (d && d.signal) {
        var e = d.signal;
        if (e.aborted) hb(c, e.reason);
        else {
            var g = function() {
                hb(c, e.reason);
                e.removeEventListener("abort", g);
            };
            e.addEventListener("abort", g);
        }
    }
    return new ReadableStream({
        type: "bytes",
        start: function() {
            gb(c);
        },
        pull: function(h) {
            if (1 === c.status) c.status = 2, ca(h, c.fatalError);
            else if (2 !== c.status && null === c.destination) {
                c.destination = h;
                try {
                    R(c, h);
                } catch (k) {
                    O(c, k), fb(c, k);
                }
            }
        },
        cancel: function() {}
    }, {
        highWaterMark: 0
    });
};


/***/ }),

/***/ 76370:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

if (true) {
    module.exports = __webpack_require__(31336);
} else {}


/***/ }),

/***/ 38446:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 
var f = __webpack_require__(34212), k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function q(c, a, g) {
    var b, d = {}, e = null, h = null;
    void 0 !== g && (e = "" + g);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (h = a.ref);
    for(b in a)m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps) for(b in a = c.defaultProps, a)void 0 === d[b] && (d[b] = a[b]);
    return {
        $$typeof: k,
        type: c,
        key: e,
        ref: h,
        props: d,
        _owner: n.current
    };
}
__webpack_unused_export__ = l;
exports.jsx = q;
__webpack_unused_export__ = q;


/***/ }),

/***/ 29615:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * @license React
 * react.shared-subset.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 
var m = Object.assign, n = {
    current: null
};
function p() {
    return new Map;
}
if ("function" === typeof fetch) {
    var q = fetch, r = function(a, b) {
        var d = n.current;
        if (!d || b && b.signal && b.signal !== d.getCacheSignal()) return q(a, b);
        if ("string" !== typeof a || b) {
            var c = new Request(a, b);
            if ("GET" !== c.method && "HEAD" !== c.method || c.keepalive) return q(a, b);
            var e = JSON.stringify([
                c.method,
                Array.from(c.headers.entries()),
                c.mode,
                c.redirect,
                c.credentials,
                c.referrer,
                c.referrerPolicy,
                c.integrity
            ]);
            c = c.url;
        } else e = '["GET",[],null,"follow",null,null,null,null]', c = a;
        var f = d.getCacheForType(p);
        d = f.get(c);
        if (void 0 === d) a = q(a, b), f.set(c, [
            e,
            a
        ]);
        else {
            c = 0;
            for(f = d.length; c < f; c += 2){
                var h = d[c + 1];
                if (d[c] === e) return a = h, a.then(function(g) {
                    return g.clone();
                });
            }
            a = q(a, b);
            d.push(e, a);
        }
        return a.then(function(g) {
            return g.clone();
        });
    };
    m(r, q);
    try {
        fetch = r;
    } catch (a) {
        try {
            globalThis.fetch = r;
        } catch (b) {
            console.warn("React was unable to patch the fetch() function in this environment. Suspensey APIs might not work correctly as a result.");
        }
    }
}
var t = Symbol.for("react.element"), u = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), w = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), y = Symbol.for("react.provider"), z = Symbol.for("react.server_context"), A = Symbol.for("react.forward_ref"), B = Symbol.for("react.suspense"), C = Symbol.for("react.memo"), aa = Symbol.for("react.lazy"), D = Symbol.for("react.default_value"), E = Symbol.iterator;
function ba(a) {
    if (null === a || "object" !== typeof a) return null;
    a = E && a[E] || a["@@iterator"];
    return "function" === typeof a ? a : null;
}
function F(a) {
    for(var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, d = 1; d < arguments.length; d++)b += "&args[]=" + encodeURIComponent(arguments[d]);
    return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var G = {
    isMounted: function() {
        return !1;
    },
    enqueueForceUpdate: function() {},
    enqueueReplaceState: function() {},
    enqueueSetState: function() {}
}, H = {};
function I(a, b, d) {
    this.props = a;
    this.context = b;
    this.refs = H;
    this.updater = d || G;
}
I.prototype.isReactComponent = {};
I.prototype.setState = function(a, b) {
    if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error(F(85));
    this.updater.enqueueSetState(this, a, b, "setState");
};
I.prototype.forceUpdate = function(a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function J() {}
J.prototype = I.prototype;
function K(a, b, d) {
    this.props = a;
    this.context = b;
    this.refs = H;
    this.updater = d || G;
}
var L = K.prototype = new J;
L.constructor = K;
m(L, I.prototype);
L.isPureReactComponent = !0;
var M = Array.isArray, N = Object.prototype.hasOwnProperty, O = {
    current: null
}, P = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function ca(a, b) {
    return {
        $$typeof: t,
        type: a.type,
        key: b,
        ref: a.ref,
        props: a.props,
        _owner: a._owner
    };
}
function Q(a) {
    return "object" === typeof a && null !== a && a.$$typeof === t;
}
function escape(a) {
    var b = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + a.replace(/[=:]/g, function(d) {
        return b[d];
    });
}
var R = /\/+/g;
function S(a, b) {
    return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}
function T(a, b, d, c, e) {
    var f = typeof a;
    if ("undefined" === f || "boolean" === f) a = null;
    var h = !1;
    if (null === a) h = !0;
    else switch(f){
        case "string":
        case "number":
            h = !0;
            break;
        case "object":
            switch(a.$$typeof){
                case t:
                case u:
                    h = !0;
            }
    }
    if (h) return h = a, e = e(h), a = "" === c ? "." + S(h, 0) : c, M(e) ? (d = "", null != a && (d = a.replace(R, "$&/") + "/"), T(e, b, d, "", function(l) {
        return l;
    })) : null != e && (Q(e) && (e = ca(e, d + (!e.key || h && h.key === e.key ? "" : ("" + e.key).replace(R, "$&/") + "/") + a)), b.push(e)), 1;
    h = 0;
    c = "" === c ? "." : c + ":";
    if (M(a)) for(var g = 0; g < a.length; g++){
        f = a[g];
        var k = c + S(f, g);
        h += T(f, b, d, k, e);
    }
    else if (k = ba(a), "function" === typeof k) for(a = k.call(a), g = 0; !(f = a.next()).done;)f = f.value, k = c + S(f, g++), h += T(f, b, d, k, e);
    else if ("object" === f) throw b = String(a), Error(F(31, "[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b));
    return h;
}
function U(a, b, d) {
    if (null == a) return a;
    var c = [], e = 0;
    T(a, c, "", "", function(f) {
        return b.call(d, f, e++);
    });
    return c;
}
function da(a) {
    if (-1 === a._status) {
        var b = a._result;
        b = b();
        b.then(function(d) {
            if (0 === a._status || -1 === a._status) a._status = 1, a._result = d;
        }, function(d) {
            if (0 === a._status || -1 === a._status) a._status = 2, a._result = d;
        });
        -1 === a._status && (a._status = 0, a._result = b);
    }
    if (1 === a._status) return a._result.default;
    throw a._result;
}
function ea() {
    return new WeakMap;
}
function V() {
    return {
        s: 0,
        v: void 0,
        o: null,
        p: null
    };
}
var W = {
    current: null
}, X = {
    transition: null
}, Y = {
    ReactCurrentDispatcher: W,
    ReactCurrentCache: n,
    ReactCurrentBatchConfig: X,
    ReactCurrentOwner: O,
    ContextRegistry: {}
}, Z = Y.ContextRegistry;
exports.Children = {
    map: U,
    forEach: function(a, b, d) {
        U(a, function() {
            b.apply(this, arguments);
        }, d);
    },
    count: function(a) {
        var b = 0;
        U(a, function() {
            b++;
        });
        return b;
    },
    toArray: function(a) {
        return U(a, function(b) {
            return b;
        }) || [];
    },
    only: function(a) {
        if (!Q(a)) throw Error(F(143));
        return a;
    }
};
exports.Fragment = v;
exports.Profiler = x;
exports.StrictMode = w;
exports.Suspense = B;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Y;
exports.cache = function(a) {
    return function() {
        var b = n.current;
        if (!b) return a.apply(null, arguments);
        var d = b.getCacheForType(ea);
        b = d.get(a);
        void 0 === b && (b = V(), d.set(a, b));
        d = 0;
        for(var c = arguments.length; d < c; d++){
            var e = arguments[d];
            if ("function" === typeof e || "object" === typeof e && null !== e) {
                var f = b.o;
                null === f && (b.o = f = new WeakMap);
                b = f.get(e);
                void 0 === b && (b = V(), f.set(e, b));
            } else f = b.p, null === f && (b.p = f = new Map), b = f.get(e), void 0 === b && (b = V(), f.set(e, b));
        }
        if (1 === b.s) return b.v;
        if (2 === b.s) throw b.v;
        try {
            var h = a.apply(null, arguments);
            d = b;
            d.s = 1;
            return d.v = h;
        } catch (g) {
            throw h = b, h.s = 2, h.v = g, g;
        }
    };
};
exports.cloneElement = function(a, b, d) {
    if (null === a || void 0 === a) throw Error(F(267, a));
    var c = m({}, a.props), e = a.key, f = a.ref, h = a._owner;
    if (null != b) {
        void 0 !== b.ref && (f = b.ref, h = O.current);
        void 0 !== b.key && (e = "" + b.key);
        if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
        for(k in b)N.call(b, k) && !P.hasOwnProperty(k) && (c[k] = void 0 === b[k] && void 0 !== g ? g[k] : b[k]);
    }
    var k = arguments.length - 2;
    if (1 === k) c.children = d;
    else if (1 < k) {
        g = Array(k);
        for(var l = 0; l < k; l++)g[l] = arguments[l + 2];
        c.children = g;
    }
    return {
        $$typeof: t,
        type: a.type,
        key: e,
        ref: f,
        props: c,
        _owner: h
    };
};
exports.createElement = function(a, b, d) {
    var c, e = {}, f = null, h = null;
    if (null != b) for(c in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (f = "" + b.key), b)N.call(b, c) && !P.hasOwnProperty(c) && (e[c] = b[c]);
    var g = arguments.length - 2;
    if (1 === g) e.children = d;
    else if (1 < g) {
        for(var k = Array(g), l = 0; l < g; l++)k[l] = arguments[l + 2];
        e.children = k;
    }
    if (a && a.defaultProps) for(c in g = a.defaultProps, g)void 0 === e[c] && (e[c] = g[c]);
    return {
        $$typeof: t,
        type: a,
        key: f,
        ref: h,
        props: e,
        _owner: O.current
    };
};
exports.createRef = function() {
    return {
        current: null
    };
};
exports.createServerContext = function(a, b) {
    var d = !0;
    if (!Z[a]) {
        d = !1;
        var c = {
            $$typeof: z,
            _currentValue: b,
            _currentValue2: b,
            _defaultValue: b,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
            _globalName: a
        };
        c.Provider = {
            $$typeof: y,
            _context: c
        };
        Z[a] = c;
    }
    c = Z[a];
    if (c._defaultValue === D) c._defaultValue = b, c._currentValue === D && (c._currentValue = b), c._currentValue2 === D && (c._currentValue2 = b);
    else if (d) throw Error(F(429, a));
    return c;
};
exports.forwardRef = function(a) {
    return {
        $$typeof: A,
        render: a
    };
};
exports.isValidElement = Q;
exports.lazy = function(a) {
    return {
        $$typeof: aa,
        _payload: {
            _status: -1,
            _result: a
        },
        _init: da
    };
};
exports.memo = function(a, b) {
    return {
        $$typeof: C,
        type: a,
        compare: void 0 === b ? null : b
    };
};
exports.startTransition = function(a) {
    var b = X.transition;
    X.transition = {};
    try {
        a();
    } finally{
        X.transition = b;
    }
};
exports.use = function(a) {
    return W.current.use(a);
};
exports.useCallback = function(a, b) {
    return W.current.useCallback(a, b);
};
exports.useContext = function(a) {
    return W.current.useContext(a);
};
exports.useDebugValue = function() {};
exports.useId = function() {
    return W.current.useId();
};
exports.useMemo = function(a, b) {
    return W.current.useMemo(a, b);
};
exports.version = "18.3.0-next-85de6fde5-20230328";


/***/ }),

/***/ 83146:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

if (true) {
    module.exports = __webpack_require__(38446);
} else {}


/***/ }),

/***/ 34212:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

if (true) {
    module.exports = __webpack_require__(29615);
} else {}


/***/ }),

/***/ 47939:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.acceptLanguage = acceptLanguage;
function parse(raw, preferences, options) {
    const lowers = new Map();
    const header = raw.replace(/[ \t]/g, "");
    if (preferences) {
        let pos = 0;
        for (const preference of preferences){
            const lower = preference.toLowerCase();
            lowers.set(lower, {
                orig: preference,
                pos: pos++
            });
            if (options.prefixMatch) {
                const parts = lower.split("-");
                while(parts.pop(), parts.length > 0){
                    const joined = parts.join("-");
                    if (!lowers.has(joined)) {
                        lowers.set(joined, {
                            orig: preference,
                            pos: pos++
                        });
                    }
                }
            }
        }
    }
    const parts = header.split(",");
    const selections = [];
    const map = new Set();
    for(let i = 0; i < parts.length; ++i){
        const part = parts[i];
        if (!part) {
            continue;
        }
        const params = part.split(";");
        if (params.length > 2) {
            throw new Error(`Invalid ${options.type} header`);
        }
        let token = params[0].toLowerCase();
        if (!token) {
            throw new Error(`Invalid ${options.type} header`);
        }
        const selection = {
            token,
            pos: i,
            q: 1
        };
        if (preferences && lowers.has(token)) {
            selection.pref = lowers.get(token).pos;
        }
        map.add(selection.token);
        if (params.length === 2) {
            const q = params[1];
            const [key, value] = q.split("=");
            if (!value || key !== "q" && key !== "Q") {
                throw new Error(`Invalid ${options.type} header`);
            }
            const score = parseFloat(value);
            if (score === 0) {
                continue;
            }
            if (Number.isFinite(score) && score <= 1 && score >= 0.001) {
                selection.q = score;
            }
        }
        selections.push(selection);
    }
    selections.sort((a, b)=>{
        if (b.q !== a.q) {
            return b.q - a.q;
        }
        if (b.pref !== a.pref) {
            if (a.pref === undefined) {
                return 1;
            }
            if (b.pref === undefined) {
                return -1;
            }
            return a.pref - b.pref;
        }
        return a.pos - b.pos;
    });
    const values = selections.map((selection)=>selection.token);
    if (!preferences || !preferences.length) {
        return values;
    }
    const preferred = [];
    for (const selection1 of values){
        if (selection1 === "*") {
            for (const [preference, value] of lowers){
                if (!map.has(preference)) {
                    preferred.push(value.orig);
                }
            }
        } else {
            const lower = selection1.toLowerCase();
            if (lowers.has(lower)) {
                preferred.push(lowers.get(lower).orig);
            }
        }
    }
    return preferred;
}
function acceptLanguage(header = "", preferences) {
    return parse(header, preferences, {
        type: "accept-language",
        prefixMatch: true
    })[0] || "";
} //# sourceMappingURL=accept-header.js.map


/***/ }),

/***/ 96888:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.isInterceptionRouteAppPath = isInterceptionRouteAppPath;
exports.extractInterceptionRouteInformation = extractInterceptionRouteInformation;
exports.INTERCEPTION_ROUTE_MARKERS = void 0;
var _appPaths = __webpack_require__(38798);
const INTERCEPTION_ROUTE_MARKERS = [
    "(..)(..)",
    "(..)",
    "(...)"
];
exports.INTERCEPTION_ROUTE_MARKERS = INTERCEPTION_ROUTE_MARKERS;
function isInterceptionRouteAppPath(path) {
    // TODO-APP: add more serious validation
    return path.split("/").find((segment)=>INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m))) !== undefined;
}
function extractInterceptionRouteInformation(path) {
    let interceptingRoute, marker, interceptedRoute;
    for (const segment of path.split("/")){
        marker = INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m));
        if (marker) {
            [interceptingRoute, interceptedRoute] = path.split(marker, 2);
            break;
        }
    }
    if (!interceptingRoute || !marker || !interceptedRoute) {
        throw new Error(`Invalid interception route: ${path}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`);
    }
    interceptingRoute = interceptingRoute.slice(0, -1) // remove the trailing slash
    ;
    interceptingRoute = (0, _appPaths // normalize the path, e.g. /(blog)/feed -> /feed
    ).normalizeAppPath(interceptingRoute);
    if (marker === "(..)") {
        // (..) indicates that we should remove the last segment of the intercepting
        // route to prepend the intercepted route.
        interceptedRoute = interceptingRoute.split("/").slice(0, -1).join("/") + "/" + interceptedRoute;
    }
    if (marker === "(...)") {
        // (...) will match the route segment in the root directory, so we need to
        // use the root directory to prepend the intercepted route.
        interceptedRoute = "/" + interceptedRoute;
    }
    if (marker === "(..)(..)") {
        // (..)(..) indicates that we should remove the last two segments of the
        // intercepting route to prepend the intercepted route.
        interceptedRoute = interceptingRoute.split("/").slice(0, -2).join("/") + "/" + interceptedRoute;
    }
    return {
        interceptingRoute,
        interceptedRoute
    };
} //# sourceMappingURL=interception-routes.js.map


/***/ }),

/***/ 1191:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getRequestMeta = getRequestMeta;
exports.setRequestMeta = setRequestMeta;
exports.addRequestMeta = addRequestMeta;
exports.getNextInternalQuery = getNextInternalQuery;
exports.NEXT_REQUEST_META = void 0;
const NEXT_REQUEST_META = Symbol.for("NextInternalRequestMeta");
exports.NEXT_REQUEST_META = NEXT_REQUEST_META;
function getRequestMeta(req, key) {
    const meta = req[NEXT_REQUEST_META] || {};
    return typeof key === "string" ? meta[key] : meta;
}
function setRequestMeta(req, meta) {
    req[NEXT_REQUEST_META] = meta;
    return getRequestMeta(req);
}
function addRequestMeta(request, key, value) {
    const meta = getRequestMeta(request);
    meta[key] = value;
    return setRequestMeta(request, meta);
}
function getNextInternalQuery(query) {
    const keysToInclude = [
        "__nextDefaultLocale",
        "__nextFallback",
        "__nextLocale",
        "__nextSsgPath",
        "_nextBubbleNoFallback",
        "__nextDataReq",
        "__nextInferredLocaleFromDefault"
    ];
    const nextInternalQuery = {};
    for (const key of keysToInclude){
        if (key in query) {
            // @ts-ignore this can't be typed correctly
            nextInternalQuery[key] = query[key];
        }
    }
    return nextInternalQuery;
} //# sourceMappingURL=request-meta.js.map


/***/ }),

/***/ 20459:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
__webpack_unused_export__ = normalizeVercelUrl;
exports.oE = interpolateDynamicPath;
__webpack_unused_export__ = getUtils;
var _url = __webpack_require__(57310);
var _normalizeLocalePath = __webpack_require__(49959);
var _pathMatch = __webpack_require__(61819);
var _routeRegex = __webpack_require__(1937);
var _routeMatcher = __webpack_require__(22063);
var _prepareDestination = __webpack_require__(30316);
var _acceptHeader = __webpack_require__(47939);
var _detectLocaleCookie = __webpack_require__(25319);
var _detectDomainLocale = __webpack_require__(55490);
var _denormalizePagePath = __webpack_require__(18547);
var _cookie = _interopRequireDefault(__webpack_require__(40252));
var _constants = __webpack_require__(66024);
var _requestMeta = __webpack_require__(1191);
var _removeTrailingSlash = __webpack_require__(98454);
var _appPaths = __webpack_require__(38798);
var _constants1 = __webpack_require__(72523);
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function normalizeVercelUrl(req, trustQuery, paramKeys, pageIsDynamic, defaultRouteRegex) {
    // make sure to normalize req.url on Vercel to strip dynamic params
    // from the query which are added during routing
    if (pageIsDynamic && trustQuery && defaultRouteRegex) {
        const _parsedUrl = (0, _url).parse(req.url, true);
        delete _parsedUrl.search;
        for (const key of Object.keys(_parsedUrl.query)){
            if (key !== _constants1.NEXT_QUERY_PARAM_PREFIX && key.startsWith(_constants1.NEXT_QUERY_PARAM_PREFIX) || (paramKeys || Object.keys(defaultRouteRegex.groups)).includes(key)) {
                delete _parsedUrl.query[key];
            }
        }
        req.url = (0, _url).format(_parsedUrl);
    }
}
function interpolateDynamicPath(pathname, params, defaultRouteRegex) {
    if (!defaultRouteRegex) return pathname;
    for (const param of Object.keys(defaultRouteRegex.groups)){
        const { optional , repeat  } = defaultRouteRegex.groups[param];
        let builtParam = `[${repeat ? "..." : ""}${param}]`;
        if (optional) {
            builtParam = `[${builtParam}]`;
        }
        const paramIdx = pathname.indexOf(builtParam);
        if (paramIdx > -1) {
            let paramValue;
            const value = params[param];
            if (Array.isArray(value)) {
                paramValue = value.map((v)=>v && encodeURIComponent(v)).join("/");
            } else if (value) {
                paramValue = encodeURIComponent(value);
            } else {
                paramValue = "";
            }
            pathname = pathname.slice(0, paramIdx) + paramValue + pathname.slice(paramIdx + builtParam.length);
        }
    }
    return pathname;
}
function getUtils({ page , i18n , basePath , rewrites , pageIsDynamic , trailingSlash  }) {
    let defaultRouteRegex;
    let dynamicRouteMatcher;
    let defaultRouteMatches;
    if (pageIsDynamic) {
        defaultRouteRegex = (0, _routeRegex).getNamedRouteRegex(page, false);
        dynamicRouteMatcher = (0, _routeMatcher).getRouteMatcher(defaultRouteRegex);
        defaultRouteMatches = dynamicRouteMatcher(page);
    }
    function handleRewrites(req, parsedUrl) {
        const rewriteParams = {};
        let fsPathname = parsedUrl.pathname;
        const matchesPage = ()=>{
            const fsPathnameNoSlash = (0, _removeTrailingSlash).removeTrailingSlash(fsPathname || "");
            return fsPathnameNoSlash === (0, _removeTrailingSlash).removeTrailingSlash(page) || (dynamicRouteMatcher == null ? void 0 : dynamicRouteMatcher(fsPathnameNoSlash));
        };
        const checkRewrite = (rewrite)=>{
            const matcher = (0, _pathMatch).getPathMatch(rewrite.source + (trailingSlash ? "(/)?" : ""), {
                removeUnnamedParams: true,
                strict: true
            });
            let params = matcher(parsedUrl.pathname);
            if ((rewrite.has || rewrite.missing) && params) {
                const hasParams = (0, _prepareDestination).matchHas(req, parsedUrl.query, rewrite.has, rewrite.missing);
                if (hasParams) {
                    Object.assign(params, hasParams);
                } else {
                    params = false;
                }
            }
            if (params) {
                const { parsedDestination , destQuery  } = (0, _prepareDestination).prepareDestination({
                    appendParamsToQuery: true,
                    destination: rewrite.destination,
                    params: params,
                    query: parsedUrl.query
                });
                // if the rewrite destination is external break rewrite chain
                if (parsedDestination.protocol) {
                    return true;
                }
                Object.assign(rewriteParams, destQuery, params);
                Object.assign(parsedUrl.query, parsedDestination.query);
                delete parsedDestination.query;
                Object.assign(parsedUrl, parsedDestination);
                fsPathname = parsedUrl.pathname;
                if (basePath) {
                    fsPathname = fsPathname.replace(new RegExp(`^${basePath}`), "") || "/";
                }
                if (i18n) {
                    const destLocalePathResult = (0, _normalizeLocalePath).normalizeLocalePath(fsPathname, i18n.locales);
                    fsPathname = destLocalePathResult.pathname;
                    parsedUrl.query.nextInternalLocale = destLocalePathResult.detectedLocale || params.nextInternalLocale;
                }
                if (fsPathname === page) {
                    return true;
                }
                if (pageIsDynamic && dynamicRouteMatcher) {
                    const dynamicParams = dynamicRouteMatcher(fsPathname);
                    if (dynamicParams) {
                        parsedUrl.query = {
                            ...parsedUrl.query,
                            ...dynamicParams
                        };
                        return true;
                    }
                }
            }
            return false;
        };
        for (const rewrite1 of rewrites.beforeFiles || []){
            checkRewrite(rewrite1);
        }
        if (fsPathname !== page) {
            let finished = false;
            for (const rewrite of rewrites.afterFiles || []){
                finished = checkRewrite(rewrite);
                if (finished) break;
            }
            if (!finished && !matchesPage()) {
                for (const rewrite of rewrites.fallback || []){
                    finished = checkRewrite(rewrite);
                    if (finished) break;
                }
            }
        }
        return rewriteParams;
    }
    function handleBasePath(req, parsedUrl) {
        // always strip the basePath if configured since it is required
        req.url = req.url.replace(new RegExp(`^${basePath}`), "") || "/";
        parsedUrl.pathname = parsedUrl.pathname.replace(new RegExp(`^${basePath}`), "") || "/";
    }
    function getParamsFromRouteMatches(req, renderOpts, detectedLocale) {
        return (0, _routeMatcher).getRouteMatcher(function() {
            const { groups , routeKeys  } = defaultRouteRegex;
            return {
                re: {
                    // Simulate a RegExp match from the \`req.url\` input
                    exec: (str)=>{
                        const obj = Object.fromEntries(new URLSearchParams(str));
                        const matchesHasLocale = i18n && detectedLocale && obj["1"] === detectedLocale;
                        for (const key1 of Object.keys(obj)){
                            const value = obj[key1];
                            if (key1 !== _constants1.NEXT_QUERY_PARAM_PREFIX && key1.startsWith(_constants1.NEXT_QUERY_PARAM_PREFIX)) {
                                const normalizedKey = key1.substring(_constants1.NEXT_QUERY_PARAM_PREFIX.length);
                                obj[normalizedKey] = value;
                                delete obj[key1];
                            }
                        }
                        // favor named matches if available
                        const routeKeyNames = Object.keys(routeKeys || {});
                        const filterLocaleItem = (val)=>{
                            if (i18n) {
                                // locale items can be included in route-matches
                                // for fallback SSG pages so ensure they are
                                // filtered
                                const isCatchAll = Array.isArray(val);
                                const _val = isCatchAll ? val[0] : val;
                                if (typeof _val === "string" && i18n.locales.some((item)=>{
                                    if (item.toLowerCase() === _val.toLowerCase()) {
                                        detectedLocale = item;
                                        renderOpts.locale = detectedLocale;
                                        return true;
                                    }
                                    return false;
                                })) {
                                    // remove the locale item from the match
                                    if (isCatchAll) {
                                        val.splice(0, 1);
                                    }
                                    // the value is only a locale item and
                                    // shouldn't be added
                                    return isCatchAll ? val.length === 0 : true;
                                }
                            }
                            return false;
                        };
                        if (routeKeyNames.every((name)=>obj[name])) {
                            return routeKeyNames.reduce((prev, keyName)=>{
                                const paramName = routeKeys == null ? void 0 : routeKeys[keyName];
                                if (paramName && !filterLocaleItem(obj[keyName])) {
                                    prev[groups[paramName].pos] = obj[keyName];
                                }
                                return prev;
                            }, {});
                        }
                        return Object.keys(obj).reduce((prev, key)=>{
                            if (!filterLocaleItem(obj[key])) {
                                let normalizedKey = key;
                                if (matchesHasLocale) {
                                    normalizedKey = parseInt(key, 10) - 1 + "";
                                }
                                return Object.assign(prev, {
                                    [normalizedKey]: obj[key]
                                });
                            }
                            return prev;
                        }, {});
                    }
                },
                groups
            };
        }())(req.headers["x-now-route-matches"]);
    }
    function normalizeDynamicRouteParams(params, ignoreOptional) {
        let hasValidParams = true;
        if (!defaultRouteRegex) return {
            params,
            hasValidParams: false
        };
        params = Object.keys(defaultRouteRegex.groups).reduce((prev, key)=>{
            let value = params[key];
            if (typeof value === "string") {
                value = (0, _appPaths).normalizeRscPath(value, true);
            }
            if (Array.isArray(value)) {
                value = value.map((val)=>{
                    if (typeof val === "string") {
                        val = (0, _appPaths).normalizeRscPath(val, true);
                    }
                    return val;
                });
            }
            // if the value matches the default value we can't rely
            // on the parsed params, this is used to signal if we need
            // to parse x-now-route-matches or not
            const defaultValue = defaultRouteMatches[key];
            const isOptional = defaultRouteRegex.groups[key].optional;
            const isDefaultValue = Array.isArray(defaultValue) ? defaultValue.some((defaultVal)=>{
                return Array.isArray(value) ? value.some((val)=>val.includes(defaultVal)) : value == null ? void 0 : value.includes(defaultVal);
            }) : value == null ? void 0 : value.includes(defaultValue);
            if (isDefaultValue || typeof value === "undefined" && !(isOptional && ignoreOptional)) {
                hasValidParams = false;
            }
            // non-provided optional values should be undefined so normalize
            // them to undefined
            if (isOptional && (!value || Array.isArray(value) && value.length === 1 && // fallback optional catch-all SSG pages have
            // [[...paramName]] for the root path on Vercel
            (value[0] === "index" || value[0] === `[[...${key}]]`))) {
                value = undefined;
                delete params[key];
            }
            // query values from the proxy aren't already split into arrays
            // so make sure to normalize catch-all values
            if (value && typeof value === "string" && defaultRouteRegex.groups[key].repeat) {
                value = value.split("/");
            }
            if (value) {
                prev[key] = value;
            }
            return prev;
        }, {});
        return {
            params,
            hasValidParams
        };
    }
    function handleLocale(req, res, parsedUrl, routeNoAssetPath, shouldNotRedirect) {
        if (!i18n) return;
        const pathname = parsedUrl.pathname || "/";
        let defaultLocale = i18n.defaultLocale;
        let detectedLocale = (0, _detectLocaleCookie).detectLocaleCookie(req, i18n.locales);
        let acceptPreferredLocale;
        try {
            acceptPreferredLocale = i18n.localeDetection !== false ? (0, _acceptHeader).acceptLanguage(req.headers["accept-language"], i18n.locales) : detectedLocale;
        } catch (_) {
            acceptPreferredLocale = detectedLocale;
        }
        const { host  } = req.headers || {};
        // remove port from host and remove port if present
        const hostname = host && host.split(":")[0].toLowerCase();
        const detectedDomain = (0, _detectDomainLocale).detectDomainLocale(i18n.domains, hostname);
        if (detectedDomain) {
            defaultLocale = detectedDomain.defaultLocale;
            detectedLocale = defaultLocale;
            (0, _requestMeta).addRequestMeta(req, "__nextIsLocaleDomain", true);
        }
        // if not domain specific locale use accept-language preferred
        detectedLocale = detectedLocale || acceptPreferredLocale;
        let localeDomainRedirect;
        const localePathResult = (0, _normalizeLocalePath).normalizeLocalePath(pathname, i18n.locales);
        routeNoAssetPath = (0, _normalizeLocalePath).normalizeLocalePath(routeNoAssetPath, i18n.locales).pathname;
        if (localePathResult.detectedLocale) {
            detectedLocale = localePathResult.detectedLocale;
            req.url = (0, _url).format({
                ...parsedUrl,
                pathname: localePathResult.pathname
            });
            (0, _requestMeta).addRequestMeta(req, "__nextStrippedLocale", true);
            parsedUrl.pathname = localePathResult.pathname;
        }
        // If a detected locale is a domain specific locale and we aren't already
        // on that domain and path prefix redirect to it to prevent duplicate
        // content from multiple domains
        if (detectedDomain) {
            const localeToCheck = localePathResult.detectedLocale ? detectedLocale : acceptPreferredLocale;
            const matchedDomain = (0, _detectDomainLocale).detectDomainLocale(i18n.domains, undefined, localeToCheck);
            if (matchedDomain && matchedDomain.domain !== detectedDomain.domain) {
                localeDomainRedirect = `http${matchedDomain.http ? "" : "s"}://${matchedDomain.domain}/${localeToCheck === matchedDomain.defaultLocale ? "" : localeToCheck}`;
            }
        }
        const denormalizedPagePath = (0, _denormalizePagePath).denormalizePagePath(pathname);
        const detectedDefaultLocale = !detectedLocale || detectedLocale.toLowerCase() === defaultLocale.toLowerCase();
        const shouldStripDefaultLocale = false;
        // detectedDefaultLocale &&
        // denormalizedPagePath.toLowerCase() === \`/\${i18n.defaultLocale.toLowerCase()}\`
        const shouldAddLocalePrefix = !detectedDefaultLocale && denormalizedPagePath === "/";
        detectedLocale = detectedLocale || i18n.defaultLocale;
        if (!shouldNotRedirect && !req.headers["x-vercel-id"] && i18n.localeDetection !== false && (localeDomainRedirect || shouldAddLocalePrefix || shouldStripDefaultLocale)) {
            // set the NEXT_LOCALE cookie when a user visits the default locale
            // with the locale prefix so that they aren't redirected back to
            // their accept-language preferred locale
            if (shouldStripDefaultLocale && acceptPreferredLocale !== defaultLocale) {
                const previous = res.getHeader("set-cookie");
                res.setHeader("set-cookie", [
                    ...typeof previous === "string" ? [
                        previous
                    ] : Array.isArray(previous) ? previous : [],
                    _cookie.default.serialize("NEXT_LOCALE", defaultLocale, {
                        httpOnly: true,
                        path: "/"
                    })
                ]);
            }
            res.setHeader("Location", (0, _url).format({
                // make sure to include any query values when redirecting
                ...parsedUrl,
                pathname: localeDomainRedirect ? localeDomainRedirect : shouldStripDefaultLocale ? basePath || "/" : `${basePath}/${detectedLocale}`
            }));
            res.statusCode = _constants.TEMPORARY_REDIRECT_STATUS;
            res.end();
            return;
        }
        detectedLocale = localePathResult.detectedLocale || detectedDomain && detectedDomain.defaultLocale || defaultLocale;
        return {
            defaultLocale,
            detectedLocale,
            routeNoAssetPath
        };
    }
    return {
        handleLocale,
        handleRewrites,
        handleBasePath,
        defaultRouteRegex,
        dynamicRouteMatcher,
        defaultRouteMatches,
        getParamsFromRouteMatches,
        normalizeDynamicRouteParams,
        normalizeVercelUrl: (req, trustQuery, paramKeys)=>normalizeVercelUrl(req, trustQuery, paramKeys, pageIsDynamic, defaultRouteRegex),
        interpolateDynamicPath: (pathname, params)=>interpolateDynamicPath(pathname, params, defaultRouteRegex)
    };
} //# sourceMappingURL=server-utils.js.map


/***/ }),

/***/ 66024:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.EDGE_UNSUPPORTED_NODE_APIS = exports.RSC_MODULE_TYPES = exports.TURBO_TRACE_DEFAULT_MEMORY_LIMIT = exports.TRACE_OUTPUT_VERSION = exports.STATIC_STATUS_PAGES = exports.DEFAULT_SANS_SERIF_FONT = exports.DEFAULT_SERIF_FONT = exports.OPTIMIZED_FONT_PROVIDERS = exports.GOOGLE_FONT_PROVIDER = exports.PAGE_SEGMENT_KEY = exports.SERVER_PROPS_ID = exports.STATIC_PROPS_ID = exports.PERMANENT_REDIRECT_STATUS = exports.TEMPORARY_REDIRECT_STATUS = exports.EDGE_RUNTIME_WEBPACK = exports.CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL = exports.CLIENT_STATIC_FILES_RUNTIME_POLYFILLS = exports.CLIENT_STATIC_FILES_RUNTIME_WEBPACK = exports.CLIENT_STATIC_FILES_RUNTIME_AMP = exports.CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH = exports.APP_CLIENT_INTERNALS = exports.CLIENT_STATIC_FILES_RUNTIME_MAIN_APP = exports.CLIENT_STATIC_FILES_RUNTIME_MAIN = exports.MIDDLEWARE_REACT_LOADABLE_MANIFEST = exports.MIDDLEWARE_BUILD_MANIFEST = exports.SERVER_REFERENCE_MANIFEST = exports.FLIGHT_SERVER_CSS_MANIFEST = exports.CLIENT_REFERENCE_MANIFEST = exports.NEXT_CLIENT_SSR_ENTRY_SUFFIX = exports.NEXT_BUILTIN_DOCUMENT = exports.MODERN_BROWSERSLIST_TARGET = exports.STRING_LITERAL_DROP_BUNDLE = exports.CLIENT_STATIC_FILES_RUNTIME = exports.CLIENT_STATIC_FILES_PATH = exports.CLIENT_PUBLIC_FILES_PATH = exports.BLOCKED_PAGES = exports.BUILD_ID_FILE = exports.CONFIG_FILES = exports.SERVER_DIRECTORY = exports.FONT_MANIFEST = exports.REACT_LOADABLE_MANIFEST = exports.DEV_MIDDLEWARE_MANIFEST = exports.MIDDLEWARE_MANIFEST = exports.DEV_CLIENT_PAGES_MANIFEST = exports.SERVER_FILES_MANIFEST = exports.IMAGES_MANIFEST = exports.ROUTES_MANIFEST = exports.PRERENDER_MANIFEST = exports.EXPORT_DETAIL = exports.EXPORT_MARKER = exports.NEXT_FONT_MANIFEST = exports.SUBRESOURCE_INTEGRITY_MANIFEST = exports.APP_BUILD_MANIFEST = exports.BUILD_MANIFEST = exports.APP_PATH_ROUTES_MANIFEST = exports.APP_PATHS_MANIFEST = exports.PAGES_MANIFEST = exports.PHASE_TEST = exports.PHASE_DEVELOPMENT_SERVER = exports.PHASE_PRODUCTION_SERVER = exports.PHASE_PRODUCTION_BUILD = exports.PHASE_EXPORT = exports.COMPILER_INDEXES = exports.COMPILER_NAMES = void 0;
exports.SYSTEM_ENTRYPOINTS = void 0;
const COMPILER_NAMES = {
    client: "client",
    server: "server",
    edgeServer: "edge-server"
};
exports.COMPILER_NAMES = COMPILER_NAMES;
const COMPILER_INDEXES = {
    [COMPILER_NAMES.client]: 0,
    [COMPILER_NAMES.server]: 1,
    [COMPILER_NAMES.edgeServer]: 2
};
exports.COMPILER_INDEXES = COMPILER_INDEXES;
const PHASE_EXPORT = "phase-export";
exports.PHASE_EXPORT = PHASE_EXPORT;
const PHASE_PRODUCTION_BUILD = "phase-production-build";
exports.PHASE_PRODUCTION_BUILD = PHASE_PRODUCTION_BUILD;
const PHASE_PRODUCTION_SERVER = "phase-production-server";
exports.PHASE_PRODUCTION_SERVER = PHASE_PRODUCTION_SERVER;
const PHASE_DEVELOPMENT_SERVER = "phase-development-server";
exports.PHASE_DEVELOPMENT_SERVER = PHASE_DEVELOPMENT_SERVER;
const PHASE_TEST = "phase-test";
exports.PHASE_TEST = PHASE_TEST;
const PAGES_MANIFEST = "pages-manifest.json";
exports.PAGES_MANIFEST = PAGES_MANIFEST;
const APP_PATHS_MANIFEST = "app-paths-manifest.json";
exports.APP_PATHS_MANIFEST = APP_PATHS_MANIFEST;
const APP_PATH_ROUTES_MANIFEST = "app-path-routes-manifest.json";
exports.APP_PATH_ROUTES_MANIFEST = APP_PATH_ROUTES_MANIFEST;
const BUILD_MANIFEST = "build-manifest.json";
exports.BUILD_MANIFEST = BUILD_MANIFEST;
const APP_BUILD_MANIFEST = "app-build-manifest.json";
exports.APP_BUILD_MANIFEST = APP_BUILD_MANIFEST;
const SUBRESOURCE_INTEGRITY_MANIFEST = "subresource-integrity-manifest";
exports.SUBRESOURCE_INTEGRITY_MANIFEST = SUBRESOURCE_INTEGRITY_MANIFEST;
const NEXT_FONT_MANIFEST = "next-font-manifest";
exports.NEXT_FONT_MANIFEST = NEXT_FONT_MANIFEST;
const EXPORT_MARKER = "export-marker.json";
exports.EXPORT_MARKER = EXPORT_MARKER;
const EXPORT_DETAIL = "export-detail.json";
exports.EXPORT_DETAIL = EXPORT_DETAIL;
const PRERENDER_MANIFEST = "prerender-manifest.json";
exports.PRERENDER_MANIFEST = PRERENDER_MANIFEST;
const ROUTES_MANIFEST = "routes-manifest.json";
exports.ROUTES_MANIFEST = ROUTES_MANIFEST;
const IMAGES_MANIFEST = "images-manifest.json";
exports.IMAGES_MANIFEST = IMAGES_MANIFEST;
const SERVER_FILES_MANIFEST = "required-server-files.json";
exports.SERVER_FILES_MANIFEST = SERVER_FILES_MANIFEST;
const DEV_CLIENT_PAGES_MANIFEST = "_devPagesManifest.json";
exports.DEV_CLIENT_PAGES_MANIFEST = DEV_CLIENT_PAGES_MANIFEST;
const MIDDLEWARE_MANIFEST = "middleware-manifest.json";
exports.MIDDLEWARE_MANIFEST = MIDDLEWARE_MANIFEST;
const DEV_MIDDLEWARE_MANIFEST = "_devMiddlewareManifest.json";
exports.DEV_MIDDLEWARE_MANIFEST = DEV_MIDDLEWARE_MANIFEST;
const REACT_LOADABLE_MANIFEST = "react-loadable-manifest.json";
exports.REACT_LOADABLE_MANIFEST = REACT_LOADABLE_MANIFEST;
const FONT_MANIFEST = "font-manifest.json";
exports.FONT_MANIFEST = FONT_MANIFEST;
const SERVER_DIRECTORY = "server";
exports.SERVER_DIRECTORY = SERVER_DIRECTORY;
const CONFIG_FILES = [
    "next.config.js",
    "next.config.mjs"
];
exports.CONFIG_FILES = CONFIG_FILES;
const BUILD_ID_FILE = "BUILD_ID";
exports.BUILD_ID_FILE = BUILD_ID_FILE;
const BLOCKED_PAGES = [
    "/_document",
    "/_app",
    "/_error"
];
exports.BLOCKED_PAGES = BLOCKED_PAGES;
const CLIENT_PUBLIC_FILES_PATH = "public";
exports.CLIENT_PUBLIC_FILES_PATH = CLIENT_PUBLIC_FILES_PATH;
const CLIENT_STATIC_FILES_PATH = "static";
exports.CLIENT_STATIC_FILES_PATH = CLIENT_STATIC_FILES_PATH;
const CLIENT_STATIC_FILES_RUNTIME = "runtime";
exports.CLIENT_STATIC_FILES_RUNTIME = CLIENT_STATIC_FILES_RUNTIME;
const STRING_LITERAL_DROP_BUNDLE = "__NEXT_DROP_CLIENT_FILE__";
exports.STRING_LITERAL_DROP_BUNDLE = STRING_LITERAL_DROP_BUNDLE;
const MODERN_BROWSERSLIST_TARGET = [
    "chrome 64",
    "edge 79",
    "firefox 67",
    "opera 51",
    "safari 12"
];
exports.MODERN_BROWSERSLIST_TARGET = MODERN_BROWSERSLIST_TARGET;
const NEXT_BUILTIN_DOCUMENT = "__NEXT_BUILTIN_DOCUMENT__";
exports.NEXT_BUILTIN_DOCUMENT = NEXT_BUILTIN_DOCUMENT;
const NEXT_CLIENT_SSR_ENTRY_SUFFIX = ".__sc_client__";
exports.NEXT_CLIENT_SSR_ENTRY_SUFFIX = NEXT_CLIENT_SSR_ENTRY_SUFFIX;
const CLIENT_REFERENCE_MANIFEST = "client-reference-manifest";
exports.CLIENT_REFERENCE_MANIFEST = CLIENT_REFERENCE_MANIFEST;
const FLIGHT_SERVER_CSS_MANIFEST = "flight-server-css-manifest";
exports.FLIGHT_SERVER_CSS_MANIFEST = FLIGHT_SERVER_CSS_MANIFEST;
const SERVER_REFERENCE_MANIFEST = "server-reference-manifest";
exports.SERVER_REFERENCE_MANIFEST = SERVER_REFERENCE_MANIFEST;
const MIDDLEWARE_BUILD_MANIFEST = "middleware-build-manifest";
exports.MIDDLEWARE_BUILD_MANIFEST = MIDDLEWARE_BUILD_MANIFEST;
const MIDDLEWARE_REACT_LOADABLE_MANIFEST = "middleware-react-loadable-manifest";
exports.MIDDLEWARE_REACT_LOADABLE_MANIFEST = MIDDLEWARE_REACT_LOADABLE_MANIFEST;
const CLIENT_STATIC_FILES_RUNTIME_MAIN = `main`;
exports.CLIENT_STATIC_FILES_RUNTIME_MAIN = CLIENT_STATIC_FILES_RUNTIME_MAIN;
const CLIENT_STATIC_FILES_RUNTIME_MAIN_APP = `${CLIENT_STATIC_FILES_RUNTIME_MAIN}-app`;
exports.CLIENT_STATIC_FILES_RUNTIME_MAIN_APP = CLIENT_STATIC_FILES_RUNTIME_MAIN_APP;
const APP_CLIENT_INTERNALS = "app-client-internals";
exports.APP_CLIENT_INTERNALS = APP_CLIENT_INTERNALS;
const CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH = `react-refresh`;
exports.CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH = CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH;
const CLIENT_STATIC_FILES_RUNTIME_AMP = `amp`;
exports.CLIENT_STATIC_FILES_RUNTIME_AMP = CLIENT_STATIC_FILES_RUNTIME_AMP;
const CLIENT_STATIC_FILES_RUNTIME_WEBPACK = `webpack`;
exports.CLIENT_STATIC_FILES_RUNTIME_WEBPACK = CLIENT_STATIC_FILES_RUNTIME_WEBPACK;
const CLIENT_STATIC_FILES_RUNTIME_POLYFILLS = "polyfills";
exports.CLIENT_STATIC_FILES_RUNTIME_POLYFILLS = CLIENT_STATIC_FILES_RUNTIME_POLYFILLS;
const CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL = Symbol(CLIENT_STATIC_FILES_RUNTIME_POLYFILLS);
exports.CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL = CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL;
const EDGE_RUNTIME_WEBPACK = "edge-runtime-webpack";
exports.EDGE_RUNTIME_WEBPACK = EDGE_RUNTIME_WEBPACK;
const TEMPORARY_REDIRECT_STATUS = 307;
exports.TEMPORARY_REDIRECT_STATUS = TEMPORARY_REDIRECT_STATUS;
const PERMANENT_REDIRECT_STATUS = 308;
exports.PERMANENT_REDIRECT_STATUS = PERMANENT_REDIRECT_STATUS;
const STATIC_PROPS_ID = "__N_SSG";
exports.STATIC_PROPS_ID = STATIC_PROPS_ID;
const SERVER_PROPS_ID = "__N_SSP";
exports.SERVER_PROPS_ID = SERVER_PROPS_ID;
const PAGE_SEGMENT_KEY = "__PAGE__";
exports.PAGE_SEGMENT_KEY = PAGE_SEGMENT_KEY;
const GOOGLE_FONT_PROVIDER = "https://fonts.googleapis.com/";
exports.GOOGLE_FONT_PROVIDER = GOOGLE_FONT_PROVIDER;
const OPTIMIZED_FONT_PROVIDERS = [
    {
        url: GOOGLE_FONT_PROVIDER,
        preconnect: "https://fonts.gstatic.com"
    },
    {
        url: "https://use.typekit.net",
        preconnect: "https://use.typekit.net"
    }
];
exports.OPTIMIZED_FONT_PROVIDERS = OPTIMIZED_FONT_PROVIDERS;
const DEFAULT_SERIF_FONT = {
    name: "Times New Roman",
    xAvgCharWidth: 821,
    azAvgWidth: 854.3953488372093,
    unitsPerEm: 2048
};
exports.DEFAULT_SERIF_FONT = DEFAULT_SERIF_FONT;
const DEFAULT_SANS_SERIF_FONT = {
    name: "Arial",
    xAvgCharWidth: 904,
    azAvgWidth: 934.5116279069767,
    unitsPerEm: 2048
};
exports.DEFAULT_SANS_SERIF_FONT = DEFAULT_SANS_SERIF_FONT;
const STATIC_STATUS_PAGES = [
    "/500"
];
exports.STATIC_STATUS_PAGES = STATIC_STATUS_PAGES;
const TRACE_OUTPUT_VERSION = 1;
exports.TRACE_OUTPUT_VERSION = TRACE_OUTPUT_VERSION;
const TURBO_TRACE_DEFAULT_MEMORY_LIMIT = 6000;
exports.TURBO_TRACE_DEFAULT_MEMORY_LIMIT = TURBO_TRACE_DEFAULT_MEMORY_LIMIT;
const RSC_MODULE_TYPES = {
    client: "client",
    server: "server"
};
exports.RSC_MODULE_TYPES = RSC_MODULE_TYPES;
const EDGE_UNSUPPORTED_NODE_APIS = [
    "clearImmediate",
    "setImmediate",
    "BroadcastChannel",
    "Buffer",
    "ByteLengthQueuingStrategy",
    "CompressionStream",
    "CountQueuingStrategy",
    "DecompressionStream",
    "DomException",
    "MessageChannel",
    "MessageEvent",
    "MessagePort",
    "ReadableByteStreamController",
    "ReadableStreamBYOBRequest",
    "ReadableStreamDefaultController",
    "TextDecoderStream",
    "TextEncoderStream",
    "TransformStreamDefaultController",
    "WritableStreamDefaultController"
];
exports.EDGE_UNSUPPORTED_NODE_APIS = EDGE_UNSUPPORTED_NODE_APIS;
const SYSTEM_ENTRYPOINTS = new Set([
    CLIENT_STATIC_FILES_RUNTIME_MAIN,
    CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH,
    CLIENT_STATIC_FILES_RUNTIME_AMP,
    CLIENT_STATIC_FILES_RUNTIME_MAIN_APP
]);
exports.SYSTEM_ENTRYPOINTS = SYSTEM_ENTRYPOINTS;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=constants.js.map


/***/ }),

/***/ 22431:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.escapeStringRegexp = escapeStringRegexp;
// regexp is based on https://github.com/sindresorhus/escape-string-regexp
const reHasRegExp = /[|\\{}()[\]^$+*?.-]/;
const reReplaceRegExp = /[|\\{}()[\]^$+*?.-]/g;
function escapeStringRegexp(str) {
    // see also: https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/escapeRegExp.js#L23
    if (reHasRegExp.test(str)) {
        return str.replace(reReplaceRegExp, "\\$&");
    }
    return str;
} //# sourceMappingURL=escape-regexp.js.map


/***/ }),

/***/ 25319:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.detectLocaleCookie = detectLocaleCookie;
function detectLocaleCookie(req, locales) {
    const { NEXT_LOCALE  } = req.cookies || {};
    return NEXT_LOCALE ? locales.find((locale)=>NEXT_LOCALE.toLowerCase() === locale.toLowerCase()) : undefined;
} //# sourceMappingURL=detect-locale-cookie.js.map


/***/ }),

/***/ 18547:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.denormalizePagePath = denormalizePagePath;
var _utils = __webpack_require__(77221);
var _normalizePathSep = __webpack_require__(48027);
function denormalizePagePath(page) {
    let _page = (0, _normalizePathSep).normalizePathSep(page);
    return _page.startsWith("/index/") && !(0, _utils).isDynamicRoute(_page) ? _page.slice(6) : _page !== "/index" ? _page : "/";
} //# sourceMappingURL=denormalize-page-path.js.map


/***/ }),

/***/ 40528:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.ensureLeadingSlash = ensureLeadingSlash;
function ensureLeadingSlash(path) {
    return path.startsWith("/") ? path : `/${path}`;
} //# sourceMappingURL=ensure-leading-slash.js.map


/***/ }),

/***/ 48027:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.normalizePathSep = normalizePathSep;
function normalizePathSep(path) {
    return path.replace(/\\/g, "/");
} //# sourceMappingURL=normalize-path-sep.js.map


/***/ }),

/***/ 38798:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.normalizeAppPath = normalizeAppPath;
exports.normalizeRscPath = normalizeRscPath;
var _ensureLeadingSlash = __webpack_require__(40528);
function normalizeAppPath(route) {
    return (0, _ensureLeadingSlash).ensureLeadingSlash(route.split("/").reduce((pathname, segment, index, segments)=>{
        // Empty segments are ignored.
        if (!segment) {
            return pathname;
        }
        // Groups are ignored.
        if (segment.startsWith("(") && segment.endsWith(")")) {
            return pathname;
        }
        // Parallel segments are ignored.
        if (segment.startsWith("@")) {
            return pathname;
        }
        // The last segment (if it's a leaf) should be ignored.
        if ((segment === "page" || segment === "route") && index === segments.length - 1) {
            return pathname;
        }
        return `${pathname}/${segment}`;
    }, ""));
}
function normalizeRscPath(pathname, enabled) {
    return enabled ? pathname.replace(/\.rsc($|\?)/, "$1") : pathname;
} //# sourceMappingURL=app-paths.js.map


/***/ }),

/***/ 77221:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "getSortedRoutes", ({
    enumerable: true,
    get: function() {
        return _sortedRoutes.getSortedRoutes;
    }
}));
Object.defineProperty(exports, "isDynamicRoute", ({
    enumerable: true,
    get: function() {
        return _isDynamic.isDynamicRoute;
    }
}));
var _sortedRoutes = __webpack_require__(93762);
var _isDynamic = __webpack_require__(23474); //# sourceMappingURL=index.js.map


/***/ }),

/***/ 23474:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.isDynamicRoute = isDynamicRoute;
// Identify /[param]/ in route string
const TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;
function isDynamicRoute(route) {
    return TEST_ROUTE.test(route);
} //# sourceMappingURL=is-dynamic.js.map


/***/ }),

/***/ 41265:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseRelativeUrl = parseRelativeUrl;
var _utils = __webpack_require__(78281);
var _querystring = __webpack_require__(48954);
function parseRelativeUrl(url, base) {
    const globalBase = new URL( true ? "http://n" : 0);
    const resolvedBase = base ? new URL(base, globalBase) : url.startsWith(".") ? new URL( true ? "http://n" : 0) : globalBase;
    const { pathname , searchParams , search , hash , href , origin  } = new URL(url, resolvedBase);
    if (origin !== globalBase.origin) {
        throw new Error(`invariant: invalid relative URL, router received ${url}`);
    }
    return {
        pathname,
        query: (0, _querystring).searchParamsToUrlQuery(searchParams),
        search,
        hash,
        href: href.slice(globalBase.origin.length)
    };
} //# sourceMappingURL=parse-relative-url.js.map


/***/ }),

/***/ 67437:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.parseUrl = parseUrl;
var _querystring = __webpack_require__(48954);
var _parseRelativeUrl = __webpack_require__(41265);
function parseUrl(url) {
    if (url.startsWith("/")) {
        return (0, _parseRelativeUrl).parseRelativeUrl(url);
    }
    const parsedURL = new URL(url);
    return {
        hash: parsedURL.hash,
        hostname: parsedURL.hostname,
        href: parsedURL.href,
        pathname: parsedURL.pathname,
        port: parsedURL.port,
        protocol: parsedURL.protocol,
        query: (0, _querystring).searchParamsToUrlQuery(parsedURL.searchParams),
        search: parsedURL.search
    };
} //# sourceMappingURL=parse-url.js.map


/***/ }),

/***/ 61819:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getPathMatch = getPathMatch;
var _extends = (__webpack_require__(85940)/* ["default"] */ .Z);
var _pathToRegexp = __webpack_require__(97999);
function getPathMatch(path, options) {
    const keys = [];
    const regexp = (0, _pathToRegexp).pathToRegexp(path, keys, {
        delimiter: "/",
        sensitive: false,
        strict: options == null ? void 0 : options.strict
    });
    const matcher = (0, _pathToRegexp).regexpToFunction((options == null ? void 0 : options.regexModifier) ? new RegExp(options.regexModifier(regexp.source), regexp.flags) : regexp, keys);
    /**
   * A matcher function that will check if a given pathname matches the path
   * given in the builder function. When the path does not match it will return
   * `false` but if it does it will return an object with the matched params
   * merged with the params provided in the second argument.
   */ return (pathname, params)=>{
        const res = pathname == null ? false : matcher(pathname);
        if (!res) {
            return false;
        }
        /**
     * If unnamed params are not allowed they must be removed from
     * the matched parameters. path-to-regexp uses "string" for named and
     * "number" for unnamed parameters.
     */ if (options == null ? void 0 : options.removeUnnamedParams) {
            for (const key of keys){
                if (typeof key.name === "number") {
                    delete res.params[key.name];
                }
            }
        }
        return _extends({}, params, res.params);
    };
} //# sourceMappingURL=path-match.js.map


/***/ }),

/***/ 30316:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.matchHas = matchHas;
exports.compileNonPath = compileNonPath;
exports.prepareDestination = prepareDestination;
var _extends = (__webpack_require__(85940)/* ["default"] */ .Z);
var _pathToRegexp = __webpack_require__(97999);
var _escapeRegexp = __webpack_require__(22431);
var _parseUrl = __webpack_require__(67437);
var _interceptionRoutes = __webpack_require__(96888);
/**
 * Ensure only a-zA-Z are used for param names for proper interpolating
 * with path-to-regexp
 */ function getSafeParamName(paramName) {
    let newParamName = "";
    for(let i = 0; i < paramName.length; i++){
        const charCode = paramName.charCodeAt(i);
        if (charCode > 64 && charCode < 91 || charCode > 96 && charCode < 123 // a-z
        ) {
            newParamName += paramName[i];
        }
    }
    return newParamName;
}
function escapeSegment(str, segmentName) {
    return str.replace(new RegExp(`:${(0, _escapeRegexp).escapeStringRegexp(segmentName)}`, "g"), `__ESC_COLON_${segmentName}`);
}
function unescapeSegments(str) {
    return str.replace(/__ESC_COLON_/gi, ":");
}
function matchHas(req, query, has = [], missing = []) {
    const params = {};
    const hasMatch = (hasItem)=>{
        let value;
        let key = hasItem.key;
        switch(hasItem.type){
            case "header":
                {
                    key = key.toLowerCase();
                    value = req.headers[key];
                    break;
                }
            case "cookie":
                {
                    value = req.cookies[hasItem.key];
                    break;
                }
            case "query":
                {
                    value = query[key];
                    break;
                }
            case "host":
                {
                    const { host  } = (req == null ? void 0 : req.headers) || {};
                    // remove port from host if present
                    const hostname = host == null ? void 0 : host.split(":")[0].toLowerCase();
                    value = hostname;
                    break;
                }
            default:
                {
                    break;
                }
        }
        if (!hasItem.value && value) {
            params[getSafeParamName(key)] = value;
            return true;
        } else if (value) {
            const matcher = new RegExp(`^${hasItem.value}$`);
            const matches = Array.isArray(value) ? value.slice(-1)[0].match(matcher) : value.match(matcher);
            if (matches) {
                if (Array.isArray(matches)) {
                    if (matches.groups) {
                        Object.keys(matches.groups).forEach((groupKey)=>{
                            params[groupKey] = matches.groups[groupKey];
                        });
                    } else if (hasItem.type === "host" && matches[0]) {
                        params.host = matches[0];
                    }
                }
                return true;
            }
        }
        return false;
    };
    const allMatch = has.every((item)=>hasMatch(item)) && !missing.some((item)=>hasMatch(item));
    if (allMatch) {
        return params;
    }
    return false;
}
function compileNonPath(value, params) {
    if (!value.includes(":")) {
        return value;
    }
    for (const key of Object.keys(params)){
        if (value.includes(`:${key}`)) {
            value = value.replace(new RegExp(`:${key}\\*`, "g"), `:${key}--ESCAPED_PARAM_ASTERISKS`).replace(new RegExp(`:${key}\\?`, "g"), `:${key}--ESCAPED_PARAM_QUESTION`).replace(new RegExp(`:${key}\\+`, "g"), `:${key}--ESCAPED_PARAM_PLUS`).replace(new RegExp(`:${key}(?!\\w)`, "g"), `--ESCAPED_PARAM_COLON${key}`);
        }
    }
    value = value.replace(/(:|\*|\?|\+|\(|\)|\{|\})/g, "\\$1").replace(/--ESCAPED_PARAM_PLUS/g, "+").replace(/--ESCAPED_PARAM_COLON/g, ":").replace(/--ESCAPED_PARAM_QUESTION/g, "?").replace(/--ESCAPED_PARAM_ASTERISKS/g, "*");
    // the value needs to start with a forward-slash to be compiled
    // correctly
    return (0, _pathToRegexp).compile(`/${value}`, {
        validate: false
    })(params).slice(1);
}
function prepareDestination(args) {
    const query = Object.assign({}, args.query);
    delete query.__nextLocale;
    delete query.__nextDefaultLocale;
    delete query.__nextDataReq;
    delete query.__nextInferredLocaleFromDefault;
    let escapedDestination = args.destination;
    for (const param of Object.keys(_extends({}, args.params, query))){
        escapedDestination = escapeSegment(escapedDestination, param);
    }
    const parsedDestination = (0, _parseUrl).parseUrl(escapedDestination);
    const destQuery = parsedDestination.query;
    const destPath = unescapeSegments(`${parsedDestination.pathname}${parsedDestination.hash || ""}`);
    const destHostname = unescapeSegments(parsedDestination.hostname || "");
    const destPathParamKeys = [];
    const destHostnameParamKeys = [];
    (0, _pathToRegexp).pathToRegexp(destPath, destPathParamKeys);
    (0, _pathToRegexp).pathToRegexp(destHostname, destHostnameParamKeys);
    const destParams = [];
    destPathParamKeys.forEach((key)=>destParams.push(key.name));
    destHostnameParamKeys.forEach((key)=>destParams.push(key.name));
    const destPathCompiler = (0, _pathToRegexp).compile(destPath, // have already validated before we got to this point and validating
    // breaks compiling destinations with named pattern params from the source
    // e.g. /something:hello(.*) -> /another/:hello is broken with validation
    // since compile validation is meant for reversing and not for inserting
    // params from a separate path-regex into another
    {
        validate: false
    });
    const destHostnameCompiler = (0, _pathToRegexp).compile(destHostname, {
        validate: false
    });
    // update any params in query values
    for (const [key1, strOrArray] of Object.entries(destQuery)){
        // the value needs to start with a forward-slash to be compiled
        // correctly
        if (Array.isArray(strOrArray)) {
            destQuery[key1] = strOrArray.map((value)=>compileNonPath(unescapeSegments(value), args.params));
        } else if (typeof strOrArray === "string") {
            destQuery[key1] = compileNonPath(unescapeSegments(strOrArray), args.params);
        }
    }
    // add path params to query if it's not a redirect and not
    // already defined in destination query or path
    let paramKeys = Object.keys(args.params).filter((name)=>name !== "nextInternalLocale");
    if (args.appendParamsToQuery && !paramKeys.some((key)=>destParams.includes(key))) {
        for (const key of paramKeys){
            if (!(key in destQuery)) {
                destQuery[key] = args.params[key];
            }
        }
    }
    let newUrl;
    // for interception routes we don't have access to the dynamic segments from the
    // referrer route so we mark them as noop for the app renderer so that it
    // can retrieve them from the router state later on. This also allows us to
    // compile the route properly with path-to-regexp, otherwise it will throw
    // The compiler also thinks that the interception route marker is an unnamed param, hence '0',
    // so we need to add it to the params object.
    if ((0, _interceptionRoutes).isInterceptionRouteAppPath(destPath)) {
        main: for (const segment of destPath.split("/")){
            for (const marker of _interceptionRoutes.INTERCEPTION_ROUTE_MARKERS){
                if (segment.startsWith(marker)) {
                    args.params["0"] = marker;
                    break main;
                }
            }
            if (segment.startsWith(":")) {
                const param = segment.slice(1);
                args.params[param] = "__NEXT_EMPTY_PARAM__";
            }
        }
    }
    try {
        newUrl = destPathCompiler(args.params);
        const [pathname, hash] = newUrl.split("#");
        parsedDestination.hostname = destHostnameCompiler(args.params);
        parsedDestination.pathname = pathname;
        parsedDestination.hash = `${hash ? "#" : ""}${hash || ""}`;
        delete parsedDestination.search;
    } catch (err) {
        if (err.message.match(/Expected .*? to not repeat, but got an array/)) {
            throw new Error(`To use a multi-match in the destination you must add \`*\` at the end of the param name to signify it should repeat. https://nextjs.org/docs/messages/invalid-multi-match`);
        }
        throw err;
    }
    // Query merge order lowest priority to highest
    // 1. initial URL query values
    // 2. path segment values
    // 3. destination specified query values
    parsedDestination.query = _extends({}, query, parsedDestination.query);
    return {
        newUrl,
        destQuery,
        parsedDestination
    };
} //# sourceMappingURL=prepare-destination.js.map


/***/ }),

/***/ 48954:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.searchParamsToUrlQuery = searchParamsToUrlQuery;
exports.urlQueryToSearchParams = urlQueryToSearchParams;
exports.assign = assign;
function searchParamsToUrlQuery(searchParams) {
    const query = {};
    searchParams.forEach((value, key)=>{
        if (typeof query[key] === "undefined") {
            query[key] = value;
        } else if (Array.isArray(query[key])) {
            query[key].push(value);
        } else {
            query[key] = [
                query[key],
                value
            ];
        }
    });
    return query;
}
function stringifyUrlQueryParam(param) {
    if (typeof param === "string" || typeof param === "number" && !isNaN(param) || typeof param === "boolean") {
        return String(param);
    } else {
        return "";
    }
}
function urlQueryToSearchParams(urlQuery) {
    const result = new URLSearchParams();
    Object.entries(urlQuery).forEach(([key, value])=>{
        if (Array.isArray(value)) {
            value.forEach((item)=>result.append(key, stringifyUrlQueryParam(item)));
        } else {
            result.set(key, stringifyUrlQueryParam(value));
        }
    });
    return result;
}
function assign(target, ...searchParamsList) {
    searchParamsList.forEach((searchParams)=>{
        Array.from(searchParams.keys()).forEach((key)=>target.delete(key));
        searchParams.forEach((value, key)=>target.append(key, value));
    });
    return target;
} //# sourceMappingURL=querystring.js.map


/***/ }),

/***/ 22063:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getRouteMatcher = getRouteMatcher;
var _utils = __webpack_require__(78281);
function getRouteMatcher({ re , groups  }) {
    return (pathname)=>{
        const routeMatch = re.exec(pathname);
        if (!routeMatch) {
            return false;
        }
        const decode = (param)=>{
            try {
                return decodeURIComponent(param);
            } catch (_) {
                throw new _utils.DecodeError("failed to decode param");
            }
        };
        const params = {};
        Object.keys(groups).forEach((slugName)=>{
            const g = groups[slugName];
            const m = routeMatch[g.pos];
            if (m !== undefined) {
                params[slugName] = ~m.indexOf("/") ? m.split("/").map((entry)=>decode(entry)) : g.repeat ? [
                    decode(m)
                ] : decode(m);
            }
        });
        return params;
    };
} //# sourceMappingURL=route-matcher.js.map


/***/ }),

/***/ 1937:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getRouteRegex = getRouteRegex;
exports.getNamedRouteRegex = getNamedRouteRegex;
exports.getNamedMiddlewareRegex = getNamedMiddlewareRegex;
var _extends = (__webpack_require__(85940)/* ["default"] */ .Z);
var _escapeRegexp = __webpack_require__(22431);
var _removeTrailingSlash = __webpack_require__(98454);
const NEXT_QUERY_PARAM_PREFIX = "nextParam";
/**
 * Parses a given parameter from a route to a data structure that can be used
 * to generate the parametrized route. Examples:
 *   - `[...slug]` -> `{ key: 'slug', repeat: true, optional: true }`
 *   - `...slug` -> `{ key: 'slug', repeat: true, optional: false }`
 *   - `[foo]` -> `{ key: 'foo', repeat: false, optional: true }`
 *   - `bar` -> `{ key: 'bar', repeat: false, optional: false }`
 */ function parseParameter(param) {
    const optional = param.startsWith("[") && param.endsWith("]");
    if (optional) {
        param = param.slice(1, -1);
    }
    const repeat = param.startsWith("...");
    if (repeat) {
        param = param.slice(3);
    }
    return {
        key: param,
        repeat,
        optional
    };
}
function getParametrizedRoute(route) {
    const segments = (0, _removeTrailingSlash).removeTrailingSlash(route).slice(1).split("/");
    const groups = {};
    let groupIndex = 1;
    return {
        parameterizedRoute: segments.map((segment)=>{
            if (segment.startsWith("[") && segment.endsWith("]")) {
                const { key , optional , repeat  } = parseParameter(segment.slice(1, -1));
                groups[key] = {
                    pos: groupIndex++,
                    repeat,
                    optional
                };
                return repeat ? optional ? "(?:/(.+?))?" : "/(.+?)" : "/([^/]+?)";
            } else {
                return `/${(0, _escapeRegexp).escapeStringRegexp(segment)}`;
            }
        }).join(""),
        groups
    };
}
function getRouteRegex(normalizedRoute) {
    const { parameterizedRoute , groups  } = getParametrizedRoute(normalizedRoute);
    return {
        re: new RegExp(`^${parameterizedRoute}(?:/)?$`),
        groups: groups
    };
}
/**
 * Builds a function to generate a minimal routeKey using only a-z and minimal
 * number of characters.
 */ function buildGetSafeRouteKey() {
    let routeKeyCharCode = 97;
    let routeKeyCharLength = 1;
    return ()=>{
        let routeKey = "";
        for(let i = 0; i < routeKeyCharLength; i++){
            routeKey += String.fromCharCode(routeKeyCharCode);
            routeKeyCharCode++;
            if (routeKeyCharCode > 122) {
                routeKeyCharLength++;
                routeKeyCharCode = 97;
            }
        }
        return routeKey;
    };
}
function getNamedParametrizedRoute(route, prefixRouteKeys) {
    const segments = (0, _removeTrailingSlash).removeTrailingSlash(route).slice(1).split("/");
    const getSafeRouteKey = buildGetSafeRouteKey();
    const routeKeys = {};
    return {
        namedParameterizedRoute: segments.map((segment)=>{
            if (segment.startsWith("[") && segment.endsWith("]")) {
                const { key , optional , repeat  } = parseParameter(segment.slice(1, -1));
                // replace any non-word characters since they can break
                // the named regex
                let cleanedKey = key.replace(/\W/g, "");
                let invalidKey = false;
                // check if the key is still invalid and fallback to using a known
                // safe key
                if (cleanedKey.length === 0 || cleanedKey.length > 30) {
                    invalidKey = true;
                }
                if (!isNaN(parseInt(cleanedKey.slice(0, 1)))) {
                    invalidKey = true;
                }
                if (invalidKey) {
                    cleanedKey = getSafeRouteKey();
                }
                if (prefixRouteKeys) {
                    cleanedKey = `${NEXT_QUERY_PARAM_PREFIX}${cleanedKey}`;
                    routeKeys[cleanedKey] = `${NEXT_QUERY_PARAM_PREFIX}${key}`;
                } else {
                    routeKeys[cleanedKey] = `${key}`;
                }
                return repeat ? optional ? `(?:/(?<${cleanedKey}>.+?))?` : `/(?<${cleanedKey}>.+?)` : `/(?<${cleanedKey}>[^/]+?)`;
            } else {
                return `/${(0, _escapeRegexp).escapeStringRegexp(segment)}`;
            }
        }).join(""),
        routeKeys
    };
}
function getNamedRouteRegex(normalizedRoute, prefixRouteKey) {
    const result = getNamedParametrizedRoute(normalizedRoute, prefixRouteKey);
    return _extends({}, getRouteRegex(normalizedRoute), {
        namedRegex: `^${result.namedParameterizedRoute}(?:/)?$`,
        routeKeys: result.routeKeys
    });
}
function getNamedMiddlewareRegex(normalizedRoute, options) {
    const { parameterizedRoute  } = getParametrizedRoute(normalizedRoute);
    const { catchAll =true  } = options;
    if (parameterizedRoute === "/") {
        let catchAllRegex = catchAll ? ".*" : "";
        return {
            namedRegex: `^/${catchAllRegex}$`
        };
    }
    const { namedParameterizedRoute  } = getNamedParametrizedRoute(normalizedRoute, false);
    let catchAllGroupedRegex = catchAll ? "(?:(/.*)?)" : "";
    return {
        namedRegex: `^${namedParameterizedRoute}${catchAllGroupedRegex}$`
    };
} //# sourceMappingURL=route-regex.js.map


/***/ }),

/***/ 93762:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getSortedRoutes = getSortedRoutes;
class UrlNode {
    insert(urlPath) {
        this._insert(urlPath.split("/").filter(Boolean), [], false);
    }
    smoosh() {
        return this._smoosh();
    }
    _smoosh(prefix = "/") {
        const childrenPaths = [
            ...this.children.keys()
        ].sort();
        if (this.slugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf("[]"), 1);
        }
        if (this.restSlugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf("[...]"), 1);
        }
        if (this.optionalRestSlugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf("[[...]]"), 1);
        }
        const routes = childrenPaths.map((c)=>this.children.get(c)._smoosh(`${prefix}${c}/`)).reduce((prev, curr)=>[
                ...prev,
                ...curr
            ], []);
        if (this.slugName !== null) {
            routes.push(...this.children.get("[]")._smoosh(`${prefix}[${this.slugName}]/`));
        }
        if (!this.placeholder) {
            const r = prefix === "/" ? "/" : prefix.slice(0, -1);
            if (this.optionalRestSlugName != null) {
                throw new Error(`You cannot define a route with the same specificity as a optional catch-all route ("${r}" and "${r}[[...${this.optionalRestSlugName}]]").`);
            }
            routes.unshift(r);
        }
        if (this.restSlugName !== null) {
            routes.push(...this.children.get("[...]")._smoosh(`${prefix}[...${this.restSlugName}]/`));
        }
        if (this.optionalRestSlugName !== null) {
            routes.push(...this.children.get("[[...]]")._smoosh(`${prefix}[[...${this.optionalRestSlugName}]]/`));
        }
        return routes;
    }
    _insert(urlPaths, slugNames, isCatchAll) {
        if (urlPaths.length === 0) {
            this.placeholder = false;
            return;
        }
        if (isCatchAll) {
            throw new Error(`Catch-all must be the last part of the URL.`);
        }
        // The next segment in the urlPaths list
        let nextSegment = urlPaths[0];
        // Check if the segment matches `[something]`
        if (nextSegment.startsWith("[") && nextSegment.endsWith("]")) {
            // Strip `[` and `]`, leaving only `something`
            let segmentName = nextSegment.slice(1, -1);
            let isOptional = false;
            if (segmentName.startsWith("[") && segmentName.endsWith("]")) {
                // Strip optional `[` and `]`, leaving only `something`
                segmentName = segmentName.slice(1, -1);
                isOptional = true;
            }
            if (segmentName.startsWith("...")) {
                // Strip `...`, leaving only `something`
                segmentName = segmentName.substring(3);
                isCatchAll = true;
            }
            if (segmentName.startsWith("[") || segmentName.endsWith("]")) {
                throw new Error(`Segment names may not start or end with extra brackets ('${segmentName}').`);
            }
            if (segmentName.startsWith(".")) {
                throw new Error(`Segment names may not start with erroneous periods ('${segmentName}').`);
            }
            function handleSlug(previousSlug, nextSlug) {
                if (previousSlug !== null) {
                    // If the specific segment already has a slug but the slug is not `something`
                    // This prevents collisions like:
                    // pages/[post]/index.js
                    // pages/[id]/index.js
                    // Because currently multiple dynamic params on the same segment level are not supported
                    if (previousSlug !== nextSlug) {
                        // TODO: This error seems to be confusing for users, needs an error link, the description can be based on above comment.
                        throw new Error(`You cannot use different slug names for the same dynamic path ('${previousSlug}' !== '${nextSlug}').`);
                    }
                }
                slugNames.forEach((slug)=>{
                    if (slug === nextSlug) {
                        throw new Error(`You cannot have the same slug name "${nextSlug}" repeat within a single dynamic path`);
                    }
                    if (slug.replace(/\W/g, "") === nextSegment.replace(/\W/g, "")) {
                        throw new Error(`You cannot have the slug names "${slug}" and "${nextSlug}" differ only by non-word symbols within a single dynamic path`);
                    }
                });
                slugNames.push(nextSlug);
            }
            if (isCatchAll) {
                if (isOptional) {
                    if (this.restSlugName != null) {
                        throw new Error(`You cannot use both an required and optional catch-all route at the same level ("[...${this.restSlugName}]" and "${urlPaths[0]}" ).`);
                    }
                    handleSlug(this.optionalRestSlugName, segmentName);
                    // slugName is kept as it can only be one particular slugName
                    this.optionalRestSlugName = segmentName;
                    // nextSegment is overwritten to [[...]] so that it can later be sorted specifically
                    nextSegment = "[[...]]";
                } else {
                    if (this.optionalRestSlugName != null) {
                        throw new Error(`You cannot use both an optional and required catch-all route at the same level ("[[...${this.optionalRestSlugName}]]" and "${urlPaths[0]}").`);
                    }
                    handleSlug(this.restSlugName, segmentName);
                    // slugName is kept as it can only be one particular slugName
                    this.restSlugName = segmentName;
                    // nextSegment is overwritten to [...] so that it can later be sorted specifically
                    nextSegment = "[...]";
                }
            } else {
                if (isOptional) {
                    throw new Error(`Optional route parameters are not yet supported ("${urlPaths[0]}").`);
                }
                handleSlug(this.slugName, segmentName);
                // slugName is kept as it can only be one particular slugName
                this.slugName = segmentName;
                // nextSegment is overwritten to [] so that it can later be sorted specifically
                nextSegment = "[]";
            }
        }
        // If this UrlNode doesn't have the nextSegment yet we create a new child UrlNode
        if (!this.children.has(nextSegment)) {
            this.children.set(nextSegment, new UrlNode());
        }
        this.children.get(nextSegment)._insert(urlPaths.slice(1), slugNames, isCatchAll);
    }
    constructor(){
        this.placeholder = true;
        this.children = new Map();
        this.slugName = null;
        this.restSlugName = null;
        this.optionalRestSlugName = null;
    }
}
function getSortedRoutes(normalizedPages) {
    // First the UrlNode is created, and every UrlNode can have only 1 dynamic segment
    // Eg you can't have pages/[post]/abc.js and pages/[hello]/something-else.js
    // Only 1 dynamic segment per nesting level
    // So in the case that is test/integration/dynamic-routing it'll be this:
    // pages/[post]/comments.js
    // pages/blog/[post]/comment/[id].js
    // Both are fine because `pages/[post]` and `pages/blog` are on the same level
    // So in this case `UrlNode` created here has `this.slugName === 'post'`
    // And since your PR passed through `slugName` as an array basically it'd including it in too many possibilities
    // Instead what has to be passed through is the upwards path's dynamic names
    const root = new UrlNode();
    // Here the `root` gets injected multiple paths, and insert will break them up into sublevels
    normalizedPages.forEach((pagePath)=>root.insert(pagePath));
    // Smoosh will then sort those sublevels up to the point where you get the correct route definition priority
    return root.smoosh();
} //# sourceMappingURL=sorted-routes.js.map


/***/ }),

/***/ 59483:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(59204)


/***/ }),

/***/ 95400:
/***/ ((module) => {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 23482:
/***/ ((module) => {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 95295:
/***/ ((module) => {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 76954:
/***/ ((module) => {

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
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
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

/***/ 7432:
/***/ ((module) => {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 5816:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var setPrototypeOf = __webpack_require__(85199);
var isNativeReflectConstruct = __webpack_require__(49665);
function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
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

/***/ 46063:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPropertyKey = __webpack_require__(64183);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
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

/***/ 75166:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPropertyKey = __webpack_require__(64183);
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

/***/ 9224:
/***/ ((module) => {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _getPrototypeOf(o);
}
module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 14287:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var setPrototypeOf = __webpack_require__(85199);
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

/***/ 27574:
/***/ ((module) => {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 16647:
/***/ ((module) => {

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
module.exports = _isNativeFunction, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 49665:
/***/ ((module) => {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 66304:
/***/ ((module) => {

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 16686:
/***/ ((module) => {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 67943:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(50426)["default"]);
var assertThisInitialized = __webpack_require__(95295);
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

/***/ 35701:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(50426)["default"]);
function _regeneratorRuntime() {
  "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
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
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
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
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
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
    var methodName = context.method,
      method = delegate.iterator[methodName];
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
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
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
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
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
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
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
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
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
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
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

/***/ 85199:
/***/ ((module) => {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 31974:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayWithHoles = __webpack_require__(23482);
var iterableToArrayLimit = __webpack_require__(66304);
var unsupportedIterableToArray = __webpack_require__(97322);
var nonIterableRest = __webpack_require__(16686);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 34020:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(50426)["default"]);
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

/***/ 64183:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(50426)["default"]);
var toPrimitive = __webpack_require__(34020);
function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 50426:
/***/ ((module) => {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 97322:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeToArray = __webpack_require__(95400);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 21669:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getPrototypeOf = __webpack_require__(9224);
var setPrototypeOf = __webpack_require__(85199);
var isNativeFunction = __webpack_require__(16647);
var construct = __webpack_require__(5816);
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

/***/ 71299:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(35701)();
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


/***/ })

};
;