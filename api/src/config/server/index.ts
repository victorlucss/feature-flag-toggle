import * as http from 'http';
import * as serverHandlers from './serverHandlers';
import server from './server';

import { socketIO } from '../socket'

const httpServer: http.Server = http.createServer(server);

socketIO.attach(httpServer);

/**
 * Binds and listens for connections on the specified host
 */
httpServer.listen(server.get('port'));

/**
 * httpServer Events
 */
httpServer.on('error',
    (error: Error) => serverHandlers.onError(error, server.get('port')));
httpServer.on('listening',
    serverHandlers.onListening.bind(httpServer));
