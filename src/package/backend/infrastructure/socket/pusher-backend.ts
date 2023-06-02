import Pusher from "pusher";

export default new Pusher({
  appId: import.meta.env.PUSHER_APP_ID,
  key: import.meta.env.PUBLIC_PUSHER_KEY,
  secret: import.meta.env.PUSHER_SECRET,
  cluster: import.meta.env.PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
});
