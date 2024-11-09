"use strict";
exports.id = 425;
exports.ids = [425];
exports.modules = {

/***/ 53425:
/***/ ((__unused_webpack_module, exports) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
exports.Z = Keycloak;
function Keycloak(options) {
    return {
        id: "keycloak",
        name: "Keycloak",
        wellKnown: `${options.issuer}/.well-known/openid-configuration`,
        type: "oauth",
        authorization: {
            params: {
                scope: "openid email profile"
            }
        },
        checks: [
            "pkce",
            "state"
        ],
        idToken: true,
        profile (profile) {
            var _profile$name;
            return {
                id: profile.sub,
                name: (_profile$name = profile.name) !== null && _profile$name !== void 0 ? _profile$name : profile.preferred_username,
                email: profile.email,
                image: profile.picture
            };
        },
        style: {
            logo: "/keycloak.svg",
            logoDark: "/keycloak.svg",
            bg: "#fff",
            text: "#000",
            bgDark: "#fff",
            textDark: "#000"
        },
        options
    };
}


/***/ })

};
;