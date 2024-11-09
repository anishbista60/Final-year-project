"use strict";
exports.id = 201;
exports.ids = [201];
exports.modules = {

/***/ 75173:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright 2021 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.addAdminServicesToServer = exports.registerAdminService = void 0;
const registeredAdminServices = [];
function registerAdminService(getServiceDefinition, getHandlers) {
    registeredAdminServices.push({
        getServiceDefinition,
        getHandlers
    });
}
exports.registerAdminService = registerAdminService;
function addAdminServicesToServer(server) {
    for (const { getServiceDefinition , getHandlers  } of registeredAdminServices){
        server.addService(getServiceDefinition(), getHandlers());
    }
}
exports.addAdminServicesToServer = addAdminServicesToServer; //# sourceMappingURL=admin.js.map


/***/ }),

/***/ 22308:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.BackoffTimeout = void 0;
const INITIAL_BACKOFF_MS = 1000;
const BACKOFF_MULTIPLIER = 1.6;
const MAX_BACKOFF_MS = 120000;
const BACKOFF_JITTER = 0.2;
/**
 * Get a number uniformly at random in the range [min, max)
 * @param min
 * @param max
 */ function uniformRandom(min, max) {
    return Math.random() * (max - min) + min;
}
class BackoffTimeout {
    constructor(callback, options){
        this.callback = callback;
        /**
         * The delay time at the start, and after each reset.
         */ this.initialDelay = INITIAL_BACKOFF_MS;
        /**
         * The exponential backoff multiplier.
         */ this.multiplier = BACKOFF_MULTIPLIER;
        /**
         * The maximum delay time
         */ this.maxDelay = MAX_BACKOFF_MS;
        /**
         * The maximum fraction by which the delay time can randomly vary after
         * applying the multiplier.
         */ this.jitter = BACKOFF_JITTER;
        /**
         * Indicates whether the timer is currently running.
         */ this.running = false;
        /**
         * Indicates whether the timer should keep the Node process running if no
         * other async operation is doing so.
         */ this.hasRef = true;
        /**
         * The time that the currently running timer was started. Only valid if
         * running is true.
         */ this.startTime = new Date();
        if (options) {
            if (options.initialDelay) {
                this.initialDelay = options.initialDelay;
            }
            if (options.multiplier) {
                this.multiplier = options.multiplier;
            }
            if (options.jitter) {
                this.jitter = options.jitter;
            }
            if (options.maxDelay) {
                this.maxDelay = options.maxDelay;
            }
        }
        this.nextDelay = this.initialDelay;
        this.timerId = setTimeout(()=>{}, 0);
        clearTimeout(this.timerId);
    }
    runTimer(delay) {
        var _a, _b;
        clearTimeout(this.timerId);
        this.timerId = setTimeout(()=>{
            this.callback();
            this.running = false;
        }, delay);
        if (!this.hasRef) {
            (_b = (_a = this.timerId).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
    }
    /**
     * Call the callback after the current amount of delay time
     */ runOnce() {
        this.running = true;
        this.startTime = new Date();
        this.runTimer(this.nextDelay);
        const nextBackoff = Math.min(this.nextDelay * this.multiplier, this.maxDelay);
        const jitterMagnitude = nextBackoff * this.jitter;
        this.nextDelay = nextBackoff + uniformRandom(-jitterMagnitude, jitterMagnitude);
    }
    /**
     * Stop the timer. The callback will not be called until `runOnce` is called
     * again.
     */ stop() {
        clearTimeout(this.timerId);
        this.running = false;
    }
    /**
     * Reset the delay time to its initial value. If the timer is still running,
     * retroactively apply that reset to the current timer.
     */ reset() {
        this.nextDelay = this.initialDelay;
        if (this.running) {
            const now = new Date();
            const newEndTime = this.startTime;
            newEndTime.setMilliseconds(newEndTime.getMilliseconds() + this.nextDelay);
            clearTimeout(this.timerId);
            if (now < newEndTime) {
                this.runTimer(newEndTime.getTime() - now.getTime());
            } else {
                this.running = false;
            }
        }
    }
    /**
     * Check whether the timer is currently running.
     */ isRunning() {
        return this.running;
    }
    /**
     * Set that while the timer is running, it should keep the Node process
     * running.
     */ ref() {
        var _a, _b;
        this.hasRef = true;
        (_b = (_a = this.timerId).ref) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    /**
     * Set that while the timer is running, it should not keep the Node process
     * running.
     */ unref() {
        var _a, _b;
        this.hasRef = false;
        (_b = (_a = this.timerId).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
}
exports.BackoffTimeout = BackoffTimeout; //# sourceMappingURL=backoff-timeout.js.map


/***/ }),

/***/ 25919:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.CallCredentials = void 0;
const metadata_1 = __webpack_require__(39637);
function isCurrentOauth2Client(client) {
    return "getRequestHeaders" in client && typeof client.getRequestHeaders === "function";
}
/**
 * A class that represents a generic method of adding authentication-related
 * metadata on a per-request basis.
 */ class CallCredentials {
    /**
     * Creates a new CallCredentials object from a given function that generates
     * Metadata objects.
     * @param metadataGenerator A function that accepts a set of options, and
     * generates a Metadata object based on these options, which is passed back
     * to the caller via a supplied (err, metadata) callback.
     */ static createFromMetadataGenerator(metadataGenerator) {
        return new SingleCallCredentials(metadataGenerator);
    }
    /**
     * Create a gRPC credential from a Google credential object.
     * @param googleCredentials The authentication client to use.
     * @return The resulting CallCredentials object.
     */ static createFromGoogleCredential(googleCredentials) {
        return CallCredentials.createFromMetadataGenerator((options, callback)=>{
            let getHeaders;
            if (isCurrentOauth2Client(googleCredentials)) {
                getHeaders = googleCredentials.getRequestHeaders(options.service_url);
            } else {
                getHeaders = new Promise((resolve, reject)=>{
                    googleCredentials.getRequestMetadata(options.service_url, (err, headers)=>{
                        if (err) {
                            reject(err);
                            return;
                        }
                        if (!headers) {
                            reject(new Error("Headers not set by metadata plugin"));
                            return;
                        }
                        resolve(headers);
                    });
                });
            }
            getHeaders.then((headers)=>{
                const metadata = new metadata_1.Metadata();
                for (const key of Object.keys(headers)){
                    metadata.add(key, headers[key]);
                }
                callback(null, metadata);
            }, (err)=>{
                callback(err);
            });
        });
    }
    static createEmpty() {
        return new EmptyCallCredentials();
    }
}
exports.CallCredentials = CallCredentials;
class ComposedCallCredentials extends CallCredentials {
    constructor(creds){
        super();
        this.creds = creds;
    }
    async generateMetadata(options) {
        const base = new metadata_1.Metadata();
        const generated = await Promise.all(this.creds.map((cred)=>cred.generateMetadata(options)));
        for (const gen of generated){
            base.merge(gen);
        }
        return base;
    }
    compose(other) {
        return new ComposedCallCredentials(this.creds.concat([
            other
        ]));
    }
    _equals(other) {
        if (this === other) {
            return true;
        }
        if (other instanceof ComposedCallCredentials) {
            return this.creds.every((value, index)=>value._equals(other.creds[index]));
        } else {
            return false;
        }
    }
}
class SingleCallCredentials extends CallCredentials {
    constructor(metadataGenerator){
        super();
        this.metadataGenerator = metadataGenerator;
    }
    generateMetadata(options) {
        return new Promise((resolve, reject)=>{
            this.metadataGenerator(options, (err, metadata)=>{
                if (metadata !== undefined) {
                    resolve(metadata);
                } else {
                    reject(err);
                }
            });
        });
    }
    compose(other) {
        return new ComposedCallCredentials([
            this,
            other
        ]);
    }
    _equals(other) {
        if (this === other) {
            return true;
        }
        if (other instanceof SingleCallCredentials) {
            return this.metadataGenerator === other.metadataGenerator;
        } else {
            return false;
        }
    }
}
class EmptyCallCredentials extends CallCredentials {
    generateMetadata(options) {
        return Promise.resolve(new metadata_1.Metadata());
    }
    compose(other) {
        return other;
    }
    _equals(other) {
        return other instanceof EmptyCallCredentials;
    }
} //# sourceMappingURL=call-credentials.js.map


/***/ }),

/***/ 75496:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright 2022 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.InterceptingListenerImpl = exports.isInterceptingListener = void 0;
function isInterceptingListener(listener) {
    return listener.onReceiveMetadata !== undefined && listener.onReceiveMetadata.length === 1;
}
exports.isInterceptingListener = isInterceptingListener;
class InterceptingListenerImpl {
    constructor(listener, nextListener){
        this.listener = listener;
        this.nextListener = nextListener;
        this.processingMetadata = false;
        this.hasPendingMessage = false;
        this.processingMessage = false;
        this.pendingStatus = null;
    }
    processPendingMessage() {
        if (this.hasPendingMessage) {
            this.nextListener.onReceiveMessage(this.pendingMessage);
            this.pendingMessage = null;
            this.hasPendingMessage = false;
        }
    }
    processPendingStatus() {
        if (this.pendingStatus) {
            this.nextListener.onReceiveStatus(this.pendingStatus);
        }
    }
    onReceiveMetadata(metadata) {
        this.processingMetadata = true;
        this.listener.onReceiveMetadata(metadata, (metadata)=>{
            this.processingMetadata = false;
            this.nextListener.onReceiveMetadata(metadata);
            this.processPendingMessage();
            this.processPendingStatus();
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onReceiveMessage(message) {
        /* If this listener processes messages asynchronously, the last message may
          * be reordered with respect to the status */ this.processingMessage = true;
        this.listener.onReceiveMessage(message, (msg)=>{
            this.processingMessage = false;
            if (this.processingMetadata) {
                this.pendingMessage = msg;
                this.hasPendingMessage = true;
            } else {
                this.nextListener.onReceiveMessage(msg);
                this.processPendingStatus();
            }
        });
    }
    onReceiveStatus(status) {
        this.listener.onReceiveStatus(status, (processedStatus)=>{
            if (this.processingMetadata || this.processingMessage) {
                this.pendingStatus = processedStatus;
            } else {
                this.nextListener.onReceiveStatus(processedStatus);
            }
        });
    }
}
exports.InterceptingListenerImpl = InterceptingListenerImpl; //# sourceMappingURL=call-interface.js.map


/***/ }),

/***/ 26095:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright 2022 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getNextCallNumber = void 0;
let nextCallNumber = 0;
function getNextCallNumber() {
    return nextCallNumber++;
}
exports.getNextCallNumber = getNextCallNumber; //# sourceMappingURL=call-number.js.map


/***/ }),

/***/ 36271:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.ClientDuplexStreamImpl = exports.ClientWritableStreamImpl = exports.ClientReadableStreamImpl = exports.ClientUnaryCallImpl = exports.callErrorFromStatus = void 0;
const events_1 = __webpack_require__(82361);
const stream_1 = __webpack_require__(12781);
const constants_1 = __webpack_require__(60076);
/**
 * Construct a ServiceError from a StatusObject. This function exists primarily
 * as an attempt to make the error stack trace clearly communicate that the
 * error is not necessarily a problem in gRPC itself.
 * @param status
 */ function callErrorFromStatus(status, callerStack) {
    const message = `${status.code} ${constants_1.Status[status.code]}: ${status.details}`;
    const error = new Error(message);
    const stack = `${error.stack}\nfor call at\n${callerStack}`;
    return Object.assign(new Error(message), status, {
        stack
    });
}
exports.callErrorFromStatus = callErrorFromStatus;
class ClientUnaryCallImpl extends events_1.EventEmitter {
    constructor(){
        super();
    }
    cancel() {
        var _a;
        (_a = this.call) === null || _a === void 0 ? void 0 : _a.cancelWithStatus(constants_1.Status.CANCELLED, "Cancelled on client");
    }
    getPeer() {
        var _a, _b;
        return (_b = (_a = this.call) === null || _a === void 0 ? void 0 : _a.getPeer()) !== null && _b !== void 0 ? _b : "unknown";
    }
}
exports.ClientUnaryCallImpl = ClientUnaryCallImpl;
class ClientReadableStreamImpl extends stream_1.Readable {
    constructor(deserialize){
        super({
            objectMode: true
        });
        this.deserialize = deserialize;
    }
    cancel() {
        var _a;
        (_a = this.call) === null || _a === void 0 ? void 0 : _a.cancelWithStatus(constants_1.Status.CANCELLED, "Cancelled on client");
    }
    getPeer() {
        var _a, _b;
        return (_b = (_a = this.call) === null || _a === void 0 ? void 0 : _a.getPeer()) !== null && _b !== void 0 ? _b : "unknown";
    }
    _read(_size) {
        var _a;
        (_a = this.call) === null || _a === void 0 ? void 0 : _a.startRead();
    }
}
exports.ClientReadableStreamImpl = ClientReadableStreamImpl;
class ClientWritableStreamImpl extends stream_1.Writable {
    constructor(serialize){
        super({
            objectMode: true
        });
        this.serialize = serialize;
    }
    cancel() {
        var _a;
        (_a = this.call) === null || _a === void 0 ? void 0 : _a.cancelWithStatus(constants_1.Status.CANCELLED, "Cancelled on client");
    }
    getPeer() {
        var _a, _b;
        return (_b = (_a = this.call) === null || _a === void 0 ? void 0 : _a.getPeer()) !== null && _b !== void 0 ? _b : "unknown";
    }
    _write(chunk, encoding, cb) {
        var _a;
        const context = {
            callback: cb
        };
        const flags = Number(encoding);
        if (!Number.isNaN(flags)) {
            context.flags = flags;
        }
        (_a = this.call) === null || _a === void 0 ? void 0 : _a.sendMessageWithContext(context, chunk);
    }
    _final(cb) {
        var _a;
        (_a = this.call) === null || _a === void 0 ? void 0 : _a.halfClose();
        cb();
    }
}
exports.ClientWritableStreamImpl = ClientWritableStreamImpl;
class ClientDuplexStreamImpl extends stream_1.Duplex {
    constructor(serialize, deserialize){
        super({
            objectMode: true
        });
        this.serialize = serialize;
        this.deserialize = deserialize;
    }
    cancel() {
        var _a;
        (_a = this.call) === null || _a === void 0 ? void 0 : _a.cancelWithStatus(constants_1.Status.CANCELLED, "Cancelled on client");
    }
    getPeer() {
        var _a, _b;
        return (_b = (_a = this.call) === null || _a === void 0 ? void 0 : _a.getPeer()) !== null && _b !== void 0 ? _b : "unknown";
    }
    _read(_size) {
        var _a;
        (_a = this.call) === null || _a === void 0 ? void 0 : _a.startRead();
    }
    _write(chunk, encoding, cb) {
        var _a;
        const context = {
            callback: cb
        };
        const flags = Number(encoding);
        if (!Number.isNaN(flags)) {
            context.flags = flags;
        }
        (_a = this.call) === null || _a === void 0 ? void 0 : _a.sendMessageWithContext(context, chunk);
    }
    _final(cb) {
        var _a;
        (_a = this.call) === null || _a === void 0 ? void 0 : _a.halfClose();
        cb();
    }
}
exports.ClientDuplexStreamImpl = ClientDuplexStreamImpl; //# sourceMappingURL=call.js.map


/***/ }),

/***/ 66878:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.ChannelCredentials = void 0;
const tls_1 = __webpack_require__(24404);
const call_credentials_1 = __webpack_require__(25919);
const tls_helpers_1 = __webpack_require__(29883);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function verifyIsBufferOrNull(obj, friendlyName) {
    if (obj && !(obj instanceof Buffer)) {
        throw new TypeError(`${friendlyName}, if provided, must be a Buffer.`);
    }
}
function bufferOrNullEqual(buf1, buf2) {
    if (buf1 === null && buf2 === null) {
        return true;
    } else {
        return buf1 !== null && buf2 !== null && buf1.equals(buf2);
    }
}
/**
 * A class that contains credentials for communicating over a channel, as well
 * as a set of per-call credentials, which are applied to every method call made
 * over a channel initialized with an instance of this class.
 */ class ChannelCredentials {
    constructor(callCredentials){
        this.callCredentials = callCredentials || call_credentials_1.CallCredentials.createEmpty();
    }
    /**
     * Gets the set of per-call credentials associated with this instance.
     */ _getCallCredentials() {
        return this.callCredentials;
    }
    /**
     * Return a new ChannelCredentials instance with a given set of credentials.
     * The resulting instance can be used to construct a Channel that communicates
     * over TLS.
     * @param rootCerts The root certificate data.
     * @param privateKey The client certificate private key, if available.
     * @param certChain The client certificate key chain, if available.
     * @param verifyOptions Additional options to modify certificate verification
     */ static createSsl(rootCerts, privateKey, certChain, verifyOptions) {
        var _a;
        verifyIsBufferOrNull(rootCerts, "Root certificate");
        verifyIsBufferOrNull(privateKey, "Private key");
        verifyIsBufferOrNull(certChain, "Certificate chain");
        if (privateKey && !certChain) {
            throw new Error("Private key must be given with accompanying certificate chain");
        }
        if (!privateKey && certChain) {
            throw new Error("Certificate chain must be given with accompanying private key");
        }
        const secureContext = (0, tls_1.createSecureContext)({
            ca: (_a = rootCerts !== null && rootCerts !== void 0 ? rootCerts : (0, tls_helpers_1.getDefaultRootsData)()) !== null && _a !== void 0 ? _a : undefined,
            key: privateKey !== null && privateKey !== void 0 ? privateKey : undefined,
            cert: certChain !== null && certChain !== void 0 ? certChain : undefined,
            ciphers: tls_helpers_1.CIPHER_SUITES
        });
        return new SecureChannelCredentialsImpl(secureContext, verifyOptions !== null && verifyOptions !== void 0 ? verifyOptions : {});
    }
    /**
     * Return a new ChannelCredentials instance with credentials created using
     * the provided secureContext. The resulting instances can be used to
     * construct a Channel that communicates over TLS. gRPC will not override
     * anything in the provided secureContext, so the environment variables
     * GRPC_SSL_CIPHER_SUITES and GRPC_DEFAULT_SSL_ROOTS_FILE_PATH will
     * not be applied.
     * @param secureContext The return value of tls.createSecureContext()
     * @param verifyOptions Additional options to modify certificate verification
     */ static createFromSecureContext(secureContext, verifyOptions) {
        return new SecureChannelCredentialsImpl(secureContext, verifyOptions !== null && verifyOptions !== void 0 ? verifyOptions : {});
    }
    /**
     * Return a new ChannelCredentials instance with no credentials.
     */ static createInsecure() {
        return new InsecureChannelCredentialsImpl();
    }
}
exports.ChannelCredentials = ChannelCredentials;
class InsecureChannelCredentialsImpl extends ChannelCredentials {
    constructor(callCredentials){
        super(callCredentials);
    }
    compose(callCredentials) {
        throw new Error("Cannot compose insecure credentials");
    }
    _getConnectionOptions() {
        return null;
    }
    _isSecure() {
        return false;
    }
    _equals(other) {
        return other instanceof InsecureChannelCredentialsImpl;
    }
}
class SecureChannelCredentialsImpl extends ChannelCredentials {
    constructor(secureContext, verifyOptions){
        super();
        this.secureContext = secureContext;
        this.verifyOptions = verifyOptions;
        this.connectionOptions = {
            secureContext
        };
        // Node asserts that this option is a function, so we cannot pass undefined
        if (verifyOptions === null || verifyOptions === void 0 ? void 0 : verifyOptions.checkServerIdentity) {
            this.connectionOptions.checkServerIdentity = verifyOptions.checkServerIdentity;
        }
    }
    compose(callCredentials) {
        const combinedCallCredentials = this.callCredentials.compose(callCredentials);
        return new ComposedChannelCredentialsImpl(this, combinedCallCredentials);
    }
    _getConnectionOptions() {
        // Copy to prevent callers from mutating this.connectionOptions
        return Object.assign({}, this.connectionOptions);
    }
    _isSecure() {
        return true;
    }
    _equals(other) {
        if (this === other) {
            return true;
        }
        if (other instanceof SecureChannelCredentialsImpl) {
            return this.secureContext === other.secureContext && this.verifyOptions.checkServerIdentity === other.verifyOptions.checkServerIdentity;
        } else {
            return false;
        }
    }
}
class ComposedChannelCredentialsImpl extends ChannelCredentials {
    constructor(channelCredentials, callCreds){
        super(callCreds);
        this.channelCredentials = channelCredentials;
    }
    compose(callCredentials) {
        const combinedCallCredentials = this.callCredentials.compose(callCredentials);
        return new ComposedChannelCredentialsImpl(this.channelCredentials, combinedCallCredentials);
    }
    _getConnectionOptions() {
        return this.channelCredentials._getConnectionOptions();
    }
    _isSecure() {
        return true;
    }
    _equals(other) {
        if (this === other) {
            return true;
        }
        if (other instanceof ComposedChannelCredentialsImpl) {
            return this.channelCredentials._equals(other.channelCredentials) && this.callCredentials._equals(other.callCredentials);
        } else {
            return false;
        }
    }
} //# sourceMappingURL=channel-credentials.js.map


/***/ }),

/***/ 66527:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.channelOptionsEqual = exports.recognizedOptions = void 0;
/**
 * This is for checking provided options at runtime. This is an object for
 * easier membership checking.
 */ exports.recognizedOptions = {
    "grpc.ssl_target_name_override": true,
    "grpc.primary_user_agent": true,
    "grpc.secondary_user_agent": true,
    "grpc.default_authority": true,
    "grpc.keepalive_time_ms": true,
    "grpc.keepalive_timeout_ms": true,
    "grpc.keepalive_permit_without_calls": true,
    "grpc.service_config": true,
    "grpc.max_concurrent_streams": true,
    "grpc.initial_reconnect_backoff_ms": true,
    "grpc.max_reconnect_backoff_ms": true,
    "grpc.use_local_subchannel_pool": true,
    "grpc.max_send_message_length": true,
    "grpc.max_receive_message_length": true,
    "grpc.enable_http_proxy": true,
    "grpc.enable_channelz": true,
    "grpc.dns_min_time_between_resolutions_ms": true,
    "grpc.enable_retries": true,
    "grpc.per_rpc_retry_buffer_size": true,
    "grpc.retry_buffer_size": true,
    "grpc.max_connection_age_ms": true,
    "grpc.max_connection_age_grace_ms": true,
    "grpc-node.max_session_memory": true,
    "grpc.service_config_disable_resolution": true
};
function channelOptionsEqual(options1, options2) {
    const keys1 = Object.keys(options1).sort();
    const keys2 = Object.keys(options2).sort();
    if (keys1.length !== keys2.length) {
        return false;
    }
    for(let i = 0; i < keys1.length; i += 1){
        if (keys1[i] !== keys2[i]) {
            return false;
        }
        if (options1[keys1[i]] !== options2[keys2[i]]) {
            return false;
        }
    }
    return true;
}
exports.channelOptionsEqual = channelOptionsEqual; //# sourceMappingURL=channel-options.js.map


/***/ }),

/***/ 20991:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.ChannelImplementation = void 0;
const channel_credentials_1 = __webpack_require__(66878);
const internal_channel_1 = __webpack_require__(94964);
class ChannelImplementation {
    constructor(target, credentials, options){
        if (typeof target !== "string") {
            throw new TypeError("Channel target must be a string");
        }
        if (!(credentials instanceof channel_credentials_1.ChannelCredentials)) {
            throw new TypeError("Channel credentials must be a ChannelCredentials object");
        }
        if (options) {
            if (typeof options !== "object") {
                throw new TypeError("Channel options must be an object");
            }
        }
        this.internalChannel = new internal_channel_1.InternalChannel(target, credentials, options);
    }
    close() {
        this.internalChannel.close();
    }
    getTarget() {
        return this.internalChannel.getTarget();
    }
    getConnectivityState(tryToConnect) {
        return this.internalChannel.getConnectivityState(tryToConnect);
    }
    watchConnectivityState(currentState, deadline, callback) {
        this.internalChannel.watchConnectivityState(currentState, deadline, callback);
    }
    /**
     * Get the channelz reference object for this channel. The returned value is
     * garbage if channelz is disabled for this channel.
     * @returns
     */ getChannelzRef() {
        return this.internalChannel.getChannelzRef();
    }
    createCall(method, deadline, host, parentCall, propagateFlags) {
        if (typeof method !== "string") {
            throw new TypeError("Channel#createCall: method must be a string");
        }
        if (!(typeof deadline === "number" || deadline instanceof Date)) {
            throw new TypeError("Channel#createCall: deadline must be a number or Date");
        }
        return this.internalChannel.createCall(method, deadline, host, parentCall, propagateFlags);
    }
}
exports.ChannelImplementation = ChannelImplementation; //# sourceMappingURL=channel.js.map


/***/ }),

/***/ 18949:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2021 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.setup = exports.getChannelzServiceDefinition = exports.getChannelzHandlers = exports.unregisterChannelzRef = exports.registerChannelzSocket = exports.registerChannelzServer = exports.registerChannelzSubchannel = exports.registerChannelzChannel = exports.ChannelzCallTracker = exports.ChannelzChildrenTracker = exports.ChannelzTrace = void 0;
const net_1 = __webpack_require__(41808);
const connectivity_state_1 = __webpack_require__(16035);
const constants_1 = __webpack_require__(60076);
const subchannel_address_1 = __webpack_require__(27631);
const admin_1 = __webpack_require__(75173);
const make_client_1 = __webpack_require__(4585);
function channelRefToMessage(ref) {
    return {
        channel_id: ref.id,
        name: ref.name
    };
}
function subchannelRefToMessage(ref) {
    return {
        subchannel_id: ref.id,
        name: ref.name
    };
}
function serverRefToMessage(ref) {
    return {
        server_id: ref.id
    };
}
function socketRefToMessage(ref) {
    return {
        socket_id: ref.id,
        name: ref.name
    };
}
/**
 * The loose upper bound on the number of events that should be retained in a
 * trace. This may be exceeded by up to a factor of 2. Arbitrarily chosen as a
 * number that should be large enough to contain the recent relevant
 * information, but small enough to not use excessive memory.
 */ const TARGET_RETAINED_TRACES = 32;
class ChannelzTrace {
    constructor(){
        this.events = [];
        this.eventsLogged = 0;
        this.creationTimestamp = new Date();
    }
    addTrace(severity, description, child) {
        const timestamp = new Date();
        this.events.push({
            description: description,
            severity: severity,
            timestamp: timestamp,
            childChannel: (child === null || child === void 0 ? void 0 : child.kind) === "channel" ? child : undefined,
            childSubchannel: (child === null || child === void 0 ? void 0 : child.kind) === "subchannel" ? child : undefined
        });
        // Whenever the trace array gets too large, discard the first half
        if (this.events.length >= TARGET_RETAINED_TRACES * 2) {
            this.events = this.events.slice(TARGET_RETAINED_TRACES);
        }
        this.eventsLogged += 1;
    }
    getTraceMessage() {
        return {
            creation_timestamp: dateToProtoTimestamp(this.creationTimestamp),
            num_events_logged: this.eventsLogged,
            events: this.events.map((event)=>{
                return {
                    description: event.description,
                    severity: event.severity,
                    timestamp: dateToProtoTimestamp(event.timestamp),
                    channel_ref: event.childChannel ? channelRefToMessage(event.childChannel) : null,
                    subchannel_ref: event.childSubchannel ? subchannelRefToMessage(event.childSubchannel) : null
                };
            })
        };
    }
}
exports.ChannelzTrace = ChannelzTrace;
class ChannelzChildrenTracker {
    constructor(){
        this.channelChildren = new Map();
        this.subchannelChildren = new Map();
        this.socketChildren = new Map();
    }
    refChild(child) {
        var _a, _b, _c;
        switch(child.kind){
            case "channel":
                {
                    let trackedChild = (_a = this.channelChildren.get(child.id)) !== null && _a !== void 0 ? _a : {
                        ref: child,
                        count: 0
                    };
                    trackedChild.count += 1;
                    this.channelChildren.set(child.id, trackedChild);
                    break;
                }
            case "subchannel":
                {
                    let trackedChild = (_b = this.subchannelChildren.get(child.id)) !== null && _b !== void 0 ? _b : {
                        ref: child,
                        count: 0
                    };
                    trackedChild.count += 1;
                    this.subchannelChildren.set(child.id, trackedChild);
                    break;
                }
            case "socket":
                {
                    let trackedChild = (_c = this.socketChildren.get(child.id)) !== null && _c !== void 0 ? _c : {
                        ref: child,
                        count: 0
                    };
                    trackedChild.count += 1;
                    this.socketChildren.set(child.id, trackedChild);
                    break;
                }
        }
    }
    unrefChild(child) {
        switch(child.kind){
            case "channel":
                {
                    let trackedChild = this.channelChildren.get(child.id);
                    if (trackedChild !== undefined) {
                        trackedChild.count -= 1;
                        if (trackedChild.count === 0) {
                            this.channelChildren.delete(child.id);
                        } else {
                            this.channelChildren.set(child.id, trackedChild);
                        }
                    }
                    break;
                }
            case "subchannel":
                {
                    let trackedChild = this.subchannelChildren.get(child.id);
                    if (trackedChild !== undefined) {
                        trackedChild.count -= 1;
                        if (trackedChild.count === 0) {
                            this.subchannelChildren.delete(child.id);
                        } else {
                            this.subchannelChildren.set(child.id, trackedChild);
                        }
                    }
                    break;
                }
            case "socket":
                {
                    let trackedChild = this.socketChildren.get(child.id);
                    if (trackedChild !== undefined) {
                        trackedChild.count -= 1;
                        if (trackedChild.count === 0) {
                            this.socketChildren.delete(child.id);
                        } else {
                            this.socketChildren.set(child.id, trackedChild);
                        }
                    }
                    break;
                }
        }
    }
    getChildLists() {
        const channels = [];
        for (const { ref  } of this.channelChildren.values()){
            channels.push(ref);
        }
        const subchannels = [];
        for (const { ref  } of this.subchannelChildren.values()){
            subchannels.push(ref);
        }
        const sockets = [];
        for (const { ref  } of this.socketChildren.values()){
            sockets.push(ref);
        }
        return {
            channels,
            subchannels,
            sockets
        };
    }
}
exports.ChannelzChildrenTracker = ChannelzChildrenTracker;
class ChannelzCallTracker {
    constructor(){
        this.callsStarted = 0;
        this.callsSucceeded = 0;
        this.callsFailed = 0;
        this.lastCallStartedTimestamp = null;
    }
    addCallStarted() {
        this.callsStarted += 1;
        this.lastCallStartedTimestamp = new Date();
    }
    addCallSucceeded() {
        this.callsSucceeded += 1;
    }
    addCallFailed() {
        this.callsFailed += 1;
    }
}
exports.ChannelzCallTracker = ChannelzCallTracker;
let nextId = 1;
function getNextId() {
    return nextId++;
}
const channels = [];
const subchannels = [];
const servers = [];
const sockets = [];
function registerChannelzChannel(name, getInfo, channelzEnabled) {
    const id = getNextId();
    const ref = {
        id,
        name,
        kind: "channel"
    };
    if (channelzEnabled) {
        channels[id] = {
            ref,
            getInfo
        };
    }
    return ref;
}
exports.registerChannelzChannel = registerChannelzChannel;
function registerChannelzSubchannel(name, getInfo, channelzEnabled) {
    const id = getNextId();
    const ref = {
        id,
        name,
        kind: "subchannel"
    };
    if (channelzEnabled) {
        subchannels[id] = {
            ref,
            getInfo
        };
    }
    return ref;
}
exports.registerChannelzSubchannel = registerChannelzSubchannel;
function registerChannelzServer(getInfo, channelzEnabled) {
    const id = getNextId();
    const ref = {
        id,
        kind: "server"
    };
    if (channelzEnabled) {
        servers[id] = {
            ref,
            getInfo
        };
    }
    return ref;
}
exports.registerChannelzServer = registerChannelzServer;
function registerChannelzSocket(name, getInfo, channelzEnabled) {
    const id = getNextId();
    const ref = {
        id,
        name,
        kind: "socket"
    };
    if (channelzEnabled) {
        sockets[id] = {
            ref,
            getInfo
        };
    }
    return ref;
}
exports.registerChannelzSocket = registerChannelzSocket;
function unregisterChannelzRef(ref) {
    switch(ref.kind){
        case "channel":
            delete channels[ref.id];
            return;
        case "subchannel":
            delete subchannels[ref.id];
            return;
        case "server":
            delete servers[ref.id];
            return;
        case "socket":
            delete sockets[ref.id];
            return;
    }
}
exports.unregisterChannelzRef = unregisterChannelzRef;
/**
 * Parse a single section of an IPv6 address as two bytes
 * @param addressSection A hexadecimal string of length up to 4
 * @returns The pair of bytes representing this address section
 */ function parseIPv6Section(addressSection) {
    const numberValue = Number.parseInt(addressSection, 16);
    return [
        numberValue / 256 | 0,
        numberValue % 256
    ];
}
/**
 * Parse a chunk of an IPv6 address string to some number of bytes
 * @param addressChunk Some number of segments of up to 4 hexadecimal
 *   characters each, joined by colons.
 * @returns The list of bytes representing this address chunk
 */ function parseIPv6Chunk(addressChunk) {
    if (addressChunk === "") {
        return [];
    }
    const bytePairs = addressChunk.split(":").map((section)=>parseIPv6Section(section));
    const result = [];
    return result.concat(...bytePairs);
}
/**
 * Converts an IPv4 or IPv6 address from string representation to binary
 * representation
 * @param ipAddress an IP address in standard IPv4 or IPv6 text format
 * @returns
 */ function ipAddressStringToBuffer(ipAddress) {
    if ((0, net_1.isIPv4)(ipAddress)) {
        return Buffer.from(Uint8Array.from(ipAddress.split(".").map((segment)=>Number.parseInt(segment))));
    } else if ((0, net_1.isIPv6)(ipAddress)) {
        let leftSection;
        let rightSection;
        const doubleColonIndex = ipAddress.indexOf("::");
        if (doubleColonIndex === -1) {
            leftSection = ipAddress;
            rightSection = "";
        } else {
            leftSection = ipAddress.substring(0, doubleColonIndex);
            rightSection = ipAddress.substring(doubleColonIndex + 2);
        }
        const leftBuffer = Buffer.from(parseIPv6Chunk(leftSection));
        const rightBuffer = Buffer.from(parseIPv6Chunk(rightSection));
        const middleBuffer = Buffer.alloc(16 - leftBuffer.length - rightBuffer.length, 0);
        return Buffer.concat([
            leftBuffer,
            middleBuffer,
            rightBuffer
        ]);
    } else {
        return null;
    }
}
function connectivityStateToMessage(state) {
    switch(state){
        case connectivity_state_1.ConnectivityState.CONNECTING:
            return {
                state: "CONNECTING"
            };
        case connectivity_state_1.ConnectivityState.IDLE:
            return {
                state: "IDLE"
            };
        case connectivity_state_1.ConnectivityState.READY:
            return {
                state: "READY"
            };
        case connectivity_state_1.ConnectivityState.SHUTDOWN:
            return {
                state: "SHUTDOWN"
            };
        case connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE:
            return {
                state: "TRANSIENT_FAILURE"
            };
        default:
            return {
                state: "UNKNOWN"
            };
    }
}
function dateToProtoTimestamp(date) {
    if (!date) {
        return null;
    }
    const millisSinceEpoch = date.getTime();
    return {
        seconds: millisSinceEpoch / 1000 | 0,
        nanos: millisSinceEpoch % 1000 * 1000000
    };
}
function getChannelMessage(channelEntry) {
    const resolvedInfo = channelEntry.getInfo();
    return {
        ref: channelRefToMessage(channelEntry.ref),
        data: {
            target: resolvedInfo.target,
            state: connectivityStateToMessage(resolvedInfo.state),
            calls_started: resolvedInfo.callTracker.callsStarted,
            calls_succeeded: resolvedInfo.callTracker.callsSucceeded,
            calls_failed: resolvedInfo.callTracker.callsFailed,
            last_call_started_timestamp: dateToProtoTimestamp(resolvedInfo.callTracker.lastCallStartedTimestamp),
            trace: resolvedInfo.trace.getTraceMessage()
        },
        channel_ref: resolvedInfo.children.channels.map((ref)=>channelRefToMessage(ref)),
        subchannel_ref: resolvedInfo.children.subchannels.map((ref)=>subchannelRefToMessage(ref))
    };
}
function GetChannel(call, callback) {
    const channelId = Number.parseInt(call.request.channel_id);
    const channelEntry = channels[channelId];
    if (channelEntry === undefined) {
        callback({
            "code": constants_1.Status.NOT_FOUND,
            "details": "No channel data found for id " + channelId
        });
        return;
    }
    callback(null, {
        channel: getChannelMessage(channelEntry)
    });
}
function GetTopChannels(call, callback) {
    const maxResults = Number.parseInt(call.request.max_results);
    const resultList = [];
    let i = Number.parseInt(call.request.start_channel_id);
    for(; i < channels.length; i++){
        const channelEntry = channels[i];
        if (channelEntry === undefined) {
            continue;
        }
        resultList.push(getChannelMessage(channelEntry));
        if (resultList.length >= maxResults) {
            break;
        }
    }
    callback(null, {
        channel: resultList,
        end: i >= servers.length
    });
}
function getServerMessage(serverEntry) {
    const resolvedInfo = serverEntry.getInfo();
    return {
        ref: serverRefToMessage(serverEntry.ref),
        data: {
            calls_started: resolvedInfo.callTracker.callsStarted,
            calls_succeeded: resolvedInfo.callTracker.callsSucceeded,
            calls_failed: resolvedInfo.callTracker.callsFailed,
            last_call_started_timestamp: dateToProtoTimestamp(resolvedInfo.callTracker.lastCallStartedTimestamp),
            trace: resolvedInfo.trace.getTraceMessage()
        },
        listen_socket: resolvedInfo.listenerChildren.sockets.map((ref)=>socketRefToMessage(ref))
    };
}
function GetServer(call, callback) {
    const serverId = Number.parseInt(call.request.server_id);
    const serverEntry = servers[serverId];
    if (serverEntry === undefined) {
        callback({
            "code": constants_1.Status.NOT_FOUND,
            "details": "No server data found for id " + serverId
        });
        return;
    }
    callback(null, {
        server: getServerMessage(serverEntry)
    });
}
function GetServers(call, callback) {
    const maxResults = Number.parseInt(call.request.max_results);
    const resultList = [];
    let i = Number.parseInt(call.request.start_server_id);
    for(; i < servers.length; i++){
        const serverEntry = servers[i];
        if (serverEntry === undefined) {
            continue;
        }
        resultList.push(getServerMessage(serverEntry));
        if (resultList.length >= maxResults) {
            break;
        }
    }
    callback(null, {
        server: resultList,
        end: i >= servers.length
    });
}
function GetSubchannel(call, callback) {
    const subchannelId = Number.parseInt(call.request.subchannel_id);
    const subchannelEntry = subchannels[subchannelId];
    if (subchannelEntry === undefined) {
        callback({
            "code": constants_1.Status.NOT_FOUND,
            "details": "No subchannel data found for id " + subchannelId
        });
        return;
    }
    const resolvedInfo = subchannelEntry.getInfo();
    const subchannelMessage = {
        ref: subchannelRefToMessage(subchannelEntry.ref),
        data: {
            target: resolvedInfo.target,
            state: connectivityStateToMessage(resolvedInfo.state),
            calls_started: resolvedInfo.callTracker.callsStarted,
            calls_succeeded: resolvedInfo.callTracker.callsSucceeded,
            calls_failed: resolvedInfo.callTracker.callsFailed,
            last_call_started_timestamp: dateToProtoTimestamp(resolvedInfo.callTracker.lastCallStartedTimestamp),
            trace: resolvedInfo.trace.getTraceMessage()
        },
        socket_ref: resolvedInfo.children.sockets.map((ref)=>socketRefToMessage(ref))
    };
    callback(null, {
        subchannel: subchannelMessage
    });
}
function subchannelAddressToAddressMessage(subchannelAddress) {
    var _a;
    if ((0, subchannel_address_1.isTcpSubchannelAddress)(subchannelAddress)) {
        return {
            address: "tcpip_address",
            tcpip_address: {
                ip_address: (_a = ipAddressStringToBuffer(subchannelAddress.host)) !== null && _a !== void 0 ? _a : undefined,
                port: subchannelAddress.port
            }
        };
    } else {
        return {
            address: "uds_address",
            uds_address: {
                filename: subchannelAddress.path
            }
        };
    }
}
function GetSocket(call, callback) {
    var _a, _b, _c, _d, _e;
    const socketId = Number.parseInt(call.request.socket_id);
    const socketEntry = sockets[socketId];
    if (socketEntry === undefined) {
        callback({
            "code": constants_1.Status.NOT_FOUND,
            "details": "No socket data found for id " + socketId
        });
        return;
    }
    const resolvedInfo = socketEntry.getInfo();
    const securityMessage = resolvedInfo.security ? {
        model: "tls",
        tls: {
            cipher_suite: resolvedInfo.security.cipherSuiteStandardName ? "standard_name" : "other_name",
            standard_name: (_a = resolvedInfo.security.cipherSuiteStandardName) !== null && _a !== void 0 ? _a : undefined,
            other_name: (_b = resolvedInfo.security.cipherSuiteOtherName) !== null && _b !== void 0 ? _b : undefined,
            local_certificate: (_c = resolvedInfo.security.localCertificate) !== null && _c !== void 0 ? _c : undefined,
            remote_certificate: (_d = resolvedInfo.security.remoteCertificate) !== null && _d !== void 0 ? _d : undefined
        }
    } : null;
    const socketMessage = {
        ref: socketRefToMessage(socketEntry.ref),
        local: resolvedInfo.localAddress ? subchannelAddressToAddressMessage(resolvedInfo.localAddress) : null,
        remote: resolvedInfo.remoteAddress ? subchannelAddressToAddressMessage(resolvedInfo.remoteAddress) : null,
        remote_name: (_e = resolvedInfo.remoteName) !== null && _e !== void 0 ? _e : undefined,
        security: securityMessage,
        data: {
            keep_alives_sent: resolvedInfo.keepAlivesSent,
            streams_started: resolvedInfo.streamsStarted,
            streams_succeeded: resolvedInfo.streamsSucceeded,
            streams_failed: resolvedInfo.streamsFailed,
            last_local_stream_created_timestamp: dateToProtoTimestamp(resolvedInfo.lastLocalStreamCreatedTimestamp),
            last_remote_stream_created_timestamp: dateToProtoTimestamp(resolvedInfo.lastRemoteStreamCreatedTimestamp),
            messages_received: resolvedInfo.messagesReceived,
            messages_sent: resolvedInfo.messagesSent,
            last_message_received_timestamp: dateToProtoTimestamp(resolvedInfo.lastMessageReceivedTimestamp),
            last_message_sent_timestamp: dateToProtoTimestamp(resolvedInfo.lastMessageSentTimestamp),
            local_flow_control_window: resolvedInfo.localFlowControlWindow ? {
                value: resolvedInfo.localFlowControlWindow
            } : null,
            remote_flow_control_window: resolvedInfo.remoteFlowControlWindow ? {
                value: resolvedInfo.remoteFlowControlWindow
            } : null
        }
    };
    callback(null, {
        socket: socketMessage
    });
}
function GetServerSockets(call, callback) {
    const serverId = Number.parseInt(call.request.server_id);
    const serverEntry = servers[serverId];
    if (serverEntry === undefined) {
        callback({
            "code": constants_1.Status.NOT_FOUND,
            "details": "No server data found for id " + serverId
        });
        return;
    }
    const startId = Number.parseInt(call.request.start_socket_id);
    const maxResults = Number.parseInt(call.request.max_results);
    const resolvedInfo = serverEntry.getInfo();
    // If we wanted to include listener sockets in the result, this line would
    // instead say
    // const allSockets = resolvedInfo.listenerChildren.sockets.concat(resolvedInfo.sessionChildren.sockets).sort((ref1, ref2) => ref1.id - ref2.id);
    const allSockets = resolvedInfo.sessionChildren.sockets.sort((ref1, ref2)=>ref1.id - ref2.id);
    const resultList = [];
    let i = 0;
    for(; i < allSockets.length; i++){
        if (allSockets[i].id >= startId) {
            resultList.push(socketRefToMessage(allSockets[i]));
            if (resultList.length >= maxResults) {
                break;
            }
        }
    }
    callback(null, {
        socket_ref: resultList,
        end: i >= allSockets.length
    });
}
function getChannelzHandlers() {
    return {
        GetChannel,
        GetTopChannels,
        GetServer,
        GetServers,
        GetSubchannel,
        GetSocket,
        GetServerSockets
    };
}
exports.getChannelzHandlers = getChannelzHandlers;
let loadedChannelzDefinition = null;
function getChannelzServiceDefinition() {
    if (loadedChannelzDefinition) {
        return loadedChannelzDefinition;
    }
    /* The purpose of this complexity is to avoid loading @grpc/proto-loader at
     * runtime for users who will not use/enable channelz. */ const loaderLoadSync = (__webpack_require__(92856)/* .loadSync */ .J_);
    const loadedProto = loaderLoadSync("channelz.proto", {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
        includeDirs: [
            `${__dirname}/../../proto`
        ]
    });
    const channelzGrpcObject = (0, make_client_1.loadPackageDefinition)(loadedProto);
    loadedChannelzDefinition = channelzGrpcObject.grpc.channelz.v1.Channelz.service;
    return loadedChannelzDefinition;
}
exports.getChannelzServiceDefinition = getChannelzServiceDefinition;
function setup() {
    (0, admin_1.registerAdminService)(getChannelzServiceDefinition, getChannelzHandlers);
}
exports.setup = setup; //# sourceMappingURL=channelz.js.map


/***/ }),

/***/ 22380:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getInterceptingCall = exports.InterceptingCall = exports.RequesterBuilder = exports.ListenerBuilder = exports.InterceptorConfigurationError = void 0;
const metadata_1 = __webpack_require__(39637);
const call_interface_1 = __webpack_require__(75496);
const constants_1 = __webpack_require__(60076);
const error_1 = __webpack_require__(6134);
/**
 * Error class associated with passing both interceptors and interceptor
 * providers to a client constructor or as call options.
 */ class InterceptorConfigurationError extends Error {
    constructor(message){
        super(message);
        this.name = "InterceptorConfigurationError";
        Error.captureStackTrace(this, InterceptorConfigurationError);
    }
}
exports.InterceptorConfigurationError = InterceptorConfigurationError;
class ListenerBuilder {
    constructor(){
        this.metadata = undefined;
        this.message = undefined;
        this.status = undefined;
    }
    withOnReceiveMetadata(onReceiveMetadata) {
        this.metadata = onReceiveMetadata;
        return this;
    }
    withOnReceiveMessage(onReceiveMessage) {
        this.message = onReceiveMessage;
        return this;
    }
    withOnReceiveStatus(onReceiveStatus) {
        this.status = onReceiveStatus;
        return this;
    }
    build() {
        return {
            onReceiveMetadata: this.metadata,
            onReceiveMessage: this.message,
            onReceiveStatus: this.status
        };
    }
}
exports.ListenerBuilder = ListenerBuilder;
class RequesterBuilder {
    constructor(){
        this.start = undefined;
        this.message = undefined;
        this.halfClose = undefined;
        this.cancel = undefined;
    }
    withStart(start) {
        this.start = start;
        return this;
    }
    withSendMessage(sendMessage) {
        this.message = sendMessage;
        return this;
    }
    withHalfClose(halfClose) {
        this.halfClose = halfClose;
        return this;
    }
    withCancel(cancel) {
        this.cancel = cancel;
        return this;
    }
    build() {
        return {
            start: this.start,
            sendMessage: this.message,
            halfClose: this.halfClose,
            cancel: this.cancel
        };
    }
}
exports.RequesterBuilder = RequesterBuilder;
/**
 * A Listener with a default pass-through implementation of each method. Used
 * for filling out Listeners with some methods omitted.
 */ const defaultListener = {
    onReceiveMetadata: (metadata, next)=>{
        next(metadata);
    },
    onReceiveMessage: (message, next)=>{
        next(message);
    },
    onReceiveStatus: (status, next)=>{
        next(status);
    }
};
/**
 * A Requester with a default pass-through implementation of each method. Used
 * for filling out Requesters with some methods omitted.
 */ const defaultRequester = {
    start: (metadata, listener, next)=>{
        next(metadata, listener);
    },
    sendMessage: (message, next)=>{
        next(message);
    },
    halfClose: (next)=>{
        next();
    },
    cancel: (next)=>{
        next();
    }
};
class InterceptingCall {
    constructor(nextCall, requester){
        var _a, _b, _c, _d;
        this.nextCall = nextCall;
        /**
         * Indicates that metadata has been passed to the requester's start
         * method but it has not been passed to the corresponding next callback
         */ this.processingMetadata = false;
        /**
         * Message context for a pending message that is waiting for
         */ this.pendingMessageContext = null;
        /**
         * Indicates that a message has been passed to the requester's sendMessage
         * method but it has not been passed to the corresponding next callback
         */ this.processingMessage = false;
        /**
         * Indicates that a status was received but could not be propagated because
         * a message was still being processed.
         */ this.pendingHalfClose = false;
        if (requester) {
            this.requester = {
                start: (_a = requester.start) !== null && _a !== void 0 ? _a : defaultRequester.start,
                sendMessage: (_b = requester.sendMessage) !== null && _b !== void 0 ? _b : defaultRequester.sendMessage,
                halfClose: (_c = requester.halfClose) !== null && _c !== void 0 ? _c : defaultRequester.halfClose,
                cancel: (_d = requester.cancel) !== null && _d !== void 0 ? _d : defaultRequester.cancel
            };
        } else {
            this.requester = defaultRequester;
        }
    }
    cancelWithStatus(status, details) {
        this.requester.cancel(()=>{
            this.nextCall.cancelWithStatus(status, details);
        });
    }
    getPeer() {
        return this.nextCall.getPeer();
    }
    processPendingMessage() {
        if (this.pendingMessageContext) {
            this.nextCall.sendMessageWithContext(this.pendingMessageContext, this.pendingMessage);
            this.pendingMessageContext = null;
            this.pendingMessage = null;
        }
    }
    processPendingHalfClose() {
        if (this.pendingHalfClose) {
            this.nextCall.halfClose();
        }
    }
    start(metadata, interceptingListener) {
        var _a, _b, _c, _d, _e, _f;
        const fullInterceptingListener = {
            onReceiveMetadata: (_b = (_a = interceptingListener === null || interceptingListener === void 0 ? void 0 : interceptingListener.onReceiveMetadata) === null || _a === void 0 ? void 0 : _a.bind(interceptingListener)) !== null && _b !== void 0 ? _b : (metadata)=>{},
            onReceiveMessage: (_d = (_c = interceptingListener === null || interceptingListener === void 0 ? void 0 : interceptingListener.onReceiveMessage) === null || _c === void 0 ? void 0 : _c.bind(interceptingListener)) !== null && _d !== void 0 ? _d : (message)=>{},
            onReceiveStatus: (_f = (_e = interceptingListener === null || interceptingListener === void 0 ? void 0 : interceptingListener.onReceiveStatus) === null || _e === void 0 ? void 0 : _e.bind(interceptingListener)) !== null && _f !== void 0 ? _f : (status)=>{}
        };
        this.processingMetadata = true;
        this.requester.start(metadata, fullInterceptingListener, (md, listener)=>{
            var _a, _b, _c;
            this.processingMetadata = false;
            let finalInterceptingListener;
            if ((0, call_interface_1.isInterceptingListener)(listener)) {
                finalInterceptingListener = listener;
            } else {
                const fullListener = {
                    onReceiveMetadata: (_a = listener.onReceiveMetadata) !== null && _a !== void 0 ? _a : defaultListener.onReceiveMetadata,
                    onReceiveMessage: (_b = listener.onReceiveMessage) !== null && _b !== void 0 ? _b : defaultListener.onReceiveMessage,
                    onReceiveStatus: (_c = listener.onReceiveStatus) !== null && _c !== void 0 ? _c : defaultListener.onReceiveStatus
                };
                finalInterceptingListener = new call_interface_1.InterceptingListenerImpl(fullListener, fullInterceptingListener);
            }
            this.nextCall.start(md, finalInterceptingListener);
            this.processPendingMessage();
            this.processPendingHalfClose();
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendMessageWithContext(context, message) {
        this.processingMessage = true;
        this.requester.sendMessage(message, (finalMessage)=>{
            this.processingMessage = false;
            if (this.processingMetadata) {
                this.pendingMessageContext = context;
                this.pendingMessage = message;
            } else {
                this.nextCall.sendMessageWithContext(context, finalMessage);
                this.processPendingHalfClose();
            }
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendMessage(message) {
        this.sendMessageWithContext({}, message);
    }
    startRead() {
        this.nextCall.startRead();
    }
    halfClose() {
        this.requester.halfClose(()=>{
            if (this.processingMetadata || this.processingMessage) {
                this.pendingHalfClose = true;
            } else {
                this.nextCall.halfClose();
            }
        });
    }
}
exports.InterceptingCall = InterceptingCall;
function getCall(channel, path, options) {
    var _a, _b;
    const deadline = (_a = options.deadline) !== null && _a !== void 0 ? _a : Infinity;
    const host = options.host;
    const parent = (_b = options.parent) !== null && _b !== void 0 ? _b : null;
    const propagateFlags = options.propagate_flags;
    const credentials = options.credentials;
    const call = channel.createCall(path, deadline, host, parent, propagateFlags);
    if (credentials) {
        call.setCredentials(credentials);
    }
    return call;
}
/**
 * InterceptingCall implementation that directly owns the underlying Call
 * object and handles serialization and deseraizliation.
 */ class BaseInterceptingCall {
    constructor(call, // eslint-disable-next-line @typescript-eslint/no-explicit-any
    methodDefinition){
        this.call = call;
        this.methodDefinition = methodDefinition;
    }
    cancelWithStatus(status, details) {
        this.call.cancelWithStatus(status, details);
    }
    getPeer() {
        return this.call.getPeer();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendMessageWithContext(context, message) {
        let serialized;
        try {
            serialized = this.methodDefinition.requestSerialize(message);
        } catch (e) {
            this.call.cancelWithStatus(constants_1.Status.INTERNAL, `Request message serialization failure: ${(0, error_1.getErrorMessage)(e)}`);
            return;
        }
        this.call.sendMessageWithContext(context, serialized);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendMessage(message) {
        this.sendMessageWithContext({}, message);
    }
    start(metadata, interceptingListener) {
        let readError = null;
        this.call.start(metadata, {
            onReceiveMetadata: (metadata)=>{
                var _a;
                (_a = interceptingListener === null || interceptingListener === void 0 ? void 0 : interceptingListener.onReceiveMetadata) === null || _a === void 0 ? void 0 : _a.call(interceptingListener, metadata);
            },
            onReceiveMessage: (message)=>{
                var _a;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                let deserialized;
                try {
                    deserialized = this.methodDefinition.responseDeserialize(message);
                } catch (e) {
                    readError = {
                        code: constants_1.Status.INTERNAL,
                        details: `Response message parsing error: ${(0, error_1.getErrorMessage)(e)}`,
                        metadata: new metadata_1.Metadata()
                    };
                    this.call.cancelWithStatus(readError.code, readError.details);
                    return;
                }
                (_a = interceptingListener === null || interceptingListener === void 0 ? void 0 : interceptingListener.onReceiveMessage) === null || _a === void 0 ? void 0 : _a.call(interceptingListener, deserialized);
            },
            onReceiveStatus: (status)=>{
                var _a, _b;
                if (readError) {
                    (_a = interceptingListener === null || interceptingListener === void 0 ? void 0 : interceptingListener.onReceiveStatus) === null || _a === void 0 ? void 0 : _a.call(interceptingListener, readError);
                } else {
                    (_b = interceptingListener === null || interceptingListener === void 0 ? void 0 : interceptingListener.onReceiveStatus) === null || _b === void 0 ? void 0 : _b.call(interceptingListener, status);
                }
            }
        });
    }
    startRead() {
        this.call.startRead();
    }
    halfClose() {
        this.call.halfClose();
    }
}
/**
 * BaseInterceptingCall with special-cased behavior for methods with unary
 * responses.
 */ class BaseUnaryInterceptingCall extends BaseInterceptingCall {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(call, methodDefinition){
        super(call, methodDefinition);
    }
    start(metadata, listener) {
        var _a, _b;
        let receivedMessage = false;
        const wrapperListener = {
            onReceiveMetadata: (_b = (_a = listener === null || listener === void 0 ? void 0 : listener.onReceiveMetadata) === null || _a === void 0 ? void 0 : _a.bind(listener)) !== null && _b !== void 0 ? _b : (metadata)=>{},
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onReceiveMessage: (message)=>{
                var _a;
                receivedMessage = true;
                (_a = listener === null || listener === void 0 ? void 0 : listener.onReceiveMessage) === null || _a === void 0 ? void 0 : _a.call(listener, message);
            },
            onReceiveStatus: (status)=>{
                var _a, _b;
                if (!receivedMessage) {
                    (_a = listener === null || listener === void 0 ? void 0 : listener.onReceiveMessage) === null || _a === void 0 ? void 0 : _a.call(listener, null);
                }
                (_b = listener === null || listener === void 0 ? void 0 : listener.onReceiveStatus) === null || _b === void 0 ? void 0 : _b.call(listener, status);
            }
        };
        super.start(metadata, wrapperListener);
        this.call.startRead();
    }
}
/**
 * BaseInterceptingCall with special-cased behavior for methods with streaming
 * responses.
 */ class BaseStreamingInterceptingCall extends BaseInterceptingCall {
}
function getBottomInterceptingCall(channel, options, // eslint-disable-next-line @typescript-eslint/no-explicit-any
methodDefinition) {
    const call = getCall(channel, methodDefinition.path, options);
    if (methodDefinition.responseStream) {
        return new BaseStreamingInterceptingCall(call, methodDefinition);
    } else {
        return new BaseUnaryInterceptingCall(call, methodDefinition);
    }
}
function getInterceptingCall(interceptorArgs, // eslint-disable-next-line @typescript-eslint/no-explicit-any
methodDefinition, options, channel) {
    if (interceptorArgs.clientInterceptors.length > 0 && interceptorArgs.clientInterceptorProviders.length > 0) {
        throw new InterceptorConfigurationError("Both interceptors and interceptor_providers were passed as options " + "to the client constructor. Only one of these is allowed.");
    }
    if (interceptorArgs.callInterceptors.length > 0 && interceptorArgs.callInterceptorProviders.length > 0) {
        throw new InterceptorConfigurationError("Both interceptors and interceptor_providers were passed as call " + "options. Only one of these is allowed.");
    }
    let interceptors = [];
    // Interceptors passed to the call override interceptors passed to the client constructor
    if (interceptorArgs.callInterceptors.length > 0 || interceptorArgs.callInterceptorProviders.length > 0) {
        interceptors = [].concat(interceptorArgs.callInterceptors, interceptorArgs.callInterceptorProviders.map((provider)=>provider(methodDefinition))).filter((interceptor)=>interceptor);
    // Filter out falsy values when providers return nothing
    } else {
        interceptors = [].concat(interceptorArgs.clientInterceptors, interceptorArgs.clientInterceptorProviders.map((provider)=>provider(methodDefinition))).filter((interceptor)=>interceptor);
    // Filter out falsy values when providers return nothing
    }
    const interceptorOptions = Object.assign({}, options, {
        method_definition: methodDefinition
    });
    /* For each interceptor in the list, the nextCall function passed to it is
     * based on the next interceptor in the list, using a nextCall function
     * constructed with the following interceptor in the list, and so on. The
     * initialValue, which is effectively at the end of the list, is a nextCall
     * function that invokes getBottomInterceptingCall, the result of which
     * handles (de)serialization and also gets the underlying call from the
     * channel. */ const getCall = interceptors.reduceRight((nextCall, nextInterceptor)=>{
        return (currentOptions)=>nextInterceptor(currentOptions, nextCall);
    }, (finalOptions)=>getBottomInterceptingCall(channel, finalOptions, methodDefinition));
    return getCall(interceptorOptions);
}
exports.getInterceptingCall = getInterceptingCall; //# sourceMappingURL=client-interceptors.js.map


/***/ }),

/***/ 17555:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.Client = void 0;
const call_1 = __webpack_require__(36271);
const channel_1 = __webpack_require__(20991);
const connectivity_state_1 = __webpack_require__(16035);
const constants_1 = __webpack_require__(60076);
const metadata_1 = __webpack_require__(39637);
const client_interceptors_1 = __webpack_require__(22380);
const CHANNEL_SYMBOL = Symbol();
const INTERCEPTOR_SYMBOL = Symbol();
const INTERCEPTOR_PROVIDER_SYMBOL = Symbol();
const CALL_INVOCATION_TRANSFORMER_SYMBOL = Symbol();
function isFunction(arg) {
    return typeof arg === "function";
}
function getErrorStackString(error) {
    return error.stack.split("\n").slice(1).join("\n");
}
/**
 * A generic gRPC client. Primarily useful as a base class for all generated
 * clients.
 */ class Client {
    constructor(address, credentials, options = {}){
        var _a, _b;
        options = Object.assign({}, options);
        this[INTERCEPTOR_SYMBOL] = (_a = options.interceptors) !== null && _a !== void 0 ? _a : [];
        delete options.interceptors;
        this[INTERCEPTOR_PROVIDER_SYMBOL] = (_b = options.interceptor_providers) !== null && _b !== void 0 ? _b : [];
        delete options.interceptor_providers;
        if (this[INTERCEPTOR_SYMBOL].length > 0 && this[INTERCEPTOR_PROVIDER_SYMBOL].length > 0) {
            throw new Error("Both interceptors and interceptor_providers were passed as options " + "to the client constructor. Only one of these is allowed.");
        }
        this[CALL_INVOCATION_TRANSFORMER_SYMBOL] = options.callInvocationTransformer;
        delete options.callInvocationTransformer;
        if (options.channelOverride) {
            this[CHANNEL_SYMBOL] = options.channelOverride;
        } else if (options.channelFactoryOverride) {
            const channelFactoryOverride = options.channelFactoryOverride;
            delete options.channelFactoryOverride;
            this[CHANNEL_SYMBOL] = channelFactoryOverride(address, credentials, options);
        } else {
            this[CHANNEL_SYMBOL] = new channel_1.ChannelImplementation(address, credentials, options);
        }
    }
    close() {
        this[CHANNEL_SYMBOL].close();
    }
    getChannel() {
        return this[CHANNEL_SYMBOL];
    }
    waitForReady(deadline, callback) {
        const checkState = (err)=>{
            if (err) {
                callback(new Error("Failed to connect before the deadline"));
                return;
            }
            let newState;
            try {
                newState = this[CHANNEL_SYMBOL].getConnectivityState(true);
            } catch (e) {
                callback(new Error("The channel has been closed"));
                return;
            }
            if (newState === connectivity_state_1.ConnectivityState.READY) {
                callback();
            } else {
                try {
                    this[CHANNEL_SYMBOL].watchConnectivityState(newState, deadline, checkState);
                } catch (e) {
                    callback(new Error("The channel has been closed"));
                }
            }
        };
        setImmediate(checkState);
    }
    checkOptionalUnaryResponseArguments(arg1, arg2, arg3) {
        if (isFunction(arg1)) {
            return {
                metadata: new metadata_1.Metadata(),
                options: {},
                callback: arg1
            };
        } else if (isFunction(arg2)) {
            if (arg1 instanceof metadata_1.Metadata) {
                return {
                    metadata: arg1,
                    options: {},
                    callback: arg2
                };
            } else {
                return {
                    metadata: new metadata_1.Metadata(),
                    options: arg1,
                    callback: arg2
                };
            }
        } else {
            if (!(arg1 instanceof metadata_1.Metadata && arg2 instanceof Object && isFunction(arg3))) {
                throw new Error("Incorrect arguments passed");
            }
            return {
                metadata: arg1,
                options: arg2,
                callback: arg3
            };
        }
    }
    makeUnaryRequest(method, serialize, deserialize, argument, metadata, options, callback) {
        var _a, _b;
        const checkedArguments = this.checkOptionalUnaryResponseArguments(metadata, options, callback);
        const methodDefinition = {
            path: method,
            requestStream: false,
            responseStream: false,
            requestSerialize: serialize,
            responseDeserialize: deserialize
        };
        let callProperties = {
            argument: argument,
            metadata: checkedArguments.metadata,
            call: new call_1.ClientUnaryCallImpl(),
            channel: this[CHANNEL_SYMBOL],
            methodDefinition: methodDefinition,
            callOptions: checkedArguments.options,
            callback: checkedArguments.callback
        };
        if (this[CALL_INVOCATION_TRANSFORMER_SYMBOL]) {
            callProperties = this[CALL_INVOCATION_TRANSFORMER_SYMBOL](callProperties);
        }
        const emitter = callProperties.call;
        const interceptorArgs = {
            clientInterceptors: this[INTERCEPTOR_SYMBOL],
            clientInterceptorProviders: this[INTERCEPTOR_PROVIDER_SYMBOL],
            callInterceptors: (_a = callProperties.callOptions.interceptors) !== null && _a !== void 0 ? _a : [],
            callInterceptorProviders: (_b = callProperties.callOptions.interceptor_providers) !== null && _b !== void 0 ? _b : []
        };
        const call = (0, client_interceptors_1.getInterceptingCall)(interceptorArgs, callProperties.methodDefinition, callProperties.callOptions, callProperties.channel);
        /* This needs to happen before the emitter is used. Unfortunately we can't
         * enforce this with the type system. We need to construct this emitter
         * before calling the CallInvocationTransformer, and we need to create the
         * call after that. */ emitter.call = call;
        let responseMessage = null;
        let receivedStatus = false;
        const callerStackError = new Error();
        call.start(callProperties.metadata, {
            onReceiveMetadata: (metadata)=>{
                emitter.emit("metadata", metadata);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onReceiveMessage (message) {
                if (responseMessage !== null) {
                    call.cancelWithStatus(constants_1.Status.INTERNAL, "Too many responses received");
                }
                responseMessage = message;
            },
            onReceiveStatus (status) {
                if (receivedStatus) {
                    return;
                }
                receivedStatus = true;
                if (status.code === constants_1.Status.OK) {
                    if (responseMessage === null) {
                        const callerStack = getErrorStackString(callerStackError);
                        callProperties.callback((0, call_1.callErrorFromStatus)({
                            code: constants_1.Status.INTERNAL,
                            details: "No message received",
                            metadata: status.metadata
                        }, callerStack));
                    } else {
                        callProperties.callback(null, responseMessage);
                    }
                } else {
                    const callerStack = getErrorStackString(callerStackError);
                    callProperties.callback((0, call_1.callErrorFromStatus)(status, callerStack));
                }
                emitter.emit("status", status);
            }
        });
        call.sendMessage(argument);
        call.halfClose();
        return emitter;
    }
    makeClientStreamRequest(method, serialize, deserialize, metadata, options, callback) {
        var _a, _b;
        const checkedArguments = this.checkOptionalUnaryResponseArguments(metadata, options, callback);
        const methodDefinition = {
            path: method,
            requestStream: true,
            responseStream: false,
            requestSerialize: serialize,
            responseDeserialize: deserialize
        };
        let callProperties = {
            metadata: checkedArguments.metadata,
            call: new call_1.ClientWritableStreamImpl(serialize),
            channel: this[CHANNEL_SYMBOL],
            methodDefinition: methodDefinition,
            callOptions: checkedArguments.options,
            callback: checkedArguments.callback
        };
        if (this[CALL_INVOCATION_TRANSFORMER_SYMBOL]) {
            callProperties = this[CALL_INVOCATION_TRANSFORMER_SYMBOL](callProperties);
        }
        const emitter = callProperties.call;
        const interceptorArgs = {
            clientInterceptors: this[INTERCEPTOR_SYMBOL],
            clientInterceptorProviders: this[INTERCEPTOR_PROVIDER_SYMBOL],
            callInterceptors: (_a = callProperties.callOptions.interceptors) !== null && _a !== void 0 ? _a : [],
            callInterceptorProviders: (_b = callProperties.callOptions.interceptor_providers) !== null && _b !== void 0 ? _b : []
        };
        const call = (0, client_interceptors_1.getInterceptingCall)(interceptorArgs, callProperties.methodDefinition, callProperties.callOptions, callProperties.channel);
        /* This needs to happen before the emitter is used. Unfortunately we can't
         * enforce this with the type system. We need to construct this emitter
         * before calling the CallInvocationTransformer, and we need to create the
         * call after that. */ emitter.call = call;
        let responseMessage = null;
        let receivedStatus = false;
        const callerStackError = new Error();
        call.start(callProperties.metadata, {
            onReceiveMetadata: (metadata)=>{
                emitter.emit("metadata", metadata);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onReceiveMessage (message) {
                if (responseMessage !== null) {
                    call.cancelWithStatus(constants_1.Status.INTERNAL, "Too many responses received");
                }
                responseMessage = message;
            },
            onReceiveStatus (status) {
                if (receivedStatus) {
                    return;
                }
                receivedStatus = true;
                if (status.code === constants_1.Status.OK) {
                    if (responseMessage === null) {
                        const callerStack = getErrorStackString(callerStackError);
                        callProperties.callback((0, call_1.callErrorFromStatus)({
                            code: constants_1.Status.INTERNAL,
                            details: "No message received",
                            metadata: status.metadata
                        }, callerStack));
                    } else {
                        callProperties.callback(null, responseMessage);
                    }
                } else {
                    const callerStack = getErrorStackString(callerStackError);
                    callProperties.callback((0, call_1.callErrorFromStatus)(status, callerStack));
                }
                emitter.emit("status", status);
            }
        });
        return emitter;
    }
    checkMetadataAndOptions(arg1, arg2) {
        let metadata;
        let options;
        if (arg1 instanceof metadata_1.Metadata) {
            metadata = arg1;
            if (arg2) {
                options = arg2;
            } else {
                options = {};
            }
        } else {
            if (arg1) {
                options = arg1;
            } else {
                options = {};
            }
            metadata = new metadata_1.Metadata();
        }
        return {
            metadata,
            options
        };
    }
    makeServerStreamRequest(method, serialize, deserialize, argument, metadata, options) {
        var _a, _b;
        const checkedArguments = this.checkMetadataAndOptions(metadata, options);
        const methodDefinition = {
            path: method,
            requestStream: false,
            responseStream: true,
            requestSerialize: serialize,
            responseDeserialize: deserialize
        };
        let callProperties = {
            argument: argument,
            metadata: checkedArguments.metadata,
            call: new call_1.ClientReadableStreamImpl(deserialize),
            channel: this[CHANNEL_SYMBOL],
            methodDefinition: methodDefinition,
            callOptions: checkedArguments.options
        };
        if (this[CALL_INVOCATION_TRANSFORMER_SYMBOL]) {
            callProperties = this[CALL_INVOCATION_TRANSFORMER_SYMBOL](callProperties);
        }
        const stream = callProperties.call;
        const interceptorArgs = {
            clientInterceptors: this[INTERCEPTOR_SYMBOL],
            clientInterceptorProviders: this[INTERCEPTOR_PROVIDER_SYMBOL],
            callInterceptors: (_a = callProperties.callOptions.interceptors) !== null && _a !== void 0 ? _a : [],
            callInterceptorProviders: (_b = callProperties.callOptions.interceptor_providers) !== null && _b !== void 0 ? _b : []
        };
        const call = (0, client_interceptors_1.getInterceptingCall)(interceptorArgs, callProperties.methodDefinition, callProperties.callOptions, callProperties.channel);
        /* This needs to happen before the emitter is used. Unfortunately we can't
         * enforce this with the type system. We need to construct this emitter
         * before calling the CallInvocationTransformer, and we need to create the
         * call after that. */ stream.call = call;
        let receivedStatus = false;
        const callerStackError = new Error();
        call.start(callProperties.metadata, {
            onReceiveMetadata (metadata) {
                stream.emit("metadata", metadata);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onReceiveMessage (message) {
                stream.push(message);
            },
            onReceiveStatus (status) {
                if (receivedStatus) {
                    return;
                }
                receivedStatus = true;
                stream.push(null);
                if (status.code !== constants_1.Status.OK) {
                    const callerStack = getErrorStackString(callerStackError);
                    stream.emit("error", (0, call_1.callErrorFromStatus)(status, callerStack));
                }
                stream.emit("status", status);
            }
        });
        call.sendMessage(argument);
        call.halfClose();
        return stream;
    }
    makeBidiStreamRequest(method, serialize, deserialize, metadata, options) {
        var _a, _b;
        const checkedArguments = this.checkMetadataAndOptions(metadata, options);
        const methodDefinition = {
            path: method,
            requestStream: true,
            responseStream: true,
            requestSerialize: serialize,
            responseDeserialize: deserialize
        };
        let callProperties = {
            metadata: checkedArguments.metadata,
            call: new call_1.ClientDuplexStreamImpl(serialize, deserialize),
            channel: this[CHANNEL_SYMBOL],
            methodDefinition: methodDefinition,
            callOptions: checkedArguments.options
        };
        if (this[CALL_INVOCATION_TRANSFORMER_SYMBOL]) {
            callProperties = this[CALL_INVOCATION_TRANSFORMER_SYMBOL](callProperties);
        }
        const stream = callProperties.call;
        const interceptorArgs = {
            clientInterceptors: this[INTERCEPTOR_SYMBOL],
            clientInterceptorProviders: this[INTERCEPTOR_PROVIDER_SYMBOL],
            callInterceptors: (_a = callProperties.callOptions.interceptors) !== null && _a !== void 0 ? _a : [],
            callInterceptorProviders: (_b = callProperties.callOptions.interceptor_providers) !== null && _b !== void 0 ? _b : []
        };
        const call = (0, client_interceptors_1.getInterceptingCall)(interceptorArgs, callProperties.methodDefinition, callProperties.callOptions, callProperties.channel);
        /* This needs to happen before the emitter is used. Unfortunately we can't
         * enforce this with the type system. We need to construct this emitter
         * before calling the CallInvocationTransformer, and we need to create the
         * call after that. */ stream.call = call;
        let receivedStatus = false;
        const callerStackError = new Error();
        call.start(callProperties.metadata, {
            onReceiveMetadata (metadata) {
                stream.emit("metadata", metadata);
            },
            onReceiveMessage (message) {
                stream.push(message);
            },
            onReceiveStatus (status) {
                if (receivedStatus) {
                    return;
                }
                receivedStatus = true;
                stream.push(null);
                if (status.code !== constants_1.Status.OK) {
                    const callerStack = getErrorStackString(callerStackError);
                    stream.emit("error", (0, call_1.callErrorFromStatus)(status, callerStack));
                }
                stream.emit("status", status);
            }
        });
        return stream;
    }
}
exports.Client = Client; //# sourceMappingURL=client.js.map


/***/ }),

/***/ 5453:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright 2021 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.CompressionAlgorithms = void 0;
var CompressionAlgorithms;
(function(CompressionAlgorithms) {
    CompressionAlgorithms[CompressionAlgorithms["identity"] = 0] = "identity";
    CompressionAlgorithms[CompressionAlgorithms["deflate"] = 1] = "deflate";
    CompressionAlgorithms[CompressionAlgorithms["gzip"] = 2] = "gzip";
})(CompressionAlgorithms = exports.CompressionAlgorithms || (exports.CompressionAlgorithms = {}));
; //# sourceMappingURL=compression-algorithms.js.map


/***/ }),

/***/ 41836:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.CompressionFilterFactory = exports.CompressionFilter = void 0;
const zlib = __webpack_require__(59796);
const compression_algorithms_1 = __webpack_require__(5453);
const constants_1 = __webpack_require__(60076);
const filter_1 = __webpack_require__(66404);
const logging = __webpack_require__(67738);
const isCompressionAlgorithmKey = (key)=>{
    return typeof key === "number" && typeof compression_algorithms_1.CompressionAlgorithms[key] === "string";
};
class CompressionHandler {
    /**
     * @param message Raw uncompressed message bytes
     * @param compress Indicates whether the message should be compressed
     * @return Framed message, compressed if applicable
     */ async writeMessage(message, compress) {
        let messageBuffer = message;
        if (compress) {
            messageBuffer = await this.compressMessage(messageBuffer);
        }
        const output = Buffer.allocUnsafe(messageBuffer.length + 5);
        output.writeUInt8(compress ? 1 : 0, 0);
        output.writeUInt32BE(messageBuffer.length, 1);
        messageBuffer.copy(output, 5);
        return output;
    }
    /**
     * @param data Framed message, possibly compressed
     * @return Uncompressed message
     */ async readMessage(data) {
        const compressed = data.readUInt8(0) === 1;
        let messageBuffer = data.slice(5);
        if (compressed) {
            messageBuffer = await this.decompressMessage(messageBuffer);
        }
        return messageBuffer;
    }
}
class IdentityHandler extends CompressionHandler {
    async compressMessage(message) {
        return message;
    }
    async writeMessage(message, compress) {
        const output = Buffer.allocUnsafe(message.length + 5);
        /* With "identity" compression, messages should always be marked as
         * uncompressed */ output.writeUInt8(0, 0);
        output.writeUInt32BE(message.length, 1);
        message.copy(output, 5);
        return output;
    }
    decompressMessage(message) {
        return Promise.reject(new Error('Received compressed message but "grpc-encoding" header was identity'));
    }
}
class DeflateHandler extends CompressionHandler {
    compressMessage(message) {
        return new Promise((resolve, reject)=>{
            zlib.deflate(message, (err, output)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve(output);
                }
            });
        });
    }
    decompressMessage(message) {
        return new Promise((resolve, reject)=>{
            zlib.inflate(message, (err, output)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve(output);
                }
            });
        });
    }
}
class GzipHandler extends CompressionHandler {
    compressMessage(message) {
        return new Promise((resolve, reject)=>{
            zlib.gzip(message, (err, output)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve(output);
                }
            });
        });
    }
    decompressMessage(message) {
        return new Promise((resolve, reject)=>{
            zlib.unzip(message, (err, output)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve(output);
                }
            });
        });
    }
}
class UnknownHandler extends CompressionHandler {
    constructor(compressionName){
        super();
        this.compressionName = compressionName;
    }
    compressMessage(message) {
        return Promise.reject(new Error(`Received message compressed with unsupported compression method ${this.compressionName}`));
    }
    decompressMessage(message) {
        // This should be unreachable
        return Promise.reject(new Error(`Compression method not supported: ${this.compressionName}`));
    }
}
function getCompressionHandler(compressionName) {
    switch(compressionName){
        case "identity":
            return new IdentityHandler();
        case "deflate":
            return new DeflateHandler();
        case "gzip":
            return new GzipHandler();
        default:
            return new UnknownHandler(compressionName);
    }
}
class CompressionFilter extends filter_1.BaseFilter {
    constructor(channelOptions, sharedFilterConfig){
        var _a;
        super();
        this.sharedFilterConfig = sharedFilterConfig;
        this.sendCompression = new IdentityHandler();
        this.receiveCompression = new IdentityHandler();
        this.currentCompressionAlgorithm = "identity";
        const compressionAlgorithmKey = channelOptions["grpc.default_compression_algorithm"];
        if (compressionAlgorithmKey !== undefined) {
            if (isCompressionAlgorithmKey(compressionAlgorithmKey)) {
                const clientSelectedEncoding = compression_algorithms_1.CompressionAlgorithms[compressionAlgorithmKey];
                const serverSupportedEncodings = (_a = sharedFilterConfig.serverSupportedEncodingHeader) === null || _a === void 0 ? void 0 : _a.split(",");
                /**
                 * There are two possible situations here:
                 * 1) We don't have any info yet from the server about what compression it supports
                 *    In that case we should just use what the client tells us to use
                 * 2) We've previously received a response from the server including a grpc-accept-encoding header
                 *    In that case we only want to use the encoding chosen by the client if the server supports it
                 */ if (!serverSupportedEncodings || serverSupportedEncodings.includes(clientSelectedEncoding)) {
                    this.currentCompressionAlgorithm = clientSelectedEncoding;
                    this.sendCompression = getCompressionHandler(this.currentCompressionAlgorithm);
                }
            } else {
                logging.log(constants_1.LogVerbosity.ERROR, `Invalid value provided for grpc.default_compression_algorithm option: ${compressionAlgorithmKey}`);
            }
        }
    }
    async sendMetadata(metadata) {
        const headers = await metadata;
        headers.set("grpc-accept-encoding", "identity,deflate,gzip");
        headers.set("accept-encoding", "identity");
        // No need to send the header if it's "identity" -  behavior is identical; save the bandwidth
        if (this.currentCompressionAlgorithm === "identity") {
            headers.remove("grpc-encoding");
        } else {
            headers.set("grpc-encoding", this.currentCompressionAlgorithm);
        }
        return headers;
    }
    receiveMetadata(metadata) {
        const receiveEncoding = metadata.get("grpc-encoding");
        if (receiveEncoding.length > 0) {
            const encoding = receiveEncoding[0];
            if (typeof encoding === "string") {
                this.receiveCompression = getCompressionHandler(encoding);
            }
        }
        metadata.remove("grpc-encoding");
        /* Check to see if the compression we're using to send messages is supported by the server
         * If not, reset the sendCompression filter and have it use the default IdentityHandler */ const serverSupportedEncodingsHeader = metadata.get("grpc-accept-encoding")[0];
        if (serverSupportedEncodingsHeader) {
            this.sharedFilterConfig.serverSupportedEncodingHeader = serverSupportedEncodingsHeader;
            const serverSupportedEncodings = serverSupportedEncodingsHeader.split(",");
            if (!serverSupportedEncodings.includes(this.currentCompressionAlgorithm)) {
                this.sendCompression = new IdentityHandler();
                this.currentCompressionAlgorithm = "identity";
            }
        }
        metadata.remove("grpc-accept-encoding");
        return metadata;
    }
    async sendMessage(message) {
        var _a;
        /* This filter is special. The input message is the bare message bytes,
         * and the output is a framed and possibly compressed message. For this
         * reason, this filter should be at the bottom of the filter stack */ const resolvedMessage = await message;
        let compress;
        if (this.sendCompression instanceof IdentityHandler) {
            compress = false;
        } else {
            compress = (((_a = resolvedMessage.flags) !== null && _a !== void 0 ? _a : 0) & 2 /* WriteFlags.NoCompress */ ) === 0;
        }
        return {
            message: await this.sendCompression.writeMessage(resolvedMessage.message, compress),
            flags: resolvedMessage.flags
        };
    }
    async receiveMessage(message) {
        /* This filter is also special. The input message is framed and possibly
         * compressed, and the output message is deframed and uncompressed. So
         * this is another reason that this filter should be at the bottom of the
         * filter stack. */ return this.receiveCompression.readMessage(await message);
    }
}
exports.CompressionFilter = CompressionFilter;
class CompressionFilterFactory {
    constructor(channel, options){
        this.channel = channel;
        this.options = options;
        this.sharedFilterConfig = {};
    }
    createFilter() {
        return new CompressionFilter(this.options, this.sharedFilterConfig);
    }
}
exports.CompressionFilterFactory = CompressionFilterFactory; //# sourceMappingURL=compression-filter.js.map


/***/ }),

/***/ 16035:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright 2021 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.ConnectivityState = void 0;
var ConnectivityState;
(function(ConnectivityState) {
    ConnectivityState[ConnectivityState["IDLE"] = 0] = "IDLE";
    ConnectivityState[ConnectivityState["CONNECTING"] = 1] = "CONNECTING";
    ConnectivityState[ConnectivityState["READY"] = 2] = "READY";
    ConnectivityState[ConnectivityState["TRANSIENT_FAILURE"] = 3] = "TRANSIENT_FAILURE";
    ConnectivityState[ConnectivityState["SHUTDOWN"] = 4] = "SHUTDOWN";
})(ConnectivityState = exports.ConnectivityState || (exports.ConnectivityState = {})); //# sourceMappingURL=connectivity-state.js.map


/***/ }),

/***/ 60076:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH = exports.DEFAULT_MAX_SEND_MESSAGE_LENGTH = exports.Propagate = exports.LogVerbosity = exports.Status = void 0;
var Status;
(function(Status) {
    Status[Status["OK"] = 0] = "OK";
    Status[Status["CANCELLED"] = 1] = "CANCELLED";
    Status[Status["UNKNOWN"] = 2] = "UNKNOWN";
    Status[Status["INVALID_ARGUMENT"] = 3] = "INVALID_ARGUMENT";
    Status[Status["DEADLINE_EXCEEDED"] = 4] = "DEADLINE_EXCEEDED";
    Status[Status["NOT_FOUND"] = 5] = "NOT_FOUND";
    Status[Status["ALREADY_EXISTS"] = 6] = "ALREADY_EXISTS";
    Status[Status["PERMISSION_DENIED"] = 7] = "PERMISSION_DENIED";
    Status[Status["RESOURCE_EXHAUSTED"] = 8] = "RESOURCE_EXHAUSTED";
    Status[Status["FAILED_PRECONDITION"] = 9] = "FAILED_PRECONDITION";
    Status[Status["ABORTED"] = 10] = "ABORTED";
    Status[Status["OUT_OF_RANGE"] = 11] = "OUT_OF_RANGE";
    Status[Status["UNIMPLEMENTED"] = 12] = "UNIMPLEMENTED";
    Status[Status["INTERNAL"] = 13] = "INTERNAL";
    Status[Status["UNAVAILABLE"] = 14] = "UNAVAILABLE";
    Status[Status["DATA_LOSS"] = 15] = "DATA_LOSS";
    Status[Status["UNAUTHENTICATED"] = 16] = "UNAUTHENTICATED";
})(Status = exports.Status || (exports.Status = {}));
var LogVerbosity;
(function(LogVerbosity) {
    LogVerbosity[LogVerbosity["DEBUG"] = 0] = "DEBUG";
    LogVerbosity[LogVerbosity["INFO"] = 1] = "INFO";
    LogVerbosity[LogVerbosity["ERROR"] = 2] = "ERROR";
    LogVerbosity[LogVerbosity["NONE"] = 3] = "NONE";
})(LogVerbosity = exports.LogVerbosity || (exports.LogVerbosity = {}));
/**
 * NOTE: This enum is not currently used in any implemented API in this
 * library. It is included only for type parity with the other implementation.
 */ var Propagate;
(function(Propagate) {
    Propagate[Propagate["DEADLINE"] = 1] = "DEADLINE";
    Propagate[Propagate["CENSUS_STATS_CONTEXT"] = 2] = "CENSUS_STATS_CONTEXT";
    Propagate[Propagate["CENSUS_TRACING_CONTEXT"] = 4] = "CENSUS_TRACING_CONTEXT";
    Propagate[Propagate["CANCELLATION"] = 8] = "CANCELLATION";
    // https://github.com/grpc/grpc/blob/master/include/grpc/impl/codegen/propagation_bits.h#L43
    Propagate[Propagate["DEFAULTS"] = 65535] = "DEFAULTS";
})(Propagate = exports.Propagate || (exports.Propagate = {}));
// -1 means unlimited
exports.DEFAULT_MAX_SEND_MESSAGE_LENGTH = -1;
// 4 MB default
exports.DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH = 4 * 1024 * 1024; //# sourceMappingURL=constants.js.map


/***/ }),

/***/ 99086:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2022 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.restrictControlPlaneStatusCode = void 0;
const constants_1 = __webpack_require__(60076);
const INAPPROPRIATE_CONTROL_PLANE_CODES = [
    constants_1.Status.OK,
    constants_1.Status.INVALID_ARGUMENT,
    constants_1.Status.NOT_FOUND,
    constants_1.Status.ALREADY_EXISTS,
    constants_1.Status.FAILED_PRECONDITION,
    constants_1.Status.ABORTED,
    constants_1.Status.OUT_OF_RANGE,
    constants_1.Status.DATA_LOSS
];
function restrictControlPlaneStatusCode(code, details) {
    if (INAPPROPRIATE_CONTROL_PLANE_CODES.includes(code)) {
        return {
            code: constants_1.Status.INTERNAL,
            details: `Invalid status from control plane: ${code} ${constants_1.Status[code]} ${details}`
        };
    } else {
        return {
            code,
            details
        };
    }
}
exports.restrictControlPlaneStatusCode = restrictControlPlaneStatusCode; //# sourceMappingURL=control-plane-status.js.map


/***/ }),

/***/ 89760:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.deadlineToString = exports.getRelativeTimeout = exports.getDeadlineTimeoutString = exports.minDeadline = void 0;
function minDeadline(...deadlineList) {
    let minValue = Infinity;
    for (const deadline of deadlineList){
        const deadlineMsecs = deadline instanceof Date ? deadline.getTime() : deadline;
        if (deadlineMsecs < minValue) {
            minValue = deadlineMsecs;
        }
    }
    return minValue;
}
exports.minDeadline = minDeadline;
const units = [
    [
        "m",
        1
    ],
    [
        "S",
        1000
    ],
    [
        "M",
        60 * 1000
    ],
    [
        "H",
        60 * 60 * 1000
    ]
];
function getDeadlineTimeoutString(deadline) {
    const now = new Date().getTime();
    if (deadline instanceof Date) {
        deadline = deadline.getTime();
    }
    const timeoutMs = Math.max(deadline - now, 0);
    for (const [unit, factor] of units){
        const amount = timeoutMs / factor;
        if (amount < 1e8) {
            return String(Math.ceil(amount)) + unit;
        }
    }
    throw new Error("Deadline is too far in the future");
}
exports.getDeadlineTimeoutString = getDeadlineTimeoutString;
/**
 * See https://nodejs.org/api/timers.html#settimeoutcallback-delay-args
 * In particular, "When delay is larger than 2147483647 or less than 1, the
 * delay will be set to 1. Non-integer delays are truncated to an integer."
 * This number of milliseconds is almost 25 days.
 */ const MAX_TIMEOUT_TIME = 2147483647;
/**
 * Get the timeout value that should be passed to setTimeout now for the timer
 * to end at the deadline. For any deadline before now, the timer should end
 * immediately, represented by a value of 0. For any deadline more than
 * MAX_TIMEOUT_TIME milliseconds in the future, a timer cannot be set that will
 * end at that time, so it is treated as infinitely far in the future.
 * @param deadline
 * @returns
 */ function getRelativeTimeout(deadline) {
    const deadlineMs = deadline instanceof Date ? deadline.getTime() : deadline;
    const now = new Date().getTime();
    const timeout = deadlineMs - now;
    if (timeout < 0) {
        return 0;
    } else if (timeout > MAX_TIMEOUT_TIME) {
        return Infinity;
    } else {
        return timeout;
    }
}
exports.getRelativeTimeout = getRelativeTimeout;
function deadlineToString(deadline) {
    if (deadline instanceof Date) {
        return deadline.toISOString();
    } else {
        const dateDeadline = new Date(deadline);
        if (Number.isNaN(dateDeadline.getTime())) {
            return "" + deadline;
        } else {
            return dateDeadline.toISOString();
        }
    }
}
exports.deadlineToString = deadlineToString; //# sourceMappingURL=deadline.js.map


/***/ }),

/***/ 6464:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright 2022 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.isDuration = exports.durationToMs = exports.msToDuration = void 0;
function msToDuration(millis) {
    return {
        seconds: millis / 1000 | 0,
        nanos: millis % 1000 * 1000000 | 0
    };
}
exports.msToDuration = msToDuration;
function durationToMs(duration) {
    return duration.seconds * 1000 + duration.nanos / 1000000 | 0;
}
exports.durationToMs = durationToMs;
function isDuration(value) {
    return typeof value.seconds === "number" && typeof value.nanos === "number";
}
exports.isDuration = isDuration; //# sourceMappingURL=duration.js.map


/***/ }),

/***/ 6134:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright 2022 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getErrorCode = exports.getErrorMessage = void 0;
function getErrorMessage(error) {
    if (error instanceof Error) {
        return error.message;
    } else {
        return String(error);
    }
}
exports.getErrorMessage = getErrorMessage;
function getErrorCode(error) {
    if (typeof error === "object" && error !== null && "code" in error && typeof error.code === "number") {
        return error.code;
    } else {
        return null;
    }
}
exports.getErrorCode = getErrorCode; //# sourceMappingURL=error.js.map


/***/ }),

/***/ 51467:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.OutlierDetectionLoadBalancingConfig = exports.BaseSubchannelWrapper = exports.registerAdminService = exports.FilterStackFactory = exports.BaseFilter = exports.PickResultType = exports.QueuePicker = exports.UnavailablePicker = exports.ChildLoadBalancerHandler = exports.subchannelAddressToString = exports.validateLoadBalancingConfig = exports.getFirstUsableConfig = exports.registerLoadBalancerType = exports.createChildChannelControlHelper = exports.BackoffTimeout = exports.durationToMs = exports.uriToString = exports.registerResolver = exports.log = exports.trace = void 0;
var logging_1 = __webpack_require__(67738);
Object.defineProperty(exports, "trace", ({
    enumerable: true,
    get: function() {
        return logging_1.trace;
    }
}));
Object.defineProperty(exports, "log", ({
    enumerable: true,
    get: function() {
        return logging_1.log;
    }
}));
var resolver_1 = __webpack_require__(71123);
Object.defineProperty(exports, "registerResolver", ({
    enumerable: true,
    get: function() {
        return resolver_1.registerResolver;
    }
}));
var uri_parser_1 = __webpack_require__(35193);
Object.defineProperty(exports, "uriToString", ({
    enumerable: true,
    get: function() {
        return uri_parser_1.uriToString;
    }
}));
var duration_1 = __webpack_require__(6464);
Object.defineProperty(exports, "durationToMs", ({
    enumerable: true,
    get: function() {
        return duration_1.durationToMs;
    }
}));
var backoff_timeout_1 = __webpack_require__(22308);
Object.defineProperty(exports, "BackoffTimeout", ({
    enumerable: true,
    get: function() {
        return backoff_timeout_1.BackoffTimeout;
    }
}));
var load_balancer_1 = __webpack_require__(64189);
Object.defineProperty(exports, "createChildChannelControlHelper", ({
    enumerable: true,
    get: function() {
        return load_balancer_1.createChildChannelControlHelper;
    }
}));
Object.defineProperty(exports, "registerLoadBalancerType", ({
    enumerable: true,
    get: function() {
        return load_balancer_1.registerLoadBalancerType;
    }
}));
Object.defineProperty(exports, "getFirstUsableConfig", ({
    enumerable: true,
    get: function() {
        return load_balancer_1.getFirstUsableConfig;
    }
}));
Object.defineProperty(exports, "validateLoadBalancingConfig", ({
    enumerable: true,
    get: function() {
        return load_balancer_1.validateLoadBalancingConfig;
    }
}));
var subchannel_address_1 = __webpack_require__(27631);
Object.defineProperty(exports, "subchannelAddressToString", ({
    enumerable: true,
    get: function() {
        return subchannel_address_1.subchannelAddressToString;
    }
}));
var load_balancer_child_handler_1 = __webpack_require__(84970);
Object.defineProperty(exports, "ChildLoadBalancerHandler", ({
    enumerable: true,
    get: function() {
        return load_balancer_child_handler_1.ChildLoadBalancerHandler;
    }
}));
var picker_1 = __webpack_require__(19786);
Object.defineProperty(exports, "UnavailablePicker", ({
    enumerable: true,
    get: function() {
        return picker_1.UnavailablePicker;
    }
}));
Object.defineProperty(exports, "QueuePicker", ({
    enumerable: true,
    get: function() {
        return picker_1.QueuePicker;
    }
}));
Object.defineProperty(exports, "PickResultType", ({
    enumerable: true,
    get: function() {
        return picker_1.PickResultType;
    }
}));
var filter_1 = __webpack_require__(66404);
Object.defineProperty(exports, "BaseFilter", ({
    enumerable: true,
    get: function() {
        return filter_1.BaseFilter;
    }
}));
var filter_stack_1 = __webpack_require__(23983);
Object.defineProperty(exports, "FilterStackFactory", ({
    enumerable: true,
    get: function() {
        return filter_stack_1.FilterStackFactory;
    }
}));
var admin_1 = __webpack_require__(75173);
Object.defineProperty(exports, "registerAdminService", ({
    enumerable: true,
    get: function() {
        return admin_1.registerAdminService;
    }
}));
var subchannel_interface_1 = __webpack_require__(22561);
Object.defineProperty(exports, "BaseSubchannelWrapper", ({
    enumerable: true,
    get: function() {
        return subchannel_interface_1.BaseSubchannelWrapper;
    }
}));
var load_balancer_outlier_detection_1 = __webpack_require__(40373);
Object.defineProperty(exports, "OutlierDetectionLoadBalancingConfig", ({
    enumerable: true,
    get: function() {
        return load_balancer_outlier_detection_1.OutlierDetectionLoadBalancingConfig;
    }
})); //# sourceMappingURL=experimental.js.map


/***/ }),

/***/ 23983:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.FilterStackFactory = exports.FilterStack = void 0;
class FilterStack {
    constructor(filters){
        this.filters = filters;
    }
    sendMetadata(metadata) {
        let result = metadata;
        for(let i = 0; i < this.filters.length; i++){
            result = this.filters[i].sendMetadata(result);
        }
        return result;
    }
    receiveMetadata(metadata) {
        let result = metadata;
        for(let i = this.filters.length - 1; i >= 0; i--){
            result = this.filters[i].receiveMetadata(result);
        }
        return result;
    }
    sendMessage(message) {
        let result = message;
        for(let i = 0; i < this.filters.length; i++){
            result = this.filters[i].sendMessage(result);
        }
        return result;
    }
    receiveMessage(message) {
        let result = message;
        for(let i = this.filters.length - 1; i >= 0; i--){
            result = this.filters[i].receiveMessage(result);
        }
        return result;
    }
    receiveTrailers(status) {
        let result = status;
        for(let i = this.filters.length - 1; i >= 0; i--){
            result = this.filters[i].receiveTrailers(result);
        }
        return result;
    }
    push(filters) {
        this.filters.unshift(...filters);
    }
    getFilters() {
        return this.filters;
    }
}
exports.FilterStack = FilterStack;
class FilterStackFactory {
    constructor(factories){
        this.factories = factories;
    }
    push(filterFactories) {
        this.factories.unshift(...filterFactories);
    }
    clone() {
        return new FilterStackFactory([
            ...this.factories
        ]);
    }
    createFilter() {
        return new FilterStack(this.factories.map((factory)=>factory.createFilter()));
    }
}
exports.FilterStackFactory = FilterStackFactory; //# sourceMappingURL=filter-stack.js.map


/***/ }),

/***/ 66404:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.BaseFilter = void 0;
class BaseFilter {
    async sendMetadata(metadata) {
        return metadata;
    }
    receiveMetadata(metadata) {
        return metadata;
    }
    async sendMessage(message) {
        return message;
    }
    async receiveMessage(message) {
        return message;
    }
    receiveTrailers(status) {
        return status;
    }
}
exports.BaseFilter = BaseFilter; //# sourceMappingURL=filter.js.map


/***/ }),

/***/ 33939:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getProxiedConnection = exports.mapProxyName = void 0;
const logging_1 = __webpack_require__(67738);
const constants_1 = __webpack_require__(60076);
const resolver_1 = __webpack_require__(71123);
const http = __webpack_require__(13685);
const tls = __webpack_require__(24404);
const logging = __webpack_require__(67738);
const subchannel_address_1 = __webpack_require__(27631);
const uri_parser_1 = __webpack_require__(35193);
const url_1 = __webpack_require__(57310);
const TRACER_NAME = "proxy";
function trace(text) {
    logging.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, text);
}
function getProxyInfo() {
    let proxyEnv = "";
    let envVar = "";
    /* Prefer using 'grpc_proxy'. Fallback on 'http_proxy' if it is not set.
     * Also prefer using 'https_proxy' with fallback on 'http_proxy'. The
     * fallback behavior can be removed if there's a demand for it.
     */ if (process.env.grpc_proxy) {
        envVar = "grpc_proxy";
        proxyEnv = process.env.grpc_proxy;
    } else if (process.env.https_proxy) {
        envVar = "https_proxy";
        proxyEnv = process.env.https_proxy;
    } else if (process.env.http_proxy) {
        envVar = "http_proxy";
        proxyEnv = process.env.http_proxy;
    } else {
        return {};
    }
    let proxyUrl;
    try {
        proxyUrl = new url_1.URL(proxyEnv);
    } catch (e) {
        (0, logging_1.log)(constants_1.LogVerbosity.ERROR, `cannot parse value of "${envVar}" env var`);
        return {};
    }
    if (proxyUrl.protocol !== "http:") {
        (0, logging_1.log)(constants_1.LogVerbosity.ERROR, `"${proxyUrl.protocol}" scheme not supported in proxy URI`);
        return {};
    }
    let userCred = null;
    if (proxyUrl.username) {
        if (proxyUrl.password) {
            (0, logging_1.log)(constants_1.LogVerbosity.INFO, "userinfo found in proxy URI");
            userCred = `${proxyUrl.username}:${proxyUrl.password}`;
        } else {
            userCred = proxyUrl.username;
        }
    }
    const hostname = proxyUrl.hostname;
    let port = proxyUrl.port;
    /* The proxy URL uses the scheme "http:", which has a default port number of
     * 80. We need to set that explicitly here if it is omitted because otherwise
     * it will use gRPC's default port 443. */ if (port === "") {
        port = "80";
    }
    const result = {
        address: `${hostname}:${port}`
    };
    if (userCred) {
        result.creds = userCred;
    }
    trace("Proxy server " + result.address + " set by environment variable " + envVar);
    return result;
}
function getNoProxyHostList() {
    /* Prefer using 'no_grpc_proxy'. Fallback on 'no_proxy' if it is not set. */ let noProxyStr = process.env.no_grpc_proxy;
    let envVar = "no_grpc_proxy";
    if (!noProxyStr) {
        noProxyStr = process.env.no_proxy;
        envVar = "no_proxy";
    }
    if (noProxyStr) {
        trace("No proxy server list set by environment variable " + envVar);
        return noProxyStr.split(",");
    } else {
        return [];
    }
}
function mapProxyName(target, options) {
    var _a;
    const noProxyResult = {
        target: target,
        extraOptions: {}
    };
    if (((_a = options["grpc.enable_http_proxy"]) !== null && _a !== void 0 ? _a : 1) === 0) {
        return noProxyResult;
    }
    if (target.scheme === "unix") {
        return noProxyResult;
    }
    const proxyInfo = getProxyInfo();
    if (!proxyInfo.address) {
        return noProxyResult;
    }
    const hostPort = (0, uri_parser_1.splitHostPort)(target.path);
    if (!hostPort) {
        return noProxyResult;
    }
    const serverHost = hostPort.host;
    for (const host of getNoProxyHostList()){
        if (host === serverHost) {
            trace("Not using proxy for target in no_proxy list: " + (0, uri_parser_1.uriToString)(target));
            return noProxyResult;
        }
    }
    const extraOptions = {
        "grpc.http_connect_target": (0, uri_parser_1.uriToString)(target)
    };
    if (proxyInfo.creds) {
        extraOptions["grpc.http_connect_creds"] = proxyInfo.creds;
    }
    return {
        target: {
            scheme: "dns",
            path: proxyInfo.address
        },
        extraOptions: extraOptions
    };
}
exports.mapProxyName = mapProxyName;
function getProxiedConnection(address, channelOptions, connectionOptions) {
    if (!("grpc.http_connect_target" in channelOptions)) {
        return Promise.resolve({});
    }
    const realTarget = channelOptions["grpc.http_connect_target"];
    const parsedTarget = (0, uri_parser_1.parseUri)(realTarget);
    if (parsedTarget === null) {
        return Promise.resolve({});
    }
    const options = {
        method: "CONNECT",
        path: parsedTarget.path
    };
    const headers = {
        Host: parsedTarget.path
    };
    // Connect to the subchannel address as a proxy
    if ((0, subchannel_address_1.isTcpSubchannelAddress)(address)) {
        options.host = address.host;
        options.port = address.port;
    } else {
        options.socketPath = address.path;
    }
    if ("grpc.http_connect_creds" in channelOptions) {
        headers["Proxy-Authorization"] = "Basic " + Buffer.from(channelOptions["grpc.http_connect_creds"]).toString("base64");
    }
    options.headers = headers;
    const proxyAddressString = (0, subchannel_address_1.subchannelAddressToString)(address);
    trace("Using proxy " + proxyAddressString + " to connect to " + options.path);
    return new Promise((resolve, reject)=>{
        const request = http.request(options);
        request.once("connect", (res, socket, head)=>{
            var _a;
            request.removeAllListeners();
            socket.removeAllListeners();
            if (res.statusCode === 200) {
                trace("Successfully connected to " + options.path + " through proxy " + proxyAddressString);
                if ("secureContext" in connectionOptions) {
                    /* The proxy is connecting to a TLS server, so upgrade this socket
                     * connection to a TLS connection.
                     * This is a workaround for https://github.com/nodejs/node/issues/32922
                     * See https://github.com/grpc/grpc-node/pull/1369 for more info. */ const targetPath = (0, resolver_1.getDefaultAuthority)(parsedTarget);
                    const hostPort = (0, uri_parser_1.splitHostPort)(targetPath);
                    const remoteHost = (_a = hostPort === null || hostPort === void 0 ? void 0 : hostPort.host) !== null && _a !== void 0 ? _a : targetPath;
                    const cts = tls.connect(Object.assign({
                        host: remoteHost,
                        servername: remoteHost,
                        socket: socket
                    }, connectionOptions), ()=>{
                        trace("Successfully established a TLS connection to " + options.path + " through proxy " + proxyAddressString);
                        resolve({
                            socket: cts,
                            realTarget: parsedTarget
                        });
                    });
                    cts.on("error", (error)=>{
                        trace("Failed to establish a TLS connection to " + options.path + " through proxy " + proxyAddressString + " with error " + error.message);
                        reject();
                    });
                } else {
                    trace("Successfully established a plaintext connection to " + options.path + " through proxy " + proxyAddressString);
                    resolve({
                        socket,
                        realTarget: parsedTarget
                    });
                }
            } else {
                (0, logging_1.log)(constants_1.LogVerbosity.ERROR, "Failed to connect to " + options.path + " through proxy " + proxyAddressString + " with status " + res.statusCode);
                reject();
            }
        });
        request.once("error", (err)=>{
            request.removeAllListeners();
            (0, logging_1.log)(constants_1.LogVerbosity.ERROR, "Failed to connect to proxy " + proxyAddressString + " with error " + err.message);
            reject();
        });
        request.end();
    });
}
exports.getProxiedConnection = getProxiedConnection; //# sourceMappingURL=http_proxy.js.map


/***/ }),

/***/ 44201:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;

/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ __webpack_unused_export__ = ({
    value: true
});
__webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = exports.Rz = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = exports.SF = exports.K9 = void 0;
const call_credentials_1 = __webpack_require__(25919);
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return call_credentials_1.CallCredentials;
    }
});
const channel_1 = __webpack_require__(20991);
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return channel_1.ChannelImplementation;
    }
});
const compression_algorithms_1 = __webpack_require__(5453);
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return compression_algorithms_1.CompressionAlgorithms;
    }
});
const connectivity_state_1 = __webpack_require__(16035);
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return connectivity_state_1.ConnectivityState;
    }
});
const channel_credentials_1 = __webpack_require__(66878);
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return channel_credentials_1.ChannelCredentials;
    }
});
const client_1 = __webpack_require__(17555);
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return client_1.Client;
    }
});
const constants_1 = __webpack_require__(60076);
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return constants_1.LogVerbosity;
    }
});
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return constants_1.Status;
    }
});
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return constants_1.Propagate;
    }
});
const logging = __webpack_require__(67738);
const make_client_1 = __webpack_require__(4585);
Object.defineProperty(exports, "Rz", ({
    enumerable: true,
    get: function() {
        return make_client_1.loadPackageDefinition;
    }
}));
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return make_client_1.makeClientConstructor;
    }
});
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return make_client_1.makeClientConstructor;
    }
});
const metadata_1 = __webpack_require__(39637);
Object.defineProperty(exports, "SF", ({
    enumerable: true,
    get: function() {
        return metadata_1.Metadata;
    }
}));
const server_1 = __webpack_require__(8375);
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return server_1.Server;
    }
});
const server_credentials_1 = __webpack_require__(62547);
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return server_credentials_1.ServerCredentials;
    }
});
const status_builder_1 = __webpack_require__(27763);
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return status_builder_1.StatusBuilder;
    }
});
/**** Client Credentials ****/ // Using assign only copies enumerable properties, which is what we want
exports.K9 = {
    /**
     * Combine a ChannelCredentials with any number of CallCredentials into a
     * single ChannelCredentials object.
     * @param channelCredentials The ChannelCredentials object.
     * @param callCredentials Any number of CallCredentials objects.
     * @return The resulting ChannelCredentials object.
     */ combineChannelCredentials: (channelCredentials, ...callCredentials)=>{
        return callCredentials.reduce((acc, other)=>acc.compose(other), channelCredentials);
    },
    /**
     * Combine any number of CallCredentials into a single CallCredentials
     * object.
     * @param first The first CallCredentials object.
     * @param additional Any number of additional CallCredentials objects.
     * @return The resulting CallCredentials object.
     */ combineCallCredentials: (first, ...additional)=>{
        return additional.reduce((acc, other)=>acc.compose(other), first);
    },
    // from channel-credentials.ts
    createInsecure: channel_credentials_1.ChannelCredentials.createInsecure,
    createSsl: channel_credentials_1.ChannelCredentials.createSsl,
    createFromSecureContext: channel_credentials_1.ChannelCredentials.createFromSecureContext,
    // from call-credentials.ts
    createFromMetadataGenerator: call_credentials_1.CallCredentials.createFromMetadataGenerator,
    createFromGoogleCredential: call_credentials_1.CallCredentials.createFromGoogleCredential,
    createEmpty: call_credentials_1.CallCredentials.createEmpty
};
/**
 * Close a Client object.
 * @param client The client to close.
 */ const closeClient = (client)=>client.close();
__webpack_unused_export__ = closeClient;
const waitForClientReady = (client, deadline, callback)=>client.waitForReady(deadline, callback);
__webpack_unused_export__ = waitForClientReady;
/* eslint-enable @typescript-eslint/no-explicit-any */ /**** Unimplemented function stubs ****/ /* eslint-disable @typescript-eslint/no-explicit-any */ const loadObject = (value, options)=>{
    throw new Error("Not available in this library. Use @grpc/proto-loader and loadPackageDefinition instead");
};
__webpack_unused_export__ = loadObject;
const load = (filename, format, options)=>{
    throw new Error("Not available in this library. Use @grpc/proto-loader and loadPackageDefinition instead");
};
__webpack_unused_export__ = load;
const setLogger = (logger)=>{
    logging.setLogger(logger);
};
__webpack_unused_export__ = setLogger;
const setLogVerbosity = (verbosity)=>{
    logging.setLoggerVerbosity(verbosity);
};
__webpack_unused_export__ = setLogVerbosity;
const getClientChannel = (client)=>{
    return client_1.Client.prototype.getChannel.call(client);
};
__webpack_unused_export__ = getClientChannel;
var client_interceptors_1 = __webpack_require__(22380);
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return client_interceptors_1.ListenerBuilder;
    }
});
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return client_interceptors_1.RequesterBuilder;
    }
});
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return client_interceptors_1.InterceptingCall;
    }
});
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return client_interceptors_1.InterceptorConfigurationError;
    }
});
var channelz_1 = __webpack_require__(18949);
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return channelz_1.getChannelzServiceDefinition;
    }
});
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return channelz_1.getChannelzHandlers;
    }
});
var admin_1 = __webpack_require__(75173);
__webpack_unused_export__ = ({
    enumerable: true,
    get: function() {
        return admin_1.addAdminServicesToServer;
    }
});
const experimental = __webpack_require__(51467);
__webpack_unused_export__ = experimental;
const resolver_dns = __webpack_require__(19864);
const resolver_uds = __webpack_require__(84901);
const resolver_ip = __webpack_require__(67600);
const load_balancer_pick_first = __webpack_require__(73576);
const load_balancer_round_robin = __webpack_require__(40273);
const load_balancer_outlier_detection = __webpack_require__(40373);
const channelz = __webpack_require__(18949);
const clientVersion = (__webpack_require__(2912)/* .version */ .i8);
(()=>{
    logging.trace(constants_1.LogVerbosity.DEBUG, "index", "Loading @grpc/grpc-js version " + clientVersion);
    resolver_dns.setup();
    resolver_uds.setup();
    resolver_ip.setup();
    load_balancer_pick_first.setup();
    load_balancer_round_robin.setup();
    load_balancer_outlier_detection.setup();
    channelz.setup();
})(); //# sourceMappingURL=index.js.map


/***/ }),

/***/ 94964:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.InternalChannel = void 0;
const channel_credentials_1 = __webpack_require__(66878);
const resolving_load_balancer_1 = __webpack_require__(72472);
const subchannel_pool_1 = __webpack_require__(43864);
const picker_1 = __webpack_require__(19786);
const constants_1 = __webpack_require__(60076);
const filter_stack_1 = __webpack_require__(23983);
const compression_filter_1 = __webpack_require__(41836);
const resolver_1 = __webpack_require__(71123);
const logging_1 = __webpack_require__(67738);
const max_message_size_filter_1 = __webpack_require__(79451);
const http_proxy_1 = __webpack_require__(33939);
const uri_parser_1 = __webpack_require__(35193);
const connectivity_state_1 = __webpack_require__(16035);
const channelz_1 = __webpack_require__(18949);
const load_balancing_call_1 = __webpack_require__(63404);
const deadline_1 = __webpack_require__(89760);
const resolving_call_1 = __webpack_require__(20005);
const call_number_1 = __webpack_require__(26095);
const control_plane_status_1 = __webpack_require__(99086);
const retrying_call_1 = __webpack_require__(13412);
const subchannel_interface_1 = __webpack_require__(22561);
/**
 * See https://nodejs.org/api/timers.html#timers_setinterval_callback_delay_args
 */ const MAX_TIMEOUT_TIME = 2147483647;
const RETRY_THROTTLER_MAP = new Map();
const DEFAULT_RETRY_BUFFER_SIZE_BYTES = 1 << 24; // 16 MB
const DEFAULT_PER_RPC_RETRY_BUFFER_SIZE_BYTES = 1 << 20; // 1 MB
class ChannelSubchannelWrapper extends subchannel_interface_1.BaseSubchannelWrapper {
    constructor(childSubchannel, channel){
        super(childSubchannel);
        this.channel = channel;
        this.refCount = 0;
        this.subchannelStateListener = (subchannel, previousState, newState, keepaliveTime)=>{
            channel.throttleKeepalive(keepaliveTime);
        };
        childSubchannel.addConnectivityStateListener(this.subchannelStateListener);
    }
    ref() {
        this.child.ref();
        this.refCount += 1;
    }
    unref() {
        this.child.unref();
        this.refCount -= 1;
        if (this.refCount <= 0) {
            this.child.removeConnectivityStateListener(this.subchannelStateListener);
            this.channel.removeWrappedSubchannel(this);
        }
    }
}
class InternalChannel {
    constructor(target, credentials, options){
        var _a, _b, _c, _d, _e, _f, _g;
        this.credentials = credentials;
        this.options = options;
        this.connectivityState = connectivity_state_1.ConnectivityState.IDLE;
        this.currentPicker = new picker_1.UnavailablePicker();
        /**
         * Calls queued up to get a call config. Should only be populated before the
         * first time the resolver returns a result, which includes the ConfigSelector.
         */ this.configSelectionQueue = [];
        this.pickQueue = [];
        this.connectivityStateWatchers = [];
        this.configSelector = null;
        /**
         * This is the error from the name resolver if it failed most recently. It
         * is only used to end calls that start while there is no config selector
         * and the name resolver is in backoff, so it should be nulled if
         * configSelector becomes set or the channel state becomes anything other
         * than TRANSIENT_FAILURE.
         */ this.currentResolutionError = null;
        this.wrappedSubchannels = new Set();
        // Channelz info
        this.channelzEnabled = true;
        this.callTracker = new channelz_1.ChannelzCallTracker();
        this.childrenTracker = new channelz_1.ChannelzChildrenTracker();
        if (typeof target !== "string") {
            throw new TypeError("Channel target must be a string");
        }
        if (!(credentials instanceof channel_credentials_1.ChannelCredentials)) {
            throw new TypeError("Channel credentials must be a ChannelCredentials object");
        }
        if (options) {
            if (typeof options !== "object") {
                throw new TypeError("Channel options must be an object");
            }
        }
        this.originalTarget = target;
        const originalTargetUri = (0, uri_parser_1.parseUri)(target);
        if (originalTargetUri === null) {
            throw new Error(`Could not parse target name "${target}"`);
        }
        /* This ensures that the target has a scheme that is registered with the
         * resolver */ const defaultSchemeMapResult = (0, resolver_1.mapUriDefaultScheme)(originalTargetUri);
        if (defaultSchemeMapResult === null) {
            throw new Error(`Could not find a default scheme for target name "${target}"`);
        }
        this.callRefTimer = setInterval(()=>{}, MAX_TIMEOUT_TIME);
        (_b = (_a = this.callRefTimer).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
        if (this.options["grpc.enable_channelz"] === 0) {
            this.channelzEnabled = false;
        }
        this.channelzTrace = new channelz_1.ChannelzTrace();
        this.channelzRef = (0, channelz_1.registerChannelzChannel)(target, ()=>this.getChannelzInfo(), this.channelzEnabled);
        if (this.channelzEnabled) {
            this.channelzTrace.addTrace("CT_INFO", "Channel created");
        }
        if (this.options["grpc.default_authority"]) {
            this.defaultAuthority = this.options["grpc.default_authority"];
        } else {
            this.defaultAuthority = (0, resolver_1.getDefaultAuthority)(defaultSchemeMapResult);
        }
        const proxyMapResult = (0, http_proxy_1.mapProxyName)(defaultSchemeMapResult, options);
        this.target = proxyMapResult.target;
        this.options = Object.assign({}, this.options, proxyMapResult.extraOptions);
        /* The global boolean parameter to getSubchannelPool has the inverse meaning to what
         * the grpc.use_local_subchannel_pool channel option means. */ this.subchannelPool = (0, subchannel_pool_1.getSubchannelPool)(((_c = options["grpc.use_local_subchannel_pool"]) !== null && _c !== void 0 ? _c : 0) === 0);
        this.retryBufferTracker = new retrying_call_1.MessageBufferTracker((_d = options["grpc.retry_buffer_size"]) !== null && _d !== void 0 ? _d : DEFAULT_RETRY_BUFFER_SIZE_BYTES, (_e = options["grpc.per_rpc_retry_buffer_size"]) !== null && _e !== void 0 ? _e : DEFAULT_PER_RPC_RETRY_BUFFER_SIZE_BYTES);
        this.keepaliveTime = (_f = options["grpc.keepalive_time_ms"]) !== null && _f !== void 0 ? _f : -1;
        const channelControlHelper = {
            createSubchannel: (subchannelAddress, subchannelArgs)=>{
                const subchannel = this.subchannelPool.getOrCreateSubchannel(this.target, subchannelAddress, Object.assign({}, this.options, subchannelArgs), this.credentials);
                subchannel.throttleKeepalive(this.keepaliveTime);
                if (this.channelzEnabled) {
                    this.channelzTrace.addTrace("CT_INFO", "Created subchannel or used existing subchannel", subchannel.getChannelzRef());
                }
                const wrappedSubchannel = new ChannelSubchannelWrapper(subchannel, this);
                this.wrappedSubchannels.add(wrappedSubchannel);
                return wrappedSubchannel;
            },
            updateState: (connectivityState, picker)=>{
                this.currentPicker = picker;
                const queueCopy = this.pickQueue.slice();
                this.pickQueue = [];
                this.callRefTimerUnref();
                for (const call of queueCopy){
                    call.doPick();
                }
                this.updateState(connectivityState);
            },
            requestReresolution: ()=>{
                // This should never be called.
                throw new Error("Resolving load balancer should never call requestReresolution");
            },
            addChannelzChild: (child)=>{
                if (this.channelzEnabled) {
                    this.childrenTracker.refChild(child);
                }
            },
            removeChannelzChild: (child)=>{
                if (this.channelzEnabled) {
                    this.childrenTracker.unrefChild(child);
                }
            }
        };
        this.resolvingLoadBalancer = new resolving_load_balancer_1.ResolvingLoadBalancer(this.target, channelControlHelper, options, (serviceConfig, configSelector)=>{
            if (serviceConfig.retryThrottling) {
                RETRY_THROTTLER_MAP.set(this.getTarget(), new retrying_call_1.RetryThrottler(serviceConfig.retryThrottling.maxTokens, serviceConfig.retryThrottling.tokenRatio, RETRY_THROTTLER_MAP.get(this.getTarget())));
            } else {
                RETRY_THROTTLER_MAP.delete(this.getTarget());
            }
            if (this.channelzEnabled) {
                this.channelzTrace.addTrace("CT_INFO", "Address resolution succeeded");
            }
            this.configSelector = configSelector;
            this.currentResolutionError = null;
            /* We process the queue asynchronously to ensure that the corresponding
             * load balancer update has completed. */ process.nextTick(()=>{
                const localQueue = this.configSelectionQueue;
                this.configSelectionQueue = [];
                this.callRefTimerUnref();
                for (const call of localQueue){
                    call.getConfig();
                }
                this.configSelectionQueue = [];
            });
        }, (status)=>{
            if (this.channelzEnabled) {
                this.channelzTrace.addTrace("CT_WARNING", "Address resolution failed with code " + status.code + ' and details "' + status.details + '"');
            }
            if (this.configSelectionQueue.length > 0) {
                this.trace("Name resolution failed with calls queued for config selection");
            }
            if (this.configSelector === null) {
                this.currentResolutionError = Object.assign(Object.assign({}, (0, control_plane_status_1.restrictControlPlaneStatusCode)(status.code, status.details)), {
                    metadata: status.metadata
                });
            }
            const localQueue = this.configSelectionQueue;
            this.configSelectionQueue = [];
            this.callRefTimerUnref();
            for (const call of localQueue){
                call.reportResolverError(status);
            }
        });
        this.filterStackFactory = new filter_stack_1.FilterStackFactory([
            new max_message_size_filter_1.MaxMessageSizeFilterFactory(this.options),
            new compression_filter_1.CompressionFilterFactory(this, this.options)
        ]);
        this.trace("Channel constructed with options " + JSON.stringify(options, undefined, 2));
        const error = new Error();
        (0, logging_1.trace)(constants_1.LogVerbosity.DEBUG, "channel_stacktrace", "(" + this.channelzRef.id + ") " + "Channel constructed \n" + ((_g = error.stack) === null || _g === void 0 ? void 0 : _g.substring(error.stack.indexOf("\n") + 1)));
    }
    getChannelzInfo() {
        return {
            target: this.originalTarget,
            state: this.connectivityState,
            trace: this.channelzTrace,
            callTracker: this.callTracker,
            children: this.childrenTracker.getChildLists()
        };
    }
    trace(text, verbosityOverride) {
        (0, logging_1.trace)(verbosityOverride !== null && verbosityOverride !== void 0 ? verbosityOverride : constants_1.LogVerbosity.DEBUG, "channel", "(" + this.channelzRef.id + ") " + (0, uri_parser_1.uriToString)(this.target) + " " + text);
    }
    callRefTimerRef() {
        var _a, _b, _c, _d;
        // If the hasRef function does not exist, always run the code
        if (!((_b = (_a = this.callRefTimer).hasRef) === null || _b === void 0 ? void 0 : _b.call(_a))) {
            this.trace("callRefTimer.ref | configSelectionQueue.length=" + this.configSelectionQueue.length + " pickQueue.length=" + this.pickQueue.length);
            (_d = (_c = this.callRefTimer).ref) === null || _d === void 0 ? void 0 : _d.call(_c);
        }
    }
    callRefTimerUnref() {
        var _a, _b;
        // If the hasRef function does not exist, always run the code
        if (!this.callRefTimer.hasRef || this.callRefTimer.hasRef()) {
            this.trace("callRefTimer.unref | configSelectionQueue.length=" + this.configSelectionQueue.length + " pickQueue.length=" + this.pickQueue.length);
            (_b = (_a = this.callRefTimer).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
    }
    removeConnectivityStateWatcher(watcherObject) {
        const watcherIndex = this.connectivityStateWatchers.findIndex((value)=>value === watcherObject);
        if (watcherIndex >= 0) {
            this.connectivityStateWatchers.splice(watcherIndex, 1);
        }
    }
    updateState(newState) {
        (0, logging_1.trace)(constants_1.LogVerbosity.DEBUG, "connectivity_state", "(" + this.channelzRef.id + ") " + (0, uri_parser_1.uriToString)(this.target) + " " + connectivity_state_1.ConnectivityState[this.connectivityState] + " -> " + connectivity_state_1.ConnectivityState[newState]);
        if (this.channelzEnabled) {
            this.channelzTrace.addTrace("CT_INFO", connectivity_state_1.ConnectivityState[this.connectivityState] + " -> " + connectivity_state_1.ConnectivityState[newState]);
        }
        this.connectivityState = newState;
        const watchersCopy = this.connectivityStateWatchers.slice();
        for (const watcherObject of watchersCopy){
            if (newState !== watcherObject.currentState) {
                if (watcherObject.timer) {
                    clearTimeout(watcherObject.timer);
                }
                this.removeConnectivityStateWatcher(watcherObject);
                watcherObject.callback();
            }
        }
        if (newState !== connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE) {
            this.currentResolutionError = null;
        }
    }
    throttleKeepalive(newKeepaliveTime) {
        if (newKeepaliveTime > this.keepaliveTime) {
            this.keepaliveTime = newKeepaliveTime;
            for (const wrappedSubchannel of this.wrappedSubchannels){
                wrappedSubchannel.throttleKeepalive(newKeepaliveTime);
            }
        }
    }
    removeWrappedSubchannel(wrappedSubchannel) {
        this.wrappedSubchannels.delete(wrappedSubchannel);
    }
    doPick(metadata, extraPickInfo) {
        return this.currentPicker.pick({
            metadata: metadata,
            extraPickInfo: extraPickInfo
        });
    }
    queueCallForPick(call) {
        this.pickQueue.push(call);
        this.callRefTimerRef();
    }
    getConfig(method, metadata) {
        this.resolvingLoadBalancer.exitIdle();
        if (this.configSelector) {
            return {
                type: "SUCCESS",
                config: this.configSelector(method, metadata)
            };
        } else {
            if (this.currentResolutionError) {
                return {
                    type: "ERROR",
                    error: this.currentResolutionError
                };
            } else {
                return {
                    type: "NONE"
                };
            }
        }
    }
    queueCallForConfig(call) {
        this.configSelectionQueue.push(call);
        this.callRefTimerRef();
    }
    createLoadBalancingCall(callConfig, method, host, credentials, deadline) {
        const callNumber = (0, call_number_1.getNextCallNumber)();
        this.trace("createLoadBalancingCall [" + callNumber + '] method="' + method + '"');
        return new load_balancing_call_1.LoadBalancingCall(this, callConfig, method, host, credentials, deadline, callNumber);
    }
    createRetryingCall(callConfig, method, host, credentials, deadline) {
        const callNumber = (0, call_number_1.getNextCallNumber)();
        this.trace("createRetryingCall [" + callNumber + '] method="' + method + '"');
        return new retrying_call_1.RetryingCall(this, callConfig, method, host, credentials, deadline, callNumber, this.retryBufferTracker, RETRY_THROTTLER_MAP.get(this.getTarget()));
    }
    createInnerCall(callConfig, method, host, credentials, deadline) {
        // Create a RetryingCall if retries are enabled
        if (this.options["grpc.enable_retries"] === 0) {
            return this.createLoadBalancingCall(callConfig, method, host, credentials, deadline);
        } else {
            return this.createRetryingCall(callConfig, method, host, credentials, deadline);
        }
    }
    createResolvingCall(method, deadline, host, parentCall, propagateFlags) {
        const callNumber = (0, call_number_1.getNextCallNumber)();
        this.trace("createResolvingCall [" + callNumber + '] method="' + method + '", deadline=' + (0, deadline_1.deadlineToString)(deadline));
        const finalOptions = {
            deadline: deadline,
            flags: propagateFlags !== null && propagateFlags !== void 0 ? propagateFlags : constants_1.Propagate.DEFAULTS,
            host: host !== null && host !== void 0 ? host : this.defaultAuthority,
            parentCall: parentCall
        };
        const call = new resolving_call_1.ResolvingCall(this, method, finalOptions, this.filterStackFactory.clone(), this.credentials._getCallCredentials(), callNumber);
        if (this.channelzEnabled) {
            this.callTracker.addCallStarted();
            call.addStatusWatcher((status)=>{
                if (status.code === constants_1.Status.OK) {
                    this.callTracker.addCallSucceeded();
                } else {
                    this.callTracker.addCallFailed();
                }
            });
        }
        return call;
    }
    close() {
        this.resolvingLoadBalancer.destroy();
        this.updateState(connectivity_state_1.ConnectivityState.SHUTDOWN);
        clearInterval(this.callRefTimer);
        if (this.channelzEnabled) {
            (0, channelz_1.unregisterChannelzRef)(this.channelzRef);
        }
        this.subchannelPool.unrefUnusedSubchannels();
    }
    getTarget() {
        return (0, uri_parser_1.uriToString)(this.target);
    }
    getConnectivityState(tryToConnect) {
        const connectivityState = this.connectivityState;
        if (tryToConnect) {
            this.resolvingLoadBalancer.exitIdle();
        }
        return connectivityState;
    }
    watchConnectivityState(currentState, deadline, callback) {
        if (this.connectivityState === connectivity_state_1.ConnectivityState.SHUTDOWN) {
            throw new Error("Channel has been shut down");
        }
        let timer = null;
        if (deadline !== Infinity) {
            const deadlineDate = deadline instanceof Date ? deadline : new Date(deadline);
            const now = new Date();
            if (deadline === -Infinity || deadlineDate <= now) {
                process.nextTick(callback, new Error("Deadline passed without connectivity state change"));
                return;
            }
            timer = setTimeout(()=>{
                this.removeConnectivityStateWatcher(watcherObject);
                callback(new Error("Deadline passed without connectivity state change"));
            }, deadlineDate.getTime() - now.getTime());
        }
        const watcherObject = {
            currentState,
            callback,
            timer
        };
        this.connectivityStateWatchers.push(watcherObject);
    }
    /**
     * Get the channelz reference object for this channel. The returned value is
     * garbage if channelz is disabled for this channel.
     * @returns
     */ getChannelzRef() {
        return this.channelzRef;
    }
    createCall(method, deadline, host, parentCall, propagateFlags) {
        if (typeof method !== "string") {
            throw new TypeError("Channel#createCall: method must be a string");
        }
        if (!(typeof deadline === "number" || deadline instanceof Date)) {
            throw new TypeError("Channel#createCall: deadline must be a number or Date");
        }
        if (this.connectivityState === connectivity_state_1.ConnectivityState.SHUTDOWN) {
            throw new Error("Channel has been shut down");
        }
        return this.createResolvingCall(method, deadline, host, parentCall, propagateFlags);
    }
}
exports.InternalChannel = InternalChannel; //# sourceMappingURL=internal-channel.js.map


/***/ }),

/***/ 84970:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2020 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.ChildLoadBalancerHandler = void 0;
const load_balancer_1 = __webpack_require__(64189);
const connectivity_state_1 = __webpack_require__(16035);
const TYPE_NAME = "child_load_balancer_helper";
class ChildLoadBalancerHandler {
    constructor(channelControlHelper){
        this.channelControlHelper = channelControlHelper;
        this.currentChild = null;
        this.pendingChild = null;
        this.ChildPolicyHelper = class {
            constructor(parent){
                this.parent = parent;
                this.child = null;
            }
            createSubchannel(subchannelAddress, subchannelArgs) {
                return this.parent.channelControlHelper.createSubchannel(subchannelAddress, subchannelArgs);
            }
            updateState(connectivityState, picker) {
                var _a;
                if (this.calledByPendingChild()) {
                    if (connectivityState === connectivity_state_1.ConnectivityState.CONNECTING) {
                        return;
                    }
                    (_a = this.parent.currentChild) === null || _a === void 0 ? void 0 : _a.destroy();
                    this.parent.currentChild = this.parent.pendingChild;
                    this.parent.pendingChild = null;
                } else if (!this.calledByCurrentChild()) {
                    return;
                }
                this.parent.channelControlHelper.updateState(connectivityState, picker);
            }
            requestReresolution() {
                var _a;
                const latestChild = (_a = this.parent.pendingChild) !== null && _a !== void 0 ? _a : this.parent.currentChild;
                if (this.child === latestChild) {
                    this.parent.channelControlHelper.requestReresolution();
                }
            }
            setChild(newChild) {
                this.child = newChild;
            }
            addChannelzChild(child) {
                this.parent.channelControlHelper.addChannelzChild(child);
            }
            removeChannelzChild(child) {
                this.parent.channelControlHelper.removeChannelzChild(child);
            }
            calledByPendingChild() {
                return this.child === this.parent.pendingChild;
            }
            calledByCurrentChild() {
                return this.child === this.parent.currentChild;
            }
        };
    }
    /**
     * Prerequisites: lbConfig !== null and lbConfig.name is registered
     * @param addressList
     * @param lbConfig
     * @param attributes
     */ updateAddressList(addressList, lbConfig, attributes) {
        let childToUpdate;
        if (this.currentChild === null || this.currentChild.getTypeName() !== lbConfig.getLoadBalancerName()) {
            const newHelper = new this.ChildPolicyHelper(this);
            const newChild = (0, load_balancer_1.createLoadBalancer)(lbConfig, newHelper);
            newHelper.setChild(newChild);
            if (this.currentChild === null) {
                this.currentChild = newChild;
                childToUpdate = this.currentChild;
            } else {
                if (this.pendingChild) {
                    this.pendingChild.destroy();
                }
                this.pendingChild = newChild;
                childToUpdate = this.pendingChild;
            }
        } else {
            if (this.pendingChild === null) {
                childToUpdate = this.currentChild;
            } else {
                childToUpdate = this.pendingChild;
            }
        }
        childToUpdate.updateAddressList(addressList, lbConfig, attributes);
    }
    exitIdle() {
        if (this.currentChild) {
            this.currentChild.exitIdle();
            if (this.pendingChild) {
                this.pendingChild.exitIdle();
            }
        }
    }
    resetBackoff() {
        if (this.currentChild) {
            this.currentChild.resetBackoff();
            if (this.pendingChild) {
                this.pendingChild.resetBackoff();
            }
        }
    }
    destroy() {
        if (this.currentChild) {
            this.currentChild.destroy();
            this.currentChild = null;
        }
        if (this.pendingChild) {
            this.pendingChild.destroy();
            this.pendingChild = null;
        }
    }
    getTypeName() {
        return TYPE_NAME;
    }
}
exports.ChildLoadBalancerHandler = ChildLoadBalancerHandler; //# sourceMappingURL=load-balancer-child-handler.js.map


/***/ }),

/***/ 40373:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2022 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ var _a;
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.setup = exports.OutlierDetectionLoadBalancer = exports.OutlierDetectionLoadBalancingConfig = void 0;
const connectivity_state_1 = __webpack_require__(16035);
const constants_1 = __webpack_require__(60076);
const duration_1 = __webpack_require__(6464);
const experimental_1 = __webpack_require__(51467);
const load_balancer_1 = __webpack_require__(64189);
const load_balancer_child_handler_1 = __webpack_require__(84970);
const picker_1 = __webpack_require__(19786);
const subchannel_address_1 = __webpack_require__(27631);
const subchannel_interface_1 = __webpack_require__(22561);
const logging = __webpack_require__(67738);
const TRACER_NAME = "outlier_detection";
function trace(text) {
    logging.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, text);
}
const TYPE_NAME = "outlier_detection";
const OUTLIER_DETECTION_ENABLED = ((_a = process.env.GRPC_EXPERIMENTAL_ENABLE_OUTLIER_DETECTION) !== null && _a !== void 0 ? _a : "true") === "true";
const defaultSuccessRateEjectionConfig = {
    stdev_factor: 1900,
    enforcement_percentage: 100,
    minimum_hosts: 5,
    request_volume: 100
};
const defaultFailurePercentageEjectionConfig = {
    threshold: 85,
    enforcement_percentage: 100,
    minimum_hosts: 5,
    request_volume: 50
};
function validateFieldType(obj, fieldName, expectedType, objectName) {
    if (fieldName in obj && typeof obj[fieldName] !== expectedType) {
        const fullFieldName = objectName ? `${objectName}.${fieldName}` : fieldName;
        throw new Error(`outlier detection config ${fullFieldName} parse error: expected ${expectedType}, got ${typeof obj[fieldName]}`);
    }
}
function validatePositiveDuration(obj, fieldName, objectName) {
    const fullFieldName = objectName ? `${objectName}.${fieldName}` : fieldName;
    if (fieldName in obj) {
        if (!(0, duration_1.isDuration)(obj[fieldName])) {
            throw new Error(`outlier detection config ${fullFieldName} parse error: expected Duration, got ${typeof obj[fieldName]}`);
        }
        if (!(obj[fieldName].seconds >= 0 && obj[fieldName].seconds <= 315576000000 && obj[fieldName].nanos >= 0 && obj[fieldName].nanos <= 999999999)) {
            throw new Error(`outlier detection config ${fullFieldName} parse error: values out of range for non-negative Duaration`);
        }
    }
}
function validatePercentage(obj, fieldName, objectName) {
    const fullFieldName = objectName ? `${objectName}.${fieldName}` : fieldName;
    validateFieldType(obj, fieldName, "number", objectName);
    if (fieldName in obj && !(obj[fieldName] >= 0 && obj[fieldName] <= 100)) {
        throw new Error(`outlier detection config ${fullFieldName} parse error: value out of range for percentage (0-100)`);
    }
}
class OutlierDetectionLoadBalancingConfig {
    constructor(intervalMs, baseEjectionTimeMs, maxEjectionTimeMs, maxEjectionPercent, successRateEjection, failurePercentageEjection, childPolicy){
        this.childPolicy = childPolicy;
        this.intervalMs = intervalMs !== null && intervalMs !== void 0 ? intervalMs : 10000;
        this.baseEjectionTimeMs = baseEjectionTimeMs !== null && baseEjectionTimeMs !== void 0 ? baseEjectionTimeMs : 30000;
        this.maxEjectionTimeMs = maxEjectionTimeMs !== null && maxEjectionTimeMs !== void 0 ? maxEjectionTimeMs : 300000;
        this.maxEjectionPercent = maxEjectionPercent !== null && maxEjectionPercent !== void 0 ? maxEjectionPercent : 10;
        this.successRateEjection = successRateEjection ? Object.assign(Object.assign({}, defaultSuccessRateEjectionConfig), successRateEjection) : null;
        this.failurePercentageEjection = failurePercentageEjection ? Object.assign(Object.assign({}, defaultFailurePercentageEjectionConfig), failurePercentageEjection) : null;
    }
    getLoadBalancerName() {
        return TYPE_NAME;
    }
    toJsonObject() {
        return {
            interval: (0, duration_1.msToDuration)(this.intervalMs),
            base_ejection_time: (0, duration_1.msToDuration)(this.baseEjectionTimeMs),
            max_ejection_time: (0, duration_1.msToDuration)(this.maxEjectionTimeMs),
            max_ejection_percent: this.maxEjectionPercent,
            success_rate_ejection: this.successRateEjection,
            failure_percentage_ejection: this.failurePercentageEjection,
            child_policy: this.childPolicy.map((policy)=>policy.toJsonObject())
        };
    }
    getIntervalMs() {
        return this.intervalMs;
    }
    getBaseEjectionTimeMs() {
        return this.baseEjectionTimeMs;
    }
    getMaxEjectionTimeMs() {
        return this.maxEjectionTimeMs;
    }
    getMaxEjectionPercent() {
        return this.maxEjectionPercent;
    }
    getSuccessRateEjectionConfig() {
        return this.successRateEjection;
    }
    getFailurePercentageEjectionConfig() {
        return this.failurePercentageEjection;
    }
    getChildPolicy() {
        return this.childPolicy;
    }
    copyWithChildPolicy(childPolicy) {
        return new OutlierDetectionLoadBalancingConfig(this.intervalMs, this.baseEjectionTimeMs, this.maxEjectionTimeMs, this.maxEjectionPercent, this.successRateEjection, this.failurePercentageEjection, childPolicy);
    }
    static createFromJson(obj) {
        var _a;
        validatePositiveDuration(obj, "interval");
        validatePositiveDuration(obj, "base_ejection_time");
        validatePositiveDuration(obj, "max_ejection_time");
        validatePercentage(obj, "max_ejection_percent");
        if ("success_rate_ejection" in obj) {
            if (typeof obj.success_rate_ejection !== "object") {
                throw new Error("outlier detection config success_rate_ejection must be an object");
            }
            validateFieldType(obj.success_rate_ejection, "stdev_factor", "number", "success_rate_ejection");
            validatePercentage(obj.success_rate_ejection, "enforcement_percentage", "success_rate_ejection");
            validateFieldType(obj.success_rate_ejection, "minimum_hosts", "number", "success_rate_ejection");
            validateFieldType(obj.success_rate_ejection, "request_volume", "number", "success_rate_ejection");
        }
        if ("failure_percentage_ejection" in obj) {
            if (typeof obj.failure_percentage_ejection !== "object") {
                throw new Error("outlier detection config failure_percentage_ejection must be an object");
            }
            validatePercentage(obj.failure_percentage_ejection, "threshold", "failure_percentage_ejection");
            validatePercentage(obj.failure_percentage_ejection, "enforcement_percentage", "failure_percentage_ejection");
            validateFieldType(obj.failure_percentage_ejection, "minimum_hosts", "number", "failure_percentage_ejection");
            validateFieldType(obj.failure_percentage_ejection, "request_volume", "number", "failure_percentage_ejection");
        }
        return new OutlierDetectionLoadBalancingConfig(obj.interval ? (0, duration_1.durationToMs)(obj.interval) : null, obj.base_ejection_time ? (0, duration_1.durationToMs)(obj.base_ejection_time) : null, obj.max_ejection_time ? (0, duration_1.durationToMs)(obj.max_ejection_time) : null, (_a = obj.max_ejection_percent) !== null && _a !== void 0 ? _a : null, obj.success_rate_ejection, obj.failure_percentage_ejection, obj.child_policy.map(load_balancer_1.validateLoadBalancingConfig));
    }
}
exports.OutlierDetectionLoadBalancingConfig = OutlierDetectionLoadBalancingConfig;
class OutlierDetectionSubchannelWrapper extends subchannel_interface_1.BaseSubchannelWrapper {
    constructor(childSubchannel, mapEntry){
        super(childSubchannel);
        this.mapEntry = mapEntry;
        this.stateListeners = [];
        this.ejected = false;
        this.refCount = 0;
        this.childSubchannelState = childSubchannel.getConnectivityState();
        childSubchannel.addConnectivityStateListener((subchannel, previousState, newState, keepaliveTime)=>{
            this.childSubchannelState = newState;
            if (!this.ejected) {
                for (const listener of this.stateListeners){
                    listener(this, previousState, newState, keepaliveTime);
                }
            }
        });
    }
    getConnectivityState() {
        if (this.ejected) {
            return connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE;
        } else {
            return this.childSubchannelState;
        }
    }
    /**
     * Add a listener function to be called whenever the wrapper's
     * connectivity state changes.
     * @param listener
     */ addConnectivityStateListener(listener) {
        this.stateListeners.push(listener);
    }
    /**
     * Remove a listener previously added with `addConnectivityStateListener`
     * @param listener A reference to a function previously passed to
     *     `addConnectivityStateListener`
     */ removeConnectivityStateListener(listener) {
        const listenerIndex = this.stateListeners.indexOf(listener);
        if (listenerIndex > -1) {
            this.stateListeners.splice(listenerIndex, 1);
        }
    }
    ref() {
        this.child.ref();
        this.refCount += 1;
    }
    unref() {
        this.child.unref();
        this.refCount -= 1;
        if (this.refCount <= 0) {
            if (this.mapEntry) {
                const index = this.mapEntry.subchannelWrappers.indexOf(this);
                if (index >= 0) {
                    this.mapEntry.subchannelWrappers.splice(index, 1);
                }
            }
        }
    }
    eject() {
        this.ejected = true;
        for (const listener of this.stateListeners){
            listener(this, this.childSubchannelState, connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE, -1);
        }
    }
    uneject() {
        this.ejected = false;
        for (const listener of this.stateListeners){
            listener(this, connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE, this.childSubchannelState, -1);
        }
    }
    getMapEntry() {
        return this.mapEntry;
    }
    getWrappedSubchannel() {
        return this.child;
    }
}
function createEmptyBucket() {
    return {
        success: 0,
        failure: 0
    };
}
class CallCounter {
    constructor(){
        this.activeBucket = createEmptyBucket();
        this.inactiveBucket = createEmptyBucket();
    }
    addSuccess() {
        this.activeBucket.success += 1;
    }
    addFailure() {
        this.activeBucket.failure += 1;
    }
    switchBuckets() {
        this.inactiveBucket = this.activeBucket;
        this.activeBucket = createEmptyBucket();
    }
    getLastSuccesses() {
        return this.inactiveBucket.success;
    }
    getLastFailures() {
        return this.inactiveBucket.failure;
    }
}
class OutlierDetectionPicker {
    constructor(wrappedPicker, countCalls){
        this.wrappedPicker = wrappedPicker;
        this.countCalls = countCalls;
    }
    pick(pickArgs) {
        const wrappedPick = this.wrappedPicker.pick(pickArgs);
        if (wrappedPick.pickResultType === picker_1.PickResultType.COMPLETE) {
            const subchannelWrapper = wrappedPick.subchannel;
            const mapEntry = subchannelWrapper.getMapEntry();
            if (mapEntry) {
                let onCallEnded = wrappedPick.onCallEnded;
                if (this.countCalls) {
                    onCallEnded = (statusCode)=>{
                        var _a;
                        if (statusCode === constants_1.Status.OK) {
                            mapEntry.counter.addSuccess();
                        } else {
                            mapEntry.counter.addFailure();
                        }
                        (_a = wrappedPick.onCallEnded) === null || _a === void 0 ? void 0 : _a.call(wrappedPick, statusCode);
                    };
                }
                return Object.assign(Object.assign({}, wrappedPick), {
                    subchannel: subchannelWrapper.getWrappedSubchannel(),
                    onCallEnded: onCallEnded
                });
            } else {
                return Object.assign(Object.assign({}, wrappedPick), {
                    subchannel: subchannelWrapper.getWrappedSubchannel()
                });
            }
        } else {
            return wrappedPick;
        }
    }
}
class OutlierDetectionLoadBalancer {
    constructor(channelControlHelper){
        this.addressMap = new Map();
        this.latestConfig = null;
        this.timerStartTime = null;
        this.childBalancer = new load_balancer_child_handler_1.ChildLoadBalancerHandler((0, experimental_1.createChildChannelControlHelper)(channelControlHelper, {
            createSubchannel: (subchannelAddress, subchannelArgs)=>{
                const originalSubchannel = channelControlHelper.createSubchannel(subchannelAddress, subchannelArgs);
                const mapEntry = this.addressMap.get((0, subchannel_address_1.subchannelAddressToString)(subchannelAddress));
                const subchannelWrapper = new OutlierDetectionSubchannelWrapper(originalSubchannel, mapEntry);
                if ((mapEntry === null || mapEntry === void 0 ? void 0 : mapEntry.currentEjectionTimestamp) !== null) {
                    // If the address is ejected, propagate that to the new subchannel wrapper
                    subchannelWrapper.eject();
                }
                mapEntry === null || mapEntry === void 0 ? void 0 : mapEntry.subchannelWrappers.push(subchannelWrapper);
                return subchannelWrapper;
            },
            updateState: (connectivityState, picker)=>{
                if (connectivityState === connectivity_state_1.ConnectivityState.READY) {
                    channelControlHelper.updateState(connectivityState, new OutlierDetectionPicker(picker, this.isCountingEnabled()));
                } else {
                    channelControlHelper.updateState(connectivityState, picker);
                }
            }
        }));
        this.ejectionTimer = setInterval(()=>{}, 0);
        clearInterval(this.ejectionTimer);
    }
    isCountingEnabled() {
        return this.latestConfig !== null && (this.latestConfig.getSuccessRateEjectionConfig() !== null || this.latestConfig.getFailurePercentageEjectionConfig() !== null);
    }
    getCurrentEjectionPercent() {
        let ejectionCount = 0;
        for (const mapEntry of this.addressMap.values()){
            if (mapEntry.currentEjectionTimestamp !== null) {
                ejectionCount += 1;
            }
        }
        return ejectionCount * 100 / this.addressMap.size;
    }
    runSuccessRateCheck(ejectionTimestamp) {
        if (!this.latestConfig) {
            return;
        }
        const successRateConfig = this.latestConfig.getSuccessRateEjectionConfig();
        if (!successRateConfig) {
            return;
        }
        trace("Running success rate check");
        // Step 1
        const targetRequestVolume = successRateConfig.request_volume;
        let addresesWithTargetVolume = 0;
        const successRates = [];
        for (const [address, mapEntry] of this.addressMap){
            const successes = mapEntry.counter.getLastSuccesses();
            const failures = mapEntry.counter.getLastFailures();
            trace("Stats for " + address + ": successes=" + successes + " failures=" + failures + " targetRequestVolume=" + targetRequestVolume);
            if (successes + failures >= targetRequestVolume) {
                addresesWithTargetVolume += 1;
                successRates.push(successes / (successes + failures));
            }
        }
        trace("Found " + addresesWithTargetVolume + " success rate candidates; currentEjectionPercent=" + this.getCurrentEjectionPercent() + " successRates=[" + successRates + "]");
        if (addresesWithTargetVolume < successRateConfig.minimum_hosts) {
            return;
        }
        // Step 2
        const successRateMean = successRates.reduce((a, b)=>a + b) / successRates.length;
        let successRateDeviationSum = 0;
        for (const rate of successRates){
            const deviation = rate - successRateMean;
            successRateDeviationSum += deviation * deviation;
        }
        const successRateVariance = successRateDeviationSum / successRates.length;
        const successRateStdev = Math.sqrt(successRateVariance);
        const ejectionThreshold = successRateMean - successRateStdev * (successRateConfig.stdev_factor / 1000);
        trace("stdev=" + successRateStdev + " ejectionThreshold=" + ejectionThreshold);
        // Step 3
        for (const [address, mapEntry] of this.addressMap.entries()){
            // Step 3.i
            if (this.getCurrentEjectionPercent() >= this.latestConfig.getMaxEjectionPercent()) {
                break;
            }
            // Step 3.ii
            const successes = mapEntry.counter.getLastSuccesses();
            const failures = mapEntry.counter.getLastFailures();
            if (successes + failures < targetRequestVolume) {
                continue;
            }
            // Step 3.iii
            const successRate = successes / (successes + failures);
            trace("Checking candidate " + address + " successRate=" + successRate);
            if (successRate < ejectionThreshold) {
                const randomNumber = Math.random() * 100;
                trace("Candidate " + address + " randomNumber=" + randomNumber + " enforcement_percentage=" + successRateConfig.enforcement_percentage);
                if (randomNumber < successRateConfig.enforcement_percentage) {
                    trace("Ejecting candidate " + address);
                    this.eject(mapEntry, ejectionTimestamp);
                }
            }
        }
    }
    runFailurePercentageCheck(ejectionTimestamp) {
        if (!this.latestConfig) {
            return;
        }
        const failurePercentageConfig = this.latestConfig.getFailurePercentageEjectionConfig();
        if (!failurePercentageConfig) {
            return;
        }
        trace("Running failure percentage check. threshold=" + failurePercentageConfig.threshold + " request volume threshold=" + failurePercentageConfig.request_volume);
        // Step 1
        let addressesWithTargetVolume = 0;
        for (const mapEntry of this.addressMap.values()){
            const successes = mapEntry.counter.getLastSuccesses();
            const failures = mapEntry.counter.getLastFailures();
            if (successes + failures >= failurePercentageConfig.request_volume) {
                addressesWithTargetVolume += 1;
            }
        }
        if (addressesWithTargetVolume < failurePercentageConfig.minimum_hosts) {
            return;
        }
        // Step 2
        for (const [address, mapEntry] of this.addressMap.entries()){
            // Step 2.i
            if (this.getCurrentEjectionPercent() >= this.latestConfig.getMaxEjectionPercent()) {
                break;
            }
            // Step 2.ii
            const successes = mapEntry.counter.getLastSuccesses();
            const failures = mapEntry.counter.getLastFailures();
            trace("Candidate successes=" + successes + " failures=" + failures);
            if (successes + failures < failurePercentageConfig.request_volume) {
                continue;
            }
            // Step 2.iii
            const failurePercentage = failures * 100 / (failures + successes);
            if (failurePercentage > failurePercentageConfig.threshold) {
                const randomNumber = Math.random() * 100;
                trace("Candidate " + address + " randomNumber=" + randomNumber + " enforcement_percentage=" + failurePercentageConfig.enforcement_percentage);
                if (randomNumber < failurePercentageConfig.enforcement_percentage) {
                    trace("Ejecting candidate " + address);
                    this.eject(mapEntry, ejectionTimestamp);
                }
            }
        }
    }
    eject(mapEntry, ejectionTimestamp) {
        mapEntry.currentEjectionTimestamp = new Date();
        mapEntry.ejectionTimeMultiplier += 1;
        for (const subchannelWrapper of mapEntry.subchannelWrappers){
            subchannelWrapper.eject();
        }
    }
    uneject(mapEntry) {
        mapEntry.currentEjectionTimestamp = null;
        for (const subchannelWrapper of mapEntry.subchannelWrappers){
            subchannelWrapper.uneject();
        }
    }
    switchAllBuckets() {
        for (const mapEntry of this.addressMap.values()){
            mapEntry.counter.switchBuckets();
        }
    }
    startTimer(delayMs) {
        var _a, _b;
        this.ejectionTimer = setTimeout(()=>this.runChecks(), delayMs);
        (_b = (_a = this.ejectionTimer).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    runChecks() {
        const ejectionTimestamp = new Date();
        trace("Ejection timer running");
        this.switchAllBuckets();
        if (!this.latestConfig) {
            return;
        }
        this.timerStartTime = ejectionTimestamp;
        this.startTimer(this.latestConfig.getIntervalMs());
        this.runSuccessRateCheck(ejectionTimestamp);
        this.runFailurePercentageCheck(ejectionTimestamp);
        for (const [address, mapEntry] of this.addressMap.entries()){
            if (mapEntry.currentEjectionTimestamp === null) {
                if (mapEntry.ejectionTimeMultiplier > 0) {
                    mapEntry.ejectionTimeMultiplier -= 1;
                }
            } else {
                const baseEjectionTimeMs = this.latestConfig.getBaseEjectionTimeMs();
                const maxEjectionTimeMs = this.latestConfig.getMaxEjectionTimeMs();
                const returnTime = new Date(mapEntry.currentEjectionTimestamp.getTime());
                returnTime.setMilliseconds(returnTime.getMilliseconds() + Math.min(baseEjectionTimeMs * mapEntry.ejectionTimeMultiplier, Math.max(baseEjectionTimeMs, maxEjectionTimeMs)));
                if (returnTime < new Date()) {
                    trace("Unejecting " + address);
                    this.uneject(mapEntry);
                }
            }
        }
    }
    updateAddressList(addressList, lbConfig, attributes) {
        if (!(lbConfig instanceof OutlierDetectionLoadBalancingConfig)) {
            return;
        }
        const subchannelAddresses = new Set();
        for (const address of addressList){
            subchannelAddresses.add((0, subchannel_address_1.subchannelAddressToString)(address));
        }
        for (const address of subchannelAddresses){
            if (!this.addressMap.has(address)) {
                trace("Adding map entry for " + address);
                this.addressMap.set(address, {
                    counter: new CallCounter(),
                    currentEjectionTimestamp: null,
                    ejectionTimeMultiplier: 0,
                    subchannelWrappers: []
                });
            }
        }
        for (const key of this.addressMap.keys()){
            if (!subchannelAddresses.has(key)) {
                trace("Removing map entry for " + key);
                this.addressMap.delete(key);
            }
        }
        const childPolicy = (0, load_balancer_1.getFirstUsableConfig)(lbConfig.getChildPolicy(), true);
        this.childBalancer.updateAddressList(addressList, childPolicy, attributes);
        if (lbConfig.getSuccessRateEjectionConfig() || lbConfig.getFailurePercentageEjectionConfig()) {
            if (this.timerStartTime) {
                trace("Previous timer existed. Replacing timer");
                clearTimeout(this.ejectionTimer);
                const remainingDelay = lbConfig.getIntervalMs() - (new Date().getTime() - this.timerStartTime.getTime());
                this.startTimer(remainingDelay);
            } else {
                trace("Starting new timer");
                this.timerStartTime = new Date();
                this.startTimer(lbConfig.getIntervalMs());
                this.switchAllBuckets();
            }
        } else {
            trace("Counting disabled. Cancelling timer.");
            this.timerStartTime = null;
            clearTimeout(this.ejectionTimer);
            for (const mapEntry of this.addressMap.values()){
                this.uneject(mapEntry);
                mapEntry.ejectionTimeMultiplier = 0;
            }
        }
        this.latestConfig = lbConfig;
    }
    exitIdle() {
        this.childBalancer.exitIdle();
    }
    resetBackoff() {
        this.childBalancer.resetBackoff();
    }
    destroy() {
        clearTimeout(this.ejectionTimer);
        this.childBalancer.destroy();
    }
    getTypeName() {
        return TYPE_NAME;
    }
}
exports.OutlierDetectionLoadBalancer = OutlierDetectionLoadBalancer;
function setup() {
    if (OUTLIER_DETECTION_ENABLED) {
        (0, experimental_1.registerLoadBalancerType)(TYPE_NAME, OutlierDetectionLoadBalancer, OutlierDetectionLoadBalancingConfig);
    }
}
exports.setup = setup; //# sourceMappingURL=load-balancer-outlier-detection.js.map


/***/ }),

/***/ 73576:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.setup = exports.PickFirstLoadBalancer = exports.PickFirstLoadBalancingConfig = void 0;
const load_balancer_1 = __webpack_require__(64189);
const connectivity_state_1 = __webpack_require__(16035);
const picker_1 = __webpack_require__(19786);
const subchannel_address_1 = __webpack_require__(27631);
const logging = __webpack_require__(67738);
const constants_1 = __webpack_require__(60076);
const TRACER_NAME = "pick_first";
function trace(text) {
    logging.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, text);
}
const TYPE_NAME = "pick_first";
/**
 * Delay after starting a connection on a subchannel before starting a
 * connection on the next subchannel in the list, for Happy Eyeballs algorithm.
 */ const CONNECTION_DELAY_INTERVAL_MS = 250;
class PickFirstLoadBalancingConfig {
    getLoadBalancerName() {
        return TYPE_NAME;
    }
    constructor(){}
    toJsonObject() {
        return {
            [TYPE_NAME]: {}
        };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static createFromJson(obj) {
        return new PickFirstLoadBalancingConfig();
    }
}
exports.PickFirstLoadBalancingConfig = PickFirstLoadBalancingConfig;
/**
 * Picker for a `PickFirstLoadBalancer` in the READY state. Always returns the
 * picked subchannel.
 */ class PickFirstPicker {
    constructor(subchannel){
        this.subchannel = subchannel;
    }
    pick(pickArgs) {
        return {
            pickResultType: picker_1.PickResultType.COMPLETE,
            subchannel: this.subchannel,
            status: null,
            onCallStarted: null,
            onCallEnded: null
        };
    }
}
class PickFirstLoadBalancer {
    /**
     * Load balancer that attempts to connect to each backend in the address list
     * in order, and picks the first one that connects, using it for every
     * request.
     * @param channelControlHelper `ChannelControlHelper` instance provided by
     *     this load balancer's owner.
     */ constructor(channelControlHelper){
        this.channelControlHelper = channelControlHelper;
        /**
         * The list of backend addresses most recently passed to `updateAddressList`.
         */ this.latestAddressList = [];
        /**
         * The list of subchannels this load balancer is currently attempting to
         * connect to.
         */ this.subchannels = [];
        /**
         * The current connectivity state of the load balancer.
         */ this.currentState = connectivity_state_1.ConnectivityState.IDLE;
        /**
         * The index within the `subchannels` array of the subchannel with the most
         * recently started connection attempt.
         */ this.currentSubchannelIndex = 0;
        /**
         * The currently picked subchannel used for making calls. Populated if
         * and only if the load balancer's current state is READY. In that case,
         * the subchannel's current state is also READY.
         */ this.currentPick = null;
        this.triedAllSubchannels = false;
        this.subchannelStateCounts = {
            [connectivity_state_1.ConnectivityState.CONNECTING]: 0,
            [connectivity_state_1.ConnectivityState.IDLE]: 0,
            [connectivity_state_1.ConnectivityState.READY]: 0,
            [connectivity_state_1.ConnectivityState.SHUTDOWN]: 0,
            [connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE]: 0
        };
        this.subchannelStateListener = (subchannel, previousState, newState)=>{
            this.subchannelStateCounts[previousState] -= 1;
            this.subchannelStateCounts[newState] += 1;
            /* If the subchannel we most recently attempted to start connecting
             * to goes into TRANSIENT_FAILURE, immediately try to start
             * connecting to the next one instead of waiting for the connection
             * delay timer. */ if (subchannel.getRealSubchannel() === this.subchannels[this.currentSubchannelIndex].getRealSubchannel() && newState === connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE) {
                this.startNextSubchannelConnecting();
            }
            if (newState === connectivity_state_1.ConnectivityState.READY) {
                this.pickSubchannel(subchannel);
                return;
            } else {
                if (this.triedAllSubchannels && this.subchannelStateCounts[connectivity_state_1.ConnectivityState.IDLE] === this.subchannels.length) {
                    /* If all of the subchannels are IDLE we should go back to a
                     * basic IDLE state where there is no subchannel list to avoid
                     * holding unused resources. We do not reset triedAllSubchannels
                     * because that is a reminder to request reresolution the next time
                     * this LB policy needs to connect. */ this.resetSubchannelList(false);
                    this.updateState(connectivity_state_1.ConnectivityState.IDLE, new picker_1.QueuePicker(this));
                    return;
                }
                if (this.currentPick === null) {
                    if (this.triedAllSubchannels) {
                        let newLBState;
                        if (this.subchannelStateCounts[connectivity_state_1.ConnectivityState.CONNECTING] > 0) {
                            newLBState = connectivity_state_1.ConnectivityState.CONNECTING;
                        } else if (this.subchannelStateCounts[connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE] > 0) {
                            newLBState = connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE;
                        } else {
                            newLBState = connectivity_state_1.ConnectivityState.IDLE;
                        }
                        if (newLBState !== this.currentState) {
                            if (newLBState === connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE) {
                                this.updateState(newLBState, new picker_1.UnavailablePicker());
                            } else {
                                this.updateState(newLBState, new picker_1.QueuePicker(this));
                            }
                        }
                    } else {
                        this.updateState(connectivity_state_1.ConnectivityState.CONNECTING, new picker_1.QueuePicker(this));
                    }
                }
            }
        };
        this.pickedSubchannelStateListener = (subchannel, previousState, newState)=>{
            if (newState !== connectivity_state_1.ConnectivityState.READY) {
                this.currentPick = null;
                subchannel.unref();
                subchannel.removeConnectivityStateListener(this.pickedSubchannelStateListener);
                this.channelControlHelper.removeChannelzChild(subchannel.getChannelzRef());
                if (this.subchannels.length > 0) {
                    if (this.triedAllSubchannels) {
                        let newLBState;
                        if (this.subchannelStateCounts[connectivity_state_1.ConnectivityState.CONNECTING] > 0) {
                            newLBState = connectivity_state_1.ConnectivityState.CONNECTING;
                        } else if (this.subchannelStateCounts[connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE] > 0) {
                            newLBState = connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE;
                        } else {
                            newLBState = connectivity_state_1.ConnectivityState.IDLE;
                        }
                        if (newLBState === connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE) {
                            this.updateState(newLBState, new picker_1.UnavailablePicker());
                        } else {
                            this.updateState(newLBState, new picker_1.QueuePicker(this));
                        }
                    } else {
                        this.updateState(connectivity_state_1.ConnectivityState.CONNECTING, new picker_1.QueuePicker(this));
                    }
                } else {
                    /* We don't need to backoff here because this only happens if a
                     * subchannel successfully connects then disconnects, so it will not
                     * create a loop of attempting to connect to an unreachable backend
                     */ this.updateState(connectivity_state_1.ConnectivityState.IDLE, new picker_1.QueuePicker(this));
                }
            }
        };
        this.connectionDelayTimeout = setTimeout(()=>{}, 0);
        clearTimeout(this.connectionDelayTimeout);
    }
    startNextSubchannelConnecting() {
        if (this.triedAllSubchannels) {
            return;
        }
        for (const [index, subchannel] of this.subchannels.entries()){
            if (index > this.currentSubchannelIndex) {
                const subchannelState = subchannel.getConnectivityState();
                if (subchannelState === connectivity_state_1.ConnectivityState.IDLE || subchannelState === connectivity_state_1.ConnectivityState.CONNECTING) {
                    this.startConnecting(index);
                    return;
                }
            }
        }
        this.triedAllSubchannels = true;
    }
    /**
     * Have a single subchannel in the `subchannels` list start connecting.
     * @param subchannelIndex The index into the `subchannels` list.
     */ startConnecting(subchannelIndex) {
        clearTimeout(this.connectionDelayTimeout);
        this.currentSubchannelIndex = subchannelIndex;
        if (this.subchannels[subchannelIndex].getConnectivityState() === connectivity_state_1.ConnectivityState.IDLE) {
            trace("Start connecting to subchannel with address " + this.subchannels[subchannelIndex].getAddress());
            process.nextTick(()=>{
                this.subchannels[subchannelIndex].startConnecting();
            });
        }
        this.connectionDelayTimeout = setTimeout(()=>{
            this.startNextSubchannelConnecting();
        }, CONNECTION_DELAY_INTERVAL_MS);
    }
    pickSubchannel(subchannel) {
        trace("Pick subchannel with address " + subchannel.getAddress());
        if (this.currentPick !== null) {
            this.currentPick.unref();
            this.currentPick.removeConnectivityStateListener(this.pickedSubchannelStateListener);
        }
        this.currentPick = subchannel;
        subchannel.addConnectivityStateListener(this.pickedSubchannelStateListener);
        subchannel.ref();
        this.channelControlHelper.addChannelzChild(subchannel.getChannelzRef());
        this.resetSubchannelList();
        clearTimeout(this.connectionDelayTimeout);
        this.updateState(connectivity_state_1.ConnectivityState.READY, new PickFirstPicker(subchannel));
    }
    updateState(newState, picker) {
        trace(connectivity_state_1.ConnectivityState[this.currentState] + " -> " + connectivity_state_1.ConnectivityState[newState]);
        this.currentState = newState;
        this.channelControlHelper.updateState(newState, picker);
    }
    resetSubchannelList(resetTriedAllSubchannels = true) {
        for (const subchannel of this.subchannels){
            subchannel.removeConnectivityStateListener(this.subchannelStateListener);
            subchannel.unref();
            this.channelControlHelper.removeChannelzChild(subchannel.getChannelzRef());
        }
        this.currentSubchannelIndex = 0;
        this.subchannelStateCounts = {
            [connectivity_state_1.ConnectivityState.CONNECTING]: 0,
            [connectivity_state_1.ConnectivityState.IDLE]: 0,
            [connectivity_state_1.ConnectivityState.READY]: 0,
            [connectivity_state_1.ConnectivityState.SHUTDOWN]: 0,
            [connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE]: 0
        };
        this.subchannels = [];
        if (resetTriedAllSubchannels) {
            this.triedAllSubchannels = false;
        }
    }
    /**
     * Start connecting to the address list most recently passed to
     * `updateAddressList`.
     */ connectToAddressList() {
        this.resetSubchannelList();
        trace("Connect to address list " + this.latestAddressList.map((address)=>(0, subchannel_address_1.subchannelAddressToString)(address)));
        this.subchannels = this.latestAddressList.map((address)=>this.channelControlHelper.createSubchannel(address, {}));
        for (const subchannel of this.subchannels){
            subchannel.ref();
            this.channelControlHelper.addChannelzChild(subchannel.getChannelzRef());
        }
        for (const subchannel of this.subchannels){
            subchannel.addConnectivityStateListener(this.subchannelStateListener);
            this.subchannelStateCounts[subchannel.getConnectivityState()] += 1;
            if (subchannel.getConnectivityState() === connectivity_state_1.ConnectivityState.READY) {
                this.pickSubchannel(subchannel);
                this.resetSubchannelList();
                return;
            }
        }
        for (const [index, subchannel] of this.subchannels.entries()){
            const subchannelState = subchannel.getConnectivityState();
            if (subchannelState === connectivity_state_1.ConnectivityState.IDLE || subchannelState === connectivity_state_1.ConnectivityState.CONNECTING) {
                this.startConnecting(index);
                if (this.currentPick === null) {
                    this.updateState(connectivity_state_1.ConnectivityState.CONNECTING, new picker_1.QueuePicker(this));
                }
                return;
            }
        }
        // If the code reaches this point, every subchannel must be in TRANSIENT_FAILURE
        if (this.currentPick === null) {
            this.updateState(connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE, new picker_1.UnavailablePicker());
        }
    }
    updateAddressList(addressList, lbConfig) {
        // lbConfig has no useful information for pick first load balancing
        /* To avoid unnecessary churn, we only do something with this address list
         * if we're not currently trying to establish a connection, or if the new
         * address list is different from the existing one */ if (this.subchannels.length === 0 || this.latestAddressList.length !== addressList.length || !this.latestAddressList.every((value, index)=>addressList[index] && (0, subchannel_address_1.subchannelAddressEqual)(addressList[index], value))) {
            this.latestAddressList = addressList;
            this.connectToAddressList();
        }
    }
    exitIdle() {
        if (this.currentState === connectivity_state_1.ConnectivityState.IDLE || this.triedAllSubchannels) {
            this.channelControlHelper.requestReresolution();
        }
        for (const subchannel of this.subchannels){
            subchannel.startConnecting();
        }
        if (this.currentState === connectivity_state_1.ConnectivityState.IDLE) {
            if (this.latestAddressList.length > 0) {
                this.connectToAddressList();
            }
        }
    }
    resetBackoff() {
    /* The pick first load balancer does not have a connection backoff, so this
         * does nothing */ }
    destroy() {
        this.resetSubchannelList();
        if (this.currentPick !== null) {
            /* Unref can cause a state change, which can cause a change in the value
             * of this.currentPick, so we hold a local reference to make sure that
             * does not impact this function. */ const currentPick = this.currentPick;
            currentPick.unref();
            currentPick.removeConnectivityStateListener(this.pickedSubchannelStateListener);
            this.channelControlHelper.removeChannelzChild(currentPick.getChannelzRef());
        }
    }
    getTypeName() {
        return TYPE_NAME;
    }
}
exports.PickFirstLoadBalancer = PickFirstLoadBalancer;
function setup() {
    (0, load_balancer_1.registerLoadBalancerType)(TYPE_NAME, PickFirstLoadBalancer, PickFirstLoadBalancingConfig);
    (0, load_balancer_1.registerDefaultLoadBalancerType)(TYPE_NAME);
}
exports.setup = setup; //# sourceMappingURL=load-balancer-pick-first.js.map


/***/ }),

/***/ 40273:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.setup = exports.RoundRobinLoadBalancer = void 0;
const load_balancer_1 = __webpack_require__(64189);
const connectivity_state_1 = __webpack_require__(16035);
const picker_1 = __webpack_require__(19786);
const subchannel_address_1 = __webpack_require__(27631);
const logging = __webpack_require__(67738);
const constants_1 = __webpack_require__(60076);
const TRACER_NAME = "round_robin";
function trace(text) {
    logging.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, text);
}
const TYPE_NAME = "round_robin";
class RoundRobinLoadBalancingConfig {
    getLoadBalancerName() {
        return TYPE_NAME;
    }
    constructor(){}
    toJsonObject() {
        return {
            [TYPE_NAME]: {}
        };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static createFromJson(obj) {
        return new RoundRobinLoadBalancingConfig();
    }
}
class RoundRobinPicker {
    constructor(subchannelList, nextIndex = 0){
        this.subchannelList = subchannelList;
        this.nextIndex = nextIndex;
    }
    pick(pickArgs) {
        const pickedSubchannel = this.subchannelList[this.nextIndex];
        this.nextIndex = (this.nextIndex + 1) % this.subchannelList.length;
        return {
            pickResultType: picker_1.PickResultType.COMPLETE,
            subchannel: pickedSubchannel,
            status: null,
            onCallStarted: null,
            onCallEnded: null
        };
    }
    /**
     * Check what the next subchannel returned would be. Used by the load
     * balancer implementation to preserve this part of the picker state if
     * possible when a subchannel connects or disconnects.
     */ peekNextSubchannel() {
        return this.subchannelList[this.nextIndex];
    }
}
class RoundRobinLoadBalancer {
    constructor(channelControlHelper){
        this.channelControlHelper = channelControlHelper;
        this.subchannels = [];
        this.currentState = connectivity_state_1.ConnectivityState.IDLE;
        this.currentReadyPicker = null;
        this.subchannelStateCounts = {
            [connectivity_state_1.ConnectivityState.CONNECTING]: 0,
            [connectivity_state_1.ConnectivityState.IDLE]: 0,
            [connectivity_state_1.ConnectivityState.READY]: 0,
            [connectivity_state_1.ConnectivityState.SHUTDOWN]: 0,
            [connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE]: 0
        };
        this.subchannelStateListener = (subchannel, previousState, newState)=>{
            this.subchannelStateCounts[previousState] -= 1;
            this.subchannelStateCounts[newState] += 1;
            this.calculateAndUpdateState();
            if (newState === connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE || newState === connectivity_state_1.ConnectivityState.IDLE) {
                this.channelControlHelper.requestReresolution();
                subchannel.startConnecting();
            }
        };
    }
    calculateAndUpdateState() {
        if (this.subchannelStateCounts[connectivity_state_1.ConnectivityState.READY] > 0) {
            const readySubchannels = this.subchannels.filter((subchannel)=>subchannel.getConnectivityState() === connectivity_state_1.ConnectivityState.READY);
            let index = 0;
            if (this.currentReadyPicker !== null) {
                index = readySubchannels.indexOf(this.currentReadyPicker.peekNextSubchannel());
                if (index < 0) {
                    index = 0;
                }
            }
            this.updateState(connectivity_state_1.ConnectivityState.READY, new RoundRobinPicker(readySubchannels, index));
        } else if (this.subchannelStateCounts[connectivity_state_1.ConnectivityState.CONNECTING] > 0) {
            this.updateState(connectivity_state_1.ConnectivityState.CONNECTING, new picker_1.QueuePicker(this));
        } else if (this.subchannelStateCounts[connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE] > 0) {
            this.updateState(connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE, new picker_1.UnavailablePicker());
        } else {
            this.updateState(connectivity_state_1.ConnectivityState.IDLE, new picker_1.QueuePicker(this));
        }
    }
    updateState(newState, picker) {
        trace(connectivity_state_1.ConnectivityState[this.currentState] + " -> " + connectivity_state_1.ConnectivityState[newState]);
        if (newState === connectivity_state_1.ConnectivityState.READY) {
            this.currentReadyPicker = picker;
        } else {
            this.currentReadyPicker = null;
        }
        this.currentState = newState;
        this.channelControlHelper.updateState(newState, picker);
    }
    resetSubchannelList() {
        for (const subchannel of this.subchannels){
            subchannel.removeConnectivityStateListener(this.subchannelStateListener);
            subchannel.unref();
            this.channelControlHelper.removeChannelzChild(subchannel.getChannelzRef());
        }
        this.subchannelStateCounts = {
            [connectivity_state_1.ConnectivityState.CONNECTING]: 0,
            [connectivity_state_1.ConnectivityState.IDLE]: 0,
            [connectivity_state_1.ConnectivityState.READY]: 0,
            [connectivity_state_1.ConnectivityState.SHUTDOWN]: 0,
            [connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE]: 0
        };
        this.subchannels = [];
    }
    updateAddressList(addressList, lbConfig) {
        this.resetSubchannelList();
        trace("Connect to address list " + addressList.map((address)=>(0, subchannel_address_1.subchannelAddressToString)(address)));
        this.subchannels = addressList.map((address)=>this.channelControlHelper.createSubchannel(address, {}));
        for (const subchannel of this.subchannels){
            subchannel.ref();
            subchannel.addConnectivityStateListener(this.subchannelStateListener);
            this.channelControlHelper.addChannelzChild(subchannel.getChannelzRef());
            const subchannelState = subchannel.getConnectivityState();
            this.subchannelStateCounts[subchannelState] += 1;
            if (subchannelState === connectivity_state_1.ConnectivityState.IDLE || subchannelState === connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE) {
                subchannel.startConnecting();
            }
        }
        this.calculateAndUpdateState();
    }
    exitIdle() {
        for (const subchannel of this.subchannels){
            subchannel.startConnecting();
        }
    }
    resetBackoff() {
    /* The pick first load balancer does not have a connection backoff, so this
         * does nothing */ }
    destroy() {
        this.resetSubchannelList();
    }
    getTypeName() {
        return TYPE_NAME;
    }
}
exports.RoundRobinLoadBalancer = RoundRobinLoadBalancer;
function setup() {
    (0, load_balancer_1.registerLoadBalancerType)(TYPE_NAME, RoundRobinLoadBalancer, RoundRobinLoadBalancingConfig);
}
exports.setup = setup; //# sourceMappingURL=load-balancer-round-robin.js.map


/***/ }),

/***/ 64189:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.validateLoadBalancingConfig = exports.getFirstUsableConfig = exports.isLoadBalancerNameRegistered = exports.createLoadBalancer = exports.registerDefaultLoadBalancerType = exports.registerLoadBalancerType = exports.createChildChannelControlHelper = void 0;
/**
 * Create a child ChannelControlHelper that overrides some methods of the
 * parent while letting others pass through to the parent unmodified. This
 * allows other code to create these children without needing to know about
 * all of the methods to be passed through.
 * @param parent
 * @param overrides
 */ function createChildChannelControlHelper(parent, overrides) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return {
        createSubchannel: (_b = (_a = overrides.createSubchannel) === null || _a === void 0 ? void 0 : _a.bind(overrides)) !== null && _b !== void 0 ? _b : parent.createSubchannel.bind(parent),
        updateState: (_d = (_c = overrides.updateState) === null || _c === void 0 ? void 0 : _c.bind(overrides)) !== null && _d !== void 0 ? _d : parent.updateState.bind(parent),
        requestReresolution: (_f = (_e = overrides.requestReresolution) === null || _e === void 0 ? void 0 : _e.bind(overrides)) !== null && _f !== void 0 ? _f : parent.requestReresolution.bind(parent),
        addChannelzChild: (_h = (_g = overrides.addChannelzChild) === null || _g === void 0 ? void 0 : _g.bind(overrides)) !== null && _h !== void 0 ? _h : parent.addChannelzChild.bind(parent),
        removeChannelzChild: (_k = (_j = overrides.removeChannelzChild) === null || _j === void 0 ? void 0 : _j.bind(overrides)) !== null && _k !== void 0 ? _k : parent.removeChannelzChild.bind(parent)
    };
}
exports.createChildChannelControlHelper = createChildChannelControlHelper;
const registeredLoadBalancerTypes = {};
let defaultLoadBalancerType = null;
function registerLoadBalancerType(typeName, loadBalancerType, loadBalancingConfigType) {
    registeredLoadBalancerTypes[typeName] = {
        LoadBalancer: loadBalancerType,
        LoadBalancingConfig: loadBalancingConfigType
    };
}
exports.registerLoadBalancerType = registerLoadBalancerType;
function registerDefaultLoadBalancerType(typeName) {
    defaultLoadBalancerType = typeName;
}
exports.registerDefaultLoadBalancerType = registerDefaultLoadBalancerType;
function createLoadBalancer(config, channelControlHelper) {
    const typeName = config.getLoadBalancerName();
    if (typeName in registeredLoadBalancerTypes) {
        return new registeredLoadBalancerTypes[typeName].LoadBalancer(channelControlHelper);
    } else {
        return null;
    }
}
exports.createLoadBalancer = createLoadBalancer;
function isLoadBalancerNameRegistered(typeName) {
    return typeName in registeredLoadBalancerTypes;
}
exports.isLoadBalancerNameRegistered = isLoadBalancerNameRegistered;
function getFirstUsableConfig(configs, fallbackTodefault = false) {
    for (const config of configs){
        if (config.getLoadBalancerName() in registeredLoadBalancerTypes) {
            return config;
        }
    }
    if (fallbackTodefault) {
        if (defaultLoadBalancerType) {
            return new registeredLoadBalancerTypes[defaultLoadBalancerType].LoadBalancingConfig();
        } else {
            return null;
        }
    } else {
        return null;
    }
}
exports.getFirstUsableConfig = getFirstUsableConfig;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateLoadBalancingConfig(obj) {
    if (!(obj !== null && typeof obj === "object")) {
        throw new Error("Load balancing config must be an object");
    }
    const keys = Object.keys(obj);
    if (keys.length !== 1) {
        throw new Error("Provided load balancing config has multiple conflicting entries");
    }
    const typeName = keys[0];
    if (typeName in registeredLoadBalancerTypes) {
        return registeredLoadBalancerTypes[typeName].LoadBalancingConfig.createFromJson(obj[typeName]);
    } else {
        throw new Error(`Unrecognized load balancing config name ${typeName}`);
    }
}
exports.validateLoadBalancingConfig = validateLoadBalancingConfig; //# sourceMappingURL=load-balancer.js.map


/***/ }),

/***/ 63404:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2022 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.LoadBalancingCall = void 0;
const connectivity_state_1 = __webpack_require__(16035);
const constants_1 = __webpack_require__(60076);
const deadline_1 = __webpack_require__(89760);
const metadata_1 = __webpack_require__(39637);
const picker_1 = __webpack_require__(19786);
const uri_parser_1 = __webpack_require__(35193);
const logging = __webpack_require__(67738);
const control_plane_status_1 = __webpack_require__(99086);
const http2 = __webpack_require__(85158);
const TRACER_NAME = "load_balancing_call";
class LoadBalancingCall {
    constructor(channel, callConfig, methodName, host, credentials, deadline, callNumber){
        var _a, _b;
        this.channel = channel;
        this.callConfig = callConfig;
        this.methodName = methodName;
        this.host = host;
        this.credentials = credentials;
        this.deadline = deadline;
        this.callNumber = callNumber;
        this.child = null;
        this.readPending = false;
        this.pendingMessage = null;
        this.pendingHalfClose = false;
        this.pendingChildStatus = null;
        this.ended = false;
        this.metadata = null;
        this.listener = null;
        this.onCallEnded = null;
        const splitPath = this.methodName.split("/");
        let serviceName = "";
        /* The standard path format is "/{serviceName}/{methodName}", so if we split
         * by '/', the first item should be empty and the second should be the
         * service name */ if (splitPath.length >= 2) {
            serviceName = splitPath[1];
        }
        const hostname = (_b = (_a = (0, uri_parser_1.splitHostPort)(this.host)) === null || _a === void 0 ? void 0 : _a.host) !== null && _b !== void 0 ? _b : "localhost";
        /* Currently, call credentials are only allowed on HTTPS connections, so we
         * can assume that the scheme is "https" */ this.serviceUrl = `https://${hostname}/${serviceName}`;
    }
    trace(text) {
        logging.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, "[" + this.callNumber + "] " + text);
    }
    outputStatus(status, progress) {
        var _a, _b;
        if (!this.ended) {
            this.ended = true;
            this.trace("ended with status: code=" + status.code + ' details="' + status.details + '"');
            const finalStatus = Object.assign(Object.assign({}, status), {
                progress
            });
            (_a = this.listener) === null || _a === void 0 ? void 0 : _a.onReceiveStatus(finalStatus);
            (_b = this.onCallEnded) === null || _b === void 0 ? void 0 : _b.call(this, finalStatus.code);
        }
    }
    doPick() {
        var _a, _b;
        if (this.ended) {
            return;
        }
        if (!this.metadata) {
            throw new Error("doPick called before start");
        }
        this.trace("Pick called");
        const pickResult = this.channel.doPick(this.metadata, this.callConfig.pickInformation);
        const subchannelString = pickResult.subchannel ? "(" + pickResult.subchannel.getChannelzRef().id + ") " + pickResult.subchannel.getAddress() : "" + pickResult.subchannel;
        this.trace("Pick result: " + picker_1.PickResultType[pickResult.pickResultType] + " subchannel: " + subchannelString + " status: " + ((_a = pickResult.status) === null || _a === void 0 ? void 0 : _a.code) + " " + ((_b = pickResult.status) === null || _b === void 0 ? void 0 : _b.details));
        switch(pickResult.pickResultType){
            case picker_1.PickResultType.COMPLETE:
                this.credentials.generateMetadata({
                    service_url: this.serviceUrl
                }).then((credsMetadata)=>{
                    var _a, _b, _c;
                    const finalMetadata = this.metadata.clone();
                    finalMetadata.merge(credsMetadata);
                    if (finalMetadata.get("authorization").length > 1) {
                        this.outputStatus({
                            code: constants_1.Status.INTERNAL,
                            details: '"authorization" metadata cannot have multiple values',
                            metadata: new metadata_1.Metadata()
                        }, "PROCESSED");
                    }
                    if (pickResult.subchannel.getConnectivityState() !== connectivity_state_1.ConnectivityState.READY) {
                        this.trace("Picked subchannel " + subchannelString + " has state " + connectivity_state_1.ConnectivityState[pickResult.subchannel.getConnectivityState()] + " after getting credentials metadata. Retrying pick");
                        this.doPick();
                        return;
                    }
                    if (this.deadline !== Infinity) {
                        finalMetadata.set("grpc-timeout", (0, deadline_1.getDeadlineTimeoutString)(this.deadline));
                    }
                    try {
                        this.child = pickResult.subchannel.getRealSubchannel().createCall(finalMetadata, this.host, this.methodName, {
                            onReceiveMetadata: (metadata)=>{
                                this.trace("Received metadata");
                                this.listener.onReceiveMetadata(metadata);
                            },
                            onReceiveMessage: (message)=>{
                                this.trace("Received message");
                                this.listener.onReceiveMessage(message);
                            },
                            onReceiveStatus: (status)=>{
                                this.trace("Received status");
                                if (status.rstCode === http2.constants.NGHTTP2_REFUSED_STREAM) {
                                    this.outputStatus(status, "REFUSED");
                                } else {
                                    this.outputStatus(status, "PROCESSED");
                                }
                            }
                        });
                    } catch (error) {
                        this.trace("Failed to start call on picked subchannel " + subchannelString + " with error " + error.message);
                        this.outputStatus({
                            code: constants_1.Status.INTERNAL,
                            details: "Failed to start HTTP/2 stream with error " + error.message,
                            metadata: new metadata_1.Metadata()
                        }, "NOT_STARTED");
                        return;
                    }
                    (_b = (_a = this.callConfig).onCommitted) === null || _b === void 0 ? void 0 : _b.call(_a);
                    (_c = pickResult.onCallStarted) === null || _c === void 0 ? void 0 : _c.call(pickResult);
                    this.onCallEnded = pickResult.onCallEnded;
                    this.trace("Created child call [" + this.child.getCallNumber() + "]");
                    if (this.readPending) {
                        this.child.startRead();
                    }
                    if (this.pendingMessage) {
                        this.child.sendMessageWithContext(this.pendingMessage.context, this.pendingMessage.message);
                    }
                    if (this.pendingHalfClose) {
                        this.child.halfClose();
                    }
                }, (error)=>{
                    // We assume the error code isn't 0 (Status.OK)
                    const { code , details  } = (0, control_plane_status_1.restrictControlPlaneStatusCode)(typeof error.code === "number" ? error.code : constants_1.Status.UNKNOWN, `Getting metadata from plugin failed with error: ${error.message}`);
                    this.outputStatus({
                        code: code,
                        details: details,
                        metadata: new metadata_1.Metadata()
                    }, "PROCESSED");
                });
                break;
            case picker_1.PickResultType.DROP:
                const { code , details  } = (0, control_plane_status_1.restrictControlPlaneStatusCode)(pickResult.status.code, pickResult.status.details);
                this.outputStatus({
                    code,
                    details,
                    metadata: pickResult.status.metadata
                }, "DROP");
                break;
            case picker_1.PickResultType.TRANSIENT_FAILURE:
                if (this.metadata.getOptions().waitForReady) {
                    this.channel.queueCallForPick(this);
                } else {
                    const { code , details  } = (0, control_plane_status_1.restrictControlPlaneStatusCode)(pickResult.status.code, pickResult.status.details);
                    this.outputStatus({
                        code,
                        details,
                        metadata: pickResult.status.metadata
                    }, "PROCESSED");
                }
                break;
            case picker_1.PickResultType.QUEUE:
                this.channel.queueCallForPick(this);
        }
    }
    cancelWithStatus(status, details) {
        var _a;
        this.trace("cancelWithStatus code: " + status + ' details: "' + details + '"');
        (_a = this.child) === null || _a === void 0 ? void 0 : _a.cancelWithStatus(status, details);
        this.outputStatus({
            code: status,
            details: details,
            metadata: new metadata_1.Metadata()
        }, "PROCESSED");
    }
    getPeer() {
        var _a, _b;
        return (_b = (_a = this.child) === null || _a === void 0 ? void 0 : _a.getPeer()) !== null && _b !== void 0 ? _b : this.channel.getTarget();
    }
    start(metadata, listener) {
        this.trace("start called");
        this.listener = listener;
        this.metadata = metadata;
        this.doPick();
    }
    sendMessageWithContext(context, message) {
        this.trace("write() called with message of length " + message.length);
        if (this.child) {
            this.child.sendMessageWithContext(context, message);
        } else {
            this.pendingMessage = {
                context,
                message
            };
        }
    }
    startRead() {
        this.trace("startRead called");
        if (this.child) {
            this.child.startRead();
        } else {
            this.readPending = true;
        }
    }
    halfClose() {
        this.trace("halfClose called");
        if (this.child) {
            this.child.halfClose();
        } else {
            this.pendingHalfClose = true;
        }
    }
    setCredentials(credentials) {
        throw new Error("Method not implemented.");
    }
    getCallNumber() {
        return this.callNumber;
    }
}
exports.LoadBalancingCall = LoadBalancingCall; //# sourceMappingURL=load-balancing-call.js.map


/***/ }),

/***/ 67738:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.isTracerEnabled = exports.trace = exports.log = exports.setLoggerVerbosity = exports.setLogger = exports.getLogger = void 0;
const constants_1 = __webpack_require__(60076);
const DEFAULT_LOGGER = {
    error: (message, ...optionalParams)=>{
        console.error("E " + message, ...optionalParams);
    },
    info: (message, ...optionalParams)=>{
        console.error("I " + message, ...optionalParams);
    },
    debug: (message, ...optionalParams)=>{
        console.error("D " + message, ...optionalParams);
    }
};
let _logger = DEFAULT_LOGGER;
let _logVerbosity = constants_1.LogVerbosity.ERROR;
const verbosityString = (_b = (_a = process.env.GRPC_NODE_VERBOSITY) !== null && _a !== void 0 ? _a : process.env.GRPC_VERBOSITY) !== null && _b !== void 0 ? _b : "";
switch(verbosityString.toUpperCase()){
    case "DEBUG":
        _logVerbosity = constants_1.LogVerbosity.DEBUG;
        break;
    case "INFO":
        _logVerbosity = constants_1.LogVerbosity.INFO;
        break;
    case "ERROR":
        _logVerbosity = constants_1.LogVerbosity.ERROR;
        break;
    case "NONE":
        _logVerbosity = constants_1.LogVerbosity.NONE;
        break;
    default:
}
const getLogger = ()=>{
    return _logger;
};
exports.getLogger = getLogger;
const setLogger = (logger)=>{
    _logger = logger;
};
exports.setLogger = setLogger;
const setLoggerVerbosity = (verbosity)=>{
    _logVerbosity = verbosity;
};
exports.setLoggerVerbosity = setLoggerVerbosity;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const log = (severity, ...args)=>{
    let logFunction;
    if (severity >= _logVerbosity) {
        switch(severity){
            case constants_1.LogVerbosity.DEBUG:
                logFunction = _logger.debug;
                break;
            case constants_1.LogVerbosity.INFO:
                logFunction = _logger.info;
                break;
            case constants_1.LogVerbosity.ERROR:
                logFunction = _logger.error;
                break;
        }
        /* Fall back to _logger.error when other methods are not available for
         * compatiblity with older behavior that always logged to _logger.error */ if (!logFunction) {
            logFunction = _logger.error;
        }
        if (logFunction) {
            logFunction.bind(_logger)(...args);
        }
    }
};
exports.log = log;
const tracersString = (_d = (_c = process.env.GRPC_NODE_TRACE) !== null && _c !== void 0 ? _c : process.env.GRPC_TRACE) !== null && _d !== void 0 ? _d : "";
const enabledTracers = new Set();
const disabledTracers = new Set();
for (const tracerName of tracersString.split(",")){
    if (tracerName.startsWith("-")) {
        disabledTracers.add(tracerName.substring(1));
    } else {
        enabledTracers.add(tracerName);
    }
}
const allEnabled = enabledTracers.has("all");
function trace(severity, tracer, text) {
    if (isTracerEnabled(tracer)) {
        (0, exports.log)(severity, new Date().toISOString() + " | " + tracer + " | " + text);
    }
}
exports.trace = trace;
function isTracerEnabled(tracer) {
    return !disabledTracers.has(tracer) && (allEnabled || enabledTracers.has(tracer));
}
exports.isTracerEnabled = isTracerEnabled; //# sourceMappingURL=logging.js.map


/***/ }),

/***/ 4585:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.loadPackageDefinition = exports.makeClientConstructor = void 0;
const client_1 = __webpack_require__(17555);
/**
 * Map with short names for each of the requester maker functions. Used in
 * makeClientConstructor
 * @private
 */ const requesterFuncs = {
    unary: client_1.Client.prototype.makeUnaryRequest,
    server_stream: client_1.Client.prototype.makeServerStreamRequest,
    client_stream: client_1.Client.prototype.makeClientStreamRequest,
    bidi: client_1.Client.prototype.makeBidiStreamRequest
};
/**
 * Returns true, if given key is included in the blacklisted
 * keys.
 * @param key key for check, string.
 */ function isPrototypePolluted(key) {
    return [
        "__proto__",
        "prototype",
        "constructor"
    ].includes(key);
}
/**
 * Creates a constructor for a client with the given methods, as specified in
 * the methods argument. The resulting class will have an instance method for
 * each method in the service, which is a partial application of one of the
 * [Client]{@link grpc.Client} request methods, depending on `requestSerialize`
 * and `responseSerialize`, with the `method`, `serialize`, and `deserialize`
 * arguments predefined.
 * @param methods An object mapping method names to
 *     method attributes
 * @param serviceName The fully qualified name of the service
 * @param classOptions An options object.
 * @return New client constructor, which is a subclass of
 *     {@link grpc.Client}, and has the same arguments as that constructor.
 */ function makeClientConstructor(methods, serviceName, classOptions) {
    if (!classOptions) {
        classOptions = {};
    }
    class ServiceClientImpl extends client_1.Client {
    }
    Object.keys(methods).forEach((name)=>{
        if (isPrototypePolluted(name)) {
            return;
        }
        const attrs = methods[name];
        let methodType;
        // TODO(murgatroid99): Verify that we don't need this anymore
        if (typeof name === "string" && name.charAt(0) === "$") {
            throw new Error("Method names cannot start with $");
        }
        if (attrs.requestStream) {
            if (attrs.responseStream) {
                methodType = "bidi";
            } else {
                methodType = "client_stream";
            }
        } else {
            if (attrs.responseStream) {
                methodType = "server_stream";
            } else {
                methodType = "unary";
            }
        }
        const serialize = attrs.requestSerialize;
        const deserialize = attrs.responseDeserialize;
        const methodFunc = partial(requesterFuncs[methodType], attrs.path, serialize, deserialize);
        ServiceClientImpl.prototype[name] = methodFunc;
        // Associate all provided attributes with the method
        Object.assign(ServiceClientImpl.prototype[name], attrs);
        if (attrs.originalName && !isPrototypePolluted(attrs.originalName)) {
            ServiceClientImpl.prototype[attrs.originalName] = ServiceClientImpl.prototype[name];
        }
    });
    ServiceClientImpl.service = methods;
    ServiceClientImpl.serviceName = serviceName;
    return ServiceClientImpl;
}
exports.makeClientConstructor = makeClientConstructor;
function partial(fn, path, serialize, deserialize) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function(...args) {
        return fn.call(this, path, serialize, deserialize, ...args);
    };
}
function isProtobufTypeDefinition(obj) {
    return "format" in obj;
}
/**
 * Load a gRPC package definition as a gRPC object hierarchy.
 * @param packageDef The package definition object.
 * @return The resulting gRPC object.
 */ function loadPackageDefinition(packageDef) {
    const result = {};
    for(const serviceFqn in packageDef){
        if (Object.prototype.hasOwnProperty.call(packageDef, serviceFqn)) {
            const service = packageDef[serviceFqn];
            const nameComponents = serviceFqn.split(".");
            if (nameComponents.some((comp)=>isPrototypePolluted(comp))) {
                continue;
            }
            const serviceName = nameComponents[nameComponents.length - 1];
            let current = result;
            for (const packageName of nameComponents.slice(0, -1)){
                if (!current[packageName]) {
                    current[packageName] = {};
                }
                current = current[packageName];
            }
            if (isProtobufTypeDefinition(service)) {
                current[serviceName] = service;
            } else {
                current[serviceName] = makeClientConstructor(service, serviceName, {});
            }
        }
    }
    return result;
}
exports.loadPackageDefinition = loadPackageDefinition; //# sourceMappingURL=make-client.js.map


/***/ }),

/***/ 79451:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2020 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.MaxMessageSizeFilterFactory = exports.MaxMessageSizeFilter = void 0;
const filter_1 = __webpack_require__(66404);
const constants_1 = __webpack_require__(60076);
const metadata_1 = __webpack_require__(39637);
class MaxMessageSizeFilter extends filter_1.BaseFilter {
    constructor(options){
        super();
        this.options = options;
        this.maxSendMessageSize = constants_1.DEFAULT_MAX_SEND_MESSAGE_LENGTH;
        this.maxReceiveMessageSize = constants_1.DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH;
        if ("grpc.max_send_message_length" in options) {
            this.maxSendMessageSize = options["grpc.max_send_message_length"];
        }
        if ("grpc.max_receive_message_length" in options) {
            this.maxReceiveMessageSize = options["grpc.max_receive_message_length"];
        }
    }
    async sendMessage(message) {
        /* A configured size of -1 means that there is no limit, so skip the check
         * entirely */ if (this.maxSendMessageSize === -1) {
            return message;
        } else {
            const concreteMessage = await message;
            if (concreteMessage.message.length > this.maxSendMessageSize) {
                throw {
                    code: constants_1.Status.RESOURCE_EXHAUSTED,
                    details: `Sent message larger than max (${concreteMessage.message.length} vs. ${this.maxSendMessageSize})`,
                    metadata: new metadata_1.Metadata()
                };
            } else {
                return concreteMessage;
            }
        }
    }
    async receiveMessage(message) {
        /* A configured size of -1 means that there is no limit, so skip the check
         * entirely */ if (this.maxReceiveMessageSize === -1) {
            return message;
        } else {
            const concreteMessage = await message;
            if (concreteMessage.length > this.maxReceiveMessageSize) {
                throw {
                    code: constants_1.Status.RESOURCE_EXHAUSTED,
                    details: `Received message larger than max (${concreteMessage.length} vs. ${this.maxReceiveMessageSize})`,
                    metadata: new metadata_1.Metadata()
                };
            } else {
                return concreteMessage;
            }
        }
    }
}
exports.MaxMessageSizeFilter = MaxMessageSizeFilter;
class MaxMessageSizeFilterFactory {
    constructor(options){
        this.options = options;
    }
    createFilter() {
        return new MaxMessageSizeFilter(this.options);
    }
}
exports.MaxMessageSizeFilterFactory = MaxMessageSizeFilterFactory; //# sourceMappingURL=max-message-size-filter.js.map


/***/ }),

/***/ 39637:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.Metadata = void 0;
const logging_1 = __webpack_require__(67738);
const constants_1 = __webpack_require__(60076);
const error_1 = __webpack_require__(6134);
const LEGAL_KEY_REGEX = /^[0-9a-z_.-]+$/;
const LEGAL_NON_BINARY_VALUE_REGEX = /^[ -~]*$/;
function isLegalKey(key) {
    return LEGAL_KEY_REGEX.test(key);
}
function isLegalNonBinaryValue(value) {
    return LEGAL_NON_BINARY_VALUE_REGEX.test(value);
}
function isBinaryKey(key) {
    return key.endsWith("-bin");
}
function isCustomMetadata(key) {
    return !key.startsWith("grpc-");
}
function normalizeKey(key) {
    return key.toLowerCase();
}
function validate(key, value) {
    if (!isLegalKey(key)) {
        throw new Error('Metadata key "' + key + '" contains illegal characters');
    }
    if (value !== null && value !== undefined) {
        if (isBinaryKey(key)) {
            if (!Buffer.isBuffer(value)) {
                throw new Error("keys that end with '-bin' must have Buffer values");
            }
        } else {
            if (Buffer.isBuffer(value)) {
                throw new Error("keys that don't end with '-bin' must have String values");
            }
            if (!isLegalNonBinaryValue(value)) {
                throw new Error('Metadata string value "' + value + '" contains illegal characters');
            }
        }
    }
}
/**
 * A class for storing metadata. Keys are normalized to lowercase ASCII.
 */ class Metadata {
    constructor(options = {}){
        this.internalRepr = new Map();
        this.options = options;
    }
    /**
     * Sets the given value for the given key by replacing any other values
     * associated with that key. Normalizes the key.
     * @param key The key to whose value should be set.
     * @param value The value to set. Must be a buffer if and only
     *   if the normalized key ends with '-bin'.
     */ set(key, value) {
        key = normalizeKey(key);
        validate(key, value);
        this.internalRepr.set(key, [
            value
        ]);
    }
    /**
     * Adds the given value for the given key by appending to a list of previous
     * values associated with that key. Normalizes the key.
     * @param key The key for which a new value should be appended.
     * @param value The value to add. Must be a buffer if and only
     *   if the normalized key ends with '-bin'.
     */ add(key, value) {
        key = normalizeKey(key);
        validate(key, value);
        const existingValue = this.internalRepr.get(key);
        if (existingValue === undefined) {
            this.internalRepr.set(key, [
                value
            ]);
        } else {
            existingValue.push(value);
        }
    }
    /**
     * Removes the given key and any associated values. Normalizes the key.
     * @param key The key whose values should be removed.
     */ remove(key) {
        key = normalizeKey(key);
        // validate(key);
        this.internalRepr.delete(key);
    }
    /**
     * Gets a list of all values associated with the key. Normalizes the key.
     * @param key The key whose value should be retrieved.
     * @return A list of values associated with the given key.
     */ get(key) {
        key = normalizeKey(key);
        // validate(key);
        return this.internalRepr.get(key) || [];
    }
    /**
     * Gets a plain object mapping each key to the first value associated with it.
     * This reflects the most common way that people will want to see metadata.
     * @return A key/value mapping of the metadata.
     */ getMap() {
        const result = {};
        for (const [key, values] of this.internalRepr){
            if (values.length > 0) {
                const v = values[0];
                result[key] = Buffer.isBuffer(v) ? Buffer.from(v) : v;
            }
        }
        return result;
    }
    /**
     * Clones the metadata object.
     * @return The newly cloned object.
     */ clone() {
        const newMetadata = new Metadata(this.options);
        const newInternalRepr = newMetadata.internalRepr;
        for (const [key, value] of this.internalRepr){
            const clonedValue = value.map((v)=>{
                if (Buffer.isBuffer(v)) {
                    return Buffer.from(v);
                } else {
                    return v;
                }
            });
            newInternalRepr.set(key, clonedValue);
        }
        return newMetadata;
    }
    /**
     * Merges all key-value pairs from a given Metadata object into this one.
     * If both this object and the given object have values in the same key,
     * values from the other Metadata object will be appended to this object's
     * values.
     * @param other A Metadata object.
     */ merge(other) {
        for (const [key, values] of other.internalRepr){
            const mergedValue = (this.internalRepr.get(key) || []).concat(values);
            this.internalRepr.set(key, mergedValue);
        }
    }
    setOptions(options) {
        this.options = options;
    }
    getOptions() {
        return this.options;
    }
    /**
     * Creates an OutgoingHttpHeaders object that can be used with the http2 API.
     */ toHttp2Headers() {
        // NOTE: Node <8.9 formats http2 headers incorrectly.
        const result = {};
        for (const [key, values] of this.internalRepr){
            // We assume that the user's interaction with this object is limited to
            // through its public API (i.e. keys and values are already validated).
            result[key] = values.map(bufToString);
        }
        return result;
    }
    // For compatibility with the other Metadata implementation
    _getCoreRepresentation() {
        return this.internalRepr;
    }
    /**
     * This modifies the behavior of JSON.stringify to show an object
     * representation of the metadata map.
     */ toJSON() {
        const result = {};
        for (const [key, values] of this.internalRepr){
            result[key] = values;
        }
        return result;
    }
    /**
     * Returns a new Metadata object based fields in a given IncomingHttpHeaders
     * object.
     * @param headers An IncomingHttpHeaders object.
     */ static fromHttp2Headers(headers) {
        const result = new Metadata();
        for (const key of Object.keys(headers)){
            // Reserved headers (beginning with `:`) are not valid keys.
            if (key.charAt(0) === ":") {
                continue;
            }
            const values = headers[key];
            try {
                if (isBinaryKey(key)) {
                    if (Array.isArray(values)) {
                        values.forEach((value)=>{
                            result.add(key, Buffer.from(value, "base64"));
                        });
                    } else if (values !== undefined) {
                        if (isCustomMetadata(key)) {
                            values.split(",").forEach((v)=>{
                                result.add(key, Buffer.from(v.trim(), "base64"));
                            });
                        } else {
                            result.add(key, Buffer.from(values, "base64"));
                        }
                    }
                } else {
                    if (Array.isArray(values)) {
                        values.forEach((value)=>{
                            result.add(key, value);
                        });
                    } else if (values !== undefined) {
                        result.add(key, values);
                    }
                }
            } catch (error) {
                const message = `Failed to add metadata entry ${key}: ${values}. ${(0, error_1.getErrorMessage)(error)}. For more information see https://github.com/grpc/grpc-node/issues/1173`;
                (0, logging_1.log)(constants_1.LogVerbosity.ERROR, message);
            }
        }
        return result;
    }
}
exports.Metadata = Metadata;
const bufToString = (val)=>{
    return Buffer.isBuffer(val) ? val.toString("base64") : val;
}; //# sourceMappingURL=metadata.js.map


/***/ }),

/***/ 19786:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.QueuePicker = exports.UnavailablePicker = exports.PickResultType = void 0;
const metadata_1 = __webpack_require__(39637);
const constants_1 = __webpack_require__(60076);
var PickResultType;
(function(PickResultType) {
    PickResultType[PickResultType["COMPLETE"] = 0] = "COMPLETE";
    PickResultType[PickResultType["QUEUE"] = 1] = "QUEUE";
    PickResultType[PickResultType["TRANSIENT_FAILURE"] = 2] = "TRANSIENT_FAILURE";
    PickResultType[PickResultType["DROP"] = 3] = "DROP";
})(PickResultType = exports.PickResultType || (exports.PickResultType = {}));
/**
 * A standard picker representing a load balancer in the TRANSIENT_FAILURE
 * state. Always responds to every pick request with an UNAVAILABLE status.
 */ class UnavailablePicker {
    constructor(status){
        if (status !== undefined) {
            this.status = status;
        } else {
            this.status = {
                code: constants_1.Status.UNAVAILABLE,
                details: "No connection established",
                metadata: new metadata_1.Metadata()
            };
        }
    }
    pick(pickArgs) {
        return {
            pickResultType: PickResultType.TRANSIENT_FAILURE,
            subchannel: null,
            status: this.status,
            onCallStarted: null,
            onCallEnded: null
        };
    }
}
exports.UnavailablePicker = UnavailablePicker;
/**
 * A standard picker representing a load balancer in the IDLE or CONNECTING
 * state. Always responds to every pick request with a QUEUE pick result
 * indicating that the pick should be tried again with the next `Picker`. Also
 * reports back to the load balancer that a connection should be established
 * once any pick is attempted.
 */ class QueuePicker {
    // Constructed with a load balancer. Calls exitIdle on it the first time pick is called
    constructor(loadBalancer){
        this.loadBalancer = loadBalancer;
        this.calledExitIdle = false;
    }
    pick(pickArgs) {
        if (!this.calledExitIdle) {
            process.nextTick(()=>{
                this.loadBalancer.exitIdle();
            });
            this.calledExitIdle = true;
        }
        return {
            pickResultType: PickResultType.QUEUE,
            subchannel: null,
            status: null,
            onCallStarted: null,
            onCallEnded: null
        };
    }
}
exports.QueuePicker = QueuePicker; //# sourceMappingURL=picker.js.map


/***/ }),

/***/ 19864:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.setup = void 0;
const resolver_1 = __webpack_require__(71123);
const dns = __webpack_require__(9523);
const util = __webpack_require__(73837);
const service_config_1 = __webpack_require__(43034);
const constants_1 = __webpack_require__(60076);
const metadata_1 = __webpack_require__(39637);
const logging = __webpack_require__(67738);
const constants_2 = __webpack_require__(60076);
const uri_parser_1 = __webpack_require__(35193);
const net_1 = __webpack_require__(41808);
const backoff_timeout_1 = __webpack_require__(22308);
const TRACER_NAME = "dns_resolver";
function trace(text) {
    logging.trace(constants_2.LogVerbosity.DEBUG, TRACER_NAME, text);
}
/**
 * The default TCP port to connect to if not explicitly specified in the target.
 */ const DEFAULT_PORT = 443;
const DEFAULT_MIN_TIME_BETWEEN_RESOLUTIONS_MS = 30000;
const resolveTxtPromise = util.promisify(dns.resolveTxt);
const dnsLookupPromise = util.promisify(dns.lookup);
/**
 * Merge any number of arrays into a single alternating array
 * @param arrays
 */ function mergeArrays(...arrays) {
    const result = [];
    for(let i = 0; i < Math.max.apply(null, arrays.map((array)=>array.length)); i++){
        for (const array of arrays){
            if (i < array.length) {
                result.push(array[i]);
            }
        }
    }
    return result;
}
/**
 * Resolver implementation that handles DNS names and IP addresses.
 */ class DnsResolver {
    constructor(target, listener, channelOptions){
        var _a, _b, _c;
        this.target = target;
        this.listener = listener;
        this.pendingLookupPromise = null;
        this.pendingTxtPromise = null;
        this.latestLookupResult = null;
        this.latestServiceConfig = null;
        this.latestServiceConfigError = null;
        this.continueResolving = false;
        this.isNextResolutionTimerRunning = false;
        this.isServiceConfigEnabled = true;
        trace("Resolver constructed for target " + (0, uri_parser_1.uriToString)(target));
        const hostPort = (0, uri_parser_1.splitHostPort)(target.path);
        if (hostPort === null) {
            this.ipResult = null;
            this.dnsHostname = null;
            this.port = null;
        } else {
            if ((0, net_1.isIPv4)(hostPort.host) || (0, net_1.isIPv6)(hostPort.host)) {
                this.ipResult = [
                    {
                        host: hostPort.host,
                        port: (_a = hostPort.port) !== null && _a !== void 0 ? _a : DEFAULT_PORT
                    }
                ];
                this.dnsHostname = null;
                this.port = null;
            } else {
                this.ipResult = null;
                this.dnsHostname = hostPort.host;
                this.port = (_b = hostPort.port) !== null && _b !== void 0 ? _b : DEFAULT_PORT;
            }
        }
        this.percentage = Math.random() * 100;
        if (channelOptions["grpc.service_config_disable_resolution"] === 1) {
            this.isServiceConfigEnabled = false;
        }
        this.defaultResolutionError = {
            code: constants_1.Status.UNAVAILABLE,
            details: `Name resolution failed for target ${(0, uri_parser_1.uriToString)(this.target)}`,
            metadata: new metadata_1.Metadata()
        };
        const backoffOptions = {
            initialDelay: channelOptions["grpc.initial_reconnect_backoff_ms"],
            maxDelay: channelOptions["grpc.max_reconnect_backoff_ms"]
        };
        this.backoff = new backoff_timeout_1.BackoffTimeout(()=>{
            if (this.continueResolving) {
                this.startResolutionWithBackoff();
            }
        }, backoffOptions);
        this.backoff.unref();
        this.minTimeBetweenResolutionsMs = (_c = channelOptions["grpc.dns_min_time_between_resolutions_ms"]) !== null && _c !== void 0 ? _c : DEFAULT_MIN_TIME_BETWEEN_RESOLUTIONS_MS;
        this.nextResolutionTimer = setTimeout(()=>{}, 0);
        clearTimeout(this.nextResolutionTimer);
    }
    /**
     * If the target is an IP address, just provide that address as a result.
     * Otherwise, initiate A, AAAA, and TXT lookups
     */ startResolution() {
        if (this.ipResult !== null) {
            trace("Returning IP address for target " + (0, uri_parser_1.uriToString)(this.target));
            setImmediate(()=>{
                this.listener.onSuccessfulResolution(this.ipResult, null, null, null, {});
            });
            this.backoff.stop();
            this.backoff.reset();
            return;
        }
        if (this.dnsHostname === null) {
            trace("Failed to parse DNS address " + (0, uri_parser_1.uriToString)(this.target));
            setImmediate(()=>{
                this.listener.onError({
                    code: constants_1.Status.UNAVAILABLE,
                    details: `Failed to parse DNS address ${(0, uri_parser_1.uriToString)(this.target)}`,
                    metadata: new metadata_1.Metadata()
                });
            });
            this.stopNextResolutionTimer();
        } else {
            if (this.pendingLookupPromise !== null) {
                return;
            }
            trace("Looking up DNS hostname " + this.dnsHostname);
            /* We clear out latestLookupResult here to ensure that it contains the
             * latest result since the last time we started resolving. That way, the
             * TXT resolution handler can use it, but only if it finishes second. We
             * don't clear out any previous service config results because it's
             * better to use a service config that's slightly out of date than to
             * revert to an effectively blank one. */ this.latestLookupResult = null;
            const hostname = this.dnsHostname;
            /* We lookup both address families here and then split them up later
             * because when looking up a single family, dns.lookup outputs an error
             * if the name exists but there are no records for that family, and that
             * error is indistinguishable from other kinds of errors */ this.pendingLookupPromise = dnsLookupPromise(hostname, {
                all: true
            });
            this.pendingLookupPromise.then((addressList)=>{
                this.pendingLookupPromise = null;
                this.backoff.reset();
                this.backoff.stop();
                const ip4Addresses = addressList.filter((addr)=>addr.family === 4);
                const ip6Addresses = addressList.filter((addr)=>addr.family === 6);
                this.latestLookupResult = mergeArrays(ip6Addresses, ip4Addresses).map((addr)=>({
                        host: addr.address,
                        port: +this.port
                    }));
                const allAddressesString = "[" + this.latestLookupResult.map((addr)=>addr.host + ":" + addr.port).join(",") + "]";
                trace("Resolved addresses for target " + (0, uri_parser_1.uriToString)(this.target) + ": " + allAddressesString);
                if (this.latestLookupResult.length === 0) {
                    this.listener.onError(this.defaultResolutionError);
                    return;
                }
                /* If the TXT lookup has not yet finished, both of the last two
                 * arguments will be null, which is the equivalent of getting an
                 * empty TXT response. When the TXT lookup does finish, its handler
                 * can update the service config by using the same address list */ this.listener.onSuccessfulResolution(this.latestLookupResult, this.latestServiceConfig, this.latestServiceConfigError, null, {});
            }, (err)=>{
                trace("Resolution error for target " + (0, uri_parser_1.uriToString)(this.target) + ": " + err.message);
                this.pendingLookupPromise = null;
                this.stopNextResolutionTimer();
                this.listener.onError(this.defaultResolutionError);
            });
            /* If there already is a still-pending TXT resolution, we can just use
             * that result when it comes in */ if (this.isServiceConfigEnabled && this.pendingTxtPromise === null) {
                /* We handle the TXT query promise differently than the others because
                 * the name resolution attempt as a whole is a success even if the TXT
                 * lookup fails */ this.pendingTxtPromise = resolveTxtPromise(hostname);
                this.pendingTxtPromise.then((txtRecord)=>{
                    this.pendingTxtPromise = null;
                    try {
                        this.latestServiceConfig = (0, service_config_1.extractAndSelectServiceConfig)(txtRecord, this.percentage);
                    } catch (err) {
                        this.latestServiceConfigError = {
                            code: constants_1.Status.UNAVAILABLE,
                            details: "Parsing service config failed",
                            metadata: new metadata_1.Metadata()
                        };
                    }
                    if (this.latestLookupResult !== null) {
                        /* We rely here on the assumption that calling this function with
                         * identical parameters will be essentialy idempotent, and calling
                         * it with the same address list and a different service config
                         * should result in a fast and seamless switchover. */ this.listener.onSuccessfulResolution(this.latestLookupResult, this.latestServiceConfig, this.latestServiceConfigError, null, {});
                    }
                }, (err)=>{
                /* If TXT lookup fails we should do nothing, which means that we
                     * continue to use the result of the most recent successful lookup,
                     * or the default null config object if there has never been a
                     * successful lookup. We do not set the latestServiceConfigError
                     * here because that is specifically used for response validation
                     * errors. We still need to handle this error so that it does not
                     * bubble up as an unhandled promise rejection. */ });
            }
        }
    }
    startNextResolutionTimer() {
        var _a, _b;
        clearTimeout(this.nextResolutionTimer);
        this.nextResolutionTimer = (_b = (_a = setTimeout(()=>{
            this.stopNextResolutionTimer();
            if (this.continueResolving) {
                this.startResolutionWithBackoff();
            }
        }, this.minTimeBetweenResolutionsMs)).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
        this.isNextResolutionTimerRunning = true;
    }
    stopNextResolutionTimer() {
        clearTimeout(this.nextResolutionTimer);
        this.isNextResolutionTimerRunning = false;
    }
    startResolutionWithBackoff() {
        if (this.pendingLookupPromise === null) {
            this.continueResolving = false;
            this.startResolution();
            this.backoff.runOnce();
            this.startNextResolutionTimer();
        }
    }
    updateResolution() {
        /* If there is a pending lookup, just let it finish. Otherwise, if the
         * nextResolutionTimer or backoff timer is running, set the
         * continueResolving flag to resolve when whichever of those timers
         * fires. Otherwise, start resolving immediately. */ if (this.pendingLookupPromise === null) {
            if (this.isNextResolutionTimerRunning || this.backoff.isRunning()) {
                this.continueResolving = true;
            } else {
                this.startResolutionWithBackoff();
            }
        }
    }
    destroy() {
        this.continueResolving = false;
        this.backoff.stop();
        this.stopNextResolutionTimer();
    }
    /**
     * Get the default authority for the given target. For IP targets, that is
     * the IP address. For DNS targets, it is the hostname.
     * @param target
     */ static getDefaultAuthority(target) {
        return target.path;
    }
}
/**
 * Set up the DNS resolver class by registering it as the handler for the
 * "dns:" prefix and as the default resolver.
 */ function setup() {
    (0, resolver_1.registerResolver)("dns", DnsResolver);
    (0, resolver_1.registerDefaultScheme)("dns");
}
exports.setup = setup; //# sourceMappingURL=resolver-dns.js.map


/***/ }),

/***/ 67600:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2021 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.setup = void 0;
const net_1 = __webpack_require__(41808);
const constants_1 = __webpack_require__(60076);
const metadata_1 = __webpack_require__(39637);
const resolver_1 = __webpack_require__(71123);
const uri_parser_1 = __webpack_require__(35193);
const logging = __webpack_require__(67738);
const TRACER_NAME = "ip_resolver";
function trace(text) {
    logging.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, text);
}
const IPV4_SCHEME = "ipv4";
const IPV6_SCHEME = "ipv6";
/**
 * The default TCP port to connect to if not explicitly specified in the target.
 */ const DEFAULT_PORT = 443;
class IpResolver {
    constructor(target, listener, channelOptions){
        var _a;
        this.target = target;
        this.listener = listener;
        this.addresses = [];
        this.error = null;
        trace("Resolver constructed for target " + (0, uri_parser_1.uriToString)(target));
        const addresses = [];
        if (!(target.scheme === IPV4_SCHEME || target.scheme === IPV6_SCHEME)) {
            this.error = {
                code: constants_1.Status.UNAVAILABLE,
                details: `Unrecognized scheme ${target.scheme} in IP resolver`,
                metadata: new metadata_1.Metadata()
            };
            return;
        }
        const pathList = target.path.split(",");
        for (const path of pathList){
            const hostPort = (0, uri_parser_1.splitHostPort)(path);
            if (hostPort === null) {
                this.error = {
                    code: constants_1.Status.UNAVAILABLE,
                    details: `Failed to parse ${target.scheme} address ${path}`,
                    metadata: new metadata_1.Metadata()
                };
                return;
            }
            if (target.scheme === IPV4_SCHEME && !(0, net_1.isIPv4)(hostPort.host) || target.scheme === IPV6_SCHEME && !(0, net_1.isIPv6)(hostPort.host)) {
                this.error = {
                    code: constants_1.Status.UNAVAILABLE,
                    details: `Failed to parse ${target.scheme} address ${path}`,
                    metadata: new metadata_1.Metadata()
                };
                return;
            }
            addresses.push({
                host: hostPort.host,
                port: (_a = hostPort.port) !== null && _a !== void 0 ? _a : DEFAULT_PORT
            });
        }
        this.addresses = addresses;
        trace("Parsed " + target.scheme + " address list " + this.addresses);
    }
    updateResolution() {
        process.nextTick(()=>{
            if (this.error) {
                this.listener.onError(this.error);
            } else {
                this.listener.onSuccessfulResolution(this.addresses, null, null, null, {});
            }
        });
    }
    destroy() {
    // This resolver owns no resources, so we do nothing here.
    }
    static getDefaultAuthority(target) {
        return target.path.split(",")[0];
    }
}
function setup() {
    (0, resolver_1.registerResolver)(IPV4_SCHEME, IpResolver);
    (0, resolver_1.registerResolver)(IPV6_SCHEME, IpResolver);
}
exports.setup = setup; //# sourceMappingURL=resolver-ip.js.map


/***/ }),

/***/ 84901:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.setup = void 0;
const resolver_1 = __webpack_require__(71123);
class UdsResolver {
    constructor(target, listener, channelOptions){
        this.listener = listener;
        this.addresses = [];
        let path;
        if (target.authority === "") {
            path = "/" + target.path;
        } else {
            path = target.path;
        }
        this.addresses = [
            {
                path
            }
        ];
    }
    updateResolution() {
        process.nextTick(this.listener.onSuccessfulResolution, this.addresses, null, null, null, {});
    }
    destroy() {
    // This resolver owns no resources, so we do nothing here.
    }
    static getDefaultAuthority(target) {
        return "localhost";
    }
}
function setup() {
    (0, resolver_1.registerResolver)("unix", UdsResolver);
}
exports.setup = setup; //# sourceMappingURL=resolver-uds.js.map


/***/ }),

/***/ 71123:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.mapUriDefaultScheme = exports.getDefaultAuthority = exports.createResolver = exports.registerDefaultScheme = exports.registerResolver = void 0;
const uri_parser_1 = __webpack_require__(35193);
const registeredResolvers = {};
let defaultScheme = null;
/**
 * Register a resolver class to handle target names prefixed with the `prefix`
 * string. This prefix should correspond to a URI scheme name listed in the
 * [gRPC Name Resolution document](https://github.com/grpc/grpc/blob/master/doc/naming.md)
 * @param prefix
 * @param resolverClass
 */ function registerResolver(scheme, resolverClass) {
    registeredResolvers[scheme] = resolverClass;
}
exports.registerResolver = registerResolver;
/**
 * Register a default resolver to handle target names that do not start with
 * any registered prefix.
 * @param resolverClass
 */ function registerDefaultScheme(scheme) {
    defaultScheme = scheme;
}
exports.registerDefaultScheme = registerDefaultScheme;
/**
 * Create a name resolver for the specified target, if possible. Throws an
 * error if no such name resolver can be created.
 * @param target
 * @param listener
 */ function createResolver(target, listener, options) {
    if (target.scheme !== undefined && target.scheme in registeredResolvers) {
        return new registeredResolvers[target.scheme](target, listener, options);
    } else {
        throw new Error(`No resolver could be created for target ${(0, uri_parser_1.uriToString)(target)}`);
    }
}
exports.createResolver = createResolver;
/**
 * Get the default authority for the specified target, if possible. Throws an
 * error if no registered name resolver can parse that target string.
 * @param target
 */ function getDefaultAuthority(target) {
    if (target.scheme !== undefined && target.scheme in registeredResolvers) {
        return registeredResolvers[target.scheme].getDefaultAuthority(target);
    } else {
        throw new Error(`Invalid target ${(0, uri_parser_1.uriToString)(target)}`);
    }
}
exports.getDefaultAuthority = getDefaultAuthority;
function mapUriDefaultScheme(target) {
    if (target.scheme === undefined || !(target.scheme in registeredResolvers)) {
        if (defaultScheme !== null) {
            return {
                scheme: defaultScheme,
                authority: undefined,
                path: (0, uri_parser_1.uriToString)(target)
            };
        } else {
            return null;
        }
    }
    return target;
}
exports.mapUriDefaultScheme = mapUriDefaultScheme; //# sourceMappingURL=resolver.js.map


/***/ }),

/***/ 20005:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2022 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.ResolvingCall = void 0;
const constants_1 = __webpack_require__(60076);
const deadline_1 = __webpack_require__(89760);
const metadata_1 = __webpack_require__(39637);
const logging = __webpack_require__(67738);
const control_plane_status_1 = __webpack_require__(99086);
const TRACER_NAME = "resolving_call";
class ResolvingCall {
    constructor(channel, method, options, filterStackFactory, credentials, callNumber){
        this.channel = channel;
        this.method = method;
        this.filterStackFactory = filterStackFactory;
        this.credentials = credentials;
        this.callNumber = callNumber;
        this.child = null;
        this.readPending = false;
        this.pendingMessage = null;
        this.pendingHalfClose = false;
        this.ended = false;
        this.readFilterPending = false;
        this.writeFilterPending = false;
        this.pendingChildStatus = null;
        this.metadata = null;
        this.listener = null;
        this.statusWatchers = [];
        this.deadlineTimer = setTimeout(()=>{}, 0);
        this.filterStack = null;
        this.deadline = options.deadline;
        this.host = options.host;
        if (options.parentCall) {
            if (options.flags & constants_1.Propagate.CANCELLATION) {
                options.parentCall.on("cancelled", ()=>{
                    this.cancelWithStatus(constants_1.Status.CANCELLED, "Cancelled by parent call");
                });
            }
            if (options.flags & constants_1.Propagate.DEADLINE) {
                this.trace("Propagating deadline from parent: " + options.parentCall.getDeadline());
                this.deadline = (0, deadline_1.minDeadline)(this.deadline, options.parentCall.getDeadline());
            }
        }
        this.trace("Created");
        this.runDeadlineTimer();
    }
    trace(text) {
        logging.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, "[" + this.callNumber + "] " + text);
    }
    runDeadlineTimer() {
        clearTimeout(this.deadlineTimer);
        this.trace("Deadline: " + (0, deadline_1.deadlineToString)(this.deadline));
        const timeout = (0, deadline_1.getRelativeTimeout)(this.deadline);
        if (timeout !== Infinity) {
            this.trace("Deadline will be reached in " + timeout + "ms");
            const handleDeadline = ()=>{
                this.cancelWithStatus(constants_1.Status.DEADLINE_EXCEEDED, "Deadline exceeded");
            };
            if (timeout <= 0) {
                process.nextTick(handleDeadline);
            } else {
                this.deadlineTimer = setTimeout(handleDeadline, timeout);
            }
        }
    }
    outputStatus(status) {
        if (!this.ended) {
            this.ended = true;
            if (!this.filterStack) {
                this.filterStack = this.filterStackFactory.createFilter();
            }
            clearTimeout(this.deadlineTimer);
            const filteredStatus = this.filterStack.receiveTrailers(status);
            this.trace("ended with status: code=" + filteredStatus.code + ' details="' + filteredStatus.details + '"');
            this.statusWatchers.forEach((watcher)=>watcher(filteredStatus));
            process.nextTick(()=>{
                var _a;
                (_a = this.listener) === null || _a === void 0 ? void 0 : _a.onReceiveStatus(filteredStatus);
            });
        }
    }
    sendMessageOnChild(context, message) {
        if (!this.child) {
            throw new Error("sendMessageonChild called with child not populated");
        }
        const child = this.child;
        this.writeFilterPending = true;
        this.filterStack.sendMessage(Promise.resolve({
            message: message,
            flags: context.flags
        })).then((filteredMessage)=>{
            this.writeFilterPending = false;
            child.sendMessageWithContext(context, filteredMessage.message);
            if (this.pendingHalfClose) {
                child.halfClose();
            }
        }, (status)=>{
            this.cancelWithStatus(status.code, status.details);
        });
    }
    getConfig() {
        if (this.ended) {
            return;
        }
        if (!this.metadata || !this.listener) {
            throw new Error("getConfig called before start");
        }
        const configResult = this.channel.getConfig(this.method, this.metadata);
        if (configResult.type === "NONE") {
            this.channel.queueCallForConfig(this);
            return;
        } else if (configResult.type === "ERROR") {
            if (this.metadata.getOptions().waitForReady) {
                this.channel.queueCallForConfig(this);
            } else {
                this.outputStatus(configResult.error);
            }
            return;
        }
        // configResult.type === 'SUCCESS'
        const config = configResult.config;
        if (config.status !== constants_1.Status.OK) {
            const { code , details  } = (0, control_plane_status_1.restrictControlPlaneStatusCode)(config.status, "Failed to route call to method " + this.method);
            this.outputStatus({
                code: code,
                details: details,
                metadata: new metadata_1.Metadata()
            });
            return;
        }
        if (config.methodConfig.timeout) {
            const configDeadline = new Date();
            configDeadline.setSeconds(configDeadline.getSeconds() + config.methodConfig.timeout.seconds);
            configDeadline.setMilliseconds(configDeadline.getMilliseconds() + config.methodConfig.timeout.nanos / 1000000);
            this.deadline = (0, deadline_1.minDeadline)(this.deadline, configDeadline);
            this.runDeadlineTimer();
        }
        this.filterStackFactory.push(config.dynamicFilterFactories);
        this.filterStack = this.filterStackFactory.createFilter();
        this.filterStack.sendMetadata(Promise.resolve(this.metadata)).then((filteredMetadata)=>{
            this.child = this.channel.createInnerCall(config, this.method, this.host, this.credentials, this.deadline);
            this.trace("Created child [" + this.child.getCallNumber() + "]");
            this.child.start(filteredMetadata, {
                onReceiveMetadata: (metadata)=>{
                    this.trace("Received metadata");
                    this.listener.onReceiveMetadata(this.filterStack.receiveMetadata(metadata));
                },
                onReceiveMessage: (message)=>{
                    this.trace("Received message");
                    this.readFilterPending = true;
                    this.filterStack.receiveMessage(message).then((filteredMesssage)=>{
                        this.trace("Finished filtering received message");
                        this.readFilterPending = false;
                        this.listener.onReceiveMessage(filteredMesssage);
                        if (this.pendingChildStatus) {
                            this.outputStatus(this.pendingChildStatus);
                        }
                    }, (status)=>{
                        this.cancelWithStatus(status.code, status.details);
                    });
                },
                onReceiveStatus: (status)=>{
                    this.trace("Received status");
                    if (this.readFilterPending) {
                        this.pendingChildStatus = status;
                    } else {
                        this.outputStatus(status);
                    }
                }
            });
            if (this.readPending) {
                this.child.startRead();
            }
            if (this.pendingMessage) {
                this.sendMessageOnChild(this.pendingMessage.context, this.pendingMessage.message);
            } else if (this.pendingHalfClose) {
                this.child.halfClose();
            }
        }, (status)=>{
            this.outputStatus(status);
        });
    }
    reportResolverError(status) {
        var _a;
        if ((_a = this.metadata) === null || _a === void 0 ? void 0 : _a.getOptions().waitForReady) {
            this.channel.queueCallForConfig(this);
        } else {
            this.outputStatus(status);
        }
    }
    cancelWithStatus(status, details) {
        var _a;
        this.trace("cancelWithStatus code: " + status + ' details: "' + details + '"');
        (_a = this.child) === null || _a === void 0 ? void 0 : _a.cancelWithStatus(status, details);
        this.outputStatus({
            code: status,
            details: details,
            metadata: new metadata_1.Metadata()
        });
    }
    getPeer() {
        var _a, _b;
        return (_b = (_a = this.child) === null || _a === void 0 ? void 0 : _a.getPeer()) !== null && _b !== void 0 ? _b : this.channel.getTarget();
    }
    start(metadata, listener) {
        this.trace("start called");
        this.metadata = metadata.clone();
        this.listener = listener;
        this.getConfig();
    }
    sendMessageWithContext(context, message) {
        this.trace("write() called with message of length " + message.length);
        if (this.child) {
            this.sendMessageOnChild(context, message);
        } else {
            this.pendingMessage = {
                context,
                message
            };
        }
    }
    startRead() {
        this.trace("startRead called");
        if (this.child) {
            this.child.startRead();
        } else {
            this.readPending = true;
        }
    }
    halfClose() {
        this.trace("halfClose called");
        if (this.child && !this.writeFilterPending) {
            this.child.halfClose();
        } else {
            this.pendingHalfClose = true;
        }
    }
    setCredentials(credentials) {
        this.credentials = this.credentials.compose(credentials);
    }
    addStatusWatcher(watcher) {
        this.statusWatchers.push(watcher);
    }
    getCallNumber() {
        return this.callNumber;
    }
}
exports.ResolvingCall = ResolvingCall; //# sourceMappingURL=resolving-call.js.map


/***/ }),

/***/ 72472:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.ResolvingLoadBalancer = void 0;
const load_balancer_1 = __webpack_require__(64189);
const service_config_1 = __webpack_require__(43034);
const connectivity_state_1 = __webpack_require__(16035);
const resolver_1 = __webpack_require__(71123);
const picker_1 = __webpack_require__(19786);
const backoff_timeout_1 = __webpack_require__(22308);
const constants_1 = __webpack_require__(60076);
const metadata_1 = __webpack_require__(39637);
const logging = __webpack_require__(67738);
const constants_2 = __webpack_require__(60076);
const uri_parser_1 = __webpack_require__(35193);
const load_balancer_child_handler_1 = __webpack_require__(84970);
const TRACER_NAME = "resolving_load_balancer";
function trace(text) {
    logging.trace(constants_2.LogVerbosity.DEBUG, TRACER_NAME, text);
}
const DEFAULT_LOAD_BALANCER_NAME = "pick_first";
function getDefaultConfigSelector(serviceConfig) {
    return function defaultConfigSelector(methodName, metadata) {
        var _a, _b;
        const splitName = methodName.split("/").filter((x)=>x.length > 0);
        const service = (_a = splitName[0]) !== null && _a !== void 0 ? _a : "";
        const method = (_b = splitName[1]) !== null && _b !== void 0 ? _b : "";
        if (serviceConfig && serviceConfig.methodConfig) {
            for (const methodConfig of serviceConfig.methodConfig){
                for (const name of methodConfig.name){
                    if (name.service === service && (name.method === undefined || name.method === method)) {
                        return {
                            methodConfig: methodConfig,
                            pickInformation: {},
                            status: constants_1.Status.OK,
                            dynamicFilterFactories: []
                        };
                    }
                }
            }
        }
        return {
            methodConfig: {
                name: []
            },
            pickInformation: {},
            status: constants_1.Status.OK,
            dynamicFilterFactories: []
        };
    };
}
class ResolvingLoadBalancer {
    /**
     * Wrapper class that behaves like a `LoadBalancer` and also handles name
     * resolution internally.
     * @param target The address of the backend to connect to.
     * @param channelControlHelper `ChannelControlHelper` instance provided by
     *     this load balancer's owner.
     * @param defaultServiceConfig The default service configuration to be used
     *     if none is provided by the name resolver. A `null` value indicates
     *     that the default behavior should be the default unconfigured behavior.
     *     In practice, that means using the "pick first" load balancer
     *     implmentation
     */ constructor(target, channelControlHelper, channelOptions, onSuccessfulResolution, onFailedResolution){
        this.target = target;
        this.channelControlHelper = channelControlHelper;
        this.channelOptions = channelOptions;
        this.onSuccessfulResolution = onSuccessfulResolution;
        this.onFailedResolution = onFailedResolution;
        this.latestChildState = connectivity_state_1.ConnectivityState.IDLE;
        this.latestChildPicker = new picker_1.QueuePicker(this);
        /**
         * This resolving load balancer's current connectivity state.
         */ this.currentState = connectivity_state_1.ConnectivityState.IDLE;
        /**
         * The service config object from the last successful resolution, if
         * available. A value of null indicates that we have not yet received a valid
         * service config from the resolver.
         */ this.previousServiceConfig = null;
        /**
         * Indicates whether we should attempt to resolve again after the backoff
         * timer runs out.
         */ this.continueResolving = false;
        if (channelOptions["grpc.service_config"]) {
            this.defaultServiceConfig = (0, service_config_1.validateServiceConfig)(JSON.parse(channelOptions["grpc.service_config"]));
        } else {
            this.defaultServiceConfig = {
                loadBalancingConfig: [],
                methodConfig: []
            };
        }
        this.updateState(connectivity_state_1.ConnectivityState.IDLE, new picker_1.QueuePicker(this));
        this.childLoadBalancer = new load_balancer_child_handler_1.ChildLoadBalancerHandler({
            createSubchannel: channelControlHelper.createSubchannel.bind(channelControlHelper),
            requestReresolution: ()=>{
                /* If the backoffTimeout is running, we're still backing off from
                 * making resolve requests, so we shouldn't make another one here.
                 * In that case, the backoff timer callback will call
                 * updateResolution */ if (this.backoffTimeout.isRunning()) {
                    this.continueResolving = true;
                } else {
                    this.updateResolution();
                }
            },
            updateState: (newState, picker)=>{
                this.latestChildState = newState;
                this.latestChildPicker = picker;
                this.updateState(newState, picker);
            },
            addChannelzChild: channelControlHelper.addChannelzChild.bind(channelControlHelper),
            removeChannelzChild: channelControlHelper.removeChannelzChild.bind(channelControlHelper)
        });
        this.innerResolver = (0, resolver_1.createResolver)(target, {
            onSuccessfulResolution: (addressList, serviceConfig, serviceConfigError, configSelector, attributes)=>{
                var _a;
                let workingServiceConfig = null;
                /* This first group of conditionals implements the algorithm described
                 * in https://github.com/grpc/proposal/blob/master/A21-service-config-error-handling.md
                 * in the section called "Behavior on receiving a new gRPC Config".
                 */ if (serviceConfig === null) {
                    // Step 4 and 5
                    if (serviceConfigError === null) {
                        // Step 5
                        this.previousServiceConfig = null;
                        workingServiceConfig = this.defaultServiceConfig;
                    } else {
                        // Step 4
                        if (this.previousServiceConfig === null) {
                            // Step 4.ii
                            this.handleResolutionFailure(serviceConfigError);
                        } else {
                            // Step 4.i
                            workingServiceConfig = this.previousServiceConfig;
                        }
                    }
                } else {
                    // Step 3
                    workingServiceConfig = serviceConfig;
                    this.previousServiceConfig = serviceConfig;
                }
                const workingConfigList = (_a = workingServiceConfig === null || workingServiceConfig === void 0 ? void 0 : workingServiceConfig.loadBalancingConfig) !== null && _a !== void 0 ? _a : [];
                const loadBalancingConfig = (0, load_balancer_1.getFirstUsableConfig)(workingConfigList, true);
                if (loadBalancingConfig === null) {
                    // There were load balancing configs but none are supported. This counts as a resolution failure
                    this.handleResolutionFailure({
                        code: constants_1.Status.UNAVAILABLE,
                        details: "All load balancer options in service config are not compatible",
                        metadata: new metadata_1.Metadata()
                    });
                    return;
                }
                this.childLoadBalancer.updateAddressList(addressList, loadBalancingConfig, attributes);
                const finalServiceConfig = workingServiceConfig !== null && workingServiceConfig !== void 0 ? workingServiceConfig : this.defaultServiceConfig;
                this.onSuccessfulResolution(finalServiceConfig, configSelector !== null && configSelector !== void 0 ? configSelector : getDefaultConfigSelector(finalServiceConfig));
            },
            onError: (error)=>{
                this.handleResolutionFailure(error);
            }
        }, channelOptions);
        const backoffOptions = {
            initialDelay: channelOptions["grpc.initial_reconnect_backoff_ms"],
            maxDelay: channelOptions["grpc.max_reconnect_backoff_ms"]
        };
        this.backoffTimeout = new backoff_timeout_1.BackoffTimeout(()=>{
            if (this.continueResolving) {
                this.updateResolution();
                this.continueResolving = false;
            } else {
                this.updateState(this.latestChildState, this.latestChildPicker);
            }
        }, backoffOptions);
        this.backoffTimeout.unref();
    }
    updateResolution() {
        this.innerResolver.updateResolution();
        if (this.currentState === connectivity_state_1.ConnectivityState.IDLE) {
            this.updateState(connectivity_state_1.ConnectivityState.CONNECTING, new picker_1.QueuePicker(this));
        }
        this.backoffTimeout.runOnce();
    }
    updateState(connectivityState, picker) {
        trace((0, uri_parser_1.uriToString)(this.target) + " " + connectivity_state_1.ConnectivityState[this.currentState] + " -> " + connectivity_state_1.ConnectivityState[connectivityState]);
        // Ensure that this.exitIdle() is called by the picker
        if (connectivityState === connectivity_state_1.ConnectivityState.IDLE) {
            picker = new picker_1.QueuePicker(this);
        }
        this.currentState = connectivityState;
        this.channelControlHelper.updateState(connectivityState, picker);
    }
    handleResolutionFailure(error) {
        if (this.latestChildState === connectivity_state_1.ConnectivityState.IDLE) {
            this.updateState(connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE, new picker_1.UnavailablePicker(error));
            this.onFailedResolution(error);
        }
    }
    exitIdle() {
        if (this.currentState === connectivity_state_1.ConnectivityState.IDLE || this.currentState === connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE) {
            if (this.backoffTimeout.isRunning()) {
                this.continueResolving = true;
            } else {
                this.updateResolution();
            }
        }
        this.childLoadBalancer.exitIdle();
    }
    updateAddressList(addressList, lbConfig) {
        throw new Error("updateAddressList not supported on ResolvingLoadBalancer");
    }
    resetBackoff() {
        this.backoffTimeout.reset();
        this.childLoadBalancer.resetBackoff();
    }
    destroy() {
        this.childLoadBalancer.destroy();
        this.innerResolver.destroy();
        this.updateState(connectivity_state_1.ConnectivityState.SHUTDOWN, new picker_1.UnavailablePicker());
    }
    getTypeName() {
        return "resolving_load_balancer";
    }
}
exports.ResolvingLoadBalancer = ResolvingLoadBalancer; //# sourceMappingURL=resolving-load-balancer.js.map


/***/ }),

/***/ 13412:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2022 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.RetryingCall = exports.MessageBufferTracker = exports.RetryThrottler = void 0;
const constants_1 = __webpack_require__(60076);
const metadata_1 = __webpack_require__(39637);
const logging = __webpack_require__(67738);
const TRACER_NAME = "retrying_call";
class RetryThrottler {
    constructor(maxTokens, tokenRatio, previousRetryThrottler){
        this.maxTokens = maxTokens;
        this.tokenRatio = tokenRatio;
        if (previousRetryThrottler) {
            /* When carrying over tokens from a previous config, rescale them to the
             * new max value */ this.tokens = previousRetryThrottler.tokens * (maxTokens / previousRetryThrottler.maxTokens);
        } else {
            this.tokens = maxTokens;
        }
    }
    addCallSucceeded() {
        this.tokens = Math.max(this.tokens + this.tokenRatio, this.maxTokens);
    }
    addCallFailed() {
        this.tokens = Math.min(this.tokens - 1, 0);
    }
    canRetryCall() {
        return this.tokens > this.maxTokens / 2;
    }
}
exports.RetryThrottler = RetryThrottler;
class MessageBufferTracker {
    constructor(totalLimit, limitPerCall){
        this.totalLimit = totalLimit;
        this.limitPerCall = limitPerCall;
        this.totalAllocated = 0;
        this.allocatedPerCall = new Map();
    }
    allocate(size, callId) {
        var _a;
        const currentPerCall = (_a = this.allocatedPerCall.get(callId)) !== null && _a !== void 0 ? _a : 0;
        if (this.limitPerCall - currentPerCall < size || this.totalLimit - this.totalAllocated < size) {
            return false;
        }
        this.allocatedPerCall.set(callId, currentPerCall + size);
        this.totalAllocated += size;
        return true;
    }
    free(size, callId) {
        var _a;
        if (this.totalAllocated < size) {
            throw new Error(`Invalid buffer allocation state: call ${callId} freed ${size} > total allocated ${this.totalAllocated}`);
        }
        this.totalAllocated -= size;
        const currentPerCall = (_a = this.allocatedPerCall.get(callId)) !== null && _a !== void 0 ? _a : 0;
        if (currentPerCall < size) {
            throw new Error(`Invalid buffer allocation state: call ${callId} freed ${size} > allocated for call ${currentPerCall}`);
        }
        this.allocatedPerCall.set(callId, currentPerCall - size);
    }
    freeAll(callId) {
        var _a;
        const currentPerCall = (_a = this.allocatedPerCall.get(callId)) !== null && _a !== void 0 ? _a : 0;
        if (this.totalAllocated < currentPerCall) {
            throw new Error(`Invalid buffer allocation state: call ${callId} allocated ${currentPerCall} > total allocated ${this.totalAllocated}`);
        }
        this.totalAllocated -= currentPerCall;
        this.allocatedPerCall.delete(callId);
    }
}
exports.MessageBufferTracker = MessageBufferTracker;
const PREVIONS_RPC_ATTEMPTS_METADATA_KEY = "grpc-previous-rpc-attempts";
class RetryingCall {
    constructor(channel, callConfig, methodName, host, credentials, deadline, callNumber, bufferTracker, retryThrottler){
        this.channel = channel;
        this.callConfig = callConfig;
        this.methodName = methodName;
        this.host = host;
        this.credentials = credentials;
        this.deadline = deadline;
        this.callNumber = callNumber;
        this.bufferTracker = bufferTracker;
        this.retryThrottler = retryThrottler;
        this.listener = null;
        this.initialMetadata = null;
        this.underlyingCalls = [];
        this.writeBuffer = [];
        /**
         * The offset of message indices in the writeBuffer. For example, if
         * writeBufferOffset is 10, message 10 is in writeBuffer[0] and message 15
         * is in writeBuffer[5].
         */ this.writeBufferOffset = 0;
        /**
         * Tracks whether a read has been started, so that we know whether to start
         * reads on new child calls. This only matters for the first read, because
         * once a message comes in the child call becomes committed and there will
         * be no new child calls.
         */ this.readStarted = false;
        this.transparentRetryUsed = false;
        /**
         * Number of attempts so far
         */ this.attempts = 0;
        this.hedgingTimer = null;
        this.committedCallIndex = null;
        this.initialRetryBackoffSec = 0;
        this.nextRetryBackoffSec = 0;
        if (callConfig.methodConfig.retryPolicy) {
            this.state = "RETRY";
            const retryPolicy = callConfig.methodConfig.retryPolicy;
            this.nextRetryBackoffSec = this.initialRetryBackoffSec = Number(retryPolicy.initialBackoff.substring(0, retryPolicy.initialBackoff.length - 1));
        } else if (callConfig.methodConfig.hedgingPolicy) {
            this.state = "HEDGING";
        } else {
            this.state = "TRANSPARENT_ONLY";
        }
    }
    getCallNumber() {
        return this.callNumber;
    }
    trace(text) {
        logging.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, "[" + this.callNumber + "] " + text);
    }
    reportStatus(statusObject) {
        this.trace("ended with status: code=" + statusObject.code + ' details="' + statusObject.details + '"');
        this.bufferTracker.freeAll(this.callNumber);
        this.writeBufferOffset = this.writeBufferOffset + this.writeBuffer.length;
        this.writeBuffer = [];
        process.nextTick(()=>{
            var _a;
            // Explicitly construct status object to remove progress field
            (_a = this.listener) === null || _a === void 0 ? void 0 : _a.onReceiveStatus({
                code: statusObject.code,
                details: statusObject.details,
                metadata: statusObject.metadata
            });
        });
    }
    cancelWithStatus(status, details) {
        this.trace("cancelWithStatus code: " + status + ' details: "' + details + '"');
        this.reportStatus({
            code: status,
            details,
            metadata: new metadata_1.Metadata()
        });
        for (const { call  } of this.underlyingCalls){
            call.cancelWithStatus(status, details);
        }
    }
    getPeer() {
        if (this.committedCallIndex !== null) {
            return this.underlyingCalls[this.committedCallIndex].call.getPeer();
        } else {
            return "unknown";
        }
    }
    getBufferEntry(messageIndex) {
        var _a;
        return (_a = this.writeBuffer[messageIndex - this.writeBufferOffset]) !== null && _a !== void 0 ? _a : {
            entryType: "FREED",
            allocated: false
        };
    }
    getNextBufferIndex() {
        return this.writeBufferOffset + this.writeBuffer.length;
    }
    clearSentMessages() {
        if (this.state !== "COMMITTED") {
            return;
        }
        const earliestNeededMessageIndex = this.underlyingCalls[this.committedCallIndex].nextMessageToSend;
        for(let messageIndex = this.writeBufferOffset; messageIndex < earliestNeededMessageIndex; messageIndex++){
            const bufferEntry = this.getBufferEntry(messageIndex);
            if (bufferEntry.allocated) {
                this.bufferTracker.free(bufferEntry.message.message.length, this.callNumber);
            }
        }
        this.writeBuffer = this.writeBuffer.slice(earliestNeededMessageIndex - this.writeBufferOffset);
        this.writeBufferOffset = earliestNeededMessageIndex;
    }
    commitCall(index) {
        if (this.state === "COMMITTED") {
            return;
        }
        if (this.underlyingCalls[index].state === "COMPLETED") {
            return;
        }
        this.trace("Committing call [" + this.underlyingCalls[index].call.getCallNumber() + "] at index " + index);
        this.state = "COMMITTED";
        this.committedCallIndex = index;
        for(let i = 0; i < this.underlyingCalls.length; i++){
            if (i === index) {
                continue;
            }
            if (this.underlyingCalls[i].state === "COMPLETED") {
                continue;
            }
            this.underlyingCalls[i].state = "COMPLETED";
            this.underlyingCalls[i].call.cancelWithStatus(constants_1.Status.CANCELLED, "Discarded in favor of other hedged attempt");
        }
        this.clearSentMessages();
    }
    commitCallWithMostMessages() {
        if (this.state === "COMMITTED") {
            return;
        }
        let mostMessages = -1;
        let callWithMostMessages = -1;
        for (const [index, childCall] of this.underlyingCalls.entries()){
            if (childCall.state === "ACTIVE" && childCall.nextMessageToSend > mostMessages) {
                mostMessages = childCall.nextMessageToSend;
                callWithMostMessages = index;
            }
        }
        if (callWithMostMessages === -1) {
            /* There are no active calls, disable retries to force the next call that
             * is started to be committed. */ this.state = "TRANSPARENT_ONLY";
        } else {
            this.commitCall(callWithMostMessages);
        }
    }
    isStatusCodeInList(list, code) {
        return list.some((value)=>value === code || value.toString().toLowerCase() === constants_1.Status[code].toLowerCase());
    }
    getNextRetryBackoffMs() {
        var _a;
        const retryPolicy = (_a = this.callConfig) === null || _a === void 0 ? void 0 : _a.methodConfig.retryPolicy;
        if (!retryPolicy) {
            return 0;
        }
        const nextBackoffMs = Math.random() * this.nextRetryBackoffSec * 1000;
        const maxBackoffSec = Number(retryPolicy.maxBackoff.substring(0, retryPolicy.maxBackoff.length - 1));
        this.nextRetryBackoffSec = Math.min(this.nextRetryBackoffSec * retryPolicy.backoffMultiplier, maxBackoffSec);
        return nextBackoffMs;
    }
    maybeRetryCall(pushback, callback) {
        if (this.state !== "RETRY") {
            callback(false);
            return;
        }
        const retryPolicy = this.callConfig.methodConfig.retryPolicy;
        if (this.attempts >= Math.min(retryPolicy.maxAttempts, 5)) {
            callback(false);
            return;
        }
        let retryDelayMs;
        if (pushback === null) {
            retryDelayMs = this.getNextRetryBackoffMs();
        } else if (pushback < 0) {
            this.state = "TRANSPARENT_ONLY";
            callback(false);
            return;
        } else {
            retryDelayMs = pushback;
            this.nextRetryBackoffSec = this.initialRetryBackoffSec;
        }
        setTimeout(()=>{
            var _a, _b;
            if (this.state !== "RETRY") {
                callback(false);
                return;
            }
            if ((_b = (_a = this.retryThrottler) === null || _a === void 0 ? void 0 : _a.canRetryCall()) !== null && _b !== void 0 ? _b : true) {
                callback(true);
                this.attempts += 1;
                this.startNewAttempt();
            }
        }, retryDelayMs);
    }
    countActiveCalls() {
        let count = 0;
        for (const call of this.underlyingCalls){
            if ((call === null || call === void 0 ? void 0 : call.state) === "ACTIVE") {
                count += 1;
            }
        }
        return count;
    }
    handleProcessedStatus(status, callIndex, pushback) {
        var _a, _b, _c;
        switch(this.state){
            case "COMMITTED":
            case "TRANSPARENT_ONLY":
                this.commitCall(callIndex);
                this.reportStatus(status);
                break;
            case "HEDGING":
                if (this.isStatusCodeInList((_a = this.callConfig.methodConfig.hedgingPolicy.nonFatalStatusCodes) !== null && _a !== void 0 ? _a : [], status.code)) {
                    (_b = this.retryThrottler) === null || _b === void 0 ? void 0 : _b.addCallFailed();
                    let delayMs;
                    if (pushback === null) {
                        delayMs = 0;
                    } else if (pushback < 0) {
                        this.state = "TRANSPARENT_ONLY";
                        this.commitCall(callIndex);
                        this.reportStatus(status);
                        return;
                    } else {
                        delayMs = pushback;
                    }
                    setTimeout(()=>{
                        this.maybeStartHedgingAttempt();
                        // If after trying to start a call there are no active calls, this was the last one
                        if (this.countActiveCalls() === 0) {
                            this.commitCall(callIndex);
                            this.reportStatus(status);
                        }
                    }, delayMs);
                } else {
                    this.commitCall(callIndex);
                    this.reportStatus(status);
                }
                break;
            case "RETRY":
                if (this.isStatusCodeInList(this.callConfig.methodConfig.retryPolicy.retryableStatusCodes, status.code)) {
                    (_c = this.retryThrottler) === null || _c === void 0 ? void 0 : _c.addCallFailed();
                    this.maybeRetryCall(pushback, (retried)=>{
                        if (!retried) {
                            this.commitCall(callIndex);
                            this.reportStatus(status);
                        }
                    });
                } else {
                    this.commitCall(callIndex);
                    this.reportStatus(status);
                }
                break;
        }
    }
    getPushback(metadata) {
        const mdValue = metadata.get("grpc-retry-pushback-ms");
        if (mdValue.length === 0) {
            return null;
        }
        try {
            return parseInt(mdValue[0]);
        } catch (e) {
            return -1;
        }
    }
    handleChildStatus(status, callIndex) {
        var _a;
        if (this.underlyingCalls[callIndex].state === "COMPLETED") {
            return;
        }
        this.trace("state=" + this.state + " handling status with progress " + status.progress + " from child [" + this.underlyingCalls[callIndex].call.getCallNumber() + "] in state " + this.underlyingCalls[callIndex].state);
        this.underlyingCalls[callIndex].state = "COMPLETED";
        if (status.code === constants_1.Status.OK) {
            (_a = this.retryThrottler) === null || _a === void 0 ? void 0 : _a.addCallSucceeded();
            this.commitCall(callIndex);
            this.reportStatus(status);
            return;
        }
        if (this.state === "COMMITTED") {
            this.reportStatus(status);
            return;
        }
        const pushback = this.getPushback(status.metadata);
        switch(status.progress){
            case "NOT_STARTED":
                // RPC never leaves the client, always safe to retry
                this.startNewAttempt();
                break;
            case "REFUSED":
                // RPC reaches the server library, but not the server application logic
                if (this.transparentRetryUsed) {
                    this.handleProcessedStatus(status, callIndex, pushback);
                } else {
                    this.transparentRetryUsed = true;
                    this.startNewAttempt();
                }
                ;
                break;
            case "DROP":
                this.commitCall(callIndex);
                this.reportStatus(status);
                break;
            case "PROCESSED":
                this.handleProcessedStatus(status, callIndex, pushback);
                break;
        }
    }
    maybeStartHedgingAttempt() {
        if (this.state !== "HEDGING") {
            return;
        }
        if (!this.callConfig.methodConfig.hedgingPolicy) {
            return;
        }
        const hedgingPolicy = this.callConfig.methodConfig.hedgingPolicy;
        if (this.attempts >= Math.min(hedgingPolicy.maxAttempts, 5)) {
            return;
        }
        this.attempts += 1;
        this.startNewAttempt();
        this.maybeStartHedgingTimer();
    }
    maybeStartHedgingTimer() {
        var _a, _b, _c;
        if (this.hedgingTimer) {
            clearTimeout(this.hedgingTimer);
        }
        if (this.state !== "HEDGING") {
            return;
        }
        if (!this.callConfig.methodConfig.hedgingPolicy) {
            return;
        }
        const hedgingPolicy = this.callConfig.methodConfig.hedgingPolicy;
        if (this.attempts >= Math.min(hedgingPolicy.maxAttempts, 5)) {
            return;
        }
        const hedgingDelayString = (_a = hedgingPolicy.hedgingDelay) !== null && _a !== void 0 ? _a : "0s";
        const hedgingDelaySec = Number(hedgingDelayString.substring(0, hedgingDelayString.length - 1));
        this.hedgingTimer = setTimeout(()=>{
            this.maybeStartHedgingAttempt();
        }, hedgingDelaySec * 1000);
        (_c = (_b = this.hedgingTimer).unref) === null || _c === void 0 ? void 0 : _c.call(_b);
    }
    startNewAttempt() {
        const child = this.channel.createLoadBalancingCall(this.callConfig, this.methodName, this.host, this.credentials, this.deadline);
        this.trace("Created child call [" + child.getCallNumber() + "] for attempt " + this.attempts);
        const index = this.underlyingCalls.length;
        this.underlyingCalls.push({
            state: "ACTIVE",
            call: child,
            nextMessageToSend: 0
        });
        const previousAttempts = this.attempts - 1;
        const initialMetadata = this.initialMetadata.clone();
        if (previousAttempts > 0) {
            initialMetadata.set(PREVIONS_RPC_ATTEMPTS_METADATA_KEY, `${previousAttempts}`);
        }
        let receivedMetadata = false;
        child.start(initialMetadata, {
            onReceiveMetadata: (metadata)=>{
                this.trace("Received metadata from child [" + child.getCallNumber() + "]");
                this.commitCall(index);
                receivedMetadata = true;
                if (previousAttempts > 0) {
                    metadata.set(PREVIONS_RPC_ATTEMPTS_METADATA_KEY, `${previousAttempts}`);
                }
                if (this.underlyingCalls[index].state === "ACTIVE") {
                    this.listener.onReceiveMetadata(metadata);
                }
            },
            onReceiveMessage: (message)=>{
                this.trace("Received message from child [" + child.getCallNumber() + "]");
                this.commitCall(index);
                if (this.underlyingCalls[index].state === "ACTIVE") {
                    this.listener.onReceiveMessage(message);
                }
            },
            onReceiveStatus: (status)=>{
                this.trace("Received status from child [" + child.getCallNumber() + "]");
                if (!receivedMetadata && previousAttempts > 0) {
                    status.metadata.set(PREVIONS_RPC_ATTEMPTS_METADATA_KEY, `${previousAttempts}`);
                }
                this.handleChildStatus(status, index);
            }
        });
        this.sendNextChildMessage(index);
        if (this.readStarted) {
            child.startRead();
        }
    }
    start(metadata, listener) {
        this.trace("start called");
        this.listener = listener;
        this.initialMetadata = metadata;
        this.attempts += 1;
        this.startNewAttempt();
        this.maybeStartHedgingTimer();
    }
    handleChildWriteCompleted(childIndex) {
        var _a, _b;
        const childCall = this.underlyingCalls[childIndex];
        const messageIndex = childCall.nextMessageToSend;
        (_b = (_a = this.getBufferEntry(messageIndex)).callback) === null || _b === void 0 ? void 0 : _b.call(_a);
        this.clearSentMessages();
        childCall.nextMessageToSend += 1;
        this.sendNextChildMessage(childIndex);
    }
    sendNextChildMessage(childIndex) {
        const childCall = this.underlyingCalls[childIndex];
        if (childCall.state === "COMPLETED") {
            return;
        }
        if (this.getBufferEntry(childCall.nextMessageToSend)) {
            const bufferEntry = this.getBufferEntry(childCall.nextMessageToSend);
            switch(bufferEntry.entryType){
                case "MESSAGE":
                    childCall.call.sendMessageWithContext({
                        callback: (error)=>{
                            // Ignore error
                            this.handleChildWriteCompleted(childIndex);
                        }
                    }, bufferEntry.message.message);
                    break;
                case "HALF_CLOSE":
                    childCall.nextMessageToSend += 1;
                    childCall.call.halfClose();
                    break;
                case "FREED":
                    break;
            }
        }
    }
    sendMessageWithContext(context, message) {
        var _a;
        this.trace("write() called with message of length " + message.length);
        const writeObj = {
            message,
            flags: context.flags
        };
        const messageIndex = this.getNextBufferIndex();
        const bufferEntry = {
            entryType: "MESSAGE",
            message: writeObj,
            allocated: this.bufferTracker.allocate(message.length, this.callNumber)
        };
        this.writeBuffer.push(bufferEntry);
        if (bufferEntry.allocated) {
            (_a = context.callback) === null || _a === void 0 ? void 0 : _a.call(context);
            for (const [callIndex, call] of this.underlyingCalls.entries()){
                if (call.state === "ACTIVE" && call.nextMessageToSend === messageIndex) {
                    call.call.sendMessageWithContext({
                        callback: (error)=>{
                            // Ignore error
                            this.handleChildWriteCompleted(callIndex);
                        }
                    }, message);
                }
            }
        } else {
            this.commitCallWithMostMessages();
            // commitCallWithMostMessages can fail if we are between ping attempts
            if (this.committedCallIndex === null) {
                return;
            }
            const call = this.underlyingCalls[this.committedCallIndex];
            bufferEntry.callback = context.callback;
            if (call.state === "ACTIVE" && call.nextMessageToSend === messageIndex) {
                call.call.sendMessageWithContext({
                    callback: (error)=>{
                        // Ignore error
                        this.handleChildWriteCompleted(this.committedCallIndex);
                    }
                }, message);
            }
        }
    }
    startRead() {
        this.trace("startRead called");
        this.readStarted = true;
        for (const underlyingCall of this.underlyingCalls){
            if ((underlyingCall === null || underlyingCall === void 0 ? void 0 : underlyingCall.state) === "ACTIVE") {
                underlyingCall.call.startRead();
            }
        }
    }
    halfClose() {
        this.trace("halfClose called");
        const halfCloseIndex = this.getNextBufferIndex();
        this.writeBuffer.push({
            entryType: "HALF_CLOSE",
            allocated: false
        });
        for (const call of this.underlyingCalls){
            if ((call === null || call === void 0 ? void 0 : call.state) === "ACTIVE" && call.nextMessageToSend === halfCloseIndex) {
                call.nextMessageToSend += 1;
                call.call.halfClose();
            }
        }
    }
    setCredentials(newCredentials) {
        throw new Error("Method not implemented.");
    }
    getMethod() {
        return this.methodName;
    }
    getHost() {
        return this.host;
    }
}
exports.RetryingCall = RetryingCall; //# sourceMappingURL=retrying-call.js.map


/***/ }),

/***/ 50308:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.Http2ServerCallStream = exports.ServerDuplexStreamImpl = exports.ServerWritableStreamImpl = exports.ServerReadableStreamImpl = exports.ServerUnaryCallImpl = void 0;
const events_1 = __webpack_require__(82361);
const http2 = __webpack_require__(85158);
const stream_1 = __webpack_require__(12781);
const zlib = __webpack_require__(59796);
const util_1 = __webpack_require__(73837);
const constants_1 = __webpack_require__(60076);
const metadata_1 = __webpack_require__(39637);
const stream_decoder_1 = __webpack_require__(34540);
const logging = __webpack_require__(67738);
const error_1 = __webpack_require__(6134);
const TRACER_NAME = "server_call";
const unzip = (0, util_1.promisify)(zlib.unzip);
const inflate = (0, util_1.promisify)(zlib.inflate);
function trace(text) {
    logging.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, text);
}
const GRPC_ACCEPT_ENCODING_HEADER = "grpc-accept-encoding";
const GRPC_ENCODING_HEADER = "grpc-encoding";
const GRPC_MESSAGE_HEADER = "grpc-message";
const GRPC_STATUS_HEADER = "grpc-status";
const GRPC_TIMEOUT_HEADER = "grpc-timeout";
const DEADLINE_REGEX = /(\d{1,8})\s*([HMSmun])/;
const deadlineUnitsToMs = {
    H: 3600000,
    M: 60000,
    S: 1000,
    m: 1,
    u: 0.001,
    n: 0.000001
};
const defaultCompressionHeaders = {
    // TODO(cjihrig): Remove these encoding headers from the default response
    // once compression is integrated.
    [GRPC_ACCEPT_ENCODING_HEADER]: "identity,deflate,gzip",
    [GRPC_ENCODING_HEADER]: "identity"
};
const defaultResponseHeaders = {
    [http2.constants.HTTP2_HEADER_STATUS]: http2.constants.HTTP_STATUS_OK,
    [http2.constants.HTTP2_HEADER_CONTENT_TYPE]: "application/grpc+proto"
};
const defaultResponseOptions = {
    waitForTrailers: true
};
class ServerUnaryCallImpl extends events_1.EventEmitter {
    constructor(call, metadata, request){
        super();
        this.call = call;
        this.metadata = metadata;
        this.request = request;
        this.cancelled = false;
        this.call.setupSurfaceCall(this);
    }
    getPeer() {
        return this.call.getPeer();
    }
    sendMetadata(responseMetadata) {
        this.call.sendMetadata(responseMetadata);
    }
    getDeadline() {
        return this.call.getDeadline();
    }
    getPath() {
        return this.call.getPath();
    }
}
exports.ServerUnaryCallImpl = ServerUnaryCallImpl;
class ServerReadableStreamImpl extends stream_1.Readable {
    constructor(call, metadata, deserialize, encoding){
        super({
            objectMode: true
        });
        this.call = call;
        this.metadata = metadata;
        this.deserialize = deserialize;
        this.cancelled = false;
        this.call.setupSurfaceCall(this);
        this.call.setupReadable(this, encoding);
    }
    _read(size) {
        if (!this.call.consumeUnpushedMessages(this)) {
            return;
        }
        this.call.resume();
    }
    getPeer() {
        return this.call.getPeer();
    }
    sendMetadata(responseMetadata) {
        this.call.sendMetadata(responseMetadata);
    }
    getDeadline() {
        return this.call.getDeadline();
    }
    getPath() {
        return this.call.getPath();
    }
}
exports.ServerReadableStreamImpl = ServerReadableStreamImpl;
class ServerWritableStreamImpl extends stream_1.Writable {
    constructor(call, metadata, serialize, request){
        super({
            objectMode: true
        });
        this.call = call;
        this.metadata = metadata;
        this.serialize = serialize;
        this.request = request;
        this.cancelled = false;
        this.trailingMetadata = new metadata_1.Metadata();
        this.call.setupSurfaceCall(this);
        this.on("error", (err)=>{
            this.call.sendError(err);
            this.end();
        });
    }
    getPeer() {
        return this.call.getPeer();
    }
    sendMetadata(responseMetadata) {
        this.call.sendMetadata(responseMetadata);
    }
    getDeadline() {
        return this.call.getDeadline();
    }
    getPath() {
        return this.call.getPath();
    }
    _write(chunk, encoding, // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback) {
        try {
            const response = this.call.serializeMessage(chunk);
            if (!this.call.write(response)) {
                this.call.once("drain", callback);
                return;
            }
        } catch (err) {
            this.emit("error", {
                details: (0, error_1.getErrorMessage)(err),
                code: constants_1.Status.INTERNAL
            });
        }
        callback();
    }
    _final(callback) {
        this.call.sendStatus({
            code: constants_1.Status.OK,
            details: "OK",
            metadata: this.trailingMetadata
        });
        callback(null);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    end(metadata) {
        if (metadata) {
            this.trailingMetadata = metadata;
        }
        return super.end();
    }
}
exports.ServerWritableStreamImpl = ServerWritableStreamImpl;
class ServerDuplexStreamImpl extends stream_1.Duplex {
    constructor(call, metadata, serialize, deserialize, encoding){
        super({
            objectMode: true
        });
        this.call = call;
        this.metadata = metadata;
        this.serialize = serialize;
        this.deserialize = deserialize;
        this.cancelled = false;
        this.trailingMetadata = new metadata_1.Metadata();
        this.call.setupSurfaceCall(this);
        this.call.setupReadable(this, encoding);
        this.on("error", (err)=>{
            this.call.sendError(err);
            this.end();
        });
    }
    getPeer() {
        return this.call.getPeer();
    }
    sendMetadata(responseMetadata) {
        this.call.sendMetadata(responseMetadata);
    }
    getDeadline() {
        return this.call.getDeadline();
    }
    getPath() {
        return this.call.getPath();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    end(metadata) {
        if (metadata) {
            this.trailingMetadata = metadata;
        }
        return super.end();
    }
}
exports.ServerDuplexStreamImpl = ServerDuplexStreamImpl;
ServerDuplexStreamImpl.prototype._read = ServerReadableStreamImpl.prototype._read;
ServerDuplexStreamImpl.prototype._write = ServerWritableStreamImpl.prototype._write;
ServerDuplexStreamImpl.prototype._final = ServerWritableStreamImpl.prototype._final;
// Internal class that wraps the HTTP2 request.
class Http2ServerCallStream extends events_1.EventEmitter {
    constructor(stream, handler, options){
        super();
        this.stream = stream;
        this.handler = handler;
        this.options = options;
        this.cancelled = false;
        this.deadlineTimer = null;
        this.statusSent = false;
        this.deadline = Infinity;
        this.wantTrailers = false;
        this.metadataSent = false;
        this.canPush = false;
        this.isPushPending = false;
        this.bufferedMessages = [];
        this.messagesToPush = [];
        this.maxSendMessageSize = constants_1.DEFAULT_MAX_SEND_MESSAGE_LENGTH;
        this.maxReceiveMessageSize = constants_1.DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH;
        this.stream.once("error", (err)=>{
        /* We need an error handler to avoid uncaught error event exceptions, but
             * there is nothing we can reasonably do here. Any error event should
             * have a corresponding close event, which handles emitting the cancelled
             * event. And the stream is now in a bad state, so we can't reasonably
             * expect to be able to send an error over it. */ });
        this.stream.once("close", ()=>{
            var _a;
            trace("Request to method " + ((_a = this.handler) === null || _a === void 0 ? void 0 : _a.path) + " stream closed with rstCode " + this.stream.rstCode);
            if (!this.statusSent) {
                this.cancelled = true;
                this.emit("cancelled", "cancelled");
                this.emit("streamEnd", false);
                this.sendStatus({
                    code: constants_1.Status.CANCELLED,
                    details: "Cancelled by client",
                    metadata: null
                });
            }
        });
        this.stream.on("drain", ()=>{
            this.emit("drain");
        });
        if ("grpc.max_send_message_length" in options) {
            this.maxSendMessageSize = options["grpc.max_send_message_length"];
        }
        if ("grpc.max_receive_message_length" in options) {
            this.maxReceiveMessageSize = options["grpc.max_receive_message_length"];
        }
    }
    checkCancelled() {
        /* In some cases the stream can become destroyed before the close event
         * fires. That creates a race condition that this check works around */ if (this.stream.destroyed || this.stream.closed) {
            this.cancelled = true;
        }
        return this.cancelled;
    }
    getDecompressedMessage(message, encoding) {
        if (encoding === "deflate") {
            return inflate(message.subarray(5));
        } else if (encoding === "gzip") {
            return unzip(message.subarray(5));
        } else if (encoding === "identity") {
            return message.subarray(5);
        }
        return Promise.reject({
            code: constants_1.Status.UNIMPLEMENTED,
            details: `Received message compressed with unsupported encoding "${encoding}"`
        });
    }
    sendMetadata(customMetadata) {
        if (this.checkCancelled()) {
            return;
        }
        if (this.metadataSent) {
            return;
        }
        this.metadataSent = true;
        const custom = customMetadata ? customMetadata.toHttp2Headers() : null;
        // TODO(cjihrig): Include compression headers.
        const headers = Object.assign(Object.assign(Object.assign({}, defaultResponseHeaders), defaultCompressionHeaders), custom);
        this.stream.respond(headers, defaultResponseOptions);
    }
    receiveMetadata(headers) {
        const metadata = metadata_1.Metadata.fromHttp2Headers(headers);
        if (logging.isTracerEnabled(TRACER_NAME)) {
            trace("Request to " + this.handler.path + " received headers " + JSON.stringify(metadata.toJSON()));
        }
        // TODO(cjihrig): Receive compression metadata.
        const timeoutHeader = metadata.get(GRPC_TIMEOUT_HEADER);
        if (timeoutHeader.length > 0) {
            const match = timeoutHeader[0].toString().match(DEADLINE_REGEX);
            if (match === null) {
                const err = new Error("Invalid deadline");
                err.code = constants_1.Status.OUT_OF_RANGE;
                this.sendError(err);
                return metadata;
            }
            const timeout = +match[1] * deadlineUnitsToMs[match[2]] | 0;
            const now = new Date();
            this.deadline = now.setMilliseconds(now.getMilliseconds() + timeout);
            this.deadlineTimer = setTimeout(handleExpiredDeadline, timeout, this);
            metadata.remove(GRPC_TIMEOUT_HEADER);
        }
        // Remove several headers that should not be propagated to the application
        metadata.remove(http2.constants.HTTP2_HEADER_ACCEPT_ENCODING);
        metadata.remove(http2.constants.HTTP2_HEADER_TE);
        metadata.remove(http2.constants.HTTP2_HEADER_CONTENT_TYPE);
        metadata.remove("grpc-accept-encoding");
        return metadata;
    }
    receiveUnaryMessage(encoding, next) {
        const { stream  } = this;
        let receivedLength = 0;
        const call = this;
        const body = [];
        const limit = this.maxReceiveMessageSize;
        stream.on("data", onData);
        stream.on("end", onEnd);
        stream.on("error", onEnd);
        function onData(chunk) {
            receivedLength += chunk.byteLength;
            if (limit !== -1 && receivedLength > limit) {
                stream.removeListener("data", onData);
                stream.removeListener("end", onEnd);
                stream.removeListener("error", onEnd);
                next({
                    code: constants_1.Status.RESOURCE_EXHAUSTED,
                    details: `Received message larger than max (${receivedLength} vs. ${limit})`
                });
                return;
            }
            body.push(chunk);
        }
        function onEnd(err) {
            stream.removeListener("data", onData);
            stream.removeListener("end", onEnd);
            stream.removeListener("error", onEnd);
            if (err !== undefined) {
                next({
                    code: constants_1.Status.INTERNAL,
                    details: err.message
                });
                return;
            }
            if (receivedLength === 0) {
                next({
                    code: constants_1.Status.INTERNAL,
                    details: "received empty unary message"
                });
                return;
            }
            call.emit("receiveMessage");
            const requestBytes = Buffer.concat(body, receivedLength);
            const compressed = requestBytes.readUInt8(0) === 1;
            const compressedMessageEncoding = compressed ? encoding : "identity";
            const decompressedMessage = call.getDecompressedMessage(requestBytes, compressedMessageEncoding);
            if (Buffer.isBuffer(decompressedMessage)) {
                call.safeDeserializeMessage(decompressedMessage, next);
                return;
            }
            decompressedMessage.then((decompressed)=>call.safeDeserializeMessage(decompressed, next), (err)=>next(err.code ? err : {
                    code: constants_1.Status.INTERNAL,
                    details: `Received "grpc-encoding" header "${encoding}" but ${encoding} decompression failed`
                }));
        }
    }
    safeDeserializeMessage(buffer, next) {
        try {
            next(null, this.deserializeMessage(buffer));
        } catch (err) {
            next({
                details: (0, error_1.getErrorMessage)(err),
                code: constants_1.Status.INTERNAL
            });
        }
    }
    serializeMessage(value) {
        const messageBuffer = this.handler.serialize(value);
        // TODO(cjihrig): Call compression aware serializeMessage().
        const byteLength = messageBuffer.byteLength;
        const output = Buffer.allocUnsafe(byteLength + 5);
        output.writeUInt8(0, 0);
        output.writeUInt32BE(byteLength, 1);
        messageBuffer.copy(output, 5);
        return output;
    }
    deserializeMessage(bytes) {
        return this.handler.deserialize(bytes);
    }
    async sendUnaryMessage(err, value, metadata, flags) {
        if (this.checkCancelled()) {
            return;
        }
        if (metadata === undefined) {
            metadata = null;
        }
        if (err) {
            if (!Object.prototype.hasOwnProperty.call(err, "metadata") && metadata) {
                err.metadata = metadata;
            }
            this.sendError(err);
            return;
        }
        try {
            const response = this.serializeMessage(value);
            this.write(response);
            this.sendStatus({
                code: constants_1.Status.OK,
                details: "OK",
                metadata
            });
        } catch (err) {
            this.sendError({
                details: (0, error_1.getErrorMessage)(err),
                code: constants_1.Status.INTERNAL
            });
        }
    }
    sendStatus(statusObj) {
        var _a, _b;
        this.emit("callEnd", statusObj.code);
        this.emit("streamEnd", statusObj.code === constants_1.Status.OK);
        if (this.checkCancelled()) {
            return;
        }
        trace("Request to method " + ((_a = this.handler) === null || _a === void 0 ? void 0 : _a.path) + " ended with status code: " + constants_1.Status[statusObj.code] + " details: " + statusObj.details);
        if (this.deadlineTimer) clearTimeout(this.deadlineTimer);
        if (this.stream.headersSent) {
            if (!this.wantTrailers) {
                this.wantTrailers = true;
                this.stream.once("wantTrailers", ()=>{
                    var _a;
                    const trailersToSend = Object.assign({
                        [GRPC_STATUS_HEADER]: statusObj.code,
                        [GRPC_MESSAGE_HEADER]: encodeURI(statusObj.details)
                    }, (_a = statusObj.metadata) === null || _a === void 0 ? void 0 : _a.toHttp2Headers());
                    this.stream.sendTrailers(trailersToSend);
                    this.statusSent = true;
                });
                this.stream.end();
            }
        } else {
            // Trailers-only response
            const trailersToSend = Object.assign(Object.assign({
                [GRPC_STATUS_HEADER]: statusObj.code,
                [GRPC_MESSAGE_HEADER]: encodeURI(statusObj.details)
            }, defaultResponseHeaders), (_b = statusObj.metadata) === null || _b === void 0 ? void 0 : _b.toHttp2Headers());
            this.stream.respond(trailersToSend, {
                endStream: true
            });
            this.statusSent = true;
        }
    }
    sendError(error) {
        const status = {
            code: constants_1.Status.UNKNOWN,
            details: "message" in error ? error.message : "Unknown Error",
            metadata: "metadata" in error && error.metadata !== undefined ? error.metadata : null
        };
        if ("code" in error && typeof error.code === "number" && Number.isInteger(error.code)) {
            status.code = error.code;
            if ("details" in error && typeof error.details === "string") {
                status.details = error.details;
            }
        }
        this.sendStatus(status);
    }
    write(chunk) {
        if (this.checkCancelled()) {
            return;
        }
        if (this.maxSendMessageSize !== -1 && chunk.length > this.maxSendMessageSize) {
            this.sendError({
                code: constants_1.Status.RESOURCE_EXHAUSTED,
                details: `Sent message larger than max (${chunk.length} vs. ${this.maxSendMessageSize})`
            });
            return;
        }
        this.sendMetadata();
        this.emit("sendMessage");
        return this.stream.write(chunk);
    }
    resume() {
        this.stream.resume();
    }
    setupSurfaceCall(call) {
        this.once("cancelled", (reason)=>{
            call.cancelled = true;
            call.emit("cancelled", reason);
        });
        this.once("callEnd", (status)=>call.emit("callEnd", status));
    }
    setupReadable(readable, encoding) {
        const decoder = new stream_decoder_1.StreamDecoder();
        let readsDone = false;
        let pendingMessageProcessing = false;
        let pushedEnd = false;
        const maybePushEnd = async ()=>{
            if (!pushedEnd && readsDone && !pendingMessageProcessing) {
                pushedEnd = true;
                await this.pushOrBufferMessage(readable, null);
            }
        };
        this.stream.on("data", async (data)=>{
            const messages = decoder.write(data);
            pendingMessageProcessing = true;
            this.stream.pause();
            for (const message of messages){
                if (this.maxReceiveMessageSize !== -1 && message.length > this.maxReceiveMessageSize) {
                    this.sendError({
                        code: constants_1.Status.RESOURCE_EXHAUSTED,
                        details: `Received message larger than max (${message.length} vs. ${this.maxReceiveMessageSize})`
                    });
                    return;
                }
                this.emit("receiveMessage");
                const compressed = message.readUInt8(0) === 1;
                const compressedMessageEncoding = compressed ? encoding : "identity";
                const decompressedMessage = await this.getDecompressedMessage(message, compressedMessageEncoding);
                // Encountered an error with decompression; it'll already have been propogated back
                // Just return early
                if (!decompressedMessage) return;
                await this.pushOrBufferMessage(readable, decompressedMessage);
            }
            pendingMessageProcessing = false;
            this.stream.resume();
            await maybePushEnd();
        });
        this.stream.once("end", async ()=>{
            readsDone = true;
            await maybePushEnd();
        });
    }
    consumeUnpushedMessages(readable) {
        this.canPush = true;
        while(this.messagesToPush.length > 0){
            const nextMessage = this.messagesToPush.shift();
            const canPush = readable.push(nextMessage);
            if (nextMessage === null || canPush === false) {
                this.canPush = false;
                break;
            }
        }
        return this.canPush;
    }
    async pushOrBufferMessage(readable, messageBytes) {
        if (this.isPushPending) {
            this.bufferedMessages.push(messageBytes);
        } else {
            await this.pushMessage(readable, messageBytes);
        }
    }
    async pushMessage(readable, messageBytes) {
        if (messageBytes === null) {
            trace("Received end of stream");
            if (this.canPush) {
                readable.push(null);
            } else {
                this.messagesToPush.push(null);
            }
            return;
        }
        trace("Received message of length " + messageBytes.length);
        this.isPushPending = true;
        try {
            const deserialized = await this.deserializeMessage(messageBytes);
            if (this.canPush) {
                if (!readable.push(deserialized)) {
                    this.canPush = false;
                    this.stream.pause();
                }
            } else {
                this.messagesToPush.push(deserialized);
            }
        } catch (error) {
            // Ignore any remaining messages when errors occur.
            this.bufferedMessages.length = 0;
            let code = (0, error_1.getErrorCode)(error);
            if (code === null || code < constants_1.Status.OK || code > constants_1.Status.UNAUTHENTICATED) {
                code = constants_1.Status.INTERNAL;
            }
            readable.emit("error", {
                details: (0, error_1.getErrorMessage)(error),
                code: code
            });
        }
        this.isPushPending = false;
        if (this.bufferedMessages.length > 0) {
            await this.pushMessage(readable, this.bufferedMessages.shift());
        }
    }
    getPeer() {
        const socket = this.stream.session.socket;
        if (socket.remoteAddress) {
            if (socket.remotePort) {
                return `${socket.remoteAddress}:${socket.remotePort}`;
            } else {
                return socket.remoteAddress;
            }
        } else {
            return "unknown";
        }
    }
    getDeadline() {
        return this.deadline;
    }
    getPath() {
        return this.handler.path;
    }
}
exports.Http2ServerCallStream = Http2ServerCallStream;
function handleExpiredDeadline(call) {
    const err = new Error("Deadline exceeded");
    err.code = constants_1.Status.DEADLINE_EXCEEDED;
    call.sendError(err);
    call.cancelled = true;
    call.emit("cancelled", "deadline");
} //# sourceMappingURL=server-call.js.map


/***/ }),

/***/ 62547:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.ServerCredentials = void 0;
const tls_helpers_1 = __webpack_require__(29883);
class ServerCredentials {
    static createInsecure() {
        return new InsecureServerCredentials();
    }
    static createSsl(rootCerts, keyCertPairs, checkClientCertificate = false) {
        if (rootCerts !== null && !Buffer.isBuffer(rootCerts)) {
            throw new TypeError("rootCerts must be null or a Buffer");
        }
        if (!Array.isArray(keyCertPairs)) {
            throw new TypeError("keyCertPairs must be an array");
        }
        if (typeof checkClientCertificate !== "boolean") {
            throw new TypeError("checkClientCertificate must be a boolean");
        }
        const cert = [];
        const key = [];
        for(let i = 0; i < keyCertPairs.length; i++){
            const pair = keyCertPairs[i];
            if (pair === null || typeof pair !== "object") {
                throw new TypeError(`keyCertPair[${i}] must be an object`);
            }
            if (!Buffer.isBuffer(pair.private_key)) {
                throw new TypeError(`keyCertPair[${i}].private_key must be a Buffer`);
            }
            if (!Buffer.isBuffer(pair.cert_chain)) {
                throw new TypeError(`keyCertPair[${i}].cert_chain must be a Buffer`);
            }
            cert.push(pair.cert_chain);
            key.push(pair.private_key);
        }
        return new SecureServerCredentials({
            ca: rootCerts || (0, tls_helpers_1.getDefaultRootsData)() || undefined,
            cert,
            key,
            requestCert: checkClientCertificate,
            ciphers: tls_helpers_1.CIPHER_SUITES
        });
    }
}
exports.ServerCredentials = ServerCredentials;
class InsecureServerCredentials extends ServerCredentials {
    _isSecure() {
        return false;
    }
    _getSettings() {
        return null;
    }
}
class SecureServerCredentials extends ServerCredentials {
    constructor(options){
        super();
        this.options = options;
    }
    _isSecure() {
        return true;
    }
    _getSettings() {
        return this.options;
    }
} //# sourceMappingURL=server-credentials.js.map


/***/ }),

/***/ 8375:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.Server = void 0;
const http2 = __webpack_require__(85158);
const constants_1 = __webpack_require__(60076);
const server_call_1 = __webpack_require__(50308);
const server_credentials_1 = __webpack_require__(62547);
const resolver_1 = __webpack_require__(71123);
const logging = __webpack_require__(67738);
const subchannel_address_1 = __webpack_require__(27631);
const uri_parser_1 = __webpack_require__(35193);
const channelz_1 = __webpack_require__(18949);
const error_1 = __webpack_require__(6134);
const UNLIMITED_CONNECTION_AGE_MS = ~(1 << 31);
const KEEPALIVE_MAX_TIME_MS = ~(1 << 31);
const KEEPALIVE_TIMEOUT_MS = 20000;
const { HTTP2_HEADER_PATH  } = http2.constants;
const TRACER_NAME = "server";
function noop() {}
function getUnimplementedStatusResponse(methodName) {
    return {
        code: constants_1.Status.UNIMPLEMENTED,
        details: `The server does not implement the method ${methodName}`
    };
}
function getDefaultHandler(handlerType, methodName) {
    const unimplementedStatusResponse = getUnimplementedStatusResponse(methodName);
    switch(handlerType){
        case "unary":
            return (call, callback)=>{
                callback(unimplementedStatusResponse, null);
            };
        case "clientStream":
            return (call, callback)=>{
                callback(unimplementedStatusResponse, null);
            };
        case "serverStream":
            return (call)=>{
                call.emit("error", unimplementedStatusResponse);
            };
        case "bidi":
            return (call)=>{
                call.emit("error", unimplementedStatusResponse);
            };
        default:
            throw new Error(`Invalid handlerType ${handlerType}`);
    }
}
class Server {
    constructor(options){
        var _a, _b, _c, _d;
        this.http2ServerList = [];
        this.handlers = new Map();
        this.sessions = new Map();
        this.started = false;
        this.serverAddressString = "null";
        // Channelz Info
        this.channelzEnabled = true;
        this.channelzTrace = new channelz_1.ChannelzTrace();
        this.callTracker = new channelz_1.ChannelzCallTracker();
        this.listenerChildrenTracker = new channelz_1.ChannelzChildrenTracker();
        this.sessionChildrenTracker = new channelz_1.ChannelzChildrenTracker();
        this.options = options !== null && options !== void 0 ? options : {};
        if (this.options["grpc.enable_channelz"] === 0) {
            this.channelzEnabled = false;
        }
        this.channelzRef = (0, channelz_1.registerChannelzServer)(()=>this.getChannelzInfo(), this.channelzEnabled);
        if (this.channelzEnabled) {
            this.channelzTrace.addTrace("CT_INFO", "Server created");
        }
        this.maxConnectionAgeMs = (_a = this.options["grpc.max_connection_age_ms"]) !== null && _a !== void 0 ? _a : UNLIMITED_CONNECTION_AGE_MS;
        this.maxConnectionAgeGraceMs = (_b = this.options["grpc.max_connection_age_grace_ms"]) !== null && _b !== void 0 ? _b : UNLIMITED_CONNECTION_AGE_MS;
        this.keepaliveTimeMs = (_c = this.options["grpc.keepalive_time_ms"]) !== null && _c !== void 0 ? _c : KEEPALIVE_MAX_TIME_MS;
        this.keepaliveTimeoutMs = (_d = this.options["grpc.keepalive_timeout_ms"]) !== null && _d !== void 0 ? _d : KEEPALIVE_TIMEOUT_MS;
        this.trace("Server constructed");
    }
    getChannelzInfo() {
        return {
            trace: this.channelzTrace,
            callTracker: this.callTracker,
            listenerChildren: this.listenerChildrenTracker.getChildLists(),
            sessionChildren: this.sessionChildrenTracker.getChildLists()
        };
    }
    getChannelzSessionInfoGetter(session) {
        return ()=>{
            var _a, _b, _c;
            const sessionInfo = this.sessions.get(session);
            const sessionSocket = session.socket;
            const remoteAddress = sessionSocket.remoteAddress ? (0, subchannel_address_1.stringToSubchannelAddress)(sessionSocket.remoteAddress, sessionSocket.remotePort) : null;
            const localAddress = sessionSocket.localAddress ? (0, subchannel_address_1.stringToSubchannelAddress)(sessionSocket.localAddress, sessionSocket.localPort) : null;
            let tlsInfo;
            if (session.encrypted) {
                const tlsSocket = sessionSocket;
                const cipherInfo = tlsSocket.getCipher();
                const certificate = tlsSocket.getCertificate();
                const peerCertificate = tlsSocket.getPeerCertificate();
                tlsInfo = {
                    cipherSuiteStandardName: (_a = cipherInfo.standardName) !== null && _a !== void 0 ? _a : null,
                    cipherSuiteOtherName: cipherInfo.standardName ? null : cipherInfo.name,
                    localCertificate: certificate && "raw" in certificate ? certificate.raw : null,
                    remoteCertificate: peerCertificate && "raw" in peerCertificate ? peerCertificate.raw : null
                };
            } else {
                tlsInfo = null;
            }
            const socketInfo = {
                remoteAddress: remoteAddress,
                localAddress: localAddress,
                security: tlsInfo,
                remoteName: null,
                streamsStarted: sessionInfo.streamTracker.callsStarted,
                streamsSucceeded: sessionInfo.streamTracker.callsSucceeded,
                streamsFailed: sessionInfo.streamTracker.callsFailed,
                messagesSent: sessionInfo.messagesSent,
                messagesReceived: sessionInfo.messagesReceived,
                keepAlivesSent: 0,
                lastLocalStreamCreatedTimestamp: null,
                lastRemoteStreamCreatedTimestamp: sessionInfo.streamTracker.lastCallStartedTimestamp,
                lastMessageSentTimestamp: sessionInfo.lastMessageSentTimestamp,
                lastMessageReceivedTimestamp: sessionInfo.lastMessageReceivedTimestamp,
                localFlowControlWindow: (_b = session.state.localWindowSize) !== null && _b !== void 0 ? _b : null,
                remoteFlowControlWindow: (_c = session.state.remoteWindowSize) !== null && _c !== void 0 ? _c : null
            };
            return socketInfo;
        };
    }
    trace(text) {
        logging.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, "(" + this.channelzRef.id + ") " + text);
    }
    addProtoService() {
        throw new Error("Not implemented. Use addService() instead");
    }
    addService(service, implementation) {
        if (service === null || typeof service !== "object" || implementation === null || typeof implementation !== "object") {
            throw new Error("addService() requires two objects as arguments");
        }
        const serviceKeys = Object.keys(service);
        if (serviceKeys.length === 0) {
            throw new Error("Cannot add an empty service to a server");
        }
        serviceKeys.forEach((name)=>{
            const attrs = service[name];
            let methodType;
            if (attrs.requestStream) {
                if (attrs.responseStream) {
                    methodType = "bidi";
                } else {
                    methodType = "clientStream";
                }
            } else {
                if (attrs.responseStream) {
                    methodType = "serverStream";
                } else {
                    methodType = "unary";
                }
            }
            let implFn = implementation[name];
            let impl;
            if (implFn === undefined && typeof attrs.originalName === "string") {
                implFn = implementation[attrs.originalName];
            }
            if (implFn !== undefined) {
                impl = implFn.bind(implementation);
            } else {
                impl = getDefaultHandler(methodType, name);
            }
            const success = this.register(attrs.path, impl, attrs.responseSerialize, attrs.requestDeserialize, methodType);
            if (success === false) {
                throw new Error(`Method handler for ${attrs.path} already provided.`);
            }
        });
    }
    removeService(service) {
        if (service === null || typeof service !== "object") {
            throw new Error("removeService() requires object as argument");
        }
        const serviceKeys = Object.keys(service);
        serviceKeys.forEach((name)=>{
            const attrs = service[name];
            this.unregister(attrs.path);
        });
    }
    bind(port, creds) {
        throw new Error("Not implemented. Use bindAsync() instead");
    }
    bindAsync(port, creds, callback) {
        if (this.started === true) {
            throw new Error("server is already started");
        }
        if (typeof port !== "string") {
            throw new TypeError("port must be a string");
        }
        if (creds === null || !(creds instanceof server_credentials_1.ServerCredentials)) {
            throw new TypeError("creds must be a ServerCredentials object");
        }
        if (typeof callback !== "function") {
            throw new TypeError("callback must be a function");
        }
        const initialPortUri = (0, uri_parser_1.parseUri)(port);
        if (initialPortUri === null) {
            throw new Error(`Could not parse port "${port}"`);
        }
        const portUri = (0, resolver_1.mapUriDefaultScheme)(initialPortUri);
        if (portUri === null) {
            throw new Error(`Could not get a default scheme for port "${port}"`);
        }
        const serverOptions = {
            maxSendHeaderBlockLength: Number.MAX_SAFE_INTEGER
        };
        if ("grpc-node.max_session_memory" in this.options) {
            serverOptions.maxSessionMemory = this.options["grpc-node.max_session_memory"];
        } else {
            /* By default, set a very large max session memory limit, to effectively
             * disable enforcement of the limit. Some testing indicates that Node's
             * behavior degrades badly when this limit is reached, so we solve that
             * by disabling the check entirely. */ serverOptions.maxSessionMemory = Number.MAX_SAFE_INTEGER;
        }
        if ("grpc.max_concurrent_streams" in this.options) {
            serverOptions.settings = {
                maxConcurrentStreams: this.options["grpc.max_concurrent_streams"]
            };
        }
        const deferredCallback = (error, port)=>{
            process.nextTick(()=>callback(error, port));
        };
        const setupServer = ()=>{
            let http2Server;
            if (creds._isSecure()) {
                const secureServerOptions = Object.assign(serverOptions, creds._getSettings());
                http2Server = http2.createSecureServer(secureServerOptions);
                http2Server.on("secureConnection", (socket)=>{
                    /* These errors need to be handled by the user of Http2SecureServer,
                     * according to https://github.com/nodejs/node/issues/35824 */ socket.on("error", (e)=>{
                        this.trace("An incoming TLS connection closed with error: " + e.message);
                    });
                });
            } else {
                http2Server = http2.createServer(serverOptions);
            }
            http2Server.setTimeout(0, noop);
            this._setupHandlers(http2Server);
            return http2Server;
        };
        const bindSpecificPort = (addressList, portNum, previousCount)=>{
            if (addressList.length === 0) {
                return Promise.resolve({
                    port: portNum,
                    count: previousCount
                });
            }
            return Promise.all(addressList.map((address)=>{
                this.trace("Attempting to bind " + (0, subchannel_address_1.subchannelAddressToString)(address));
                let addr;
                if ((0, subchannel_address_1.isTcpSubchannelAddress)(address)) {
                    addr = {
                        host: address.host,
                        port: portNum
                    };
                } else {
                    addr = address;
                }
                const http2Server = setupServer();
                return new Promise((resolve, reject)=>{
                    const onError = (err)=>{
                        this.trace("Failed to bind " + (0, subchannel_address_1.subchannelAddressToString)(address) + " with error " + err.message);
                        resolve(err);
                    };
                    http2Server.once("error", onError);
                    http2Server.listen(addr, ()=>{
                        const boundAddress = http2Server.address();
                        let boundSubchannelAddress;
                        if (typeof boundAddress === "string") {
                            boundSubchannelAddress = {
                                path: boundAddress
                            };
                        } else {
                            boundSubchannelAddress = {
                                host: boundAddress.address,
                                port: boundAddress.port
                            };
                        }
                        let channelzRef;
                        channelzRef = (0, channelz_1.registerChannelzSocket)((0, subchannel_address_1.subchannelAddressToString)(boundSubchannelAddress), ()=>{
                            return {
                                localAddress: boundSubchannelAddress,
                                remoteAddress: null,
                                security: null,
                                remoteName: null,
                                streamsStarted: 0,
                                streamsSucceeded: 0,
                                streamsFailed: 0,
                                messagesSent: 0,
                                messagesReceived: 0,
                                keepAlivesSent: 0,
                                lastLocalStreamCreatedTimestamp: null,
                                lastRemoteStreamCreatedTimestamp: null,
                                lastMessageSentTimestamp: null,
                                lastMessageReceivedTimestamp: null,
                                localFlowControlWindow: null,
                                remoteFlowControlWindow: null
                            };
                        }, this.channelzEnabled);
                        if (this.channelzEnabled) {
                            this.listenerChildrenTracker.refChild(channelzRef);
                        }
                        this.http2ServerList.push({
                            server: http2Server,
                            channelzRef: channelzRef
                        });
                        this.trace("Successfully bound " + (0, subchannel_address_1.subchannelAddressToString)(boundSubchannelAddress));
                        resolve("port" in boundSubchannelAddress ? boundSubchannelAddress.port : portNum);
                        http2Server.removeListener("error", onError);
                    });
                });
            })).then((results)=>{
                let count = 0;
                for (const result of results){
                    if (typeof result === "number") {
                        count += 1;
                        if (result !== portNum) {
                            throw new Error("Invalid state: multiple port numbers added from single address");
                        }
                    }
                }
                return {
                    port: portNum,
                    count: count + previousCount
                };
            });
        };
        const bindWildcardPort = (addressList)=>{
            if (addressList.length === 0) {
                return Promise.resolve({
                    port: 0,
                    count: 0
                });
            }
            const address = addressList[0];
            const http2Server = setupServer();
            return new Promise((resolve, reject)=>{
                const onError = (err)=>{
                    this.trace("Failed to bind " + (0, subchannel_address_1.subchannelAddressToString)(address) + " with error " + err.message);
                    resolve(bindWildcardPort(addressList.slice(1)));
                };
                http2Server.once("error", onError);
                http2Server.listen(address, ()=>{
                    const boundAddress = http2Server.address();
                    const boundSubchannelAddress = {
                        host: boundAddress.address,
                        port: boundAddress.port
                    };
                    let channelzRef;
                    channelzRef = (0, channelz_1.registerChannelzSocket)((0, subchannel_address_1.subchannelAddressToString)(boundSubchannelAddress), ()=>{
                        return {
                            localAddress: boundSubchannelAddress,
                            remoteAddress: null,
                            security: null,
                            remoteName: null,
                            streamsStarted: 0,
                            streamsSucceeded: 0,
                            streamsFailed: 0,
                            messagesSent: 0,
                            messagesReceived: 0,
                            keepAlivesSent: 0,
                            lastLocalStreamCreatedTimestamp: null,
                            lastRemoteStreamCreatedTimestamp: null,
                            lastMessageSentTimestamp: null,
                            lastMessageReceivedTimestamp: null,
                            localFlowControlWindow: null,
                            remoteFlowControlWindow: null
                        };
                    }, this.channelzEnabled);
                    if (this.channelzEnabled) {
                        this.listenerChildrenTracker.refChild(channelzRef);
                    }
                    this.http2ServerList.push({
                        server: http2Server,
                        channelzRef: channelzRef
                    });
                    this.trace("Successfully bound " + (0, subchannel_address_1.subchannelAddressToString)(boundSubchannelAddress));
                    resolve(bindSpecificPort(addressList.slice(1), boundAddress.port, 1));
                    http2Server.removeListener("error", onError);
                });
            });
        };
        const resolverListener = {
            onSuccessfulResolution: (addressList, serviceConfig, serviceConfigError)=>{
                // We only want one resolution result. Discard all future results
                resolverListener.onSuccessfulResolution = ()=>{};
                if (addressList.length === 0) {
                    deferredCallback(new Error(`No addresses resolved for port ${port}`), 0);
                    return;
                }
                let bindResultPromise;
                if ((0, subchannel_address_1.isTcpSubchannelAddress)(addressList[0])) {
                    if (addressList[0].port === 0) {
                        bindResultPromise = bindWildcardPort(addressList);
                    } else {
                        bindResultPromise = bindSpecificPort(addressList, addressList[0].port, 0);
                    }
                } else {
                    // Use an arbitrary non-zero port for non-TCP addresses
                    bindResultPromise = bindSpecificPort(addressList, 1, 0);
                }
                bindResultPromise.then((bindResult)=>{
                    if (bindResult.count === 0) {
                        const errorString = `No address added out of total ${addressList.length} resolved`;
                        logging.log(constants_1.LogVerbosity.ERROR, errorString);
                        deferredCallback(new Error(errorString), 0);
                    } else {
                        if (bindResult.count < addressList.length) {
                            logging.log(constants_1.LogVerbosity.INFO, `WARNING Only ${bindResult.count} addresses added out of total ${addressList.length} resolved`);
                        }
                        deferredCallback(null, bindResult.port);
                    }
                }, (error)=>{
                    const errorString = `No address added out of total ${addressList.length} resolved`;
                    logging.log(constants_1.LogVerbosity.ERROR, errorString);
                    deferredCallback(new Error(errorString), 0);
                });
            },
            onError: (error)=>{
                deferredCallback(new Error(error.details), 0);
            }
        };
        const resolver = (0, resolver_1.createResolver)(portUri, resolverListener, this.options);
        resolver.updateResolution();
    }
    forceShutdown() {
        // Close the server if it is still running.
        for (const { server: http2Server , channelzRef: ref  } of this.http2ServerList){
            if (http2Server.listening) {
                http2Server.close(()=>{
                    if (this.channelzEnabled) {
                        this.listenerChildrenTracker.unrefChild(ref);
                        (0, channelz_1.unregisterChannelzRef)(ref);
                    }
                });
            }
        }
        this.started = false;
        // Always destroy any available sessions. It's possible that one or more
        // tryShutdown() calls are in progress. Don't wait on them to finish.
        this.sessions.forEach((channelzInfo, session)=>{
            // Cast NGHTTP2_CANCEL to any because TypeScript doesn't seem to
            // recognize destroy(code) as a valid signature.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            session.destroy(http2.constants.NGHTTP2_CANCEL);
        });
        this.sessions.clear();
        if (this.channelzEnabled) {
            (0, channelz_1.unregisterChannelzRef)(this.channelzRef);
        }
    }
    register(name, handler, serialize, deserialize, type) {
        if (this.handlers.has(name)) {
            return false;
        }
        this.handlers.set(name, {
            func: handler,
            serialize,
            deserialize,
            type,
            path: name
        });
        return true;
    }
    unregister(name) {
        return this.handlers.delete(name);
    }
    start() {
        if (this.http2ServerList.length === 0 || this.http2ServerList.every(({ server: http2Server  })=>http2Server.listening !== true)) {
            throw new Error("server must be bound in order to start");
        }
        if (this.started === true) {
            throw new Error("server is already started");
        }
        if (this.channelzEnabled) {
            this.channelzTrace.addTrace("CT_INFO", "Starting");
        }
        this.started = true;
    }
    tryShutdown(callback) {
        const wrappedCallback = (error)=>{
            if (this.channelzEnabled) {
                (0, channelz_1.unregisterChannelzRef)(this.channelzRef);
            }
            callback(error);
        };
        let pendingChecks = 0;
        function maybeCallback() {
            pendingChecks--;
            if (pendingChecks === 0) {
                wrappedCallback();
            }
        }
        // Close the server if necessary.
        this.started = false;
        for (const { server: http2Server , channelzRef: ref  } of this.http2ServerList){
            if (http2Server.listening) {
                pendingChecks++;
                http2Server.close(()=>{
                    if (this.channelzEnabled) {
                        this.listenerChildrenTracker.unrefChild(ref);
                        (0, channelz_1.unregisterChannelzRef)(ref);
                    }
                    maybeCallback();
                });
            }
        }
        this.sessions.forEach((channelzInfo, session)=>{
            if (!session.closed) {
                pendingChecks += 1;
                session.close(maybeCallback);
            }
        });
        if (pendingChecks === 0) {
            wrappedCallback();
        }
    }
    addHttp2Port() {
        throw new Error("Not yet implemented");
    }
    /**
     * Get the channelz reference object for this server. The returned value is
     * garbage if channelz is disabled for this server.
     * @returns
     */ getChannelzRef() {
        return this.channelzRef;
    }
    _verifyContentType(stream, headers) {
        const contentType = headers[http2.constants.HTTP2_HEADER_CONTENT_TYPE];
        if (typeof contentType !== "string" || !contentType.startsWith("application/grpc")) {
            stream.respond({
                [http2.constants.HTTP2_HEADER_STATUS]: http2.constants.HTTP_STATUS_UNSUPPORTED_MEDIA_TYPE
            }, {
                endStream: true
            });
            return false;
        }
        return true;
    }
    _retrieveHandler(headers) {
        const path = headers[HTTP2_HEADER_PATH];
        this.trace("Received call to method " + path + " at address " + this.serverAddressString);
        const handler = this.handlers.get(path);
        if (handler === undefined) {
            this.trace("No handler registered for method " + path + ". Sending UNIMPLEMENTED status.");
            throw getUnimplementedStatusResponse(path);
        }
        return handler;
    }
    _respondWithError(err, stream, channelzSessionInfo = null) {
        const call = new server_call_1.Http2ServerCallStream(stream, null, this.options);
        if (err.code === undefined) {
            err.code = constants_1.Status.INTERNAL;
        }
        if (this.channelzEnabled) {
            this.callTracker.addCallFailed();
            channelzSessionInfo === null || channelzSessionInfo === void 0 ? void 0 : channelzSessionInfo.streamTracker.addCallFailed();
        }
        call.sendError(err);
    }
    _channelzHandler(stream, headers) {
        var _a;
        const channelzSessionInfo = this.sessions.get(stream.session);
        this.callTracker.addCallStarted();
        channelzSessionInfo === null || channelzSessionInfo === void 0 ? void 0 : channelzSessionInfo.streamTracker.addCallStarted();
        if (!this._verifyContentType(stream, headers)) {
            this.callTracker.addCallFailed();
            channelzSessionInfo === null || channelzSessionInfo === void 0 ? void 0 : channelzSessionInfo.streamTracker.addCallFailed();
            return;
        }
        let handler;
        try {
            handler = this._retrieveHandler(headers);
        } catch (err) {
            this._respondWithError({
                details: (0, error_1.getErrorMessage)(err),
                code: (_a = (0, error_1.getErrorCode)(err)) !== null && _a !== void 0 ? _a : undefined
            }, stream, channelzSessionInfo);
            return;
        }
        const call = new server_call_1.Http2ServerCallStream(stream, handler, this.options);
        call.once("callEnd", (code)=>{
            if (code === constants_1.Status.OK) {
                this.callTracker.addCallSucceeded();
            } else {
                this.callTracker.addCallFailed();
            }
        });
        if (channelzSessionInfo) {
            call.once("streamEnd", (success)=>{
                if (success) {
                    channelzSessionInfo.streamTracker.addCallSucceeded();
                } else {
                    channelzSessionInfo.streamTracker.addCallFailed();
                }
            });
            call.on("sendMessage", ()=>{
                channelzSessionInfo.messagesSent += 1;
                channelzSessionInfo.lastMessageSentTimestamp = new Date();
            });
            call.on("receiveMessage", ()=>{
                channelzSessionInfo.messagesReceived += 1;
                channelzSessionInfo.lastMessageReceivedTimestamp = new Date();
            });
        }
        if (!this._runHandlerForCall(call, handler, headers)) {
            this.callTracker.addCallFailed();
            channelzSessionInfo === null || channelzSessionInfo === void 0 ? void 0 : channelzSessionInfo.streamTracker.addCallFailed();
            call.sendError({
                code: constants_1.Status.INTERNAL,
                details: `Unknown handler type: ${handler.type}`
            });
        }
    }
    _streamHandler(stream, headers) {
        var _a;
        if (this._verifyContentType(stream, headers) !== true) {
            return;
        }
        let handler;
        try {
            handler = this._retrieveHandler(headers);
        } catch (err) {
            this._respondWithError({
                details: (0, error_1.getErrorMessage)(err),
                code: (_a = (0, error_1.getErrorCode)(err)) !== null && _a !== void 0 ? _a : undefined
            }, stream, null);
            return;
        }
        const call = new server_call_1.Http2ServerCallStream(stream, handler, this.options);
        if (!this._runHandlerForCall(call, handler, headers)) {
            call.sendError({
                code: constants_1.Status.INTERNAL,
                details: `Unknown handler type: ${handler.type}`
            });
        }
    }
    _runHandlerForCall(call, handler, headers) {
        var _a;
        const metadata = call.receiveMetadata(headers);
        const encoding = (_a = metadata.get("grpc-encoding")[0]) !== null && _a !== void 0 ? _a : "identity";
        metadata.remove("grpc-encoding");
        const { type  } = handler;
        if (type === "unary") {
            handleUnary(call, handler, metadata, encoding);
        } else if (type === "clientStream") {
            handleClientStreaming(call, handler, metadata, encoding);
        } else if (type === "serverStream") {
            handleServerStreaming(call, handler, metadata, encoding);
        } else if (type === "bidi") {
            handleBidiStreaming(call, handler, metadata, encoding);
        } else {
            return false;
        }
        return true;
    }
    _setupHandlers(http2Server) {
        if (http2Server === null) {
            return;
        }
        const serverAddress = http2Server.address();
        let serverAddressString = "null";
        if (serverAddress) {
            if (typeof serverAddress === "string") {
                serverAddressString = serverAddress;
            } else {
                serverAddressString = serverAddress.address + ":" + serverAddress.port;
            }
        }
        this.serverAddressString = serverAddressString;
        const handler = this.channelzEnabled ? this._channelzHandler : this._streamHandler;
        http2Server.on("stream", handler.bind(this));
        http2Server.on("session", (session)=>{
            var _a, _b, _c, _d, _e;
            if (!this.started) {
                session.destroy();
                return;
            }
            let channelzRef;
            channelzRef = (0, channelz_1.registerChannelzSocket)((_a = session.socket.remoteAddress) !== null && _a !== void 0 ? _a : "unknown", this.getChannelzSessionInfoGetter(session), this.channelzEnabled);
            const channelzSessionInfo = {
                ref: channelzRef,
                streamTracker: new channelz_1.ChannelzCallTracker(),
                messagesSent: 0,
                messagesReceived: 0,
                lastMessageSentTimestamp: null,
                lastMessageReceivedTimestamp: null
            };
            this.sessions.set(session, channelzSessionInfo);
            const clientAddress = session.socket.remoteAddress;
            if (this.channelzEnabled) {
                this.channelzTrace.addTrace("CT_INFO", "Connection established by client " + clientAddress);
                this.sessionChildrenTracker.refChild(channelzRef);
            }
            let connectionAgeTimer = null;
            let connectionAgeGraceTimer = null;
            let sessionClosedByServer = false;
            if (this.maxConnectionAgeMs !== UNLIMITED_CONNECTION_AGE_MS) {
                // Apply a random jitter within a +/-10% range
                const jitterMagnitude = this.maxConnectionAgeMs / 10;
                const jitter = Math.random() * jitterMagnitude * 2 - jitterMagnitude;
                connectionAgeTimer = (_c = (_b = setTimeout(()=>{
                    var _a, _b;
                    sessionClosedByServer = true;
                    if (this.channelzEnabled) {
                        this.channelzTrace.addTrace("CT_INFO", "Connection dropped by max connection age from " + clientAddress);
                    }
                    try {
                        session.goaway(http2.constants.NGHTTP2_NO_ERROR, ~(1 << 31), Buffer.from("max_age"));
                    } catch (e) {
                        // The goaway can't be sent because the session is already closed
                        session.destroy();
                        return;
                    }
                    session.close();
                    /* Allow a grace period after sending the GOAWAY before forcibly
                     * closing the connection. */ if (this.maxConnectionAgeGraceMs !== UNLIMITED_CONNECTION_AGE_MS) {
                        connectionAgeGraceTimer = (_b = (_a = setTimeout(()=>{
                            session.destroy();
                        }, this.maxConnectionAgeGraceMs)).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
                    }
                }, this.maxConnectionAgeMs + jitter)).unref) === null || _c === void 0 ? void 0 : _c.call(_b);
            }
            const keeapliveTimeTimer = (_e = (_d = setInterval(()=>{
                var _a, _b;
                const timeoutTImer = (_b = (_a = setTimeout(()=>{
                    sessionClosedByServer = true;
                    if (this.channelzEnabled) {
                        this.channelzTrace.addTrace("CT_INFO", "Connection dropped by keepalive timeout from " + clientAddress);
                    }
                    session.close();
                }, this.keepaliveTimeoutMs)).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
                try {
                    session.ping((err, duration, payload)=>{
                        clearTimeout(timeoutTImer);
                    });
                } catch (e) {
                    // The ping can't be sent because the session is already closed
                    session.destroy();
                }
            }, this.keepaliveTimeMs)).unref) === null || _e === void 0 ? void 0 : _e.call(_d);
            session.on("close", ()=>{
                if (this.channelzEnabled) {
                    if (!sessionClosedByServer) {
                        this.channelzTrace.addTrace("CT_INFO", "Connection dropped by client " + clientAddress);
                    }
                    this.sessionChildrenTracker.unrefChild(channelzRef);
                    (0, channelz_1.unregisterChannelzRef)(channelzRef);
                }
                if (connectionAgeTimer) {
                    clearTimeout(connectionAgeTimer);
                }
                if (connectionAgeGraceTimer) {
                    clearTimeout(connectionAgeGraceTimer);
                }
                if (keeapliveTimeTimer) {
                    clearTimeout(keeapliveTimeTimer);
                }
                this.sessions.delete(session);
            });
        });
    }
}
exports.Server = Server;
function handleUnary(call, handler, metadata, encoding) {
    call.receiveUnaryMessage(encoding, (err, request)=>{
        if (err) {
            call.sendError(err);
            return;
        }
        if (request === undefined || call.cancelled) {
            return;
        }
        const emitter = new server_call_1.ServerUnaryCallImpl(call, metadata, request);
        handler.func(emitter, (err, value, trailer, flags)=>{
            call.sendUnaryMessage(err, value, trailer, flags);
        });
    });
}
function handleClientStreaming(call, handler, metadata, encoding) {
    const stream = new server_call_1.ServerReadableStreamImpl(call, metadata, handler.deserialize, encoding);
    function respond(err, value, trailer, flags) {
        stream.destroy();
        call.sendUnaryMessage(err, value, trailer, flags);
    }
    if (call.cancelled) {
        return;
    }
    stream.on("error", respond);
    handler.func(stream, respond);
}
function handleServerStreaming(call, handler, metadata, encoding) {
    call.receiveUnaryMessage(encoding, (err, request)=>{
        if (err) {
            call.sendError(err);
            return;
        }
        if (request === undefined || call.cancelled) {
            return;
        }
        const stream = new server_call_1.ServerWritableStreamImpl(call, metadata, handler.serialize, request);
        handler.func(stream);
    });
}
function handleBidiStreaming(call, handler, metadata, encoding) {
    const stream = new server_call_1.ServerDuplexStreamImpl(call, metadata, handler.serialize, handler.deserialize, encoding);
    if (call.cancelled) {
        return;
    }
    handler.func(stream);
} //# sourceMappingURL=server.js.map


/***/ }),

/***/ 43034:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.extractAndSelectServiceConfig = exports.validateServiceConfig = exports.validateRetryThrottling = void 0;
/* This file implements gRFC A2 and the service config spec:
 * https://github.com/grpc/proposal/blob/master/A2-service-configs-in-dns.md
 * https://github.com/grpc/grpc/blob/master/doc/service_config.md. Each
 * function here takes an object with unknown structure and returns its
 * specific object type if the input has the right structure, and throws an
 * error otherwise. */ /* The any type is purposely used here. All functions validate their input at
 * runtime */ /* eslint-disable @typescript-eslint/no-explicit-any */ const os = __webpack_require__(22037);
const constants_1 = __webpack_require__(60076);
const load_balancer_1 = __webpack_require__(64189);
/**
 * Recognizes a number with up to 9 digits after the decimal point, followed by
 * an "s", representing a number of seconds.
 */ const DURATION_REGEX = /^\d+(\.\d{1,9})?s$/;
/**
 * Client language name used for determining whether this client matches a
 * `ServiceConfigCanaryConfig`'s `clientLanguage` list.
 */ const CLIENT_LANGUAGE_STRING = "node";
function validateName(obj) {
    if (!("service" in obj) || typeof obj.service !== "string") {
        throw new Error("Invalid method config name: invalid service");
    }
    const result = {
        service: obj.service
    };
    if ("method" in obj) {
        if (typeof obj.method === "string") {
            result.method = obj.method;
        } else {
            throw new Error("Invalid method config name: invalid method");
        }
    }
    return result;
}
function validateRetryPolicy(obj) {
    if (!("maxAttempts" in obj) || !Number.isInteger(obj.maxAttempts) || obj.maxAttempts < 2) {
        throw new Error("Invalid method config retry policy: maxAttempts must be an integer at least 2");
    }
    if (!("initialBackoff" in obj) || typeof obj.initialBackoff !== "string" || !DURATION_REGEX.test(obj.initialBackoff)) {
        throw new Error("Invalid method config retry policy: initialBackoff must be a string consisting of a positive integer followed by s");
    }
    if (!("maxBackoff" in obj) || typeof obj.maxBackoff !== "string" || !DURATION_REGEX.test(obj.maxBackoff)) {
        throw new Error("Invalid method config retry policy: maxBackoff must be a string consisting of a positive integer followed by s");
    }
    if (!("backoffMultiplier" in obj) || typeof obj.backoffMultiplier !== "number" || obj.backoffMultiplier <= 0) {
        throw new Error("Invalid method config retry policy: backoffMultiplier must be a number greater than 0");
    }
    if (!("retryableStatusCodes" in obj && Array.isArray(obj.retryableStatusCodes))) {
        throw new Error("Invalid method config retry policy: retryableStatusCodes is required");
    }
    if (obj.retryableStatusCodes.length === 0) {
        throw new Error("Invalid method config retry policy: retryableStatusCodes must be non-empty");
    }
    for (const value of obj.retryableStatusCodes){
        if (typeof value === "number") {
            if (!Object.values(constants_1.Status).includes(value)) {
                throw new Error("Invalid method config retry policy: retryableStatusCodes value not in status code range");
            }
        } else if (typeof value === "string") {
            if (!Object.values(constants_1.Status).includes(value.toUpperCase())) {
                throw new Error("Invalid method config retry policy: retryableStatusCodes value not a status code name");
            }
        } else {
            throw new Error("Invalid method config retry policy: retryableStatusCodes value must be a string or number");
        }
    }
    return {
        maxAttempts: obj.maxAttempts,
        initialBackoff: obj.initialBackoff,
        maxBackoff: obj.maxBackoff,
        backoffMultiplier: obj.backoffMultiplier,
        retryableStatusCodes: obj.retryableStatusCodes
    };
}
function validateHedgingPolicy(obj) {
    if (!("maxAttempts" in obj) || !Number.isInteger(obj.maxAttempts) || obj.maxAttempts < 2) {
        throw new Error("Invalid method config hedging policy: maxAttempts must be an integer at least 2");
    }
    if ("hedgingDelay" in obj && (typeof obj.hedgingDelay !== "string" || !DURATION_REGEX.test(obj.hedgingDelay))) {
        throw new Error("Invalid method config hedging policy: hedgingDelay must be a string consisting of a positive integer followed by s");
    }
    if ("nonFatalStatusCodes" in obj && Array.isArray(obj.nonFatalStatusCodes)) {
        for (const value of obj.nonFatalStatusCodes){
            if (typeof value === "number") {
                if (!Object.values(constants_1.Status).includes(value)) {
                    throw new Error("Invlid method config hedging policy: nonFatalStatusCodes value not in status code range");
                }
            } else if (typeof value === "string") {
                if (!Object.values(constants_1.Status).includes(value.toUpperCase())) {
                    throw new Error("Invlid method config hedging policy: nonFatalStatusCodes value not a status code name");
                }
            } else {
                throw new Error("Invlid method config hedging policy: nonFatalStatusCodes value must be a string or number");
            }
        }
    }
    const result = {
        maxAttempts: obj.maxAttempts
    };
    if (obj.hedgingDelay) {
        result.hedgingDelay = obj.hedgingDelay;
    }
    if (obj.nonFatalStatusCodes) {
        result.nonFatalStatusCodes = obj.nonFatalStatusCodes;
    }
    return result;
}
function validateMethodConfig(obj) {
    var _a;
    const result = {
        name: []
    };
    if (!("name" in obj) || !Array.isArray(obj.name)) {
        throw new Error("Invalid method config: invalid name array");
    }
    for (const name of obj.name){
        result.name.push(validateName(name));
    }
    if ("waitForReady" in obj) {
        if (typeof obj.waitForReady !== "boolean") {
            throw new Error("Invalid method config: invalid waitForReady");
        }
        result.waitForReady = obj.waitForReady;
    }
    if ("timeout" in obj) {
        if (typeof obj.timeout === "object") {
            if (!("seconds" in obj.timeout) || !(typeof obj.timeout.seconds === "number")) {
                throw new Error("Invalid method config: invalid timeout.seconds");
            }
            if (!("nanos" in obj.timeout) || !(typeof obj.timeout.nanos === "number")) {
                throw new Error("Invalid method config: invalid timeout.nanos");
            }
            result.timeout = obj.timeout;
        } else if (typeof obj.timeout === "string" && DURATION_REGEX.test(obj.timeout)) {
            const timeoutParts = obj.timeout.substring(0, obj.timeout.length - 1).split(".");
            result.timeout = {
                seconds: timeoutParts[0] | 0,
                nanos: ((_a = timeoutParts[1]) !== null && _a !== void 0 ? _a : 0) | 0
            };
        } else {
            throw new Error("Invalid method config: invalid timeout");
        }
    }
    if ("maxRequestBytes" in obj) {
        if (typeof obj.maxRequestBytes !== "number") {
            throw new Error("Invalid method config: invalid maxRequestBytes");
        }
        result.maxRequestBytes = obj.maxRequestBytes;
    }
    if ("maxResponseBytes" in obj) {
        if (typeof obj.maxResponseBytes !== "number") {
            throw new Error("Invalid method config: invalid maxRequestBytes");
        }
        result.maxResponseBytes = obj.maxResponseBytes;
    }
    if ("retryPolicy" in obj) {
        if ("hedgingPolicy" in obj) {
            throw new Error("Invalid method config: retryPolicy and hedgingPolicy cannot both be specified");
        } else {
            result.retryPolicy = validateRetryPolicy(obj.retryPolicy);
        }
    } else if ("hedgingPolicy" in obj) {
        result.hedgingPolicy = validateHedgingPolicy(obj.hedgingPolicy);
    }
    return result;
}
function validateRetryThrottling(obj) {
    if (!("maxTokens" in obj) || typeof obj.maxTokens !== "number" || obj.maxTokens <= 0 || obj.maxTokens > 1000) {
        throw new Error("Invalid retryThrottling: maxTokens must be a number in (0, 1000]");
    }
    if (!("tokenRatio" in obj) || typeof obj.tokenRatio !== "number" || obj.tokenRatio <= 0) {
        throw new Error("Invalid retryThrottling: tokenRatio must be a number greater than 0");
    }
    return {
        maxTokens: +obj.maxTokens.toFixed(3),
        tokenRatio: +obj.tokenRatio.toFixed(3)
    };
}
exports.validateRetryThrottling = validateRetryThrottling;
function validateServiceConfig(obj) {
    const result = {
        loadBalancingConfig: [],
        methodConfig: []
    };
    if ("loadBalancingPolicy" in obj) {
        if (typeof obj.loadBalancingPolicy === "string") {
            result.loadBalancingPolicy = obj.loadBalancingPolicy;
        } else {
            throw new Error("Invalid service config: invalid loadBalancingPolicy");
        }
    }
    if ("loadBalancingConfig" in obj) {
        if (Array.isArray(obj.loadBalancingConfig)) {
            for (const config of obj.loadBalancingConfig){
                result.loadBalancingConfig.push((0, load_balancer_1.validateLoadBalancingConfig)(config));
            }
        } else {
            throw new Error("Invalid service config: invalid loadBalancingConfig");
        }
    }
    if ("methodConfig" in obj) {
        if (Array.isArray(obj.methodConfig)) {
            for (const methodConfig of obj.methodConfig){
                result.methodConfig.push(validateMethodConfig(methodConfig));
            }
        }
    }
    if ("retryThrottling" in obj) {
        result.retryThrottling = validateRetryThrottling(obj.retryThrottling);
    }
    // Validate method name uniqueness
    const seenMethodNames = [];
    for (const methodConfig of result.methodConfig){
        for (const name of methodConfig.name){
            for (const seenName of seenMethodNames){
                if (name.service === seenName.service && name.method === seenName.method) {
                    throw new Error(`Invalid service config: duplicate name ${name.service}/${name.method}`);
                }
            }
            seenMethodNames.push(name);
        }
    }
    return result;
}
exports.validateServiceConfig = validateServiceConfig;
function validateCanaryConfig(obj) {
    if (!("serviceConfig" in obj)) {
        throw new Error("Invalid service config choice: missing service config");
    }
    const result = {
        serviceConfig: validateServiceConfig(obj.serviceConfig)
    };
    if ("clientLanguage" in obj) {
        if (Array.isArray(obj.clientLanguage)) {
            result.clientLanguage = [];
            for (const lang of obj.clientLanguage){
                if (typeof lang === "string") {
                    result.clientLanguage.push(lang);
                } else {
                    throw new Error("Invalid service config choice: invalid clientLanguage");
                }
            }
        } else {
            throw new Error("Invalid service config choice: invalid clientLanguage");
        }
    }
    if ("clientHostname" in obj) {
        if (Array.isArray(obj.clientHostname)) {
            result.clientHostname = [];
            for (const lang of obj.clientHostname){
                if (typeof lang === "string") {
                    result.clientHostname.push(lang);
                } else {
                    throw new Error("Invalid service config choice: invalid clientHostname");
                }
            }
        } else {
            throw new Error("Invalid service config choice: invalid clientHostname");
        }
    }
    if ("percentage" in obj) {
        if (typeof obj.percentage === "number" && 0 <= obj.percentage && obj.percentage <= 100) {
            result.percentage = obj.percentage;
        } else {
            throw new Error("Invalid service config choice: invalid percentage");
        }
    }
    // Validate that no unexpected fields are present
    const allowedFields = [
        "clientLanguage",
        "percentage",
        "clientHostname",
        "serviceConfig"
    ];
    for(const field in obj){
        if (!allowedFields.includes(field)) {
            throw new Error(`Invalid service config choice: unexpected field ${field}`);
        }
    }
    return result;
}
function validateAndSelectCanaryConfig(obj, percentage) {
    if (!Array.isArray(obj)) {
        throw new Error("Invalid service config list");
    }
    for (const config of obj){
        const validatedConfig = validateCanaryConfig(config);
        /* For each field, we check if it is present, then only discard the
         * config if the field value does not match the current client */ if (typeof validatedConfig.percentage === "number" && percentage > validatedConfig.percentage) {
            continue;
        }
        if (Array.isArray(validatedConfig.clientHostname)) {
            let hostnameMatched = false;
            for (const hostname of validatedConfig.clientHostname){
                if (hostname === os.hostname()) {
                    hostnameMatched = true;
                }
            }
            if (!hostnameMatched) {
                continue;
            }
        }
        if (Array.isArray(validatedConfig.clientLanguage)) {
            let languageMatched = false;
            for (const language of validatedConfig.clientLanguage){
                if (language === CLIENT_LANGUAGE_STRING) {
                    languageMatched = true;
                }
            }
            if (!languageMatched) {
                continue;
            }
        }
        return validatedConfig.serviceConfig;
    }
    throw new Error("No matching service config found");
}
/**
 * Find the "grpc_config" record among the TXT records, parse its value as JSON, validate its contents,
 * and select a service config with selection fields that all match this client. Most of these steps
 * can fail with an error; the caller must handle any errors thrown this way.
 * @param txtRecord The TXT record array that is output from a successful call to dns.resolveTxt
 * @param percentage A number chosen from the range [0, 100) that is used to select which config to use
 * @return The service configuration to use, given the percentage value, or null if the service config
 *     data has a valid format but none of the options match the current client.
 */ function extractAndSelectServiceConfig(txtRecord, percentage) {
    for (const record of txtRecord){
        if (record.length > 0 && record[0].startsWith("grpc_config=")) {
            /* Treat the list of strings in this record as a single string and remove
             * "grpc_config=" from the beginning. The rest should be a JSON string */ const recordString = record.join("").substring("grpc_config=".length);
            const recordJson = JSON.parse(recordString);
            return validateAndSelectCanaryConfig(recordJson, percentage);
        }
    }
    return null;
}
exports.extractAndSelectServiceConfig = extractAndSelectServiceConfig; //# sourceMappingURL=service-config.js.map


/***/ }),

/***/ 27763:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.StatusBuilder = void 0;
/**
 * A builder for gRPC status objects.
 */ class StatusBuilder {
    constructor(){
        this.code = null;
        this.details = null;
        this.metadata = null;
    }
    /**
     * Adds a status code to the builder.
     */ withCode(code) {
        this.code = code;
        return this;
    }
    /**
     * Adds details to the builder.
     */ withDetails(details) {
        this.details = details;
        return this;
    }
    /**
     * Adds metadata to the builder.
     */ withMetadata(metadata) {
        this.metadata = metadata;
        return this;
    }
    /**
     * Builds the status object.
     */ build() {
        const status = {};
        if (this.code !== null) {
            status.code = this.code;
        }
        if (this.details !== null) {
            status.details = this.details;
        }
        if (this.metadata !== null) {
            status.metadata = this.metadata;
        }
        return status;
    }
}
exports.StatusBuilder = StatusBuilder; //# sourceMappingURL=status-builder.js.map


/***/ }),

/***/ 34540:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.StreamDecoder = void 0;
var ReadState;
(function(ReadState) {
    ReadState[ReadState["NO_DATA"] = 0] = "NO_DATA";
    ReadState[ReadState["READING_SIZE"] = 1] = "READING_SIZE";
    ReadState[ReadState["READING_MESSAGE"] = 2] = "READING_MESSAGE";
})(ReadState || (ReadState = {}));
class StreamDecoder {
    constructor(){
        this.readState = ReadState.NO_DATA;
        this.readCompressFlag = Buffer.alloc(1);
        this.readPartialSize = Buffer.alloc(4);
        this.readSizeRemaining = 4;
        this.readMessageSize = 0;
        this.readPartialMessage = [];
        this.readMessageRemaining = 0;
    }
    write(data) {
        let readHead = 0;
        let toRead;
        const result = [];
        while(readHead < data.length){
            switch(this.readState){
                case ReadState.NO_DATA:
                    this.readCompressFlag = data.slice(readHead, readHead + 1);
                    readHead += 1;
                    this.readState = ReadState.READING_SIZE;
                    this.readPartialSize.fill(0);
                    this.readSizeRemaining = 4;
                    this.readMessageSize = 0;
                    this.readMessageRemaining = 0;
                    this.readPartialMessage = [];
                    break;
                case ReadState.READING_SIZE:
                    toRead = Math.min(data.length - readHead, this.readSizeRemaining);
                    data.copy(this.readPartialSize, 4 - this.readSizeRemaining, readHead, readHead + toRead);
                    this.readSizeRemaining -= toRead;
                    readHead += toRead;
                    // readSizeRemaining >=0 here
                    if (this.readSizeRemaining === 0) {
                        this.readMessageSize = this.readPartialSize.readUInt32BE(0);
                        this.readMessageRemaining = this.readMessageSize;
                        if (this.readMessageRemaining > 0) {
                            this.readState = ReadState.READING_MESSAGE;
                        } else {
                            const message = Buffer.concat([
                                this.readCompressFlag,
                                this.readPartialSize
                            ], 5);
                            this.readState = ReadState.NO_DATA;
                            result.push(message);
                        }
                    }
                    break;
                case ReadState.READING_MESSAGE:
                    toRead = Math.min(data.length - readHead, this.readMessageRemaining);
                    this.readPartialMessage.push(data.slice(readHead, readHead + toRead));
                    this.readMessageRemaining -= toRead;
                    readHead += toRead;
                    // readMessageRemaining >=0 here
                    if (this.readMessageRemaining === 0) {
                        // At this point, we have read a full message
                        const framedMessageBuffers = [
                            this.readCompressFlag,
                            this.readPartialSize
                        ].concat(this.readPartialMessage);
                        const framedMessage = Buffer.concat(framedMessageBuffers, this.readMessageSize + 5);
                        this.readState = ReadState.NO_DATA;
                        result.push(framedMessage);
                    }
                    break;
                default:
                    throw new Error("Unexpected read state");
            }
        }
        return result;
    }
}
exports.StreamDecoder = StreamDecoder; //# sourceMappingURL=stream-decoder.js.map


/***/ }),

/***/ 27631:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2021 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.stringToSubchannelAddress = exports.subchannelAddressToString = exports.subchannelAddressEqual = exports.isTcpSubchannelAddress = void 0;
const net_1 = __webpack_require__(41808);
function isTcpSubchannelAddress(address) {
    return "port" in address;
}
exports.isTcpSubchannelAddress = isTcpSubchannelAddress;
function subchannelAddressEqual(address1, address2) {
    if (!address1 && !address2) {
        return true;
    }
    if (!address1 || !address2) {
        return false;
    }
    if (isTcpSubchannelAddress(address1)) {
        return isTcpSubchannelAddress(address2) && address1.host === address2.host && address1.port === address2.port;
    } else {
        return !isTcpSubchannelAddress(address2) && address1.path === address2.path;
    }
}
exports.subchannelAddressEqual = subchannelAddressEqual;
function subchannelAddressToString(address) {
    if (isTcpSubchannelAddress(address)) {
        return address.host + ":" + address.port;
    } else {
        return address.path;
    }
}
exports.subchannelAddressToString = subchannelAddressToString;
const DEFAULT_PORT = 443;
function stringToSubchannelAddress(addressString, port) {
    if ((0, net_1.isIP)(addressString)) {
        return {
            host: addressString,
            port: port !== null && port !== void 0 ? port : DEFAULT_PORT
        };
    } else {
        return {
            path: addressString
        };
    }
}
exports.stringToSubchannelAddress = stringToSubchannelAddress; //# sourceMappingURL=subchannel-address.js.map


/***/ }),

/***/ 40921:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.Http2SubchannelCall = void 0;
const http2 = __webpack_require__(85158);
const os = __webpack_require__(22037);
const constants_1 = __webpack_require__(60076);
const metadata_1 = __webpack_require__(39637);
const stream_decoder_1 = __webpack_require__(34540);
const logging = __webpack_require__(67738);
const constants_2 = __webpack_require__(60076);
const TRACER_NAME = "subchannel_call";
const { HTTP2_HEADER_STATUS , HTTP2_HEADER_CONTENT_TYPE , NGHTTP2_CANCEL  } = http2.constants;
/**
 * Should do approximately the same thing as util.getSystemErrorName but the
 * TypeScript types don't have that function for some reason so I just made my
 * own.
 * @param errno
 */ function getSystemErrorName(errno) {
    for (const [name, num] of Object.entries(os.constants.errno)){
        if (num === errno) {
            return name;
        }
    }
    return "Unknown system error " + errno;
}
class Http2SubchannelCall {
    constructor(http2Stream, callEventTracker, listener, transport, callId){
        this.http2Stream = http2Stream;
        this.callEventTracker = callEventTracker;
        this.listener = listener;
        this.transport = transport;
        this.callId = callId;
        this.decoder = new stream_decoder_1.StreamDecoder();
        this.isReadFilterPending = false;
        this.isPushPending = false;
        this.canPush = false;
        /**
         * Indicates that an 'end' event has come from the http2 stream, so there
         * will be no more data events.
         */ this.readsClosed = false;
        this.statusOutput = false;
        this.unpushedReadMessages = [];
        // Status code mapped from :status. To be used if grpc-status is not received
        this.mappedStatusCode = constants_1.Status.UNKNOWN;
        // This is populated (non-null) if and only if the call has ended
        this.finalStatus = null;
        this.internalError = null;
        http2Stream.on("response", (headers, flags)=>{
            let headersString = "";
            for (const header of Object.keys(headers)){
                headersString += "		" + header + ": " + headers[header] + "\n";
            }
            this.trace("Received server headers:\n" + headersString);
            switch(headers[":status"]){
                // TODO(murgatroid99): handle 100 and 101
                case 400:
                    this.mappedStatusCode = constants_1.Status.INTERNAL;
                    break;
                case 401:
                    this.mappedStatusCode = constants_1.Status.UNAUTHENTICATED;
                    break;
                case 403:
                    this.mappedStatusCode = constants_1.Status.PERMISSION_DENIED;
                    break;
                case 404:
                    this.mappedStatusCode = constants_1.Status.UNIMPLEMENTED;
                    break;
                case 429:
                case 502:
                case 503:
                case 504:
                    this.mappedStatusCode = constants_1.Status.UNAVAILABLE;
                    break;
                default:
                    this.mappedStatusCode = constants_1.Status.UNKNOWN;
            }
            if (flags & http2.constants.NGHTTP2_FLAG_END_STREAM) {
                this.handleTrailers(headers);
            } else {
                let metadata;
                try {
                    metadata = metadata_1.Metadata.fromHttp2Headers(headers);
                } catch (error) {
                    this.endCall({
                        code: constants_1.Status.UNKNOWN,
                        details: error.message,
                        metadata: new metadata_1.Metadata()
                    });
                    return;
                }
                this.listener.onReceiveMetadata(metadata);
            }
        });
        http2Stream.on("trailers", (headers)=>{
            this.handleTrailers(headers);
        });
        http2Stream.on("data", (data)=>{
            /* If the status has already been output, allow the http2 stream to
             * drain without processing the data. */ if (this.statusOutput) {
                return;
            }
            this.trace("receive HTTP/2 data frame of length " + data.length);
            const messages = this.decoder.write(data);
            for (const message of messages){
                this.trace("parsed message of length " + message.length);
                this.callEventTracker.addMessageReceived();
                this.tryPush(message);
            }
        });
        http2Stream.on("end", ()=>{
            this.readsClosed = true;
            this.maybeOutputStatus();
        });
        http2Stream.on("close", ()=>{
            /* Use process.next tick to ensure that this code happens after any
             * "error" event that may be emitted at about the same time, so that
             * we can bubble up the error message from that event. */ process.nextTick(()=>{
                var _a;
                this.trace("HTTP/2 stream closed with code " + http2Stream.rstCode);
                /* If we have a final status with an OK status code, that means that
                 * we have received all of the messages and we have processed the
                 * trailers and the call completed successfully, so it doesn't matter
                 * how the stream ends after that */ if (((_a = this.finalStatus) === null || _a === void 0 ? void 0 : _a.code) === constants_1.Status.OK) {
                    return;
                }
                let code;
                let details = "";
                switch(http2Stream.rstCode){
                    case http2.constants.NGHTTP2_NO_ERROR:
                        /* If we get a NO_ERROR code and we already have a status, the
                         * stream completed properly and we just haven't fully processed
                         * it yet */ if (this.finalStatus !== null) {
                            return;
                        }
                        code = constants_1.Status.INTERNAL;
                        details = `Received RST_STREAM with code ${http2Stream.rstCode}`;
                        break;
                    case http2.constants.NGHTTP2_REFUSED_STREAM:
                        code = constants_1.Status.UNAVAILABLE;
                        details = "Stream refused by server";
                        break;
                    case http2.constants.NGHTTP2_CANCEL:
                        code = constants_1.Status.CANCELLED;
                        details = "Call cancelled";
                        break;
                    case http2.constants.NGHTTP2_ENHANCE_YOUR_CALM:
                        code = constants_1.Status.RESOURCE_EXHAUSTED;
                        details = "Bandwidth exhausted or memory limit exceeded";
                        break;
                    case http2.constants.NGHTTP2_INADEQUATE_SECURITY:
                        code = constants_1.Status.PERMISSION_DENIED;
                        details = "Protocol not secure enough";
                        break;
                    case http2.constants.NGHTTP2_INTERNAL_ERROR:
                        code = constants_1.Status.INTERNAL;
                        if (this.internalError === null) {
                            /* This error code was previously handled in the default case, and
                             * there are several instances of it online, so I wanted to
                             * preserve the original error message so that people find existing
                             * information in searches, but also include the more recognizable
                             * "Internal server error" message. */ details = `Received RST_STREAM with code ${http2Stream.rstCode} (Internal server error)`;
                        } else {
                            if (this.internalError.code === "ECONNRESET" || this.internalError.code === "ETIMEDOUT") {
                                code = constants_1.Status.UNAVAILABLE;
                                details = this.internalError.message;
                            } else {
                                /* The "Received RST_STREAM with code ..." error is preserved
                                 * here for continuity with errors reported online, but the
                                 * error message at the end will probably be more relevant in
                                 * most cases. */ details = `Received RST_STREAM with code ${http2Stream.rstCode} triggered by internal client error: ${this.internalError.message}`;
                            }
                        }
                        break;
                    default:
                        code = constants_1.Status.INTERNAL;
                        details = `Received RST_STREAM with code ${http2Stream.rstCode}`;
                }
                // This is a no-op if trailers were received at all.
                // This is OK, because status codes emitted here correspond to more
                // catastrophic issues that prevent us from receiving trailers in the
                // first place.
                this.endCall({
                    code,
                    details,
                    metadata: new metadata_1.Metadata(),
                    rstCode: http2Stream.rstCode
                });
            });
        });
        http2Stream.on("error", (err)=>{
            /* We need an error handler here to stop "Uncaught Error" exceptions
             * from bubbling up. However, errors here should all correspond to
             * "close" events, where we will handle the error more granularly */ /* Specifically looking for stream errors that were *not* constructed
             * from a RST_STREAM response here:
             * https://github.com/nodejs/node/blob/8b8620d580314050175983402dfddf2674e8e22a/lib/internal/http2/core.js#L2267
             */ if (err.code !== "ERR_HTTP2_STREAM_ERROR") {
                this.trace("Node error event: message=" + err.message + " code=" + err.code + " errno=" + getSystemErrorName(err.errno) + " syscall=" + err.syscall);
                this.internalError = err;
            }
            this.callEventTracker.onStreamEnd(false);
        });
    }
    onDisconnect() {
        this.endCall({
            code: constants_1.Status.UNAVAILABLE,
            details: "Connection dropped",
            metadata: new metadata_1.Metadata()
        });
    }
    outputStatus() {
        /* Precondition: this.finalStatus !== null */ if (!this.statusOutput) {
            this.statusOutput = true;
            this.trace("ended with status: code=" + this.finalStatus.code + ' details="' + this.finalStatus.details + '"');
            this.callEventTracker.onCallEnd(this.finalStatus);
            /* We delay the actual action of bubbling up the status to insulate the
             * cleanup code in this class from any errors that may be thrown in the
             * upper layers as a result of bubbling up the status. In particular,
             * if the status is not OK, the "error" event may be emitted
             * synchronously at the top level, which will result in a thrown error if
             * the user does not handle that event. */ process.nextTick(()=>{
                this.listener.onReceiveStatus(this.finalStatus);
            });
            /* Leave the http2 stream in flowing state to drain incoming messages, to
             * ensure that the stream closure completes. The call stream already does
             * not push more messages after the status is output, so the messages go
             * nowhere either way. */ this.http2Stream.resume();
        }
    }
    trace(text) {
        logging.trace(constants_2.LogVerbosity.DEBUG, TRACER_NAME, "[" + this.callId + "] " + text);
    }
    /**
     * On first call, emits a 'status' event with the given StatusObject.
     * Subsequent calls are no-ops.
     * @param status The status of the call.
     */ endCall(status) {
        /* If the status is OK and a new status comes in (e.g. from a
         * deserialization failure), that new status takes priority */ if (this.finalStatus === null || this.finalStatus.code === constants_1.Status.OK) {
            this.finalStatus = status;
            this.maybeOutputStatus();
        }
        this.destroyHttp2Stream();
    }
    maybeOutputStatus() {
        if (this.finalStatus !== null) {
            /* The combination check of readsClosed and that the two message buffer
             * arrays are empty checks that there all incoming data has been fully
             * processed */ if (this.finalStatus.code !== constants_1.Status.OK || this.readsClosed && this.unpushedReadMessages.length === 0 && !this.isReadFilterPending && !this.isPushPending) {
                this.outputStatus();
            }
        }
    }
    push(message) {
        this.trace("pushing to reader message of length " + (message instanceof Buffer ? message.length : null));
        this.canPush = false;
        this.isPushPending = true;
        process.nextTick(()=>{
            this.isPushPending = false;
            /* If we have already output the status any later messages should be
             * ignored, and can cause out-of-order operation errors higher up in the
             * stack. Checking as late as possible here to avoid any race conditions.
             */ if (this.statusOutput) {
                return;
            }
            this.listener.onReceiveMessage(message);
            this.maybeOutputStatus();
        });
    }
    tryPush(messageBytes) {
        if (this.canPush) {
            this.http2Stream.pause();
            this.push(messageBytes);
        } else {
            this.trace("unpushedReadMessages.push message of length " + messageBytes.length);
            this.unpushedReadMessages.push(messageBytes);
        }
    }
    handleTrailers(headers) {
        this.callEventTracker.onStreamEnd(true);
        let headersString = "";
        for (const header of Object.keys(headers)){
            headersString += "		" + header + ": " + headers[header] + "\n";
        }
        this.trace("Received server trailers:\n" + headersString);
        let metadata;
        try {
            metadata = metadata_1.Metadata.fromHttp2Headers(headers);
        } catch (e) {
            metadata = new metadata_1.Metadata();
        }
        const metadataMap = metadata.getMap();
        let code = this.mappedStatusCode;
        if (code === constants_1.Status.UNKNOWN && typeof metadataMap["grpc-status"] === "string") {
            const receivedStatus = Number(metadataMap["grpc-status"]);
            if (receivedStatus in constants_1.Status) {
                code = receivedStatus;
                this.trace("received status code " + receivedStatus + " from server");
            }
            metadata.remove("grpc-status");
        }
        let details = "";
        if (typeof metadataMap["grpc-message"] === "string") {
            try {
                details = decodeURI(metadataMap["grpc-message"]);
            } catch (e) {
                details = metadataMap["grpc-message"];
            }
            metadata.remove("grpc-message");
            this.trace('received status details string "' + details + '" from server');
        }
        const status = {
            code,
            details,
            metadata
        };
        // This is a no-op if the call was already ended when handling headers.
        this.endCall(status);
    }
    destroyHttp2Stream() {
        var _a;
        // The http2 stream could already have been destroyed if cancelWithStatus
        // is called in response to an internal http2 error.
        if (!this.http2Stream.destroyed) {
            /* If the call has ended with an OK status, communicate that when closing
             * the stream, partly to avoid a situation in which we detect an error
             * RST_STREAM as a result after we have the status */ let code;
            if (((_a = this.finalStatus) === null || _a === void 0 ? void 0 : _a.code) === constants_1.Status.OK) {
                code = http2.constants.NGHTTP2_NO_ERROR;
            } else {
                code = http2.constants.NGHTTP2_CANCEL;
            }
            this.trace("close http2 stream with code " + code);
            this.http2Stream.close(code);
        }
    }
    cancelWithStatus(status, details) {
        this.trace("cancelWithStatus code: " + status + ' details: "' + details + '"');
        this.endCall({
            code: status,
            details,
            metadata: new metadata_1.Metadata()
        });
    }
    getStatus() {
        return this.finalStatus;
    }
    getPeer() {
        return this.transport.getPeerName();
    }
    getCallNumber() {
        return this.callId;
    }
    startRead() {
        /* If the stream has ended with an error, we should not emit any more
         * messages and we should communicate that the stream has ended */ if (this.finalStatus !== null && this.finalStatus.code !== constants_1.Status.OK) {
            this.readsClosed = true;
            this.maybeOutputStatus();
            return;
        }
        this.canPush = true;
        if (this.unpushedReadMessages.length > 0) {
            const nextMessage = this.unpushedReadMessages.shift();
            this.push(nextMessage);
            return;
        }
        /* Only resume reading from the http2Stream if we don't have any pending
          * messages to emit */ this.http2Stream.resume();
    }
    sendMessageWithContext(context, message) {
        this.trace("write() called with message of length " + message.length);
        const cb = (error)=>{
            var _a;
            let code = constants_1.Status.UNAVAILABLE;
            if ((error === null || error === void 0 ? void 0 : error.code) === "ERR_STREAM_WRITE_AFTER_END") {
                code = constants_1.Status.INTERNAL;
            }
            if (error) {
                this.cancelWithStatus(code, `Write error: ${error.message}`);
            }
            (_a = context.callback) === null || _a === void 0 ? void 0 : _a.call(context);
        };
        this.trace("sending data chunk of length " + message.length);
        this.callEventTracker.addMessageSent();
        try {
            this.http2Stream.write(message, cb);
        } catch (error) {
            this.endCall({
                code: constants_1.Status.UNAVAILABLE,
                details: `Write failed with error ${error.message}`,
                metadata: new metadata_1.Metadata()
            });
        }
    }
    halfClose() {
        this.trace("end() called");
        this.trace("calling end() on HTTP/2 stream");
        this.http2Stream.end();
    }
}
exports.Http2SubchannelCall = Http2SubchannelCall; //# sourceMappingURL=subchannel-call.js.map


/***/ }),

/***/ 22561:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright 2022 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.BaseSubchannelWrapper = void 0;
class BaseSubchannelWrapper {
    constructor(child){
        this.child = child;
    }
    getConnectivityState() {
        return this.child.getConnectivityState();
    }
    addConnectivityStateListener(listener) {
        this.child.addConnectivityStateListener(listener);
    }
    removeConnectivityStateListener(listener) {
        this.child.removeConnectivityStateListener(listener);
    }
    startConnecting() {
        this.child.startConnecting();
    }
    getAddress() {
        return this.child.getAddress();
    }
    throttleKeepalive(newKeepaliveTime) {
        this.child.throttleKeepalive(newKeepaliveTime);
    }
    ref() {
        this.child.ref();
    }
    unref() {
        this.child.unref();
    }
    getChannelzRef() {
        return this.child.getChannelzRef();
    }
    getRealSubchannel() {
        return this.child.getRealSubchannel();
    }
}
exports.BaseSubchannelWrapper = BaseSubchannelWrapper; //# sourceMappingURL=subchannel-interface.js.map


/***/ }),

/***/ 43864:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getSubchannelPool = exports.SubchannelPool = void 0;
const channel_options_1 = __webpack_require__(66527);
const subchannel_1 = __webpack_require__(97630);
const subchannel_address_1 = __webpack_require__(27631);
const uri_parser_1 = __webpack_require__(35193);
const transport_1 = __webpack_require__(68341);
// 10 seconds in milliseconds. This value is arbitrary.
/**
 * The amount of time in between checks for dropping subchannels that have no
 * other references
 */ const REF_CHECK_INTERVAL = 10000;
class SubchannelPool {
    /**
     * A pool of subchannels use for making connections. Subchannels with the
     * exact same parameters will be reused.
     */ constructor(){
        this.pool = Object.create(null);
        /**
         * A timer of a task performing a periodic subchannel cleanup.
         */ this.cleanupTimer = null;
    }
    /**
     * Unrefs all unused subchannels and cancels the cleanup task if all
     * subchannels have been unrefed.
     */ unrefUnusedSubchannels() {
        let allSubchannelsUnrefed = true;
        /* These objects are created with Object.create(null), so they do not
         * have a prototype, which means that for (... in ...) loops over them
         * do not need to be filtered */ // eslint-disable-disable-next-line:forin
        for(const channelTarget in this.pool){
            const subchannelObjArray = this.pool[channelTarget];
            const refedSubchannels = subchannelObjArray.filter((value)=>!value.subchannel.unrefIfOneRef());
            if (refedSubchannels.length > 0) {
                allSubchannelsUnrefed = false;
            }
            /* For each subchannel in the pool, try to unref it if it has
             * exactly one ref (which is the ref from the pool itself). If that
             * does happen, remove the subchannel from the pool */ this.pool[channelTarget] = refedSubchannels;
        }
        /* Currently we do not delete keys with empty values. If that results
         * in significant memory usage we should change it. */ // Cancel the cleanup task if all subchannels have been unrefed.
        if (allSubchannelsUnrefed && this.cleanupTimer !== null) {
            clearInterval(this.cleanupTimer);
            this.cleanupTimer = null;
        }
    }
    /**
     * Ensures that the cleanup task is spawned.
     */ ensureCleanupTask() {
        var _a, _b;
        if (this.cleanupTimer === null) {
            this.cleanupTimer = setInterval(()=>{
                this.unrefUnusedSubchannels();
            }, REF_CHECK_INTERVAL);
            // Unref because this timer should not keep the event loop running.
            // Call unref only if it exists to address electron/electron#21162
            (_b = (_a = this.cleanupTimer).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
    }
    /**
     * Get a subchannel if one already exists with exactly matching parameters.
     * Otherwise, create and save a subchannel with those parameters.
     * @param channelTarget
     * @param subchannelTarget
     * @param channelArguments
     * @param channelCredentials
     */ getOrCreateSubchannel(channelTargetUri, subchannelTarget, channelArguments, channelCredentials) {
        this.ensureCleanupTask();
        const channelTarget = (0, uri_parser_1.uriToString)(channelTargetUri);
        if (channelTarget in this.pool) {
            const subchannelObjArray = this.pool[channelTarget];
            for (const subchannelObj of subchannelObjArray){
                if ((0, subchannel_address_1.subchannelAddressEqual)(subchannelTarget, subchannelObj.subchannelAddress) && (0, channel_options_1.channelOptionsEqual)(channelArguments, subchannelObj.channelArguments) && channelCredentials._equals(subchannelObj.channelCredentials)) {
                    return subchannelObj.subchannel;
                }
            }
        }
        // If we get here, no matching subchannel was found
        const subchannel = new subchannel_1.Subchannel(channelTargetUri, subchannelTarget, channelArguments, channelCredentials, new transport_1.Http2SubchannelConnector(channelTargetUri));
        if (!(channelTarget in this.pool)) {
            this.pool[channelTarget] = [];
        }
        this.pool[channelTarget].push({
            subchannelAddress: subchannelTarget,
            channelArguments,
            channelCredentials,
            subchannel
        });
        subchannel.ref();
        return subchannel;
    }
}
exports.SubchannelPool = SubchannelPool;
const globalSubchannelPool = new SubchannelPool();
/**
 * Get either the global subchannel pool, or a new subchannel pool.
 * @param global
 */ function getSubchannelPool(global) {
    if (global) {
        return globalSubchannelPool;
    } else {
        return new SubchannelPool();
    }
}
exports.getSubchannelPool = getSubchannelPool; //# sourceMappingURL=subchannel-pool.js.map


/***/ }),

/***/ 97630:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.Subchannel = void 0;
const connectivity_state_1 = __webpack_require__(16035);
const backoff_timeout_1 = __webpack_require__(22308);
const logging = __webpack_require__(67738);
const constants_1 = __webpack_require__(60076);
const uri_parser_1 = __webpack_require__(35193);
const subchannel_address_1 = __webpack_require__(27631);
const channelz_1 = __webpack_require__(18949);
const TRACER_NAME = "subchannel";
/* setInterval and setTimeout only accept signed 32 bit integers. JS doesn't
 * have a constant for the max signed 32 bit integer, so this is a simple way
 * to calculate it */ const KEEPALIVE_MAX_TIME_MS = ~(1 << 31);
class Subchannel {
    /**
     * A class representing a connection to a single backend.
     * @param channelTarget The target string for the channel as a whole
     * @param subchannelAddress The address for the backend that this subchannel
     *     will connect to
     * @param options The channel options, plus any specific subchannel options
     *     for this subchannel
     * @param credentials The channel credentials used to establish this
     *     connection
     */ constructor(channelTarget, subchannelAddress, options, credentials, connector){
        var _a;
        this.channelTarget = channelTarget;
        this.subchannelAddress = subchannelAddress;
        this.options = options;
        this.credentials = credentials;
        this.connector = connector;
        /**
         * The subchannel's current connectivity state. Invariant: `session` === `null`
         * if and only if `connectivityState` is IDLE or TRANSIENT_FAILURE.
         */ this.connectivityState = connectivity_state_1.ConnectivityState.IDLE;
        /**
         * The underlying http2 session used to make requests.
         */ this.transport = null;
        /**
         * Indicates that the subchannel should transition from TRANSIENT_FAILURE to
         * CONNECTING instead of IDLE when the backoff timeout ends.
         */ this.continueConnecting = false;
        /**
         * A list of listener functions that will be called whenever the connectivity
         * state changes. Will be modified by `addConnectivityStateListener` and
         * `removeConnectivityStateListener`
         */ this.stateListeners = new Set();
        /**
         * Tracks channels and subchannel pools with references to this subchannel
         */ this.refcount = 0;
        // Channelz info
        this.channelzEnabled = true;
        this.callTracker = new channelz_1.ChannelzCallTracker();
        this.childrenTracker = new channelz_1.ChannelzChildrenTracker();
        // Channelz socket info
        this.streamTracker = new channelz_1.ChannelzCallTracker();
        const backoffOptions = {
            initialDelay: options["grpc.initial_reconnect_backoff_ms"],
            maxDelay: options["grpc.max_reconnect_backoff_ms"]
        };
        this.backoffTimeout = new backoff_timeout_1.BackoffTimeout(()=>{
            this.handleBackoffTimer();
        }, backoffOptions);
        this.subchannelAddressString = (0, subchannel_address_1.subchannelAddressToString)(subchannelAddress);
        this.keepaliveTime = (_a = options["grpc.keepalive_time_ms"]) !== null && _a !== void 0 ? _a : -1;
        if (options["grpc.enable_channelz"] === 0) {
            this.channelzEnabled = false;
        }
        this.channelzTrace = new channelz_1.ChannelzTrace();
        this.channelzRef = (0, channelz_1.registerChannelzSubchannel)(this.subchannelAddressString, ()=>this.getChannelzInfo(), this.channelzEnabled);
        if (this.channelzEnabled) {
            this.channelzTrace.addTrace("CT_INFO", "Subchannel created");
        }
        this.trace("Subchannel constructed with options " + JSON.stringify(options, undefined, 2));
    }
    getChannelzInfo() {
        return {
            state: this.connectivityState,
            trace: this.channelzTrace,
            callTracker: this.callTracker,
            children: this.childrenTracker.getChildLists(),
            target: this.subchannelAddressString
        };
    }
    trace(text) {
        logging.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + text);
    }
    refTrace(text) {
        logging.trace(constants_1.LogVerbosity.DEBUG, "subchannel_refcount", "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + text);
    }
    handleBackoffTimer() {
        if (this.continueConnecting) {
            this.transitionToState([
                connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE
            ], connectivity_state_1.ConnectivityState.CONNECTING);
        } else {
            this.transitionToState([
                connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE
            ], connectivity_state_1.ConnectivityState.IDLE);
        }
    }
    /**
     * Start a backoff timer with the current nextBackoff timeout
     */ startBackoff() {
        this.backoffTimeout.runOnce();
    }
    stopBackoff() {
        this.backoffTimeout.stop();
        this.backoffTimeout.reset();
    }
    startConnectingInternal() {
        let options = this.options;
        if (options["grpc.keepalive_time_ms"]) {
            const adjustedKeepaliveTime = Math.min(this.keepaliveTime, KEEPALIVE_MAX_TIME_MS);
            options = Object.assign(Object.assign({}, options), {
                "grpc.keepalive_time_ms": adjustedKeepaliveTime
            });
        }
        this.connector.connect(this.subchannelAddress, this.credentials, options).then((transport)=>{
            if (this.transitionToState([
                connectivity_state_1.ConnectivityState.CONNECTING
            ], connectivity_state_1.ConnectivityState.READY)) {
                this.transport = transport;
                if (this.channelzEnabled) {
                    this.childrenTracker.refChild(transport.getChannelzRef());
                }
                transport.addDisconnectListener((tooManyPings)=>{
                    this.transitionToState([
                        connectivity_state_1.ConnectivityState.READY
                    ], connectivity_state_1.ConnectivityState.IDLE);
                    if (tooManyPings && this.keepaliveTime > 0) {
                        this.keepaliveTime *= 2;
                        logging.log(constants_1.LogVerbosity.ERROR, `Connection to ${(0, uri_parser_1.uriToString)(this.channelTarget)} at ${this.subchannelAddressString} rejected by server because of excess pings. Increasing ping interval to ${this.keepaliveTime} ms`);
                    }
                });
            }
        }, (error)=>{
            this.transitionToState([
                connectivity_state_1.ConnectivityState.CONNECTING
            ], connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE);
        });
    }
    /**
     * Initiate a state transition from any element of oldStates to the new
     * state. If the current connectivityState is not in oldStates, do nothing.
     * @param oldStates The set of states to transition from
     * @param newState The state to transition to
     * @returns True if the state changed, false otherwise
     */ transitionToState(oldStates, newState) {
        var _a, _b;
        if (oldStates.indexOf(this.connectivityState) === -1) {
            return false;
        }
        this.trace(connectivity_state_1.ConnectivityState[this.connectivityState] + " -> " + connectivity_state_1.ConnectivityState[newState]);
        if (this.channelzEnabled) {
            this.channelzTrace.addTrace("CT_INFO", connectivity_state_1.ConnectivityState[this.connectivityState] + " -> " + connectivity_state_1.ConnectivityState[newState]);
        }
        const previousState = this.connectivityState;
        this.connectivityState = newState;
        process.nextTick(()=>{});
        switch(newState){
            case connectivity_state_1.ConnectivityState.READY:
                this.stopBackoff();
                break;
            case connectivity_state_1.ConnectivityState.CONNECTING:
                this.startBackoff();
                this.startConnectingInternal();
                this.continueConnecting = false;
                break;
            case connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE:
                if (this.channelzEnabled && this.transport) {
                    this.childrenTracker.unrefChild(this.transport.getChannelzRef());
                }
                (_a = this.transport) === null || _a === void 0 ? void 0 : _a.shutdown();
                this.transport = null;
                /* If the backoff timer has already ended by the time we get to the
                 * TRANSIENT_FAILURE state, we want to immediately transition out of
                 * TRANSIENT_FAILURE as though the backoff timer is ending right now */ if (!this.backoffTimeout.isRunning()) {
                    process.nextTick(()=>{
                        this.handleBackoffTimer();
                    });
                }
                break;
            case connectivity_state_1.ConnectivityState.IDLE:
                if (this.channelzEnabled && this.transport) {
                    this.childrenTracker.unrefChild(this.transport.getChannelzRef());
                }
                (_b = this.transport) === null || _b === void 0 ? void 0 : _b.shutdown();
                this.transport = null;
                break;
            default:
                throw new Error(`Invalid state: unknown ConnectivityState ${newState}`);
        }
        for (const listener of this.stateListeners){
            listener(this, previousState, newState, this.keepaliveTime);
        }
        return true;
    }
    ref() {
        this.refTrace("refcount " + this.refcount + " -> " + (this.refcount + 1));
        this.refcount += 1;
    }
    unref() {
        this.refTrace("refcount " + this.refcount + " -> " + (this.refcount - 1));
        this.refcount -= 1;
        if (this.refcount === 0) {
            if (this.channelzEnabled) {
                this.channelzTrace.addTrace("CT_INFO", "Shutting down");
            }
            if (this.channelzEnabled) {
                (0, channelz_1.unregisterChannelzRef)(this.channelzRef);
            }
            process.nextTick(()=>{
                this.transitionToState([
                    connectivity_state_1.ConnectivityState.CONNECTING,
                    connectivity_state_1.ConnectivityState.READY
                ], connectivity_state_1.ConnectivityState.IDLE);
            });
        }
    }
    unrefIfOneRef() {
        if (this.refcount === 1) {
            this.unref();
            return true;
        }
        return false;
    }
    createCall(metadata, host, method, listener) {
        if (!this.transport) {
            throw new Error("Cannot create call, subchannel not READY");
        }
        let statsTracker;
        if (this.channelzEnabled) {
            this.callTracker.addCallStarted();
            this.streamTracker.addCallStarted();
            statsTracker = {
                onCallEnd: (status)=>{
                    if (status.code === constants_1.Status.OK) {
                        this.callTracker.addCallSucceeded();
                    } else {
                        this.callTracker.addCallFailed();
                    }
                }
            };
        } else {
            statsTracker = {};
        }
        return this.transport.createCall(metadata, host, method, listener, statsTracker);
    }
    /**
     * If the subchannel is currently IDLE, start connecting and switch to the
     * CONNECTING state. If the subchannel is current in TRANSIENT_FAILURE,
     * the next time it would transition to IDLE, start connecting again instead.
     * Otherwise, do nothing.
     */ startConnecting() {
        process.nextTick(()=>{
            /* First, try to transition from IDLE to connecting. If that doesn't happen
            * because the state is not currently IDLE, check if it is
            * TRANSIENT_FAILURE, and if so indicate that it should go back to
            * connecting after the backoff timer ends. Otherwise do nothing */ if (!this.transitionToState([
                connectivity_state_1.ConnectivityState.IDLE
            ], connectivity_state_1.ConnectivityState.CONNECTING)) {
                if (this.connectivityState === connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE) {
                    this.continueConnecting = true;
                }
            }
        });
    }
    /**
     * Get the subchannel's current connectivity state.
     */ getConnectivityState() {
        return this.connectivityState;
    }
    /**
     * Add a listener function to be called whenever the subchannel's
     * connectivity state changes.
     * @param listener
     */ addConnectivityStateListener(listener) {
        this.stateListeners.add(listener);
    }
    /**
     * Remove a listener previously added with `addConnectivityStateListener`
     * @param listener A reference to a function previously passed to
     *     `addConnectivityStateListener`
     */ removeConnectivityStateListener(listener) {
        this.stateListeners.delete(listener);
    }
    /**
     * Reset the backoff timeout, and immediately start connecting if in backoff.
     */ resetBackoff() {
        process.nextTick(()=>{
            this.backoffTimeout.reset();
            this.transitionToState([
                connectivity_state_1.ConnectivityState.TRANSIENT_FAILURE
            ], connectivity_state_1.ConnectivityState.CONNECTING);
        });
    }
    getAddress() {
        return this.subchannelAddressString;
    }
    getChannelzRef() {
        return this.channelzRef;
    }
    getRealSubchannel() {
        return this;
    }
    throttleKeepalive(newKeepaliveTime) {
        if (newKeepaliveTime > this.keepaliveTime) {
            this.keepaliveTime = newKeepaliveTime;
        }
    }
}
exports.Subchannel = Subchannel; //# sourceMappingURL=subchannel.js.map


/***/ }),

/***/ 29883:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getDefaultRootsData = exports.CIPHER_SUITES = void 0;
const fs = __webpack_require__(57147);
exports.CIPHER_SUITES = process.env.GRPC_SSL_CIPHER_SUITES;
const DEFAULT_ROOTS_FILE_PATH = process.env.GRPC_DEFAULT_SSL_ROOTS_FILE_PATH;
let defaultRootsData = null;
function getDefaultRootsData() {
    if (DEFAULT_ROOTS_FILE_PATH) {
        if (defaultRootsData === null) {
            defaultRootsData = fs.readFileSync(DEFAULT_ROOTS_FILE_PATH);
        }
        return defaultRootsData;
    }
    return null;
}
exports.getDefaultRootsData = getDefaultRootsData; //# sourceMappingURL=tls-helpers.js.map


/***/ }),

/***/ 68341:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * Copyright 2023 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.Http2SubchannelConnector = void 0;
const http2 = __webpack_require__(85158);
const tls_1 = __webpack_require__(24404);
const channelz_1 = __webpack_require__(18949);
const constants_1 = __webpack_require__(60076);
const http_proxy_1 = __webpack_require__(33939);
const logging = __webpack_require__(67738);
const resolver_1 = __webpack_require__(71123);
const subchannel_address_1 = __webpack_require__(27631);
const uri_parser_1 = __webpack_require__(35193);
const net = __webpack_require__(41808);
const subchannel_call_1 = __webpack_require__(40921);
const call_number_1 = __webpack_require__(26095);
const TRACER_NAME = "transport";
const FLOW_CONTROL_TRACER_NAME = "transport_flowctrl";
const clientVersion = (__webpack_require__(2912)/* .version */ .i8);
const { HTTP2_HEADER_AUTHORITY , HTTP2_HEADER_CONTENT_TYPE , HTTP2_HEADER_METHOD , HTTP2_HEADER_PATH , HTTP2_HEADER_TE , HTTP2_HEADER_USER_AGENT  } = http2.constants;
/* setInterval and setTimeout only accept signed 32 bit integers. JS doesn't
 * have a constant for the max signed 32 bit integer, so this is a simple way
 * to calculate it */ const KEEPALIVE_MAX_TIME_MS = (/* unused pure expression or super */ null && (~(1 << 31)));
const KEEPALIVE_TIMEOUT_MS = 20000;
const tooManyPingsData = Buffer.from("too_many_pings", "ascii");
class Http2Transport {
    constructor(session, subchannelAddress, options){
        this.session = session;
        /**
         * The amount of time in between sending pings
         */ this.keepaliveTimeMs = -1;
        /**
         * The amount of time to wait for an acknowledgement after sending a ping
         */ this.keepaliveTimeoutMs = KEEPALIVE_TIMEOUT_MS;
        /**
         * Timer reference tracking when the most recent ping will be considered lost
         */ this.keepaliveTimeoutId = null;
        /**
         * Indicates whether keepalive pings should be sent without any active calls
         */ this.keepaliveWithoutCalls = false;
        this.activeCalls = new Set();
        this.disconnectListeners = [];
        this.disconnectHandled = false;
        this.channelzEnabled = true;
        /**
         * Name of the remote server, if it is not the same as the subchannel
         * address, i.e. if connecting through an HTTP CONNECT proxy.
         */ this.remoteName = null;
        this.streamTracker = new channelz_1.ChannelzCallTracker();
        this.keepalivesSent = 0;
        this.messagesSent = 0;
        this.messagesReceived = 0;
        this.lastMessageSentTimestamp = null;
        this.lastMessageReceivedTimestamp = null;
        // Build user-agent string.
        this.userAgent = [
            options["grpc.primary_user_agent"],
            `grpc-node-js/${clientVersion}`,
            options["grpc.secondary_user_agent"]
        ].filter((e)=>e).join(" "); // remove falsey values first
        if ("grpc.keepalive_time_ms" in options) {
            this.keepaliveTimeMs = options["grpc.keepalive_time_ms"];
        }
        if ("grpc.keepalive_timeout_ms" in options) {
            this.keepaliveTimeoutMs = options["grpc.keepalive_timeout_ms"];
        }
        if ("grpc.keepalive_permit_without_calls" in options) {
            this.keepaliveWithoutCalls = options["grpc.keepalive_permit_without_calls"] === 1;
        } else {
            this.keepaliveWithoutCalls = false;
        }
        this.keepaliveIntervalId = setTimeout(()=>{}, 0);
        clearTimeout(this.keepaliveIntervalId);
        if (this.keepaliveWithoutCalls) {
            this.startKeepalivePings();
        }
        this.subchannelAddressString = (0, subchannel_address_1.subchannelAddressToString)(subchannelAddress);
        if (options["grpc.enable_channelz"] === 0) {
            this.channelzEnabled = false;
        }
        this.channelzRef = (0, channelz_1.registerChannelzSocket)(this.subchannelAddressString, ()=>this.getChannelzInfo(), this.channelzEnabled);
        session.once("close", ()=>{
            this.trace("session closed");
            this.stopKeepalivePings();
            this.handleDisconnect();
        });
        session.once("goaway", (errorCode, lastStreamID, opaqueData)=>{
            let tooManyPings = false;
            /* See the last paragraph of
             * https://github.com/grpc/proposal/blob/master/A8-client-side-keepalive.md#basic-keepalive */ if (errorCode === http2.constants.NGHTTP2_ENHANCE_YOUR_CALM && opaqueData.equals(tooManyPingsData)) {
                tooManyPings = true;
            }
            this.trace("connection closed by GOAWAY with code " + errorCode);
            this.reportDisconnectToOwner(tooManyPings);
        });
        session.once("error", (error)=>{
            /* Do nothing here. Any error should also trigger a close event, which is
             * where we want to handle that.  */ this.trace("connection closed with error " + error.message);
        });
        if (logging.isTracerEnabled(TRACER_NAME)) {
            session.on("remoteSettings", (settings)=>{
                this.trace("new settings received" + (this.session !== session ? " on the old connection" : "") + ": " + JSON.stringify(settings));
            });
            session.on("localSettings", (settings)=>{
                this.trace("local settings acknowledged by remote" + (this.session !== session ? " on the old connection" : "") + ": " + JSON.stringify(settings));
            });
        }
    }
    getChannelzInfo() {
        var _a, _b, _c;
        const sessionSocket = this.session.socket;
        const remoteAddress = sessionSocket.remoteAddress ? (0, subchannel_address_1.stringToSubchannelAddress)(sessionSocket.remoteAddress, sessionSocket.remotePort) : null;
        const localAddress = sessionSocket.localAddress ? (0, subchannel_address_1.stringToSubchannelAddress)(sessionSocket.localAddress, sessionSocket.localPort) : null;
        let tlsInfo;
        if (this.session.encrypted) {
            const tlsSocket = sessionSocket;
            const cipherInfo = tlsSocket.getCipher();
            const certificate = tlsSocket.getCertificate();
            const peerCertificate = tlsSocket.getPeerCertificate();
            tlsInfo = {
                cipherSuiteStandardName: (_a = cipherInfo.standardName) !== null && _a !== void 0 ? _a : null,
                cipherSuiteOtherName: cipherInfo.standardName ? null : cipherInfo.name,
                localCertificate: certificate && "raw" in certificate ? certificate.raw : null,
                remoteCertificate: peerCertificate && "raw" in peerCertificate ? peerCertificate.raw : null
            };
        } else {
            tlsInfo = null;
        }
        const socketInfo = {
            remoteAddress: remoteAddress,
            localAddress: localAddress,
            security: tlsInfo,
            remoteName: this.remoteName,
            streamsStarted: this.streamTracker.callsStarted,
            streamsSucceeded: this.streamTracker.callsSucceeded,
            streamsFailed: this.streamTracker.callsFailed,
            messagesSent: this.messagesSent,
            messagesReceived: this.messagesReceived,
            keepAlivesSent: this.keepalivesSent,
            lastLocalStreamCreatedTimestamp: this.streamTracker.lastCallStartedTimestamp,
            lastRemoteStreamCreatedTimestamp: null,
            lastMessageSentTimestamp: this.lastMessageSentTimestamp,
            lastMessageReceivedTimestamp: this.lastMessageReceivedTimestamp,
            localFlowControlWindow: (_b = this.session.state.localWindowSize) !== null && _b !== void 0 ? _b : null,
            remoteFlowControlWindow: (_c = this.session.state.remoteWindowSize) !== null && _c !== void 0 ? _c : null
        };
        return socketInfo;
    }
    trace(text) {
        logging.trace(constants_1.LogVerbosity.DEBUG, TRACER_NAME, "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + text);
    }
    keepaliveTrace(text) {
        logging.trace(constants_1.LogVerbosity.DEBUG, "keepalive", "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + text);
    }
    flowControlTrace(text) {
        logging.trace(constants_1.LogVerbosity.DEBUG, FLOW_CONTROL_TRACER_NAME, "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + text);
    }
    internalsTrace(text) {
        logging.trace(constants_1.LogVerbosity.DEBUG, "transport_internals", "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + text);
    }
    /**
     * Indicate to the owner of this object that this transport should no longer
     * be used. That happens if the connection drops, or if the server sends a
     * GOAWAY.
     * @param tooManyPings If true, this was triggered by a GOAWAY with data
     * indicating that the session was closed becaues the client sent too many
     * pings.
     * @returns
     */ reportDisconnectToOwner(tooManyPings) {
        if (this.disconnectHandled) {
            return;
        }
        this.disconnectHandled = true;
        this.disconnectListeners.forEach((listener)=>listener(tooManyPings));
    }
    /**
     * Handle connection drops, but not GOAWAYs.
     */ handleDisconnect() {
        this.reportDisconnectToOwner(false);
        /* Give calls an event loop cycle to finish naturally before reporting the
         * disconnnection to them. */ setImmediate(()=>{
            for (const call of this.activeCalls){
                call.onDisconnect();
            }
        });
    }
    addDisconnectListener(listener) {
        this.disconnectListeners.push(listener);
    }
    clearKeepaliveTimeout() {
        if (!this.keepaliveTimeoutId) {
            return;
        }
        clearTimeout(this.keepaliveTimeoutId);
        this.keepaliveTimeoutId = null;
    }
    sendPing() {
        var _a, _b;
        if (this.channelzEnabled) {
            this.keepalivesSent += 1;
        }
        this.keepaliveTrace("Sending ping with timeout " + this.keepaliveTimeoutMs + "ms");
        if (!this.keepaliveTimeoutId) {
            this.keepaliveTimeoutId = setTimeout(()=>{
                this.keepaliveTrace("Ping timeout passed without response");
                this.handleDisconnect();
            }, this.keepaliveTimeoutMs);
            (_b = (_a = this.keepaliveTimeoutId).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
        try {
            this.session.ping((err, duration, payload)=>{
                this.keepaliveTrace("Received ping response");
                this.clearKeepaliveTimeout();
            });
        } catch (e) {
            /* If we fail to send a ping, the connection is no longer functional, so
             * we should discard it. */ this.handleDisconnect();
        }
    }
    startKeepalivePings() {
        var _a, _b;
        if (this.keepaliveTimeMs < 0) {
            return;
        }
        this.keepaliveIntervalId = setInterval(()=>{
            this.sendPing();
        }, this.keepaliveTimeMs);
        (_b = (_a = this.keepaliveIntervalId).unref) === null || _b === void 0 ? void 0 : _b.call(_a);
    /* Don't send a ping immediately because whatever caused us to start
         * sending pings should also involve some network activity. */ }
    /**
     * Stop keepalive pings when terminating a connection. This discards the
     * outstanding ping timeout, so it should not be called if the same
     * connection will still be used.
     */ stopKeepalivePings() {
        clearInterval(this.keepaliveIntervalId);
        this.clearKeepaliveTimeout();
    }
    removeActiveCall(call) {
        this.activeCalls.delete(call);
        if (this.activeCalls.size === 0) {
            this.session.unref();
            if (!this.keepaliveWithoutCalls) {
                this.stopKeepalivePings();
            }
        }
    }
    addActiveCall(call) {
        if (this.activeCalls.size === 0) {
            this.session.ref();
            if (!this.keepaliveWithoutCalls) {
                this.startKeepalivePings();
            }
        }
        this.activeCalls.add(call);
    }
    createCall(metadata, host, method, listener, subchannelCallStatsTracker) {
        const headers = metadata.toHttp2Headers();
        headers[HTTP2_HEADER_AUTHORITY] = host;
        headers[HTTP2_HEADER_USER_AGENT] = this.userAgent;
        headers[HTTP2_HEADER_CONTENT_TYPE] = "application/grpc";
        headers[HTTP2_HEADER_METHOD] = "POST";
        headers[HTTP2_HEADER_PATH] = method;
        headers[HTTP2_HEADER_TE] = "trailers";
        let http2Stream;
        /* In theory, if an error is thrown by session.request because session has
         * become unusable (e.g. because it has received a goaway), this subchannel
         * should soon see the corresponding close or goaway event anyway and leave
         * READY. But we have seen reports that this does not happen
         * (https://github.com/googleapis/nodejs-firestore/issues/1023#issuecomment-653204096)
         * so for defense in depth, we just discard the session when we see an
         * error here.
         */ try {
            http2Stream = this.session.request(headers);
        } catch (e) {
            this.handleDisconnect();
            throw e;
        }
        this.flowControlTrace("local window size: " + this.session.state.localWindowSize + " remote window size: " + this.session.state.remoteWindowSize);
        this.internalsTrace("session.closed=" + this.session.closed + " session.destroyed=" + this.session.destroyed + " session.socket.destroyed=" + this.session.socket.destroyed);
        let eventTracker;
        let call;
        if (this.channelzEnabled) {
            this.streamTracker.addCallStarted();
            eventTracker = {
                addMessageSent: ()=>{
                    var _a;
                    this.messagesSent += 1;
                    this.lastMessageSentTimestamp = new Date();
                    (_a = subchannelCallStatsTracker.addMessageSent) === null || _a === void 0 ? void 0 : _a.call(subchannelCallStatsTracker);
                },
                addMessageReceived: ()=>{
                    var _a;
                    this.messagesReceived += 1;
                    this.lastMessageReceivedTimestamp = new Date();
                    (_a = subchannelCallStatsTracker.addMessageReceived) === null || _a === void 0 ? void 0 : _a.call(subchannelCallStatsTracker);
                },
                onCallEnd: (status)=>{
                    var _a;
                    (_a = subchannelCallStatsTracker.onCallEnd) === null || _a === void 0 ? void 0 : _a.call(subchannelCallStatsTracker, status);
                    this.removeActiveCall(call);
                },
                onStreamEnd: (success)=>{
                    var _a;
                    if (success) {
                        this.streamTracker.addCallSucceeded();
                    } else {
                        this.streamTracker.addCallFailed();
                    }
                    (_a = subchannelCallStatsTracker.onStreamEnd) === null || _a === void 0 ? void 0 : _a.call(subchannelCallStatsTracker, success);
                }
            };
        } else {
            eventTracker = {
                addMessageSent: ()=>{
                    var _a;
                    (_a = subchannelCallStatsTracker.addMessageSent) === null || _a === void 0 ? void 0 : _a.call(subchannelCallStatsTracker);
                },
                addMessageReceived: ()=>{
                    var _a;
                    (_a = subchannelCallStatsTracker.addMessageReceived) === null || _a === void 0 ? void 0 : _a.call(subchannelCallStatsTracker);
                },
                onCallEnd: (status)=>{
                    var _a;
                    (_a = subchannelCallStatsTracker.onCallEnd) === null || _a === void 0 ? void 0 : _a.call(subchannelCallStatsTracker, status);
                    this.removeActiveCall(call);
                },
                onStreamEnd: (success)=>{
                    var _a;
                    (_a = subchannelCallStatsTracker.onStreamEnd) === null || _a === void 0 ? void 0 : _a.call(subchannelCallStatsTracker, success);
                }
            };
        }
        call = new subchannel_call_1.Http2SubchannelCall(http2Stream, eventTracker, listener, this, (0, call_number_1.getNextCallNumber)());
        this.addActiveCall(call);
        return call;
    }
    getChannelzRef() {
        return this.channelzRef;
    }
    getPeerName() {
        return this.subchannelAddressString;
    }
    shutdown() {
        this.session.close();
        (0, channelz_1.unregisterChannelzRef)(this.channelzRef);
    }
}
class Http2SubchannelConnector {
    constructor(channelTarget){
        this.channelTarget = channelTarget;
        this.session = null;
        this.isShutdown = false;
    }
    trace(text) {}
    createSession(address, credentials, options, proxyConnectionResult) {
        if (this.isShutdown) {
            return Promise.reject();
        }
        return new Promise((resolve, reject)=>{
            var _a, _b, _c;
            let remoteName;
            if (proxyConnectionResult.realTarget) {
                remoteName = (0, uri_parser_1.uriToString)(proxyConnectionResult.realTarget);
                this.trace("creating HTTP/2 session through proxy to " + (0, uri_parser_1.uriToString)(proxyConnectionResult.realTarget));
            } else {
                remoteName = null;
                this.trace("creating HTTP/2 session to " + (0, subchannel_address_1.subchannelAddressToString)(address));
            }
            const targetAuthority = (0, resolver_1.getDefaultAuthority)((_a = proxyConnectionResult.realTarget) !== null && _a !== void 0 ? _a : this.channelTarget);
            let connectionOptions = credentials._getConnectionOptions() || {};
            connectionOptions.maxSendHeaderBlockLength = Number.MAX_SAFE_INTEGER;
            if ("grpc-node.max_session_memory" in options) {
                connectionOptions.maxSessionMemory = options["grpc-node.max_session_memory"];
            } else {
                /* By default, set a very large max session memory limit, to effectively
                 * disable enforcement of the limit. Some testing indicates that Node's
                 * behavior degrades badly when this limit is reached, so we solve that
                 * by disabling the check entirely. */ connectionOptions.maxSessionMemory = Number.MAX_SAFE_INTEGER;
            }
            let addressScheme = "http://";
            if ("secureContext" in connectionOptions) {
                addressScheme = "https://";
                // If provided, the value of grpc.ssl_target_name_override should be used
                // to override the target hostname when checking server identity.
                // This option is used for testing only.
                if (options["grpc.ssl_target_name_override"]) {
                    const sslTargetNameOverride = options["grpc.ssl_target_name_override"];
                    connectionOptions.checkServerIdentity = (host, cert)=>{
                        return (0, tls_1.checkServerIdentity)(sslTargetNameOverride, cert);
                    };
                    connectionOptions.servername = sslTargetNameOverride;
                } else {
                    const authorityHostname = (_c = (_b = (0, uri_parser_1.splitHostPort)(targetAuthority)) === null || _b === void 0 ? void 0 : _b.host) !== null && _c !== void 0 ? _c : "localhost";
                    // We want to always set servername to support SNI
                    connectionOptions.servername = authorityHostname;
                }
                if (proxyConnectionResult.socket) {
                    /* This is part of the workaround for
                     * https://github.com/nodejs/node/issues/32922. Without that bug,
                     * proxyConnectionResult.socket would always be a plaintext socket and
                     * this would say
                     * connectionOptions.socket = proxyConnectionResult.socket; */ connectionOptions.createConnection = (authority, option)=>{
                        return proxyConnectionResult.socket;
                    };
                }
            } else {
                /* In all but the most recent versions of Node, http2.connect does not use
                 * the options when establishing plaintext connections, so we need to
                 * establish that connection explicitly. */ connectionOptions.createConnection = (authority, option)=>{
                    if (proxyConnectionResult.socket) {
                        return proxyConnectionResult.socket;
                    } else {
                        /* net.NetConnectOpts is declared in a way that is more restrictive
                         * than what net.connect will actually accept, so we use the type
                         * assertion to work around that. */ return net.connect(address);
                    }
                };
            }
            connectionOptions = Object.assign(Object.assign({}, connectionOptions), address);
            /* http2.connect uses the options here:
             * https://github.com/nodejs/node/blob/70c32a6d190e2b5d7b9ff9d5b6a459d14e8b7d59/lib/internal/http2/core.js#L3028-L3036
             * The spread operator overides earlier values with later ones, so any port
             * or host values in the options will be used rather than any values extracted
             * from the first argument. In addition, the path overrides the host and port,
             * as documented for plaintext connections here:
             * https://nodejs.org/api/net.html#net_socket_connect_options_connectlistener
             * and for TLS connections here:
             * https://nodejs.org/api/tls.html#tls_tls_connect_options_callback. In
             * earlier versions of Node, http2.connect passes these options to
             * tls.connect but not net.connect, so in the insecure case we still need
             * to set the createConnection option above to create the connection
             * explicitly. We cannot do that in the TLS case because http2.connect
             * passes necessary additional options to tls.connect.
             * The first argument just needs to be parseable as a URL and the scheme
             * determines whether the connection will be established over TLS or not.
             */ const session = http2.connect(addressScheme + targetAuthority, connectionOptions);
            this.session = session;
            session.unref();
            session.once("connect", ()=>{
                session.removeAllListeners();
                resolve(new Http2Transport(session, address, options));
                this.session = null;
            });
            session.once("close", ()=>{
                this.session = null;
                reject();
            });
            session.once("error", (error)=>{
                this.trace("connection failed with error " + error.message);
            });
        });
    }
    connect(address, credentials, options) {
        var _a, _b;
        if (this.isShutdown) {
            return Promise.reject();
        }
        /* Pass connection options through to the proxy so that it's able to
         * upgrade it's connection to support tls if needed.
         * This is a workaround for https://github.com/nodejs/node/issues/32922
         * See https://github.com/grpc/grpc-node/pull/1369 for more info. */ const connectionOptions = credentials._getConnectionOptions() || {};
        if ("secureContext" in connectionOptions) {
            connectionOptions.ALPNProtocols = [
                "h2"
            ];
            // If provided, the value of grpc.ssl_target_name_override should be used
            // to override the target hostname when checking server identity.
            // This option is used for testing only.
            if (options["grpc.ssl_target_name_override"]) {
                const sslTargetNameOverride = options["grpc.ssl_target_name_override"];
                connectionOptions.checkServerIdentity = (host, cert)=>{
                    return (0, tls_1.checkServerIdentity)(sslTargetNameOverride, cert);
                };
                connectionOptions.servername = sslTargetNameOverride;
            } else {
                if ("grpc.http_connect_target" in options) {
                    /* This is more or less how servername will be set in createSession
                     * if a connection is successfully established through the proxy.
                     * If the proxy is not used, these connectionOptions are discarded
                     * anyway */ const targetPath = (0, resolver_1.getDefaultAuthority)((_a = (0, uri_parser_1.parseUri)(options["grpc.http_connect_target"])) !== null && _a !== void 0 ? _a : {
                        path: "localhost"
                    });
                    const hostPort = (0, uri_parser_1.splitHostPort)(targetPath);
                    connectionOptions.servername = (_b = hostPort === null || hostPort === void 0 ? void 0 : hostPort.host) !== null && _b !== void 0 ? _b : targetPath;
                }
            }
        }
        return (0, http_proxy_1.getProxiedConnection)(address, options, connectionOptions).then((result)=>this.createSession(address, credentials, options, result));
    }
    shutdown() {
        var _a;
        this.isShutdown = true;
        (_a = this.session) === null || _a === void 0 ? void 0 : _a.close();
        this.session = null;
    }
}
exports.Http2SubchannelConnector = Http2SubchannelConnector; //# sourceMappingURL=transport.js.map


/***/ }),

/***/ 35193:
/***/ ((__unused_webpack_module, exports) => {


/*
 * Copyright 2020 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.uriToString = exports.splitHostPort = exports.parseUri = void 0;
/*
 * The groups correspond to URI parts as follows:
 * 1. scheme
 * 2. authority
 * 3. path
 */ const URI_REGEX = /^(?:([A-Za-z0-9+.-]+):)?(?:\/\/([^/]*)\/)?(.+)$/;
function parseUri(uriString) {
    const parsedUri = URI_REGEX.exec(uriString);
    if (parsedUri === null) {
        return null;
    }
    return {
        scheme: parsedUri[1],
        authority: parsedUri[2],
        path: parsedUri[3]
    };
}
exports.parseUri = parseUri;
const NUMBER_REGEX = /^\d+$/;
function splitHostPort(path) {
    if (path.startsWith("[")) {
        const hostEnd = path.indexOf("]");
        if (hostEnd === -1) {
            return null;
        }
        const host = path.substring(1, hostEnd);
        /* Only an IPv6 address should be in bracketed notation, and an IPv6
         * address should have at least one colon */ if (host.indexOf(":") === -1) {
            return null;
        }
        if (path.length > hostEnd + 1) {
            if (path[hostEnd + 1] === ":") {
                const portString = path.substring(hostEnd + 2);
                if (NUMBER_REGEX.test(portString)) {
                    return {
                        host: host,
                        port: +portString
                    };
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } else {
            return {
                host
            };
        }
    } else {
        const splitPath = path.split(":");
        /* Exactly one colon means that this is host:port. Zero colons means that
         * there is no port. And multiple colons means that this is a bare IPv6
         * address with no port */ if (splitPath.length === 2) {
            if (NUMBER_REGEX.test(splitPath[1])) {
                return {
                    host: splitPath[0],
                    port: +splitPath[1]
                };
            } else {
                return null;
            }
        } else {
            return {
                host: path
            };
        }
    }
}
exports.splitHostPort = splitHostPort;
function uriToString(uri) {
    let result = "";
    if (uri.scheme !== undefined) {
        result += uri.scheme + ":";
    }
    if (uri.authority !== undefined) {
        result += "//" + uri.authority + "/";
    }
    result += uri.path;
    return result;
}
exports.uriToString = uriToString; //# sourceMappingURL=uri-parser.js.map


/***/ }),

/***/ 92856:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;

/**
 * @license
 * Copyright 2018 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ __webpack_unused_export__ = ({
    value: true
});
__webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = exports.J_ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = void 0;
const camelCase = __webpack_require__(84961);
const Protobuf = __webpack_require__(12206);
const descriptor = __webpack_require__(78684);
const util_1 = __webpack_require__(95799);
const Long = __webpack_require__(51144);
__webpack_unused_export__ = Long;
function isAnyExtension(obj) {
    return "@type" in obj && typeof obj["@type"] === "string";
}
__webpack_unused_export__ = isAnyExtension;
const descriptorOptions = {
    longs: String,
    enums: String,
    bytes: String,
    defaults: true,
    oneofs: true,
    json: true
};
function joinName(baseName, name) {
    if (baseName === "") {
        return name;
    } else {
        return baseName + "." + name;
    }
}
function isHandledReflectionObject(obj) {
    return obj instanceof Protobuf.Service || obj instanceof Protobuf.Type || obj instanceof Protobuf.Enum;
}
function isNamespaceBase(obj) {
    return obj instanceof Protobuf.Namespace || obj instanceof Protobuf.Root;
}
function getAllHandledReflectionObjects(obj, parentName) {
    const objName = joinName(parentName, obj.name);
    if (isHandledReflectionObject(obj)) {
        return [
            [
                objName,
                obj
            ]
        ];
    } else {
        if (isNamespaceBase(obj) && typeof obj.nested !== "undefined") {
            return Object.keys(obj.nested).map((name)=>{
                return getAllHandledReflectionObjects(obj.nested[name], objName);
            }).reduce((accumulator, currentValue)=>accumulator.concat(currentValue), []);
        }
    }
    return [];
}
function createDeserializer(cls, options) {
    return function deserialize(argBuf) {
        return cls.toObject(cls.decode(argBuf), options);
    };
}
function createSerializer(cls) {
    return function serialize(arg) {
        if (Array.isArray(arg)) {
            throw new Error(`Failed to serialize message: expected object with ${cls.name} structure, got array instead`);
        }
        const message = cls.fromObject(arg);
        return cls.encode(message).finish();
    };
}
function createMethodDefinition(method, serviceName, options, fileDescriptors) {
    /* This is only ever called after the corresponding root.resolveAll(), so we
     * can assume that the resolved request and response types are non-null */ const requestType = method.resolvedRequestType;
    const responseType = method.resolvedResponseType;
    return {
        path: "/" + serviceName + "/" + method.name,
        requestStream: !!method.requestStream,
        responseStream: !!method.responseStream,
        requestSerialize: createSerializer(requestType),
        requestDeserialize: createDeserializer(requestType, options),
        responseSerialize: createSerializer(responseType),
        responseDeserialize: createDeserializer(responseType, options),
        // TODO(murgatroid99): Find a better way to handle this
        originalName: camelCase(method.name),
        requestType: createMessageDefinition(requestType, fileDescriptors),
        responseType: createMessageDefinition(responseType, fileDescriptors)
    };
}
function createServiceDefinition(service, name, options, fileDescriptors) {
    const def = {};
    for (const method of service.methodsArray){
        def[method.name] = createMethodDefinition(method, name, options, fileDescriptors);
    }
    return def;
}
function createMessageDefinition(message, fileDescriptors) {
    const messageDescriptor = message.toDescriptor("proto3");
    return {
        format: "Protocol Buffer 3 DescriptorProto",
        type: messageDescriptor.$type.toObject(messageDescriptor, descriptorOptions),
        fileDescriptorProtos: fileDescriptors
    };
}
function createEnumDefinition(enumType, fileDescriptors) {
    const enumDescriptor = enumType.toDescriptor("proto3");
    return {
        format: "Protocol Buffer 3 EnumDescriptorProto",
        type: enumDescriptor.$type.toObject(enumDescriptor, descriptorOptions),
        fileDescriptorProtos: fileDescriptors
    };
}
/**
 * function createDefinition(obj: Protobuf.Service, name: string, options:
 * Options): ServiceDefinition; function createDefinition(obj: Protobuf.Type,
 * name: string, options: Options): MessageTypeDefinition; function
 * createDefinition(obj: Protobuf.Enum, name: string, options: Options):
 * EnumTypeDefinition;
 */ function createDefinition(obj, name, options, fileDescriptors) {
    if (obj instanceof Protobuf.Service) {
        return createServiceDefinition(obj, name, options, fileDescriptors);
    } else if (obj instanceof Protobuf.Type) {
        return createMessageDefinition(obj, fileDescriptors);
    } else if (obj instanceof Protobuf.Enum) {
        return createEnumDefinition(obj, fileDescriptors);
    } else {
        throw new Error("Type mismatch in reflection object handling");
    }
}
function createPackageDefinition(root, options) {
    const def = {};
    root.resolveAll();
    const descriptorList = root.toDescriptor("proto3").file;
    const bufferList = descriptorList.map((value)=>Buffer.from(descriptor.FileDescriptorProto.encode(value).finish()));
    for (const [name, obj] of getAllHandledReflectionObjects(root, "")){
        def[name] = createDefinition(obj, name, options, bufferList);
    }
    return def;
}
function createPackageDefinitionFromDescriptorSet(decodedDescriptorSet, options) {
    options = options || {};
    const root = Protobuf.Root.fromDescriptor(decodedDescriptorSet);
    root.resolveAll();
    return createPackageDefinition(root, options);
}
/**
 * Load a .proto file with the specified options.
 * @param filename One or multiple file paths to load. Can be an absolute path
 *     or relative to an include path.
 * @param options.keepCase Preserve field names. The default is to change them
 *     to camel case.
 * @param options.longs The type that should be used to represent `long` values.
 *     Valid options are `Number` and `String`. Defaults to a `Long` object type
 *     from a library.
 * @param options.enums The type that should be used to represent `enum` values.
 *     The only valid option is `String`. Defaults to the numeric value.
 * @param options.bytes The type that should be used to represent `bytes`
 *     values. Valid options are `Array` and `String`. The default is to use
 *     `Buffer`.
 * @param options.defaults Set default values on output objects. Defaults to
 *     `false`.
 * @param options.arrays Set empty arrays for missing array values even if
 *     `defaults` is `false`. Defaults to `false`.
 * @param options.objects Set empty objects for missing object values even if
 *     `defaults` is `false`. Defaults to `false`.
 * @param options.oneofs Set virtual oneof properties to the present field's
 *     name
 * @param options.json Represent Infinity and NaN as strings in float fields,
 *     and automatically decode google.protobuf.Any values.
 * @param options.includeDirs Paths to search for imported `.proto` files.
 */ function load(filename, options) {
    return (0, util_1.loadProtosWithOptions)(filename, options).then((loadedRoot)=>{
        return createPackageDefinition(loadedRoot, options);
    });
}
__webpack_unused_export__ = load;
function loadSync(filename, options) {
    const loadedRoot = (0, util_1.loadProtosWithOptionsSync)(filename, options);
    return createPackageDefinition(loadedRoot, options);
}
exports.J_ = loadSync;
function fromJSON(json, options) {
    options = options || {};
    const loadedRoot = Protobuf.Root.fromJSON(json);
    loadedRoot.resolveAll();
    return createPackageDefinition(loadedRoot, options);
}
__webpack_unused_export__ = fromJSON;
function loadFileDescriptorSetFromBuffer(descriptorSet, options) {
    const decodedDescriptorSet = descriptor.FileDescriptorSet.decode(descriptorSet);
    return createPackageDefinitionFromDescriptorSet(decodedDescriptorSet, options);
}
__webpack_unused_export__ = loadFileDescriptorSetFromBuffer;
function loadFileDescriptorSetFromObject(descriptorSet, options) {
    const decodedDescriptorSet = descriptor.FileDescriptorSet.fromObject(descriptorSet);
    return createPackageDefinitionFromDescriptorSet(decodedDescriptorSet, options);
}
__webpack_unused_export__ = loadFileDescriptorSetFromObject;
(0, util_1.addCommonProtos)(); //# sourceMappingURL=index.js.map


/***/ }),

/***/ 95799:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * @license
 * Copyright 2018 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */ Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.addCommonProtos = exports.loadProtosWithOptionsSync = exports.loadProtosWithOptions = void 0;
const fs = __webpack_require__(57147);
const path = __webpack_require__(71017);
const Protobuf = __webpack_require__(12206);
function addIncludePathResolver(root, includePaths) {
    const originalResolvePath = root.resolvePath;
    root.resolvePath = (origin, target)=>{
        if (path.isAbsolute(target)) {
            return target;
        }
        for (const directory of includePaths){
            const fullPath = path.join(directory, target);
            try {
                fs.accessSync(fullPath, fs.constants.R_OK);
                return fullPath;
            } catch (err) {
                continue;
            }
        }
        process.emitWarning(`${target} not found in any of the include paths ${includePaths}`);
        return originalResolvePath(origin, target);
    };
}
async function loadProtosWithOptions(filename, options) {
    const root = new Protobuf.Root();
    options = options || {};
    if (!!options.includeDirs) {
        if (!Array.isArray(options.includeDirs)) {
            return Promise.reject(new Error("The includeDirs option must be an array"));
        }
        addIncludePathResolver(root, options.includeDirs);
    }
    const loadedRoot = await root.load(filename, options);
    loadedRoot.resolveAll();
    return loadedRoot;
}
exports.loadProtosWithOptions = loadProtosWithOptions;
function loadProtosWithOptionsSync(filename, options) {
    const root = new Protobuf.Root();
    options = options || {};
    if (!!options.includeDirs) {
        if (!Array.isArray(options.includeDirs)) {
            throw new Error("The includeDirs option must be an array");
        }
        addIncludePathResolver(root, options.includeDirs);
    }
    const loadedRoot = root.loadSync(filename, options);
    loadedRoot.resolveAll();
    return loadedRoot;
}
exports.loadProtosWithOptionsSync = loadProtosWithOptionsSync;
/**
 * Load Google's well-known proto files that aren't exposed by Protobuf.js.
 */ function addCommonProtos() {
    // Protobuf.js exposes: any, duration, empty, field_mask, struct, timestamp,
    // and wrappers. compiler/plugin is excluded in Protobuf.js and here.
    // Using constant strings for compatibility with tools like Webpack
    const apiDescriptor = __webpack_require__(27112);
    const descriptorDescriptor = __webpack_require__(24497);
    const sourceContextDescriptor = __webpack_require__(68874);
    const typeDescriptor = __webpack_require__(19928);
    Protobuf.common("api", apiDescriptor.nested.google.nested.protobuf.nested);
    Protobuf.common("descriptor", descriptorDescriptor.nested.google.nested.protobuf.nested);
    Protobuf.common("source_context", sourceContextDescriptor.nested.google.nested.protobuf.nested);
    Protobuf.common("type", typeDescriptor.nested.google.nested.protobuf.nested);
}
exports.addCommonProtos = addCommonProtos; //# sourceMappingURL=util.js.map


/***/ }),

/***/ 59094:
/***/ ((module) => {


module.exports = asPromise;
/**
 * Callback as used by {@link util.asPromise}.
 * @typedef asPromiseCallback
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {...*} params Additional arguments
 * @returns {undefined}
 */ /**
 * Returns a promise from a node-style callback function.
 * @memberof util
 * @param {asPromiseCallback} fn Function to call
 * @param {*} ctx Function context
 * @param {...*} params Function arguments
 * @returns {Promise<*>} Promisified function
 */ function asPromise(fn, ctx /*, varargs */ ) {
    var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
    while(index < arguments.length)params[offset++] = arguments[index++];
    return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err /*, varargs */ ) {
            if (pending) {
                pending = false;
                if (err) reject(err);
                else {
                    var params = new Array(arguments.length - 1), offset = 0;
                    while(offset < params.length)params[offset++] = arguments[offset];
                    resolve.apply(null, params);
                }
            }
        };
        try {
            fn.apply(ctx || null, params);
        } catch (err) {
            if (pending) {
                pending = false;
                reject(err);
            }
        }
    });
}


/***/ }),

/***/ 29934:
/***/ ((__unused_webpack_module, exports) => {


/**
 * A minimal base64 implementation for number arrays.
 * @memberof util
 * @namespace
 */ var base64 = exports;
/**
 * Calculates the byte length of a base64 encoded string.
 * @param {string} string Base64 encoded string
 * @returns {number} Byte length
 */ base64.length = function length(string) {
    var p = string.length;
    if (!p) return 0;
    var n = 0;
    while(--p % 4 > 1 && string.charAt(p) === "=")++n;
    return Math.ceil(string.length * 3) / 4 - n;
};
// Base64 encoding table
var b64 = new Array(64);
// Base64 decoding table
var s64 = new Array(123);
// 65..90, 97..122, 48..57, 43, 47
for(var i = 0; i < 64;)s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
/**
 * Encodes a buffer to a base64 encoded string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} Base64 encoded string
 */ base64.encode = function encode(buffer, start, end) {
    var parts = null, chunk = [];
    var i = 0, j = 0, t; // temporary
    while(start < end){
        var b = buffer[start++];
        switch(j){
            case 0:
                chunk[i++] = b64[b >> 2];
                t = (b & 3) << 4;
                j = 1;
                break;
            case 1:
                chunk[i++] = b64[t | b >> 4];
                t = (b & 15) << 2;
                j = 2;
                break;
            case 2:
                chunk[i++] = b64[t | b >> 6];
                chunk[i++] = b64[b & 63];
                j = 0;
                break;
        }
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (j) {
        chunk[i++] = b64[t];
        chunk[i++] = 61;
        if (j === 1) chunk[i++] = 61;
    }
    if (parts) {
        if (i) parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};
var invalidEncoding = "invalid encoding";
/**
 * Decodes a base64 encoded string to a buffer.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Number of bytes written
 * @throws {Error} If encoding is invalid
 */ base64.decode = function decode(string, buffer, offset) {
    var start = offset;
    var j = 0, t; // temporary
    for(var i = 0; i < string.length;){
        var c = string.charCodeAt(i++);
        if (c === 61 && j > 1) break;
        if ((c = s64[c]) === undefined) throw Error(invalidEncoding);
        switch(j){
            case 0:
                t = c;
                j = 1;
                break;
            case 1:
                buffer[offset++] = t << 2 | (c & 48) >> 4;
                t = c;
                j = 2;
                break;
            case 2:
                buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
                t = c;
                j = 3;
                break;
            case 3:
                buffer[offset++] = (t & 3) << 6 | c;
                j = 0;
                break;
        }
    }
    if (j === 1) throw Error(invalidEncoding);
    return offset - start;
};
/**
 * Tests if the specified string appears to be base64 encoded.
 * @param {string} string String to test
 * @returns {boolean} `true` if probably base64 encoded, otherwise false
 */ base64.test = function test(string) {
    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
};


/***/ }),

/***/ 88591:
/***/ ((module) => {


module.exports = codegen;
/**
 * Begins generating a function.
 * @memberof util
 * @param {string[]} functionParams Function parameter names
 * @param {string} [functionName] Function name if not anonymous
 * @returns {Codegen} Appender that appends code to the function's body
 */ function codegen(functionParams, functionName) {
    /* istanbul ignore if */ if (typeof functionParams === "string") {
        functionName = functionParams;
        functionParams = undefined;
    }
    var body = [];
    /**
     * Appends code to the function's body or finishes generation.
     * @typedef Codegen
     * @type {function}
     * @param {string|Object.<string,*>} [formatStringOrScope] Format string or, to finish the function, an object of additional scope variables, if any
     * @param {...*} [formatParams] Format parameters
     * @returns {Codegen|Function} Itself or the generated function if finished
     * @throws {Error} If format parameter counts do not match
     */ function Codegen(formatStringOrScope) {
        // note that explicit array handling below makes this ~50% faster
        // finish the function
        if (typeof formatStringOrScope !== "string") {
            var source = toString();
            if (codegen.verbose) console.log("codegen: " + source); // eslint-disable-line no-console
            source = "return " + source;
            if (formatStringOrScope) {
                var scopeKeys = Object.keys(formatStringOrScope), scopeParams = new Array(scopeKeys.length + 1), scopeValues = new Array(scopeKeys.length), scopeOffset = 0;
                while(scopeOffset < scopeKeys.length){
                    scopeParams[scopeOffset] = scopeKeys[scopeOffset];
                    scopeValues[scopeOffset] = formatStringOrScope[scopeKeys[scopeOffset++]];
                }
                scopeParams[scopeOffset] = source;
                return Function.apply(null, scopeParams).apply(null, scopeValues); // eslint-disable-line no-new-func
            }
            return Function(source)(); // eslint-disable-line no-new-func
        }
        // otherwise append to body
        var formatParams = new Array(arguments.length - 1), formatOffset = 0;
        while(formatOffset < formatParams.length)formatParams[formatOffset] = arguments[++formatOffset];
        formatOffset = 0;
        formatStringOrScope = formatStringOrScope.replace(/%([%dfijs])/g, function replace($0, $1) {
            var value = formatParams[formatOffset++];
            switch($1){
                case "d":
                case "f":
                    return String(Number(value));
                case "i":
                    return String(Math.floor(value));
                case "j":
                    return JSON.stringify(value);
                case "s":
                    return String(value);
            }
            return "%";
        });
        if (formatOffset !== formatParams.length) throw Error("parameter count mismatch");
        body.push(formatStringOrScope);
        return Codegen;
    }
    function toString(functionNameOverride) {
        return "function " + (functionNameOverride || functionName || "") + "(" + (functionParams && functionParams.join(",") || "") + "){\n  " + body.join("\n  ") + "\n}";
    }
    Codegen.toString = toString;
    return Codegen;
}
/**
 * Begins generating a function.
 * @memberof util
 * @function codegen
 * @param {string} [functionName] Function name if not anonymous
 * @returns {Codegen} Appender that appends code to the function's body
 * @variation 2
 */ /**
 * When set to `true`, codegen will log generated code to console. Useful for debugging.
 * @name util.codegen.verbose
 * @type {boolean}
 */ codegen.verbose = false;


/***/ }),

/***/ 19714:
/***/ ((module) => {


module.exports = EventEmitter;
/**
 * Constructs a new event emitter instance.
 * @classdesc A minimal event emitter.
 * @memberof util
 * @constructor
 */ function EventEmitter() {
    /**
     * Registered listeners.
     * @type {Object.<string,*>}
     * @private
     */ this._listeners = {};
}
/**
 * Registers an event listener.
 * @param {string} evt Event name
 * @param {function} fn Listener
 * @param {*} [ctx] Listener context
 * @returns {util.EventEmitter} `this`
 */ EventEmitter.prototype.on = function on(evt, fn, ctx) {
    (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn: fn,
        ctx: ctx || this
    });
    return this;
};
/**
 * Removes an event listener or any matching listeners if arguments are omitted.
 * @param {string} [evt] Event name. Removes all listeners if omitted.
 * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
 * @returns {util.EventEmitter} `this`
 */ EventEmitter.prototype.off = function off(evt, fn) {
    if (evt === undefined) this._listeners = {};
    else {
        if (fn === undefined) this._listeners[evt] = [];
        else {
            var listeners = this._listeners[evt];
            for(var i = 0; i < listeners.length;)if (listeners[i].fn === fn) listeners.splice(i, 1);
            else ++i;
        }
    }
    return this;
};
/**
 * Emits an event by calling its listeners with the specified arguments.
 * @param {string} evt Event name
 * @param {...*} args Arguments
 * @returns {util.EventEmitter} `this`
 */ EventEmitter.prototype.emit = function emit(evt) {
    var listeners = this._listeners[evt];
    if (listeners) {
        var args = [], i = 1;
        for(; i < arguments.length;)args.push(arguments[i++]);
        for(i = 0; i < listeners.length;)listeners[i].fn.apply(listeners[i++].ctx, args);
    }
    return this;
};


/***/ }),

/***/ 59654:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = fetch;
var asPromise = __webpack_require__(59094), inquire = __webpack_require__(16649);
var fs = inquire("fs");
/**
 * Node-style callback as used by {@link util.fetch}.
 * @typedef FetchCallback
 * @type {function}
 * @param {?Error} error Error, if any, otherwise `null`
 * @param {string} [contents] File contents, if there hasn't been an error
 * @returns {undefined}
 */ /**
 * Options as used by {@link util.fetch}.
 * @typedef FetchOptions
 * @type {Object}
 * @property {boolean} [binary=false] Whether expecting a binary response
 * @property {boolean} [xhr=false] If `true`, forces the use of XMLHttpRequest
 */ /**
 * Fetches the contents of a file.
 * @memberof util
 * @param {string} filename File path or url
 * @param {FetchOptions} options Fetch options
 * @param {FetchCallback} callback Callback function
 * @returns {undefined}
 */ function fetch(filename, options, callback) {
    if (typeof options === "function") {
        callback = options;
        options = {};
    } else if (!options) options = {};
    if (!callback) return asPromise(fetch, this, filename, options); // eslint-disable-line no-invalid-this
    // if a node-like filesystem is present, try it first but fall back to XHR if nothing is found.
    if (!options.xhr && fs && fs.readFile) return fs.readFile(filename, function fetchReadFileCallback(err, contents) {
        return err && typeof XMLHttpRequest !== "undefined" ? fetch.xhr(filename, options, callback) : err ? callback(err) : callback(null, options.binary ? contents : contents.toString("utf8"));
    });
    // use the XHR version otherwise.
    return fetch.xhr(filename, options, callback);
}
/**
 * Fetches the contents of a file.
 * @name util.fetch
 * @function
 * @param {string} path File path or url
 * @param {FetchCallback} callback Callback function
 * @returns {undefined}
 * @variation 2
 */ /**
 * Fetches the contents of a file.
 * @name util.fetch
 * @function
 * @param {string} path File path or url
 * @param {FetchOptions} [options] Fetch options
 * @returns {Promise<string|Uint8Array>} Promise
 * @variation 3
 */ /**/ fetch.xhr = function fetch_xhr(filename, options, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange /* works everywhere */  = function fetchOnReadyStateChange() {
        if (xhr.readyState !== 4) return undefined;
        // local cors security errors return status 0 / empty string, too. afaik this cannot be
        // reliably distinguished from an actually empty file for security reasons. feel free
        // to send a pull request if you are aware of a solution.
        if (xhr.status !== 0 && xhr.status !== 200) return callback(Error("status " + xhr.status));
        // if binary data is expected, make sure that some sort of array is returned, even if
        // ArrayBuffers are not supported. the binary string fallback, however, is unsafe.
        if (options.binary) {
            var buffer = xhr.response;
            if (!buffer) {
                buffer = [];
                for(var i = 0; i < xhr.responseText.length; ++i)buffer.push(xhr.responseText.charCodeAt(i) & 255);
            }
            return callback(null, typeof Uint8Array !== "undefined" ? new Uint8Array(buffer) : buffer);
        }
        return callback(null, xhr.responseText);
    };
    if (options.binary) {
        // ref: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data#Receiving_binary_data_in_older_browsers
        if ("overrideMimeType" in xhr) xhr.overrideMimeType("text/plain; charset=x-user-defined");
        xhr.responseType = "arraybuffer";
    }
    xhr.open("GET", filename);
    xhr.send();
};


/***/ }),

/***/ 43498:
/***/ ((module) => {


module.exports = factory(factory);
/**
 * Reads / writes floats / doubles from / to buffers.
 * @name util.float
 * @namespace
 */ /**
 * Writes a 32 bit float to a buffer using little endian byte order.
 * @name util.float.writeFloatLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */ /**
 * Writes a 32 bit float to a buffer using big endian byte order.
 * @name util.float.writeFloatBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */ /**
 * Reads a 32 bit float from a buffer using little endian byte order.
 * @name util.float.readFloatLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */ /**
 * Reads a 32 bit float from a buffer using big endian byte order.
 * @name util.float.readFloatBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */ /**
 * Writes a 64 bit double to a buffer using little endian byte order.
 * @name util.float.writeDoubleLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */ /**
 * Writes a 64 bit double to a buffer using big endian byte order.
 * @name util.float.writeDoubleBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */ /**
 * Reads a 64 bit double from a buffer using little endian byte order.
 * @name util.float.readDoubleLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */ /**
 * Reads a 64 bit double from a buffer using big endian byte order.
 * @name util.float.readDoubleBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */ // Factory function for the purpose of node-based testing in modified global environments
function factory(exports) {
    // float: typed array
    if (typeof Float32Array !== "undefined") (function() {
        var f32 = new Float32Array([
            -0
        ]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
        function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
        }
        function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
        }
        /* istanbul ignore next */ exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
        /* istanbul ignore next */ exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
        function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
        }
        function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
        }
        /* istanbul ignore next */ exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
        /* istanbul ignore next */ exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
    // float: ieee754
    })();
    else (function() {
        function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign) val = -val;
            if (val === 0) writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos);
            else if (isNaN(val)) writeUint(2143289344, buf, pos);
            else if (val > 3.4028234663852886e+38) writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 1.1754943508222875e-38) writeUint((sign << 31 | Math.round(val / 1.401298464324817e-45)) >>> 0, buf, pos);
            else {
                var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
                writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
        }
        exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
        exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
        function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 // denormal
             ? sign * 1.401298464324817e-45 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
        }
        exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
        exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
    })();
    // double: typed array
    if (typeof Float64Array !== "undefined") (function() {
        var f64 = new Float64Array([
            -0
        ]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
        function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
        }
        function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
        }
        /* istanbul ignore next */ exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
        /* istanbul ignore next */ exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
        function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
        }
        function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
        }
        /* istanbul ignore next */ exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
        /* istanbul ignore next */ exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
    // double: ieee754
    })();
    else (function() {
        function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign) val = -val;
            if (val === 0) {
                writeUint(0, buf, pos + off0);
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
                writeUint(0, buf, pos + off0);
                writeUint(2146959360, buf, pos + off1);
            } else if (val > 1.7976931348623157e+308) {
                writeUint(0, buf, pos + off0);
                writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
                var mantissa;
                if (val < 2.2250738585072014e-308) {
                    mantissa = val / 5e-324;
                    writeUint(mantissa >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
                } else {
                    var exponent = Math.floor(Math.log(val) / Math.LN2);
                    if (exponent === 1024) exponent = 1023;
                    mantissa = val * Math.pow(2, -exponent);
                    writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
                }
            }
        }
        exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
        exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
        function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 // denormal
             ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
        }
        exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
        exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
    })();
    return exports;
}
// uint helpers
function writeUintLE(val, buf, pos) {
    buf[pos] = val & 255;
    buf[pos + 1] = val >>> 8 & 255;
    buf[pos + 2] = val >>> 16 & 255;
    buf[pos + 3] = val >>> 24;
}
function writeUintBE(val, buf, pos) {
    buf[pos] = val >>> 24;
    buf[pos + 1] = val >>> 16 & 255;
    buf[pos + 2] = val >>> 8 & 255;
    buf[pos + 3] = val & 255;
}
function readUintLE(buf, pos) {
    return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
}
function readUintBE(buf, pos) {
    return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
}


/***/ }),

/***/ 16649:
/***/ ((module) => {


module.exports = inquire;
/**
 * Requires a module only if available.
 * @memberof util
 * @param {string} moduleName Module to require
 * @returns {?Object} Required module if available and not empty, otherwise `null`
 */ function inquire(moduleName) {
    try {
        var mod = eval("quire".replace(/^/, "re"))(moduleName); // eslint-disable-line no-eval
        if (mod && (mod.length || Object.keys(mod).length)) return mod;
    } catch (e) {} // eslint-disable-line no-empty
    return null;
}


/***/ }),

/***/ 4743:
/***/ ((__unused_webpack_module, exports) => {


/**
 * A minimal path module to resolve Unix, Windows and URL paths alike.
 * @memberof util
 * @namespace
 */ var path = exports;
var isAbsolute = /**
 * Tests if the specified path is absolute.
 * @param {string} path Path to test
 * @returns {boolean} `true` if path is absolute
 */ path.isAbsolute = function isAbsolute(path) {
    return /^(?:\/|\w+:)/.test(path);
};
var normalize = /**
 * Normalizes the specified path.
 * @param {string} path Path to normalize
 * @returns {string} Normalized path
 */ path.normalize = function normalize(path) {
    path = path.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
    var parts = path.split("/"), absolute = isAbsolute(path), prefix = "";
    if (absolute) prefix = parts.shift() + "/";
    for(var i = 0; i < parts.length;){
        if (parts[i] === "..") {
            if (i > 0 && parts[i - 1] !== "..") parts.splice(--i, 2);
            else if (absolute) parts.splice(i, 1);
            else ++i;
        } else if (parts[i] === ".") parts.splice(i, 1);
        else ++i;
    }
    return prefix + parts.join("/");
};
/**
 * Resolves the specified include path against the specified origin path.
 * @param {string} originPath Path to the origin file
 * @param {string} includePath Include path relative to origin path
 * @param {boolean} [alreadyNormalized=false] `true` if both paths are already known to be normalized
 * @returns {string} Path to the include file
 */ path.resolve = function resolve(originPath, includePath, alreadyNormalized) {
    if (!alreadyNormalized) includePath = normalize(includePath);
    if (isAbsolute(includePath)) return includePath;
    if (!alreadyNormalized) originPath = normalize(originPath);
    return (originPath = originPath.replace(/(?:\/|^)[^/]+$/, "")).length ? normalize(originPath + "/" + includePath) : includePath;
};


/***/ }),

/***/ 65502:
/***/ ((module) => {


module.exports = pool;
/**
 * An allocator as used by {@link util.pool}.
 * @typedef PoolAllocator
 * @type {function}
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */ /**
 * A slicer as used by {@link util.pool}.
 * @typedef PoolSlicer
 * @type {function}
 * @param {number} start Start offset
 * @param {number} end End offset
 * @returns {Uint8Array} Buffer slice
 * @this {Uint8Array}
 */ /**
 * A general purpose buffer pool.
 * @memberof util
 * @function
 * @param {PoolAllocator} alloc Allocator
 * @param {PoolSlicer} slice Slicer
 * @param {number} [size=8192] Slab size
 * @returns {PoolAllocator} Pooled allocator
 */ function pool(alloc, slice, size) {
    var SIZE = size || 8192;
    var MAX = SIZE >>> 1;
    var slab = null;
    var offset = SIZE;
    return function pool_alloc(size) {
        if (size < 1 || size > MAX) return alloc(size);
        if (offset + size > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size);
        if (offset & 7) offset = (offset | 7) + 1;
        return buf;
    };
}


/***/ }),

/***/ 98884:
/***/ ((__unused_webpack_module, exports) => {


/**
 * A minimal UTF8 implementation for number arrays.
 * @memberof util
 * @namespace
 */ var utf8 = exports;
/**
 * Calculates the UTF8 byte length of a string.
 * @param {string} string String
 * @returns {number} Byte length
 */ utf8.length = function utf8_length(string) {
    var len = 0, c = 0;
    for(var i = 0; i < string.length; ++i){
        c = string.charCodeAt(i);
        if (c < 128) len += 1;
        else if (c < 2048) len += 2;
        else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
            ++i;
            len += 4;
        } else len += 3;
    }
    return len;
};
/**
 * Reads UTF8 bytes as a string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} String read
 */ utf8.read = function utf8_read(buffer, start, end) {
    var len = end - start;
    if (len < 1) return "";
    var parts = null, chunk = [], i = 0, t; // temporary
    while(start < end){
        t = buffer[start++];
        if (t < 128) chunk[i++] = t;
        else if (t > 191 && t < 224) chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
            chunk[i++] = 0xD800 + (t >> 10);
            chunk[i++] = 0xDC00 + (t & 1023);
        } else chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (parts) {
        if (i) parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};
/**
 * Writes a string as UTF8 bytes.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Bytes written
 */ utf8.write = function utf8_write(string, buffer, offset) {
    var start = offset, c1, c2; // character 2
    for(var i = 0; i < string.length; ++i){
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
            buffer[offset++] = c1;
        } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6 | 192;
            buffer[offset++] = c1 & 63 | 128;
        } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            buffer[offset++] = c1 >> 18 | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
        } else {
            buffer[offset++] = c1 >> 12 | 224;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
        }
    }
    return offset - start;
};


/***/ }),

/***/ 84961:
/***/ ((module) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ /** Used as references for various `Number` constants. */ 
var INFINITY = 1 / 0;
/** `Object#toString` result references. */ var symbolTag = "[object Symbol]";
/** Used to match words composed of alphanumeric characters. */ var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
/** Used to match Latin Unicode letters (excluding mathematical operators). */ var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
/** Used to compose unicode character classes. */ var rsAstralRange = "\ud800-\udfff", rsComboMarksRange = "\\u0300-\\u036f\\ufe20-\\ufe23", rsComboSymbolsRange = "\\u20d0-\\u20f0", rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
/** Used to compose unicode capture groups. */ var rsApos = "['’]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboMarksRange + rsComboSymbolsRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\ud83c[\udffb-\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\ud83c[\udde6-\uddff]){2}", rsSurrPair = "[\ud800-\udbff][\udc00-\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
/** Used to compose unicode regexes. */ var rsLowerMisc = "(?:" + rsLower + "|" + rsMisc + ")", rsUpperMisc = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptLowerContr = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptUpperContr = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [
    rsNonAstral,
    rsRegional,
    rsSurrPair
].join("|") + ")" + rsOptVar + reOptMod + ")*", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [
    rsDingbat,
    rsRegional,
    rsSurrPair
].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [
    rsNonAstral + rsCombo + "?",
    rsCombo,
    rsRegional,
    rsSurrPair,
    rsAstral
].join("|") + ")";
/** Used to match apostrophes. */ var reApos = RegExp(rsApos, "g");
/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */ var reComboMark = RegExp(rsCombo, "g");
/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */ var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
/** Used to match complex or compound words. */ var reUnicodeWord = RegExp([
    rsUpper + "?" + rsLower + "+" + rsOptLowerContr + "(?=" + [
        rsBreak,
        rsUpper,
        "$"
    ].join("|") + ")",
    rsUpperMisc + "+" + rsOptUpperContr + "(?=" + [
        rsBreak,
        rsUpper + rsLowerMisc,
        "$"
    ].join("|") + ")",
    rsUpper + "?" + rsLowerMisc + "+" + rsOptLowerContr,
    rsUpper + "+" + rsOptUpperContr,
    rsDigits,
    rsEmoji
].join("|"), "g");
/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */ var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + "]");
/** Used to detect strings that need a more robust regexp to match words. */ var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
/** Used to map Latin Unicode letters to basic Latin letters. */ var deburredLetters = {
    // Latin-1 Supplement block.
    "\xc0": "A",
    "\xc1": "A",
    "\xc2": "A",
    "\xc3": "A",
    "\xc4": "A",
    "\xc5": "A",
    "\xe0": "a",
    "\xe1": "a",
    "\xe2": "a",
    "\xe3": "a",
    "\xe4": "a",
    "\xe5": "a",
    "\xc7": "C",
    "\xe7": "c",
    "\xd0": "D",
    "\xf0": "d",
    "\xc8": "E",
    "\xc9": "E",
    "\xca": "E",
    "\xcb": "E",
    "\xe8": "e",
    "\xe9": "e",
    "\xea": "e",
    "\xeb": "e",
    "\xcc": "I",
    "\xcd": "I",
    "\xce": "I",
    "\xcf": "I",
    "\xec": "i",
    "\xed": "i",
    "\xee": "i",
    "\xef": "i",
    "\xd1": "N",
    "\xf1": "n",
    "\xd2": "O",
    "\xd3": "O",
    "\xd4": "O",
    "\xd5": "O",
    "\xd6": "O",
    "\xd8": "O",
    "\xf2": "o",
    "\xf3": "o",
    "\xf4": "o",
    "\xf5": "o",
    "\xf6": "o",
    "\xf8": "o",
    "\xd9": "U",
    "\xda": "U",
    "\xdb": "U",
    "\xdc": "U",
    "\xf9": "u",
    "\xfa": "u",
    "\xfb": "u",
    "\xfc": "u",
    "\xdd": "Y",
    "\xfd": "y",
    "\xff": "y",
    "\xc6": "Ae",
    "\xe6": "ae",
    "\xde": "Th",
    "\xfe": "th",
    "\xdf": "ss",
    // Latin Extended-A block.
    "Ā": "A",
    "Ă": "A",
    "Ą": "A",
    "ā": "a",
    "ă": "a",
    "ą": "a",
    "Ć": "C",
    "Ĉ": "C",
    "Ċ": "C",
    "Č": "C",
    "ć": "c",
    "ĉ": "c",
    "ċ": "c",
    "č": "c",
    "Ď": "D",
    "Đ": "D",
    "ď": "d",
    "đ": "d",
    "Ē": "E",
    "Ĕ": "E",
    "Ė": "E",
    "Ę": "E",
    "Ě": "E",
    "ē": "e",
    "ĕ": "e",
    "ė": "e",
    "ę": "e",
    "ě": "e",
    "Ĝ": "G",
    "Ğ": "G",
    "Ġ": "G",
    "Ģ": "G",
    "ĝ": "g",
    "ğ": "g",
    "ġ": "g",
    "ģ": "g",
    "Ĥ": "H",
    "Ħ": "H",
    "ĥ": "h",
    "ħ": "h",
    "Ĩ": "I",
    "Ī": "I",
    "Ĭ": "I",
    "Į": "I",
    "İ": "I",
    "ĩ": "i",
    "ī": "i",
    "ĭ": "i",
    "į": "i",
    "ı": "i",
    "Ĵ": "J",
    "ĵ": "j",
    "Ķ": "K",
    "ķ": "k",
    "ĸ": "k",
    "Ĺ": "L",
    "Ļ": "L",
    "Ľ": "L",
    "Ŀ": "L",
    "Ł": "L",
    "ĺ": "l",
    "ļ": "l",
    "ľ": "l",
    "ŀ": "l",
    "ł": "l",
    "Ń": "N",
    "Ņ": "N",
    "Ň": "N",
    "Ŋ": "N",
    "ń": "n",
    "ņ": "n",
    "ň": "n",
    "ŋ": "n",
    "Ō": "O",
    "Ŏ": "O",
    "Ő": "O",
    "ō": "o",
    "ŏ": "o",
    "ő": "o",
    "Ŕ": "R",
    "Ŗ": "R",
    "Ř": "R",
    "ŕ": "r",
    "ŗ": "r",
    "ř": "r",
    "Ś": "S",
    "Ŝ": "S",
    "Ş": "S",
    "Š": "S",
    "ś": "s",
    "ŝ": "s",
    "ş": "s",
    "š": "s",
    "Ţ": "T",
    "Ť": "T",
    "Ŧ": "T",
    "ţ": "t",
    "ť": "t",
    "ŧ": "t",
    "Ũ": "U",
    "Ū": "U",
    "Ŭ": "U",
    "Ů": "U",
    "Ű": "U",
    "Ų": "U",
    "ũ": "u",
    "ū": "u",
    "ŭ": "u",
    "ů": "u",
    "ű": "u",
    "ų": "u",
    "Ŵ": "W",
    "ŵ": "w",
    "Ŷ": "Y",
    "ŷ": "y",
    "Ÿ": "Y",
    "Ź": "Z",
    "Ż": "Z",
    "Ž": "Z",
    "ź": "z",
    "ż": "z",
    "ž": "z",
    "Ĳ": "IJ",
    "ĳ": "ij",
    "Œ": "Oe",
    "œ": "oe",
    "ŉ": "'n",
    "ſ": "ss"
};
/** Detect free variable `global` from Node.js. */ var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
/** Detect free variable `self`. */ var freeSelf = typeof self == "object" && self && self.Object === Object && self;
/** Used as a reference to the global object. */ var root = freeGlobal || freeSelf || Function("return this")();
/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */ function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index = -1, length = array ? array.length : 0;
    if (initAccum && length) {
        accumulator = array[++index];
    }
    while(++index < length){
        accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
}
/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */ function asciiToArray(string) {
    return string.split("");
}
/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */ function asciiWords(string) {
    return string.match(reAsciiWord) || [];
}
/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */ function basePropertyOf(object) {
    return function(key) {
        return object == null ? undefined : object[key];
    };
}
/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */ var deburrLetter = basePropertyOf(deburredLetters);
/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */ function hasUnicode(string) {
    return reHasUnicode.test(string);
}
/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */ function hasUnicodeWord(string) {
    return reHasUnicodeWord.test(string);
}
/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */ function stringToArray(string) {
    return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
}
/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */ function unicodeToArray(string) {
    return string.match(reUnicode) || [];
}
/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */ function unicodeWords(string) {
    return string.match(reUnicodeWord) || [];
}
/** Used for built-in method references. */ var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var objectToString = objectProto.toString;
/** Built-in value references. */ var Symbol = root.Symbol;
/** Used to convert symbols to primitives and strings. */ var symbolProto = Symbol ? Symbol.prototype : undefined, symbolToString = symbolProto ? symbolProto.toString : undefined;
/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */ function baseSlice(array, start, end) {
    var index = -1, length = array.length;
    if (start < 0) {
        start = -start > length ? 0 : length + start;
    }
    end = end > length ? length : end;
    if (end < 0) {
        end += length;
    }
    length = start > end ? 0 : end - start >>> 0;
    start >>>= 0;
    var result = Array(length);
    while(++index < length){
        result[index] = array[index + start];
    }
    return result;
}
/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */ function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == "string") {
        return value;
    }
    if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */ function castSlice(array, start, end) {
    var length = array.length;
    end = end === undefined ? length : end;
    return !start && end >= length ? array : baseSlice(array, start, end);
}
/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */ function createCaseFirst(methodName) {
    return function(string) {
        string = toString(string);
        var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined;
        var chr = strSymbols ? strSymbols[0] : string.charAt(0);
        var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
        return chr[methodName]() + trailing;
    };
}
/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */ function createCompounder(callback) {
    return function(string) {
        return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
    };
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function isObjectLike(value) {
    return !!value && typeof value == "object";
}
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */ function isSymbol(value) {
    return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */ function toString(value) {
    return value == null ? "" : baseToString(value);
}
/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @example
 *
 * _.camelCase('Foo Bar');
 * // => 'fooBar'
 *
 * _.camelCase('--foo-bar--');
 * // => 'fooBar'
 *
 * _.camelCase('__FOO_BAR__');
 * // => 'fooBar'
 */ var camelCase = createCompounder(function(result, word, index) {
    word = word.toLowerCase();
    return result + (index ? capitalize(word) : word);
});
/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('FRED');
 * // => 'Fred'
 */ function capitalize(string) {
    return upperFirst(toString(string).toLowerCase());
}
/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */ function deburr(string) {
    string = toString(string);
    return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
}
/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */ var upperFirst = createCaseFirst("toUpperCase");
/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */ function words(string, pattern, guard) {
    string = toString(string);
    pattern = guard ? undefined : pattern;
    if (pattern === undefined) {
        return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
    }
    return string.match(pattern) || [];
}
module.exports = camelCase;


/***/ }),

/***/ 51144:
/***/ ((module) => {


module.exports = Long;
/**
 * wasm optimizations, to do native i64 multiplication and divide
 */ var wasm = null;
try {
    wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
        0,
        97,
        115,
        109,
        1,
        0,
        0,
        0,
        1,
        13,
        2,
        96,
        0,
        1,
        127,
        96,
        4,
        127,
        127,
        127,
        127,
        1,
        127,
        3,
        7,
        6,
        0,
        1,
        1,
        1,
        1,
        1,
        6,
        6,
        1,
        127,
        1,
        65,
        0,
        11,
        7,
        50,
        6,
        3,
        109,
        117,
        108,
        0,
        1,
        5,
        100,
        105,
        118,
        95,
        115,
        0,
        2,
        5,
        100,
        105,
        118,
        95,
        117,
        0,
        3,
        5,
        114,
        101,
        109,
        95,
        115,
        0,
        4,
        5,
        114,
        101,
        109,
        95,
        117,
        0,
        5,
        8,
        103,
        101,
        116,
        95,
        104,
        105,
        103,
        104,
        0,
        0,
        10,
        191,
        1,
        6,
        4,
        0,
        35,
        0,
        11,
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        126,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11,
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        127,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11,
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        128,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11,
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        129,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11,
        36,
        1,
        1,
        126,
        32,
        0,
        173,
        32,
        1,
        173,
        66,
        32,
        134,
        132,
        32,
        2,
        173,
        32,
        3,
        173,
        66,
        32,
        134,
        132,
        130,
        34,
        4,
        66,
        32,
        135,
        167,
        36,
        0,
        32,
        4,
        167,
        11
    ])), {}).exports;
} catch (e) {
// no wasm support :(
}
/**
 * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
 *  See the from* functions below for more convenient ways of constructing Longs.
 * @exports Long
 * @class A Long class for representing a 64 bit two's-complement integer value.
 * @param {number} low The low (signed) 32 bits of the long
 * @param {number} high The high (signed) 32 bits of the long
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @constructor
 */ function Long(low, high, unsigned) {
    /**
     * The low 32 bits as a signed value.
     * @type {number}
     */ this.low = low | 0;
    /**
     * The high 32 bits as a signed value.
     * @type {number}
     */ this.high = high | 0;
    /**
     * Whether unsigned or not.
     * @type {boolean}
     */ this.unsigned = !!unsigned;
}
// The internal representation of a long is the two given signed, 32-bit values.
// We use 32-bit pieces because these are the size of integers on which
// Javascript performs bit-operations.  For operations like addition and
// multiplication, we split each number into 16 bit pieces, which can easily be
// multiplied within Javascript's floating-point representation without overflow
// or change in sign.
//
// In the algorithms below, we frequently reduce the negative case to the
// positive case by negating the input(s) and then post-processing the result.
// Note that we must ALWAYS check specially whether those values are MIN_VALUE
// (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
// a positive number, it overflows back into a negative).  Not handling this
// case would often result in infinite recursion.
//
// Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
// methods on which they depend.
/**
 * An indicator used to reliably determine if an object is a Long or not.
 * @type {boolean}
 * @const
 * @private
 */ Long.prototype.__isLong__;
Object.defineProperty(Long.prototype, "__isLong__", {
    value: true
});
/**
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 * @inner
 */ function isLong(obj) {
    return (obj && obj["__isLong__"]) === true;
}
/**
 * Tests if the specified object is a Long.
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 */ Long.isLong = isLong;
/**
 * A cache of the Long representations of small integer values.
 * @type {!Object}
 * @inner
 */ var INT_CACHE = {};
/**
 * A cache of the Long representations of small unsigned integer values.
 * @type {!Object}
 * @inner
 */ var UINT_CACHE = {};
/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */ function fromInt(value, unsigned) {
    var obj, cachedObj, cache;
    if (unsigned) {
        value >>>= 0;
        if (cache = 0 <= value && value < 256) {
            cachedObj = UINT_CACHE[value];
            if (cachedObj) return cachedObj;
        }
        obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
        if (cache) UINT_CACHE[value] = obj;
        return obj;
    } else {
        value |= 0;
        if (cache = -128 <= value && value < 128) {
            cachedObj = INT_CACHE[value];
            if (cachedObj) return cachedObj;
        }
        obj = fromBits(value, value < 0 ? -1 : 0, false);
        if (cache) INT_CACHE[value] = obj;
        return obj;
    }
}
/**
 * Returns a Long representing the given 32 bit integer value.
 * @function
 * @param {number} value The 32 bit integer in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */ Long.fromInt = fromInt;
/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */ function fromNumber(value, unsigned) {
    if (isNaN(value)) return unsigned ? UZERO : ZERO;
    if (unsigned) {
        if (value < 0) return UZERO;
        if (value >= TWO_PWR_64_DBL) return MAX_UNSIGNED_VALUE;
    } else {
        if (value <= -TWO_PWR_63_DBL) return MIN_VALUE;
        if (value + 1 >= TWO_PWR_63_DBL) return MAX_VALUE;
    }
    if (value < 0) return fromNumber(-value, unsigned).neg();
    return fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
}
/**
 * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
 * @function
 * @param {number} value The number in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */ Long.fromNumber = fromNumber;
/**
 * @param {number} lowBits
 * @param {number} highBits
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */ function fromBits(lowBits, highBits, unsigned) {
    return new Long(lowBits, highBits, unsigned);
}
/**
 * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
 *  assumed to use 32 bits.
 * @function
 * @param {number} lowBits The low 32 bits
 * @param {number} highBits The high 32 bits
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */ Long.fromBits = fromBits;
/**
 * @function
 * @param {number} base
 * @param {number} exponent
 * @returns {number}
 * @inner
 */ var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)
/**
 * @param {string} str
 * @param {(boolean|number)=} unsigned
 * @param {number=} radix
 * @returns {!Long}
 * @inner
 */ function fromString(str, unsigned, radix) {
    if (str.length === 0) throw Error("empty string");
    if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity") return ZERO;
    if (typeof unsigned === "number") {
        // For goog.math.long compatibility
        radix = unsigned, unsigned = false;
    } else {
        unsigned = !!unsigned;
    }
    radix = radix || 10;
    if (radix < 2 || 36 < radix) throw RangeError("radix");
    var p;
    if ((p = str.indexOf("-")) > 0) throw Error("interior hyphen");
    else if (p === 0) {
        return fromString(str.substring(1), unsigned, radix).neg();
    }
    // Do several (8) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = fromNumber(pow_dbl(radix, 8));
    var result = ZERO;
    for(var i = 0; i < str.length; i += 8){
        var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
        if (size < 8) {
            var power = fromNumber(pow_dbl(radix, size));
            result = result.mul(power).add(fromNumber(value));
        } else {
            result = result.mul(radixToPower);
            result = result.add(fromNumber(value));
        }
    }
    result.unsigned = unsigned;
    return result;
}
/**
 * Returns a Long representation of the given string, written using the specified radix.
 * @function
 * @param {string} str The textual representation of the Long
 * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to signed
 * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
 * @returns {!Long} The corresponding Long value
 */ Long.fromString = fromString;
/**
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */ function fromValue(val, unsigned) {
    if (typeof val === "number") return fromNumber(val, unsigned);
    if (typeof val === "string") return fromString(val, unsigned);
    // Throws for non-objects, converts non-instanceof Long:
    return fromBits(val.low, val.high, typeof unsigned === "boolean" ? unsigned : val.unsigned);
}
/**
 * Converts the specified value to a Long using the appropriate from* function for its type.
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long}
 */ Long.fromValue = fromValue;
// NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
// no runtime penalty for these.
/**
 * @type {number}
 * @const
 * @inner
 */ var TWO_PWR_16_DBL = 1 << 16;
/**
 * @type {number}
 * @const
 * @inner
 */ var TWO_PWR_24_DBL = 1 << 24;
/**
 * @type {number}
 * @const
 * @inner
 */ var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
/**
 * @type {number}
 * @const
 * @inner
 */ var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
/**
 * @type {number}
 * @const
 * @inner
 */ var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
/**
 * @type {!Long}
 * @const
 * @inner
 */ var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
/**
 * @type {!Long}
 * @inner
 */ var ZERO = fromInt(0);
/**
 * Signed zero.
 * @type {!Long}
 */ Long.ZERO = ZERO;
/**
 * @type {!Long}
 * @inner
 */ var UZERO = fromInt(0, true);
/**
 * Unsigned zero.
 * @type {!Long}
 */ Long.UZERO = UZERO;
/**
 * @type {!Long}
 * @inner
 */ var ONE = fromInt(1);
/**
 * Signed one.
 * @type {!Long}
 */ Long.ONE = ONE;
/**
 * @type {!Long}
 * @inner
 */ var UONE = fromInt(1, true);
/**
 * Unsigned one.
 * @type {!Long}
 */ Long.UONE = UONE;
/**
 * @type {!Long}
 * @inner
 */ var NEG_ONE = fromInt(-1);
/**
 * Signed negative one.
 * @type {!Long}
 */ Long.NEG_ONE = NEG_ONE;
/**
 * @type {!Long}
 * @inner
 */ var MAX_VALUE = fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0, false);
/**
 * Maximum signed value.
 * @type {!Long}
 */ Long.MAX_VALUE = MAX_VALUE;
/**
 * @type {!Long}
 * @inner
 */ var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF | 0, 0xFFFFFFFF | 0, true);
/**
 * Maximum unsigned value.
 * @type {!Long}
 */ Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
/**
 * @type {!Long}
 * @inner
 */ var MIN_VALUE = fromBits(0, 0x80000000 | 0, false);
/**
 * Minimum signed value.
 * @type {!Long}
 */ Long.MIN_VALUE = MIN_VALUE;
/**
 * @alias Long.prototype
 * @inner
 */ var LongPrototype = Long.prototype;
/**
 * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
 * @returns {number}
 */ LongPrototype.toInt = function toInt() {
    return this.unsigned ? this.low >>> 0 : this.low;
};
/**
 * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
 * @returns {number}
 */ LongPrototype.toNumber = function toNumber() {
    if (this.unsigned) return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
    return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
};
/**
 * Converts the Long to a string written in the specified radix.
 * @param {number=} radix Radix (2-36), defaults to 10
 * @returns {string}
 * @override
 * @throws {RangeError} If `radix` is out of range
 */ LongPrototype.toString = function toString(radix) {
    radix = radix || 10;
    if (radix < 2 || 36 < radix) throw RangeError("radix");
    if (this.isZero()) return "0";
    if (this.isNegative()) {
        if (this.eq(MIN_VALUE)) {
            // We need to change the Long value before it can be negated, so we remove
            // the bottom-most digit in this base and then recurse to do the rest.
            var radixLong = fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
            return div.toString(radix) + rem1.toInt().toString(radix);
        } else return "-" + this.neg().toString(radix);
    }
    // Do several (6) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned), rem = this;
    var result = "";
    while(true){
        var remDiv = rem.div(radixToPower), intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0, digits = intval.toString(radix);
        rem = remDiv;
        if (rem.isZero()) return digits + result;
        else {
            while(digits.length < 6)digits = "0" + digits;
            result = "" + digits + result;
        }
    }
};
/**
 * Gets the high 32 bits as a signed integer.
 * @returns {number} Signed high bits
 */ LongPrototype.getHighBits = function getHighBits() {
    return this.high;
};
/**
 * Gets the high 32 bits as an unsigned integer.
 * @returns {number} Unsigned high bits
 */ LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
    return this.high >>> 0;
};
/**
 * Gets the low 32 bits as a signed integer.
 * @returns {number} Signed low bits
 */ LongPrototype.getLowBits = function getLowBits() {
    return this.low;
};
/**
 * Gets the low 32 bits as an unsigned integer.
 * @returns {number} Unsigned low bits
 */ LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
    return this.low >>> 0;
};
/**
 * Gets the number of bits needed to represent the absolute value of this Long.
 * @returns {number}
 */ LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
    if (this.isNegative()) return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
    var val = this.high != 0 ? this.high : this.low;
    for(var bit = 31; bit > 0; bit--)if ((val & 1 << bit) != 0) break;
    return this.high != 0 ? bit + 33 : bit + 1;
};
/**
 * Tests if this Long's value equals zero.
 * @returns {boolean}
 */ LongPrototype.isZero = function isZero() {
    return this.high === 0 && this.low === 0;
};
/**
 * Tests if this Long's value equals zero. This is an alias of {@link Long#isZero}.
 * @returns {boolean}
 */ LongPrototype.eqz = LongPrototype.isZero;
/**
 * Tests if this Long's value is negative.
 * @returns {boolean}
 */ LongPrototype.isNegative = function isNegative() {
    return !this.unsigned && this.high < 0;
};
/**
 * Tests if this Long's value is positive.
 * @returns {boolean}
 */ LongPrototype.isPositive = function isPositive() {
    return this.unsigned || this.high >= 0;
};
/**
 * Tests if this Long's value is odd.
 * @returns {boolean}
 */ LongPrototype.isOdd = function isOdd() {
    return (this.low & 1) === 1;
};
/**
 * Tests if this Long's value is even.
 * @returns {boolean}
 */ LongPrototype.isEven = function isEven() {
    return (this.low & 1) === 0;
};
/**
 * Tests if this Long's value equals the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */ LongPrototype.equals = function equals(other) {
    if (!isLong(other)) other = fromValue(other);
    if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1) return false;
    return this.high === other.high && this.low === other.low;
};
/**
 * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */ LongPrototype.eq = LongPrototype.equals;
/**
 * Tests if this Long's value differs from the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */ LongPrototype.notEquals = function notEquals(other) {
    return !this.eq(/* validates */ other);
};
/**
 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */ LongPrototype.neq = LongPrototype.notEquals;
/**
 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */ LongPrototype.ne = LongPrototype.notEquals;
/**
 * Tests if this Long's value is less than the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */ LongPrototype.lessThan = function lessThan(other) {
    return this.comp(/* validates */ other) < 0;
};
/**
 * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */ LongPrototype.lt = LongPrototype.lessThan;
/**
 * Tests if this Long's value is less than or equal the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */ LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
    return this.comp(/* validates */ other) <= 0;
};
/**
 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */ LongPrototype.lte = LongPrototype.lessThanOrEqual;
/**
 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */ LongPrototype.le = LongPrototype.lessThanOrEqual;
/**
 * Tests if this Long's value is greater than the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */ LongPrototype.greaterThan = function greaterThan(other) {
    return this.comp(/* validates */ other) > 0;
};
/**
 * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */ LongPrototype.gt = LongPrototype.greaterThan;
/**
 * Tests if this Long's value is greater than or equal the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */ LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
    return this.comp(/* validates */ other) >= 0;
};
/**
 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */ LongPrototype.gte = LongPrototype.greaterThanOrEqual;
/**
 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */ LongPrototype.ge = LongPrototype.greaterThanOrEqual;
/**
 * Compares this Long's value with the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
 *  if the given one is greater
 */ LongPrototype.compare = function compare(other) {
    if (!isLong(other)) other = fromValue(other);
    if (this.eq(other)) return 0;
    var thisNeg = this.isNegative(), otherNeg = other.isNegative();
    if (thisNeg && !otherNeg) return -1;
    if (!thisNeg && otherNeg) return 1;
    // At this point the sign bits are the same
    if (!this.unsigned) return this.sub(other).isNegative() ? -1 : 1;
    // Both are positive if at least one is unsigned
    return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
};
/**
 * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
 *  if the given one is greater
 */ LongPrototype.comp = LongPrototype.compare;
/**
 * Negates this Long's value.
 * @returns {!Long} Negated Long
 */ LongPrototype.negate = function negate() {
    if (!this.unsigned && this.eq(MIN_VALUE)) return MIN_VALUE;
    return this.not().add(ONE);
};
/**
 * Negates this Long's value. This is an alias of {@link Long#negate}.
 * @function
 * @returns {!Long} Negated Long
 */ LongPrototype.neg = LongPrototype.negate;
/**
 * Returns the sum of this and the specified Long.
 * @param {!Long|number|string} addend Addend
 * @returns {!Long} Sum
 */ LongPrototype.add = function add(addend) {
    if (!isLong(addend)) addend = fromValue(addend);
    // Divide each number into 4 chunks of 16 bits, and then sum the chunks.
    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;
    var b48 = addend.high >>> 16;
    var b32 = addend.high & 0xFFFF;
    var b16 = addend.low >>> 16;
    var b00 = addend.low & 0xFFFF;
    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 + b48;
    c48 &= 0xFFFF;
    return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
};
/**
 * Returns the difference of this and the specified Long.
 * @param {!Long|number|string} subtrahend Subtrahend
 * @returns {!Long} Difference
 */ LongPrototype.subtract = function subtract(subtrahend) {
    if (!isLong(subtrahend)) subtrahend = fromValue(subtrahend);
    return this.add(subtrahend.neg());
};
/**
 * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
 * @function
 * @param {!Long|number|string} subtrahend Subtrahend
 * @returns {!Long} Difference
 */ LongPrototype.sub = LongPrototype.subtract;
/**
 * Returns the product of this and the specified Long.
 * @param {!Long|number|string} multiplier Multiplier
 * @returns {!Long} Product
 */ LongPrototype.multiply = function multiply(multiplier) {
    if (this.isZero()) return ZERO;
    if (!isLong(multiplier)) multiplier = fromValue(multiplier);
    // use wasm support if present
    if (wasm) {
        var low = wasm.mul(this.low, this.high, multiplier.low, multiplier.high);
        return fromBits(low, wasm.get_high(), this.unsigned);
    }
    if (multiplier.isZero()) return ZERO;
    if (this.eq(MIN_VALUE)) return multiplier.isOdd() ? MIN_VALUE : ZERO;
    if (multiplier.eq(MIN_VALUE)) return this.isOdd() ? MIN_VALUE : ZERO;
    if (this.isNegative()) {
        if (multiplier.isNegative()) return this.neg().mul(multiplier.neg());
        else return this.neg().mul(multiplier).neg();
    } else if (multiplier.isNegative()) return this.mul(multiplier.neg()).neg();
    // If both longs are small, use float multiplication
    if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24)) return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
    // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
    // We can skip products that would overflow.
    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;
    var b48 = multiplier.high >>> 16;
    var b32 = multiplier.high & 0xFFFF;
    var b16 = multiplier.low >>> 16;
    var b00 = multiplier.low & 0xFFFF;
    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 0xFFFF;
    return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
};
/**
 * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
 * @function
 * @param {!Long|number|string} multiplier Multiplier
 * @returns {!Long} Product
 */ LongPrototype.mul = LongPrototype.multiply;
/**
 * Returns this Long divided by the specified. The result is signed if this Long is signed or
 *  unsigned if this Long is unsigned.
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Quotient
 */ LongPrototype.divide = function divide(divisor) {
    if (!isLong(divisor)) divisor = fromValue(divisor);
    if (divisor.isZero()) throw Error("division by zero");
    // use wasm support if present
    if (wasm) {
        // guard against signed division overflow: the largest
        // negative number / -1 would be 1 larger than the largest
        // positive number, due to two's complement.
        if (!this.unsigned && this.high === -0x80000000 && divisor.low === -1 && divisor.high === -1) {
            // be consistent with non-wasm code path
            return this;
        }
        var low = (this.unsigned ? wasm.div_u : wasm.div_s)(this.low, this.high, divisor.low, divisor.high);
        return fromBits(low, wasm.get_high(), this.unsigned);
    }
    if (this.isZero()) return this.unsigned ? UZERO : ZERO;
    var approx, rem, res;
    if (!this.unsigned) {
        // This section is only relevant for signed longs and is derived from the
        // closure library as a whole.
        if (this.eq(MIN_VALUE)) {
            if (divisor.eq(ONE) || divisor.eq(NEG_ONE)) return MIN_VALUE; // recall that -MIN_VALUE == MIN_VALUE
            else if (divisor.eq(MIN_VALUE)) return ONE;
            else {
                // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                var halfThis = this.shr(1);
                approx = halfThis.div(divisor).shl(1);
                if (approx.eq(ZERO)) {
                    return divisor.isNegative() ? ONE : NEG_ONE;
                } else {
                    rem = this.sub(divisor.mul(approx));
                    res = approx.add(rem.div(divisor));
                    return res;
                }
            }
        } else if (divisor.eq(MIN_VALUE)) return this.unsigned ? UZERO : ZERO;
        if (this.isNegative()) {
            if (divisor.isNegative()) return this.neg().div(divisor.neg());
            return this.neg().div(divisor).neg();
        } else if (divisor.isNegative()) return this.div(divisor.neg()).neg();
        res = ZERO;
    } else {
        // The algorithm below has not been made for unsigned longs. It's therefore
        // required to take special care of the MSB prior to running it.
        if (!divisor.unsigned) divisor = divisor.toUnsigned();
        if (divisor.gt(this)) return UZERO;
        if (divisor.gt(this.shru(1))) return UONE;
        res = UZERO;
    }
    // Repeat the following until the remainder is less than other:  find a
    // floating-point that approximates remainder / other *from below*, add this
    // into the result, and subtract it from the remainder.  It is critical that
    // the approximate value is less than or equal to the real value so that the
    // remainder never becomes negative.
    rem = this;
    while(rem.gte(divisor)){
        // Approximate the result of division. This may be a little greater or
        // smaller than the actual value.
        approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
        // We will tweak the approximate result by changing it in the 48-th digit or
        // the smallest non-fractional digit, whichever is larger.
        var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48), // Decrease the approximation until it is smaller than the remainder.  Note
        // that if it is too large, the product overflows and is negative.
        approxRes = fromNumber(approx), approxRem = approxRes.mul(divisor);
        while(approxRem.isNegative() || approxRem.gt(rem)){
            approx -= delta;
            approxRes = fromNumber(approx, this.unsigned);
            approxRem = approxRes.mul(divisor);
        }
        // We know the answer can't be zero... and actually, zero would cause
        // infinite recursion since we would make no progress.
        if (approxRes.isZero()) approxRes = ONE;
        res = res.add(approxRes);
        rem = rem.sub(approxRem);
    }
    return res;
};
/**
 * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Quotient
 */ LongPrototype.div = LongPrototype.divide;
/**
 * Returns this Long modulo the specified.
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */ LongPrototype.modulo = function modulo(divisor) {
    if (!isLong(divisor)) divisor = fromValue(divisor);
    // use wasm support if present
    if (wasm) {
        var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(this.low, this.high, divisor.low, divisor.high);
        return fromBits(low, wasm.get_high(), this.unsigned);
    }
    return this.sub(this.div(divisor).mul(divisor));
};
/**
 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */ LongPrototype.mod = LongPrototype.modulo;
/**
 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */ LongPrototype.rem = LongPrototype.modulo;
/**
 * Returns the bitwise NOT of this Long.
 * @returns {!Long}
 */ LongPrototype.not = function not() {
    return fromBits(~this.low, ~this.high, this.unsigned);
};
/**
 * Returns the bitwise AND of this Long and the specified.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */ LongPrototype.and = function and(other) {
    if (!isLong(other)) other = fromValue(other);
    return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
};
/**
 * Returns the bitwise OR of this Long and the specified.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */ LongPrototype.or = function or(other) {
    if (!isLong(other)) other = fromValue(other);
    return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
};
/**
 * Returns the bitwise XOR of this Long and the given one.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */ LongPrototype.xor = function xor(other) {
    if (!isLong(other)) other = fromValue(other);
    return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
};
/**
 * Returns this Long with bits shifted to the left by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */ LongPrototype.shiftLeft = function shiftLeft(numBits) {
    if (isLong(numBits)) numBits = numBits.toInt();
    if ((numBits &= 63) === 0) return this;
    else if (numBits < 32) return fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned);
    else return fromBits(0, this.low << numBits - 32, this.unsigned);
};
/**
 * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */ LongPrototype.shl = LongPrototype.shiftLeft;
/**
 * Returns this Long with bits arithmetically shifted to the right by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */ LongPrototype.shiftRight = function shiftRight(numBits) {
    if (isLong(numBits)) numBits = numBits.toInt();
    if ((numBits &= 63) === 0) return this;
    else if (numBits < 32) return fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned);
    else return fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
};
/**
 * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */ LongPrototype.shr = LongPrototype.shiftRight;
/**
 * Returns this Long with bits logically shifted to the right by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */ LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
    if (isLong(numBits)) numBits = numBits.toInt();
    numBits &= 63;
    if (numBits === 0) return this;
    else {
        var high = this.high;
        if (numBits < 32) {
            var low = this.low;
            return fromBits(low >>> numBits | high << 32 - numBits, high >>> numBits, this.unsigned);
        } else if (numBits === 32) return fromBits(high, 0, this.unsigned);
        else return fromBits(high >>> numBits - 32, 0, this.unsigned);
    }
};
/**
 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */ LongPrototype.shru = LongPrototype.shiftRightUnsigned;
/**
 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */ LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;
/**
 * Converts this Long to signed.
 * @returns {!Long} Signed long
 */ LongPrototype.toSigned = function toSigned() {
    if (!this.unsigned) return this;
    return fromBits(this.low, this.high, false);
};
/**
 * Converts this Long to unsigned.
 * @returns {!Long} Unsigned long
 */ LongPrototype.toUnsigned = function toUnsigned() {
    if (this.unsigned) return this;
    return fromBits(this.low, this.high, true);
};
/**
 * Converts this Long to its byte representation.
 * @param {boolean=} le Whether little or big endian, defaults to big endian
 * @returns {!Array.<number>} Byte representation
 */ LongPrototype.toBytes = function toBytes(le) {
    return le ? this.toBytesLE() : this.toBytesBE();
};
/**
 * Converts this Long to its little endian byte representation.
 * @returns {!Array.<number>} Little endian byte representation
 */ LongPrototype.toBytesLE = function toBytesLE() {
    var hi = this.high, lo = this.low;
    return [
        lo & 0xff,
        lo >>> 8 & 0xff,
        lo >>> 16 & 0xff,
        lo >>> 24,
        hi & 0xff,
        hi >>> 8 & 0xff,
        hi >>> 16 & 0xff,
        hi >>> 24
    ];
};
/**
 * Converts this Long to its big endian byte representation.
 * @returns {!Array.<number>} Big endian byte representation
 */ LongPrototype.toBytesBE = function toBytesBE() {
    var hi = this.high, lo = this.low;
    return [
        hi >>> 24,
        hi >>> 16 & 0xff,
        hi >>> 8 & 0xff,
        hi & 0xff,
        lo >>> 24,
        lo >>> 16 & 0xff,
        lo >>> 8 & 0xff,
        lo & 0xff
    ];
};
/**
 * Creates a Long from its byte representation.
 * @param {!Array.<number>} bytes Byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @param {boolean=} le Whether little or big endian, defaults to big endian
 * @returns {Long} The corresponding Long value
 */ Long.fromBytes = function fromBytes(bytes, unsigned, le) {
    return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
};
/**
 * Creates a Long from its little endian byte representation.
 * @param {!Array.<number>} bytes Little endian byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {Long} The corresponding Long value
 */ Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
    return new Long(bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24, bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24, unsigned);
};
/**
 * Creates a Long from its big endian byte representation.
 * @param {!Array.<number>} bytes Big endian byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {Long} The corresponding Long value
 */ Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
    return new Long(bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7], bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], unsigned);
};


/***/ }),

/***/ 78684:
/***/ ((module, exports, __webpack_require__) => {


var $protobuf = __webpack_require__(12206);
module.exports = exports = $protobuf.descriptor = $protobuf.Root.fromJSON(__webpack_require__(24497)).lookup(".google.protobuf");
var Namespace = $protobuf.Namespace, Root = $protobuf.Root, Enum = $protobuf.Enum, Type = $protobuf.Type, Field = $protobuf.Field, MapField = $protobuf.MapField, OneOf = $protobuf.OneOf, Service = $protobuf.Service, Method = $protobuf.Method;
// --- Root ---
/**
 * Properties of a FileDescriptorSet message.
 * @interface IFileDescriptorSet
 * @property {IFileDescriptorProto[]} file Files
 */ /**
 * Properties of a FileDescriptorProto message.
 * @interface IFileDescriptorProto
 * @property {string} [name] File name
 * @property {string} [package] Package
 * @property {*} [dependency] Not supported
 * @property {*} [publicDependency] Not supported
 * @property {*} [weakDependency] Not supported
 * @property {IDescriptorProto[]} [messageType] Nested message types
 * @property {IEnumDescriptorProto[]} [enumType] Nested enums
 * @property {IServiceDescriptorProto[]} [service] Nested services
 * @property {IFieldDescriptorProto[]} [extension] Nested extension fields
 * @property {IFileOptions} [options] Options
 * @property {*} [sourceCodeInfo] Not supported
 * @property {string} [syntax="proto2"] Syntax
 */ /**
 * Properties of a FileOptions message.
 * @interface IFileOptions
 * @property {string} [javaPackage]
 * @property {string} [javaOuterClassname]
 * @property {boolean} [javaMultipleFiles]
 * @property {boolean} [javaGenerateEqualsAndHash]
 * @property {boolean} [javaStringCheckUtf8]
 * @property {IFileOptionsOptimizeMode} [optimizeFor=1]
 * @property {string} [goPackage]
 * @property {boolean} [ccGenericServices]
 * @property {boolean} [javaGenericServices]
 * @property {boolean} [pyGenericServices]
 * @property {boolean} [deprecated]
 * @property {boolean} [ccEnableArenas]
 * @property {string} [objcClassPrefix]
 * @property {string} [csharpNamespace]
 */ /**
 * Values of he FileOptions.OptimizeMode enum.
 * @typedef IFileOptionsOptimizeMode
 * @type {number}
 * @property {number} SPEED=1
 * @property {number} CODE_SIZE=2
 * @property {number} LITE_RUNTIME=3
 */ /**
 * Creates a root from a descriptor set.
 * @param {IFileDescriptorSet|Reader|Uint8Array} descriptor Descriptor
 * @returns {Root} Root instance
 */ Root.fromDescriptor = function fromDescriptor(descriptor) {
    // Decode the descriptor message if specified as a buffer:
    if (typeof descriptor.length === "number") descriptor = exports.FileDescriptorSet.decode(descriptor);
    var root = new Root();
    if (descriptor.file) {
        var fileDescriptor, filePackage;
        for(var j = 0, i; j < descriptor.file.length; ++j){
            filePackage = root;
            if ((fileDescriptor = descriptor.file[j])["package"] && fileDescriptor["package"].length) filePackage = root.define(fileDescriptor["package"]);
            if (fileDescriptor.name && fileDescriptor.name.length) root.files.push(filePackage.filename = fileDescriptor.name);
            if (fileDescriptor.messageType) for(i = 0; i < fileDescriptor.messageType.length; ++i)filePackage.add(Type.fromDescriptor(fileDescriptor.messageType[i], fileDescriptor.syntax));
            if (fileDescriptor.enumType) for(i = 0; i < fileDescriptor.enumType.length; ++i)filePackage.add(Enum.fromDescriptor(fileDescriptor.enumType[i]));
            if (fileDescriptor.extension) for(i = 0; i < fileDescriptor.extension.length; ++i)filePackage.add(Field.fromDescriptor(fileDescriptor.extension[i]));
            if (fileDescriptor.service) for(i = 0; i < fileDescriptor.service.length; ++i)filePackage.add(Service.fromDescriptor(fileDescriptor.service[i]));
            var opts = fromDescriptorOptions(fileDescriptor.options, exports.FileOptions);
            if (opts) {
                var ks = Object.keys(opts);
                for(i = 0; i < ks.length; ++i)filePackage.setOption(ks[i], opts[ks[i]]);
            }
        }
    }
    return root;
};
/**
 * Converts a root to a descriptor set.
 * @returns {Message<IFileDescriptorSet>} Descriptor
 * @param {string} [syntax="proto2"] Syntax
 */ Root.prototype.toDescriptor = function toDescriptor(syntax) {
    var set = exports.FileDescriptorSet.create();
    Root_toDescriptorRecursive(this, set.file, syntax);
    return set;
};
// Traverses a namespace and assembles the descriptor set
function Root_toDescriptorRecursive(ns, files, syntax) {
    // Create a new file
    var file = exports.FileDescriptorProto.create({
        name: ns.filename || (ns.fullName.substring(1).replace(/\./g, "_") || "root") + ".proto"
    });
    if (syntax) file.syntax = syntax;
    if (!(ns instanceof Root)) file["package"] = ns.fullName.substring(1);
    // Add nested types
    for(var i = 0, nested; i < ns.nestedArray.length; ++i)if ((nested = ns._nestedArray[i]) instanceof Type) file.messageType.push(nested.toDescriptor(syntax));
    else if (nested instanceof Enum) file.enumType.push(nested.toDescriptor());
    else if (nested instanceof Field) file.extension.push(nested.toDescriptor(syntax));
    else if (nested instanceof Service) file.service.push(nested.toDescriptor());
    else if (nested instanceof /* plain */ Namespace) Root_toDescriptorRecursive(nested, files, syntax); // requires new file
    // Keep package-level options
    file.options = toDescriptorOptions(ns.options, exports.FileOptions);
    // And keep the file only if there is at least one nested object
    if (file.messageType.length + file.enumType.length + file.extension.length + file.service.length) files.push(file);
}
// --- Type ---
/**
 * Properties of a DescriptorProto message.
 * @interface IDescriptorProto
 * @property {string} [name] Message type name
 * @property {IFieldDescriptorProto[]} [field] Fields
 * @property {IFieldDescriptorProto[]} [extension] Extension fields
 * @property {IDescriptorProto[]} [nestedType] Nested message types
 * @property {IEnumDescriptorProto[]} [enumType] Nested enums
 * @property {IDescriptorProtoExtensionRange[]} [extensionRange] Extension ranges
 * @property {IOneofDescriptorProto[]} [oneofDecl] Oneofs
 * @property {IMessageOptions} [options] Not supported
 * @property {IDescriptorProtoReservedRange[]} [reservedRange] Reserved ranges
 * @property {string[]} [reservedName] Reserved names
 */ /**
 * Properties of a MessageOptions message.
 * @interface IMessageOptions
 * @property {boolean} [mapEntry=false] Whether this message is a map entry
 */ /**
 * Properties of an ExtensionRange message.
 * @interface IDescriptorProtoExtensionRange
 * @property {number} [start] Start field id
 * @property {number} [end] End field id
 */ /**
 * Properties of a ReservedRange message.
 * @interface IDescriptorProtoReservedRange
 * @property {number} [start] Start field id
 * @property {number} [end] End field id
 */ var unnamedMessageIndex = 0;
/**
 * Creates a type from a descriptor.
 * @param {IDescriptorProto|Reader|Uint8Array} descriptor Descriptor
 * @param {string} [syntax="proto2"] Syntax
 * @returns {Type} Type instance
 */ Type.fromDescriptor = function fromDescriptor(descriptor, syntax) {
    // Decode the descriptor message if specified as a buffer:
    if (typeof descriptor.length === "number") descriptor = exports.DescriptorProto.decode(descriptor);
    // Create the message type
    var type = new Type(descriptor.name.length ? descriptor.name : "Type" + unnamedMessageIndex++, fromDescriptorOptions(descriptor.options, exports.MessageOptions)), i;
    /* Oneofs */ if (descriptor.oneofDecl) for(i = 0; i < descriptor.oneofDecl.length; ++i)type.add(OneOf.fromDescriptor(descriptor.oneofDecl[i]));
    /* Fields */ if (descriptor.field) for(i = 0; i < descriptor.field.length; ++i){
        var field = Field.fromDescriptor(descriptor.field[i], syntax);
        type.add(field);
        if (descriptor.field[i].hasOwnProperty("oneofIndex")) type.oneofsArray[descriptor.field[i].oneofIndex].add(field);
    }
    /* Extension fields */ if (descriptor.extension) for(i = 0; i < descriptor.extension.length; ++i)type.add(Field.fromDescriptor(descriptor.extension[i], syntax));
    /* Nested types */ if (descriptor.nestedType) for(i = 0; i < descriptor.nestedType.length; ++i){
        type.add(Type.fromDescriptor(descriptor.nestedType[i], syntax));
        if (descriptor.nestedType[i].options && descriptor.nestedType[i].options.mapEntry) type.setOption("map_entry", true);
    }
    /* Nested enums */ if (descriptor.enumType) for(i = 0; i < descriptor.enumType.length; ++i)type.add(Enum.fromDescriptor(descriptor.enumType[i]));
    /* Extension ranges */ if (descriptor.extensionRange && descriptor.extensionRange.length) {
        type.extensions = [];
        for(i = 0; i < descriptor.extensionRange.length; ++i)type.extensions.push([
            descriptor.extensionRange[i].start,
            descriptor.extensionRange[i].end
        ]);
    }
    /* Reserved... */ if (descriptor.reservedRange && descriptor.reservedRange.length || descriptor.reservedName && descriptor.reservedName.length) {
        type.reserved = [];
        /* Ranges */ if (descriptor.reservedRange) for(i = 0; i < descriptor.reservedRange.length; ++i)type.reserved.push([
            descriptor.reservedRange[i].start,
            descriptor.reservedRange[i].end
        ]);
        /* Names */ if (descriptor.reservedName) for(i = 0; i < descriptor.reservedName.length; ++i)type.reserved.push(descriptor.reservedName[i]);
    }
    return type;
};
/**
 * Converts a type to a descriptor.
 * @returns {Message<IDescriptorProto>} Descriptor
 * @param {string} [syntax="proto2"] Syntax
 */ Type.prototype.toDescriptor = function toDescriptor(syntax) {
    var descriptor = exports.DescriptorProto.create({
        name: this.name
    }), i;
    /* Fields */ for(i = 0; i < this.fieldsArray.length; ++i){
        var fieldDescriptor;
        descriptor.field.push(fieldDescriptor = this._fieldsArray[i].toDescriptor(syntax));
        if (this._fieldsArray[i] instanceof MapField) {
            var keyType = toDescriptorType(this._fieldsArray[i].keyType, this._fieldsArray[i].resolvedKeyType), valueType = toDescriptorType(this._fieldsArray[i].type, this._fieldsArray[i].resolvedType), valueTypeName = valueType === /* type */ 11 || valueType === /* enum */ 14 ? this._fieldsArray[i].resolvedType && shortname(this.parent, this._fieldsArray[i].resolvedType) || this._fieldsArray[i].type : undefined;
            descriptor.nestedType.push(exports.DescriptorProto.create({
                name: fieldDescriptor.typeName,
                field: [
                    exports.FieldDescriptorProto.create({
                        name: "key",
                        number: 1,
                        label: 1,
                        type: keyType
                    }),
                    exports.FieldDescriptorProto.create({
                        name: "value",
                        number: 2,
                        label: 1,
                        type: valueType,
                        typeName: valueTypeName
                    })
                ],
                options: exports.MessageOptions.create({
                    mapEntry: true
                })
            }));
        }
    }
    /* Oneofs */ for(i = 0; i < this.oneofsArray.length; ++i)descriptor.oneofDecl.push(this._oneofsArray[i].toDescriptor());
    /* Nested... */ for(i = 0; i < this.nestedArray.length; ++i){
        /* Extension fields */ if (this._nestedArray[i] instanceof Field) descriptor.field.push(this._nestedArray[i].toDescriptor(syntax));
        else if (this._nestedArray[i] instanceof Type) descriptor.nestedType.push(this._nestedArray[i].toDescriptor(syntax));
        else if (this._nestedArray[i] instanceof Enum) descriptor.enumType.push(this._nestedArray[i].toDescriptor());
    // plain nested namespaces become packages instead in Root#toDescriptor
    }
    /* Extension ranges */ if (this.extensions) for(i = 0; i < this.extensions.length; ++i)descriptor.extensionRange.push(exports.DescriptorProto.ExtensionRange.create({
        start: this.extensions[i][0],
        end: this.extensions[i][1]
    }));
    /* Reserved... */ if (this.reserved) for(i = 0; i < this.reserved.length; ++i)/* Names */ if (typeof this.reserved[i] === "string") descriptor.reservedName.push(this.reserved[i]);
    else descriptor.reservedRange.push(exports.DescriptorProto.ReservedRange.create({
        start: this.reserved[i][0],
        end: this.reserved[i][1]
    }));
    descriptor.options = toDescriptorOptions(this.options, exports.MessageOptions);
    return descriptor;
};
// --- Field ---
/**
 * Properties of a FieldDescriptorProto message.
 * @interface IFieldDescriptorProto
 * @property {string} [name] Field name
 * @property {number} [number] Field id
 * @property {IFieldDescriptorProtoLabel} [label] Field rule
 * @property {IFieldDescriptorProtoType} [type] Field basic type
 * @property {string} [typeName] Field type name
 * @property {string} [extendee] Extended type name
 * @property {string} [defaultValue] Literal default value
 * @property {number} [oneofIndex] Oneof index if part of a oneof
 * @property {*} [jsonName] Not supported
 * @property {IFieldOptions} [options] Field options
 */ /**
 * Values of the FieldDescriptorProto.Label enum.
 * @typedef IFieldDescriptorProtoLabel
 * @type {number}
 * @property {number} LABEL_OPTIONAL=1
 * @property {number} LABEL_REQUIRED=2
 * @property {number} LABEL_REPEATED=3
 */ /**
 * Values of the FieldDescriptorProto.Type enum.
 * @typedef IFieldDescriptorProtoType
 * @type {number}
 * @property {number} TYPE_DOUBLE=1
 * @property {number} TYPE_FLOAT=2
 * @property {number} TYPE_INT64=3
 * @property {number} TYPE_UINT64=4
 * @property {number} TYPE_INT32=5
 * @property {number} TYPE_FIXED64=6
 * @property {number} TYPE_FIXED32=7
 * @property {number} TYPE_BOOL=8
 * @property {number} TYPE_STRING=9
 * @property {number} TYPE_GROUP=10
 * @property {number} TYPE_MESSAGE=11
 * @property {number} TYPE_BYTES=12
 * @property {number} TYPE_UINT32=13
 * @property {number} TYPE_ENUM=14
 * @property {number} TYPE_SFIXED32=15
 * @property {number} TYPE_SFIXED64=16
 * @property {number} TYPE_SINT32=17
 * @property {number} TYPE_SINT64=18
 */ /**
 * Properties of a FieldOptions message.
 * @interface IFieldOptions
 * @property {boolean} [packed] Whether packed or not (defaults to `false` for proto2 and `true` for proto3)
 * @property {IFieldOptionsJSType} [jstype] JavaScript value type (not used by protobuf.js)
 */ /**
 * Values of the FieldOptions.JSType enum.
 * @typedef IFieldOptionsJSType
 * @type {number}
 * @property {number} JS_NORMAL=0
 * @property {number} JS_STRING=1
 * @property {number} JS_NUMBER=2
 */ // copied here from parse.js
var numberRe = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/;
/**
 * Creates a field from a descriptor.
 * @param {IFieldDescriptorProto|Reader|Uint8Array} descriptor Descriptor
 * @param {string} [syntax="proto2"] Syntax
 * @returns {Field} Field instance
 */ Field.fromDescriptor = function fromDescriptor(descriptor, syntax) {
    // Decode the descriptor message if specified as a buffer:
    if (typeof descriptor.length === "number") descriptor = exports.DescriptorProto.decode(descriptor);
    if (typeof descriptor.number !== "number") throw Error("missing field id");
    // Rewire field type
    var fieldType;
    if (descriptor.typeName && descriptor.typeName.length) fieldType = descriptor.typeName;
    else fieldType = fromDescriptorType(descriptor.type);
    // Rewire field rule
    var fieldRule;
    switch(descriptor.label){
        // 0 is reserved for errors
        case 1:
            fieldRule = undefined;
            break;
        case 2:
            fieldRule = "required";
            break;
        case 3:
            fieldRule = "repeated";
            break;
        default:
            throw Error("illegal label: " + descriptor.label);
    }
    var extendee = descriptor.extendee;
    if (descriptor.extendee !== undefined) {
        extendee = extendee.length ? extendee : undefined;
    }
    var field = new Field(descriptor.name.length ? descriptor.name : "field" + descriptor.number, descriptor.number, fieldType, fieldRule, extendee);
    field.options = fromDescriptorOptions(descriptor.options, exports.FieldOptions);
    if (descriptor.defaultValue && descriptor.defaultValue.length) {
        var defaultValue = descriptor.defaultValue;
        switch(defaultValue){
            case "true":
            case "TRUE":
                defaultValue = true;
                break;
            case "false":
            case "FALSE":
                defaultValue = false;
                break;
            default:
                var match = numberRe.exec(defaultValue);
                if (match) defaultValue = parseInt(defaultValue); // eslint-disable-line radix
                break;
        }
        field.setOption("default", defaultValue);
    }
    if (packableDescriptorType(descriptor.type)) {
        if (syntax === "proto3") {
            if (descriptor.options && !descriptor.options.packed) field.setOption("packed", false);
        } else if (!(descriptor.options && descriptor.options.packed)) field.setOption("packed", false);
    }
    return field;
};
/**
 * Converts a field to a descriptor.
 * @returns {Message<IFieldDescriptorProto>} Descriptor
 * @param {string} [syntax="proto2"] Syntax
 */ Field.prototype.toDescriptor = function toDescriptor(syntax) {
    var descriptor = exports.FieldDescriptorProto.create({
        name: this.name,
        number: this.id
    });
    if (this.map) {
        descriptor.type = 11; // message
        descriptor.typeName = $protobuf.util.ucFirst(this.name); // fieldName -> FieldNameEntry (built in Type#toDescriptor)
        descriptor.label = 3; // repeated
    } else {
        // Rewire field type
        switch(descriptor.type = toDescriptorType(this.type, this.resolve().resolvedType)){
            case 10:
            case 11:
            case 14:
                descriptor.typeName = this.resolvedType ? shortname(this.parent, this.resolvedType) : this.type;
                break;
        }
        // Rewire field rule
        switch(this.rule){
            case "repeated":
                descriptor.label = 3;
                break;
            case "required":
                descriptor.label = 2;
                break;
            default:
                descriptor.label = 1;
                break;
        }
    }
    // Handle extension field
    descriptor.extendee = this.extensionField ? this.extensionField.parent.fullName : this.extend;
    // Handle part of oneof
    if (this.partOf) {
        if ((descriptor.oneofIndex = this.parent.oneofsArray.indexOf(this.partOf)) < 0) throw Error("missing oneof");
    }
    if (this.options) {
        descriptor.options = toDescriptorOptions(this.options, exports.FieldOptions);
        if (this.options["default"] != null) descriptor.defaultValue = String(this.options["default"]);
    }
    if (syntax === "proto3") {
        if (!this.packed) (descriptor.options || (descriptor.options = exports.FieldOptions.create())).packed = false;
    } else if (this.packed) (descriptor.options || (descriptor.options = exports.FieldOptions.create())).packed = true;
    return descriptor;
};
// --- Enum ---
/**
 * Properties of an EnumDescriptorProto message.
 * @interface IEnumDescriptorProto
 * @property {string} [name] Enum name
 * @property {IEnumValueDescriptorProto[]} [value] Enum values
 * @property {IEnumOptions} [options] Enum options
 */ /**
 * Properties of an EnumValueDescriptorProto message.
 * @interface IEnumValueDescriptorProto
 * @property {string} [name] Name
 * @property {number} [number] Value
 * @property {*} [options] Not supported
 */ /**
 * Properties of an EnumOptions message.
 * @interface IEnumOptions
 * @property {boolean} [allowAlias] Whether aliases are allowed
 * @property {boolean} [deprecated]
 */ var unnamedEnumIndex = 0;
/**
 * Creates an enum from a descriptor.
 * @param {IEnumDescriptorProto|Reader|Uint8Array} descriptor Descriptor
 * @returns {Enum} Enum instance
 */ Enum.fromDescriptor = function fromDescriptor(descriptor) {
    // Decode the descriptor message if specified as a buffer:
    if (typeof descriptor.length === "number") descriptor = exports.EnumDescriptorProto.decode(descriptor);
    // Construct values object
    var values = {};
    if (descriptor.value) for(var i = 0; i < descriptor.value.length; ++i){
        var name = descriptor.value[i].name, value = descriptor.value[i].number || 0;
        values[name && name.length ? name : "NAME" + value] = value;
    }
    return new Enum(descriptor.name && descriptor.name.length ? descriptor.name : "Enum" + unnamedEnumIndex++, values, fromDescriptorOptions(descriptor.options, exports.EnumOptions));
};
/**
 * Converts an enum to a descriptor.
 * @returns {Message<IEnumDescriptorProto>} Descriptor
 */ Enum.prototype.toDescriptor = function toDescriptor() {
    // Values
    var values = [];
    for(var i = 0, ks = Object.keys(this.values); i < ks.length; ++i)values.push(exports.EnumValueDescriptorProto.create({
        name: ks[i],
        number: this.values[ks[i]]
    }));
    return exports.EnumDescriptorProto.create({
        name: this.name,
        value: values,
        options: toDescriptorOptions(this.options, exports.EnumOptions)
    });
};
// --- OneOf ---
/**
 * Properties of a OneofDescriptorProto message.
 * @interface IOneofDescriptorProto
 * @property {string} [name] Oneof name
 * @property {*} [options] Not supported
 */ var unnamedOneofIndex = 0;
/**
 * Creates a oneof from a descriptor.
 * @param {IOneofDescriptorProto|Reader|Uint8Array} descriptor Descriptor
 * @returns {OneOf} OneOf instance
 */ OneOf.fromDescriptor = function fromDescriptor(descriptor) {
    // Decode the descriptor message if specified as a buffer:
    if (typeof descriptor.length === "number") descriptor = exports.OneofDescriptorProto.decode(descriptor);
    return new OneOf(// unnamedOneOfIndex is global, not per type, because we have no ref to a type here
    descriptor.name && descriptor.name.length ? descriptor.name : "oneof" + unnamedOneofIndex++);
};
/**
 * Converts a oneof to a descriptor.
 * @returns {Message<IOneofDescriptorProto>} Descriptor
 */ OneOf.prototype.toDescriptor = function toDescriptor() {
    return exports.OneofDescriptorProto.create({
        name: this.name
    });
};
// --- Service ---
/**
 * Properties of a ServiceDescriptorProto message.
 * @interface IServiceDescriptorProto
 * @property {string} [name] Service name
 * @property {IMethodDescriptorProto[]} [method] Methods
 * @property {IServiceOptions} [options] Options
 */ /**
 * Properties of a ServiceOptions message.
 * @interface IServiceOptions
 * @property {boolean} [deprecated]
 */ var unnamedServiceIndex = 0;
/**
 * Creates a service from a descriptor.
 * @param {IServiceDescriptorProto|Reader|Uint8Array} descriptor Descriptor
 * @returns {Service} Service instance
 */ Service.fromDescriptor = function fromDescriptor(descriptor) {
    // Decode the descriptor message if specified as a buffer:
    if (typeof descriptor.length === "number") descriptor = exports.ServiceDescriptorProto.decode(descriptor);
    var service = new Service(descriptor.name && descriptor.name.length ? descriptor.name : "Service" + unnamedServiceIndex++, fromDescriptorOptions(descriptor.options, exports.ServiceOptions));
    if (descriptor.method) for(var i = 0; i < descriptor.method.length; ++i)service.add(Method.fromDescriptor(descriptor.method[i]));
    return service;
};
/**
 * Converts a service to a descriptor.
 * @returns {Message<IServiceDescriptorProto>} Descriptor
 */ Service.prototype.toDescriptor = function toDescriptor() {
    // Methods
    var methods = [];
    for(var i = 0; i < this.methodsArray.length; ++i)methods.push(this._methodsArray[i].toDescriptor());
    return exports.ServiceDescriptorProto.create({
        name: this.name,
        method: methods,
        options: toDescriptorOptions(this.options, exports.ServiceOptions)
    });
};
// --- Method ---
/**
 * Properties of a MethodDescriptorProto message.
 * @interface IMethodDescriptorProto
 * @property {string} [name] Method name
 * @property {string} [inputType] Request type name
 * @property {string} [outputType] Response type name
 * @property {IMethodOptions} [options] Not supported
 * @property {boolean} [clientStreaming=false] Whether requests are streamed
 * @property {boolean} [serverStreaming=false] Whether responses are streamed
 */ /**
 * Properties of a MethodOptions message.
 * @interface IMethodOptions
 * @property {boolean} [deprecated]
 */ var unnamedMethodIndex = 0;
/**
 * Creates a method from a descriptor.
 * @param {IMethodDescriptorProto|Reader|Uint8Array} descriptor Descriptor
 * @returns {Method} Reflected method instance
 */ Method.fromDescriptor = function fromDescriptor(descriptor) {
    // Decode the descriptor message if specified as a buffer:
    if (typeof descriptor.length === "number") descriptor = exports.MethodDescriptorProto.decode(descriptor);
    return new Method(// unnamedMethodIndex is global, not per service, because we have no ref to a service here
    descriptor.name && descriptor.name.length ? descriptor.name : "Method" + unnamedMethodIndex++, "rpc", descriptor.inputType, descriptor.outputType, Boolean(descriptor.clientStreaming), Boolean(descriptor.serverStreaming), fromDescriptorOptions(descriptor.options, exports.MethodOptions));
};
/**
 * Converts a method to a descriptor.
 * @returns {Message<IMethodDescriptorProto>} Descriptor
 */ Method.prototype.toDescriptor = function toDescriptor() {
    return exports.MethodDescriptorProto.create({
        name: this.name,
        inputType: this.resolvedRequestType ? this.resolvedRequestType.fullName : this.requestType,
        outputType: this.resolvedResponseType ? this.resolvedResponseType.fullName : this.responseType,
        clientStreaming: this.requestStream,
        serverStreaming: this.responseStream,
        options: toDescriptorOptions(this.options, exports.MethodOptions)
    });
};
// --- utility ---
// Converts a descriptor type to a protobuf.js basic type
function fromDescriptorType(type) {
    switch(type){
        // 0 is reserved for errors
        case 1:
            return "double";
        case 2:
            return "float";
        case 3:
            return "int64";
        case 4:
            return "uint64";
        case 5:
            return "int32";
        case 6:
            return "fixed64";
        case 7:
            return "fixed32";
        case 8:
            return "bool";
        case 9:
            return "string";
        case 12:
            return "bytes";
        case 13:
            return "uint32";
        case 15:
            return "sfixed32";
        case 16:
            return "sfixed64";
        case 17:
            return "sint32";
        case 18:
            return "sint64";
    }
    throw Error("illegal type: " + type);
}
// Tests if a descriptor type is packable
function packableDescriptorType(type) {
    switch(type){
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
            return true;
    }
    return false;
}
// Converts a protobuf.js basic type to a descriptor type
function toDescriptorType(type, resolvedType) {
    switch(type){
        // 0 is reserved for errors
        case "double":
            return 1;
        case "float":
            return 2;
        case "int64":
            return 3;
        case "uint64":
            return 4;
        case "int32":
            return 5;
        case "fixed64":
            return 6;
        case "fixed32":
            return 7;
        case "bool":
            return 8;
        case "string":
            return 9;
        case "bytes":
            return 12;
        case "uint32":
            return 13;
        case "sfixed32":
            return 15;
        case "sfixed64":
            return 16;
        case "sint32":
            return 17;
        case "sint64":
            return 18;
    }
    if (resolvedType instanceof Enum) return 14;
    if (resolvedType instanceof Type) return resolvedType.group ? 10 : 11;
    throw Error("illegal type: " + type);
}
// Converts descriptor options to an options object
function fromDescriptorOptions(options, type) {
    if (!options) return undefined;
    var out = [];
    for(var i = 0, field, key, val; i < type.fieldsArray.length; ++i)if ((key = (field = type._fieldsArray[i]).name) !== "uninterpretedOption") {
        if (options.hasOwnProperty(key)) {
            val = options[key];
            if (field.resolvedType instanceof Enum && typeof val === "number" && field.resolvedType.valuesById[val] !== undefined) val = field.resolvedType.valuesById[val];
            out.push(underScore(key), val);
        }
    }
    return out.length ? $protobuf.util.toObject(out) : undefined;
}
// Converts an options object to descriptor options
function toDescriptorOptions(options, type) {
    if (!options) return undefined;
    var out = [];
    for(var i = 0, ks = Object.keys(options), key, val; i < ks.length; ++i){
        val = options[key = ks[i]];
        if (key === "default") continue;
        var field = type.fields[key];
        if (!field && !(field = type.fields[key = $protobuf.util.camelCase(key)])) continue;
        out.push(key, val);
    }
    return out.length ? type.fromObject($protobuf.util.toObject(out)) : undefined;
}
// Calculates the shortest relative path from `from` to `to`.
function shortname(from, to) {
    var fromPath = from.fullName.split("."), toPath = to.fullName.split("."), i = 0, j = 0, k = toPath.length - 1;
    if (!(from instanceof Root) && to instanceof Namespace) while(i < fromPath.length && j < k && fromPath[i] === toPath[j]){
        var other = to.lookup(fromPath[i++], true);
        if (other !== null && other !== to) break;
        ++j;
    }
    else for(; i < fromPath.length && j < k && fromPath[i] === toPath[j]; ++i, ++j);
    return toPath.slice(j).join(".");
}
// copied here from cli/targets/proto.js
function underScore(str) {
    return str.substring(0, 1) + str.substring(1).replace(/([A-Z])(?=[a-z]|$)/g, function($0, $1) {
        return "_" + $1.toLowerCase();
    });
} // --- exports ---
 /**
 * Reflected file descriptor set.
 * @name FileDescriptorSet
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */  /**
 * Reflected file descriptor proto.
 * @name FileDescriptorProto
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */  /**
 * Reflected descriptor proto.
 * @name DescriptorProto
 * @type {Type}
 * @property {Type} ExtensionRange
 * @property {Type} ReservedRange
 * @const
 * @tstype $protobuf.Type & {
 *     ExtensionRange: $protobuf.Type,
 *     ReservedRange: $protobuf.Type
 * }
 */  /**
 * Reflected field descriptor proto.
 * @name FieldDescriptorProto
 * @type {Type}
 * @property {Enum} Label
 * @property {Enum} Type
 * @const
 * @tstype $protobuf.Type & {
 *     Label: $protobuf.Enum,
 *     Type: $protobuf.Enum
 * }
 */  /**
 * Reflected oneof descriptor proto.
 * @name OneofDescriptorProto
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */  /**
 * Reflected enum descriptor proto.
 * @name EnumDescriptorProto
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */  /**
 * Reflected service descriptor proto.
 * @name ServiceDescriptorProto
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */  /**
 * Reflected enum value descriptor proto.
 * @name EnumValueDescriptorProto
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */  /**
 * Reflected method descriptor proto.
 * @name MethodDescriptorProto
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */  /**
 * Reflected file options.
 * @name FileOptions
 * @type {Type}
 * @property {Enum} OptimizeMode
 * @const
 * @tstype $protobuf.Type & {
 *     OptimizeMode: $protobuf.Enum
 * }
 */  /**
 * Reflected message options.
 * @name MessageOptions
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */  /**
 * Reflected field options.
 * @name FieldOptions
 * @type {Type}
 * @property {Enum} CType
 * @property {Enum} JSType
 * @const
 * @tstype $protobuf.Type & {
 *     CType: $protobuf.Enum,
 *     JSType: $protobuf.Enum
 * }
 */  /**
 * Reflected oneof options.
 * @name OneofOptions
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */  /**
 * Reflected enum options.
 * @name EnumOptions
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */  /**
 * Reflected enum value options.
 * @name EnumValueOptions
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */  /**
 * Reflected service options.
 * @name ServiceOptions
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */  /**
 * Reflected method options.
 * @name MethodOptions
 * @type {Type}
 * @const
 * @tstype $protobuf.Type
 */  /**
 * Reflected uninterpretet option.
 * @name UninterpretedOption
 * @type {Type}
 * @property {Type} NamePart
 * @const
 * @tstype $protobuf.Type & {
 *     NamePart: $protobuf.Type
 * }
 */  /**
 * Reflected source code info.
 * @name SourceCodeInfo
 * @type {Type}
 * @property {Type} Location
 * @const
 * @tstype $protobuf.Type & {
 *     Location: $protobuf.Type
 * }
 */  /**
 * Reflected generated code info.
 * @name GeneratedCodeInfo
 * @type {Type}
 * @property {Type} Annotation
 * @const
 * @tstype $protobuf.Type & {
 *     Annotation: $protobuf.Type
 * }
 */ 


/***/ }),

/***/ 12206:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// full library entry point.

module.exports = __webpack_require__(38778);


/***/ }),

/***/ 78450:
/***/ ((module) => {


module.exports = common;
var commonRe = /\/|\./;
/**
 * Provides common type definitions.
 * Can also be used to provide additional google types or your own custom types.
 * @param {string} name Short name as in `google/protobuf/[name].proto` or full file name
 * @param {Object.<string,*>} json JSON definition within `google.protobuf` if a short name, otherwise the file's root definition
 * @returns {undefined}
 * @property {INamespace} google/protobuf/any.proto Any
 * @property {INamespace} google/protobuf/duration.proto Duration
 * @property {INamespace} google/protobuf/empty.proto Empty
 * @property {INamespace} google/protobuf/field_mask.proto FieldMask
 * @property {INamespace} google/protobuf/struct.proto Struct, Value, NullValue and ListValue
 * @property {INamespace} google/protobuf/timestamp.proto Timestamp
 * @property {INamespace} google/protobuf/wrappers.proto Wrappers
 * @example
 * // manually provides descriptor.proto (assumes google/protobuf/ namespace and .proto extension)
 * protobuf.common("descriptor", descriptorJson);
 *
 * // manually provides a custom definition (uses my.foo namespace)
 * protobuf.common("my/foo/bar.proto", myFooBarJson);
 */ function common(name, json) {
    if (!commonRe.test(name)) {
        name = "google/protobuf/" + name + ".proto";
        json = {
            nested: {
                google: {
                    nested: {
                        protobuf: {
                            nested: json
                        }
                    }
                }
            }
        };
    }
    common[name] = json;
}
// Not provided because of limited use (feel free to discuss or to provide yourself):
//
// google/protobuf/descriptor.proto
// google/protobuf/source_context.proto
// google/protobuf/type.proto
//
// Stripped and pre-parsed versions of these non-bundled files are instead available as part of
// the repository or package within the google/protobuf directory.
common("any", {
    /**
     * Properties of a google.protobuf.Any message.
     * @interface IAny
     * @type {Object}
     * @property {string} [typeUrl]
     * @property {Uint8Array} [bytes]
     * @memberof common
     */ Any: {
        fields: {
            type_url: {
                type: "string",
                id: 1
            },
            value: {
                type: "bytes",
                id: 2
            }
        }
    }
});
var timeType;
common("duration", {
    /**
     * Properties of a google.protobuf.Duration message.
     * @interface IDuration
     * @type {Object}
     * @property {number|Long} [seconds]
     * @property {number} [nanos]
     * @memberof common
     */ Duration: timeType = {
        fields: {
            seconds: {
                type: "int64",
                id: 1
            },
            nanos: {
                type: "int32",
                id: 2
            }
        }
    }
});
common("timestamp", {
    /**
     * Properties of a google.protobuf.Timestamp message.
     * @interface ITimestamp
     * @type {Object}
     * @property {number|Long} [seconds]
     * @property {number} [nanos]
     * @memberof common
     */ Timestamp: timeType
});
common("empty", {
    /**
     * Properties of a google.protobuf.Empty message.
     * @interface IEmpty
     * @memberof common
     */ Empty: {
        fields: {}
    }
});
common("struct", {
    /**
     * Properties of a google.protobuf.Struct message.
     * @interface IStruct
     * @type {Object}
     * @property {Object.<string,IValue>} [fields]
     * @memberof common
     */ Struct: {
        fields: {
            fields: {
                keyType: "string",
                type: "Value",
                id: 1
            }
        }
    },
    /**
     * Properties of a google.protobuf.Value message.
     * @interface IValue
     * @type {Object}
     * @property {string} [kind]
     * @property {0} [nullValue]
     * @property {number} [numberValue]
     * @property {string} [stringValue]
     * @property {boolean} [boolValue]
     * @property {IStruct} [structValue]
     * @property {IListValue} [listValue]
     * @memberof common
     */ Value: {
        oneofs: {
            kind: {
                oneof: [
                    "nullValue",
                    "numberValue",
                    "stringValue",
                    "boolValue",
                    "structValue",
                    "listValue"
                ]
            }
        },
        fields: {
            nullValue: {
                type: "NullValue",
                id: 1
            },
            numberValue: {
                type: "double",
                id: 2
            },
            stringValue: {
                type: "string",
                id: 3
            },
            boolValue: {
                type: "bool",
                id: 4
            },
            structValue: {
                type: "Struct",
                id: 5
            },
            listValue: {
                type: "ListValue",
                id: 6
            }
        }
    },
    NullValue: {
        values: {
            NULL_VALUE: 0
        }
    },
    /**
     * Properties of a google.protobuf.ListValue message.
     * @interface IListValue
     * @type {Object}
     * @property {Array.<IValue>} [values]
     * @memberof common
     */ ListValue: {
        fields: {
            values: {
                rule: "repeated",
                type: "Value",
                id: 1
            }
        }
    }
});
common("wrappers", {
    /**
     * Properties of a google.protobuf.DoubleValue message.
     * @interface IDoubleValue
     * @type {Object}
     * @property {number} [value]
     * @memberof common
     */ DoubleValue: {
        fields: {
            value: {
                type: "double",
                id: 1
            }
        }
    },
    /**
     * Properties of a google.protobuf.FloatValue message.
     * @interface IFloatValue
     * @type {Object}
     * @property {number} [value]
     * @memberof common
     */ FloatValue: {
        fields: {
            value: {
                type: "float",
                id: 1
            }
        }
    },
    /**
     * Properties of a google.protobuf.Int64Value message.
     * @interface IInt64Value
     * @type {Object}
     * @property {number|Long} [value]
     * @memberof common
     */ Int64Value: {
        fields: {
            value: {
                type: "int64",
                id: 1
            }
        }
    },
    /**
     * Properties of a google.protobuf.UInt64Value message.
     * @interface IUInt64Value
     * @type {Object}
     * @property {number|Long} [value]
     * @memberof common
     */ UInt64Value: {
        fields: {
            value: {
                type: "uint64",
                id: 1
            }
        }
    },
    /**
     * Properties of a google.protobuf.Int32Value message.
     * @interface IInt32Value
     * @type {Object}
     * @property {number} [value]
     * @memberof common
     */ Int32Value: {
        fields: {
            value: {
                type: "int32",
                id: 1
            }
        }
    },
    /**
     * Properties of a google.protobuf.UInt32Value message.
     * @interface IUInt32Value
     * @type {Object}
     * @property {number} [value]
     * @memberof common
     */ UInt32Value: {
        fields: {
            value: {
                type: "uint32",
                id: 1
            }
        }
    },
    /**
     * Properties of a google.protobuf.BoolValue message.
     * @interface IBoolValue
     * @type {Object}
     * @property {boolean} [value]
     * @memberof common
     */ BoolValue: {
        fields: {
            value: {
                type: "bool",
                id: 1
            }
        }
    },
    /**
     * Properties of a google.protobuf.StringValue message.
     * @interface IStringValue
     * @type {Object}
     * @property {string} [value]
     * @memberof common
     */ StringValue: {
        fields: {
            value: {
                type: "string",
                id: 1
            }
        }
    },
    /**
     * Properties of a google.protobuf.BytesValue message.
     * @interface IBytesValue
     * @type {Object}
     * @property {Uint8Array} [value]
     * @memberof common
     */ BytesValue: {
        fields: {
            value: {
                type: "bytes",
                id: 1
            }
        }
    }
});
common("field_mask", {
    /**
     * Properties of a google.protobuf.FieldMask message.
     * @interface IDoubleValue
     * @type {Object}
     * @property {number} [value]
     * @memberof common
     */ FieldMask: {
        fields: {
            paths: {
                rule: "repeated",
                type: "string",
                id: 1
            }
        }
    }
});
/**
 * Gets the root definition of the specified common proto file.
 *
 * Bundled definitions are:
 * - google/protobuf/any.proto
 * - google/protobuf/duration.proto
 * - google/protobuf/empty.proto
 * - google/protobuf/field_mask.proto
 * - google/protobuf/struct.proto
 * - google/protobuf/timestamp.proto
 * - google/protobuf/wrappers.proto
 *
 * @param {string} file Proto file name
 * @returns {INamespace|null} Root definition or `null` if not defined
 */ common.get = function get(file) {
    return common[file] || null;
};


/***/ }),

/***/ 80285:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * Runtime message from/to plain object converters.
 * @namespace
 */ var converter = exports;
var Enum = __webpack_require__(4328), util = __webpack_require__(31502);
/**
 * Generates a partial value fromObject conveter.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} prop Property reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */ function genValuePartial_fromObject(gen, field, fieldIndex, prop) {
    var defaultAlreadyEmitted = false;
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */ if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) {
            gen("switch(d%s){", prop);
            for(var values = field.resolvedType.values, keys = Object.keys(values), i = 0; i < keys.length; ++i){
                // enum unknown values passthrough
                if (values[keys[i]] === field.typeDefault && !defaultAlreadyEmitted) {
                    gen("default:")('if(typeof(d%s)==="number"){m%s=d%s;break}', prop, prop, prop);
                    if (!field.repeated) gen // fallback to default value only for
                    ("break"); // for non-repeated fields, just ignore
                    defaultAlreadyEmitted = true;
                }
                gen("case%j:", keys[i])("case %i:", values[keys[i]])("m%s=%j", prop, values[keys[i]])("break");
            }
            gen("}");
        } else gen('if(typeof d%s!=="object")', prop)("throw TypeError(%j)", field.fullName + ": object expected")("m%s=types[%i].fromObject(d%s)", prop, fieldIndex, prop);
    } else {
        var isUnsigned = false;
        switch(field.type){
            case "double":
            case "float":
                gen("m%s=Number(d%s)", prop, prop); // also catches "NaN", "Infinity"
                break;
            case "uint32":
            case "fixed32":
                gen("m%s=d%s>>>0", prop, prop);
                break;
            case "int32":
            case "sint32":
            case "sfixed32":
                gen("m%s=d%s|0", prop, prop);
                break;
            case "uint64":
                isUnsigned = true;
            // eslint-disable-line no-fallthrough
            case "int64":
            case "sint64":
            case "fixed64":
            case "sfixed64":
                gen("if(util.Long)")("(m%s=util.Long.fromValue(d%s)).unsigned=%j", prop, prop, isUnsigned)('else if(typeof d%s==="string")', prop)("m%s=parseInt(d%s,10)", prop, prop)('else if(typeof d%s==="number")', prop)("m%s=d%s", prop, prop)('else if(typeof d%s==="object")', prop)("m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)", prop, prop, prop, isUnsigned ? "true" : "");
                break;
            case "bytes":
                gen('if(typeof d%s==="string")', prop)("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)", prop, prop, prop)("else if(d%s.length >= 0)", prop)("m%s=d%s", prop, prop);
                break;
            case "string":
                gen("m%s=String(d%s)", prop, prop);
                break;
            case "bool":
                gen("m%s=Boolean(d%s)", prop, prop);
                break;
        }
    }
    return gen;
/* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */ }
/**
 * Generates a plain object to runtime message converter specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */ converter.fromObject = function fromObject(mtype) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */ var fields = mtype.fieldsArray;
    var gen = util.codegen([
        "d"
    ], mtype.name + "$fromObject")("if(d instanceof this.ctor)")("return d");
    if (!fields.length) return gen("return new this.ctor");
    gen("var m=new this.ctor");
    for(var i = 0; i < fields.length; ++i){
        var field = fields[i].resolve(), prop = util.safeProp(field.name);
        // Map fields
        if (field.map) {
            gen("if(d%s){", prop)('if(typeof d%s!=="object")', prop)("throw TypeError(%j)", field.fullName + ": object expected")("m%s={}", prop)("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){", prop);
            genValuePartial_fromObject(gen, field, /* not sorted */ i, prop + "[ks[i]]")("}")("}");
        // Repeated fields
        } else if (field.repeated) {
            gen("if(d%s){", prop)("if(!Array.isArray(d%s))", prop)("throw TypeError(%j)", field.fullName + ": array expected")("m%s=[]", prop)("for(var i=0;i<d%s.length;++i){", prop);
            genValuePartial_fromObject(gen, field, /* not sorted */ i, prop + "[i]")("}")("}");
        // Non-repeated fields
        } else {
            if (!(field.resolvedType instanceof Enum)) gen // no need to test for null/undefined if an enum (uses switch)
            ("if(d%s!=null){", prop); // !== undefined && !== null
            genValuePartial_fromObject(gen, field, /* not sorted */ i, prop);
            if (!(field.resolvedType instanceof Enum)) gen("}");
        }
    }
    return gen("return m");
/* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */ };
/**
 * Generates a partial value toObject converter.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} prop Property reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */ function genValuePartial_toObject(gen, field, fieldIndex, prop) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */ if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) gen("d%s=o.enums===String?(types[%i].values[m%s]===undefined?m%s:types[%i].values[m%s]):m%s", prop, fieldIndex, prop, prop, fieldIndex, prop, prop);
        else gen("d%s=types[%i].toObject(m%s,o)", prop, fieldIndex, prop);
    } else {
        var isUnsigned = false;
        switch(field.type){
            case "double":
            case "float":
                gen("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s", prop, prop, prop, prop);
                break;
            case "uint64":
                isUnsigned = true;
            // eslint-disable-line no-fallthrough
            case "int64":
            case "sint64":
            case "fixed64":
            case "sfixed64":
                gen('if(typeof m%s==="number")', prop)("d%s=o.longs===String?String(m%s):m%s", prop, prop, prop)("else") // Long-like
                ("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s", prop, prop, prop, prop, isUnsigned ? "true" : "", prop);
                break;
            case "bytes":
                gen("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s", prop, prop, prop, prop, prop);
                break;
            default:
                gen("d%s=m%s", prop, prop);
                break;
        }
    }
    return gen;
/* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */ }
/**
 * Generates a runtime message to plain object converter specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */ converter.toObject = function toObject(mtype) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */ var fields = mtype.fieldsArray.slice().sort(util.compareFieldsById);
    if (!fields.length) return util.codegen()("return {}");
    var gen = util.codegen([
        "m",
        "o"
    ], mtype.name + "$toObject")("if(!o)")("o={}")("var d={}");
    var repeatedFields = [], mapFields = [], normalFields = [], i = 0;
    for(; i < fields.length; ++i)if (!fields[i].partOf) (fields[i].resolve().repeated ? repeatedFields : fields[i].map ? mapFields : normalFields).push(fields[i]);
    if (repeatedFields.length) {
        gen("if(o.arrays||o.defaults){");
        for(i = 0; i < repeatedFields.length; ++i)gen("d%s=[]", util.safeProp(repeatedFields[i].name));
        gen("}");
    }
    if (mapFields.length) {
        gen("if(o.objects||o.defaults){");
        for(i = 0; i < mapFields.length; ++i)gen("d%s={}", util.safeProp(mapFields[i].name));
        gen("}");
    }
    if (normalFields.length) {
        gen("if(o.defaults){");
        for(i = 0; i < normalFields.length; ++i){
            var field = normalFields[i], prop = util.safeProp(field.name);
            if (field.resolvedType instanceof Enum) gen("d%s=o.enums===String?%j:%j", prop, field.resolvedType.valuesById[field.typeDefault], field.typeDefault);
            else if (field.long) gen("if(util.Long){")("var n=new util.Long(%i,%i,%j)", field.typeDefault.low, field.typeDefault.high, field.typeDefault.unsigned)("d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n", prop)("}else")("d%s=o.longs===String?%j:%i", prop, field.typeDefault.toString(), field.typeDefault.toNumber());
            else if (field.bytes) {
                var arrayDefault = "[" + Array.prototype.slice.call(field.typeDefault).join(",") + "]";
                gen("if(o.bytes===String)d%s=%j", prop, String.fromCharCode.apply(String, field.typeDefault))("else{")("d%s=%s", prop, arrayDefault)("if(o.bytes!==Array)d%s=util.newBuffer(d%s)", prop, prop)("}");
            } else gen("d%s=%j", prop, field.typeDefault); // also messages (=null)
        }
        gen("}");
    }
    var hasKs2 = false;
    for(i = 0; i < fields.length; ++i){
        var field = fields[i], index = mtype._fieldsArray.indexOf(field), prop = util.safeProp(field.name);
        if (field.map) {
            if (!hasKs2) {
                hasKs2 = true;
                gen("var ks2");
            }
            gen("if(m%s&&(ks2=Object.keys(m%s)).length){", prop, prop)("d%s={}", prop)("for(var j=0;j<ks2.length;++j){");
            genValuePartial_toObject(gen, field, /* sorted */ index, prop + "[ks2[j]]")("}");
        } else if (field.repeated) {
            gen("if(m%s&&m%s.length){", prop, prop)("d%s=[]", prop)("for(var j=0;j<m%s.length;++j){", prop);
            genValuePartial_toObject(gen, field, /* sorted */ index, prop + "[j]")("}");
        } else {
            gen("if(m%s!=null&&m.hasOwnProperty(%j)){", prop, field.name); // !== undefined && !== null
            genValuePartial_toObject(gen, field, /* sorted */ index, prop);
            if (field.partOf) gen("if(o.oneofs)")("d%s=%j", util.safeProp(field.partOf.name), field.name);
        }
        gen("}");
    }
    return gen("return d");
/* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */ };


/***/ }),

/***/ 14935:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = decoder;
var Enum = __webpack_require__(4328), types = __webpack_require__(84438), util = __webpack_require__(31502);
function missing(field) {
    return "missing required '" + field.name + "'";
}
/**
 * Generates a decoder specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */ function decoder(mtype) {
    /* eslint-disable no-unexpected-multiline */ var gen = util.codegen([
        "r",
        "l"
    ], mtype.name + "$decode")("if(!(r instanceof Reader))")("r=Reader.create(r)")("var c=l===undefined?r.len:r.pos+l,m=new this.ctor" + (mtype.fieldsArray.filter(function(field) {
        return field.map;
    }).length ? ",k,value" : ""))("while(r.pos<c){")("var t=r.uint32()");
    if (mtype.group) gen("if((t&7)===4)")("break");
    gen("switch(t>>>3){");
    var i = 0;
    for(; i < /* initializes */ mtype.fieldsArray.length; ++i){
        var field = mtype._fieldsArray[i].resolve(), type = field.resolvedType instanceof Enum ? "int32" : field.type, ref = "m" + util.safeProp(field.name);
        gen("case %i: {", field.id);
        // Map fields
        if (field.map) {
            gen("if(%s===util.emptyObject)", ref)("%s={}", ref)("var c2 = r.uint32()+r.pos");
            if (types.defaults[field.keyType] !== undefined) gen("k=%j", types.defaults[field.keyType]);
            else gen("k=null");
            if (types.defaults[type] !== undefined) gen("value=%j", types.defaults[type]);
            else gen("value=null");
            gen("while(r.pos<c2){")("var tag2=r.uint32()")("switch(tag2>>>3){")("case 1: k=r.%s(); break", field.keyType)("case 2:");
            if (types.basic[type] === undefined) gen("value=types[%i].decode(r,r.uint32())", i); // can't be groups
            else gen("value=r.%s()", type);
            gen("break")("default:")("r.skipType(tag2&7)")("break")("}")("}");
            if (types.long[field.keyType] !== undefined) gen('%s[typeof k==="object"?util.longToHash(k):k]=value', ref);
            else gen("%s[k]=value", ref);
        // Repeated fields
        } else if (field.repeated) {
            gen("if(!(%s&&%s.length))", ref, ref)("%s=[]", ref);
            // Packable (always check for forward and backward compatiblity)
            if (types.packed[type] !== undefined) gen("if((t&7)===2){")("var c2=r.uint32()+r.pos")("while(r.pos<c2)")("%s.push(r.%s())", ref, type)("}else");
            // Non-packed
            if (types.basic[type] === undefined) gen(field.resolvedType.group ? "%s.push(types[%i].decode(r))" : "%s.push(types[%i].decode(r,r.uint32()))", ref, i);
            else gen("%s.push(r.%s())", ref, type);
        // Non-repeated
        } else if (types.basic[type] === undefined) gen(field.resolvedType.group ? "%s=types[%i].decode(r)" : "%s=types[%i].decode(r,r.uint32())", ref, i);
        else gen("%s=r.%s()", ref, type);
        gen("break")("}");
    // Unknown fields
    }
    gen("default:")("r.skipType(t&7)")("break")("}")("}");
    // Field presence
    for(i = 0; i < mtype._fieldsArray.length; ++i){
        var rfield = mtype._fieldsArray[i];
        if (rfield.required) gen("if(!m.hasOwnProperty(%j))", rfield.name)("throw util.ProtocolError(%j,{instance:m})", missing(rfield));
    }
    return gen("return m");
/* eslint-enable no-unexpected-multiline */ }


/***/ }),

/***/ 49324:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = encoder;
var Enum = __webpack_require__(4328), types = __webpack_require__(84438), util = __webpack_require__(31502);
/**
 * Generates a partial message type encoder.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} ref Variable reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */ function genTypePartial(gen, field, fieldIndex, ref) {
    return field.resolvedType.group ? gen("types[%i].encode(%s,w.uint32(%i)).uint32(%i)", fieldIndex, ref, (field.id << 3 | 3) >>> 0, (field.id << 3 | 4) >>> 0) : gen("types[%i].encode(%s,w.uint32(%i).fork()).ldelim()", fieldIndex, ref, (field.id << 3 | 2) >>> 0);
}
/**
 * Generates an encoder specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */ function encoder(mtype) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */ var gen = util.codegen([
        "m",
        "w"
    ], mtype.name + "$encode")("if(!w)")("w=Writer.create()");
    var i, ref;
    // "when a message is serialized its known fields should be written sequentially by field number"
    var fields = /* initializes */ mtype.fieldsArray.slice().sort(util.compareFieldsById);
    for(var i = 0; i < fields.length; ++i){
        var field = fields[i].resolve(), index = mtype._fieldsArray.indexOf(field), type = field.resolvedType instanceof Enum ? "int32" : field.type, wireType = types.basic[type];
        ref = "m" + util.safeProp(field.name);
        // Map fields
        if (field.map) {
            gen("if(%s!=null&&Object.hasOwnProperty.call(m,%j)){", ref, field.name) // !== undefined && !== null
            ("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", ref)("w.uint32(%i).fork().uint32(%i).%s(ks[i])", (field.id << 3 | 2) >>> 0, 8 | types.mapKey[field.keyType], field.keyType);
            if (wireType === undefined) gen("types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()", index, ref); // can't be groups
            else gen(".uint32(%i).%s(%s[ks[i]]).ldelim()", 16 | wireType, type, ref);
            gen("}")("}");
        // Repeated fields
        } else if (field.repeated) {
            gen("if(%s!=null&&%s.length){", ref, ref); // !== undefined && !== null
            // Packed repeated
            if (field.packed && types.packed[type] !== undefined) {
                gen("w.uint32(%i).fork()", (field.id << 3 | 2) >>> 0)("for(var i=0;i<%s.length;++i)", ref)("w.%s(%s[i])", type, ref)("w.ldelim()");
            // Non-packed
            } else {
                gen("for(var i=0;i<%s.length;++i)", ref);
                if (wireType === undefined) genTypePartial(gen, field, index, ref + "[i]");
                else gen("w.uint32(%i).%s(%s[i])", (field.id << 3 | wireType) >>> 0, type, ref);
            }
            gen("}");
        // Non-repeated
        } else {
            if (field.optional) gen("if(%s!=null&&Object.hasOwnProperty.call(m,%j))", ref, field.name); // !== undefined && !== null
            if (wireType === undefined) genTypePartial(gen, field, index, ref);
            else gen("w.uint32(%i).%s(%s)", (field.id << 3 | wireType) >>> 0, type, ref);
        }
    }
    return gen("return w");
/* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */ }


/***/ }),

/***/ 4328:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = Enum;
// extends ReflectionObject
var ReflectionObject = __webpack_require__(6890);
((Enum.prototype = Object.create(ReflectionObject.prototype)).constructor = Enum).className = "Enum";
var Namespace = __webpack_require__(1804), util = __webpack_require__(31502);
/**
 * Constructs a new enum instance.
 * @classdesc Reflected enum.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {Object.<string,number>} [values] Enum values as an object, by name
 * @param {Object.<string,*>} [options] Declared options
 * @param {string} [comment] The comment for this enum
 * @param {Object.<string,string>} [comments] The value comments for this enum
 * @param {Object.<string,Object<string,*>>|undefined} [valuesOptions] The value options for this enum
 */ function Enum(name, values, options, comment, comments, valuesOptions) {
    ReflectionObject.call(this, name, options);
    if (values && typeof values !== "object") throw TypeError("values must be an object");
    /**
     * Enum values by id.
     * @type {Object.<number,string>}
     */ this.valuesById = {};
    /**
     * Enum values by name.
     * @type {Object.<string,number>}
     */ this.values = Object.create(this.valuesById); // toJSON, marker
    /**
     * Enum comment text.
     * @type {string|null}
     */ this.comment = comment;
    /**
     * Value comment texts, if any.
     * @type {Object.<string,string>}
     */ this.comments = comments || {};
    /**
     * Values options, if any
     * @type {Object<string, Object<string, *>>|undefined}
     */ this.valuesOptions = valuesOptions;
    /**
     * Reserved ranges, if any.
     * @type {Array.<number[]|string>}
     */ this.reserved = undefined; // toJSON
    // Note that values inherit valuesById on their prototype which makes them a TypeScript-
    // compatible enum. This is used by pbts to write actual enum definitions that work for
    // static and reflection code alike instead of emitting generic object definitions.
    if (values) {
        for(var keys = Object.keys(values), i = 0; i < keys.length; ++i)if (typeof values[keys[i]] === "number") this.valuesById[this.values[keys[i]] = values[keys[i]]] = keys[i];
    }
}
/**
 * Enum descriptor.
 * @interface IEnum
 * @property {Object.<string,number>} values Enum values
 * @property {Object.<string,*>} [options] Enum options
 */ /**
 * Constructs an enum from an enum descriptor.
 * @param {string} name Enum name
 * @param {IEnum} json Enum descriptor
 * @returns {Enum} Created enum
 * @throws {TypeError} If arguments are invalid
 */ Enum.fromJSON = function fromJSON(name, json) {
    var enm = new Enum(name, json.values, json.options, json.comment, json.comments);
    enm.reserved = json.reserved;
    return enm;
};
/**
 * Converts this enum to an enum descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IEnum} Enum descriptor
 */ Enum.prototype.toJSON = function toJSON(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "options",
        this.options,
        "valuesOptions",
        this.valuesOptions,
        "values",
        this.values,
        "reserved",
        this.reserved && this.reserved.length ? this.reserved : undefined,
        "comment",
        keepComments ? this.comment : undefined,
        "comments",
        keepComments ? this.comments : undefined
    ]);
};
/**
 * Adds a value to this enum.
 * @param {string} name Value name
 * @param {number} id Value id
 * @param {string} [comment] Comment, if any
 * @param {Object.<string, *>|undefined} [options] Options, if any
 * @returns {Enum} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If there is already a value with this name or id
 */ Enum.prototype.add = function add(name, id, comment, options) {
    // utilized by the parser but not by .fromJSON
    if (!util.isString(name)) throw TypeError("name must be a string");
    if (!util.isInteger(id)) throw TypeError("id must be an integer");
    if (this.values[name] !== undefined) throw Error("duplicate name '" + name + "' in " + this);
    if (this.isReservedId(id)) throw Error("id " + id + " is reserved in " + this);
    if (this.isReservedName(name)) throw Error("name '" + name + "' is reserved in " + this);
    if (this.valuesById[id] !== undefined) {
        if (!(this.options && this.options.allow_alias)) throw Error("duplicate id " + id + " in " + this);
        this.values[name] = id;
    } else this.valuesById[this.values[name] = id] = name;
    if (options) {
        if (this.valuesOptions === undefined) this.valuesOptions = {};
        this.valuesOptions[name] = options || null;
    }
    this.comments[name] = comment || null;
    return this;
};
/**
 * Removes a value from this enum
 * @param {string} name Value name
 * @returns {Enum} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If `name` is not a name of this enum
 */ Enum.prototype.remove = function remove(name) {
    if (!util.isString(name)) throw TypeError("name must be a string");
    var val = this.values[name];
    if (val == null) throw Error("name '" + name + "' does not exist in " + this);
    delete this.valuesById[val];
    delete this.values[name];
    delete this.comments[name];
    if (this.valuesOptions) delete this.valuesOptions[name];
    return this;
};
/**
 * Tests if the specified id is reserved.
 * @param {number} id Id to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */ Enum.prototype.isReservedId = function isReservedId(id) {
    return Namespace.isReservedId(this.reserved, id);
};
/**
 * Tests if the specified name is reserved.
 * @param {string} name Name to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */ Enum.prototype.isReservedName = function isReservedName(name) {
    return Namespace.isReservedName(this.reserved, name);
};


/***/ }),

/***/ 93777:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = Field;
// extends ReflectionObject
var ReflectionObject = __webpack_require__(6890);
((Field.prototype = Object.create(ReflectionObject.prototype)).constructor = Field).className = "Field";
var Enum = __webpack_require__(4328), types = __webpack_require__(84438), util = __webpack_require__(31502);
var Type; // cyclic
var ruleRe = /^required|optional|repeated$/;
/**
 * Constructs a new message field instance. Note that {@link MapField|map fields} have their own class.
 * @name Field
 * @classdesc Reflected message field.
 * @extends FieldBase
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {number} id Unique id within its namespace
 * @param {string} type Value type
 * @param {string|Object.<string,*>} [rule="optional"] Field rule
 * @param {string|Object.<string,*>} [extend] Extended type if different from parent
 * @param {Object.<string,*>} [options] Declared options
 */ /**
 * Constructs a field from a field descriptor.
 * @param {string} name Field name
 * @param {IField} json Field descriptor
 * @returns {Field} Created field
 * @throws {TypeError} If arguments are invalid
 */ Field.fromJSON = function fromJSON(name, json) {
    return new Field(name, json.id, json.type, json.rule, json.extend, json.options, json.comment);
};
/**
 * Not an actual constructor. Use {@link Field} instead.
 * @classdesc Base class of all reflected message fields. This is not an actual class but here for the sake of having consistent type definitions.
 * @exports FieldBase
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {number} id Unique id within its namespace
 * @param {string} type Value type
 * @param {string|Object.<string,*>} [rule="optional"] Field rule
 * @param {string|Object.<string,*>} [extend] Extended type if different from parent
 * @param {Object.<string,*>} [options] Declared options
 * @param {string} [comment] Comment associated with this field
 */ function Field(name, id, type, rule, extend, options, comment) {
    if (util.isObject(rule)) {
        comment = extend;
        options = rule;
        rule = extend = undefined;
    } else if (util.isObject(extend)) {
        comment = options;
        options = extend;
        extend = undefined;
    }
    ReflectionObject.call(this, name, options);
    if (!util.isInteger(id) || id < 0) throw TypeError("id must be a non-negative integer");
    if (!util.isString(type)) throw TypeError("type must be a string");
    if (rule !== undefined && !ruleRe.test(rule = rule.toString().toLowerCase())) throw TypeError("rule must be a string rule");
    if (extend !== undefined && !util.isString(extend)) throw TypeError("extend must be a string");
    /**
     * Field rule, if any.
     * @type {string|undefined}
     */ if (rule === "proto3_optional") {
        rule = "optional";
    }
    this.rule = rule && rule !== "optional" ? rule : undefined; // toJSON
    /**
     * Field type.
     * @type {string}
     */ this.type = type; // toJSON
    /**
     * Unique field id.
     * @type {number}
     */ this.id = id; // toJSON, marker
    /**
     * Extended type if different from parent.
     * @type {string|undefined}
     */ this.extend = extend || undefined; // toJSON
    /**
     * Whether this field is required.
     * @type {boolean}
     */ this.required = rule === "required";
    /**
     * Whether this field is optional.
     * @type {boolean}
     */ this.optional = !this.required;
    /**
     * Whether this field is repeated.
     * @type {boolean}
     */ this.repeated = rule === "repeated";
    /**
     * Whether this field is a map or not.
     * @type {boolean}
     */ this.map = false;
    /**
     * Message this field belongs to.
     * @type {Type|null}
     */ this.message = null;
    /**
     * OneOf this field belongs to, if any,
     * @type {OneOf|null}
     */ this.partOf = null;
    /**
     * The field type's default value.
     * @type {*}
     */ this.typeDefault = null;
    /**
     * The field's default value on prototypes.
     * @type {*}
     */ this.defaultValue = null;
    /**
     * Whether this field's value should be treated as a long.
     * @type {boolean}
     */ this.long = util.Long ? types.long[type] !== undefined : /* istanbul ignore next */ false;
    /**
     * Whether this field's value is a buffer.
     * @type {boolean}
     */ this.bytes = type === "bytes";
    /**
     * Resolved type if not a basic type.
     * @type {Type|Enum|null}
     */ this.resolvedType = null;
    /**
     * Sister-field within the extended type if a declaring extension field.
     * @type {Field|null}
     */ this.extensionField = null;
    /**
     * Sister-field within the declaring namespace if an extended field.
     * @type {Field|null}
     */ this.declaringField = null;
    /**
     * Internally remembers whether this field is packed.
     * @type {boolean|null}
     * @private
     */ this._packed = null;
    /**
     * Comment for this field.
     * @type {string|null}
     */ this.comment = comment;
}
/**
 * Determines whether this field is packed. Only relevant when repeated and working with proto2.
 * @name Field#packed
 * @type {boolean}
 * @readonly
 */ Object.defineProperty(Field.prototype, "packed", {
    get: function() {
        // defaults to packed=true if not explicity set to false
        if (this._packed === null) this._packed = this.getOption("packed") !== false;
        return this._packed;
    }
});
/**
 * @override
 */ Field.prototype.setOption = function setOption(name, value, ifNotSet) {
    if (name === "packed") this._packed = null;
    return ReflectionObject.prototype.setOption.call(this, name, value, ifNotSet);
};
/**
 * Field descriptor.
 * @interface IField
 * @property {string} [rule="optional"] Field rule
 * @property {string} type Field type
 * @property {number} id Field id
 * @property {Object.<string,*>} [options] Field options
 */ /**
 * Extension field descriptor.
 * @interface IExtensionField
 * @extends IField
 * @property {string} extend Extended type
 */ /**
 * Converts this field to a field descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IField} Field descriptor
 */ Field.prototype.toJSON = function toJSON(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "rule",
        this.rule !== "optional" && this.rule || undefined,
        "type",
        this.type,
        "id",
        this.id,
        "extend",
        this.extend,
        "options",
        this.options,
        "comment",
        keepComments ? this.comment : undefined
    ]);
};
/**
 * Resolves this field's type references.
 * @returns {Field} `this`
 * @throws {Error} If any reference cannot be resolved
 */ Field.prototype.resolve = function resolve() {
    if (this.resolved) return this;
    if ((this.typeDefault = types.defaults[this.type]) === undefined) {
        this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type);
        if (this.resolvedType instanceof Type) this.typeDefault = null;
        else this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]]; // first defined
    } else if (this.options && this.options.proto3_optional) {
        // proto3 scalar value marked optional; should default to null
        this.typeDefault = null;
    }
    // use explicitly set default value if present
    if (this.options && this.options["default"] != null) {
        this.typeDefault = this.options["default"];
        if (this.resolvedType instanceof Enum && typeof this.typeDefault === "string") this.typeDefault = this.resolvedType.values[this.typeDefault];
    }
    // remove unnecessary options
    if (this.options) {
        if (this.options.packed === true || this.options.packed !== undefined && this.resolvedType && !(this.resolvedType instanceof Enum)) delete this.options.packed;
        if (!Object.keys(this.options).length) this.options = undefined;
    }
    // convert to internal data type if necesssary
    if (this.long) {
        this.typeDefault = util.Long.fromNumber(this.typeDefault, this.type.charAt(0) === "u");
        /* istanbul ignore else */ if (Object.freeze) Object.freeze(this.typeDefault); // long instances are meant to be immutable anyway (i.e. use small int cache that even requires it)
    } else if (this.bytes && typeof this.typeDefault === "string") {
        var buf;
        if (util.base64.test(this.typeDefault)) util.base64.decode(this.typeDefault, buf = util.newBuffer(util.base64.length(this.typeDefault)), 0);
        else util.utf8.write(this.typeDefault, buf = util.newBuffer(util.utf8.length(this.typeDefault)), 0);
        this.typeDefault = buf;
    }
    // take special care of maps and repeated fields
    if (this.map) this.defaultValue = util.emptyObject;
    else if (this.repeated) this.defaultValue = util.emptyArray;
    else this.defaultValue = this.typeDefault;
    // ensure proper value on prototype
    if (this.parent instanceof Type) this.parent.ctor.prototype[this.name] = this.defaultValue;
    return ReflectionObject.prototype.resolve.call(this);
};
/**
 * Decorator function as returned by {@link Field.d} and {@link MapField.d} (TypeScript).
 * @typedef FieldDecorator
 * @type {function}
 * @param {Object} prototype Target prototype
 * @param {string} fieldName Field name
 * @returns {undefined}
 */ /**
 * Field decorator (TypeScript).
 * @name Field.d
 * @function
 * @param {number} fieldId Field id
 * @param {"double"|"float"|"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"string"|"bool"|"bytes"|Object} fieldType Field type
 * @param {"optional"|"required"|"repeated"} [fieldRule="optional"] Field rule
 * @param {T} [defaultValue] Default value
 * @returns {FieldDecorator} Decorator function
 * @template T extends number | number[] | Long | Long[] | string | string[] | boolean | boolean[] | Uint8Array | Uint8Array[] | Buffer | Buffer[]
 */ Field.d = function decorateField(fieldId, fieldType, fieldRule, defaultValue) {
    // submessage: decorate the submessage and use its name as the type
    if (typeof fieldType === "function") fieldType = util.decorateType(fieldType).name;
    else if (fieldType && typeof fieldType === "object") fieldType = util.decorateEnum(fieldType).name;
    return function fieldDecorator(prototype, fieldName) {
        util.decorateType(prototype.constructor).add(new Field(fieldName, fieldId, fieldType, fieldRule, {
            "default": defaultValue
        }));
    };
};
/**
 * Field decorator (TypeScript).
 * @name Field.d
 * @function
 * @param {number} fieldId Field id
 * @param {Constructor<T>|string} fieldType Field type
 * @param {"optional"|"required"|"repeated"} [fieldRule="optional"] Field rule
 * @returns {FieldDecorator} Decorator function
 * @template T extends Message<T>
 * @variation 2
 */ // like Field.d but without a default value
// Sets up cyclic dependencies (called in index-light)
Field._configure = function configure(Type_) {
    Type = Type_;
};


/***/ }),

/***/ 36586:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var protobuf = module.exports = __webpack_require__(13669);
protobuf.build = "light";
/**
 * A node-style callback as used by {@link load} and {@link Root#load}.
 * @typedef LoadCallback
 * @type {function}
 * @param {Error|null} error Error, if any, otherwise `null`
 * @param {Root} [root] Root, if there hasn't been an error
 * @returns {undefined}
 */ /**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace and calls the callback.
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} root Root namespace, defaults to create a new one if omitted.
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 * @see {@link Root#load}
 */ function load(filename, root, callback) {
    if (typeof root === "function") {
        callback = root;
        root = new protobuf.Root();
    } else if (!root) root = new protobuf.Root();
    return root.load(filename, callback);
}
/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace and calls the callback.
 * @name load
 * @function
 * @param {string|string[]} filename One or multiple files to load
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 * @see {@link Root#load}
 * @variation 2
 */ // function load(filename:string, callback:LoadCallback):undefined
/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace and returns a promise.
 * @name load
 * @function
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
 * @returns {Promise<Root>} Promise
 * @see {@link Root#load}
 * @variation 3
 */ // function load(filename:string, [root:Root]):Promise<Root>
protobuf.load = load;
/**
 * Synchronously loads one or multiple .proto or preprocessed .json files into a common root namespace (node only).
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
 * @returns {Root} Root namespace
 * @throws {Error} If synchronous fetching is not supported (i.e. in browsers) or if a file's syntax is invalid
 * @see {@link Root#loadSync}
 */ function loadSync(filename, root) {
    if (!root) root = new protobuf.Root();
    return root.loadSync(filename);
}
protobuf.loadSync = loadSync;
// Serialization
protobuf.encoder = __webpack_require__(49324);
protobuf.decoder = __webpack_require__(14935);
protobuf.verifier = __webpack_require__(56949);
protobuf.converter = __webpack_require__(80285);
// Reflection
protobuf.ReflectionObject = __webpack_require__(6890);
protobuf.Namespace = __webpack_require__(1804);
protobuf.Root = __webpack_require__(48880);
protobuf.Enum = __webpack_require__(4328);
protobuf.Type = __webpack_require__(86764);
protobuf.Field = __webpack_require__(93777);
protobuf.OneOf = __webpack_require__(25250);
protobuf.MapField = __webpack_require__(54741);
protobuf.Service = __webpack_require__(66577);
protobuf.Method = __webpack_require__(64057);
// Runtime
protobuf.Message = __webpack_require__(12965);
protobuf.wrappers = __webpack_require__(32958);
// Utility
protobuf.types = __webpack_require__(84438);
protobuf.util = __webpack_require__(31502);
// Set up possibly cyclic reflection dependencies
protobuf.ReflectionObject._configure(protobuf.Root);
protobuf.Namespace._configure(protobuf.Type, protobuf.Service, protobuf.Enum);
protobuf.Root._configure(protobuf.Type);
protobuf.Field._configure(protobuf.Type);


/***/ }),

/***/ 13669:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var protobuf = exports;
/**
 * Build type, one of `"full"`, `"light"` or `"minimal"`.
 * @name build
 * @type {string}
 * @const
 */ protobuf.build = "minimal";
// Serialization
protobuf.Writer = __webpack_require__(41010);
protobuf.BufferWriter = __webpack_require__(86351);
protobuf.Reader = __webpack_require__(10964);
protobuf.BufferReader = __webpack_require__(10598);
// Utility
protobuf.util = __webpack_require__(27188);
protobuf.rpc = __webpack_require__(20590);
protobuf.roots = __webpack_require__(50715);
protobuf.configure = configure;
/* istanbul ignore next */ /**
 * Reconfigures the library according to the environment.
 * @returns {undefined}
 */ function configure() {
    protobuf.util._configure();
    protobuf.Writer._configure(protobuf.BufferWriter);
    protobuf.Reader._configure(protobuf.BufferReader);
}
// Set up buffer utility according to the environment
configure();


/***/ }),

/***/ 38778:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var protobuf = module.exports = __webpack_require__(36586);
protobuf.build = "full";
// Parser
protobuf.tokenize = __webpack_require__(46682);
protobuf.parse = __webpack_require__(42539);
protobuf.common = __webpack_require__(78450);
// Configure parser
protobuf.Root._configure(protobuf.Type, protobuf.parse, protobuf.common);


/***/ }),

/***/ 54741:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = MapField;
// extends Field
var Field = __webpack_require__(93777);
((MapField.prototype = Object.create(Field.prototype)).constructor = MapField).className = "MapField";
var types = __webpack_require__(84438), util = __webpack_require__(31502);
/**
 * Constructs a new map field instance.
 * @classdesc Reflected map field.
 * @extends FieldBase
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {number} id Unique id within its namespace
 * @param {string} keyType Key type
 * @param {string} type Value type
 * @param {Object.<string,*>} [options] Declared options
 * @param {string} [comment] Comment associated with this field
 */ function MapField(name, id, keyType, type, options, comment) {
    Field.call(this, name, id, type, undefined, undefined, options, comment);
    /* istanbul ignore if */ if (!util.isString(keyType)) throw TypeError("keyType must be a string");
    /**
     * Key type.
     * @type {string}
     */ this.keyType = keyType; // toJSON, marker
    /**
     * Resolved key type if not a basic type.
     * @type {ReflectionObject|null}
     */ this.resolvedKeyType = null;
    // Overrides Field#map
    this.map = true;
}
/**
 * Map field descriptor.
 * @interface IMapField
 * @extends {IField}
 * @property {string} keyType Key type
 */ /**
 * Extension map field descriptor.
 * @interface IExtensionMapField
 * @extends IMapField
 * @property {string} extend Extended type
 */ /**
 * Constructs a map field from a map field descriptor.
 * @param {string} name Field name
 * @param {IMapField} json Map field descriptor
 * @returns {MapField} Created map field
 * @throws {TypeError} If arguments are invalid
 */ MapField.fromJSON = function fromJSON(name, json) {
    return new MapField(name, json.id, json.keyType, json.type, json.options, json.comment);
};
/**
 * Converts this map field to a map field descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IMapField} Map field descriptor
 */ MapField.prototype.toJSON = function toJSON(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "keyType",
        this.keyType,
        "type",
        this.type,
        "id",
        this.id,
        "extend",
        this.extend,
        "options",
        this.options,
        "comment",
        keepComments ? this.comment : undefined
    ]);
};
/**
 * @override
 */ MapField.prototype.resolve = function resolve() {
    if (this.resolved) return this;
    // Besides a value type, map fields have a key type that may be "any scalar type except for floating point types and bytes"
    if (types.mapKey[this.keyType] === undefined) throw Error("invalid key type: " + this.keyType);
    return Field.prototype.resolve.call(this);
};
/**
 * Map field decorator (TypeScript).
 * @name MapField.d
 * @function
 * @param {number} fieldId Field id
 * @param {"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"bool"|"string"} fieldKeyType Field key type
 * @param {"double"|"float"|"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"bool"|"string"|"bytes"|Object|Constructor<{}>} fieldValueType Field value type
 * @returns {FieldDecorator} Decorator function
 * @template T extends { [key: string]: number | Long | string | boolean | Uint8Array | Buffer | number[] | Message<{}> }
 */ MapField.d = function decorateMapField(fieldId, fieldKeyType, fieldValueType) {
    // submessage value: decorate the submessage and use its name as the type
    if (typeof fieldValueType === "function") fieldValueType = util.decorateType(fieldValueType).name;
    else if (fieldValueType && typeof fieldValueType === "object") fieldValueType = util.decorateEnum(fieldValueType).name;
    return function mapFieldDecorator(prototype, fieldName) {
        util.decorateType(prototype.constructor).add(new MapField(fieldName, fieldId, fieldKeyType, fieldValueType));
    };
};


/***/ }),

/***/ 12965:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = Message;
var util = __webpack_require__(27188);
/**
 * Constructs a new message instance.
 * @classdesc Abstract runtime message.
 * @constructor
 * @param {Properties<T>} [properties] Properties to set
 * @template T extends object = object
 */ function Message(properties) {
    // not used internally
    if (properties) for(var keys = Object.keys(properties), i = 0; i < keys.length; ++i)this[keys[i]] = properties[keys[i]];
}
/**
 * Reference to the reflected type.
 * @name Message.$type
 * @type {Type}
 * @readonly
 */ /**
 * Reference to the reflected type.
 * @name Message#$type
 * @type {Type}
 * @readonly
 */ /*eslint-disable valid-jsdoc*/ /**
 * Creates a new message of this type using the specified properties.
 * @param {Object.<string,*>} [properties] Properties to set
 * @returns {Message<T>} Message instance
 * @template T extends Message<T>
 * @this Constructor<T>
 */ Message.create = function create(properties) {
    return this.$type.create(properties);
};
/**
 * Encodes a message of this type.
 * @param {T|Object.<string,*>} message Message to encode
 * @param {Writer} [writer] Writer to use
 * @returns {Writer} Writer
 * @template T extends Message<T>
 * @this Constructor<T>
 */ Message.encode = function encode(message, writer) {
    return this.$type.encode(message, writer);
};
/**
 * Encodes a message of this type preceeded by its length as a varint.
 * @param {T|Object.<string,*>} message Message to encode
 * @param {Writer} [writer] Writer to use
 * @returns {Writer} Writer
 * @template T extends Message<T>
 * @this Constructor<T>
 */ Message.encodeDelimited = function encodeDelimited(message, writer) {
    return this.$type.encodeDelimited(message, writer);
};
/**
 * Decodes a message of this type.
 * @name Message.decode
 * @function
 * @param {Reader|Uint8Array} reader Reader or buffer to decode
 * @returns {T} Decoded message
 * @template T extends Message<T>
 * @this Constructor<T>
 */ Message.decode = function decode(reader) {
    return this.$type.decode(reader);
};
/**
 * Decodes a message of this type preceeded by its length as a varint.
 * @name Message.decodeDelimited
 * @function
 * @param {Reader|Uint8Array} reader Reader or buffer to decode
 * @returns {T} Decoded message
 * @template T extends Message<T>
 * @this Constructor<T>
 */ Message.decodeDelimited = function decodeDelimited(reader) {
    return this.$type.decodeDelimited(reader);
};
/**
 * Verifies a message of this type.
 * @name Message.verify
 * @function
 * @param {Object.<string,*>} message Plain object to verify
 * @returns {string|null} `null` if valid, otherwise the reason why it is not
 */ Message.verify = function verify(message) {
    return this.$type.verify(message);
};
/**
 * Creates a new message of this type from a plain object. Also converts values to their respective internal types.
 * @param {Object.<string,*>} object Plain object
 * @returns {T} Message instance
 * @template T extends Message<T>
 * @this Constructor<T>
 */ Message.fromObject = function fromObject(object) {
    return this.$type.fromObject(object);
};
/**
 * Creates a plain object from a message of this type. Also converts values to other types if specified.
 * @param {T} message Message instance
 * @param {IConversionOptions} [options] Conversion options
 * @returns {Object.<string,*>} Plain object
 * @template T extends Message<T>
 * @this Constructor<T>
 */ Message.toObject = function toObject(message, options) {
    return this.$type.toObject(message, options);
};
/**
 * Converts this message to JSON.
 * @returns {Object.<string,*>} JSON object
 */ Message.prototype.toJSON = function toJSON() {
    return this.$type.toObject(this, util.toJSONOptions);
}; /*eslint-enable valid-jsdoc*/ 


/***/ }),

/***/ 64057:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = Method;
// extends ReflectionObject
var ReflectionObject = __webpack_require__(6890);
((Method.prototype = Object.create(ReflectionObject.prototype)).constructor = Method).className = "Method";
var util = __webpack_require__(31502);
/**
 * Constructs a new service method instance.
 * @classdesc Reflected service method.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Method name
 * @param {string|undefined} type Method type, usually `"rpc"`
 * @param {string} requestType Request message type
 * @param {string} responseType Response message type
 * @param {boolean|Object.<string,*>} [requestStream] Whether the request is streamed
 * @param {boolean|Object.<string,*>} [responseStream] Whether the response is streamed
 * @param {Object.<string,*>} [options] Declared options
 * @param {string} [comment] The comment for this method
 * @param {Object.<string,*>} [parsedOptions] Declared options, properly parsed into an object
 */ function Method(name, type, requestType, responseType, requestStream, responseStream, options, comment, parsedOptions) {
    /* istanbul ignore next */ if (util.isObject(requestStream)) {
        options = requestStream;
        requestStream = responseStream = undefined;
    } else if (util.isObject(responseStream)) {
        options = responseStream;
        responseStream = undefined;
    }
    /* istanbul ignore if */ if (!(type === undefined || util.isString(type))) throw TypeError("type must be a string");
    /* istanbul ignore if */ if (!util.isString(requestType)) throw TypeError("requestType must be a string");
    /* istanbul ignore if */ if (!util.isString(responseType)) throw TypeError("responseType must be a string");
    ReflectionObject.call(this, name, options);
    /**
     * Method type.
     * @type {string}
     */ this.type = type || "rpc"; // toJSON
    /**
     * Request type.
     * @type {string}
     */ this.requestType = requestType; // toJSON, marker
    /**
     * Whether requests are streamed or not.
     * @type {boolean|undefined}
     */ this.requestStream = requestStream ? true : undefined; // toJSON
    /**
     * Response type.
     * @type {string}
     */ this.responseType = responseType; // toJSON
    /**
     * Whether responses are streamed or not.
     * @type {boolean|undefined}
     */ this.responseStream = responseStream ? true : undefined; // toJSON
    /**
     * Resolved request type.
     * @type {Type|null}
     */ this.resolvedRequestType = null;
    /**
     * Resolved response type.
     * @type {Type|null}
     */ this.resolvedResponseType = null;
    /**
     * Comment for this method
     * @type {string|null}
     */ this.comment = comment;
    /**
     * Options properly parsed into an object
     */ this.parsedOptions = parsedOptions;
}
/**
 * Method descriptor.
 * @interface IMethod
 * @property {string} [type="rpc"] Method type
 * @property {string} requestType Request type
 * @property {string} responseType Response type
 * @property {boolean} [requestStream=false] Whether requests are streamed
 * @property {boolean} [responseStream=false] Whether responses are streamed
 * @property {Object.<string,*>} [options] Method options
 * @property {string} comment Method comments
 * @property {Object.<string,*>} [parsedOptions] Method options properly parsed into an object
 */ /**
 * Constructs a method from a method descriptor.
 * @param {string} name Method name
 * @param {IMethod} json Method descriptor
 * @returns {Method} Created method
 * @throws {TypeError} If arguments are invalid
 */ Method.fromJSON = function fromJSON(name, json) {
    return new Method(name, json.type, json.requestType, json.responseType, json.requestStream, json.responseStream, json.options, json.comment, json.parsedOptions);
};
/**
 * Converts this method to a method descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IMethod} Method descriptor
 */ Method.prototype.toJSON = function toJSON(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "type",
        this.type !== "rpc" && /* istanbul ignore next */ this.type || undefined,
        "requestType",
        this.requestType,
        "requestStream",
        this.requestStream,
        "responseType",
        this.responseType,
        "responseStream",
        this.responseStream,
        "options",
        this.options,
        "comment",
        keepComments ? this.comment : undefined,
        "parsedOptions",
        this.parsedOptions
    ]);
};
/**
 * @override
 */ Method.prototype.resolve = function resolve() {
    /* istanbul ignore if */ if (this.resolved) return this;
    this.resolvedRequestType = this.parent.lookupType(this.requestType);
    this.resolvedResponseType = this.parent.lookupType(this.responseType);
    return ReflectionObject.prototype.resolve.call(this);
};


/***/ }),

/***/ 1804:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = Namespace;
// extends ReflectionObject
var ReflectionObject = __webpack_require__(6890);
((Namespace.prototype = Object.create(ReflectionObject.prototype)).constructor = Namespace).className = "Namespace";
var Field = __webpack_require__(93777), util = __webpack_require__(31502), OneOf = __webpack_require__(25250);
var Type, Service, Enum;
/**
 * Constructs a new namespace instance.
 * @name Namespace
 * @classdesc Reflected namespace.
 * @extends NamespaceBase
 * @constructor
 * @param {string} name Namespace name
 * @param {Object.<string,*>} [options] Declared options
 */ /**
 * Constructs a namespace from JSON.
 * @memberof Namespace
 * @function
 * @param {string} name Namespace name
 * @param {Object.<string,*>} json JSON object
 * @returns {Namespace} Created namespace
 * @throws {TypeError} If arguments are invalid
 */ Namespace.fromJSON = function fromJSON(name, json) {
    return new Namespace(name, json.options).addJSON(json.nested);
};
/**
 * Converts an array of reflection objects to JSON.
 * @memberof Namespace
 * @param {ReflectionObject[]} array Object array
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {Object.<string,*>|undefined} JSON object or `undefined` when array is empty
 */ function arrayToJSON(array, toJSONOptions) {
    if (!(array && array.length)) return undefined;
    var obj = {};
    for(var i = 0; i < array.length; ++i)obj[array[i].name] = array[i].toJSON(toJSONOptions);
    return obj;
}
Namespace.arrayToJSON = arrayToJSON;
/**
 * Tests if the specified id is reserved.
 * @param {Array.<number[]|string>|undefined} reserved Array of reserved ranges and names
 * @param {number} id Id to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */ Namespace.isReservedId = function isReservedId(reserved, id) {
    if (reserved) {
        for(var i = 0; i < reserved.length; ++i)if (typeof reserved[i] !== "string" && reserved[i][0] <= id && reserved[i][1] > id) return true;
    }
    return false;
};
/**
 * Tests if the specified name is reserved.
 * @param {Array.<number[]|string>|undefined} reserved Array of reserved ranges and names
 * @param {string} name Name to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */ Namespace.isReservedName = function isReservedName(reserved, name) {
    if (reserved) {
        for(var i = 0; i < reserved.length; ++i)if (reserved[i] === name) return true;
    }
    return false;
};
/**
 * Not an actual constructor. Use {@link Namespace} instead.
 * @classdesc Base class of all reflection objects containing nested objects. This is not an actual class but here for the sake of having consistent type definitions.
 * @exports NamespaceBase
 * @extends ReflectionObject
 * @abstract
 * @constructor
 * @param {string} name Namespace name
 * @param {Object.<string,*>} [options] Declared options
 * @see {@link Namespace}
 */ function Namespace(name, options) {
    ReflectionObject.call(this, name, options);
    /**
     * Nested objects by name.
     * @type {Object.<string,ReflectionObject>|undefined}
     */ this.nested = undefined; // toJSON
    /**
     * Cached nested objects as an array.
     * @type {ReflectionObject[]|null}
     * @private
     */ this._nestedArray = null;
}
function clearCache(namespace) {
    namespace._nestedArray = null;
    return namespace;
}
/**
 * Nested objects of this namespace as an array for iteration.
 * @name NamespaceBase#nestedArray
 * @type {ReflectionObject[]}
 * @readonly
 */ Object.defineProperty(Namespace.prototype, "nestedArray", {
    get: function() {
        return this._nestedArray || (this._nestedArray = util.toArray(this.nested));
    }
});
/**
 * Namespace descriptor.
 * @interface INamespace
 * @property {Object.<string,*>} [options] Namespace options
 * @property {Object.<string,AnyNestedObject>} [nested] Nested object descriptors
 */ /**
 * Any extension field descriptor.
 * @typedef AnyExtensionField
 * @type {IExtensionField|IExtensionMapField}
 */ /**
 * Any nested object descriptor.
 * @typedef AnyNestedObject
 * @type {IEnum|IType|IService|AnyExtensionField|INamespace|IOneOf}
 */ /**
 * Converts this namespace to a namespace descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {INamespace} Namespace descriptor
 */ Namespace.prototype.toJSON = function toJSON(toJSONOptions) {
    return util.toObject([
        "options",
        this.options,
        "nested",
        arrayToJSON(this.nestedArray, toJSONOptions)
    ]);
};
/**
 * Adds nested objects to this namespace from nested object descriptors.
 * @param {Object.<string,AnyNestedObject>} nestedJson Any nested object descriptors
 * @returns {Namespace} `this`
 */ Namespace.prototype.addJSON = function addJSON(nestedJson) {
    var ns = this;
    /* istanbul ignore else */ if (nestedJson) {
        for(var names = Object.keys(nestedJson), i = 0, nested; i < names.length; ++i){
            nested = nestedJson[names[i]];
            ns.add((nested.fields !== undefined ? Type.fromJSON : nested.values !== undefined ? Enum.fromJSON : nested.methods !== undefined ? Service.fromJSON : nested.id !== undefined ? Field.fromJSON : Namespace.fromJSON)(names[i], nested));
        }
    }
    return this;
};
/**
 * Gets the nested object of the specified name.
 * @param {string} name Nested object name
 * @returns {ReflectionObject|null} The reflection object or `null` if it doesn't exist
 */ Namespace.prototype.get = function get(name) {
    return this.nested && this.nested[name] || null;
};
/**
 * Gets the values of the nested {@link Enum|enum} of the specified name.
 * This methods differs from {@link Namespace#get|get} in that it returns an enum's values directly and throws instead of returning `null`.
 * @param {string} name Nested enum name
 * @returns {Object.<string,number>} Enum values
 * @throws {Error} If there is no such enum
 */ Namespace.prototype.getEnum = function getEnum(name) {
    if (this.nested && this.nested[name] instanceof Enum) return this.nested[name].values;
    throw Error("no such enum: " + name);
};
/**
 * Adds a nested object to this namespace.
 * @param {ReflectionObject} object Nested object to add
 * @returns {Namespace} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If there is already a nested object with this name
 */ Namespace.prototype.add = function add(object) {
    if (!(object instanceof Field && object.extend !== undefined || object instanceof Type || object instanceof OneOf || object instanceof Enum || object instanceof Service || object instanceof Namespace)) throw TypeError("object must be a valid nested object");
    if (!this.nested) this.nested = {};
    else {
        var prev = this.get(object.name);
        if (prev) {
            if (prev instanceof Namespace && object instanceof Namespace && !(prev instanceof Type || prev instanceof Service)) {
                // replace plain namespace but keep existing nested elements and options
                var nested = prev.nestedArray;
                for(var i = 0; i < nested.length; ++i)object.add(nested[i]);
                this.remove(prev);
                if (!this.nested) this.nested = {};
                object.setOptions(prev.options, true);
            } else throw Error("duplicate name '" + object.name + "' in " + this);
        }
    }
    this.nested[object.name] = object;
    object.onAdd(this);
    return clearCache(this);
};
/**
 * Removes a nested object from this namespace.
 * @param {ReflectionObject} object Nested object to remove
 * @returns {Namespace} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If `object` is not a member of this namespace
 */ Namespace.prototype.remove = function remove(object) {
    if (!(object instanceof ReflectionObject)) throw TypeError("object must be a ReflectionObject");
    if (object.parent !== this) throw Error(object + " is not a member of " + this);
    delete this.nested[object.name];
    if (!Object.keys(this.nested).length) this.nested = undefined;
    object.onRemove(this);
    return clearCache(this);
};
/**
 * Defines additial namespaces within this one if not yet existing.
 * @param {string|string[]} path Path to create
 * @param {*} [json] Nested types to create from JSON
 * @returns {Namespace} Pointer to the last namespace created or `this` if path is empty
 */ Namespace.prototype.define = function define(path, json) {
    if (util.isString(path)) path = path.split(".");
    else if (!Array.isArray(path)) throw TypeError("illegal path");
    if (path && path.length && path[0] === "") throw Error("path must be relative");
    var ptr = this;
    while(path.length > 0){
        var part = path.shift();
        if (ptr.nested && ptr.nested[part]) {
            ptr = ptr.nested[part];
            if (!(ptr instanceof Namespace)) throw Error("path conflicts with non-namespace objects");
        } else ptr.add(ptr = new Namespace(part));
    }
    if (json) ptr.addJSON(json);
    return ptr;
};
/**
 * Resolves this namespace's and all its nested objects' type references. Useful to validate a reflection tree, but comes at a cost.
 * @returns {Namespace} `this`
 */ Namespace.prototype.resolveAll = function resolveAll() {
    var nested = this.nestedArray, i = 0;
    while(i < nested.length)if (nested[i] instanceof Namespace) nested[i++].resolveAll();
    else nested[i++].resolve();
    return this.resolve();
};
/**
 * Recursively looks up the reflection object matching the specified path in the scope of this namespace.
 * @param {string|string[]} path Path to look up
 * @param {*|Array.<*>} filterTypes Filter types, any combination of the constructors of `protobuf.Type`, `protobuf.Enum`, `protobuf.Service` etc.
 * @param {boolean} [parentAlreadyChecked=false] If known, whether the parent has already been checked
 * @returns {ReflectionObject|null} Looked up object or `null` if none could be found
 */ Namespace.prototype.lookup = function lookup(path, filterTypes, parentAlreadyChecked) {
    /* istanbul ignore next */ if (typeof filterTypes === "boolean") {
        parentAlreadyChecked = filterTypes;
        filterTypes = undefined;
    } else if (filterTypes && !Array.isArray(filterTypes)) filterTypes = [
        filterTypes
    ];
    if (util.isString(path) && path.length) {
        if (path === ".") return this.root;
        path = path.split(".");
    } else if (!path.length) return this;
    // Start at root if path is absolute
    if (path[0] === "") return this.root.lookup(path.slice(1), filterTypes);
    // Test if the first part matches any nested object, and if so, traverse if path contains more
    var found = this.get(path[0]);
    if (found) {
        if (path.length === 1) {
            if (!filterTypes || filterTypes.indexOf(found.constructor) > -1) return found;
        } else if (found instanceof Namespace && (found = found.lookup(path.slice(1), filterTypes, true))) return found;
    // Otherwise try each nested namespace
    } else for(var i = 0; i < this.nestedArray.length; ++i)if (this._nestedArray[i] instanceof Namespace && (found = this._nestedArray[i].lookup(path, filterTypes, true))) return found;
    // If there hasn't been a match, try again at the parent
    if (this.parent === null || parentAlreadyChecked) return null;
    return this.parent.lookup(path, filterTypes);
};
/**
 * Looks up the reflection object at the specified path, relative to this namespace.
 * @name NamespaceBase#lookup
 * @function
 * @param {string|string[]} path Path to look up
 * @param {boolean} [parentAlreadyChecked=false] Whether the parent has already been checked
 * @returns {ReflectionObject|null} Looked up object or `null` if none could be found
 * @variation 2
 */ // lookup(path: string, [parentAlreadyChecked: boolean])
/**
 * Looks up the {@link Type|type} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Type} Looked up type
 * @throws {Error} If `path` does not point to a type
 */ Namespace.prototype.lookupType = function lookupType(path) {
    var found = this.lookup(path, [
        Type
    ]);
    if (!found) throw Error("no such type: " + path);
    return found;
};
/**
 * Looks up the values of the {@link Enum|enum} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Enum} Looked up enum
 * @throws {Error} If `path` does not point to an enum
 */ Namespace.prototype.lookupEnum = function lookupEnum(path) {
    var found = this.lookup(path, [
        Enum
    ]);
    if (!found) throw Error("no such Enum '" + path + "' in " + this);
    return found;
};
/**
 * Looks up the {@link Type|type} or {@link Enum|enum} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Type} Looked up type or enum
 * @throws {Error} If `path` does not point to a type or enum
 */ Namespace.prototype.lookupTypeOrEnum = function lookupTypeOrEnum(path) {
    var found = this.lookup(path, [
        Type,
        Enum
    ]);
    if (!found) throw Error("no such Type or Enum '" + path + "' in " + this);
    return found;
};
/**
 * Looks up the {@link Service|service} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Service} Looked up service
 * @throws {Error} If `path` does not point to a service
 */ Namespace.prototype.lookupService = function lookupService(path) {
    var found = this.lookup(path, [
        Service
    ]);
    if (!found) throw Error("no such Service '" + path + "' in " + this);
    return found;
};
// Sets up cyclic dependencies (called in index-light)
Namespace._configure = function(Type_, Service_, Enum_) {
    Type = Type_;
    Service = Service_;
    Enum = Enum_;
};


/***/ }),

/***/ 6890:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = ReflectionObject;
ReflectionObject.className = "ReflectionObject";
var util = __webpack_require__(31502);
var Root; // cyclic
/**
 * Constructs a new reflection object instance.
 * @classdesc Base class of all reflection objects.
 * @constructor
 * @param {string} name Object name
 * @param {Object.<string,*>} [options] Declared options
 * @abstract
 */ function ReflectionObject(name, options) {
    if (!util.isString(name)) throw TypeError("name must be a string");
    if (options && !util.isObject(options)) throw TypeError("options must be an object");
    /**
     * Options.
     * @type {Object.<string,*>|undefined}
     */ this.options = options; // toJSON
    /**
     * Parsed Options.
     * @type {Array.<Object.<string,*>>|undefined}
     */ this.parsedOptions = null;
    /**
     * Unique name within its namespace.
     * @type {string}
     */ this.name = name;
    /**
     * Parent namespace.
     * @type {Namespace|null}
     */ this.parent = null;
    /**
     * Whether already resolved or not.
     * @type {boolean}
     */ this.resolved = false;
    /**
     * Comment text, if any.
     * @type {string|null}
     */ this.comment = null;
    /**
     * Defining file name.
     * @type {string|null}
     */ this.filename = null;
}
Object.defineProperties(ReflectionObject.prototype, {
    /**
     * Reference to the root namespace.
     * @name ReflectionObject#root
     * @type {Root}
     * @readonly
     */ root: {
        get: function() {
            var ptr = this;
            while(ptr.parent !== null)ptr = ptr.parent;
            return ptr;
        }
    },
    /**
     * Full name including leading dot.
     * @name ReflectionObject#fullName
     * @type {string}
     * @readonly
     */ fullName: {
        get: function() {
            var path = [
                this.name
            ], ptr = this.parent;
            while(ptr){
                path.unshift(ptr.name);
                ptr = ptr.parent;
            }
            return path.join(".");
        }
    }
});
/**
 * Converts this reflection object to its descriptor representation.
 * @returns {Object.<string,*>} Descriptor
 * @abstract
 */ ReflectionObject.prototype.toJSON = /* istanbul ignore next */ function toJSON() {
    throw Error(); // not implemented, shouldn't happen
};
/**
 * Called when this object is added to a parent.
 * @param {ReflectionObject} parent Parent added to
 * @returns {undefined}
 */ ReflectionObject.prototype.onAdd = function onAdd(parent) {
    if (this.parent && this.parent !== parent) this.parent.remove(this);
    this.parent = parent;
    this.resolved = false;
    var root = parent.root;
    if (root instanceof Root) root._handleAdd(this);
};
/**
 * Called when this object is removed from a parent.
 * @param {ReflectionObject} parent Parent removed from
 * @returns {undefined}
 */ ReflectionObject.prototype.onRemove = function onRemove(parent) {
    var root = parent.root;
    if (root instanceof Root) root._handleRemove(this);
    this.parent = null;
    this.resolved = false;
};
/**
 * Resolves this objects type references.
 * @returns {ReflectionObject} `this`
 */ ReflectionObject.prototype.resolve = function resolve() {
    if (this.resolved) return this;
    if (this.root instanceof Root) this.resolved = true; // only if part of a root
    return this;
};
/**
 * Gets an option value.
 * @param {string} name Option name
 * @returns {*} Option value or `undefined` if not set
 */ ReflectionObject.prototype.getOption = function getOption(name) {
    if (this.options) return this.options[name];
    return undefined;
};
/**
 * Sets an option.
 * @param {string} name Option name
 * @param {*} value Option value
 * @param {boolean} [ifNotSet] Sets the option only if it isn't currently set
 * @returns {ReflectionObject} `this`
 */ ReflectionObject.prototype.setOption = function setOption(name, value, ifNotSet) {
    if (!ifNotSet || !this.options || this.options[name] === undefined) (this.options || (this.options = {}))[name] = value;
    return this;
};
/**
 * Sets a parsed option.
 * @param {string} name parsed Option name
 * @param {*} value Option value
 * @param {string} propName dot '.' delimited full path of property within the option to set. if undefined\empty, will add a new option with that value
 * @returns {ReflectionObject} `this`
 */ ReflectionObject.prototype.setParsedOption = function setParsedOption(name, value, propName) {
    if (!this.parsedOptions) {
        this.parsedOptions = [];
    }
    var parsedOptions = this.parsedOptions;
    if (propName) {
        // If setting a sub property of an option then try to merge it
        // with an existing option
        var opt = parsedOptions.find(function(opt) {
            return Object.prototype.hasOwnProperty.call(opt, name);
        });
        if (opt) {
            // If we found an existing option - just merge the property value
            var newValue = opt[name];
            util.setProperty(newValue, propName, value);
        } else {
            // otherwise, create a new option, set it's property and add it to the list
            opt = {};
            opt[name] = util.setProperty({}, propName, value);
            parsedOptions.push(opt);
        }
    } else {
        // Always create a new option when setting the value of the option itself
        var newOpt = {};
        newOpt[name] = value;
        parsedOptions.push(newOpt);
    }
    return this;
};
/**
 * Sets multiple options.
 * @param {Object.<string,*>} options Options to set
 * @param {boolean} [ifNotSet] Sets an option only if it isn't currently set
 * @returns {ReflectionObject} `this`
 */ ReflectionObject.prototype.setOptions = function setOptions(options, ifNotSet) {
    if (options) for(var keys = Object.keys(options), i = 0; i < keys.length; ++i)this.setOption(keys[i], options[keys[i]], ifNotSet);
    return this;
};
/**
 * Converts this instance to its string representation.
 * @returns {string} Class name[, space, full name]
 */ ReflectionObject.prototype.toString = function toString() {
    var className = this.constructor.className, fullName = this.fullName;
    if (fullName.length) return className + " " + fullName;
    return className;
};
// Sets up cyclic dependencies (called in index-light)
ReflectionObject._configure = function(Root_) {
    Root = Root_;
};


/***/ }),

/***/ 25250:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = OneOf;
// extends ReflectionObject
var ReflectionObject = __webpack_require__(6890);
((OneOf.prototype = Object.create(ReflectionObject.prototype)).constructor = OneOf).className = "OneOf";
var Field = __webpack_require__(93777), util = __webpack_require__(31502);
/**
 * Constructs a new oneof instance.
 * @classdesc Reflected oneof.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Oneof name
 * @param {string[]|Object.<string,*>} [fieldNames] Field names
 * @param {Object.<string,*>} [options] Declared options
 * @param {string} [comment] Comment associated with this field
 */ function OneOf(name, fieldNames, options, comment) {
    if (!Array.isArray(fieldNames)) {
        options = fieldNames;
        fieldNames = undefined;
    }
    ReflectionObject.call(this, name, options);
    /* istanbul ignore if */ if (!(fieldNames === undefined || Array.isArray(fieldNames))) throw TypeError("fieldNames must be an Array");
    /**
     * Field names that belong to this oneof.
     * @type {string[]}
     */ this.oneof = fieldNames || []; // toJSON, marker
    /**
     * Fields that belong to this oneof as an array for iteration.
     * @type {Field[]}
     * @readonly
     */ this.fieldsArray = []; // declared readonly for conformance, possibly not yet added to parent
    /**
     * Comment for this field.
     * @type {string|null}
     */ this.comment = comment;
}
/**
 * Oneof descriptor.
 * @interface IOneOf
 * @property {Array.<string>} oneof Oneof field names
 * @property {Object.<string,*>} [options] Oneof options
 */ /**
 * Constructs a oneof from a oneof descriptor.
 * @param {string} name Oneof name
 * @param {IOneOf} json Oneof descriptor
 * @returns {OneOf} Created oneof
 * @throws {TypeError} If arguments are invalid
 */ OneOf.fromJSON = function fromJSON(name, json) {
    return new OneOf(name, json.oneof, json.options, json.comment);
};
/**
 * Converts this oneof to a oneof descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IOneOf} Oneof descriptor
 */ OneOf.prototype.toJSON = function toJSON(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "options",
        this.options,
        "oneof",
        this.oneof,
        "comment",
        keepComments ? this.comment : undefined
    ]);
};
/**
 * Adds the fields of the specified oneof to the parent if not already done so.
 * @param {OneOf} oneof The oneof
 * @returns {undefined}
 * @inner
 * @ignore
 */ function addFieldsToParent(oneof) {
    if (oneof.parent) {
        for(var i = 0; i < oneof.fieldsArray.length; ++i)if (!oneof.fieldsArray[i].parent) oneof.parent.add(oneof.fieldsArray[i]);
    }
}
/**
 * Adds a field to this oneof and removes it from its current parent, if any.
 * @param {Field} field Field to add
 * @returns {OneOf} `this`
 */ OneOf.prototype.add = function add(field) {
    /* istanbul ignore if */ if (!(field instanceof Field)) throw TypeError("field must be a Field");
    if (field.parent && field.parent !== this.parent) field.parent.remove(field);
    this.oneof.push(field.name);
    this.fieldsArray.push(field);
    field.partOf = this; // field.parent remains null
    addFieldsToParent(this);
    return this;
};
/**
 * Removes a field from this oneof and puts it back to the oneof's parent.
 * @param {Field} field Field to remove
 * @returns {OneOf} `this`
 */ OneOf.prototype.remove = function remove(field) {
    /* istanbul ignore if */ if (!(field instanceof Field)) throw TypeError("field must be a Field");
    var index = this.fieldsArray.indexOf(field);
    /* istanbul ignore if */ if (index < 0) throw Error(field + " is not a member of " + this);
    this.fieldsArray.splice(index, 1);
    index = this.oneof.indexOf(field.name);
    /* istanbul ignore else */ if (index > -1) this.oneof.splice(index, 1);
    field.partOf = null;
    return this;
};
/**
 * @override
 */ OneOf.prototype.onAdd = function onAdd(parent) {
    ReflectionObject.prototype.onAdd.call(this, parent);
    var self = this;
    // Collect present fields
    for(var i = 0; i < this.oneof.length; ++i){
        var field = parent.get(this.oneof[i]);
        if (field && !field.partOf) {
            field.partOf = self;
            self.fieldsArray.push(field);
        }
    }
    // Add not yet present fields
    addFieldsToParent(this);
};
/**
 * @override
 */ OneOf.prototype.onRemove = function onRemove(parent) {
    for(var i = 0, field; i < this.fieldsArray.length; ++i)if ((field = this.fieldsArray[i]).parent) field.parent.remove(field);
    ReflectionObject.prototype.onRemove.call(this, parent);
};
/**
 * Decorator function as returned by {@link OneOf.d} (TypeScript).
 * @typedef OneOfDecorator
 * @type {function}
 * @param {Object} prototype Target prototype
 * @param {string} oneofName OneOf name
 * @returns {undefined}
 */ /**
 * OneOf decorator (TypeScript).
 * @function
 * @param {...string} fieldNames Field names
 * @returns {OneOfDecorator} Decorator function
 * @template T extends string
 */ OneOf.d = function decorateOneOf() {
    var fieldNames = new Array(arguments.length), index = 0;
    while(index < arguments.length)fieldNames[index] = arguments[index++];
    return function oneOfDecorator(prototype, oneofName) {
        util.decorateType(prototype.constructor).add(new OneOf(oneofName, fieldNames));
        Object.defineProperty(prototype, oneofName, {
            get: util.oneOfGetter(fieldNames),
            set: util.oneOfSetter(fieldNames)
        });
    };
};


/***/ }),

/***/ 42539:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = parse;
parse.filename = null;
parse.defaults = {
    keepCase: false
};
var tokenize = __webpack_require__(46682), Root = __webpack_require__(48880), Type = __webpack_require__(86764), Field = __webpack_require__(93777), MapField = __webpack_require__(54741), OneOf = __webpack_require__(25250), Enum = __webpack_require__(4328), Service = __webpack_require__(66577), Method = __webpack_require__(64057), types = __webpack_require__(84438), util = __webpack_require__(31502);
var base10Re = /^[1-9][0-9]*$/, base10NegRe = /^-?[1-9][0-9]*$/, base16Re = /^0[x][0-9a-fA-F]+$/, base16NegRe = /^-?0[x][0-9a-fA-F]+$/, base8Re = /^0[0-7]+$/, base8NegRe = /^-?0[0-7]+$/, numberRe = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/, nameRe = /^[a-zA-Z_][a-zA-Z_0-9]*$/, typeRefRe = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/, fqTypeRefRe = /^(?:\.[a-zA-Z_][a-zA-Z_0-9]*)+$/;
/**
 * Result object returned from {@link parse}.
 * @interface IParserResult
 * @property {string|undefined} package Package name, if declared
 * @property {string[]|undefined} imports Imports, if any
 * @property {string[]|undefined} weakImports Weak imports, if any
 * @property {string|undefined} syntax Syntax, if specified (either `"proto2"` or `"proto3"`)
 * @property {Root} root Populated root instance
 */ /**
 * Options modifying the behavior of {@link parse}.
 * @interface IParseOptions
 * @property {boolean} [keepCase=false] Keeps field casing instead of converting to camel case
 * @property {boolean} [alternateCommentMode=false] Recognize double-slash comments in addition to doc-block comments.
 * @property {boolean} [preferTrailingComment=false] Use trailing comment when both leading comment and trailing comment exist.
 */ /**
 * Options modifying the behavior of JSON serialization.
 * @interface IToJSONOptions
 * @property {boolean} [keepComments=false] Serializes comments.
 */ /**
 * Parses the given .proto source and returns an object with the parsed contents.
 * @param {string} source Source contents
 * @param {Root} root Root to populate
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {IParserResult} Parser result
 * @property {string} filename=null Currently processing file name for error reporting, if known
 * @property {IParseOptions} defaults Default {@link IParseOptions}
 */ function parse(source, root, options) {
    /* eslint-disable callback-return */ if (!(root instanceof Root)) {
        options = root;
        root = new Root();
    }
    if (!options) options = parse.defaults;
    var preferTrailingComment = options.preferTrailingComment || false;
    var tn = tokenize(source, options.alternateCommentMode || false), next = tn.next, push = tn.push, peek = tn.peek, skip = tn.skip, cmnt = tn.cmnt;
    var head = true, pkg, imports, weakImports, syntax, isProto3 = false;
    var ptr = root;
    var applyCase = options.keepCase ? function(name) {
        return name;
    } : util.camelCase;
    /* istanbul ignore next */ function illegal(token, name, insideTryCatch) {
        var filename = parse.filename;
        if (!insideTryCatch) parse.filename = null;
        return Error("illegal " + (name || "token") + " '" + token + "' (" + (filename ? filename + ", " : "") + "line " + tn.line + ")");
    }
    function readString() {
        var values = [], token;
        do {
            /* istanbul ignore if */ if ((token = next()) !== '"' && token !== "'") throw illegal(token);
            values.push(next());
            skip(token);
            token = peek();
        }while (token === '"' || token === "'");
        return values.join("");
    }
    function readValue(acceptTypeRef) {
        var token = next();
        switch(token){
            case "'":
            case '"':
                push(token);
                return readString();
            case "true":
            case "TRUE":
                return true;
            case "false":
            case "FALSE":
                return false;
        }
        try {
            return parseNumber(token, /* insideTryCatch */ true);
        } catch (e) {
            /* istanbul ignore else */ if (acceptTypeRef && typeRefRe.test(token)) return token;
            /* istanbul ignore next */ throw illegal(token, "value");
        }
    }
    function readRanges(target, acceptStrings) {
        var token, start;
        do {
            if (acceptStrings && ((token = peek()) === '"' || token === "'")) target.push(readString());
            else target.push([
                start = parseId(next()),
                skip("to", true) ? parseId(next()) : start
            ]);
        }while (skip(",", true));
        skip(";");
    }
    function parseNumber(token, insideTryCatch) {
        var sign = 1;
        if (token.charAt(0) === "-") {
            sign = -1;
            token = token.substring(1);
        }
        switch(token){
            case "inf":
            case "INF":
            case "Inf":
                return sign * Infinity;
            case "nan":
            case "NAN":
            case "Nan":
            case "NaN":
                return NaN;
            case "0":
                return 0;
        }
        if (base10Re.test(token)) return sign * parseInt(token, 10);
        if (base16Re.test(token)) return sign * parseInt(token, 16);
        if (base8Re.test(token)) return sign * parseInt(token, 8);
        /* istanbul ignore else */ if (numberRe.test(token)) return sign * parseFloat(token);
        /* istanbul ignore next */ throw illegal(token, "number", insideTryCatch);
    }
    function parseId(token, acceptNegative) {
        switch(token){
            case "max":
            case "MAX":
            case "Max":
                return 536870911;
            case "0":
                return 0;
        }
        /* istanbul ignore if */ if (!acceptNegative && token.charAt(0) === "-") throw illegal(token, "id");
        if (base10NegRe.test(token)) return parseInt(token, 10);
        if (base16NegRe.test(token)) return parseInt(token, 16);
        /* istanbul ignore else */ if (base8NegRe.test(token)) return parseInt(token, 8);
        /* istanbul ignore next */ throw illegal(token, "id");
    }
    function parsePackage() {
        /* istanbul ignore if */ if (pkg !== undefined) throw illegal("package");
        pkg = next();
        /* istanbul ignore if */ if (!typeRefRe.test(pkg)) throw illegal(pkg, "name");
        ptr = ptr.define(pkg);
        skip(";");
    }
    function parseImport() {
        var token = peek();
        var whichImports;
        switch(token){
            case "weak":
                whichImports = weakImports || (weakImports = []);
                next();
                break;
            case "public":
                next();
            // eslint-disable-line no-fallthrough
            default:
                whichImports = imports || (imports = []);
                break;
        }
        token = readString();
        skip(";");
        whichImports.push(token);
    }
    function parseSyntax() {
        skip("=");
        syntax = readString();
        isProto3 = syntax === "proto3";
        /* istanbul ignore if */ if (!isProto3 && syntax !== "proto2") throw illegal(syntax, "syntax");
        skip(";");
    }
    function parseCommon(parent, token) {
        switch(token){
            case "option":
                parseOption(parent, token);
                skip(";");
                return true;
            case "message":
                parseType(parent, token);
                return true;
            case "enum":
                parseEnum(parent, token);
                return true;
            case "service":
                parseService(parent, token);
                return true;
            case "extend":
                parseExtension(parent, token);
                return true;
        }
        return false;
    }
    function ifBlock(obj, fnIf, fnElse) {
        var trailingLine = tn.line;
        if (obj) {
            if (typeof obj.comment !== "string") {
                obj.comment = cmnt(); // try block-type comment
            }
            obj.filename = parse.filename;
        }
        if (skip("{", true)) {
            var token;
            while((token = next()) !== "}")fnIf(token);
            skip(";", true);
        } else {
            if (fnElse) fnElse();
            skip(";");
            if (obj && (typeof obj.comment !== "string" || preferTrailingComment)) obj.comment = cmnt(trailingLine) || obj.comment; // try line-type comment
        }
    }
    function parseType(parent, token) {
        /* istanbul ignore if */ if (!nameRe.test(token = next())) throw illegal(token, "type name");
        var type = new Type(token);
        ifBlock(type, function parseType_block(token) {
            if (parseCommon(type, token)) return;
            switch(token){
                case "map":
                    parseMapField(type, token);
                    break;
                case "required":
                case "repeated":
                    parseField(type, token);
                    break;
                case "optional":
                    /* istanbul ignore if */ if (isProto3) {
                        parseField(type, "proto3_optional");
                    } else {
                        parseField(type, "optional");
                    }
                    break;
                case "oneof":
                    parseOneOf(type, token);
                    break;
                case "extensions":
                    readRanges(type.extensions || (type.extensions = []));
                    break;
                case "reserved":
                    readRanges(type.reserved || (type.reserved = []), true);
                    break;
                default:
                    /* istanbul ignore if */ if (!isProto3 || !typeRefRe.test(token)) throw illegal(token);
                    push(token);
                    parseField(type, "optional");
                    break;
            }
        });
        parent.add(type);
    }
    function parseField(parent, rule, extend) {
        var type = next();
        if (type === "group") {
            parseGroup(parent, rule);
            return;
        }
        // Type names can consume multiple tokens, in multiple variants:
        //    package.subpackage   field       tokens: "package.subpackage" [TYPE NAME ENDS HERE] "field"
        //    package . subpackage field       tokens: "package" "." "subpackage" [TYPE NAME ENDS HERE] "field"
        //    package.  subpackage field       tokens: "package." "subpackage" [TYPE NAME ENDS HERE] "field"
        //    package  .subpackage field       tokens: "package" ".subpackage" [TYPE NAME ENDS HERE] "field"
        // Keep reading tokens until we get a type name with no period at the end,
        // and the next token does not start with a period.
        while(type.endsWith(".") || peek().startsWith(".")){
            type += next();
        }
        /* istanbul ignore if */ if (!typeRefRe.test(type)) throw illegal(type, "type");
        var name = next();
        /* istanbul ignore if */ if (!nameRe.test(name)) throw illegal(name, "name");
        name = applyCase(name);
        skip("=");
        var field = new Field(name, parseId(next()), type, rule, extend);
        ifBlock(field, function parseField_block(token) {
            /* istanbul ignore else */ if (token === "option") {
                parseOption(field, token);
                skip(";");
            } else throw illegal(token);
        }, function parseField_line() {
            parseInlineOptions(field);
        });
        if (rule === "proto3_optional") {
            // for proto3 optional fields, we create a single-member Oneof to mimic "optional" behavior
            var oneof = new OneOf("_" + name);
            field.setOption("proto3_optional", true);
            oneof.add(field);
            parent.add(oneof);
        } else {
            parent.add(field);
        }
        // JSON defaults to packed=true if not set so we have to set packed=false explicity when
        // parsing proto2 descriptors without the option, where applicable. This must be done for
        // all known packable types and anything that could be an enum (= is not a basic type).
        if (!isProto3 && field.repeated && (types.packed[type] !== undefined || types.basic[type] === undefined)) field.setOption("packed", false, /* ifNotSet */ true);
    }
    function parseGroup(parent, rule) {
        var name = next();
        /* istanbul ignore if */ if (!nameRe.test(name)) throw illegal(name, "name");
        var fieldName = util.lcFirst(name);
        if (name === fieldName) name = util.ucFirst(name);
        skip("=");
        var id = parseId(next());
        var type = new Type(name);
        type.group = true;
        var field = new Field(fieldName, id, name, rule);
        field.filename = parse.filename;
        ifBlock(type, function parseGroup_block(token) {
            switch(token){
                case "option":
                    parseOption(type, token);
                    skip(";");
                    break;
                case "required":
                case "repeated":
                    parseField(type, token);
                    break;
                case "optional":
                    /* istanbul ignore if */ if (isProto3) {
                        parseField(type, "proto3_optional");
                    } else {
                        parseField(type, "optional");
                    }
                    break;
                case "message":
                    parseType(type, token);
                    break;
                case "enum":
                    parseEnum(type, token);
                    break;
                /* istanbul ignore next */ default:
                    throw illegal(token); // there are no groups with proto3 semantics
            }
        });
        parent.add(type).add(field);
    }
    function parseMapField(parent) {
        skip("<");
        var keyType = next();
        /* istanbul ignore if */ if (types.mapKey[keyType] === undefined) throw illegal(keyType, "type");
        skip(",");
        var valueType = next();
        /* istanbul ignore if */ if (!typeRefRe.test(valueType)) throw illegal(valueType, "type");
        skip(">");
        var name = next();
        /* istanbul ignore if */ if (!nameRe.test(name)) throw illegal(name, "name");
        skip("=");
        var field = new MapField(applyCase(name), parseId(next()), keyType, valueType);
        ifBlock(field, function parseMapField_block(token) {
            /* istanbul ignore else */ if (token === "option") {
                parseOption(field, token);
                skip(";");
            } else throw illegal(token);
        }, function parseMapField_line() {
            parseInlineOptions(field);
        });
        parent.add(field);
    }
    function parseOneOf(parent, token) {
        /* istanbul ignore if */ if (!nameRe.test(token = next())) throw illegal(token, "name");
        var oneof = new OneOf(applyCase(token));
        ifBlock(oneof, function parseOneOf_block(token) {
            if (token === "option") {
                parseOption(oneof, token);
                skip(";");
            } else {
                push(token);
                parseField(oneof, "optional");
            }
        });
        parent.add(oneof);
    }
    function parseEnum(parent, token) {
        /* istanbul ignore if */ if (!nameRe.test(token = next())) throw illegal(token, "name");
        var enm = new Enum(token);
        ifBlock(enm, function parseEnum_block(token) {
            switch(token){
                case "option":
                    parseOption(enm, token);
                    skip(";");
                    break;
                case "reserved":
                    readRanges(enm.reserved || (enm.reserved = []), true);
                    break;
                default:
                    parseEnumValue(enm, token);
            }
        });
        parent.add(enm);
    }
    function parseEnumValue(parent, token) {
        /* istanbul ignore if */ if (!nameRe.test(token)) throw illegal(token, "name");
        skip("=");
        var value = parseId(next(), true), dummy = {
            options: undefined
        };
        dummy.setOption = function(name, value) {
            if (this.options === undefined) this.options = {};
            this.options[name] = value;
        };
        ifBlock(dummy, function parseEnumValue_block(token) {
            /* istanbul ignore else */ if (token === "option") {
                parseOption(dummy, token); // skip
                skip(";");
            } else throw illegal(token);
        }, function parseEnumValue_line() {
            parseInlineOptions(dummy); // skip
        });
        parent.add(token, value, dummy.comment, dummy.options);
    }
    function parseOption(parent, token) {
        var isCustom = skip("(", true);
        /* istanbul ignore if */ if (!typeRefRe.test(token = next())) throw illegal(token, "name");
        var name = token;
        var option = name;
        var propName;
        if (isCustom) {
            skip(")");
            name = "(" + name + ")";
            option = name;
            token = peek();
            if (fqTypeRefRe.test(token)) {
                propName = token.slice(1); //remove '.' before property name
                name += token;
                next();
            }
        }
        skip("=");
        var optionValue = parseOptionValue(parent, name);
        setParsedOption(parent, option, optionValue, propName);
    }
    function parseOptionValue(parent, name) {
        // { a: "foo" b { c: "bar" } }
        if (skip("{", true)) {
            var objectResult = {};
            while(!skip("}", true)){
                /* istanbul ignore if */ if (!nameRe.test(token = next())) {
                    throw illegal(token, "name");
                }
                var value;
                var propName = token;
                skip(":", true);
                if (peek() === "{") value = parseOptionValue(parent, name + "." + token);
                else if (peek() === "[") {
                    // option (my_option) = {
                    //     repeated_value: [ "foo", "bar" ]
                    // };
                    value = [];
                    var lastValue;
                    if (skip("[", true)) {
                        do {
                            lastValue = readValue(true);
                            value.push(lastValue);
                        }while (skip(",", true));
                        skip("]");
                        if (typeof lastValue !== "undefined") {
                            setOption(parent, name + "." + token, lastValue);
                        }
                    }
                } else {
                    value = readValue(true);
                    setOption(parent, name + "." + token, value);
                }
                var prevValue = objectResult[propName];
                if (prevValue) value = [].concat(prevValue).concat(value);
                objectResult[propName] = value;
                // Semicolons and commas can be optional
                skip(",", true);
                skip(";", true);
            }
            return objectResult;
        }
        var simpleValue = readValue(true);
        setOption(parent, name, simpleValue);
        return simpleValue;
    // Does not enforce a delimiter to be universal
    }
    function setOption(parent, name, value) {
        if (parent.setOption) parent.setOption(name, value);
    }
    function setParsedOption(parent, name, value, propName) {
        if (parent.setParsedOption) parent.setParsedOption(name, value, propName);
    }
    function parseInlineOptions(parent) {
        if (skip("[", true)) {
            do {
                parseOption(parent, "option");
            }while (skip(",", true));
            skip("]");
        }
        return parent;
    }
    function parseService(parent, token) {
        /* istanbul ignore if */ if (!nameRe.test(token = next())) throw illegal(token, "service name");
        var service = new Service(token);
        ifBlock(service, function parseService_block(token) {
            if (parseCommon(service, token)) return;
            /* istanbul ignore else */ if (token === "rpc") parseMethod(service, token);
            else throw illegal(token);
        });
        parent.add(service);
    }
    function parseMethod(parent, token) {
        // Get the comment of the preceding line now (if one exists) in case the
        // method is defined across multiple lines.
        var commentText = cmnt();
        var type = token;
        /* istanbul ignore if */ if (!nameRe.test(token = next())) throw illegal(token, "name");
        var name = token, requestType, requestStream, responseType, responseStream;
        skip("(");
        if (skip("stream", true)) requestStream = true;
        /* istanbul ignore if */ if (!typeRefRe.test(token = next())) throw illegal(token);
        requestType = token;
        skip(")");
        skip("returns");
        skip("(");
        if (skip("stream", true)) responseStream = true;
        /* istanbul ignore if */ if (!typeRefRe.test(token = next())) throw illegal(token);
        responseType = token;
        skip(")");
        var method = new Method(name, type, requestType, responseType, requestStream, responseStream);
        method.comment = commentText;
        ifBlock(method, function parseMethod_block(token) {
            /* istanbul ignore else */ if (token === "option") {
                parseOption(method, token);
                skip(";");
            } else throw illegal(token);
        });
        parent.add(method);
    }
    function parseExtension(parent, token) {
        /* istanbul ignore if */ if (!typeRefRe.test(token = next())) throw illegal(token, "reference");
        var reference = token;
        ifBlock(null, function parseExtension_block(token) {
            switch(token){
                case "required":
                case "repeated":
                    parseField(parent, token, reference);
                    break;
                case "optional":
                    /* istanbul ignore if */ if (isProto3) {
                        parseField(parent, "proto3_optional", reference);
                    } else {
                        parseField(parent, "optional", reference);
                    }
                    break;
                default:
                    /* istanbul ignore if */ if (!isProto3 || !typeRefRe.test(token)) throw illegal(token);
                    push(token);
                    parseField(parent, "optional", reference);
                    break;
            }
        });
    }
    var token;
    while((token = next()) !== null){
        switch(token){
            case "package":
                /* istanbul ignore if */ if (!head) throw illegal(token);
                parsePackage();
                break;
            case "import":
                /* istanbul ignore if */ if (!head) throw illegal(token);
                parseImport();
                break;
            case "syntax":
                /* istanbul ignore if */ if (!head) throw illegal(token);
                parseSyntax();
                break;
            case "option":
                parseOption(ptr, token);
                skip(";");
                break;
            default:
                /* istanbul ignore else */ if (parseCommon(ptr, token)) {
                    head = false;
                    continue;
                }
                /* istanbul ignore next */ throw illegal(token);
        }
    }
    parse.filename = null;
    return {
        "package": pkg,
        "imports": imports,
        weakImports: weakImports,
        syntax: syntax,
        root: root
    };
} /**
 * Parses the given .proto source and returns an object with the parsed contents.
 * @name parse
 * @function
 * @param {string} source Source contents
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {IParserResult} Parser result
 * @property {string} filename=null Currently processing file name for error reporting, if known
 * @property {IParseOptions} defaults Default {@link IParseOptions}
 * @variation 2
 */ 


/***/ }),

/***/ 10964:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = Reader;
var util = __webpack_require__(27188);
var BufferReader; // cyclic
var LongBits = util.LongBits, utf8 = util.utf8;
/* istanbul ignore next */ function indexOutOfRange(reader, writeLength) {
    return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
}
/**
 * Constructs a new reader instance using the specified buffer.
 * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 * @param {Uint8Array} buffer Buffer to read from
 */ function Reader(buffer) {
    /**
     * Read buffer.
     * @type {Uint8Array}
     */ this.buf = buffer;
    /**
     * Read buffer position.
     * @type {number}
     */ this.pos = 0;
    /**
     * Read buffer length.
     * @type {number}
     */ this.len = buffer.length;
}
var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
    if (buffer instanceof Uint8Array || Array.isArray(buffer)) return new Reader(buffer);
    throw Error("illegal buffer");
} : function create_array(buffer) {
    if (Array.isArray(buffer)) return new Reader(buffer);
    throw Error("illegal buffer");
};
var create = function create() {
    return util.Buffer ? function create_buffer_setup(buffer) {
        return (Reader.create = function create_buffer(buffer) {
            return util.Buffer.isBuffer(buffer) ? new BufferReader(buffer) : create_array(buffer);
        })(buffer);
    } : create_array;
};
/**
 * Creates a new reader using the specified buffer.
 * @function
 * @param {Uint8Array|Buffer} buffer Buffer to read from
 * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
 * @throws {Error} If `buffer` is not a valid buffer
 */ Reader.create = create();
Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */ util.Array.prototype.slice;
/**
 * Reads a varint as an unsigned 32 bit value.
 * @function
 * @returns {number} Value read
 */ Reader.prototype.uint32 = function read_uint32_setup() {
    var value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)
    return function read_uint32() {
        value = (this.buf[this.pos] & 127) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        /* istanbul ignore if */ if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
        }
        return value;
    };
}();
/**
 * Reads a varint as a signed 32 bit value.
 * @returns {number} Value read
 */ Reader.prototype.int32 = function read_int32() {
    return this.uint32() | 0;
};
/**
 * Reads a zig-zag encoded varint as a signed 32 bit value.
 * @returns {number} Value read
 */ Reader.prototype.sint32 = function read_sint32() {
    var value = this.uint32();
    return value >>> 1 ^ -(value & 1) | 0;
};
/* eslint-disable no-invalid-this */ function readLongVarint() {
    // tends to deopt with local vars for octet etc.
    var bits = new LongBits(0, 0);
    var i = 0;
    if (this.len - this.pos > 4) {
        for(; i < 4; ++i){
            // 1st..4th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
        }
        // 5th
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
        if (this.buf[this.pos++] < 128) return bits;
        i = 0;
    } else {
        for(; i < 3; ++i){
            /* istanbul ignore if */ if (this.pos >= this.len) throw indexOutOfRange(this);
            // 1st..3th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
        }
        // 4th
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
    }
    if (this.len - this.pos > 4) {
        for(; i < 5; ++i){
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
        }
    } else {
        for(; i < 5; ++i){
            /* istanbul ignore if */ if (this.pos >= this.len) throw indexOutOfRange(this);
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128) return bits;
        }
    }
    /* istanbul ignore next */ throw Error("invalid varint encoding");
}
/* eslint-enable no-invalid-this */ /**
 * Reads a varint as a signed 64 bit value.
 * @name Reader#int64
 * @function
 * @returns {Long} Value read
 */ /**
 * Reads a varint as an unsigned 64 bit value.
 * @name Reader#uint64
 * @function
 * @returns {Long} Value read
 */ /**
 * Reads a zig-zag encoded varint as a signed 64 bit value.
 * @name Reader#sint64
 * @function
 * @returns {Long} Value read
 */ /**
 * Reads a varint as a boolean.
 * @returns {boolean} Value read
 */ Reader.prototype.bool = function read_bool() {
    return this.uint32() !== 0;
};
function readFixed32_end(buf, end) {
    return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
}
/**
 * Reads fixed 32 bits as an unsigned 32 bit integer.
 * @returns {number} Value read
 */ Reader.prototype.fixed32 = function read_fixed32() {
    /* istanbul ignore if */ if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
    return readFixed32_end(this.buf, this.pos += 4);
};
/**
 * Reads fixed 32 bits as a signed 32 bit integer.
 * @returns {number} Value read
 */ Reader.prototype.sfixed32 = function read_sfixed32() {
    /* istanbul ignore if */ if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
    return readFixed32_end(this.buf, this.pos += 4) | 0;
};
/* eslint-disable no-invalid-this */ function readFixed64() {
    /* istanbul ignore if */ if (this.pos + 8 > this.len) throw indexOutOfRange(this, 8);
    return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
}
/* eslint-enable no-invalid-this */ /**
 * Reads fixed 64 bits.
 * @name Reader#fixed64
 * @function
 * @returns {Long} Value read
 */ /**
 * Reads zig-zag encoded fixed 64 bits.
 * @name Reader#sfixed64
 * @function
 * @returns {Long} Value read
 */ /**
 * Reads a float (32 bit) as a number.
 * @function
 * @returns {number} Value read
 */ Reader.prototype.float = function read_float() {
    /* istanbul ignore if */ if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
    var value = util.float.readFloatLE(this.buf, this.pos);
    this.pos += 4;
    return value;
};
/**
 * Reads a double (64 bit float) as a number.
 * @function
 * @returns {number} Value read
 */ Reader.prototype.double = function read_double() {
    /* istanbul ignore if */ if (this.pos + 8 > this.len) throw indexOutOfRange(this, 4);
    var value = util.float.readDoubleLE(this.buf, this.pos);
    this.pos += 8;
    return value;
};
/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @returns {Uint8Array} Value read
 */ Reader.prototype.bytes = function read_bytes() {
    var length = this.uint32(), start = this.pos, end = this.pos + length;
    /* istanbul ignore if */ if (end > this.len) throw indexOutOfRange(this, length);
    this.pos += length;
    if (Array.isArray(this.buf)) return this.buf.slice(start, end);
    return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
     ? new this.buf.constructor(0) : this._slice.call(this.buf, start, end);
};
/**
 * Reads a string preceeded by its byte length as a varint.
 * @returns {string} Value read
 */ Reader.prototype.string = function read_string() {
    var bytes = this.bytes();
    return utf8.read(bytes, 0, bytes.length);
};
/**
 * Skips the specified number of bytes if specified, otherwise skips a varint.
 * @param {number} [length] Length if known, otherwise a varint is assumed
 * @returns {Reader} `this`
 */ Reader.prototype.skip = function skip(length) {
    if (typeof length === "number") {
        /* istanbul ignore if */ if (this.pos + length > this.len) throw indexOutOfRange(this, length);
        this.pos += length;
    } else {
        do {
            /* istanbul ignore if */ if (this.pos >= this.len) throw indexOutOfRange(this);
        }while (this.buf[this.pos++] & 128);
    }
    return this;
};
/**
 * Skips the next element of the specified wire type.
 * @param {number} wireType Wire type received
 * @returns {Reader} `this`
 */ Reader.prototype.skipType = function(wireType) {
    switch(wireType){
        case 0:
            this.skip();
            break;
        case 1:
            this.skip(8);
            break;
        case 2:
            this.skip(this.uint32());
            break;
        case 3:
            while((wireType = this.uint32() & 7) !== 4){
                this.skipType(wireType);
            }
            break;
        case 5:
            this.skip(4);
            break;
        /* istanbul ignore next */ default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
    }
    return this;
};
Reader._configure = function(BufferReader_) {
    BufferReader = BufferReader_;
    Reader.create = create();
    BufferReader._configure();
    var fn = util.Long ? "toLong" : /* istanbul ignore next */ "toNumber";
    util.merge(Reader.prototype, {
        int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
        },
        uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
        },
        sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
        },
        fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
        },
        sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
        }
    });
};


/***/ }),

/***/ 10598:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = BufferReader;
// extends Reader
var Reader = __webpack_require__(10964);
(BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
var util = __webpack_require__(27188);
/**
 * Constructs a new buffer reader instance.
 * @classdesc Wire format reader using node buffers.
 * @extends Reader
 * @constructor
 * @param {Buffer} buffer Buffer to read from
 */ function BufferReader(buffer) {
    Reader.call(this, buffer);
/**
     * Read buffer.
     * @name BufferReader#buf
     * @type {Buffer}
     */ }
BufferReader._configure = function() {
    /* istanbul ignore else */ if (util.Buffer) BufferReader.prototype._slice = util.Buffer.prototype.slice;
};
/**
 * @override
 */ BufferReader.prototype.string = function read_string_buffer() {
    var len = this.uint32(); // modifies pos
    return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
};
/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @name BufferReader#bytes
 * @function
 * @returns {Buffer} Value read
 */ BufferReader._configure();


/***/ }),

/***/ 48880:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = Root;
// extends Namespace
var Namespace = __webpack_require__(1804);
((Root.prototype = Object.create(Namespace.prototype)).constructor = Root).className = "Root";
var Field = __webpack_require__(93777), Enum = __webpack_require__(4328), OneOf = __webpack_require__(25250), util = __webpack_require__(31502);
var Type, parse, common; // "
/**
 * Constructs a new root namespace instance.
 * @classdesc Root namespace wrapping all types, enums, services, sub-namespaces etc. that belong together.
 * @extends NamespaceBase
 * @constructor
 * @param {Object.<string,*>} [options] Top level options
 */ function Root(options) {
    Namespace.call(this, "", options);
    /**
     * Deferred extension fields.
     * @type {Field[]}
     */ this.deferred = [];
    /**
     * Resolved file names of loaded files.
     * @type {string[]}
     */ this.files = [];
}
/**
 * Loads a namespace descriptor into a root namespace.
 * @param {INamespace} json Nameespace descriptor
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted
 * @returns {Root} Root namespace
 */ Root.fromJSON = function fromJSON(json, root) {
    if (!root) root = new Root();
    if (json.options) root.setOptions(json.options);
    return root.addJSON(json.nested);
};
/**
 * Resolves the path of an imported file, relative to the importing origin.
 * This method exists so you can override it with your own logic in case your imports are scattered over multiple directories.
 * @function
 * @param {string} origin The file name of the importing file
 * @param {string} target The file name being imported
 * @returns {string|null} Resolved path to `target` or `null` to skip the file
 */ Root.prototype.resolvePath = util.path.resolve;
/**
 * Fetch content from file path or url
 * This method exists so you can override it with your own logic.
 * @function
 * @param {string} path File path or url
 * @param {FetchCallback} callback Callback function
 * @returns {undefined}
 */ Root.prototype.fetch = util.fetch;
// A symbol-like function to safely signal synchronous loading
/* istanbul ignore next */ function SYNC() {} // eslint-disable-line no-empty-function
/**
 * Loads one or multiple .proto or preprocessed .json files into this root namespace and calls the callback.
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {IParseOptions} options Parse options
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 */ Root.prototype.load = function load(filename, options, callback) {
    if (typeof options === "function") {
        callback = options;
        options = undefined;
    }
    var self = this;
    if (!callback) return util.asPromise(load, self, filename, options);
    var sync = callback === SYNC; // undocumented
    // Finishes loading by calling the callback (exactly once)
    function finish(err, root) {
        /* istanbul ignore if */ if (!callback) return;
        var cb = callback;
        callback = null;
        if (sync) throw err;
        cb(err, root);
    }
    // Bundled definition existence checking
    function getBundledFileName(filename) {
        var idx = filename.lastIndexOf("google/protobuf/");
        if (idx > -1) {
            var altname = filename.substring(idx);
            if (altname in common) return altname;
        }
        return null;
    }
    // Processes a single file
    function process(filename, source) {
        try {
            if (util.isString(source) && source.charAt(0) === "{") source = JSON.parse(source);
            if (!util.isString(source)) self.setOptions(source.options).addJSON(source.nested);
            else {
                parse.filename = filename;
                var parsed = parse(source, self, options), resolved, i = 0;
                if (parsed.imports) {
                    for(; i < parsed.imports.length; ++i)if (resolved = getBundledFileName(parsed.imports[i]) || self.resolvePath(filename, parsed.imports[i])) fetch(resolved);
                }
                if (parsed.weakImports) {
                    for(i = 0; i < parsed.weakImports.length; ++i)if (resolved = getBundledFileName(parsed.weakImports[i]) || self.resolvePath(filename, parsed.weakImports[i])) fetch(resolved, true);
                }
            }
        } catch (err) {
            finish(err);
        }
        if (!sync && !queued) finish(null, self); // only once anyway
    }
    // Fetches a single file
    function fetch(filename, weak) {
        filename = getBundledFileName(filename) || filename;
        // Skip if already loaded / attempted
        if (self.files.indexOf(filename) > -1) return;
        self.files.push(filename);
        // Shortcut bundled definitions
        if (filename in common) {
            if (sync) process(filename, common[filename]);
            else {
                ++queued;
                setTimeout(function() {
                    --queued;
                    process(filename, common[filename]);
                });
            }
            return;
        }
        // Otherwise fetch from disk or network
        if (sync) {
            var source;
            try {
                source = util.fs.readFileSync(filename).toString("utf8");
            } catch (err) {
                if (!weak) finish(err);
                return;
            }
            process(filename, source);
        } else {
            ++queued;
            self.fetch(filename, function(err, source) {
                --queued;
                /* istanbul ignore if */ if (!callback) return; // terminated meanwhile
                if (err) {
                    /* istanbul ignore else */ if (!weak) finish(err);
                    else if (!queued) finish(null, self);
                    return;
                }
                process(filename, source);
            });
        }
    }
    var queued = 0;
    // Assembling the root namespace doesn't require working type
    // references anymore, so we can load everything in parallel
    if (util.isString(filename)) filename = [
        filename
    ];
    for(var i = 0, resolved; i < filename.length; ++i)if (resolved = self.resolvePath("", filename[i])) fetch(resolved);
    if (sync) return self;
    if (!queued) finish(null, self);
    return undefined;
};
// function load(filename:string, options:IParseOptions, callback:LoadCallback):undefined
/**
 * Loads one or multiple .proto or preprocessed .json files into this root namespace and calls the callback.
 * @function Root#load
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 * @variation 2
 */ // function load(filename:string, callback:LoadCallback):undefined
/**
 * Loads one or multiple .proto or preprocessed .json files into this root namespace and returns a promise.
 * @function Root#load
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {Promise<Root>} Promise
 * @variation 3
 */ // function load(filename:string, [options:IParseOptions]):Promise<Root>
/**
 * Synchronously loads one or multiple .proto or preprocessed .json files into this root namespace (node only).
 * @function Root#loadSync
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {Root} Root namespace
 * @throws {Error} If synchronous fetching is not supported (i.e. in browsers) or if a file's syntax is invalid
 */ Root.prototype.loadSync = function loadSync(filename, options) {
    if (!util.isNode) throw Error("not supported");
    return this.load(filename, options, SYNC);
};
/**
 * @override
 */ Root.prototype.resolveAll = function resolveAll() {
    if (this.deferred.length) throw Error("unresolvable extensions: " + this.deferred.map(function(field) {
        return "'extend " + field.extend + "' in " + field.parent.fullName;
    }).join(", "));
    return Namespace.prototype.resolveAll.call(this);
};
// only uppercased (and thus conflict-free) children are exposed, see below
var exposeRe = /^[A-Z]/;
/**
 * Handles a deferred declaring extension field by creating a sister field to represent it within its extended type.
 * @param {Root} root Root instance
 * @param {Field} field Declaring extension field witin the declaring type
 * @returns {boolean} `true` if successfully added to the extended type, `false` otherwise
 * @inner
 * @ignore
 */ function tryHandleExtension(root, field) {
    var extendedType = field.parent.lookup(field.extend);
    if (extendedType) {
        var sisterField = new Field(field.fullName, field.id, field.type, field.rule, undefined, field.options);
        //do not allow to extend same field twice to prevent the error
        if (extendedType.get(sisterField.name)) {
            return true;
        }
        sisterField.declaringField = field;
        field.extensionField = sisterField;
        extendedType.add(sisterField);
        return true;
    }
    return false;
}
/**
 * Called when any object is added to this root or its sub-namespaces.
 * @param {ReflectionObject} object Object added
 * @returns {undefined}
 * @private
 */ Root.prototype._handleAdd = function _handleAdd(object) {
    if (object instanceof Field) {
        if (/* an extension field (implies not part of a oneof) */ object.extend !== undefined && /* not already handled */ !object.extensionField) {
            if (!tryHandleExtension(this, object)) this.deferred.push(object);
        }
    } else if (object instanceof Enum) {
        if (exposeRe.test(object.name)) object.parent[object.name] = object.values; // expose enum values as property of its parent
    } else if (!(object instanceof OneOf)) /* everything else is a namespace */ {
        if (object instanceof Type) for(var i = 0; i < this.deferred.length;)if (tryHandleExtension(this, this.deferred[i])) this.deferred.splice(i, 1);
        else ++i;
        for(var j = 0; j < /* initializes */ object.nestedArray.length; ++j)this._handleAdd(object._nestedArray[j]);
        if (exposeRe.test(object.name)) object.parent[object.name] = object; // expose namespace as property of its parent
    }
// The above also adds uppercased (and thus conflict-free) nested types, services and enums as
// properties of namespaces just like static code does. This allows using a .d.ts generated for
// a static module with reflection-based solutions where the condition is met.
};
/**
 * Called when any object is removed from this root or its sub-namespaces.
 * @param {ReflectionObject} object Object removed
 * @returns {undefined}
 * @private
 */ Root.prototype._handleRemove = function _handleRemove(object) {
    if (object instanceof Field) {
        if (/* an extension field */ object.extend !== undefined) {
            if (/* already handled */ object.extensionField) {
                object.extensionField.parent.remove(object.extensionField);
                object.extensionField = null;
            } else {
                var index = this.deferred.indexOf(object);
                /* istanbul ignore else */ if (index > -1) this.deferred.splice(index, 1);
            }
        }
    } else if (object instanceof Enum) {
        if (exposeRe.test(object.name)) delete object.parent[object.name]; // unexpose enum values
    } else if (object instanceof Namespace) {
        for(var i = 0; i < /* initializes */ object.nestedArray.length; ++i)this._handleRemove(object._nestedArray[i]);
        if (exposeRe.test(object.name)) delete object.parent[object.name]; // unexpose namespaces
    }
};
// Sets up cyclic dependencies (called in index-light)
Root._configure = function(Type_, parse_, common_) {
    Type = Type_;
    parse = parse_;
    common = common_;
};


/***/ }),

/***/ 50715:
/***/ ((module) => {


module.exports = {}; /**
 * Named roots.
 * This is where pbjs stores generated structures (the option `-r, --root` specifies a name).
 * Can also be used manually to make roots available across modules.
 * @name roots
 * @type {Object.<string,Root>}
 * @example
 * // pbjs -r myroot -o compiled.js ...
 *
 * // in another module:
 * require("./compiled.js");
 *
 * // in any subsequent module:
 * var root = protobuf.roots["myroot"];
 */ 


/***/ }),

/***/ 20590:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * Streaming RPC helpers.
 * @namespace
 */ var rpc = exports;
/**
 * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
 * @typedef RPCImpl
 * @type {function}
 * @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
 * @param {Uint8Array} requestData Request data
 * @param {RPCImplCallback} callback Callback function
 * @returns {undefined}
 * @example
 * function rpcImpl(method, requestData, callback) {
 *     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
 *         throw Error("no such method");
 *     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
 *         callback(err, responseData);
 *     });
 * }
 */ /**
 * Node-style callback as used by {@link RPCImpl}.
 * @typedef RPCImplCallback
 * @type {function}
 * @param {Error|null} error Error, if any, otherwise `null`
 * @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
 * @returns {undefined}
 */ rpc.Service = __webpack_require__(92232);


/***/ }),

/***/ 92232:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = Service;
var util = __webpack_require__(27188);
// Extends EventEmitter
(Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
/**
 * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
 *
 * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
 * @typedef rpc.ServiceMethodCallback
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {TRes} [response] Response message
 * @returns {undefined}
 */ /**
 * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
 * @typedef rpc.ServiceMethod
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
 * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
 */ /**
 * Constructs a new RPC service instance.
 * @classdesc An RPC service as returned by {@link Service#create}.
 * @exports rpc.Service
 * @extends util.EventEmitter
 * @constructor
 * @param {RPCImpl} rpcImpl RPC implementation
 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
 */ function Service(rpcImpl, requestDelimited, responseDelimited) {
    if (typeof rpcImpl !== "function") throw TypeError("rpcImpl must be a function");
    util.EventEmitter.call(this);
    /**
     * RPC implementation. Becomes `null` once the service is ended.
     * @type {RPCImpl|null}
     */ this.rpcImpl = rpcImpl;
    /**
     * Whether requests are length-delimited.
     * @type {boolean}
     */ this.requestDelimited = Boolean(requestDelimited);
    /**
     * Whether responses are length-delimited.
     * @type {boolean}
     */ this.responseDelimited = Boolean(responseDelimited);
}
/**
 * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
 * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
 * @param {Constructor<TReq>} requestCtor Request constructor
 * @param {Constructor<TRes>} responseCtor Response constructor
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
 * @returns {undefined}
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 */ Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
    if (!request) throw TypeError("request must be specified");
    var self = this;
    if (!callback) return util.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);
    if (!self.rpcImpl) {
        setTimeout(function() {
            callback(Error("already ended"));
        }, 0);
        return undefined;
    }
    try {
        return self.rpcImpl(method, requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(), function rpcCallback(err, response) {
            if (err) {
                self.emit("error", err, method);
                return callback(err);
            }
            if (response === null) {
                self.end(/* endedByRPC */ true);
                return undefined;
            }
            if (!(response instanceof responseCtor)) {
                try {
                    response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
                } catch (err) {
                    self.emit("error", err, method);
                    return callback(err);
                }
            }
            self.emit("data", response, method);
            return callback(null, response);
        });
    } catch (err) {
        self.emit("error", err, method);
        setTimeout(function() {
            callback(err);
        }, 0);
        return undefined;
    }
};
/**
 * Ends this service and emits the `end` event.
 * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
 * @returns {rpc.Service} `this`
 */ Service.prototype.end = function end(endedByRPC) {
    if (this.rpcImpl) {
        if (!endedByRPC) this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
    }
    return this;
};


/***/ }),

/***/ 66577:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = Service;
// extends Namespace
var Namespace = __webpack_require__(1804);
((Service.prototype = Object.create(Namespace.prototype)).constructor = Service).className = "Service";
var Method = __webpack_require__(64057), util = __webpack_require__(31502), rpc = __webpack_require__(20590);
/**
 * Constructs a new service instance.
 * @classdesc Reflected service.
 * @extends NamespaceBase
 * @constructor
 * @param {string} name Service name
 * @param {Object.<string,*>} [options] Service options
 * @throws {TypeError} If arguments are invalid
 */ function Service(name, options) {
    Namespace.call(this, name, options);
    /**
     * Service methods.
     * @type {Object.<string,Method>}
     */ this.methods = {}; // toJSON, marker
    /**
     * Cached methods as an array.
     * @type {Method[]|null}
     * @private
     */ this._methodsArray = null;
}
/**
 * Service descriptor.
 * @interface IService
 * @extends INamespace
 * @property {Object.<string,IMethod>} methods Method descriptors
 */ /**
 * Constructs a service from a service descriptor.
 * @param {string} name Service name
 * @param {IService} json Service descriptor
 * @returns {Service} Created service
 * @throws {TypeError} If arguments are invalid
 */ Service.fromJSON = function fromJSON(name, json) {
    var service = new Service(name, json.options);
    /* istanbul ignore else */ if (json.methods) for(var names = Object.keys(json.methods), i = 0; i < names.length; ++i)service.add(Method.fromJSON(names[i], json.methods[names[i]]));
    if (json.nested) service.addJSON(json.nested);
    service.comment = json.comment;
    return service;
};
/**
 * Converts this service to a service descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IService} Service descriptor
 */ Service.prototype.toJSON = function toJSON(toJSONOptions) {
    var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "options",
        inherited && inherited.options || undefined,
        "methods",
        Namespace.arrayToJSON(this.methodsArray, toJSONOptions) || /* istanbul ignore next */ {},
        "nested",
        inherited && inherited.nested || undefined,
        "comment",
        keepComments ? this.comment : undefined
    ]);
};
/**
 * Methods of this service as an array for iteration.
 * @name Service#methodsArray
 * @type {Method[]}
 * @readonly
 */ Object.defineProperty(Service.prototype, "methodsArray", {
    get: function() {
        return this._methodsArray || (this._methodsArray = util.toArray(this.methods));
    }
});
function clearCache(service) {
    service._methodsArray = null;
    return service;
}
/**
 * @override
 */ Service.prototype.get = function get(name) {
    return this.methods[name] || Namespace.prototype.get.call(this, name);
};
/**
 * @override
 */ Service.prototype.resolveAll = function resolveAll() {
    var methods = this.methodsArray;
    for(var i = 0; i < methods.length; ++i)methods[i].resolve();
    return Namespace.prototype.resolve.call(this);
};
/**
 * @override
 */ Service.prototype.add = function add(object) {
    /* istanbul ignore if */ if (this.get(object.name)) throw Error("duplicate name '" + object.name + "' in " + this);
    if (object instanceof Method) {
        this.methods[object.name] = object;
        object.parent = this;
        return clearCache(this);
    }
    return Namespace.prototype.add.call(this, object);
};
/**
 * @override
 */ Service.prototype.remove = function remove(object) {
    if (object instanceof Method) {
        /* istanbul ignore if */ if (this.methods[object.name] !== object) throw Error(object + " is not a member of " + this);
        delete this.methods[object.name];
        object.parent = null;
        return clearCache(this);
    }
    return Namespace.prototype.remove.call(this, object);
};
/**
 * Creates a runtime service using the specified rpc implementation.
 * @param {RPCImpl} rpcImpl RPC implementation
 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
 * @returns {rpc.Service} RPC service. Useful where requests and/or responses are streamed.
 */ Service.prototype.create = function create(rpcImpl, requestDelimited, responseDelimited) {
    var rpcService = new rpc.Service(rpcImpl, requestDelimited, responseDelimited);
    for(var i = 0, method; i < /* initializes */ this.methodsArray.length; ++i){
        var methodName = util.lcFirst((method = this._methodsArray[i]).resolve().name).replace(/[^$\w_]/g, "");
        rpcService[methodName] = util.codegen([
            "r",
            "c"
        ], util.isReserved(methodName) ? methodName + "_" : methodName)("return this.rpcCall(m,q,s,r,c)")({
            m: method,
            q: method.resolvedRequestType.ctor,
            s: method.resolvedResponseType.ctor
        });
    }
    return rpcService;
};


/***/ }),

/***/ 46682:
/***/ ((module) => {


module.exports = tokenize;
var delimRe = /[\s{}=;:[\],'"()<>]/g, stringDoubleRe = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g, stringSingleRe = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g;
var setCommentRe = /^ *[*/]+ */, setCommentAltRe = /^\s*\*?\/*/, setCommentSplitRe = /\n/g, whitespaceRe = /\s/, unescapeRe = /\\(.?)/g;
var unescapeMap = {
    "0": "\x00",
    "r": "\r",
    "n": "\n",
    "t": "	"
};
/**
 * Unescapes a string.
 * @param {string} str String to unescape
 * @returns {string} Unescaped string
 * @property {Object.<string,string>} map Special characters map
 * @memberof tokenize
 */ function unescape(str) {
    return str.replace(unescapeRe, function($0, $1) {
        switch($1){
            case "\\":
            case "":
                return $1;
            default:
                return unescapeMap[$1] || "";
        }
    });
}
tokenize.unescape = unescape;
/**
 * Gets the next token and advances.
 * @typedef TokenizerHandleNext
 * @type {function}
 * @returns {string|null} Next token or `null` on eof
 */ /**
 * Peeks for the next token.
 * @typedef TokenizerHandlePeek
 * @type {function}
 * @returns {string|null} Next token or `null` on eof
 */ /**
 * Pushes a token back to the stack.
 * @typedef TokenizerHandlePush
 * @type {function}
 * @param {string} token Token
 * @returns {undefined}
 */ /**
 * Skips the next token.
 * @typedef TokenizerHandleSkip
 * @type {function}
 * @param {string} expected Expected token
 * @param {boolean} [optional=false] If optional
 * @returns {boolean} Whether the token matched
 * @throws {Error} If the token didn't match and is not optional
 */ /**
 * Gets the comment on the previous line or, alternatively, the line comment on the specified line.
 * @typedef TokenizerHandleCmnt
 * @type {function}
 * @param {number} [line] Line number
 * @returns {string|null} Comment text or `null` if none
 */ /**
 * Handle object returned from {@link tokenize}.
 * @interface ITokenizerHandle
 * @property {TokenizerHandleNext} next Gets the next token and advances (`null` on eof)
 * @property {TokenizerHandlePeek} peek Peeks for the next token (`null` on eof)
 * @property {TokenizerHandlePush} push Pushes a token back to the stack
 * @property {TokenizerHandleSkip} skip Skips a token, returns its presence and advances or, if non-optional and not present, throws
 * @property {TokenizerHandleCmnt} cmnt Gets the comment on the previous line or the line comment on the specified line, if any
 * @property {number} line Current line number
 */ /**
 * Tokenizes the given .proto source and returns an object with useful utility functions.
 * @param {string} source Source contents
 * @param {boolean} alternateCommentMode Whether we should activate alternate comment parsing mode.
 * @returns {ITokenizerHandle} Tokenizer handle
 */ function tokenize(source, alternateCommentMode) {
    /* eslint-disable callback-return */ source = source.toString();
    var offset = 0, length = source.length, line = 1, lastCommentLine = 0, comments = {};
    var stack = [];
    var stringDelim = null;
    /* istanbul ignore next */ /**
     * Creates an error for illegal syntax.
     * @param {string} subject Subject
     * @returns {Error} Error created
     * @inner
     */ function illegal(subject) {
        return Error("illegal " + subject + " (line " + line + ")");
    }
    /**
     * Reads a string till its end.
     * @returns {string} String read
     * @inner
     */ function readString() {
        var re = stringDelim === "'" ? stringSingleRe : stringDoubleRe;
        re.lastIndex = offset - 1;
        var match = re.exec(source);
        if (!match) throw illegal("string");
        offset = re.lastIndex;
        push(stringDelim);
        stringDelim = null;
        return unescape(match[1]);
    }
    /**
     * Gets the character at `pos` within the source.
     * @param {number} pos Position
     * @returns {string} Character
     * @inner
     */ function charAt(pos) {
        return source.charAt(pos);
    }
    /**
     * Sets the current comment text.
     * @param {number} start Start offset
     * @param {number} end End offset
     * @param {boolean} isLeading set if a leading comment
     * @returns {undefined}
     * @inner
     */ function setComment(start, end, isLeading) {
        var comment = {
            type: source.charAt(start++),
            lineEmpty: false,
            leading: isLeading
        };
        var lookback;
        if (alternateCommentMode) {
            lookback = 2; // alternate comment parsing: "//" or "/*"
        } else {
            lookback = 3; // "///" or "/**"
        }
        var commentOffset = start - lookback, c;
        do {
            if (--commentOffset < 0 || (c = source.charAt(commentOffset)) === "\n") {
                comment.lineEmpty = true;
                break;
            }
        }while (c === " " || c === "	");
        var lines = source.substring(start, end).split(setCommentSplitRe);
        for(var i = 0; i < lines.length; ++i)lines[i] = lines[i].replace(alternateCommentMode ? setCommentAltRe : setCommentRe, "").trim();
        comment.text = lines.join("\n").trim();
        comments[line] = comment;
        lastCommentLine = line;
    }
    function isDoubleSlashCommentLine(startOffset) {
        var endOffset = findEndOfLine(startOffset);
        // see if remaining line matches comment pattern
        var lineText = source.substring(startOffset, endOffset);
        // look for 1 or 2 slashes since startOffset would already point past
        // the first slash that started the comment.
        var isComment = /^\s*\/{1,2}/.test(lineText);
        return isComment;
    }
    function findEndOfLine(cursor) {
        // find end of cursor's line
        var endOffset = cursor;
        while(endOffset < length && charAt(endOffset) !== "\n"){
            endOffset++;
        }
        return endOffset;
    }
    /**
     * Obtains the next token.
     * @returns {string|null} Next token or `null` on eof
     * @inner
     */ function next() {
        if (stack.length > 0) return stack.shift();
        if (stringDelim) return readString();
        var repeat, prev, curr, start, isDoc, isLeadingComment = offset === 0;
        do {
            if (offset === length) return null;
            repeat = false;
            while(whitespaceRe.test(curr = charAt(offset))){
                if (curr === "\n") {
                    isLeadingComment = true;
                    ++line;
                }
                if (++offset === length) return null;
            }
            if (charAt(offset) === "/") {
                if (++offset === length) {
                    throw illegal("comment");
                }
                if (charAt(offset) === "/") {
                    if (!alternateCommentMode) {
                        // check for triple-slash comment
                        isDoc = charAt(start = offset + 1) === "/";
                        while(charAt(++offset) !== "\n"){
                            if (offset === length) {
                                return null;
                            }
                        }
                        ++offset;
                        if (isDoc) {
                            setComment(start, offset - 1, isLeadingComment);
                            // Trailing comment cannot not be multi-line,
                            // so leading comment state should be reset to handle potential next comments
                            isLeadingComment = true;
                        }
                        ++line;
                        repeat = true;
                    } else {
                        // check for double-slash comments, consolidating consecutive lines
                        start = offset;
                        isDoc = false;
                        if (isDoubleSlashCommentLine(offset)) {
                            isDoc = true;
                            do {
                                offset = findEndOfLine(offset);
                                if (offset === length) {
                                    break;
                                }
                                offset++;
                                if (!isLeadingComment) {
                                    break;
                                }
                            }while (isDoubleSlashCommentLine(offset));
                        } else {
                            offset = Math.min(length, findEndOfLine(offset) + 1);
                        }
                        if (isDoc) {
                            setComment(start, offset, isLeadingComment);
                            isLeadingComment = true;
                        }
                        line++;
                        repeat = true;
                    }
                } else if ((curr = charAt(offset)) === "*") {
                    // check for /** (regular comment mode) or /* (alternate comment mode)
                    start = offset + 1;
                    isDoc = alternateCommentMode || charAt(start) === "*";
                    do {
                        if (curr === "\n") {
                            ++line;
                        }
                        if (++offset === length) {
                            throw illegal("comment");
                        }
                        prev = curr;
                        curr = charAt(offset);
                    }while (prev !== "*" || curr !== "/");
                    ++offset;
                    if (isDoc) {
                        setComment(start, offset - 2, isLeadingComment);
                        isLeadingComment = true;
                    }
                    repeat = true;
                } else {
                    return "/";
                }
            }
        }while (repeat);
        // offset !== length if we got here
        var end = offset;
        delimRe.lastIndex = 0;
        var delim = delimRe.test(charAt(end++));
        if (!delim) while(end < length && !delimRe.test(charAt(end)))++end;
        var token = source.substring(offset, offset = end);
        if (token === '"' || token === "'") stringDelim = token;
        return token;
    }
    /**
     * Pushes a token back to the stack.
     * @param {string} token Token
     * @returns {undefined}
     * @inner
     */ function push(token) {
        stack.push(token);
    }
    /**
     * Peeks for the next token.
     * @returns {string|null} Token or `null` on eof
     * @inner
     */ function peek() {
        if (!stack.length) {
            var token = next();
            if (token === null) return null;
            push(token);
        }
        return stack[0];
    }
    /**
     * Skips a token.
     * @param {string} expected Expected token
     * @param {boolean} [optional=false] Whether the token is optional
     * @returns {boolean} `true` when skipped, `false` if not
     * @throws {Error} When a required token is not present
     * @inner
     */ function skip(expected, optional) {
        var actual = peek(), equals = actual === expected;
        if (equals) {
            next();
            return true;
        }
        if (!optional) throw illegal("token '" + actual + "', '" + expected + "' expected");
        return false;
    }
    /**
     * Gets a comment.
     * @param {number} [trailingLine] Line number if looking for a trailing comment
     * @returns {string|null} Comment text
     * @inner
     */ function cmnt(trailingLine) {
        var ret = null;
        var comment;
        if (trailingLine === undefined) {
            comment = comments[line - 1];
            delete comments[line - 1];
            if (comment && (alternateCommentMode || comment.type === "*" || comment.lineEmpty)) {
                ret = comment.leading ? comment.text : null;
            }
        } else {
            /* istanbul ignore else */ if (lastCommentLine < trailingLine) {
                peek();
            }
            comment = comments[trailingLine];
            delete comments[trailingLine];
            if (comment && !comment.lineEmpty && (alternateCommentMode || comment.type === "/")) {
                ret = comment.leading ? null : comment.text;
            }
        }
        return ret;
    }
    return Object.defineProperty({
        next: next,
        peek: peek,
        push: push,
        skip: skip,
        cmnt: cmnt
    }, "line", {
        get: function() {
            return line;
        }
    });
/* eslint-enable callback-return */ }


/***/ }),

/***/ 86764:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = Type;
// extends Namespace
var Namespace = __webpack_require__(1804);
((Type.prototype = Object.create(Namespace.prototype)).constructor = Type).className = "Type";
var Enum = __webpack_require__(4328), OneOf = __webpack_require__(25250), Field = __webpack_require__(93777), MapField = __webpack_require__(54741), Service = __webpack_require__(66577), Message = __webpack_require__(12965), Reader = __webpack_require__(10964), Writer = __webpack_require__(41010), util = __webpack_require__(31502), encoder = __webpack_require__(49324), decoder = __webpack_require__(14935), verifier = __webpack_require__(56949), converter = __webpack_require__(80285), wrappers = __webpack_require__(32958);
/**
 * Constructs a new reflected message type instance.
 * @classdesc Reflected message type.
 * @extends NamespaceBase
 * @constructor
 * @param {string} name Message name
 * @param {Object.<string,*>} [options] Declared options
 */ function Type(name, options) {
    Namespace.call(this, name, options);
    /**
     * Message fields.
     * @type {Object.<string,Field>}
     */ this.fields = {}; // toJSON, marker
    /**
     * Oneofs declared within this namespace, if any.
     * @type {Object.<string,OneOf>}
     */ this.oneofs = undefined; // toJSON
    /**
     * Extension ranges, if any.
     * @type {number[][]}
     */ this.extensions = undefined; // toJSON
    /**
     * Reserved ranges, if any.
     * @type {Array.<number[]|string>}
     */ this.reserved = undefined; // toJSON
    /*?
     * Whether this type is a legacy group.
     * @type {boolean|undefined}
     */ this.group = undefined; // toJSON
    /**
     * Cached fields by id.
     * @type {Object.<number,Field>|null}
     * @private
     */ this._fieldsById = null;
    /**
     * Cached fields as an array.
     * @type {Field[]|null}
     * @private
     */ this._fieldsArray = null;
    /**
     * Cached oneofs as an array.
     * @type {OneOf[]|null}
     * @private
     */ this._oneofsArray = null;
    /**
     * Cached constructor.
     * @type {Constructor<{}>}
     * @private
     */ this._ctor = null;
}
Object.defineProperties(Type.prototype, {
    /**
     * Message fields by id.
     * @name Type#fieldsById
     * @type {Object.<number,Field>}
     * @readonly
     */ fieldsById: {
        get: function() {
            /* istanbul ignore if */ if (this._fieldsById) return this._fieldsById;
            this._fieldsById = {};
            for(var names = Object.keys(this.fields), i = 0; i < names.length; ++i){
                var field = this.fields[names[i]], id = field.id;
                /* istanbul ignore if */ if (this._fieldsById[id]) throw Error("duplicate id " + id + " in " + this);
                this._fieldsById[id] = field;
            }
            return this._fieldsById;
        }
    },
    /**
     * Fields of this message as an array for iteration.
     * @name Type#fieldsArray
     * @type {Field[]}
     * @readonly
     */ fieldsArray: {
        get: function() {
            return this._fieldsArray || (this._fieldsArray = util.toArray(this.fields));
        }
    },
    /**
     * Oneofs of this message as an array for iteration.
     * @name Type#oneofsArray
     * @type {OneOf[]}
     * @readonly
     */ oneofsArray: {
        get: function() {
            return this._oneofsArray || (this._oneofsArray = util.toArray(this.oneofs));
        }
    },
    /**
     * The registered constructor, if any registered, otherwise a generic constructor.
     * Assigning a function replaces the internal constructor. If the function does not extend {@link Message} yet, its prototype will be setup accordingly and static methods will be populated. If it already extends {@link Message}, it will just replace the internal constructor.
     * @name Type#ctor
     * @type {Constructor<{}>}
     */ ctor: {
        get: function() {
            return this._ctor || (this.ctor = Type.generateConstructor(this)());
        },
        set: function(ctor) {
            // Ensure proper prototype
            var prototype = ctor.prototype;
            if (!(prototype instanceof Message)) {
                (ctor.prototype = new Message()).constructor = ctor;
                util.merge(ctor.prototype, prototype);
            }
            // Classes and messages reference their reflected type
            ctor.$type = ctor.prototype.$type = this;
            // Mix in static methods
            util.merge(ctor, Message, true);
            this._ctor = ctor;
            // Messages have non-enumerable default values on their prototype
            var i = 0;
            for(; i < /* initializes */ this.fieldsArray.length; ++i)this._fieldsArray[i].resolve(); // ensures a proper value
            // Messages have non-enumerable getters and setters for each virtual oneof field
            var ctorProperties = {};
            for(i = 0; i < /* initializes */ this.oneofsArray.length; ++i)ctorProperties[this._oneofsArray[i].resolve().name] = {
                get: util.oneOfGetter(this._oneofsArray[i].oneof),
                set: util.oneOfSetter(this._oneofsArray[i].oneof)
            };
            if (i) Object.defineProperties(ctor.prototype, ctorProperties);
        }
    }
});
/**
 * Generates a constructor function for the specified type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */ Type.generateConstructor = function generateConstructor(mtype) {
    /* eslint-disable no-unexpected-multiline */ var gen = util.codegen([
        "p"
    ], mtype.name);
    // explicitly initialize mutable object/array fields so that these aren't just inherited from the prototype
    for(var i = 0, field; i < mtype.fieldsArray.length; ++i)if ((field = mtype._fieldsArray[i]).map) gen("this%s={}", util.safeProp(field.name));
    else if (field.repeated) gen("this%s=[]", util.safeProp(field.name));
    return gen("if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)") // omit undefined or null
    ("this[ks[i]]=p[ks[i]]");
/* eslint-enable no-unexpected-multiline */ };
function clearCache(type) {
    type._fieldsById = type._fieldsArray = type._oneofsArray = null;
    delete type.encode;
    delete type.decode;
    delete type.verify;
    return type;
}
/**
 * Message type descriptor.
 * @interface IType
 * @extends INamespace
 * @property {Object.<string,IOneOf>} [oneofs] Oneof descriptors
 * @property {Object.<string,IField>} fields Field descriptors
 * @property {number[][]} [extensions] Extension ranges
 * @property {number[][]} [reserved] Reserved ranges
 * @property {boolean} [group=false] Whether a legacy group or not
 */ /**
 * Creates a message type from a message type descriptor.
 * @param {string} name Message name
 * @param {IType} json Message type descriptor
 * @returns {Type} Created message type
 */ Type.fromJSON = function fromJSON(name, json) {
    var type = new Type(name, json.options);
    type.extensions = json.extensions;
    type.reserved = json.reserved;
    var names = Object.keys(json.fields), i = 0;
    for(; i < names.length; ++i)type.add((typeof json.fields[names[i]].keyType !== "undefined" ? MapField.fromJSON : Field.fromJSON)(names[i], json.fields[names[i]]));
    if (json.oneofs) for(names = Object.keys(json.oneofs), i = 0; i < names.length; ++i)type.add(OneOf.fromJSON(names[i], json.oneofs[names[i]]));
    if (json.nested) for(names = Object.keys(json.nested), i = 0; i < names.length; ++i){
        var nested = json.nested[names[i]];
        type.add((nested.id !== undefined ? Field.fromJSON : nested.fields !== undefined ? Type.fromJSON : nested.values !== undefined ? Enum.fromJSON : nested.methods !== undefined ? Service.fromJSON : Namespace.fromJSON)(names[i], nested));
    }
    if (json.extensions && json.extensions.length) type.extensions = json.extensions;
    if (json.reserved && json.reserved.length) type.reserved = json.reserved;
    if (json.group) type.group = true;
    if (json.comment) type.comment = json.comment;
    return type;
};
/**
 * Converts this message type to a message type descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IType} Message type descriptor
 */ Type.prototype.toJSON = function toJSON(toJSONOptions) {
    var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "options",
        inherited && inherited.options || undefined,
        "oneofs",
        Namespace.arrayToJSON(this.oneofsArray, toJSONOptions),
        "fields",
        Namespace.arrayToJSON(this.fieldsArray.filter(function(obj) {
            return !obj.declaringField;
        }), toJSONOptions) || {},
        "extensions",
        this.extensions && this.extensions.length ? this.extensions : undefined,
        "reserved",
        this.reserved && this.reserved.length ? this.reserved : undefined,
        "group",
        this.group || undefined,
        "nested",
        inherited && inherited.nested || undefined,
        "comment",
        keepComments ? this.comment : undefined
    ]);
};
/**
 * @override
 */ Type.prototype.resolveAll = function resolveAll() {
    var fields = this.fieldsArray, i = 0;
    while(i < fields.length)fields[i++].resolve();
    var oneofs = this.oneofsArray;
    i = 0;
    while(i < oneofs.length)oneofs[i++].resolve();
    return Namespace.prototype.resolveAll.call(this);
};
/**
 * @override
 */ Type.prototype.get = function get(name) {
    return this.fields[name] || this.oneofs && this.oneofs[name] || this.nested && this.nested[name] || null;
};
/**
 * Adds a nested object to this type.
 * @param {ReflectionObject} object Nested object to add
 * @returns {Type} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If there is already a nested object with this name or, if a field, when there is already a field with this id
 */ Type.prototype.add = function add(object) {
    if (this.get(object.name)) throw Error("duplicate name '" + object.name + "' in " + this);
    if (object instanceof Field && object.extend === undefined) {
        // NOTE: Extension fields aren't actual fields on the declaring type, but nested objects.
        // The root object takes care of adding distinct sister-fields to the respective extended
        // type instead.
        // avoids calling the getter if not absolutely necessary because it's called quite frequently
        if (this._fieldsById ? /* istanbul ignore next */ this._fieldsById[object.id] : this.fieldsById[object.id]) throw Error("duplicate id " + object.id + " in " + this);
        if (this.isReservedId(object.id)) throw Error("id " + object.id + " is reserved in " + this);
        if (this.isReservedName(object.name)) throw Error("name '" + object.name + "' is reserved in " + this);
        if (object.parent) object.parent.remove(object);
        this.fields[object.name] = object;
        object.message = this;
        object.onAdd(this);
        return clearCache(this);
    }
    if (object instanceof OneOf) {
        if (!this.oneofs) this.oneofs = {};
        this.oneofs[object.name] = object;
        object.onAdd(this);
        return clearCache(this);
    }
    return Namespace.prototype.add.call(this, object);
};
/**
 * Removes a nested object from this type.
 * @param {ReflectionObject} object Nested object to remove
 * @returns {Type} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If `object` is not a member of this type
 */ Type.prototype.remove = function remove(object) {
    if (object instanceof Field && object.extend === undefined) {
        // See Type#add for the reason why extension fields are excluded here.
        /* istanbul ignore if */ if (!this.fields || this.fields[object.name] !== object) throw Error(object + " is not a member of " + this);
        delete this.fields[object.name];
        object.parent = null;
        object.onRemove(this);
        return clearCache(this);
    }
    if (object instanceof OneOf) {
        /* istanbul ignore if */ if (!this.oneofs || this.oneofs[object.name] !== object) throw Error(object + " is not a member of " + this);
        delete this.oneofs[object.name];
        object.parent = null;
        object.onRemove(this);
        return clearCache(this);
    }
    return Namespace.prototype.remove.call(this, object);
};
/**
 * Tests if the specified id is reserved.
 * @param {number} id Id to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */ Type.prototype.isReservedId = function isReservedId(id) {
    return Namespace.isReservedId(this.reserved, id);
};
/**
 * Tests if the specified name is reserved.
 * @param {string} name Name to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */ Type.prototype.isReservedName = function isReservedName(name) {
    return Namespace.isReservedName(this.reserved, name);
};
/**
 * Creates a new message of this type using the specified properties.
 * @param {Object.<string,*>} [properties] Properties to set
 * @returns {Message<{}>} Message instance
 */ Type.prototype.create = function create(properties) {
    return new this.ctor(properties);
};
/**
 * Sets up {@link Type#encode|encode}, {@link Type#decode|decode} and {@link Type#verify|verify}.
 * @returns {Type} `this`
 */ Type.prototype.setup = function setup() {
    // Sets up everything at once so that the prototype chain does not have to be re-evaluated
    // multiple times (V8, soft-deopt prototype-check).
    var fullName = this.fullName, types = [];
    for(var i = 0; i < /* initializes */ this.fieldsArray.length; ++i)types.push(this._fieldsArray[i].resolve().resolvedType);
    // Replace setup methods with type-specific generated functions
    this.encode = encoder(this)({
        Writer: Writer,
        types: types,
        util: util
    });
    this.decode = decoder(this)({
        Reader: Reader,
        types: types,
        util: util
    });
    this.verify = verifier(this)({
        types: types,
        util: util
    });
    this.fromObject = converter.fromObject(this)({
        types: types,
        util: util
    });
    this.toObject = converter.toObject(this)({
        types: types,
        util: util
    });
    // Inject custom wrappers for common types
    var wrapper = wrappers[fullName];
    if (wrapper) {
        var originalThis = Object.create(this);
        // if (wrapper.fromObject) {
        originalThis.fromObject = this.fromObject;
        this.fromObject = wrapper.fromObject.bind(originalThis);
        // }
        // if (wrapper.toObject) {
        originalThis.toObject = this.toObject;
        this.toObject = wrapper.toObject.bind(originalThis);
    // }
    }
    return this;
};
/**
 * Encodes a message of this type. Does not implicitly {@link Type#verify|verify} messages.
 * @param {Message<{}>|Object.<string,*>} message Message instance or plain object
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 */ Type.prototype.encode = function encode_setup(message, writer) {
    return this.setup().encode(message, writer); // overrides this method
};
/**
 * Encodes a message of this type preceeded by its byte length as a varint. Does not implicitly {@link Type#verify|verify} messages.
 * @param {Message<{}>|Object.<string,*>} message Message instance or plain object
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 */ Type.prototype.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
};
/**
 * Decodes a message of this type.
 * @param {Reader|Uint8Array} reader Reader or buffer to decode from
 * @param {number} [length] Length of the message, if known beforehand
 * @returns {Message<{}>} Decoded message
 * @throws {Error} If the payload is not a reader or valid buffer
 * @throws {util.ProtocolError<{}>} If required fields are missing
 */ Type.prototype.decode = function decode_setup(reader, length) {
    return this.setup().decode(reader, length); // overrides this method
};
/**
 * Decodes a message of this type preceeded by its byte length as a varint.
 * @param {Reader|Uint8Array} reader Reader or buffer to decode from
 * @returns {Message<{}>} Decoded message
 * @throws {Error} If the payload is not a reader or valid buffer
 * @throws {util.ProtocolError} If required fields are missing
 */ Type.prototype.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof Reader)) reader = Reader.create(reader);
    return this.decode(reader, reader.uint32());
};
/**
 * Verifies that field values are valid and that required fields are present.
 * @param {Object.<string,*>} message Plain object to verify
 * @returns {null|string} `null` if valid, otherwise the reason why it is not
 */ Type.prototype.verify = function verify_setup(message) {
    return this.setup().verify(message); // overrides this method
};
/**
 * Creates a new message of this type from a plain object. Also converts values to their respective internal types.
 * @param {Object.<string,*>} object Plain object to convert
 * @returns {Message<{}>} Message instance
 */ Type.prototype.fromObject = function fromObject(object) {
    return this.setup().fromObject(object);
};
/**
 * Conversion options as used by {@link Type#toObject} and {@link Message.toObject}.
 * @interface IConversionOptions
 * @property {Function} [longs] Long conversion type.
 * Valid values are `String` and `Number` (the global types).
 * Defaults to copy the present value, which is a possibly unsafe number without and a {@link Long} with a long library.
 * @property {Function} [enums] Enum value conversion type.
 * Only valid value is `String` (the global type).
 * Defaults to copy the present value, which is the numeric id.
 * @property {Function} [bytes] Bytes value conversion type.
 * Valid values are `Array` and (a base64 encoded) `String` (the global types).
 * Defaults to copy the present value, which usually is a Buffer under node and an Uint8Array in the browser.
 * @property {boolean} [defaults=false] Also sets default values on the resulting object
 * @property {boolean} [arrays=false] Sets empty arrays for missing repeated fields even if `defaults=false`
 * @property {boolean} [objects=false] Sets empty objects for missing map fields even if `defaults=false`
 * @property {boolean} [oneofs=false] Includes virtual oneof properties set to the present field's name, if any
 * @property {boolean} [json=false] Performs additional JSON compatibility conversions, i.e. NaN and Infinity to strings
 */ /**
 * Creates a plain object from a message of this type. Also converts values to other types if specified.
 * @param {Message<{}>} message Message instance
 * @param {IConversionOptions} [options] Conversion options
 * @returns {Object.<string,*>} Plain object
 */ Type.prototype.toObject = function toObject(message, options) {
    return this.setup().toObject(message, options);
};
/**
 * Decorator function as returned by {@link Type.d} (TypeScript).
 * @typedef TypeDecorator
 * @type {function}
 * @param {Constructor<T>} target Target constructor
 * @returns {undefined}
 * @template T extends Message<T>
 */ /**
 * Type decorator (TypeScript).
 * @param {string} [typeName] Type name, defaults to the constructor's name
 * @returns {TypeDecorator<T>} Decorator function
 * @template T extends Message<T>
 */ Type.d = function decorateType(typeName) {
    return function typeDecorator(target) {
        util.decorateType(target, typeName);
    };
};


/***/ }),

/***/ 84438:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * Common type constants.
 * @namespace
 */ var types = exports;
var util = __webpack_require__(31502);
var s = [
    "double",
    "float",
    "int32",
    "uint32",
    "sint32",
    "fixed32",
    "sfixed32",
    "int64",
    "uint64",
    "sint64",
    "fixed64",
    "sfixed64",
    "bool",
    "string",
    "bytes" // 14
];
function bake(values, offset) {
    var i = 0, o = {};
    offset |= 0;
    while(i < values.length)o[s[i + offset]] = values[i++];
    return o;
}
/**
 * Basic type wire types.
 * @type {Object.<string,number>}
 * @const
 * @property {number} double=1 Fixed64 wire type
 * @property {number} float=5 Fixed32 wire type
 * @property {number} int32=0 Varint wire type
 * @property {number} uint32=0 Varint wire type
 * @property {number} sint32=0 Varint wire type
 * @property {number} fixed32=5 Fixed32 wire type
 * @property {number} sfixed32=5 Fixed32 wire type
 * @property {number} int64=0 Varint wire type
 * @property {number} uint64=0 Varint wire type
 * @property {number} sint64=0 Varint wire type
 * @property {number} fixed64=1 Fixed64 wire type
 * @property {number} sfixed64=1 Fixed64 wire type
 * @property {number} bool=0 Varint wire type
 * @property {number} string=2 Ldelim wire type
 * @property {number} bytes=2 Ldelim wire type
 */ types.basic = bake([
    /* double   */ 1,
    /* float    */ 5,
    /* int32    */ 0,
    /* uint32   */ 0,
    /* sint32   */ 0,
    /* fixed32  */ 5,
    /* sfixed32 */ 5,
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 1,
    /* sfixed64 */ 1,
    /* bool     */ 0,
    /* string   */ 2,
    /* bytes    */ 2
]);
/**
 * Basic type defaults.
 * @type {Object.<string,*>}
 * @const
 * @property {number} double=0 Double default
 * @property {number} float=0 Float default
 * @property {number} int32=0 Int32 default
 * @property {number} uint32=0 Uint32 default
 * @property {number} sint32=0 Sint32 default
 * @property {number} fixed32=0 Fixed32 default
 * @property {number} sfixed32=0 Sfixed32 default
 * @property {number} int64=0 Int64 default
 * @property {number} uint64=0 Uint64 default
 * @property {number} sint64=0 Sint32 default
 * @property {number} fixed64=0 Fixed64 default
 * @property {number} sfixed64=0 Sfixed64 default
 * @property {boolean} bool=false Bool default
 * @property {string} string="" String default
 * @property {Array.<number>} bytes=Array(0) Bytes default
 * @property {null} message=null Message default
 */ types.defaults = bake([
    /* double   */ 0,
    /* float    */ 0,
    /* int32    */ 0,
    /* uint32   */ 0,
    /* sint32   */ 0,
    /* fixed32  */ 0,
    /* sfixed32 */ 0,
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 0,
    /* sfixed64 */ 0,
    /* bool     */ false,
    /* string   */ "",
    /* bytes    */ util.emptyArray,
    /* message  */ null
]);
/**
 * Basic long type wire types.
 * @type {Object.<string,number>}
 * @const
 * @property {number} int64=0 Varint wire type
 * @property {number} uint64=0 Varint wire type
 * @property {number} sint64=0 Varint wire type
 * @property {number} fixed64=1 Fixed64 wire type
 * @property {number} sfixed64=1 Fixed64 wire type
 */ types.long = bake([
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 1,
    /* sfixed64 */ 1
], 7);
/**
 * Allowed types for map keys with their associated wire type.
 * @type {Object.<string,number>}
 * @const
 * @property {number} int32=0 Varint wire type
 * @property {number} uint32=0 Varint wire type
 * @property {number} sint32=0 Varint wire type
 * @property {number} fixed32=5 Fixed32 wire type
 * @property {number} sfixed32=5 Fixed32 wire type
 * @property {number} int64=0 Varint wire type
 * @property {number} uint64=0 Varint wire type
 * @property {number} sint64=0 Varint wire type
 * @property {number} fixed64=1 Fixed64 wire type
 * @property {number} sfixed64=1 Fixed64 wire type
 * @property {number} bool=0 Varint wire type
 * @property {number} string=2 Ldelim wire type
 */ types.mapKey = bake([
    /* int32    */ 0,
    /* uint32   */ 0,
    /* sint32   */ 0,
    /* fixed32  */ 5,
    /* sfixed32 */ 5,
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 1,
    /* sfixed64 */ 1,
    /* bool     */ 0,
    /* string   */ 2
], 2);
/**
 * Allowed types for packed repeated fields with their associated wire type.
 * @type {Object.<string,number>}
 * @const
 * @property {number} double=1 Fixed64 wire type
 * @property {number} float=5 Fixed32 wire type
 * @property {number} int32=0 Varint wire type
 * @property {number} uint32=0 Varint wire type
 * @property {number} sint32=0 Varint wire type
 * @property {number} fixed32=5 Fixed32 wire type
 * @property {number} sfixed32=5 Fixed32 wire type
 * @property {number} int64=0 Varint wire type
 * @property {number} uint64=0 Varint wire type
 * @property {number} sint64=0 Varint wire type
 * @property {number} fixed64=1 Fixed64 wire type
 * @property {number} sfixed64=1 Fixed64 wire type
 * @property {number} bool=0 Varint wire type
 */ types.packed = bake([
    /* double   */ 1,
    /* float    */ 5,
    /* int32    */ 0,
    /* uint32   */ 0,
    /* sint32   */ 0,
    /* fixed32  */ 5,
    /* sfixed32 */ 5,
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 1,
    /* sfixed64 */ 1,
    /* bool     */ 0
]);


/***/ }),

/***/ 31502:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * Various utility functions.
 * @namespace
 */ var util = module.exports = __webpack_require__(27188);
var roots = __webpack_require__(50715);
var Type, Enum;
util.codegen = __webpack_require__(88591);
util.fetch = __webpack_require__(59654);
util.path = __webpack_require__(4743);
/**
 * Node's fs module if available.
 * @type {Object.<string,*>}
 */ util.fs = util.inquire("fs");
/**
 * Converts an object's values to an array.
 * @param {Object.<string,*>} object Object to convert
 * @returns {Array.<*>} Converted array
 */ util.toArray = function toArray(object) {
    if (object) {
        var keys = Object.keys(object), array = new Array(keys.length), index = 0;
        while(index < keys.length)array[index] = object[keys[index++]];
        return array;
    }
    return [];
};
/**
 * Converts an array of keys immediately followed by their respective value to an object, omitting undefined values.
 * @param {Array.<*>} array Array to convert
 * @returns {Object.<string,*>} Converted object
 */ util.toObject = function toObject(array) {
    var object = {}, index = 0;
    while(index < array.length){
        var key = array[index++], val = array[index++];
        if (val !== undefined) object[key] = val;
    }
    return object;
};
var safePropBackslashRe = /\\/g, safePropQuoteRe = /"/g;
/**
 * Tests whether the specified name is a reserved word in JS.
 * @param {string} name Name to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */ util.isReserved = function isReserved(name) {
    return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(name);
};
/**
 * Returns a safe property accessor for the specified property name.
 * @param {string} prop Property name
 * @returns {string} Safe accessor
 */ util.safeProp = function safeProp(prop) {
    if (!/^[$\w_]+$/.test(prop) || util.isReserved(prop)) return '["' + prop.replace(safePropBackslashRe, "\\\\").replace(safePropQuoteRe, '\\"') + '"]';
    return "." + prop;
};
/**
 * Converts the first character of a string to upper case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */ util.ucFirst = function ucFirst(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
};
var camelCaseRe = /_([a-z])/g;
/**
 * Converts a string to camel case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */ util.camelCase = function camelCase(str) {
    return str.substring(0, 1) + str.substring(1).replace(camelCaseRe, function($0, $1) {
        return $1.toUpperCase();
    });
};
/**
 * Compares reflected fields by id.
 * @param {Field} a First field
 * @param {Field} b Second field
 * @returns {number} Comparison value
 */ util.compareFieldsById = function compareFieldsById(a, b) {
    return a.id - b.id;
};
/**
 * Decorator helper for types (TypeScript).
 * @param {Constructor<T>} ctor Constructor function
 * @param {string} [typeName] Type name, defaults to the constructor's name
 * @returns {Type} Reflected type
 * @template T extends Message<T>
 * @property {Root} root Decorators root
 */ util.decorateType = function decorateType(ctor, typeName) {
    /* istanbul ignore if */ if (ctor.$type) {
        if (typeName && ctor.$type.name !== typeName) {
            util.decorateRoot.remove(ctor.$type);
            ctor.$type.name = typeName;
            util.decorateRoot.add(ctor.$type);
        }
        return ctor.$type;
    }
    /* istanbul ignore next */ if (!Type) Type = __webpack_require__(86764);
    var type = new Type(typeName || ctor.name);
    util.decorateRoot.add(type);
    type.ctor = ctor; // sets up .encode, .decode etc.
    Object.defineProperty(ctor, "$type", {
        value: type,
        enumerable: false
    });
    Object.defineProperty(ctor.prototype, "$type", {
        value: type,
        enumerable: false
    });
    return type;
};
var decorateEnumIndex = 0;
/**
 * Decorator helper for enums (TypeScript).
 * @param {Object} object Enum object
 * @returns {Enum} Reflected enum
 */ util.decorateEnum = function decorateEnum(object) {
    /* istanbul ignore if */ if (object.$type) return object.$type;
    /* istanbul ignore next */ if (!Enum) Enum = __webpack_require__(4328);
    var enm = new Enum("Enum" + decorateEnumIndex++, object);
    util.decorateRoot.add(enm);
    Object.defineProperty(object, "$type", {
        value: enm,
        enumerable: false
    });
    return enm;
};
/**
 * Sets the value of a property by property path. If a value already exists, it is turned to an array
 * @param {Object.<string,*>} dst Destination object
 * @param {string} path dot '.' delimited path of the property to set
 * @param {Object} value the value to set
 * @returns {Object.<string,*>} Destination object
 */ util.setProperty = function setProperty(dst, path, value) {
    function setProp(dst, path, value) {
        var part = path.shift();
        if (part === "__proto__") {
            return dst;
        }
        if (path.length > 0) {
            dst[part] = setProp(dst[part] || {}, path, value);
        } else {
            var prevValue = dst[part];
            if (prevValue) value = [].concat(prevValue).concat(value);
            dst[part] = value;
        }
        return dst;
    }
    if (typeof dst !== "object") throw TypeError("dst must be an object");
    if (!path) throw TypeError("path must be specified");
    path = path.split(".");
    return setProp(dst, path, value);
};
/**
 * Decorator root (TypeScript).
 * @name util.decorateRoot
 * @type {Root}
 * @readonly
 */ Object.defineProperty(util, "decorateRoot", {
    get: function() {
        return roots["decorated"] || (roots["decorated"] = new (__webpack_require__(48880))());
    }
});


/***/ }),

/***/ 82162:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = LongBits;
var util = __webpack_require__(27188);
/**
 * Constructs new long bits.
 * @classdesc Helper class for working with the low and high bits of a 64 bit value.
 * @memberof util
 * @constructor
 * @param {number} lo Low 32 bits, unsigned
 * @param {number} hi High 32 bits, unsigned
 */ function LongBits(lo, hi) {
    // note that the casts below are theoretically unnecessary as of today, but older statically
    // generated converter code might still call the ctor with signed 32bits. kept for compat.
    /**
     * Low bits.
     * @type {number}
     */ this.lo = lo >>> 0;
    /**
     * High bits.
     * @type {number}
     */ this.hi = hi >>> 0;
}
/**
 * Zero bits.
 * @memberof util.LongBits
 * @type {util.LongBits}
 */ var zero = LongBits.zero = new LongBits(0, 0);
zero.toNumber = function() {
    return 0;
};
zero.zzEncode = zero.zzDecode = function() {
    return this;
};
zero.length = function() {
    return 1;
};
/**
 * Zero hash.
 * @memberof util.LongBits
 * @type {string}
 */ var zeroHash = LongBits.zeroHash = "\x00\x00\x00\x00\x00\x00\x00\x00";
/**
 * Constructs new long bits from the specified number.
 * @param {number} value Value
 * @returns {util.LongBits} Instance
 */ LongBits.fromNumber = function fromNumber(value) {
    if (value === 0) return zero;
    var sign = value < 0;
    if (sign) value = -value;
    var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
    if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295) hi = 0;
        }
    }
    return new LongBits(lo, hi);
};
/**
 * Constructs new long bits from a number, long or string.
 * @param {Long|number|string} value Value
 * @returns {util.LongBits} Instance
 */ LongBits.from = function from(value) {
    if (typeof value === "number") return LongBits.fromNumber(value);
    if (util.isString(value)) {
        /* istanbul ignore else */ if (util.Long) value = util.Long.fromString(value);
        else return LongBits.fromNumber(parseInt(value, 10));
    }
    return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
};
/**
 * Converts this long bits to a possibly unsafe JavaScript number.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {number} Possibly unsafe number
 */ LongBits.prototype.toNumber = function toNumber(unsigned) {
    if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
        if (!lo) hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
};
/**
 * Converts this long bits to a long.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long} Long
 */ LongBits.prototype.toLong = function toLong(unsigned) {
    return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : {
        low: this.lo | 0,
        high: this.hi | 0,
        unsigned: Boolean(unsigned)
    };
};
var charCodeAt = String.prototype.charCodeAt;
/**
 * Constructs new long bits from the specified 8 characters long hash.
 * @param {string} hash Hash
 * @returns {util.LongBits} Bits
 */ LongBits.fromHash = function fromHash(hash) {
    if (hash === zeroHash) return zero;
    return new LongBits((charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0, (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0);
};
/**
 * Converts this long bits to a 8 characters long hash.
 * @returns {string} Hash
 */ LongBits.prototype.toHash = function toHash() {
    return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
};
/**
 * Zig-zag encodes this long bits.
 * @returns {util.LongBits} `this`
 */ LongBits.prototype.zzEncode = function zzEncode() {
    var mask = this.hi >> 31;
    this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo = (this.lo << 1 ^ mask) >>> 0;
    return this;
};
/**
 * Zig-zag decodes this long bits.
 * @returns {util.LongBits} `this`
 */ LongBits.prototype.zzDecode = function zzDecode() {
    var mask = -(this.lo & 1);
    this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi = (this.hi >>> 1 ^ mask) >>> 0;
    return this;
};
/**
 * Calculates the length of this longbits when encoded as a varint.
 * @returns {number} Length
 */ LongBits.prototype.length = function length() {
    var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
    return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
};


/***/ }),

/***/ 27188:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var util = exports;
// used to return a Promise where callback is omitted
util.asPromise = __webpack_require__(59094);
// converts to / from base64 encoded strings
util.base64 = __webpack_require__(29934);
// base class of rpc.Service
util.EventEmitter = __webpack_require__(19714);
// float handling accross browsers
util.float = __webpack_require__(43498);
// requires modules optionally and hides the call from bundlers
util.inquire = __webpack_require__(16649);
// converts to / from utf8 encoded strings
util.utf8 = __webpack_require__(98884);
// provides a node-like buffer pool in the browser
util.pool = __webpack_require__(65502);
// utility to work with the low and high bits of a 64 bit value
util.LongBits = __webpack_require__(82162);
/**
 * Whether running within node or not.
 * @memberof util
 * @type {boolean}
 */ util.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
/**
 * Global object reference.
 * @memberof util
 * @type {Object}
 */ util.global = util.isNode && global ||  false && 0 || typeof self !== "undefined" && self || this; // eslint-disable-line no-invalid-this
/**
 * An immuable empty array.
 * @memberof util
 * @type {Array.<*>}
 * @const
 */ util.emptyArray = Object.freeze ? Object.freeze([]) : /* istanbul ignore next */ []; // used on prototypes
/**
 * An immutable empty object.
 * @type {Object}
 * @const
 */ util.emptyObject = Object.freeze ? Object.freeze({}) : /* istanbul ignore next */ {}; // used on prototypes
/**
 * Tests if the specified value is an integer.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an integer
 */ util.isInteger = Number.isInteger || /* istanbul ignore next */ function isInteger(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};
/**
 * Tests if the specified value is a string.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a string
 */ util.isString = function isString(value) {
    return typeof value === "string" || value instanceof String;
};
/**
 * Tests if the specified value is a non-null object.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a non-null object
 */ util.isObject = function isObject(value) {
    return value && typeof value === "object";
};
/**
 * Checks if a property on a message is considered to be present.
 * This is an alias of {@link util.isSet}.
 * @function
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */ util.isset = /**
 * Checks if a property on a message is considered to be present.
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */ util.isSet = function isSet(obj, prop) {
    var value = obj[prop];
    if (value != null && obj.hasOwnProperty(prop)) return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
    return false;
};
/**
 * Any compatible Buffer instance.
 * This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
 * @interface Buffer
 * @extends Uint8Array
 */ /**
 * Node's Buffer class if available.
 * @type {Constructor<Buffer>}
 */ util.Buffer = function() {
    try {
        var Buffer = util.inquire("buffer").Buffer;
        // refuse to use non-node buffers if not explicitly assigned (perf reasons):
        return Buffer.prototype.utf8Write ? Buffer : /* istanbul ignore next */ null;
    } catch (e) {
        /* istanbul ignore next */ return null;
    }
}();
// Internal alias of or polyfull for Buffer.from.
util._Buffer_from = null;
// Internal alias of or polyfill for Buffer.allocUnsafe.
util._Buffer_allocUnsafe = null;
/**
 * Creates a new buffer of whatever type supported by the environment.
 * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
 * @returns {Uint8Array|Buffer} Buffer
 */ util.newBuffer = function newBuffer(sizeOrArray) {
    /* istanbul ignore next */ return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
};
/**
 * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
 * @type {Constructor<Uint8Array>}
 */ util.Array = typeof Uint8Array !== "undefined" ? Uint8Array /* istanbul ignore next */  : Array;
/**
 * Any compatible Long instance.
 * This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
 * @interface Long
 * @property {number} low Low bits
 * @property {number} high High bits
 * @property {boolean} unsigned Whether unsigned or not
 */ /**
 * Long.js's Long class if available.
 * @type {Constructor<Long>}
 */ util.Long = /* istanbul ignore next */ util.global.dcodeIO && /* istanbul ignore next */ util.global.dcodeIO.Long || /* istanbul ignore next */ util.global.Long || util.inquire("long");
/**
 * Regular expression used to verify 2 bit (`bool`) map keys.
 * @type {RegExp}
 * @const
 */ util.key2Re = /^true|false|0|1$/;
/**
 * Regular expression used to verify 32 bit (`int32` etc.) map keys.
 * @type {RegExp}
 * @const
 */ util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
/**
 * Regular expression used to verify 64 bit (`int64` etc.) map keys.
 * @type {RegExp}
 * @const
 */ util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
/**
 * Converts a number or long to an 8 characters long hash string.
 * @param {Long|number} value Value to convert
 * @returns {string} Hash
 */ util.longToHash = function longToHash(value) {
    return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
};
/**
 * Converts an 8 characters long hash string to a long or number.
 * @param {string} hash Hash
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long|number} Original value
 */ util.longFromHash = function longFromHash(hash, unsigned) {
    var bits = util.LongBits.fromHash(hash);
    if (util.Long) return util.Long.fromBits(bits.lo, bits.hi, unsigned);
    return bits.toNumber(Boolean(unsigned));
};
/**
 * Merges the properties of the source object into the destination object.
 * @memberof util
 * @param {Object.<string,*>} dst Destination object
 * @param {Object.<string,*>} src Source object
 * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
 * @returns {Object.<string,*>} Destination object
 */ function merge(dst, src, ifNotSet) {
    for(var keys = Object.keys(src), i = 0; i < keys.length; ++i)if (dst[keys[i]] === undefined || !ifNotSet) dst[keys[i]] = src[keys[i]];
    return dst;
}
util.merge = merge;
/**
 * Converts the first character of a string to lower case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */ util.lcFirst = function lcFirst(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
};
/**
 * Creates a custom error constructor.
 * @memberof util
 * @param {string} name Error name
 * @returns {Constructor<Error>} Custom error constructor
 */ function newError(name) {
    function CustomError(message, properties) {
        if (!(this instanceof CustomError)) return new CustomError(message, properties);
        // Error.call(this, message);
        // ^ just returns a new error instance because the ctor can be called as a function
        Object.defineProperty(this, "message", {
            get: function() {
                return message;
            }
        });
        /* istanbul ignore next */ if (Error.captureStackTrace) Error.captureStackTrace(this, CustomError);
        else Object.defineProperty(this, "stack", {
            value: new Error().stack || ""
        });
        if (properties) merge(this, properties);
    }
    CustomError.prototype = Object.create(Error.prototype, {
        constructor: {
            value: CustomError,
            writable: true,
            enumerable: false,
            configurable: true
        },
        name: {
            get: function get() {
                return name;
            },
            set: undefined,
            enumerable: false,
            // configurable: false would accurately preserve the behavior of
            // the original, but I'm guessing that was not intentional.
            // For an actual error subclass, this property would
            // be configurable.
            configurable: true
        },
        toString: {
            value: function value() {
                return this.name + ": " + this.message;
            },
            writable: true,
            enumerable: false,
            configurable: true
        }
    });
    return CustomError;
}
util.newError = newError;
/**
 * Constructs a new protocol error.
 * @classdesc Error subclass indicating a protocol specifc error.
 * @memberof util
 * @extends Error
 * @template T extends Message<T>
 * @constructor
 * @param {string} message Error message
 * @param {Object.<string,*>} [properties] Additional properties
 * @example
 * try {
 *     MyMessage.decode(someBuffer); // throws if required fields are missing
 * } catch (e) {
 *     if (e instanceof ProtocolError && e.instance)
 *         console.log("decoded so far: " + JSON.stringify(e.instance));
 * }
 */ util.ProtocolError = newError("ProtocolError");
/**
 * So far decoded message instance.
 * @name util.ProtocolError#instance
 * @type {Message<T>}
 */ /**
 * A OneOf getter as returned by {@link util.oneOfGetter}.
 * @typedef OneOfGetter
 * @type {function}
 * @returns {string|undefined} Set field name, if any
 */ /**
 * Builds a getter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfGetter} Unbound getter
 */ util.oneOfGetter = function getOneOf(fieldNames) {
    var fieldMap = {};
    for(var i = 0; i < fieldNames.length; ++i)fieldMap[fieldNames[i]] = 1;
    /**
     * @returns {string|undefined} Set field name, if any
     * @this Object
     * @ignore
     */ return function() {
        for(var keys = Object.keys(this), i = keys.length - 1; i > -1; --i)if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null) return keys[i];
    };
};
/**
 * A OneOf setter as returned by {@link util.oneOfSetter}.
 * @typedef OneOfSetter
 * @type {function}
 * @param {string|undefined} value Field name
 * @returns {undefined}
 */ /**
 * Builds a setter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfSetter} Unbound setter
 */ util.oneOfSetter = function setOneOf(fieldNames) {
    /**
     * @param {string} name Field name
     * @returns {undefined}
     * @this Object
     * @ignore
     */ return function(name) {
        for(var i = 0; i < fieldNames.length; ++i)if (fieldNames[i] !== name) delete this[fieldNames[i]];
    };
};
/**
 * Default conversion options used for {@link Message#toJSON} implementations.
 *
 * These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
 *
 * - Longs become strings
 * - Enums become string keys
 * - Bytes become base64 encoded strings
 * - (Sub-)Messages become plain objects
 * - Maps become plain objects with all string keys
 * - Repeated fields become arrays
 * - NaN and Infinity for float and double fields become strings
 *
 * @type {IConversionOptions}
 * @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
 */ util.toJSONOptions = {
    longs: String,
    enums: String,
    bytes: String,
    json: true
};
// Sets up buffer utility according to the environment (called in index-minimal)
util._configure = function() {
    var Buffer = util.Buffer;
    /* istanbul ignore if */ if (!Buffer) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
    }
    // because node 4.x buffers are incompatible & immutable
    // see: https://github.com/dcodeIO/protobuf.js/pull/665
    util._Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from || /* istanbul ignore next */ function Buffer_from(value, encoding) {
        return new Buffer(value, encoding);
    };
    util._Buffer_allocUnsafe = Buffer.allocUnsafe || /* istanbul ignore next */ function Buffer_allocUnsafe(size) {
        return new Buffer(size);
    };
};


/***/ }),

/***/ 56949:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = verifier;
var Enum = __webpack_require__(4328), util = __webpack_require__(31502);
function invalid(field, expected) {
    return field.name + ": " + expected + (field.repeated && expected !== "array" ? "[]" : field.map && expected !== "object" ? "{k:" + field.keyType + "}" : "") + " expected";
}
/**
 * Generates a partial value verifier.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} ref Variable reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */ function genVerifyValue(gen, field, fieldIndex, ref) {
    /* eslint-disable no-unexpected-multiline */ if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) {
            gen("switch(%s){", ref)("default:")("return%j", invalid(field, "enum value"));
            for(var keys = Object.keys(field.resolvedType.values), j = 0; j < keys.length; ++j)gen("case %i:", field.resolvedType.values[keys[j]]);
            gen("break")("}");
        } else {
            gen("{")("var e=types[%i].verify(%s);", fieldIndex, ref)("if(e)")("return%j+e", field.name + ".")("}");
        }
    } else {
        switch(field.type){
            case "int32":
            case "uint32":
            case "sint32":
            case "fixed32":
            case "sfixed32":
                gen("if(!util.isInteger(%s))", ref)("return%j", invalid(field, "integer"));
                break;
            case "int64":
            case "uint64":
            case "sint64":
            case "fixed64":
            case "sfixed64":
                gen("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", ref, ref, ref, ref)("return%j", invalid(field, "integer|Long"));
                break;
            case "float":
            case "double":
                gen('if(typeof %s!=="number")', ref)("return%j", invalid(field, "number"));
                break;
            case "bool":
                gen('if(typeof %s!=="boolean")', ref)("return%j", invalid(field, "boolean"));
                break;
            case "string":
                gen("if(!util.isString(%s))", ref)("return%j", invalid(field, "string"));
                break;
            case "bytes":
                gen('if(!(%s&&typeof %s.length==="number"||util.isString(%s)))', ref, ref, ref)("return%j", invalid(field, "buffer"));
                break;
        }
    }
    return gen;
/* eslint-enable no-unexpected-multiline */ }
/**
 * Generates a partial key verifier.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {string} ref Variable reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */ function genVerifyKey(gen, field, ref) {
    /* eslint-disable no-unexpected-multiline */ switch(field.keyType){
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32":
            gen("if(!util.key32Re.test(%s))", ref)("return%j", invalid(field, "integer key"));
            break;
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64":
            gen("if(!util.key64Re.test(%s))", ref) // see comment above: x is ok, d is not
            ("return%j", invalid(field, "integer|Long key"));
            break;
        case "bool":
            gen("if(!util.key2Re.test(%s))", ref)("return%j", invalid(field, "boolean key"));
            break;
    }
    return gen;
/* eslint-enable no-unexpected-multiline */ }
/**
 * Generates a verifier specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */ function verifier(mtype) {
    /* eslint-disable no-unexpected-multiline */ var gen = util.codegen([
        "m"
    ], mtype.name + "$verify")('if(typeof m!=="object"||m===null)')("return%j", "object expected");
    var oneofs = mtype.oneofsArray, seenFirstField = {};
    if (oneofs.length) gen("var p={}");
    for(var i = 0; i < /* initializes */ mtype.fieldsArray.length; ++i){
        var field = mtype._fieldsArray[i].resolve(), ref = "m" + util.safeProp(field.name);
        if (field.optional) gen("if(%s!=null&&m.hasOwnProperty(%j)){", ref, field.name); // !== undefined && !== null
        // map fields
        if (field.map) {
            gen("if(!util.isObject(%s))", ref)("return%j", invalid(field, "object"))("var k=Object.keys(%s)", ref)("for(var i=0;i<k.length;++i){");
            genVerifyKey(gen, field, "k[i]");
            genVerifyValue(gen, field, i, ref + "[k[i]]")("}");
        // repeated fields
        } else if (field.repeated) {
            gen("if(!Array.isArray(%s))", ref)("return%j", invalid(field, "array"))("for(var i=0;i<%s.length;++i){", ref);
            genVerifyValue(gen, field, i, ref + "[i]")("}");
        // required or present fields
        } else {
            if (field.partOf) {
                var oneofProp = util.safeProp(field.partOf.name);
                if (seenFirstField[field.partOf.name] === 1) gen("if(p%s===1)", oneofProp)("return%j", field.partOf.name + ": multiple values");
                seenFirstField[field.partOf.name] = 1;
                gen("p%s=1", oneofProp);
            }
            genVerifyValue(gen, field, i, ref);
        }
        if (field.optional) gen("}");
    }
    return gen("return null");
/* eslint-enable no-unexpected-multiline */ }


/***/ }),

/***/ 32958:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * Wrappers for common types.
 * @type {Object.<string,IWrapper>}
 * @const
 */ var wrappers = exports;
var Message = __webpack_require__(12965);
/**
 * From object converter part of an {@link IWrapper}.
 * @typedef WrapperFromObjectConverter
 * @type {function}
 * @param {Object.<string,*>} object Plain object
 * @returns {Message<{}>} Message instance
 * @this Type
 */ /**
 * To object converter part of an {@link IWrapper}.
 * @typedef WrapperToObjectConverter
 * @type {function}
 * @param {Message<{}>} message Message instance
 * @param {IConversionOptions} [options] Conversion options
 * @returns {Object.<string,*>} Plain object
 * @this Type
 */ /**
 * Common type wrapper part of {@link wrappers}.
 * @interface IWrapper
 * @property {WrapperFromObjectConverter} [fromObject] From object converter
 * @property {WrapperToObjectConverter} [toObject] To object converter
 */ // Custom wrapper for Any
wrappers[".google.protobuf.Any"] = {
    fromObject: function(object) {
        // unwrap value type if mapped
        if (object && object["@type"]) {
            // Only use fully qualified type name after the last '/'
            var name = object["@type"].substring(object["@type"].lastIndexOf("/") + 1);
            var type = this.lookup(name);
            /* istanbul ignore else */ if (type) {
                // type_url does not accept leading "."
                var type_url = object["@type"].charAt(0) === "." ? object["@type"].slice(1) : object["@type"];
                // type_url prefix is optional, but path seperator is required
                if (type_url.indexOf("/") === -1) {
                    type_url = "/" + type_url;
                }
                return this.create({
                    type_url: type_url,
                    value: type.encode(type.fromObject(object)).finish()
                });
            }
        }
        return this.fromObject(object);
    },
    toObject: function(message, options) {
        // Default prefix
        var googleApi = "type.googleapis.com/";
        var prefix = "";
        var name = "";
        // decode value if requested and unmapped
        if (options && options.json && message.type_url && message.value) {
            // Only use fully qualified type name after the last '/'
            name = message.type_url.substring(message.type_url.lastIndexOf("/") + 1);
            // Separate the prefix used
            prefix = message.type_url.substring(0, message.type_url.lastIndexOf("/") + 1);
            var type = this.lookup(name);
            /* istanbul ignore else */ if (type) message = type.decode(message.value);
        }
        // wrap value if unmapped
        if (!(message instanceof this.ctor) && message instanceof Message) {
            var object = message.$type.toObject(message, options);
            var messageName = message.$type.fullName[0] === "." ? message.$type.fullName.slice(1) : message.$type.fullName;
            // Default to type.googleapis.com prefix if no prefix is used
            if (prefix === "") {
                prefix = googleApi;
            }
            name = prefix + messageName;
            object["@type"] = name;
            return object;
        }
        return this.toObject(message, options);
    }
};


/***/ }),

/***/ 41010:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = Writer;
var util = __webpack_require__(27188);
var BufferWriter; // cyclic
var LongBits = util.LongBits, base64 = util.base64, utf8 = util.utf8;
/**
 * Constructs a new writer operation instance.
 * @classdesc Scheduled writer operation.
 * @constructor
 * @param {function(*, Uint8Array, number)} fn Function to call
 * @param {number} len Value byte length
 * @param {*} val Value to write
 * @ignore
 */ function Op(fn, len, val) {
    /**
     * Function to call.
     * @type {function(Uint8Array, number, *)}
     */ this.fn = fn;
    /**
     * Value byte length.
     * @type {number}
     */ this.len = len;
    /**
     * Next operation.
     * @type {Writer.Op|undefined}
     */ this.next = undefined;
    /**
     * Value to write.
     * @type {*}
     */ this.val = val; // type varies
}
/* istanbul ignore next */ function noop() {} // eslint-disable-line no-empty-function
/**
 * Constructs a new writer state instance.
 * @classdesc Copied writer state.
 * @memberof Writer
 * @constructor
 * @param {Writer} writer Writer to copy state from
 * @ignore
 */ function State(writer) {
    /**
     * Current head.
     * @type {Writer.Op}
     */ this.head = writer.head;
    /**
     * Current tail.
     * @type {Writer.Op}
     */ this.tail = writer.tail;
    /**
     * Current buffer length.
     * @type {number}
     */ this.len = writer.len;
    /**
     * Next state.
     * @type {State|null}
     */ this.next = writer.states;
}
/**
 * Constructs a new writer instance.
 * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 */ function Writer() {
    /**
     * Current length.
     * @type {number}
     */ this.len = 0;
    /**
     * Operations head.
     * @type {Object}
     */ this.head = new Op(noop, 0, 0);
    /**
     * Operations tail
     * @type {Object}
     */ this.tail = this.head;
    /**
     * Linked forked states.
     * @type {Object|null}
     */ this.states = null;
// When a value is written, the writer calculates its byte length and puts it into a linked
// list of operations to perform when finish() is called. This both allows us to allocate
// buffers of the exact required size and reduces the amount of work we have to do compared
// to first calculating over objects and then encoding over objects. In our case, the encoding
// part is just a linked list walk calling operations with already prepared values.
}
var create = function create() {
    return util.Buffer ? function create_buffer_setup() {
        return (Writer.create = function create_buffer() {
            return new BufferWriter();
        })();
    } : function create_array() {
        return new Writer();
    };
};
/**
 * Creates a new writer.
 * @function
 * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
 */ Writer.create = create();
/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */ Writer.alloc = function alloc(size) {
    return new util.Array(size);
};
// Use Uint8Array buffer pool in the browser, just like node does with buffers
/* istanbul ignore else */ if (util.Array !== Array) Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
/**
 * Pushes a new operation to the queue.
 * @param {function(Uint8Array, number, *)} fn Function to call
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @returns {Writer} `this`
 * @private
 */ Writer.prototype._push = function push(fn, len, val) {
    this.tail = this.tail.next = new Op(fn, len, val);
    this.len += len;
    return this;
};
function writeByte(val, buf, pos) {
    buf[pos] = val & 255;
}
function writeVarint32(val, buf, pos) {
    while(val > 127){
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
    }
    buf[pos] = val;
}
/**
 * Constructs a new varint writer operation instance.
 * @classdesc Scheduled varint writer operation.
 * @extends Op
 * @constructor
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @ignore
 */ function VarintOp(len, val) {
    this.len = len;
    this.next = undefined;
    this.val = val;
}
VarintOp.prototype = Object.create(Op.prototype);
VarintOp.prototype.fn = writeVarint32;
/**
 * Writes an unsigned 32 bit value as a varint.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */ Writer.prototype.uint32 = function write_uint32(value) {
    // here, the call to this.push has been inlined and a varint specific Op subclass is used.
    // uint32 is by far the most frequently used operation and benefits significantly from this.
    this.len += (this.tail = this.tail.next = new VarintOp((value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5, value)).len;
    return this;
};
/**
 * Writes a signed 32 bit value as a varint.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */ Writer.prototype.int32 = function write_int32(value) {
    return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
     : this.uint32(value);
};
/**
 * Writes a 32 bit value as a varint, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */ Writer.prototype.sint32 = function write_sint32(value) {
    return this.uint32((value << 1 ^ value >> 31) >>> 0);
};
function writeVarint64(val, buf, pos) {
    while(val.hi){
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
    }
    while(val.lo > 127){
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
    }
    buf[pos++] = val.lo;
}
/**
 * Writes an unsigned 64 bit value as a varint.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */ Writer.prototype.uint64 = function write_uint64(value) {
    var bits = LongBits.from(value);
    return this._push(writeVarint64, bits.length(), bits);
};
/**
 * Writes a signed 64 bit value as a varint.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */ Writer.prototype.int64 = Writer.prototype.uint64;
/**
 * Writes a signed 64 bit value as a varint, zig-zag encoded.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */ Writer.prototype.sint64 = function write_sint64(value) {
    var bits = LongBits.from(value).zzEncode();
    return this._push(writeVarint64, bits.length(), bits);
};
/**
 * Writes a boolish value as a varint.
 * @param {boolean} value Value to write
 * @returns {Writer} `this`
 */ Writer.prototype.bool = function write_bool(value) {
    return this._push(writeByte, 1, value ? 1 : 0);
};
function writeFixed32(val, buf, pos) {
    buf[pos] = val & 255;
    buf[pos + 1] = val >>> 8 & 255;
    buf[pos + 2] = val >>> 16 & 255;
    buf[pos + 3] = val >>> 24;
}
/**
 * Writes an unsigned 32 bit value as fixed 32 bits.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */ Writer.prototype.fixed32 = function write_fixed32(value) {
    return this._push(writeFixed32, 4, value >>> 0);
};
/**
 * Writes a signed 32 bit value as fixed 32 bits.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */ Writer.prototype.sfixed32 = Writer.prototype.fixed32;
/**
 * Writes an unsigned 64 bit value as fixed 64 bits.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */ Writer.prototype.fixed64 = function write_fixed64(value) {
    var bits = LongBits.from(value);
    return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
};
/**
 * Writes a signed 64 bit value as fixed 64 bits.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */ Writer.prototype.sfixed64 = Writer.prototype.fixed64;
/**
 * Writes a float (32 bit).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */ Writer.prototype.float = function write_float(value) {
    return this._push(util.float.writeFloatLE, 4, value);
};
/**
 * Writes a double (64 bit float).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */ Writer.prototype.double = function write_double(value) {
    return this._push(util.float.writeDoubleLE, 8, value);
};
var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
    buf.set(val, pos); // also works for plain array values
} : function writeBytes_for(val, buf, pos) {
    for(var i = 0; i < val.length; ++i)buf[pos + i] = val[i];
};
/**
 * Writes a sequence of bytes.
 * @param {Uint8Array|string} value Buffer or base64 encoded string to write
 * @returns {Writer} `this`
 */ Writer.prototype.bytes = function write_bytes(value) {
    var len = value.length >>> 0;
    if (!len) return this._push(writeByte, 1, 0);
    if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
    }
    return this.uint32(len)._push(writeBytes, len, value);
};
/**
 * Writes a string.
 * @param {string} value Value to write
 * @returns {Writer} `this`
 */ Writer.prototype.string = function write_string(value) {
    var len = utf8.length(value);
    return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
};
/**
 * Forks this writer's state by pushing it to a stack.
 * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
 * @returns {Writer} `this`
 */ Writer.prototype.fork = function fork() {
    this.states = new State(this);
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
    return this;
};
/**
 * Resets this instance to the last state.
 * @returns {Writer} `this`
 */ Writer.prototype.reset = function reset() {
    if (this.states) {
        this.head = this.states.head;
        this.tail = this.states.tail;
        this.len = this.states.len;
        this.states = this.states.next;
    } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
    }
    return this;
};
/**
 * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
 * @returns {Writer} `this`
 */ Writer.prototype.ldelim = function ldelim() {
    var head = this.head, tail = this.tail, len = this.len;
    this.reset().uint32(len);
    if (len) {
        this.tail.next = head.next; // skip noop
        this.tail = tail;
        this.len += len;
    }
    return this;
};
/**
 * Finishes the write operation.
 * @returns {Uint8Array} Finished buffer
 */ Writer.prototype.finish = function finish() {
    var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
    while(head){
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
    }
    // this.head = this.tail = null;
    return buf;
};
Writer._configure = function(BufferWriter_) {
    BufferWriter = BufferWriter_;
    Writer.create = create();
    BufferWriter._configure();
};


/***/ }),

/***/ 86351:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = BufferWriter;
// extends Writer
var Writer = __webpack_require__(41010);
(BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
var util = __webpack_require__(27188);
/**
 * Constructs a new buffer writer instance.
 * @classdesc Wire format writer using node buffers.
 * @extends Writer
 * @constructor
 */ function BufferWriter() {
    Writer.call(this);
}
BufferWriter._configure = function() {
    /**
     * Allocates a buffer of the specified size.
     * @function
     * @param {number} size Buffer size
     * @returns {Buffer} Buffer
     */ BufferWriter.alloc = util._Buffer_allocUnsafe;
    BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos); // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
    // also works for plain array values
    } : function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy) val.copy(buf, pos, 0, val.length);
        else for(var i = 0; i < val.length;)buf[pos++] = val[i++];
    };
};
/**
 * @override
 */ BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
    if (util.isString(value)) value = util._Buffer_from(value, "base64");
    var len = value.length >>> 0;
    this.uint32(len);
    if (len) this._push(BufferWriter.writeBytesBuffer, len, value);
    return this;
};
function writeStringBuffer(val, buf, pos) {
    if (val.length < 40) util.utf8.write(val, buf, pos);
    else if (buf.utf8Write) buf.utf8Write(val, pos);
    else buf.write(val, pos);
}
/**
 * @override
 */ BufferWriter.prototype.string = function write_string_buffer(value) {
    var len = util.Buffer.byteLength(value);
    this.uint32(len);
    if (len) this._push(writeStringBuffer, len, value);
    return this;
};
/**
 * Finishes the write operation.
 * @name BufferWriter#finish
 * @function
 * @returns {Buffer} Finished buffer
 */ BufferWriter._configure();


/***/ }),

/***/ 2912:
/***/ ((module) => {

module.exports = {"i8":"1.8.14"};

/***/ }),

/***/ 27112:
/***/ ((module) => {

module.exports = JSON.parse('{"nested":{"google":{"nested":{"protobuf":{"nested":{"Api":{"fields":{"name":{"type":"string","id":1},"methods":{"rule":"repeated","type":"Method","id":2},"options":{"rule":"repeated","type":"Option","id":3},"version":{"type":"string","id":4},"sourceContext":{"type":"SourceContext","id":5},"mixins":{"rule":"repeated","type":"Mixin","id":6},"syntax":{"type":"Syntax","id":7}}},"Method":{"fields":{"name":{"type":"string","id":1},"requestTypeUrl":{"type":"string","id":2},"requestStreaming":{"type":"bool","id":3},"responseTypeUrl":{"type":"string","id":4},"responseStreaming":{"type":"bool","id":5},"options":{"rule":"repeated","type":"Option","id":6},"syntax":{"type":"Syntax","id":7}}},"Mixin":{"fields":{"name":{"type":"string","id":1},"root":{"type":"string","id":2}}},"SourceContext":{"fields":{"fileName":{"type":"string","id":1}}},"Option":{"fields":{"name":{"type":"string","id":1},"value":{"type":"Any","id":2}}},"Syntax":{"values":{"SYNTAX_PROTO2":0,"SYNTAX_PROTO3":1}}}}}}}}');

/***/ }),

/***/ 24497:
/***/ ((module) => {

module.exports = JSON.parse('{"nested":{"google":{"nested":{"protobuf":{"nested":{"FileDescriptorSet":{"fields":{"file":{"rule":"repeated","type":"FileDescriptorProto","id":1}}},"FileDescriptorProto":{"fields":{"name":{"type":"string","id":1},"package":{"type":"string","id":2},"dependency":{"rule":"repeated","type":"string","id":3},"publicDependency":{"rule":"repeated","type":"int32","id":10,"options":{"packed":false}},"weakDependency":{"rule":"repeated","type":"int32","id":11,"options":{"packed":false}},"messageType":{"rule":"repeated","type":"DescriptorProto","id":4},"enumType":{"rule":"repeated","type":"EnumDescriptorProto","id":5},"service":{"rule":"repeated","type":"ServiceDescriptorProto","id":6},"extension":{"rule":"repeated","type":"FieldDescriptorProto","id":7},"options":{"type":"FileOptions","id":8},"sourceCodeInfo":{"type":"SourceCodeInfo","id":9},"syntax":{"type":"string","id":12}}},"DescriptorProto":{"fields":{"name":{"type":"string","id":1},"field":{"rule":"repeated","type":"FieldDescriptorProto","id":2},"extension":{"rule":"repeated","type":"FieldDescriptorProto","id":6},"nestedType":{"rule":"repeated","type":"DescriptorProto","id":3},"enumType":{"rule":"repeated","type":"EnumDescriptorProto","id":4},"extensionRange":{"rule":"repeated","type":"ExtensionRange","id":5},"oneofDecl":{"rule":"repeated","type":"OneofDescriptorProto","id":8},"options":{"type":"MessageOptions","id":7},"reservedRange":{"rule":"repeated","type":"ReservedRange","id":9},"reservedName":{"rule":"repeated","type":"string","id":10}},"nested":{"ExtensionRange":{"fields":{"start":{"type":"int32","id":1},"end":{"type":"int32","id":2}}},"ReservedRange":{"fields":{"start":{"type":"int32","id":1},"end":{"type":"int32","id":2}}}}},"FieldDescriptorProto":{"fields":{"name":{"type":"string","id":1},"number":{"type":"int32","id":3},"label":{"type":"Label","id":4},"type":{"type":"Type","id":5},"typeName":{"type":"string","id":6},"extendee":{"type":"string","id":2},"defaultValue":{"type":"string","id":7},"oneofIndex":{"type":"int32","id":9},"jsonName":{"type":"string","id":10},"options":{"type":"FieldOptions","id":8}},"nested":{"Type":{"values":{"TYPE_DOUBLE":1,"TYPE_FLOAT":2,"TYPE_INT64":3,"TYPE_UINT64":4,"TYPE_INT32":5,"TYPE_FIXED64":6,"TYPE_FIXED32":7,"TYPE_BOOL":8,"TYPE_STRING":9,"TYPE_GROUP":10,"TYPE_MESSAGE":11,"TYPE_BYTES":12,"TYPE_UINT32":13,"TYPE_ENUM":14,"TYPE_SFIXED32":15,"TYPE_SFIXED64":16,"TYPE_SINT32":17,"TYPE_SINT64":18}},"Label":{"values":{"LABEL_OPTIONAL":1,"LABEL_REQUIRED":2,"LABEL_REPEATED":3}}}},"OneofDescriptorProto":{"fields":{"name":{"type":"string","id":1},"options":{"type":"OneofOptions","id":2}}},"EnumDescriptorProto":{"fields":{"name":{"type":"string","id":1},"value":{"rule":"repeated","type":"EnumValueDescriptorProto","id":2},"options":{"type":"EnumOptions","id":3}}},"EnumValueDescriptorProto":{"fields":{"name":{"type":"string","id":1},"number":{"type":"int32","id":2},"options":{"type":"EnumValueOptions","id":3}}},"ServiceDescriptorProto":{"fields":{"name":{"type":"string","id":1},"method":{"rule":"repeated","type":"MethodDescriptorProto","id":2},"options":{"type":"ServiceOptions","id":3}}},"MethodDescriptorProto":{"fields":{"name":{"type":"string","id":1},"inputType":{"type":"string","id":2},"outputType":{"type":"string","id":3},"options":{"type":"MethodOptions","id":4},"clientStreaming":{"type":"bool","id":5},"serverStreaming":{"type":"bool","id":6}}},"FileOptions":{"fields":{"javaPackage":{"type":"string","id":1},"javaOuterClassname":{"type":"string","id":8},"javaMultipleFiles":{"type":"bool","id":10},"javaGenerateEqualsAndHash":{"type":"bool","id":20,"options":{"deprecated":true}},"javaStringCheckUtf8":{"type":"bool","id":27},"optimizeFor":{"type":"OptimizeMode","id":9,"options":{"default":"SPEED"}},"goPackage":{"type":"string","id":11},"ccGenericServices":{"type":"bool","id":16},"javaGenericServices":{"type":"bool","id":17},"pyGenericServices":{"type":"bool","id":18},"deprecated":{"type":"bool","id":23},"ccEnableArenas":{"type":"bool","id":31},"objcClassPrefix":{"type":"string","id":36},"csharpNamespace":{"type":"string","id":37},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]],"reserved":[[38,38]],"nested":{"OptimizeMode":{"values":{"SPEED":1,"CODE_SIZE":2,"LITE_RUNTIME":3}}}},"MessageOptions":{"fields":{"messageSetWireFormat":{"type":"bool","id":1},"noStandardDescriptorAccessor":{"type":"bool","id":2},"deprecated":{"type":"bool","id":3},"mapEntry":{"type":"bool","id":7},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]],"reserved":[[8,8]]},"FieldOptions":{"fields":{"ctype":{"type":"CType","id":1,"options":{"default":"STRING"}},"packed":{"type":"bool","id":2},"jstype":{"type":"JSType","id":6,"options":{"default":"JS_NORMAL"}},"lazy":{"type":"bool","id":5},"deprecated":{"type":"bool","id":3},"weak":{"type":"bool","id":10},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]],"reserved":[[4,4]],"nested":{"CType":{"values":{"STRING":0,"CORD":1,"STRING_PIECE":2}},"JSType":{"values":{"JS_NORMAL":0,"JS_STRING":1,"JS_NUMBER":2}}}},"OneofOptions":{"fields":{"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]]},"EnumOptions":{"fields":{"allowAlias":{"type":"bool","id":2},"deprecated":{"type":"bool","id":3},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]]},"EnumValueOptions":{"fields":{"deprecated":{"type":"bool","id":1},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]]},"ServiceOptions":{"fields":{"deprecated":{"type":"bool","id":33},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]]},"MethodOptions":{"fields":{"deprecated":{"type":"bool","id":33},"uninterpretedOption":{"rule":"repeated","type":"UninterpretedOption","id":999}},"extensions":[[1000,536870911]]},"UninterpretedOption":{"fields":{"name":{"rule":"repeated","type":"NamePart","id":2},"identifierValue":{"type":"string","id":3},"positiveIntValue":{"type":"uint64","id":4},"negativeIntValue":{"type":"int64","id":5},"doubleValue":{"type":"double","id":6},"stringValue":{"type":"bytes","id":7},"aggregateValue":{"type":"string","id":8}},"nested":{"NamePart":{"fields":{"namePart":{"rule":"required","type":"string","id":1},"isExtension":{"rule":"required","type":"bool","id":2}}}}},"SourceCodeInfo":{"fields":{"location":{"rule":"repeated","type":"Location","id":1}},"nested":{"Location":{"fields":{"path":{"rule":"repeated","type":"int32","id":1},"span":{"rule":"repeated","type":"int32","id":2},"leadingComments":{"type":"string","id":3},"trailingComments":{"type":"string","id":4},"leadingDetachedComments":{"rule":"repeated","type":"string","id":6}}}}},"GeneratedCodeInfo":{"fields":{"annotation":{"rule":"repeated","type":"Annotation","id":1}},"nested":{"Annotation":{"fields":{"path":{"rule":"repeated","type":"int32","id":1},"sourceFile":{"type":"string","id":2},"begin":{"type":"int32","id":3},"end":{"type":"int32","id":4}}}}}}}}}}}');

/***/ }),

/***/ 68874:
/***/ ((module) => {

module.exports = JSON.parse('{"nested":{"google":{"nested":{"protobuf":{"nested":{"SourceContext":{"fields":{"fileName":{"type":"string","id":1}}}}}}}}}');

/***/ }),

/***/ 19928:
/***/ ((module) => {

module.exports = JSON.parse('{"nested":{"google":{"nested":{"protobuf":{"nested":{"Type":{"fields":{"name":{"type":"string","id":1},"fields":{"rule":"repeated","type":"Field","id":2},"oneofs":{"rule":"repeated","type":"string","id":3},"options":{"rule":"repeated","type":"Option","id":4},"sourceContext":{"type":"SourceContext","id":5},"syntax":{"type":"Syntax","id":6}}},"Field":{"fields":{"kind":{"type":"Kind","id":1},"cardinality":{"type":"Cardinality","id":2},"number":{"type":"int32","id":3},"name":{"type":"string","id":4},"typeUrl":{"type":"string","id":6},"oneofIndex":{"type":"int32","id":7},"packed":{"type":"bool","id":8},"options":{"rule":"repeated","type":"Option","id":9},"jsonName":{"type":"string","id":10},"defaultValue":{"type":"string","id":11}},"nested":{"Kind":{"values":{"TYPE_UNKNOWN":0,"TYPE_DOUBLE":1,"TYPE_FLOAT":2,"TYPE_INT64":3,"TYPE_UINT64":4,"TYPE_INT32":5,"TYPE_FIXED64":6,"TYPE_FIXED32":7,"TYPE_BOOL":8,"TYPE_STRING":9,"TYPE_GROUP":10,"TYPE_MESSAGE":11,"TYPE_BYTES":12,"TYPE_UINT32":13,"TYPE_ENUM":14,"TYPE_SFIXED32":15,"TYPE_SFIXED64":16,"TYPE_SINT32":17,"TYPE_SINT64":18}},"Cardinality":{"values":{"CARDINALITY_UNKNOWN":0,"CARDINALITY_OPTIONAL":1,"CARDINALITY_REQUIRED":2,"CARDINALITY_REPEATED":3}}}},"Enum":{"fields":{"name":{"type":"string","id":1},"enumvalue":{"rule":"repeated","type":"EnumValue","id":2},"options":{"rule":"repeated","type":"Option","id":3},"sourceContext":{"type":"SourceContext","id":4},"syntax":{"type":"Syntax","id":5}}},"EnumValue":{"fields":{"name":{"type":"string","id":1},"number":{"type":"int32","id":2},"options":{"rule":"repeated","type":"Option","id":3}}},"Option":{"fields":{"name":{"type":"string","id":1},"value":{"type":"Any","id":2}}},"Syntax":{"values":{"SYNTAX_PROTO2":0,"SYNTAX_PROTO3":1}},"Any":{"fields":{"type_url":{"type":"string","id":1},"value":{"type":"bytes","id":2}}},"SourceContext":{"fields":{"fileName":{"type":"string","id":1}}}}}}}}}');

/***/ })

};
;