"use strict";
(() => {
var exports = {};
exports.id = 604;
exports.ids = [604];
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

/***/ 9523:
/***/ ((module) => {

module.exports = require("dns");

/***/ }),

/***/ 82361:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 57147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 13685:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 85158:
/***/ ((module) => {

module.exports = require("http2");

/***/ }),

/***/ 95687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 41808:
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ 22037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 71017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 63477:
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ 12781:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 24404:
/***/ ((module) => {

module.exports = require("tls");

/***/ }),

/***/ 57310:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 73837:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 59796:
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ 57881:
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

// NAMESPACE OBJECT: ./src/app/api/messages/[messageId]/events/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  "GET": () => (GET)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(76145);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(19532);
// EXTERNAL MODULE: ./node_modules/next-auth/jwt/index.js
var jwt = __webpack_require__(31314);
// EXTERNAL MODULE: ./node_modules/@grpc/grpc-js/build/src/index.js
var src = __webpack_require__(44201);
// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(71017);
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);
// EXTERNAL MODULE: ./node_modules/@grpc/proto-loader/build/src/index.js
var build_src = __webpack_require__(92856);
;// CONCATENATED MODULE: ./src/grpc/client.ts



const packageDefinition = build_src/* loadSync */.J_(external_path_default().resolve(process.cwd(), "proto", "chat.proto"));
const proto = src/* loadPackageDefinition */.Rz(packageDefinition);
const chatClient = new proto.pb.ChatService("localhost:50052", src/* credentials.createInsecure */.K9.createInsecure());


;// CONCATENATED MODULE: ./src/grpc/chat-service-client.ts


class ChatServiceClient {
    constructor(chatClient){
        this.chatClient = chatClient;
        this.authorization = "123456";
    }
    chatStream(data) {
        const metadata = new src/* Metadata */.SF();
        metadata.set("authorization", this.authorization);
        const stream = this.chatClient.chatStream({
            chatId: data.chat_id,
            userId: data.user_id,
            userMessage: data.message
        }, metadata);
        return stream;
    }
}
class ChatServiceClientFactory {
    static create() {
        return new ChatServiceClient(chatClient);
    }
}


// EXTERNAL MODULE: ./src/lib/prisma.ts
var prisma = __webpack_require__(18022);
;// CONCATENATED MODULE: ./src/app/api/messages/[messageId]/events/route.ts



async function GET(request, { params  }) {
    let messageReceived = null;
    const transformStream = new TransformStream();
    const writer = transformStream.writable.getWriter();
    const token = await (0,jwt.getToken)({
        req: request
    });
    if (!token) {
        setTimeout(async ()=>{
            writeStream(writer, "error", "Unauthenticated");
            await writer.close();
        }, 100);
        return response(transformStream, 401);
    }
    const message = await prisma/* prisma.message.findUniqueOrThrow */._.message.findUniqueOrThrow({
        where: {
            id: params.messageId
        },
        include: {
            chat: true
        }
    });
    if (message.chat.user_id !== token.sub) {
        setTimeout(async ()=>{
            writeStream(writer, "error", "Chat not found");
            await writer.close();
        }, 100);
        return response(transformStream, 404);
    }
    if (message.has_answered) {
        setTimeout(async ()=>{
            writeStream(writer, "error", "Message already answered");
            await writer.close();
        }, 100);
        return response(transformStream, 403);
    }
    if (message.is_from_bot) {
        setTimeout(async ()=>{
            writeStream(writer, "error", "Message from bot");
            await writer.close();
        }, 100);
        return response(transformStream, 403);
    }
    const chatService = ChatServiceClientFactory.create();
    const stream = chatService.chatStream({
        user_id: "1",
        chat_id: message.chat.remote_chat_id ?? undefined,
        message: message.content
    });
    stream.on("data", (data)=>{
        messageReceived = data;
        writeStream(writer, "message", data);
    });
    stream.on("error", async (error)=>{
        writeStream(writer, "error", error.message);
        await writer.close();
    });
    stream.on("end", async ()=>{
        console.log("END");
        if (!messageReceived) {
            writeStream(writer, "message", "No message receive");
            await writer.close();
            return;
        }
        const [newMessage] = await prisma/* prisma.$transaction */._.$transaction([
            prisma/* prisma.message.create */._.message.create({
                data: {
                    content: messageReceived.content,
                    chat_id: message.chat_id,
                    has_answered: true,
                    is_from_bot: true
                }
            }),
            prisma/* prisma.chat.update */._.chat.update({
                where: {
                    id: message.chat_id
                },
                data: {
                    remote_chat_id: messageReceived.chatId
                }
            }),
            prisma/* prisma.message.update */._.message.update({
                where: {
                    id: message.id
                },
                data: {
                    has_answered: true
                }
            })
        ]);
        writeStream(writer, "end", newMessage);
        await writer.close();
    });
    return response(transformStream);
}
function response(responseStream, status = 200) {
    return new Response(responseStream.readable, {
        status,
        headers: {
            "Content-Type": "text/event-stream",
            Connection: "keep-alive",
            "Cache-Control": "no-cache, no-transform"
        }
    });
}
function writeStream(writer, event, data) {
    const encoder = new TextEncoder();
    writer.write(encoder.encode(`event: ${event}\n`));
    writer.write(encoder.encode(`id: ${new Date().getTime()}\n`));
    const streamData = typeof data === "string" ? data : JSON.stringify(data);
    writer.write(encoder.encode(`data: ${streamData}\n\n`));
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fmessages%2F%5BmessageId%5D%2Fevents%2Froute&name=app%2Fapi%2Fmessages%2F%5BmessageId%5D%2Fevents%2Froute&pagePath=private-next-app-dir%2Fapi%2Fmessages%2F%5BmessageId%5D%2Fevents%2Froute.ts&appDir=%2FUsers%2Fanishbista%2Fchatbot-app%2Fchat%2Fsrc%2Fapp&appPaths=%2Fapi%2Fmessages%2F%5BmessageId%5D%2Fevents%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&assetPrefix=&nextConfigOutput=!

    

    

    

    const routeModule = new app_route_module/* default */.ZP({
    userland: route_namespaceObject,
    pathname: "/api/messages/[messageId]/events",
    resolvedPagePath: "/Users/anishbista/chatbot-app/chat/src/app/api/messages/[messageId]/events/route.ts",
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

    

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [271,314,601,201,22], () => (__webpack_exec__(57881)));
module.exports = __webpack_exports__;

})();