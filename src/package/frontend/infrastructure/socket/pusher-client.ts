import Pusher from "pusher-js";

Pusher.logToConsole = true;
export default new Pusher(import.meta.env.PUBLIC_PUSHER_KEY, {
  cluster: import.meta.env.PUBLIC_PUSHER_CLUSTER,
});
