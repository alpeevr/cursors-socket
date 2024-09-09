import type { ClientToServerEvents, Cursor, ServerToClientEvents } from "@/socket/types";
import type { Server } from "socket.io";

export function initEventHandlers(io: Server<ClientToServerEvents, ServerToClientEvents>) {
  const cursors: Cursor[] = []
  
  io.on("connection", (socket) => {
    socket.on("cursor_receiver", (cursor) => {
      const cursorIndex = cursors.findIndex(c => c.id === socket.id)
      
      if (cursorIndex === -1) {
        cursors.push({ id: socket.id, ...cursor})
      } else {
        cursors.splice(cursorIndex, 1, { id: socket.id, ...cursor})
      }

      socket.emit("cursor_updates", cursors);
    });

    socket.on("disconnect", () => {
      const indexToRemove = cursors.findIndex(c => c.id === socket.id)

      if (indexToRemove !== -1) {
        cursors.splice(indexToRemove, 1)
      }
    });
  });
}
