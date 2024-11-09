"use strict";
(() => {
var exports = {};
exports.id = 938;
exports.ids = [938];
exports.modules = {

/***/ 53524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 97783:
/***/ ((module) => {

module.exports = require("next/dist/compiled/@edge-runtime/cookies");

/***/ }),

/***/ 28530:
/***/ ((module) => {

module.exports = require("next/dist/compiled/@opentelemetry/api");

/***/ }),

/***/ 35547:
/***/ ((module) => {

module.exports = require("next/dist/compiled/bytes");

/***/ }),

/***/ 54426:
/***/ ((module) => {

module.exports = require("next/dist/compiled/chalk");

/***/ }),

/***/ 74929:
/***/ ((module) => {

module.exports = require("next/dist/compiled/content-type");

/***/ }),

/***/ 40252:
/***/ ((module) => {

module.exports = require("next/dist/compiled/cookie");

/***/ }),

/***/ 47664:
/***/ ((module) => {

module.exports = require("next/dist/compiled/fresh");

/***/ }),

/***/ 45644:
/***/ ((module) => {

module.exports = require("next/dist/compiled/jsonwebtoken");

/***/ }),

/***/ 27798:
/***/ ((module) => {

module.exports = require("next/dist/compiled/raw-body");

/***/ }),

/***/ 14300:
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 82361:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 13685:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 95687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 63477:
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ 12781:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 73837:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 59796:
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ 37855:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "headerHooks": () => (/* binding */ headerHooks),
  "requestAsyncStorage": () => (/* binding */ requestAsyncStorage),
  "routeModule": () => (/* binding */ routeModule),
  "serverHooks": () => (/* binding */ serverHooks),
  "staticGenerationAsyncStorage": () => (/* binding */ staticGenerationAsyncStorage),
  "staticGenerationBailout": () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./src/app/api/chats/[chatId]/messages/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  "GET": () => (GET),
  "POST": () => (POST)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(76145);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(19532);
// EXTERNAL MODULE: ./node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(83804);
// EXTERNAL MODULE: ./src/app/api/helpers.ts
var helpers = __webpack_require__(87430);
// EXTERNAL MODULE: ./src/lib/prisma.ts
var prisma = __webpack_require__(18022);
;// CONCATENATED MODULE: ./src/app/api/chats/[chatId]/messages/route.ts



const GET = (0,helpers/* withAuth */.Q)(async (_request, token, { params  })=>{
    const chat = await prisma/* prisma.chat.findFirstOrThrow */._.chat.findFirstOrThrow({
        where: {
            id: params.chatId
        }
    });
    if (chat.user_id !== token.sub) {
        return next_response/* default.json */.Z.json({
            error: "Chat not found"
        }, {
            status: 404
        });
    }
    const messages = await prisma/* prisma.message.findMany */._.message.findMany({
        where: {
            chat_id: params.chatId
        },
        orderBy: {
            created_at: "asc"
        }
    });
    return next_response/* default.json */.Z.json(messages);
});
const POST = (0,helpers/* withAuth */.Q)(async (request, token, { params  })=>{
    const chat = await prisma/* prisma.chat.findUniqueOrThrow */._.chat.findUniqueOrThrow({
        where: {
            id: params.chatId
        }
    });
    if (chat.user_id !== token.sub) {
        return next_response/* default.json */.Z.json({
            error: "Chat not found"
        }, {
            status: 404
        });
    }
    const body = await request.json();
    const messageCreated = await prisma/* prisma.message.create */._.message.create({
        data: {
            chat_id: chat.id,
            content: body.message
        }
    });
    return next_response/* default.json */.Z.json(messageCreated);
});

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fchats%2F%5BchatId%5D%2Fmessages%2Froute&name=app%2Fapi%2Fchats%2F%5BchatId%5D%2Fmessages%2Froute&pagePath=private-next-app-dir%2Fapi%2Fchats%2F%5BchatId%5D%2Fmessages%2Froute.ts&appDir=%2FUsers%2Fanishbista%2Fchatbot-app%2Fchat%2Fsrc%2Fapp&appPaths=%2Fapi%2Fchats%2F%5BchatId%5D%2Fmessages%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&assetPrefix=&nextConfigOutput=!

    

    

    

    const routeModule = new app_route_module/* default */.ZP({
    userland: route_namespaceObject,
    pathname: "/api/chats/[chatId]/messages",
    resolvedPagePath: "/Users/anishbista/chatbot-app/chat/src/app/api/chats/[chatId]/messages/route.ts",
    nextConfigOutput: undefined,
  })

    // Pull out the exports that we need to expose from the module. This should
    // be eliminated when we've moved the other routes to the new format. These
    // are used to hook into the route.
    const {
      requestAsyncStorage,
      staticGenerationAsyncStorage,
      serverHooks,
      headerHooks,
      staticGenerationBailout
    } = routeModule

    

/***/ }),

/***/ 83804:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "Z", ({
    enumerable: true,
    get: function() {
        return _response.NextResponse;
    }
}));
var _response = __webpack_require__(66843); //# sourceMappingURL=next-response.js.map


/***/ }),

/***/ 87430:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Q": () => (/* binding */ withAuth)
/* harmony export */ });
/* harmony import */ var next_auth_jwt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31314);
/* harmony import */ var next_auth_jwt__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth_jwt__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(83804);


function withAuth(routeHandler) {
    return async (request, config)=>{
        const token = await (0,next_auth_jwt__WEBPACK_IMPORTED_MODULE_0__.getToken)({
            req: request
        });
        if (!token) {
            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_1__/* ["default"].json */ .Z.json({
                error: "Not Authenticated"
            }, {
                status: 401
            });
        }
        return routeHandler(request, token, config);
    };
}



/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [271,314,601,843,22], () => (__webpack_exec__(37855)));
module.exports = __webpack_exports__;

})();