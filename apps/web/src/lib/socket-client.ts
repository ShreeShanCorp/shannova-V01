import { io, type Socket } from "socket.io-client";

type TokenGetter = () => Promise<string | null>;

let socket: Socket | null = null;

/** Lazily creates a single shared socket connection, authenticated with the current
 * Clerk session token on every (re)connect attempt. */
export function getSocket(getToken: TokenGetter): Socket {
  if (socket) return socket;

  socket = io(import.meta.env.VITE_SOCKET_URL, {
    auth: (cb) => {
      void getToken().then((token) => cb({ token }));
    },
  });

  return socket;
}
