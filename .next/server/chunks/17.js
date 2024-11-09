exports.id = 17;
exports.ids = [17];
exports.modules = {

/***/ 66268:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SessionProvider": () => (/* binding */ SessionProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(63370);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_1__);


const SessionProvider = ({ session , children  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_auth_react__WEBPACK_IMPORTED_MODULE_1__.SessionProvider, {
        session: session,
        children: children
    });
};



/***/ }),

/***/ 79537:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 67144, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 77914, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 65110, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 23682, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 31390, 23))

/***/ }),

/***/ 28551:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 66268))

/***/ }),

/***/ 16960:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ layout),
  "metadata": () => (/* binding */ metadata)
});

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(83146);
// EXTERNAL MODULE: ./src/styles/global.css
var global = __webpack_require__(71063);
// EXTERNAL MODULE: ./node_modules/next-auth/index.js
var next_auth = __webpack_require__(88354);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(35985);
;// CONCATENATED MODULE: ./src/providers/SessionProvider.tsx

const proxy = (0,module_proxy.createProxy)("/Users/anishbista/chatbot-app/chat/src/providers/SessionProvider.tsx")

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
/* harmony default export */ const SessionProvider = (proxy.default);

const e0 = proxy["SessionProvider"];

;// CONCATENATED MODULE: ./src/app/layout.tsx




const metadata = {
    title: "Chatbot App",
    description: "This application is a Chatbot that uses the OpenAI API to maintain a conversation, it has an interface similar to ChatGPT itself."
};
const RootLayout = async ({ children  })=>{
    const session = await (0,next_auth.getServerSession)();
    return /*#__PURE__*/ jsx_runtime.jsx("html", {
        lang: "en",
        children: /*#__PURE__*/ jsx_runtime.jsx("body", {
            children: /*#__PURE__*/ jsx_runtime.jsx(e0, {
                session: session,
                children: children
            })
        })
    });
};
/* harmony default export */ const layout = (RootLayout);


/***/ }),

/***/ 11193:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_shared_lib_isomorphic_path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23854);
/* harmony import */ var next_dist_shared_lib_isomorphic_path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_isomorphic_path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_server_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20459);
/* harmony import */ var next_dist_shared_lib_router_utils_route_regex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(93869);
/* harmony import */ var next_dist_shared_lib_router_utils_route_regex__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_router_utils_route_regex__WEBPACK_IMPORTED_MODULE_2__);
  
  
  

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props) => {
    const pathname = "/"
    const routeRegex = (0,next_dist_shared_lib_router_utils_route_regex__WEBPACK_IMPORTED_MODULE_2__.getNamedRouteRegex)(pathname, false)
    const route = (0,next_dist_server_server_utils__WEBPACK_IMPORTED_MODULE_1__/* .interpolateDynamicPath */ .oE)(pathname, props.params, routeRegex)

    const imageData = {"type":"image/x-icon","sizes":"any"};

    return {
      ...imageData,
      url: next_dist_shared_lib_isomorphic_path__WEBPACK_IMPORTED_MODULE_0___default().join(route, "favicon.ico" + ""),
    }
  });

/***/ }),

/***/ 71063:
/***/ (() => {



/***/ })

};
;