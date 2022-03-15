import { Server } from 'socket.io';

import FeatureFlagService from '../../components/FeatureFlag/service';


export const socketIO = new Server({
  cors: {
    origin: '*'
  }
});

socketIO.of(/^\/ff-.+$/).on("connection", (socket) => {
  const nspName = socket.nsp.name;
  const apiKey = nspName.split("-")[1];

  console.log('loading ff for nsp: ', nspName);

  FeatureFlagService.findAll(apiKey).then((featureFlags) => {
    socket.emit("load_ff", featureFlags);
  });
})