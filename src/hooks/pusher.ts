import Pusher from "pusher-js";

export default function initializePusher(): Pusher {
  const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string
  });

  return pusher;
}
