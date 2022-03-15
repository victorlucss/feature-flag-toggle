"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const serverHandlers = require("./serverHandlers");
const server_1 = require("./server");
const httpServer = http.createServer(server_1.default);
/**
 * Binds and listens for connections on the specified host
 */
httpServer.listen(server_1.default.get('port'));
/**
 * httpServer Events
 */
httpServer.on('error', (error) => serverHandlers.onError(error, server_1.default.get('port')));
httpServer.on('listening', serverHandlers.onListening.bind(httpServer));
//# sourceMappingURL=index.js.map